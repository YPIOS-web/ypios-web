export const CONSENT_KEY = "ypios-consent-v1";
let memoryChoice: boolean | undefined;
const listeners = new Set<() => void>();
let channel: BroadcastChannel | undefined;
export function readAnalyticsConsent(): boolean {
  if (typeof window === "undefined") return false;
  if (memoryChoice !== undefined) return memoryChoice;
  try {
    return (
      JSON.parse(window.localStorage.getItem(CONSENT_KEY) || "null")
        ?.analytics === true
    );
  } catch {
    return false;
  }
}
export function hasConsentChoice(): boolean {
  if (memoryChoice !== undefined) return true;
  try {
    return (
      typeof JSON.parse(window.localStorage.getItem(CONSENT_KEY) || "null")
        ?.analytics === "boolean"
    );
  } catch {
    return false;
  }
}
function notify() {
  listeners.forEach((listener) => listener());
}
function storageChanged(event: StorageEvent) {
  if (event.key === CONSENT_KEY || event.key === null) {
    memoryChoice = undefined;
    notify();
  }
}
export function saveAnalyticsConsent(analytics: boolean) {
  // Apply the current choice even when browser storage is unavailable.
  memoryChoice = analytics;
  try {
    window.localStorage.setItem(
      CONSENT_KEY,
      JSON.stringify({
        essential: true,
        analytics,
        marketing: false,
        updatedAt: new Date().toISOString(),
      }),
    );
  } catch {}
  notify();
  try {
    channel?.postMessage({ analytics });
  } catch {}
}
export function subscribeConsent(listener: () => void) {
  if (listeners.size === 0) {
    window.addEventListener("storage", storageChanged);
    if (typeof BroadcastChannel !== "undefined") {
      try {
        channel = new BroadcastChannel(CONSENT_KEY);
        channel.onmessage = (event) => {
          if (typeof event.data?.analytics === "boolean") {
            memoryChoice = event.data.analytics;
            notify();
          }
        };
      } catch {}
    }
  }
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) {
      window.removeEventListener("storage", storageChanged);
      channel?.close();
      channel = undefined;
    }
  };
}
