"use client";

import { GoogleAnalytics } from "@next/third-parties/google";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const STORAGE_KEY = "ypios-consent-v1";
const TRACKED_LEAD_PREFIX = "ypios-lead-tracked:";
const GA_READY_RETRY_MS = 100;
const GA_READY_MAX_ATTEMPTS = 50;

type Consent = { analytics?: boolean };
type AnalyticsWindow = Window & {
  gtag?: (command: "event", eventName: string, parameters: Record<string, string>) => void;
};

function sendAnalyticsEvent(eventName: string, parameters: Record<string, string>) {
  const gtag = (window as AnalyticsWindow).gtag;
  if (typeof gtag !== "function") return false;

  gtag("event", eventName, parameters);
  return true;
}

export default function AnalyticsConsent({ gaId }: { gaId?: string }) {
  const [allowed, setAllowed] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchString = searchParams.toString();

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
        sendAnalyticsEvent("email_click", eventParameters);
        return;
      }

      if (href.startsWith("tel:")) {
        sendAnalyticsEvent("phone_click", eventParameters);
        return;
      }

      const targetUrl = new URL(anchor.href, window.location.origin);
      if (
        targetUrl.origin === window.location.origin &&
        targetUrl.pathname === "/contact" &&
        window.location.pathname !== "/contact"
      ) {
        sendAnalyticsEvent("contact_intent", eventParameters);
      }
    };

    document.addEventListener("click", trackContactClick);

    return () => document.removeEventListener("click", trackContactClick);
  }, [allowed, gaId]);

  useEffect(() => {
    if (!gaId || !/^G-[A-Z0-9]+$/i.test(gaId) || !allowed) return;

    let leadTrackingTimer: number | undefined;

    const search = new URLSearchParams(searchString);
    const leadId = search.get("lead");
    const isValidLeadId = Boolean(leadId && /^[a-f0-9-]{36}$/i.test(leadId));

    if (search.get("sent") === "1" && leadId && isValidLeadId) {
      const storageKey = `${TRACKED_LEAD_PREFIX}${leadId}`;
      let alreadyTracked = false;

      try {
        alreadyTracked = sessionStorage.getItem(storageKey) === "1";
      } catch {}

      const removeLeadToken = () => {
        search.delete("lead");
        const query = search.toString();
        window.history.replaceState(
          null,
          "",
          `${pathname}${query ? `?${query}` : ""}${window.location.hash}`,
        );
      };

      if (alreadyTracked) {
        removeLeadToken();
      } else {
        const trackLeadWhenReady = (attempt: number) => {
          if (!sendAnalyticsEvent("generate_lead", { method: "website_form" })) {
            if (attempt < GA_READY_MAX_ATTEMPTS) {
              leadTrackingTimer = window.setTimeout(
                () => trackLeadWhenReady(attempt + 1),
                GA_READY_RETRY_MS,
              );
            }
            return;
          }

          try {
            sessionStorage.setItem(storageKey, "1");
          } catch {}

          removeLeadToken();
        };

        trackLeadWhenReady(0);
      }
    }

    return () => {
      if (leadTrackingTimer !== undefined) window.clearTimeout(leadTrackingTimer);
    };
  }, [allowed, gaId, pathname, searchString]);

  if (!gaId || !/^G-[A-Z0-9]+$/i.test(gaId) || !allowed) return null;

  return <GoogleAnalytics gaId={gaId} />;
}
