#!/usr/bin/env python3
"""
Reads unknown tickers from Firestore, validates them via Yahoo Finance,
and adds valid ones to tickers.js.

Usage: python scripts/update_tickers.py
"""

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


def fetch_ticker_info(symbol):
    """Fetch detailed info for a single ticker via yfinance, trying exchange suffixes."""
    info = None

    for suffix in EXCHANGE_SUFFIXES:
        try_symbol = symbol + suffix
        try:
            ticker = yf.Ticker(try_symbol)
            candidate = ticker.info
        except Exception:
            continue

        if candidate.get("quoteType") in ("ETF", "MUTUALFUND"):
            info = candidate
            if suffix:
                print(f"    Found as {try_symbol}")
            break

    if info is None:
        print(f"  {symbol}: not an ETF/fund on any exchange, skipping")
        return None

    name = info.get("longName") or info.get("shortName") or ""
    if not name:
        return None

    category = info.get("category", "") or info.get("quoteType", "")
    family = info.get("fundFamily", "") or ""
    total_assets = info.get("totalAssets")

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

    return {
        "name": name,
        "category": category,
        "family": family,
        "expenseRatio": expense_ratio,
        "totalAssets": total_assets,
    }


def fetch_all_ticker_info(tickers):
    """Fetch info for all tickers via yfinance."""
    results = {}
    for i, symbol in enumerate(tickers):
        print(f"  [{i+1}/{len(tickers)}] Fetching {symbol}...")
        info = fetch_ticker_info(symbol)
        if info:
            results[symbol] = info
            print(f"    -> {info['name']} | ER: {info['expenseRatio']}%")
        time.sleep(0.3)
    return results


def read_tickers_js():
    """Parse tickers.js and return ticker_dict."""
    text = TICKERS_JS_PATH.read_text()

    tickers = {}
    for m in re.finditer(r'"([A-Z.]+)":\s*\{([^}]+)\}', text):
        symbol = m.group(1)
        body = m.group(2)
        name_m = re.search(r'name:\s*"([^"]*)"', body)
        cat_m = re.search(r'category:\s*"([^"]*)"', body)
        fam_m = re.search(r'family:\s*"([^"]*)"', body)
        er_m = re.search(r'expenseRatio:\s*([\d.]+|null)', body)
        ta_m = re.search(r'totalAssets:\s*([\d.]+|null)', body)

        tickers[symbol] = {
            "name": name_m.group(1) if name_m else "",
            "category": cat_m.group(1) if cat_m else "",
            "family": fam_m.group(1) if fam_m else "",
            "expenseRatio": float(er_m.group(1)) if er_m and er_m.group(1) != "null" else None,
            "totalAssets": int(float(ta_m.group(1))) if ta_m and ta_m.group(1) != "null" else None,
        }

    return tickers


def read_exclusions():
    """Read exclusions from exclusions.js."""
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
    """Write tickers back to tickers.js."""
    lines = []
    lines.append("// Database of known ETF and fund tickers")
    lines.append("// Auto-updated by scripts/update_tickers.py")
    lines.append("const TICKER_DB = {")

    # Group by category
    by_cat = {}
    for symbol, info in sorted(tickers.items()):
        cat = info.get("category", "")
        by_cat.setdefault(cat, []).append((symbol, info))

    for cat in sorted(by_cat.keys()):
        lines.append(f"  // --- {cat} ---")
        for symbol, info in sorted(by_cat[cat]):
            name = info["name"].replace('"', '\\"')
            family = info.get("family", "").replace('"', '\\"')
            er = info.get("expenseRatio")
            ta = info.get("totalAssets")
            er_str = str(er) if er is not None else "null"
            ta_str = str(ta) if ta is not None else "null"
            lines.append(
                f'  "{symbol}": {{ name: "{name}", category: "{cat}", '
                f'family: "{family}", expenseRatio: {er_str}, totalAssets: {ta_str} }},'
            )
        lines.append("")

    lines.append("};")
    lines.append("")

    TICKERS_JS_PATH.write_text("\n".join(lines))
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


def main():
    print("Reading existing tickers.js...")
    existing = read_tickers_js()
    print(f"Existing tickers: {len(existing)}")

    exclusions = read_exclusions()
    print(f"Existing exclusions: {len(exclusions)}")

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
