#!/usr/bin/env python3
"""
Reads unknown tickers from Firestore, validates them via Yahoo Finance,
and adds valid ones to tickers.js.

Usage:
  python scripts/update_tickers.py            # process new unknowns from Firestore
  python scripts/update_tickers.py --refresh  # re-fetch info for all existing tickers
"""

import argparse
import json
import re
import time
import urllib.request
import urllib.error
from pathlib import Path
import yfinance as yf

# --- Config ---
FIRESTORE_REST = "https://firestore.googleapis.com/v1/projects/tickersymbol-f7117/databases/(default)/documents/unknown_tickers"
TICKERS_JS_PATH = Path(__file__).resolve().parent.parent / "tickers.js"
EXCLUSIONS_JS_PATH = Path(__file__).resolve().parent.parent / "exclusions.js"
PERMANENT_EXCLUSIONS_PATH = Path(__file__).resolve().parent.parent / "permanent_exclusions.js"


def read_firestore_unknowns():
    """Read all unknown tickers from Firestore with pagination."""
    tickers = []
    page_token = None

    while True:
        print(f"Fetching unknown tickers from Firestore (page token: {page_token})...")
        url = f"{FIRESTORE_REST}"
        if page_token:
            url += f"?pageToken={page_token}"

        req = urllib.request.Request(url, headers={"Content-Type": "application/json"})

        try:
            with urllib.request.urlopen(req, timeout=15) as resp:
                data = json.loads(resp.read().decode())
        except urllib.error.HTTPError as e:
            print(f"Error reading Firestore: HTTP {e.code}")
            print(e.read().decode()[:500])
            return tickers

        for doc in data.get("documents", []):
            name = doc["name"].split("/")[-1]
            tickers.append(name)

        page_token = data.get("nextPageToken")
        if not page_token:
            break

    return tickers


EXCHANGE_SUFFIXES = ["", ".SW", ".DE", ".L", ".AS", ".PA", ".MI", ".TO"]


_fdb_etfs = None
_fdb_funds = None

def _fdb_lookup(symbol):
    """Look up category and family from financedatabase (static offline DB)."""
    global _fdb_etfs, _fdb_funds
    try:
        import financedatabase as fd
        if _fdb_etfs is None:
            _fdb_etfs = fd.ETFs()
            _fdb_funds = fd.Funds()

        # Try bare symbol and with exchange suffixes (e.g. ZPRX.DE)
        candidates = [symbol] + [symbol + s for s in EXCHANGE_SUFFIXES if s]
        for db in [_fdb_etfs, _fdb_funds]:
            df = db.search(summary="", name="")
            for candidate in candidates:
                if candidate in df.index:
                    print(f"    financedatabase: found as {candidate}")
                    return df.loc[candidate]
    except Exception as e:
        print(f"    financedatabase lookup failed: {e}")
    return None


def fetch_ticker_info(symbol):
    """Fetch detailed info for a single ticker via yfinance, trying exchange suffixes."""
    info = None
    best = None  # best candidate with incomplete data (fallback)

    for suffix in EXCHANGE_SUFFIXES:
        try_symbol = symbol + suffix
        try:
            ticker = yf.Ticker(try_symbol)
            candidate = ticker.info
        except Exception:
            continue

        if candidate.get("quoteType") not in ("ETF", "MUTUALFUND"):
            continue

        has_er = candidate.get("netExpenseRatio") is not None or candidate.get("annualReportExpenseRatio") is not None
        has_assets = candidate.get("totalAssets") is not None

        if has_er and has_assets:
            info = candidate
            if suffix:
                print(f"    Found as {try_symbol} (complete data)")
            break

        # Keep first incomplete match as fallback
        if best is None:
            best = candidate
            if suffix:
                print(f"    Found as {try_symbol} (incomplete data, trying other suffixes)")

    if info is None and best is not None:
        info = best
        print(f"    Using best available match (missing ER or assets)")

    if info is None:
        print(f"  {symbol}: not an ETF/fund on any exchange, skipping")
        return None

    name = info.get("longName") or info.get("shortName") or ""
    if not name:
        return None

    # Skip junk: numeric names, or MUTUALFUND with no family and no assets
    if name.replace(",", "").replace(".", "").strip().isdigit():
        print(f"  {symbol}: numeric name '{name}' - junk, skipping")
        return None

    family = info.get("fundFamily", "") or ""
    total_assets = info.get("totalAssets")
    quote_type = info.get("quoteType", "")

    if quote_type == "MUTUALFUND" and not family and not total_assets:
        print(f"  {symbol}: MUTUALFUND with no family/assets - junk, skipping")
        return None

    category = info.get("category", "")
    # Fallback 1: try fund_overview from yfinance
    if not category or category == quote_type:
        try:
            fo = ticker.get_funds_data().fund_overview
            category = fo.get("categoryName", "") or fo.get("category", "") or ""
        except Exception:
            pass
    # Fallback 2: try financedatabase (static offline DB)
    fdb = None
    print(f"  {symbol}: quoteType={quote_type}, category='{category}', family='{family}'")
    if not category or category == quote_type or not family:
        fdb = _fdb_lookup(symbol)
    if not category or category == quote_type:
        cat_val = fdb["category"] if fdb is not None else ""
        category = str(cat_val) if cat_val == cat_val else ""  # handle NaN
    if not family and fdb is not None:
        fam_val = fdb["family"]
        family = str(fam_val) if fam_val == fam_val else ""  # handle NaN
    category = category or quote_type

    # netExpenseRatio is already in % (e.g. 0.03 = 0.03%)
    # annualReportExpenseRatio is a decimal (e.g. 0.0003 = 0.03%)
    net_er = info.get("netExpenseRatio")
    annual_er = info.get("annualReportExpenseRatio")
    if net_er is not None:
        expense_ratio = net_er
    elif annual_er is not None:
        expense_ratio = round(annual_er * 100, 4)
    else:
        expense_ratio = None

    beta3y = info.get("beta3Year")
    ret3y = info.get("threeYearAverageReturn")
    if ret3y is not None:
        ret3y = round(ret3y * 100, 2)  # convert decimal to %
    description = info.get("longBusinessSummary", "") or ""
    # Clean description: collapse whitespace, remove quotes, cap length
    description = " ".join(description.split())
    description = description.replace('"', "'").replace("\\", "")

    return {
        "name": name,
        "category": category,
        "family": family,
        "expenseRatio": expense_ratio,
        "totalAssets": total_assets,
        "beta3Year": round(beta3y, 2) if beta3y is not None else None,
        "return3Year": ret3y,
        "description": description,
    }


def fetch_all_ticker_info(tickers):
    """Fetch info for all tickers via yfinance."""
    results = {}
    for i, symbol in enumerate(tickers):
        print(f"  [{i+1}/{len(tickers)}] Fetching {symbol}...")
        info = fetch_ticker_info(symbol)
        if info:
            results[symbol] = info
            print(f"    -> {info['name']} | ER: {info['expenseRatio']}% | Category: {info['category']} | Family: {info['family']}")
        time.sleep(0.3)
    return results


def read_tickers_js():
    """Read ticker database from tickers.js by parsing the JSON value."""
    if not TICKERS_JS_PATH.exists():
        return {}
    text = TICKERS_JS_PATH.read_text()
    m = re.search(r"const TICKER_DB\s*=\s*", text)
    if not m:
        return {}
    json_str = text[m.end():].rstrip().removesuffix(";")
    return json.loads(json_str)


def read_permanent_exclusions():
    """Read hand-curated permanent exclusions."""
    if not PERMANENT_EXCLUSIONS_PATH.exists():
        return set()
    text = PERMANENT_EXCLUSIONS_PATH.read_text()
    return set(re.findall(r'"([A-Z]+)"', text))


def read_exclusions():
    """Read auto-generated exclusions from exclusions.js."""
    if not EXCLUSIONS_JS_PATH.exists():
        return set()
    text = EXCLUSIONS_JS_PATH.read_text()
    return set(re.findall(r'"([A-Z]+)"', text))


def write_exclusions(exclusions):
    """Write exclusions to exclusions.js."""
    exc_sorted = sorted(exclusions)
    lines = ["const TICKER_EXCLUSIONS = new Set(["]
    for i in range(0, len(exc_sorted), 10):
        chunk = exc_sorted[i:i + 10]
        lines.append("  " + ", ".join(f'"{w}"' for w in chunk) + ",")
    lines.append("]);")
    lines.append("")
    EXCLUSIONS_JS_PATH.write_text("\n".join(lines))
    print(f"Wrote {len(exclusions)} exclusions to {EXCLUSIONS_JS_PATH}")


def write_tickers_js(tickers):
    """Write tickers to tickers.js as a JSON-valued const for the extension."""
    js_obj = json.dumps(tickers, indent=2, sort_keys=True)
    TICKERS_JS_PATH.write_text(
        "// Auto-generated by scripts/update_tickers.py — do not edit\n"
        f"const TICKER_DB = {js_obj};\n"
    )
    print(f"Wrote {len(tickers)} tickers to {TICKERS_JS_PATH}")


def delete_firestore_docs(tickers):
    """Delete processed unknown ticker documents from Firestore."""
    for symbol in tickers:
        url = f"{FIRESTORE_REST}/{symbol}"
        req = urllib.request.Request(url, method="DELETE")
        try:
            urllib.request.urlopen(req, timeout=10)
        except urllib.error.HTTPError as e:
            print(f"  Warning: could not delete {symbol}: HTTP {e.code}")


def refresh_tickers():
    """Re-fetch info for all existing tickers in tickers.js."""
    print("Reading existing tickers.js...")
    existing = read_tickers_js()
    print(f"Found {len(existing)} tickers to refresh.\n")

    updated = 0
    failed = 0
    for i, symbol in enumerate(sorted(existing)):
        print(f"  [{i+1}/{len(existing)}] Refreshing {symbol}...")
        info = fetch_ticker_info(symbol)
        if info:
            existing[symbol] = info
            updated += 1
        else:
            print(f"    WARNING: could not fetch {symbol}, keeping old data")
            failed += 1
        time.sleep(0.3)

    print(f"\nRefreshed {updated} tickers ({failed} failed).")
    write_tickers_js(existing)
    print("Done.")


def main():
    parser = argparse.ArgumentParser(description="Update or refresh ticker database.")
    parser.add_argument("--refresh", action="store_true",
                        help="Re-fetch info for all existing tickers in tickers.js")
    args = parser.parse_args()

    if args.refresh:
        refresh_tickers()
        return

    print("Reading existing tickers.js...")
    existing = read_tickers_js()
    print(f"Existing tickers: {len(existing)}")

    permanent = read_permanent_exclusions()
    print(f"Permanent exclusions: {len(permanent)}")

    exclusions = read_exclusions()
    print(f"Auto-generated exclusions: {len(exclusions)}")

    print("\nReading unknown tickers from Firestore...")
    unknowns = read_firestore_unknowns()
    print(f"Found {len(unknowns)} unknown tickers.")

    if not unknowns:
        return

    print("\nFetching info from Yahoo Finance...")
    validated = fetch_all_ticker_info(unknowns)

    print(f"\nValidated {len(validated)} ETFs/funds out of {len(unknowns)} unknowns:")
    for symbol, data in sorted(validated.items()):
        er = f"{data['expenseRatio']}%" if data['expenseRatio'] is not None else "N/A"
        print(f"  {symbol}: {data['name']} | {data['category']} | ER: {er} | Family: {data['family']}")

    # Merge validated tickers into DB, rejected ones into exclusions
    added = 0
    rejected = 0
    for symbol in unknowns:
        if symbol in permanent:
            print(f"  - {symbol} (permanent exclusion)")
            continue
        if symbol in validated:
            if symbol not in existing:
                existing[symbol] = validated[symbol]
                added += 1
                print(f"  + {symbol}")
            else:
                print(f"  = {symbol} (already exists)")
        else:
            if symbol not in exclusions:
                exclusions.add(symbol)
                rejected += 1
                print(f"  x {symbol} (added to exclusions)")

    print(f"\nAdded {added} new tickers, {rejected} new exclusions.")
    write_tickers_js(existing)
    write_exclusions(exclusions)

    # Clean up Firestore - delete all processed unknowns
    print(f"\nCleaning up {len(unknowns)} Firestore documents...")
    delete_firestore_docs(unknowns)
    print("Done.")


if __name__ == "__main__":
    main()