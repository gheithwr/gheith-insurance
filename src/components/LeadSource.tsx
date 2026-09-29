"use client";

import { useEffect } from "react";

export function LeadSourceCapture() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const keys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "source"];
    const found: Record<string, string> = {};
    let has = false;
    keys.forEach((k) => {
      const v = params.get(k);
      if (v) {
        found[k] = v;
        has = true;
      }
    });
    if (has) {
      const existing = JSON.parse(sessionStorage.getItem("gi_utm") || "{}");
      sessionStorage.setItem("gi_utm", JSON.stringify({ ...existing, ...found }));
    }
  }, []);
  return null;
}

export function readUtm() {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(sessionStorage.getItem("gi_utm") || "{}");
  } catch {
    return {};
  }
}
