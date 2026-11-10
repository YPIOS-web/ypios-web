// Production Next HTTP regression checks. SMTP and CAPTCHA are local fakes.
// No C1-C3 implementation is imported, copied or enabled.
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const net = require("node:net");
const http = require("node:http");
const { spawn } = require("node:child_process");
const { test } = require("node:test");
const root = path.resolve(__dirname, "..");
const run = process.env.YPIOS_SECURITY_RUN || "patched";
assert.match(run, /^[a-z0-9-]+$/);
const destination = path.join(root, "test-results", "security", run);
const port = 3141,
  smtpPort = 2541,
  origin = `http://127.0.0.1:${port}`;
const inbox = [],
  results = [],
  reservations = [];
const sockets = new Set();
let rejectAll = false,
  rejectPrincipal = false,
  serverLog = "",
  ipIndex = 1;
const smtp = net.createServer((socket) => {
  sockets.add(socket);
  socket.on("close", () => sockets.delete(socket));
  socket.setEncoding("utf8");
  socket.write("220 LOCAL SECURITY TEST SMTP\r\n");
  let buffer = "",
    data = false,
    body = "";
  socket.on("data", (chunk) => {
    buffer += chunk;
    let end;
    while ((end = buffer.indexOf("\r\n")) >= 0) {
      const line = buffer.slice(0, end);
      buffer = buffer.slice(end + 2);
      if (data) {
        if (line === ".") {
          data = false;
          inbox.push(body);
          body = "";
          socket.write("250 Accepted by LOCAL FAKE ONLY\r\n");
        } else body += line + "\r\n";
      } else if (/^EHLO|^HELO/.test(line))
        socket.write("250-localhost\r\n250 AUTH PLAIN\r\n");
      else if (/^AUTH/.test(line)) socket.write("235 Fake authentication\r\n");
      else if (
        /^RCPT TO:/i.test(line) &&
        (rejectAll || (rejectPrincipal && /main@example.invalid/i.test(line)))
      )
        socket.write("550 LOCAL FAKE REJECTION\r\n");
      else if (/^DATA/.test(line)) {
        data = true;
        socket.write("354 End data\r\n");
      } else if (/^QUIT/.test(line)) socket.end("221 Bye\r\n");
      else socket.write("250 OK\r\n");
    }
  });
});
const decode = (s) =>
  s
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
function attributes(tag) {
  return Object.fromEntries(
    [...tag.matchAll(/([^\s=<>/]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g)].map(
      (m) => [m[1].toLowerCase(), decode(m[2] ?? m[3])],
    ),
  );
}
function snapshot(html, response) {
  const metadata = [...html.matchAll(/<meta\b[^>]*>/gi)]
    .map((m) => attributes(m[0]))
    .filter((x) => x.name || x.property)
    .map((x) => [x.name || x.property, x.content || ""])
    .sort((a, b) => a[0].localeCompare(b[0]));
  const rawCanonical = [...html.matchAll(/<link\b[^>]*>/gi)]
    .map((m) => attributes(m[0]))
    .find((x) => x.rel === "canonical")?.href;
  const canonical = rawCanonical ? new URL(rawCanonical).href : undefined;
  const structured = [
    ...html.matchAll(
      /<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi,
    ),
  ].map((m) => JSON.parse(m[1]));
  const anchors = [...html.matchAll(/<a\b[^>]*>/gi)]
    .map((m) => attributes(m[0]).href)
    .filter((x) => x?.startsWith("/") && !x.startsWith("//"));
  const h1 = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map((m) =>
    decode(m[1].replace(/<[^>]+>/g, "")),
  );
  return {
    status: response.status,
    title: decode(html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] || ""),
    canonical,
    metadata,
    structured,
    h1,
    links: [...new Set(anchors)].sort(),
    csp: response.headers.get("content-security-policy"),
  };
}
test(
  "Security upgrade: production HTTP, Server Action, fake SMTP, pages and SEO",
  { timeout: 120000 },
  async (t) => {
    for (const filename of [
      ".env",
      ".env.local",
      ".env.production",
      ".env.production.local",
    ])
      assert.equal(
        fs.existsSync(path.join(root, filename)),
        false,
        "Use an isolated checkout without real environment files",
      );
    fs.mkdirSync(destination, { recursive: true });
    await new Promise((resolve) => smtp.listen(smtpPort, "127.0.0.1", resolve));
    const env = {
      PATH: process.env.PATH,
      HOME: process.env.HOME,
      TMPDIR: process.env.TMPDIR,
      NODE_OPTIONS:
        "--require " +
        JSON.stringify(path.join(__dirname, "security-preload.cjs")),
      NEXT_TELEMETRY_DISABLED: "1",
      NEXT_PUBLIC_GA_ID: "",
      NEXT_PUBLIC_RECAPTCHA_SITE_KEY: "FAKE_LOCAL_SECURITY",
      RECAPTCHA_SECRET_KEY: "FAKE",
      SMTP_HOST: "127.0.0.1",
      SMTP_PORT: String(smtpPort),
      SMTP_SECURE: "false",
      SMTP_USER: "from@example.invalid",
      SMTP_PASS: "FAKE",
      SMTP_FROM: "from@example.invalid",
      CONTACT_TO: "main@example.invalid",
      CONTACT_CC: "copy@example.invalid",
    };
    const child = spawn(
      process.execPath,
      [
        path.join(root, "node_modules/next/dist/bin/next"),
        "start",
        "--hostname",
        "127.0.0.1",
        "--port",
        String(port),
      ],
      { cwd: root, env, stdio: ["ignore", "pipe", "pipe"] },
    );
    child.stdout.on("data", (data) => (serverLog += data));
    child.stderr.on("data", (data) => (serverLog += data));
    const seo = { routes: {}, redirects: {} };
    async function check(name, fn) {
      await t.test(name, async () => {
        try {
          await fn();
          results.push({ name, status: "PASS_LOCAL" });
        } catch (error) {
          results.push({ name, status: "FAIL", error: error.message });
          throw error;
        }
      });
    }
    try {
      let ready = false;
      for (let i = 0; i < 100; i++) {
        try {
          if ((await fetch(origin + "/contact")).ok) {
            ready = true;
            break;
          }
        } catch {}
        await new Promise((resolve) => setTimeout(resolve, 150));
      }
      assert.ok(ready, "Production Next server must start");
      const robots = await fetch(origin + "/robots.txt");
      seo.robots = await robots.text();
      const sitemap = await fetch(origin + "/sitemap.xml");
      seo.sitemap = await sitemap.text();
      const paths = [...seo.sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
        (m) => new URL(decode(m[1])).pathname,
      );
      await check("robots and sitemap are public and canonical", async () => {
        assert.equal(robots.status, 200);
        assert.equal(sitemap.status, 200);
        assert.match(
          seo.robots,
          /Sitemap: https:\/\/www\.ypios\.fr\/sitemap\.xml/,
        );
        assert.equal(paths.length, 16);
        assert.equal(new Set(paths).size, paths.length);
      });
      for (const route of paths)
        await check("Public page and SEO " + route, async () => {
          const response = await fetch(origin + route);
          const html = await response.text();
          const current = snapshot(html, response);
          seo.routes[route] = current;
          assert.equal(current.status, 200);
          assert.ok(current.title.includes("YPIOS"));
          assert.equal(
            current.canonical,
            "https://www.ypios.fr" + (route === "/" ? "/" : route),
          );
          assert.equal(current.h1.length, 1);
          assert.ok(
            current.metadata.find(
              ([key, value]) => key === "description" && value.length > 0,
            ),
          );
          assert.ok(
            current.structured.some(
              (item) =>
                item["@type"] === "LocalBusiness" &&
                item.name === "YPIOS" &&
                item.areaServed === "Île-de-France",
            ),
          );
          assert.match(current.csp, /form-action 'self'/);
          assert.match(current.csp, /frame-ancestors 'none'/);
          assert.equal(
            html.includes("FAKE_LOCAL_SECURITY"),
            route === "/contact",
          );
        });
      for (const [route, target] of [
        ["/cgu", "/mentions-legales"],
        ["/politique-des-cookies", "/cookies"],
        ["/services/a-propos", "/"],
      ])
        await check("Redirect " + route, async () => {
          const response = await fetch(origin + route, { redirect: "manual" });
          const location = response.headers.get("location");
          seo.redirects[route] = { status: response.status, location };
          assert.equal(response.status, 308);
          assert.equal(new URL(location, origin).pathname, target);
        });
      const rawGet = (route, host) =>
        new Promise((resolve, reject) => {
          const request = http.get(
            {
              host: "127.0.0.1",
              port,
              path: route,
              headers: {
                Host: host || "127.0.0.1:" + port,
                Connection: "close",
              },
            },
            (response) => {
              response.resume();
              response.on("end", () => resolve(response));
            },
          );
          request.on("error", reject);
        });
      await check("Apex host redirects to canonical www", async () => {
        const r = await rawGet("/services/gtc-gtb", "ypios.fr");
        assert.equal(r.statusCode, 308);
        assert.equal(
          r.headers.location,
          "https://www.ypios.fr/services/gtc-gtb",
        );
      });
      await check(
        "Unpublished realization and unknown URL are 404",
        async () => {
          for (const route of [
            "/realisations/invalid-security-test",
            "/invalid-security-test",
          ])
            assert.equal((await fetch(origin + route)).status, 404);
        },
      );
      await check(
        "Internal page links resolve without broken URL",
        async () => {
          const links = [
            ...new Set(Object.values(seo.routes).flatMap((item) => item.links)),
          ];
          for (const link of links) {
            const response = await fetch(origin + link, { redirect: "manual" });
            assert.ok(
              [200, 307, 308].includes(response.status),
              link + " returned " + response.status,
            );
          }
        },
      );
      await check("OpenGraph PNG and optimized local image work", async () => {
        const og = await fetch(origin + "/opengraph-image");
        assert.equal(og.status, 200);
        assert.match(og.headers.get("content-type"), /image\/png/);
        const png = Buffer.from(await og.arrayBuffer());
        assert.equal(png.subarray(1, 4).toString(), "PNG");
        fs.writeFileSync(path.join(destination, "opengraph.png"), png);
        const image = await fetch(
          origin +
            "/_next/image?url=%2Fimages%2Fchantier%2Fsaint-quentin-hero.webp&w=640&q=75",
          { headers: { Accept: "image/webp" } },
        );
        assert.equal(image.status, 200);
        assert.match(image.headers.get("content-type"), /image\//);
      });
      await check(
        "SVG and unauthorized remote optimization remain refused",
        async () => {
          for (const url of [
            "%2Fbrand%2Fypios-logo.svg",
            "https%3A%2F%2Fexample.invalid%2Fa.svg",
          ])
            assert.equal(
              (await fetch(origin + "/_next/image?url=" + url + "&w=640&q=75"))
                .status,
              400,
            );
        },
      );
      async function form() {
        const response = await fetch(origin + "/contact");
        const html = await response.text();
        const data = new FormData();
        const markup = html.match(/<form\b[\s\S]*?<\/form>/i)?.[0];
        assert.ok(markup);
        for (const match of markup.matchAll(/<input\b[^>]*>/gi)) {
          const input = attributes(match[0]);
          if (input.type === "hidden")
            data.append(input.name, input.value || "");
        }
        assert.ok(
          [...data.keys()].some((key) => key.startsWith("$ACTION_")),
          "Real React Server Action metadata required",
        );
        for (const [key, value] of Object.entries({
          nom: "LOCAL SECURITY TEST",
          email: "test@example.invalid",
          message: "LOCAL ONLY NO COMMERCIAL REQUEST",
          sujet: "SECURITY REGRESSION",
          type: "Maintenance",
          service: "Climatisation",
          "g-recaptcha-response": "FAKE-OK",
        }))
          data.append(key, value);
        return data;
      }
      async function post(
        data,
        { ip, originHeader = origin, close = false } = {},
      ) {
        return fetch(origin + "/contact", {
          method: "POST",
          headers: {
            Origin: originHeader,
            "x-forwarded-for": ip || "192.0.2." + ipIndex++,
            ...(close ? { Connection: "close" } : {}),
          },
          body: data,
          redirect: "manual",
        });
      }
      function outcome(response, key, value) {
        assert.equal(response.status, 303);
        assert.equal(
          new URL(response.headers.get("location"), origin).searchParams.get(
            key,
          ),
          value,
        );
      }
      await check(
        "Actual Server Action accepts a request through fake SMTP",
        async () => {
          const before = inbox.length;
          const r = await post(await form());
          outcome(r, "sent", "1");
          assert.equal(inbox.length, before + 1);
          assert.match(inbox.at(-1), /main@example.invalid/);
          assert.match(inbox.at(-1), /LOCAL SECURITY TEST/);
        },
      );
      await check("PDF attachment reaches only the fake mailbox", async () => {
        const data = await form();
        data.append(
          "files",
          new File(["%PDF-1.4\nLOCAL FAKE PDF"], "local.pdf"),
        );
        const before = inbox.length;
        outcome(await post(data), "sent", "1");
        assert.equal(inbox.length, before + 1);
        assert.match(inbox.at(-1), /application\/pdf/);
      });
      for (const token of ["FAKE-REJECT", "FAKE-ERROR"])
        await check("CAPTCHA refusal/outage " + token, async () => {
          const data = await form();
          data.set("g-recaptcha-response", token);
          const before = inbox.length;
          outcome(await post(data), "error", "captcha");
          assert.equal(inbox.length, before);
        });
      for (const [field, value] of [
        ["nom", ""],
        ["email", "invalid"],
        ["email", "x".repeat(161) + "@example.invalid"],
        ["message", "x".repeat(5001)],
      ])
        await check(
          "Field rejected " + field + " " + value.length,
          async () => {
            const data = await form();
            data.set(field, value);
            const before = inbox.length;
            outcome(await post(data), "error", "fields");
            assert.equal(inbox.length, before);
          },
        );
      const fileCases = [
        ["type", () => [new File(["NOT PDF"], "bad.pdf")]],
        [
          "maxfiles",
          () => Array.from({ length: 6 }, () => new File(["%PDF-"], "a.pdf")),
        ],
        [
          "maxsize",
          () => [new File([new Uint8Array(5 * 1024 * 1024 + 1)], "a.pdf")],
        ],
        [
          "totalsize",
          () => [
            new File([new Uint8Array(5 * 1024 * 1024)], "a.pdf"),
            new File([new Uint8Array(4 * 1024 * 1024)], "b.pdf"),
          ],
        ],
      ];
      for (const [error, files] of fileCases)
        await check("Attachment rejected " + error, async () => {
          const data = await form();
          for (const file of files()) data.append("files", file);
          const before = inbox.length;
          outcome(await post(data), "error", error);
          assert.equal(inbox.length, before);
        });
      await check("SMTP rejection is an explicit failure", async () => {
        rejectAll = true;
        try {
          const before = inbox.length;
          outcome(await post(await form()), "error", "mail");
          assert.equal(inbox.length, before);
        } finally {
          rejectAll = false;
        }
      });
      await check(
        "IP anti-spam remains five attempts per ten minutes",
        async () => {
          const ip = "203.0.113.100";
          const before = inbox.length;
          for (let i = 0; i < 5; i++)
            outcome(await post(await form(), { ip }), "sent", "1");
          outcome(await post(await form(), { ip }), "error", "rate");
          assert.equal(inbox.length, before + 5);
        },
      );
      await check(
        "Cross-origin Server Action is rejected before SMTP",
        async () => {
          const before = inbox.length;
          const r = await post(await form(), {
            originHeader: "https://example.invalid",
          });
          assert.ok(r.status >= 400);
          assert.equal(inbox.length, before);
        },
      );
      // A probe of an already documented C1-C3 defect, never treated as a corrected behaviour.
      rejectPrincipal = true;
      try {
        const r = await post(await form());
        reservations.push({
          name: "Primary rejected / copy accepted",
          status: r.status,
          location: r.headers.get("location"),
          scope:
            "Pre-existing measurement/SMTP defect reserved to C1-C3; security-only patch must not silently change it.",
        });
      } finally {
        rejectPrincipal = false;
      }
      await check(
        "Framework body limit rejects the payload and server remains responsive",
        async () => {
          const data = await form();
          data.append(
            "files",
            new File([new Uint8Array(11 * 1024 * 1024)], "large.pdf"),
          );
          const before = inbox.length;
          const r = await post(data, { close: true });
          // Next 16.3.3 logs statusCode 413 but returns a generic 500 for this form path.
          // Rejecting before SMTP and keeping the server responsive are the required invariants.
          assert.ok([413, 500].includes(r.status));
          assert.equal(inbox.length, before);
          await new Promise((resolve) => setTimeout(resolve, 50));
          assert.match(serverLog, /Body exceeded 10mb limit/);
          const alive = await rawGet("/contact");
          assert.equal(alive.statusCode, 200);
          reservations.push({
            name: "Oversized HTTP form",
            status: r.status,
            scope:
              "Rejected before SMTP; framework response status recorded separately from functional form success.",
          });
        },
      );
      const baselinePath =
        process.env.YPIOS_SECURITY_BASELINE ||
        path.join(__dirname, "fixtures/security-seo-base-03d468a.json");
      await check(
        "SEO semantic snapshots equal the production-base snapshot",
        async () => {
          assert.ok(
            fs.existsSync(baselinePath),
            "The immutable production-base SEO fixture is required",
          );
          const baseline = JSON.parse(fs.readFileSync(baselinePath, "utf8"));
          assert.deepEqual(seo, baseline);
        },
      );
    } finally {
      await new Promise((resolve) => {
        if (child.exitCode !== null) return resolve();
        const timer = setTimeout(() => child.kill("SIGKILL"), 5000);
        child.once("exit", () => {
          clearTimeout(timer);
          resolve();
        });
        child.kill("SIGTERM");
      });
      for (const socket of sockets) socket.destroy();
      smtp.close();
      fs.writeFileSync(
        path.join(destination, "seo.json"),
        JSON.stringify(seo, null, 2),
      );
      fs.writeFileSync(
        path.join(destination, "resultats.json"),
        JSON.stringify(
          {
            scope:
              "Production Next HTTP on loopback; actual Server Action; fake CAPTCHA and SMTP; no browser or Google/OVH delivery.",
            results,
            reservations,
            messagesInFakeInbox: inbox.length,
          },
          null,
          2,
        ),
      );
      fs.writeFileSync(path.join(destination, "server.log"), serverLog);
    }
  },
);
