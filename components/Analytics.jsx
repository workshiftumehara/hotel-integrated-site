"use client";

import Script from "next/script";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const READ_THRESHOLD_MS = 8000;
const ENGAGEMENT_THRESHOLD_MS = 1500;

function sendEvent(name, params = {}) {
  if (!GA_ID || typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }

  window.gtag("event", name, {
    page_location: window.location.href,
    page_path: window.location.pathname,
    ...params,
  });
}

function getElementLabel(element) {
  const headingId = element.getAttribute("aria-labelledby");
  const heading = headingId ? document.getElementById(headingId) : null;
  const label =
    element.dataset.analyticsSection ||
    element.id ||
    element.getAttribute("aria-label") ||
    heading?.textContent ||
    element.querySelector("h1, h2, h3")?.textContent ||
    element.className ||
    element.tagName;

  return String(label).trim().replace(/\s+/g, " ").slice(0, 120);
}

function classifyLink(anchor) {
  const href = anchor.getAttribute("href") || "";
  const url = anchor.href || href;

  if (url.includes("booking.com")) return "booking_click";
  if (url.includes("google.com/maps") || url.includes("maps.app.goo.gl")) return "map_click";
  if (url.includes("hotelshuffle.com") || url.includes("hotelrefrain.com")) return "official_site_click";
  if (href.startsWith("#") || url.includes("shuffle-refrain.com") || url.startsWith(window.location.origin)) {
    return "internal_navigation_click";
  }

  return "outbound_click";
}

function AnalyticsTracker() {
  const pathname = usePathname();
  const sectionStateRef = useRef(new Map());
  const scrollDepthRef = useRef(new Set());

  useEffect(() => {
    if (!GA_ID || typeof window === "undefined" || typeof window.gtag !== "function") {
      return;
    }

    window.gtag("config", GA_ID, {
      page_path: pathname,
      page_location: window.location.href,
      send_page_view: true,
    });

    scrollDepthRef.current = new Set();
  }, [pathname]);

  useEffect(() => {
    if (!GA_ID || typeof window === "undefined") {
      return undefined;
    }

    const handleClick = (event) => {
      const anchor = event.target.closest?.("a");
      if (!anchor) return;

      sendEvent(classifyLink(anchor), {
        link_text: (anchor.textContent || "").trim().replace(/\s+/g, " ").slice(0, 120),
        link_url: anchor.href || anchor.getAttribute("href"),
      });
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  useEffect(() => {
    if (!GA_ID || typeof window === "undefined") {
      return undefined;
    }

    const handleScroll = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;

      const depth = Math.round((window.scrollY / scrollable) * 100);
      [25, 50, 75, 90].forEach((mark) => {
        if (depth >= mark && !scrollDepthRef.current.has(mark)) {
          scrollDepthRef.current.add(mark);
          sendEvent("scroll_depth", { percent_scrolled: mark });
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  useEffect(() => {
    if (!GA_ID || typeof window === "undefined" || !("IntersectionObserver" in window)) {
      return undefined;
    }

    const targets = Array.from(
      document.querySelectorAll("main section, main article, .subpage-section, .subpage-hero"),
    );
    const state = sectionStateRef.current;

    const closeSection = (element, now = performance.now()) => {
      const item = state.get(element);
      if (!item?.visibleSince) return;

      const durationMs = now - item.visibleSince;
      item.visibleSince = null;
      item.totalMs += durationMs;

      if (durationMs >= ENGAGEMENT_THRESHOLD_MS) {
        sendEvent("section_engagement", {
          section_name: item.label,
          engagement_seconds: Math.round(durationMs / 1000),
        });
      }

      if (!item.readSent && item.totalMs >= READ_THRESHOLD_MS) {
        item.readSent = true;
        sendEvent("section_read", {
          section_name: item.label,
          engagement_seconds: Math.round(item.totalMs / 1000),
        });
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const now = performance.now();

        entries.forEach((entry) => {
          const element = entry.target;
          if (!state.has(element)) {
            state.set(element, {
              label: getElementLabel(element),
              viewed: false,
              visibleSince: null,
              totalMs: 0,
              readSent: false,
            });
          }

          const item = state.get(element);
          if (entry.isIntersecting && entry.intersectionRatio >= 0.45) {
            if (!item.viewed) {
              item.viewed = true;
              sendEvent("section_view", { section_name: item.label });
            }
            if (!item.visibleSince) {
              item.visibleSince = now;
            }
          } else {
            closeSection(element, now);
          }
        });
      },
      { threshold: [0, 0.45, 0.75] },
    );

    targets.forEach((target) => observer.observe(target));

    const closeAll = () => {
      const now = performance.now();
      targets.forEach((target) => closeSection(target, now));
    };

    window.addEventListener("pagehide", closeAll);
    document.addEventListener("visibilitychange", closeAll);

    return () => {
      closeAll();
      observer.disconnect();
      window.removeEventListener("pagehide", closeAll);
      document.removeEventListener("visibilitychange", closeAll);
      state.clear();
    };
  }, [pathname]);

  return null;
}

export default function Analytics() {
  if (!GA_ID) {
    return null;
  }

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { send_page_view: false });
        `}
      </Script>
      <AnalyticsTracker />
    </>
  );
}
