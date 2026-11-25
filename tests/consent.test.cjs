const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');
const source = ts.transpileModule(fs.readFileSync(require.resolve('../lib/consent.ts'), 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;

function browser({ blocked = false, broadcast = true } = {}) {
  const storage = new Map(), tabs = [], channels = new Set();
  function tab() {
    const listeners = new Map(), exports = {};
    const win = {
      localStorage: {
        getItem(key) { if (blocked) throw Error('blocked'); return storage.get(key) ?? null; },
        setItem(key, value) {
          if (blocked) throw Error('blocked'); storage.set(key, value);
          for (const other of tabs) if (other !== win) other.emit({ key });
        },
      },
      addEventListener(name, callback) { listeners.set(name, callback); },
      removeEventListener(name) { listeners.delete(name); },
      emit(event) { listeners.get('storage')?.(event); },
    };
    class Channel {
      constructor(name) { this.name = name; channels.add(this); }
      postMessage(data) { for (const channel of channels) if (channel !== this && channel.name === this.name) channel.onmessage?.({ data }); }
      close() { channels.delete(this); }
    }
    tabs.push(win);
    vm.runInNewContext(source, { exports, window: win, Date, JSON, Set, BroadcastChannel: broadcast ? Channel : undefined });
    return { api: exports, win };
  }
  return { tab, storage, channels };
}
test('R11 storage and BroadcastChannel synchronize acceptance and withdrawal between two isolated tabs', () => {
  const b = browser(), a = b.tab(), c = b.tab(); let changesA = 0, changesC = 0;
  const stopA = a.api.subscribeConsent(() => changesA++), stopC = c.api.subscribeConsent(() => changesC++);
  a.api.saveAnalyticsConsent(true); assert.equal(c.api.readAnalyticsConsent(), true);
  c.api.saveAnalyticsConsent(false); assert.equal(a.api.readAnalyticsConsent(), false);
  assert.ok(changesA > 0 && changesC > 0); stopA(); stopC(); assert.equal(b.channels.size, 0);
});
test('R12 blocked storage: current choice works in memory and broadcast withdrawal reaches the other tab', () => {
  const b = browser({ blocked: true }), a = b.tab(), c = b.tab();
  const stopA = a.api.subscribeConsent(() => {}), stopC = c.api.subscribeConsent(() => {});
  assert.equal(a.api.readAnalyticsConsent(), false); assert.equal(a.api.hasConsentChoice(), false);
  a.api.saveAnalyticsConsent(true); assert.equal(a.api.readAnalyticsConsent(), true); assert.equal(c.api.readAnalyticsConsent(), true);
  c.api.saveAnalyticsConsent(false); assert.equal(a.api.readAnalyticsConsent(), false);
  stopA(); stopC();
});
test('Storage fallback without BroadcastChannel and cleared storage revoke consent', () => {
  const b = browser({ broadcast: false }), a = b.tab(), c = b.tab();
  const stopA = a.api.subscribeConsent(() => {}), stopC = c.api.subscribeConsent(() => {});
  a.api.saveAnalyticsConsent(true); assert.equal(c.api.readAnalyticsConsent(), true);
  b.storage.clear(); a.win.emit({ key: null }); c.win.emit({ key: null });
  assert.equal(a.api.readAnalyticsConsent(), false); assert.equal(c.api.hasConsentChoice(), false);
  stopA(); stopC();
});
test('Malformed or non-boolean persisted values never imply consent', () => {
  for (const value of ['bad json', '{"analytics":"true"}', '{"analytics":1}', '{}']) {
    const b = browser(); b.storage.set('ypios-consent-v1', value); const a = b.tab();
    assert.equal(a.api.readAnalyticsConsent(), false); assert.equal(a.api.hasConsentChoice(), false);
  }
});
