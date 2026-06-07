"use client";

import { useEffect } from "react";

export function ScrollReveal() {
  useEffect(() => {
    const isInView = (el: Element) => {
      const rect = el.getBoundingClientRect();
      return rect.top < window.innerHeight - 60;
    };

    const checkReveals = () => {
      document.querySelectorAll(".reveal").forEach((el) => {
        if (isInView(el)) el.classList.add("visible");
      });
    };

    checkReveals();
    window.addEventListener("scroll", checkReveals, { passive: true });
    window.addEventListener("resize", checkReveals, { passive: true });

    // Re-check on DOM changes (client-side navigation)
    const observer = new MutationObserver(() => {
      checkReveals();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    // Fallback: re-check after a short delay for async-rendered content
    const timer = setTimeout(checkReveals, 300);

    return () => {
      window.removeEventListener("scroll", checkReveals);
      window.removeEventListener("resize", checkReveals);
      observer.disconnect();
      clearTimeout(timer);
    };
  }, []);

  return null;
}
