(() => {
  "use strict";

  const SKIP_TAGS = new Set(["SCRIPT", "STYLE", "TEXTAREA", "INPUT", "CODE", "PRE"]);
  const OBSERVE_OPTS = { childList: true, subtree: true };
  let observer = null;
  let scanCount = 0;

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
        if (clean.length >= 2 && clean.length <= 5 && clean === clean.toUpperCase() && /^[A-Z]+$/.test(clean)) {
          candidates.push(clean);
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
      html = html.replace(re, '<span style="color:red;font-weight:bold">$1</span>');
    }
    root.innerHTML = html;
  }

  function initialScan() {
    const containers = document.querySelectorAll(".cooked");
    if (containers.length > 0) {
      containers.forEach((el) => scanElement(el, "initialScan"));
    } else {
      scanElement(document.body, "initialScan");
    }
  }

  function startObserver() {
    observer = new MutationObserver((mutations) => {
      observer.disconnect();
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          if (node.nodeType === Node.ELEMENT_NODE) {
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
