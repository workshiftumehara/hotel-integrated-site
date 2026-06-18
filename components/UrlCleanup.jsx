"use client";

import { useEffect } from "react";

export default function UrlCleanup() {
  useEffect(() => {
    if (window.location.hash === "#top") {
      window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
    }
  }, []);

  return null;
}
