(() => {
  "use strict";

  const SKIP_TAGS = new Set(["SCRIPT", "STYLE", "TEXTAREA", "INPUT", "CODE", "PRE"]);
  const OBSERVE_OPTS = { childList: true, subtree: true };
  const SUBMIT_URL = "https://tickersymbol-writer-417743378789.europe-west1.run.app";
  let observer = null;
  let scanCount = 0;
  const reportedThisSession = new Set();

  function formatAssets(n) {
    if (n >= 1e12) return `$${(n / 1e12).toFixed(1)}T`;
    if (n >= 1e9) return `$${(n / 1e9).toFixed(1)}B`;
    if (n >= 1e6) return `$${(n / 1e6).toFixed(1)}M`;
    return `$${n.toLocaleString()}`;
  }

  function reportUnknownTicker(ticker) {
    if (reportedThisSession.has(ticker)) return;
    reportedThisSession.add(ticker);

    console.log(`[TickerLens] Reporting unknown ticker: ${ticker}`);
    fetch(SUBMIT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ticker }),
    }).then(r => console.log(`[TickerLens] Reported ${ticker}: ${r.status}`))
      .catch(e => console.warn(`[TickerLens] Failed to report ${ticker}:`, e));
  }

  function scanElement(root, source) {
    if (root.closest && root.closest(".search-menu-panel, .menu-panel")) return;
    scanCount++;
    console.log(`[TickerLens] #${scanCount} from ${source}, element:`, root.tagName, root.className);
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
    const candidates = [];
    let node;
    while ((node = walker.nextNode())) {
      const text = node.nodeValue;
      if (!text || text.trim().length < 2) continue; 
      const parent = node.parentElement;
      if (!parent || SKIP_TAGS.has(parent.tagName)) continue;

      const words = text.trim().split(/\s+/);
      for (const word of words) {
        const clean = word.replace(/^[^a-zA-Z0-9]+|[^a-zA-Z0-9]+$/g, "");
        if (clean.length >= 2 && clean.length <= 6 && /^[A-Z0-9]{2,6}$/.test(clean) && /[A-Z]/.test(clean) && !PERMANENT_EXCLUSIONS.has(clean) && !TICKER_EXCLUSIONS.has(clean)) {
          if (TICKER_DB[clean]) {
            candidates.push(clean); // Known ticker
          } else {
            reportUnknownTicker(clean); // Add unknown ticker to Firestore for review
          }
        }
      }
    }

    if (candidates.length === 0) return;
    console.log(`[TickerLens] Found ${candidates.length} potential tickers:`, candidates);

    // Replace in innerHTML — only match tickers in text content (not inside tags)
    const unique = [...new Set(candidates)];
    let html = root.innerHTML;
    for (const ticker of unique) {
      const re = new RegExp(`\\b(${ticker})\\b(?=[^<]*(?:<|$))`, "g");
      html = html.replace(re, '<span class="tickerlens-hl" data-ticker="$1">$1</span>');
    }
    root.innerHTML = html;
  }

  // Popup logic — one popup at a time, click to toggle
  let activePopup = null;

  // Event listener to display popup on click of highlighted ticker
  document.addEventListener("click", (e) => {
    const hl = e.target.closest(".tickerlens-hl");

    // Close existing popup on any click
    if (activePopup) {
      activePopup.remove();
      activePopup = null;
      if (!hl) return;
    }

    if (!hl) return;

    const ticker = hl.dataset.ticker;
    const info = TICKER_DB[ticker];
    const popup = document.createElement("div");
    popup.className = "tickerlens-popup";
    if (info) {
      const er = info.expenseRatio != null ? `${info.expenseRatio}%` : "N/A";
      const assets = info.totalAssets != null ? formatAssets(info.totalAssets) : "N/A";
      const beta = info.beta3Year != null && info.beta3Year !== 0 ? info.beta3Year.toFixed(2) : "N/A";
      const ret3 = info.return3Year != null ? `${info.return3Year}%` : "N/A";
      popup.innerHTML = [
        `<strong>${ticker}</strong> — ${info.name}`,
        `<span class="tl-label">Category:</span> ${info.category}`,
        info.family ? `<span class="tl-label">Family:</span> ${info.family}` : "",
        `<span class="tl-label">Expense Ratio:</span> ${er}`,
        `<span class="tl-label">Total Assets:</span> ${assets}`,
        `<span class="tl-label">Beta (3Y):</span> ${beta}`,
        `<span class="tl-label">Return (3Y):</span> ${ret3}`,
        info.description ? `<span class="tl-desc">${info.description}</span>` : "",
      ].filter(Boolean).join("<br>");
    } else {
      popup.textContent = ticker;
    }

    // Position below the highlighted ticker
    document.body.appendChild(popup);
    const rect = hl.getBoundingClientRect();
    popup.style.top = `${window.scrollY + rect.bottom + 6}px`;
    popup.style.left = `${window.scrollX + rect.left}px`;

    activePopup = popup;
    e.stopPropagation();
  });

  // Initial scan on page load
  function initialScan() {
    const containers = document.querySelectorAll(".cooked");
    if (containers.length > 0) {
      containers.forEach((el) => scanElement(el, "initialScan"));
    } else {
      scanElement(document.body, "initialScan");
    }

  }

  // Start the MutationObserver to watch for new content
  function startObserver() {
    // Load and start the MutationObserver to watch for new content
    observer = new MutationObserver((mutations) => {
        // Temporarily disconnect to avoid infinite loops when modifying the DOM
        observer.disconnect(); 
        for (const mutation of mutations) {
            for (const node of mutation.addedNodes) {
                if (node.nodeType === Node.ELEMENT_NODE && !node.closest(".tickerlens-hl, .tickerlens-popup")) {
                    scanElement(node, "observer");
                }
            }
        }
    
        observer.observe(document.body, OBSERVE_OPTS);
    });
    observer.observe(document.body, OBSERVE_OPTS);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      initialScan();
      startObserver();
    });
  } else {
    initialScan();
    startObserver();
  }

  console.log("[TickerLens] Content script loaded (debug mode).");
})();
