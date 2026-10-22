"use client";

import { useEffect } from "react";

export default function Reveal() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("reveal-ready");

    const targets = Array.from(document.querySelectorAll("[data-reveal]"));
    if (targets.length === 0) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.06 },
    );

    targets.forEach((target) => {
      const rect = target.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.92) {
        target.classList.add("is-visible");
      } else {
        observer.observe(target);
      }
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
