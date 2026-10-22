"use client";

import Script from "next/script";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-CLTBCP9MYM";
const LINKER_DOMAINS = [
  "hotelshuffle.com",
  "www.hotelshuffle.com",
  "hotelrefrain.com",
  "www.hotelrefrain.com",
];
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

function sendPageView(pathname) {
  if (!GA_ID || typeof window === "undefined" || typeof window.gtag !== "function") {
    return false;
  }

  window.gtag("event", "page_view", {
    page_title: document.title,
    page_path: pathname,
    page_location: window.location.href,
  });

  return true;
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

function hotelFromAnchor(anchor, url) {
  const explicit = anchor.dataset.hotel;
  if (explicit === "shuffle" || explicit === "refrain" || explicit === "both") {
    return explicit;
  }

  const href = `${url} ${anchor.getAttribute("href") || ""}`.toLowerCase();
  if (href.includes("hotelshuffle.com") || href.includes("/hotel/jp/shuffle") || href.includes("tel:0339828071")) {
    return "shuffle";
  }
  if (href.includes("hotelrefrain.com") || href.includes("/hotel/jp/refrain") || href.includes("tel:0359502717")) {
    return "refrain";
  }

  return undefined;
}

function classifyLink(anchor) {
  const href = anchor.getAttribute("href") || "";
  const url = anchor.href || href;
  const lowered = `${href} ${url}`.toLowerCase();
  const forced = anchor.dataset.analyticsEvent;

  let eventName = forced;
  if (!eventName) {
    if (lowered.includes("tel:")) eventName = "tel_click";
    else if (
      lowered.includes("line.shuffle-refrain.com") ||
      lowered.includes("line.me") ||
      lowered.includes("lin.ee")
    ) {
      eventName = "line_click";
    } else if (lowered.includes("booking.com")) eventName = "booking_click";
    else if (lowered.includes("google.com/maps") || lowered.includes("maps.app.goo.gl")) eventName = "map_click";
    else if (lowered.includes("hotelshuffle.com") || lowered.includes("hotelrefrain.com")) {
      eventName = "official_site_click";
    } else if (
      href.startsWith("#") ||
      lowered.includes("shuffle-refrain.com") ||
      url.startsWith(window.location.origin)
    ) {
      eventName = "internal_navigation_click";
    } else eventName = "outbound_click";
  }

  return {
    eventName,
    hotel: hotelFromAnchor(anchor, url),
  };
}

function AnalyticsTracker() {
  const pathname = usePathname();
  const sectionStateRef = useRef(new Map());
  const scrollDepthRef = useRef(new Set());

  useEffect(() => {
    if (!GA_ID || typeof window === "undefined") {
      return;
    }

    const trackPageView = () => {
      if (sendPageView(pathname)) {
        scrollDepthRef.current = new Set();
        return true;
      }

      return false;
    };

    if (trackPageView()) {
      return;
    }

    window.addEventListener("ga4-ready", trackPageView, { once: true });
    const retryId = window.setTimeout(trackPageView, 1000);

    return () => {
      window.removeEventListener("ga4-ready", trackPageView);
      window.clearTimeout(retryId);
    };
  }, [pathname]);

  useEffect(() => {
    if (!GA_ID || typeof window === "undefined") {
      return undefined;
    }

    const handleClick = (event) => {
      const anchor = event.target.closest?.("a");
      if (!anchor || anchor.closest(".line-popup-card")) return;

      const { eventName, hotel } = classifyLink(anchor);
      const params = {
        link_text: (anchor.textContent || "").trim().replace(/\s+/g, " ").slice(0, 120),
        link_url: anchor.href || anchor.getAttribute("href"),
      };
      if (
        hotel &&
        ["booking_click", "tel_click", "line_click", "official_site_click"].includes(eventName)
      ) {
        params.hotel = hotel;
      }

      sendEvent(eventName, params);
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
          gtag('config', '${GA_ID}', {
            send_page_view: false,
            linker: {
              domains: ${JSON.stringify(LINKER_DOMAINS)},
              accept_incoming: true
            }
          });
          window.dispatchEvent(new Event('ga4-ready'));
        `}
      </Script>
      <AnalyticsTracker />
    </>
  );
}
