import { readAnalyticsConsent } from "./consent";
type EventName =
  | "contact_intent"
  | "email_click"
  | "phone_click"
  | "generate_lead";
type AnalyticsWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
};
type Environment = {
  win: () => AnalyticsWindow | undefined;
  consent: () => boolean;
  now: () => number;
  later: (callback: () => void, delay: number) => ReturnType<typeof setTimeout>;
  cancel: (timer: ReturnType<typeof setTimeout>) => void;
};
type Pending = {
  name: EventName;
  parameters: Record<string, string>;
  expires: number;
  key?: string;
};
const UUID =
  /^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i;
export function createAnalyticsController(env: Environment) {
  let gaId = "",
    production = false,
    initialized = false,
    active = false,
    ready = false,
    failed = false;
  let pending: Pending[] = [];
  const consumed = new Set<string>();
  let timer: ReturnType<typeof setTimeout> | undefined;
  const status = { queued: 0, dispatched: 0, unavailable: 0 };
  const enabled = () =>
    Boolean(
      production &&
        /^G-[A-Z0-9]+$/i.test(gaId) &&
        env.win()?.location.hostname === "www.ypios.fr" &&
        env.consent(),
    );
  function clearPending() {
    pending = [];
    status.queued = 0;
    if (timer !== undefined) env.cancel(timer);
    timer = undefined;
  }
  function purgeCookies(win: AnalyticsWindow) {
    try {
      for (const cookie of win.document.cookie.split(";")) {
        const name = cookie.trim().split("=")[0];
        if (name !== "_ga" && !name.startsWith("_ga_")) continue;
        for (const domain of ["", "; domain=www.ypios.fr", "; domain=ypios.fr"])
          win.document.cookie = `${name}=; Max-Age=0; path=/${domain}; SameSite=Lax`;
      }
    } catch {
      /* Cookie restrictions must not break the contact form. */
    }
  }
  function refresh() {
    const win = env.win();
    if (!win || !gaId) return;
    (win as unknown as Record<string, unknown>)[`ga-disable-${gaId}`] =
      !enabled();
    if (!enabled()) {
      active = false;
      clearPending();
      purgeCookies(win);
      return;
    }
    try {
      if (!initialized) {
        win.dataLayer = win.dataLayer || [];
        win.gtag =
          typeof win.gtag === "function"
            ? win.gtag
            : function () {
                win.dataLayer!.push(arguments);
              };
        initialized = true;
        win.gtag("js", new Date());
      }
      if (!active) {
        (win as unknown as Record<string, unknown>)[`ga-disable-${gaId}`] =
          true;
        const location = new URL(win.location.href);
        if (location.pathname === "/contact") {
          location.searchParams.delete("lead");
          location.searchParams.delete("sent");
          if (location.href !== win.location.href)
            win.history.replaceState(win.history.state, "", location.href);
        }
        // Let GA infer the current URL on every navigation; do not pin page_location.
        (win as unknown as Record<string, unknown>)[`ga-disable-${gaId}`] =
          false;
        win.gtag!("config", gaId);
        active = true;
      }
    } catch {
      // Analytics is optional: even a broken tag must never break the form.
      failed = true;
    }
    flush();
  }
  function flush() {
    if (timer !== undefined) env.cancel(timer);
    timer = undefined;
    if (!enabled()) {
      clearPending();
      return;
    }
    const win = env.win()!;
    pending = pending.filter((event) => {
      if (failed || env.now() >= event.expires) {
        status.unavailable++;
        return false;
      }
      if (!ready || typeof win.gtag !== "function") return true;
      // Dispatch is not an acknowledgement from Google; never retry a dispatched event.
      try {
        win.gtag("event", event.name, event.parameters);
      } catch {
        status.unavailable++;
        return false;
      }
      status.dispatched++;
      if (event.key) {
        try {
          win.sessionStorage.setItem(`ypios-lead-tracked:${event.key}`, "1");
        } catch {}
      }
      return false;
    });
    status.queued = pending.length;
    if (pending.length) timer = env.later(flush, 250);
  }
  function enqueue(
    name: EventName,
    parameters: Record<string, string>,
    key?: string,
  ) {
    if (!enabled()) return false;
    if (key) {
      if (!UUID.test(key) || consumed.has(key)) return false;
      try {
        if (
          env.win()!.sessionStorage.getItem(`ypios-lead-tracked:${key}`) === "1"
        )
          return false;
      } catch {}
      consumed.add(key);
    }
    if (failed || pending.length >= 50) {
      status.unavailable++;
      return false;
    }
    pending.push({ name, parameters, key, expires: env.now() + 30_000 });
    flush();
    return true;
  }
  return {
    configure(id: string | undefined, isProduction: boolean) {
      gaId = id || "";
      production = isProduction;
      refresh();
    },
    refresh,
    loaded() {
      ready = true;
      failed = false;
      flush();
    },
    failed() {
      failed = true;
      flush();
    },
    contact(name: Exclude<EventName, "generate_lead">, sourcePath: string) {
      return enqueue(name, { source_path: sourcePath });
    },
    lead(requestId: string) {
      return enqueue("generate_lead", { method: "website_form" }, requestId);
    },
    snapshot() {
      return { ...status, enabled: enabled(), ready, failed };
    },
  };
}
export const analytics = createAnalyticsController({
  win: () => (typeof window === "undefined" ? undefined : window),
  consent: readAnalyticsConsent,
  now: Date.now,
  later: (callback, delay) => setTimeout(callback, delay),
  cancel: (timer) => clearTimeout(timer),
});
