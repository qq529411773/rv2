"use client";

import { useEffect } from "react";

export function ScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -60px 0px" },
    );

    // Observe existing elements + future ones via a quick scan
    const observeAll = () => {
      document.querySelectorAll(".reveal:not(.visible)").forEach((el) => {
        observer.observe(el);
      });
    };

    observeAll();

    // Use a lightweight MutationObserver only to catch newly-added elements
    const mo = new MutationObserver((mutations) => {
      for (const m of mutations) {
        Array.from(m.addedNodes).forEach((node) => {
          if (node instanceof HTMLElement) {
            if (
              node.classList?.contains("reveal") &&
              !node.classList.contains("visible")
            ) {
              observer.observe(node);
            }
            // Also check children
            node.querySelectorAll?.(".reveal:not(.visible)").forEach((el) => {
              observer.observe(el);
            });
          }
        });
      }
    });

    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
