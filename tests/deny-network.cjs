// Only preloaded by the local HTTP/browser test drivers, never imported by the application.
const realFetch = globalThis.fetch;
globalThis.fetch = async (input, init) => {
  const url = String(input?.url || input);
  if (url === 'https://www.google.com/recaptcha/api/siteverify') {
    const body = new URLSearchParams(String(init?.body || ''));
    return Response.json({ success: body.get('response') === 'TEST-OK' });
  }
  const target = new URL(url);
  if (!['127.0.0.1','localhost','[::1]'].includes(target.hostname)) throw Error('EXTERNAL_FETCH_DENIED_IN_TEST');
  return realFetch(input, init);
};
