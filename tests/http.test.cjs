// Real Next HTTP/action and Nodemailer exchange, entirely on loopback.
const net = require('node:net');
const fs = require('node:fs');
const path = require('node:path');
const { spawn } = require('node:child_process');
const assert = require('node:assert/strict');
const { test } = require('node:test');
const { Window } = require('happy-dom');
const root = path.resolve(__dirname, '..');
const port = 3138, smtpPort = 2528, origin = `http://127.0.0.1:${port}`;
const inbox = [], results = [];
let serverLog = '', rejectPrincipal = false;
const sockets = new Set();
const smtp = net.createServer(socket => {
  sockets.add(socket); socket.on('close', () => sockets.delete(socket));
  socket.setEncoding('utf8'); socket.write('220 LOCAL FAKE SMTP\r\n');
  let buffer = '', data = false, body = '';
  socket.on('data', chunk => {
    buffer += chunk; let end;
    while ((end = buffer.indexOf('\r\n')) >= 0) {
      const line = buffer.slice(0, end); buffer = buffer.slice(end + 2);
      if (data) {
        if (line === '.') { data = false; inbox.push(body); body = ''; socket.write('250 Accepted by LOCAL FAKE ONLY\r\n'); }
        else body += line + '\r\n';
      } else if (/^EHLO|^HELO/.test(line)) socket.write('250-localhost\r\n250 AUTH PLAIN\r\n');
      else if (/^AUTH/.test(line)) socket.write('235 Fake credentials accepted\r\n');
      else if (rejectPrincipal && /^RCPT TO:<main@example.invalid>/i.test(line)) socket.write('550 Principal rejected by LOCAL FAKE\r\n');
      else if (/^DATA/.test(line)) { data = true; socket.write('354 End data\r\n'); }
      else if (/^QUIT/.test(line)) socket.end('221 Bye\r\n');
      else socket.write('250 OK\r\n');
    }
  });
});

test('HTTP Next Server Action → local SMTP fake; no real form or mail sent', { timeout: 120000 }, async t => {
  await new Promise(resolve => smtp.listen(smtpPort, '127.0.0.1', resolve));
  const child = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'dev', '--hostname', '127.0.0.1', '--port', String(port)], {
    cwd: root, env: { ...process.env, NODE_OPTIONS: `--require ${path.join(__dirname, 'deny-network.cjs')}`,
      NEXT_TELEMETRY_DISABLED: '1', VERCEL_ENV: 'preview', NEXT_PUBLIC_GA_ID: 'G-FAKE123',
      NEXT_PUBLIC_RECAPTCHA_SITE_KEY: 'FAKE', RECAPTCHA_SECRET_KEY: 'FAKE',
      SMTP_HOST: '127.0.0.1', SMTP_PORT: String(smtpPort), SMTP_SECURE: 'false',
      SMTP_USER: 'sender@example.invalid', SMTP_PASS: 'FAKE', SMTP_FROM: 'sender@example.invalid',
      CONTACT_TO: 'main@example.invalid', CONTACT_CC: 'copy@example.invalid',
    }, stdio: ['ignore', 'pipe', 'pipe'],
  });
  child.stdout.on('data', data => serverLog += data); child.stderr.on('data', data => serverLog += data);
  const dom = new Window({ url: origin, settings: { enableJavaScriptEvaluation: false, disableJavaScriptFileLoading: true, disableCSSFileLoading: true, disableIframePageLoading: true } });
  try {
    let started = false;
    for (let i = 0; i < 100; i++) {
      try { if ((await fetch(origin + '/contact')).ok) { started = true; break; } } catch {}
      await new Promise(resolve => setTimeout(resolve, 300));
    }
    assert.ok(started, 'Next local server must start');
    async function form() {
      const response = await fetch(origin + '/contact'); assert.equal(response.status, 200);
      const document = new dom.DOMParser().parseFromString(await response.text(), 'text/html');
      const data = new FormData();
      for (const input of document.querySelectorAll('form input[type=hidden]')) data.append(input.name, input.value);
      assert.ok([...data.keys()].some(key => key.startsWith('$ACTION_')), 'React progressive action metadata');
      for (const [key, value] of Object.entries({ nom: 'HTTP LOCAL TEST', email: 'fake@example.invalid', message: 'NO EXTERNAL DELIVERY', 'g-recaptcha-response': 'TEST-OK' })) data.append(key, value);
      return data;
    }
    async function submit(data, ip = '192.0.2.1') {
      const response = await fetch(origin + '/contact', { method: 'POST', headers: { Origin: origin, 'x-forwarded-for': ip }, body: data });
      assert.equal(response.status, 200);
      return new dom.DOMParser().parseFromString(await response.text(), 'text/html');
    }
    async function check(id, fn) {
      await t.test(id, async () => { await fn(); results.push({ id, result: 'PASS_LOCAL' }); });
    }
    const first = await form();
    await check('R03/R04 progressive form action with fake CAPTCHA reaches fake SMTP and renders authoritative success', async () => {
      const document = await submit(first);
      assert.match(document.querySelector('[role=status]')?.textContent || '', /Merci, votre message/);
      assert.equal(inbox.length, 1); assert.match(inbox[0], /HTTP LOCAL TEST/);
      assert.match(inbox[0], /main@example.invalid/);
      assert.doesNotMatch(document.documentElement.outerHTML, /googletagmanager\.com\/gtag\/js/);
    });
    await check('R05/R06 replaying same HTTP body does not send another message', async () => {
      const document = await submit(first); assert.ok(document.querySelector('[role=status]')); assert.equal(inbox.length, 1);
    });
    await check('R07 forged URL has no success state', async () => {
      const response = await fetch(origin + '/contact?sent=1&lead=12345678-1234-4234-8234-123456789abc');
      const document = new dom.DOMParser().parseFromString(await response.text(), 'text/html');
      assert.equal(document.querySelector('[role=status]'), null); assert.equal(inbox.length, 1);
    });
    await check('R08 invalid CAPTCHA: no SMTP transaction, visible error', async () => {
      const data = await form(); data.set('g-recaptcha-response', 'REJECT');
      const document = await submit(data); assert.ok(document.querySelector('[role=alert]')); assert.equal(document.querySelector('[role=status]'), null); assert.equal(inbox.length, 1);
    });
    await check('R17 only copy accepted by fake SMTP: no success', async () => {
      rejectPrincipal = true;
      const document = await submit(await form());
      assert.ok(document.querySelector('[role=alert]')); assert.equal(document.querySelector('[role=status]'), null);
      assert.equal(inbox.length, 2); // Copy was accepted; this is explicitly not a successful principal handoff.
      assert.match(serverLog, /smtpAcceptedPrimary: false/);
      rejectPrincipal = false;
    });
    await check('Request-scoped nonce and no URL receipt', async () => {
      const second = await form(); assert.notEqual(first.get('submissionId'), second.get('submissionId'));
      assert.match(serverLog, /smtpAcceptedPrimary: true/); assert.doesNotMatch(serverLog, /delivered: true/);
    });
  } finally {
    child.kill('SIGTERM'); for (const socket of sockets) socket.destroy(); smtp.close(); await dom.happyDOM.close();
    const destination = path.join(root, 'test-results'); fs.mkdirSync(destination, { recursive: true });
    fs.writeFileSync(path.join(destination, 'http.json'), JSON.stringify({ scope: 'Loopback Next + SMTP fake. No GA or real delivery.', results, messagesInFakeInbox: inbox.length }, null, 2));
    fs.writeFileSync(path.join(destination, 'http-server.log'), serverLog);
  }
});
