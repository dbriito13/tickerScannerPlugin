(() => {
  "use strict";

  const SKIP_TAGS = new Set(["SCRIPT", "STYLE", "TEXTAREA", "INPUT", "CODE", "PRE"]);
  let scanning = false;

  function scanElement(root) {
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
        // Strip common surrounding punctuation to get the raw token
        const clean = word.replace(/^[^a-zA-Z]+|[^a-zA-Z]+$/g, "");
        if (clean.length >= 2 && clean.length <= 5 && clean === clean.toUpperCase() && /^[A-Z]+$/.test(clean)) {
          candidates.push(clean);
        }
      }
    }

    if (candidates.length > 0) {
      console.log(`[TickerLens] Found ${candidates.length} potential tickers:`, candidates);
    }
  }

  function initialScan() {
    const containers = document.querySelectorAll(".cooked");
    if (containers.length > 0) {
      containers.forEach((el) => scanElement(el));
    } else {
      scanElement(document.body);
    }
  }

  function startObserver() {
    const observer = new MutationObserver((mutations) => {
      if (scanning) return;
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          if (node.nodeType === Node.ELEMENT_NODE) {
            scanElement(node);
          }
        }
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return observer;
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
