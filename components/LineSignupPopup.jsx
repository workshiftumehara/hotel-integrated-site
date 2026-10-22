"use client";

import { useEffect, useRef, useState } from "react";
import {
  getLinePopupConfig,
  LINE_POPUP_ENGAGEMENT_DELAY_MS,
  LINE_POPUP_DELAY_MS,
  LINE_POPUP_SCROLL_THRESHOLD,
  LINE_POPUP_SUPPRESSION_MS,
} from "@/lib/line-popup";

const STORAGE_KEY_PREFIX = "line-popup-suppressed:";

function getStorageKey(siteId) {
  return `${STORAGE_KEY_PREFIX}${siteId}`;
}

function getSuppressedUntil(siteId) {
  try {
    const value = Number(window.localStorage.getItem(getStorageKey(siteId)));
    return Number.isFinite(value) ? value : 0;
  } catch {
    return 0;
  }
}

function suppressForSite(siteId) {
  try {
    window.localStorage.setItem(
      getStorageKey(siteId),
      String(Date.now() + LINE_POPUP_SUPPRESSION_MS),
    );
  } catch {
    // localStorageが利用できない環境では、現在のマウント中だけ重複表示を防ぐ。
  }
}

function sendPopupEvent(name, config, extra = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }

  window.gtag("event", name, {
    page_location: window.location.href,
    page_path: window.location.pathname,
    popup_name: config.popupName,
    site_id: config.siteId,
    locale: document.documentElement.lang || "ja",
    ...extra,
  });
}

function getFocusableElements(dialog) {
  if (!dialog) return [];

  return Array.from(
    dialog.querySelectorAll(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ),
  );
}

export default function LineSignupPopup({ siteId = "integrated" }) {
  const config = getLinePopupConfig(siteId);
  const [isOpen, setIsOpen] = useState(false);
  const hasShownRef = useRef(false);
  const closeButtonRef = useRef(null);
  const dialogRef = useRef(null);
  const previouslyFocusedRef = useRef(null);

  useEffect(() => {
    if (!config.enabled || getSuppressedUntil(config.siteId) > Date.now()) {
      return undefined;
    }

    let intervalId = null;
    let elapsedMs = 0;
    let visibleSince = 0;
    let scrollPercent = getScrollPercent();

    function getScrollPercent() {
      const documentElement = document.documentElement;
      const scrollableHeight = Math.max(
        0,
        documentElement.scrollHeight - window.innerHeight,
      );

      if (scrollableHeight === 0) return 100;

      return Math.min(
        100,
        Math.max(0, Math.round((window.scrollY / scrollableHeight) * 100)),
      );
    }

    const getCurrentElapsedMs = () =>
      elapsedMs + (visibleSince ? performance.now() - visibleSince : 0);

    const showPopup = (trigger) => {
      if (hasShownRef.current) return;

      hasShownRef.current = true;
      if (intervalId !== null) {
        window.clearInterval(intervalId);
        intervalId = null;
      }
      sendPopupEvent("popup_view", config, { popup_trigger: trigger });
      setIsOpen(true);
    };

    const checkEligibility = () => {
      if (hasShownRef.current) return;

      const currentElapsedMs = getCurrentElapsedMs();
      scrollPercent = getScrollPercent();

      if (
        currentElapsedMs >= LINE_POPUP_ENGAGEMENT_DELAY_MS &&
        scrollPercent >= LINE_POPUP_SCROLL_THRESHOLD
      ) {
        showPopup("time_10s_scroll_40");
        return;
      }

      if (currentElapsedMs >= LINE_POPUP_DELAY_MS) {
        showPopup("time_25s_fallback");
      }
    };

    const pauseTimer = () => {
      if (intervalId !== null) {
        window.clearInterval(intervalId);
        intervalId = null;
      }

      if (visibleSince) {
        elapsedMs += performance.now() - visibleSince;
        visibleSince = 0;
      }
    };

    const startTimer = () => {
      if (
        hasShownRef.current ||
        intervalId !== null ||
        document.visibilityState !== "visible"
      ) {
        return;
      }

      visibleSince = performance.now();
      intervalId = window.setInterval(checkEligibility, 250);
      checkEligibility();
    };

    const handleScroll = () => {
      scrollPercent = getScrollPercent();
      checkEligibility();
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        startTimer();
      } else {
        pauseTimer();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("scroll", handleScroll, { passive: true });
    startTimer();

    return () => {
      pauseTimer();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [config]);

  useEffect(() => {
    if (!isOpen) return undefined;

    previouslyFocusedRef.current = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusFrame = window.requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closePopup("escape");
        return;
      }

      if (event.key !== "Tab") return;

      const focusableElements = getFocusableElements(dialogRef.current);
      if (focusableElements.length === 0) return;

      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      previouslyFocusedRef.current?.focus?.();
    };
  }, [isOpen]);

  const closePopup = (reason) => {
    if (!isOpen) return;

    suppressForSite(config.siteId);
    sendPopupEvent("popup_close", config, { popup_close_reason: reason });
    setIsOpen(false);
  };

  const handleLineClick = () => {
    suppressForSite(config.siteId);
    sendPopupEvent("line_click", config, {
      destination: config.lineUrl,
      destination_kind: config.destinationKind,
    });
    setIsOpen(false);
  };

  if (!config.enabled || !isOpen) return null;

  return (
    <div
      className="line-popup-shell"
      role="presentation"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          closePopup("backdrop");
        }
      }}
    >
      <div
        ref={dialogRef}
        className="line-popup-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="line-popup-title"
        aria-describedby="line-popup-description"
      >
        <div className="line-popup-topline">
          <span className="line-popup-mark" aria-hidden="true">
            LINE
          </span>
          <span className="line-popup-kicker">Official account</span>
        </div>

        <button
          ref={closeButtonRef}
          className="line-popup-close"
          type="button"
          aria-label="ポップアップを閉じる"
          onClick={() => closePopup("close_button")}
        >
          <span aria-hidden="true">×</span>
        </button>

        <p className="line-popup-eyebrow">{config.brand}</p>
        <h2 id="line-popup-title">{config.title}</h2>
        <p id="line-popup-description" className="line-popup-description">
          {config.description}
        </p>

        <ol className="line-popup-steps" aria-label="クーポンを受け取る流れ">
          <li>
            <span>01</span>
            <strong>友だち追加</strong>
          </li>
          <li>
            <span>02</span>
            <strong>LINEを確認</strong>
          </li>
          <li>
            <span>03</span>
            <strong>クーポン受取</strong>
          </li>
        </ol>

        <a
          className="line-popup-cta"
          href={config.lineUrl}
          target="_blank"
          rel="noreferrer"
          onClick={handleLineClick}
        >
          公式LINEを友だち追加
          <span aria-hidden="true">↗</span>
        </a>

        <button
          className="line-popup-later"
          type="button"
          onClick={() => closePopup("later_link")}
        >
          あとで見る
        </button>

        <p className="line-popup-note">{config.note}</p>
      </div>
    </div>
  );
}
