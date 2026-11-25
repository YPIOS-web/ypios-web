require('./load.cjs');
const test = require('node:test');
const assert = require('node:assert/strict');
const { randomUUID } = require('node:crypto');
const { createContactHandler } = require('../lib/contact.ts');
const { createAnalyticsController } = require('../lib/analytics.ts');

function fixture(options = {}) {
  const messages = [], logs = [];
  let time = 1000, captchaCalls = 0;
  const config = { SMTP_USER: 'sender@example.invalid', SMTP_PASS: 'FICTITIOUS', CONTACT_TO: 'Principal <main@example.invalid>', CONTACT_CC: 'copy@example.invalid', ...options.config };
  const handle = createContactHandler({
    env: () => config, now: () => time,
    fetch: async () => { captchaCalls++; if (options.captchaThrow) throw Error('FAKE CAPTCHA FAILURE'); return { json: async () => ({ success: options.captcha ?? true }) }; },
    sendMail: async (_transport, message) => {
      messages.push(message);
      if (options.delay) await options.delay;
      if (options.throw) throw Object.assign(Error('FAKE'), { code: 'ETIMEDOUT' });
      return options.reply || { accepted: ['main@example.invalid'], rejected: [], messageId: 'FAKE-ID' };
    },
    log: (...args) => logs.push(args),
  });
  return { handle, messages, logs, get captchaCalls() { return captchaCalls; }, advance(ms) { time += ms; } };
}
function form(id = randomUUID()) {
  const f = new FormData();
  for (const [k,v] of Object.entries({ submissionId:id, nom:'RECETTE <test>', email:'test@example.invalid', message:'Test local uniquement', type:'Maintenance', service:'Climatisation' })) f.set(k,v);
  return f;
}

test('SMTP : succès uniquement après acceptation principale, référence et aucun champ privé retourné', async () => {
  const f = fixture(), result = await f.handle(form());
  assert.equal(result.status, 'success'); assert.equal(f.messages.length, 1);
  assert.match(f.messages[0].text, new RegExp(result.requestId));
  assert.match(f.messages[0].html, /RECETTE &lt;test&gt;/);
  assert.deepEqual(Object.keys(result).sort(), ['requestId','status','submissionId']);
  assert.equal(f.logs[0][1].smtpAcceptedPrimary, true); assert.equal('delivered' in f.logs[0][1], false);
});
test('R17 : copie seule acceptée, principal rejeté = erreur sans succès', async () => {
  const f=fixture({reply:{accepted:['copy@example.invalid'],rejected:['main@example.invalid']}});
  assert.equal((await f.handle(form())).error,'mail');
});
test('Tous les destinataires principaux doivent être acceptés', async () => {
  const f=fixture({config:{CONTACT_TO:'main@example.invalid, second@example.invalid'}});
  assert.equal((await f.handle(form())).error,'mail');
});
test('Acceptation SMTP insensible à la casse et aux noms d’affichage', async () => {
  const f=fixture({reply:{accepted:[{address:'MAIN@EXAMPLE.INVALID'}]}});
  assert.equal((await f.handle(form())).status,'success');
});
test('Une défaillance du journal ne transforme pas une acceptation SMTP en erreur', async () => {
  const handle = createContactHandler({ env: () => ({ SMTP_USER: 'main@example.invalid', SMTP_PASS: 'FAKE' }),
    fetch: () => { throw Error('NO NETWORK'); }, sendMail: async () => ({ accepted: ['main@example.invalid'] }),
    log: () => { throw Error('FAKE LOG FAILURE'); } });
  assert.equal((await handle(form())).status, 'success');
});
test('SMTP rejet total / exception / configuration absente : pas de succès', async () => {
  for(const options of [{reply:{accepted:[],rejected:['main@example.invalid']}},{throw:true},{config:{SMTP_PASS:''}}]) {
    const f=fixture(options);assert.equal((await f.handle(form())).error,'mail');
  }
});
test('R06 : soumissions identiques simultanées puis rejouées : un seul mail factice', async () => {
  let release;const delay=new Promise(resolve=>release=resolve), f=fixture({delay}), id=randomUUID();
  const first=f.handle(form(id)),second=f.handle(form(id));release();
  const [a,b]=await Promise.all([first,second]); assert.deepEqual(a,b);
  assert.deepEqual(await f.handle(form(id)),a);assert.equal(f.messages.length,1);
});
test('Réutilisation du jeton avec un contenu différent : refus, aucun deuxième mail', async () => {
  const f=fixture(),id=randomUUID();await f.handle(form(id));const changed=form(id);changed.set('message','Autre demande');
  assert.equal((await f.handle(changed)).error,'duplicate');assert.equal(f.messages.length,1);
});
test('Identifiant absent ou manipulé : aucun transport', async () => {
  const f=fixture();assert.equal((await f.handle(form('sent=1'))).error,'fields');assert.equal(f.messages.length,0);
});
test('Champs requis, taille, e-mail et injections d’en-tête', async () => {
  for(const [field,value] of [['nom',''],['message',''],['email','bad'],['message','x'.repeat(5001)]]) {
    const f=fixture(),data=form();data.set(field,value);assert.equal((await f.handle(data)).error,'fields');assert.equal(f.messages.length,0);
  }
  const f=fixture(),data=form();data.set('sujet','Sujet\r\nBcc: nobody@example.invalid');await f.handle(data);
  assert.equal(/[\r\n]/.test(f.messages[0].subject),false);
});
test('Pièces jointes : PDF authentique accepté, nom nettoyé', async () => {
  const f=fixture(),data=form();data.append('files',new File(['%PDF-1.4\nFAKE'], '../audit.pdf'));
  assert.equal((await f.handle(data)).status,'success');assert.equal(f.messages[0].attachments[0].filename.includes('/'),false);
});
test('Pièces jointes : fausse extension, quantité, taille unitaire et totale refusées', async () => {
  const cases=[['type',()=>[new File(['not PDF'],'bad.pdf')]],['maxfiles',()=>Array.from({length:6},()=>new File(['%PDF-'],'a.pdf'))],
    ['maxsize',()=>[new File([new Uint8Array(5*1024*1024+1)],'a.pdf')]],
    ['totalsize',()=>[new File([new Uint8Array(5*1024*1024)],'a.pdf'),new File([new Uint8Array(4*1024*1024)],'b.pdf')]]];
  for(const [error,files] of cases){const f=fixture(),data=form();files().forEach(file=>data.append('files',file));assert.equal((await f.handle(data)).error,error);assert.equal(f.messages.length,0);}
});
test('R08 : CAPTCHA faux, exception ou paire de clés incomplète : aucun mail', async () => {
  for(const options of [{config:{NEXT_PUBLIC_RECAPTCHA_SITE_KEY:'FAKE',RECAPTCHA_SECRET_KEY:'FAKE'},captcha:false},
    {config:{NEXT_PUBLIC_RECAPTCHA_SITE_KEY:'FAKE',RECAPTCHA_SECRET_KEY:'FAKE'},captchaThrow:true},
    {config:{NEXT_PUBLIC_RECAPTCHA_SITE_KEY:'FAKE'}},{config:{RECAPTCHA_SECRET_KEY:'FAKE'}}]){
    const f=fixture(options);assert.equal((await f.handle(form())).error,'captcha');assert.equal(f.messages.length,0);
  }
});
test('Anti-spam : cinq tentatives maximum par IP puis réouverture après fenêtre', async () => {
  const f=fixture();for(let i=0;i<5;i++)assert.equal((await f.handle(form(),'127.0.0.1')).status,'success');
  assert.equal((await f.handle(form(),'127.0.0.1')).error,'rate');f.advance(600001);assert.equal((await f.handle(form(),'127.0.0.1')).status,'success');
});

function analyticsFixture({consent=true,production=true,hostname='www.ypios.fr',storageBlocked=false}={}) {
  let time=0,nextId=1;const timers=new Map(),calls=[],storage=new Map(),cookieWrites=[];
  const win={location:{hostname,href:`https://${hostname}/contact?utm_source=recette&utm_medium=qa&sent=1&lead=fake`},
    document:{get cookie(){return '_ga=FAKE; _ga_TEST=FAKE; other=keep';},set cookie(v){cookieWrites.push(v);}},
    sessionStorage:{getItem:k=>{if(storageBlocked)throw Error('blocked');return storage.get(k)||null;},setItem:(k,v)=>{if(storageBlocked)throw Error('blocked');storage.set(k,v);}},
    gtag:(...args)=>calls.push(args)};
  win.history={replaceState:(_state,_title,url)=>{win.location.href=url;}};
  const controller=createAnalyticsController({win:()=>win,consent:()=>consent,now:()=>time,
    later:(fn,delay)=>{const id=nextId++;timers.set(id,{fn,at:time+delay});return id;},cancel:id=>timers.delete(id)});
  controller.configure('G-FAKE123',production);
  return {controller,win,calls,cookieWrites,setConsent(value){consent=value;controller.refresh();},advance(ms){time+=ms;for(const [id,t]of timers)if(t.at<=time){timers.delete(id);t.fn();}}};
}
test('R01/R03 : refus Analytics ne charge ni ne met en attente un lead',()=>{
  const f=analyticsFixture({consent:false});assert.equal(f.controller.lead(randomUUID()),false);assert.equal(f.calls.length,0);assert.equal(f.controller.snapshot().queued,0);
});
test('R13 : Preview, localhost et déploiement non production : zéro Analytics',()=>{
  for(const options of [{hostname:'preview.vercel.app'},{hostname:'localhost'},{production:false}]){
    const f=analyticsFixture(options);assert.equal(f.calls.length,0);assert.equal(f.controller.lead(randomUUID()),false);
  }
});
test('R04/R05 : succès enregistré une seule fois, même si stockage bloqué',()=>{
  for(const storageBlocked of [false,true]){const f=analyticsFixture({storageBlocked}),id=randomUUID();f.controller.loaded();f.controller.lead(id);f.controller.lead(id);
    assert.equal(f.calls.filter(c=>c[1]==='generate_lead').length,1);assert.deepEqual(f.calls.at(-1)[2],{method:'website_form'});}
});
test('R09/R10 : balise lente de douze secondes puis prête, un seul événement',()=>{
  const f=analyticsFixture();f.controller.lead(randomUUID());f.controller.contact('contact_intent','/services/gtc-gtb');f.advance(12000);
  assert.equal(f.controller.snapshot().queued,2);f.controller.loaded();assert.equal(f.controller.snapshot().dispatched,2);assert.equal(f.controller.snapshot().queued,0);
});
test('Balise bloquée : attente bornée et état indisponible sans succès fictif',()=>{
  const f=analyticsFixture();f.controller.lead(randomUUID());f.advance(30001);assert.equal(f.controller.snapshot().queued,0);assert.equal(f.controller.snapshot().unavailable,1);
  f.controller.loaded();assert.equal(f.calls.filter(c=>c[1]==='generate_lead').length,0);
});
test('Erreur du script : événement indisponible, aucun replay futur',()=>{
  const f=analyticsFixture(),id=randomUUID();f.controller.lead(id);f.controller.failed();f.controller.loaded();f.controller.lead(id);
  assert.equal(f.controller.snapshot().unavailable,1);assert.equal(f.controller.snapshot().dispatched,0);
});
test('R11 : retrait coupe GA, purge les cookies Analytics et annule les attentes',()=>{
  const f=analyticsFixture();f.controller.lead(randomUUID());f.setConsent(false);assert.equal(f.win['ga-disable-G-FAKE123'],true);
  assert.equal(f.controller.snapshot().queued,0);assert.equal(f.cookieWrites.some(v=>v.startsWith('other=')),false);
  f.controller.loaded();assert.equal(f.calls.filter(c=>c[1]==='generate_lead').length,0);
});
test('Refus lors du succès : une acceptation ultérieure ne rejoue pas le prospect',()=>{
  const f=analyticsFixture({consent:false});f.controller.lead(randomUUID());f.setConsent(true);f.controller.loaded();assert.equal(f.controller.snapshot().dispatched,0);
});
test('R14 : UTM conservés, marqueurs de succès retirés de la configuration',()=>{
  const f=analyticsFixture();const url=new URL(f.win.location.href);
  assert.equal(url.searchParams.get('utm_source'),'recette');assert.equal(url.searchParams.has('lead'),false);assert.equal(url.searchParams.has('sent'),false);
  assert.equal(f.calls.find(c=>c[0]==='config').length,2);
});
test('Une exception gtag ne casse pas le formulaire ni ne prétend une ingestion',()=>{
  const f=analyticsFixture();f.controller.loaded();f.win.gtag=()=>{throw Error('blocked');};assert.doesNotThrow(()=>f.controller.lead(randomUUID()));
  assert.equal(f.controller.snapshot().unavailable,1);assert.equal(f.controller.snapshot().dispatched,0);
});
test('Une exception de configuration GA lors du réaccord reste non bloquante',()=>{
  const f=analyticsFixture(); f.setConsent(false); f.win.gtag=()=>{throw Error('FAKE BROKEN TAG');};
  assert.doesNotThrow(()=>f.setConsent(true));
  assert.doesNotThrow(()=>f.controller.lead(randomUUID()));
  assert.equal(f.controller.snapshot().failed,true); assert.equal(f.controller.snapshot().dispatched,0);
});
