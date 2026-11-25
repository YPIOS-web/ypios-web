// Simulated DOM integration. This does not certify native browser behaviour.
require('./load.cjs');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const ts = require('typescript');
const assert = require('node:assert/strict');
const { test } = require('node:test');
const { randomUUID } = require('node:crypto');
const NativeFormData = global.FormData;
const { Window } = require('happy-dom');
const win = new Window({ url: 'https://www.ypios.fr/contact', settings: {
  enableJavaScriptEvaluation: false,
  disableCSSFileLoading: true,
  disableJavaScriptFileLoading: true,
  disableIframePageLoading: true,
} });
for (const key of ['window','document','navigator','HTMLElement','Element','Event','MouseEvent','SubmitEvent','StorageEvent','FormData']) {
  Object.defineProperty(global, key, { value: key === 'window' ? win : win[key], configurable: true, writable: true });
}
global.IS_REACT_ACT_ENVIRONMENT = true;
global.BroadcastChannel = class { postMessage() {} close() {} };
const React = require('react');
const { act } = React;
const { createRoot } = require('react-dom/client');
let action, scripts = [];
const originalLoad = Module._load;
Module._load = function(id, parent, isMain) {
  if (id === '@/app/contact/actions') return { sendContact: (...args) => action(...args) };
  if (id === 'next/link') return { __esModule: true, default: ({ children, ...props }) => React.createElement('a', props, children) };
  if (id === 'next/script') return { __esModule: true, default: function Script(props) {
    React.useEffect(() => { scripts.push(props); }, [props.src]);
    return null;
  } };
  if (id.startsWith('@/')) id = path.join(__dirname, '..', id.slice(2));
  return originalLoad.call(this, id, parent, isMain);
};
require.extensions['.tsx'] = (module, filename) => module._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true, jsx: ts.JsxEmit.ReactJSX },
}).outputText, filename);
const { createContactHandler } = require('../lib/contact.ts');
const { analytics } = require('../lib/analytics.ts');
const consent = require('../lib/consent.ts');
const ContactForm = require('../components/ContactForm.tsx').default;
const AnalyticsConsent = require('../components/AnalyticsConsent.tsx').default;
const CookieBanner = require('../components/CookieBanner.tsx').default;

test('React actual components: consent, form, duplicates, errors and revocation (simulated DOM)', async t => {
  const mails = [], hits = [], logs = [];
  const handle = createContactHandler({
    env: () => ({ SMTP_USER: 'fake@example.invalid', SMTP_PASS: 'FAKE', CONTACT_TO: 'main@example.invalid' }),
    fetch: () => { throw Error('NO NETWORK ALLOWED'); },
    sendMail: async (_options, message) => { mails.push(message); return { accepted: ['main@example.invalid'] }; },
    log: (...args) => logs.push(args),
  });
  action = async (_previous, data) => {
    const native = new NativeFormData();
    for (const [key, value] of data) if (typeof value === 'string') native.append(key, value);
    return handle(native);
  };
  const host = document.createElement('div'); document.body.append(host); const root = createRoot(host);
  const render = async (key = randomUUID()) => act(async () => root.render(React.createElement(React.Fragment, null,
    React.createElement(AnalyticsConsent, { gaId: 'G-FAKE123', production: true }),
    React.createElement(CookieBanner), React.createElement(ContactForm, { submissionId: key, key }),
  )));
  const fill = () => { for (const [key, value] of Object.entries({ nom: 'LOCAL ONLY', email: 'fake@example.invalid', message: 'SIMULATED LOCAL REQUEST' })) host.querySelector(`[name=${key}]`).value = value; };
  const button = text => [...host.querySelectorAll('button')].find(b => b.textContent === text);
  const submit = async (twice = false) => act(async () => { const form = host.querySelector('form'); form.requestSubmit(); if (twice) form.requestSubmit(); });
  await render();
  await t.test('R01 no choice: script absent', () => { assert.equal(scripts.length, 0); assert.equal(analytics.snapshot().enabled, false); });
  await act(async () => button('Refuser').click());
  await t.test('R03 refusing never blocks an accepted request', async () => {
    fill(); await submit(); assert.equal(mails.length, 1); assert.ok(host.querySelector('[role=status]'));
    assert.equal(analytics.snapshot().dispatched, 0); assert.equal(scripts.length, 0);
  });
  await t.test('R07 forged URL does not make a success state', async () => {
    win.history.replaceState(null, '', '/contact?sent=1&lead='+randomUUID()); await render();
    assert.equal(host.querySelector('[role=status]'), null); assert.equal(analytics.snapshot().dispatched, 0);
  });
  await act(async () => consent.saveAnalyticsConsent(true));
  win.gtag = (...args) => { if (!win['ga-disable-G-FAKE123']) hits.push(args); };
  await act(async () => scripts.at(-1).onLoad());
  await t.test('R04 and R06 success + immediate double submit: one accepted message and one lead', async () => {
    fill(); await submit(true); assert.equal(mails.length, 2);
    assert.equal(hits.filter(a => a[1] === 'generate_lead').length, 1);
    assert.deepEqual(hits.find(a => a[1] === 'generate_lead')[2], { method: 'website_form' });
    assert.equal(host.querySelector('button[type=submit]').disabled, false);
  });
  await t.test('R05 a React rerender does not repeat the lead', async () => {
    await act(async () => consent.saveAnalyticsConsent(true));
    assert.equal(hits.filter(a => a[1] === 'generate_lead').length, 1);
  });
  await t.test('R11 storage event withdrawal stops events and clears Analytics cookies', async () => {
    document.cookie = '_ga=FAKE; path=/';
    win.localStorage.setItem(consent.CONSENT_KEY, JSON.stringify({ analytics: false }));
    await act(async () => win.dispatchEvent(new win.StorageEvent('storage', { key: consent.CONSENT_KEY })));
    assert.equal(win['ga-disable-G-FAKE123'], true); assert.equal(document.cookie.includes('_ga='), false);
    const before = hits.length;
    analytics.contact('email_click', '/contact'); analytics.lead(randomUUID()); assert.equal(hits.length, before);
  });
  await t.test('R08 server error state displays an error, releases the lock and never creates a lead', async () => {
    await render(); const normal = action;
    action = async previous => ({ status: 'error', submissionId: previous.submissionId, error: 'mail' });
    fill(); const before = hits.length; await submit();
    assert.ok(host.querySelector('[role=alert]')); assert.equal(host.querySelector('[role=status]'), null);
    assert.equal(host.querySelector('button[type=submit]').disabled, false); assert.equal(hits.length, before);
    action = normal; fill(); await submit(); assert.ok(host.querySelector('[role=status]')); assert.equal(mails.length, 3);
  });
  await t.test('Reaccepting after withdrawal reactivates configuration without replaying refused requests', async () => {
    const before = hits.filter(a => a[1] === 'generate_lead').length;
    await act(async () => consent.saveAnalyticsConsent(true));
    assert.equal(win['ga-disable-G-FAKE123'], false);
    assert.ok(hits.some(a => a[0] === 'config'));
    assert.equal(hits.filter(a => a[1] === 'generate_lead').length, before);
  });
  await act(async () => root.unmount());
  await win.happyDOM.close();
});
