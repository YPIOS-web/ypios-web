// Test process only. Never imported by the application.
const realFetch = globalThis.fetch;
globalThis.fetch = async (input, init) => {
  const url = new URL(String(input?.url || input));
  if (url.href === "https://www.google.com/recaptcha/api/siteverify") {
    const token = new URLSearchParams(String(init?.body || "")).get("response");
    if (token === "FAKE-ERROR") throw Error("SIMULATED CAPTCHA OUTAGE");
    return Response.json({ success: token === "FAKE-OK" });
  }
  if (!["127.0.0.1", "localhost", "[::1]"].includes(url.hostname))
    throw Error("EXTERNAL_FETCH_DENIED_IN_SECURITY_TEST");
  return realFetch(input, init);
};
