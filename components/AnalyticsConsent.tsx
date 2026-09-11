"use client";

import { GoogleAnalytics, sendGAEvent } from "@next/third-parties/google";
import { useEffect, useState } from "react";

const STORAGE_KEY = "ypios-consent-v1";
const TRACKED_LEAD_PREFIX = "ypios-lead-tracked:";

type Consent = { analytics?: boolean };

export default function AnalyticsConsent({ gaId }: { gaId?: string }) {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const refresh = () => {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        const consent = raw ? (JSON.parse(raw) as Consent) : null;
        setAllowed(Boolean(consent?.analytics));
      } catch {
        setAllowed(false);
      }
    };

    refresh();
    window.addEventListener("ypios:consent-changed", refresh as EventListener);
    return () => window.removeEventListener("ypios:consent-changed", refresh as EventListener);
  }, []);

  useEffect(() => {
    if (!gaId || !/^G-[A-Z0-9]+$/i.test(gaId) || !allowed) return;

    window.dataLayer = window.dataLayer || [];

    const trackContactClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;

      const anchor = event.target.closest<HTMLAnchorElement>("a[href]");
      const href = anchor?.getAttribute("href");
      if (!anchor || !href) return;

      const eventParameters = { source_path: window.location.pathname };

      if (href.startsWith("mailto:")) {
        sendGAEvent("event", "email_click", eventParameters);
        return;
      }

      if (href.startsWith("tel:")) {
        sendGAEvent("event", "phone_click", eventParameters);
        return;
      }

      const targetUrl = new URL(anchor.href, window.location.origin);
      if (
        targetUrl.origin === window.location.origin &&
        targetUrl.pathname === "/contact" &&
        window.location.pathname !== "/contact"
      ) {
        sendGAEvent("event", "contact_intent", eventParameters);
      }
    };

    document.addEventListener("click", trackContactClick);

    const search = new URLSearchParams(window.location.search);
    const leadId = search.get("lead");
    const isValidLeadId = Boolean(leadId && /^[a-f0-9-]{36}$/i.test(leadId));

    if (search.get("sent") === "1" && leadId && isValidLeadId) {
      const storageKey = `${TRACKED_LEAD_PREFIX}${leadId}`;
      let alreadyTracked = false;

      try {
        alreadyTracked = sessionStorage.getItem(storageKey) === "1";
      } catch {}

      if (!alreadyTracked) {
        sendGAEvent("event", "generate_lead", { method: "website_form" });
        try {
          sessionStorage.setItem(storageKey, "1");
        } catch {}
      }

      search.delete("lead");
      const query = search.toString();
      window.history.replaceState(
        null,
        "",
        `${window.location.pathname}${query ? `?${query}` : ""}${window.location.hash}`,
      );
    }

    return () => document.removeEventListener("click", trackContactClick);
  }, [allowed, gaId]);

  if (!gaId || !/^G-[A-Z0-9]+$/i.test(gaId) || !allowed) return null;

  return <GoogleAnalytics gaId={gaId} />;
}
