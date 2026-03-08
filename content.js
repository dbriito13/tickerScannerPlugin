(() => {
  "use strict";

  const SKIP_TAGS = new Set(["SCRIPT", "STYLE", "TEXTAREA", "INPUT", "CODE", "PRE"]);
  const OBSERVE_OPTS = { childList: true, subtree: true };
  const FIRESTORE_URL = "https://firestore.googleapis.com/v1/projects/tickersymbol-f7117/databases/(default)/documents/unknown_tickers";
  let observer = null;
  let scanCount = 0;
  const reportedThisSession = new Set();

  function reportUnknownTicker(ticker) {
    if (reportedThisSession.has(ticker)) return;
    reportedThisSession.add(ticker);

    fetch(`${FIRESTORE_URL}/${ticker}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fields: {
          seen_count: { integerValue: "1" },
          last_seen: { timestampValue: new Date().toISOString() },
        },
      }),
    }).catch(() => {});
  }

  function scanElement(root, source) {
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
        const clean = word.replace(/^[^a-zA-Z]+|[^a-zA-Z]+$/g, "");
        if (clean.length >= 2 && clean.length <= 5 && /^[A-Z]+$/.test(clean) && !TICKER_EXCLUSIONS.has(clean)) {
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
      popup.innerHTML = `<strong>${ticker}</strong><br>${info.name}<br><em>${info.category}</em>`;
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
