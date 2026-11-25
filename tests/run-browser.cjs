const net = require('node:net');
const fs = require('node:fs');
const path = require('node:path');
const { spawn } = require('node:child_process');
const assert = require('node:assert/strict');
const { chromium } = require('playwright');
const root=path.resolve(__dirname,'..'), port=3137, smtpPort=2527, origin=`http://www.ypios.fr:${port}`;
const inbox=[], results=[], external=[], consoleErrors=[];
let serverLog='', rejectPrincipal=false, sessionIndex=0, oversizedPhase=false;
const expectedErrors=[];
const retryEvidence = {};
const sockets=new Set();
const safeEnv={PATH:process.env.PATH,HOME:process.env.HOME,TMPDIR:process.env.TMPDIR,
 NODE_OPTIONS:`--require ${path.join(__dirname,'deny-network.cjs')}`, NEXT_TELEMETRY_DISABLED:'1',VERCEL_ENV:'production',
 NEXT_PUBLIC_SITE_URL:'http://www.ypios.fr:3137',NEXT_PUBLIC_GA_ID:'G-FAKE123',NEXT_PUBLIC_RECAPTCHA_SITE_KEY:'FAKE',RECAPTCHA_SECRET_KEY:'FAKE',
 SMTP_HOST:'127.0.0.1',SMTP_PORT:String(smtpPort),SMTP_SECURE:'false',SMTP_USER:'sender@example.invalid',SMTP_PASS:'FAKE',
 CONTACT_TO:'main@example.invalid',CONTACT_CC:'copy@example.invalid',SMTP_FROM:'sender@example.invalid'};
function executable(){
 const candidates=[process.env.TEST_CHROMIUM_PATH, ...(process.platform==='darwin'?['/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',path.join(process.env.HOME||'', 'Applications/Google Chrome.app/Contents/MacOS/Google Chrome'),'/Applications/Chromium.app/Contents/MacOS/Chromium']:['/usr/bin/chromium'])].filter(Boolean);
 const found=candidates.find(p=>{try{fs.accessSync(p,fs.constants.X_OK);return true;}catch{return false;}});
 assert.ok(found,'Aucun Chrome/Chromium existant trouvé. Aucune installation automatique.');return found;
}
async function build(){
 for(const file of fs.readdirSync(root))assert.ok(!/^\.env(?:$|\.)/.test(file)||file==='.env.example','Refus : fichier environnement présent : '+file);
 assert.equal(require(path.join(root,'node_modules/next/package.json')).version,'16.4.6');
 assert.equal(process.versions.node.split('.')[0],'24','Node 24 requis');
 const child=spawn(process.execPath,['node_modules/next/dist/bin/next','build'],{cwd:root,env:safeEnv,stdio:['ignore','pipe','pipe']});let output='';
 child.stdout.on('data',d=>output+=d);child.stderr.on('data',d=>output+=d);
 const code=await new Promise((resolve,reject)=>{child.once('error',reject);child.once('exit',resolve);});
 fs.mkdirSync(path.join(root,'test-results'),{recursive:true});fs.writeFileSync(path.join(root,'test-results/browser-build.log'),output);
 assert.equal(code,0,'Build Production factice échoué : voir browser-build.log');
}

const smtp=net.createServer(socket=>{
  sockets.add(socket);socket.on('close',()=>sockets.delete(socket));
  socket.setEncoding('utf8');socket.write('220 LOCAL TEST SMTP\r\n');let buffer='',data=false,body='';
  const acceptedRecipients = [];
  socket.on('data',chunk=>{
    buffer+=chunk;let end;
    while((end=buffer.indexOf('\r\n'))>=0){const line=buffer.slice(0,end);buffer=buffer.slice(end+2);
      if (data) {
        if (line === '.') {
          data = false;
          inbox.push({ body, recipients: [...acceptedRecipients] });
          acceptedRecipients.length = 0;
          body = '';
          setTimeout(() => socket.write('250 2.0.0 accepted by LOCAL FAKE\r\n'), 250);
        } else {
          body += line + '\r\n';
        }
        continue;
      }
      if(/^EHLO|^HELO/.test(line))socket.write('250-localhost\r\n250 AUTH PLAIN\r\n');
      else if(/^AUTH/.test(line))socket.write('235 Authenticated FAKE\r\n');
      else if (/^(MAIL FROM:|RSET(?:\s|$))/i.test(line)) {
        acceptedRecipients.length = 0;
        socket.write('250 OK\r\n');
      } else if (/^RCPT TO:/i.test(line)) {
        const recipient = line.match(/^RCPT TO:<([^>]+)>/i)?.[1].toLowerCase();
        if (rejectPrincipal && recipient === safeEnv.CONTACT_TO) {
          socket.write('550 LOCAL PRINCIPAL REJECTED\r\n');
        } else {
          if (recipient) acceptedRecipients.push(recipient);
          socket.write('250 OK\r\n');
        }
      }
      else if(/^DATA/.test(line)){data=true;socket.write('354 End data\r\n');}
      else if(/^QUIT/.test(line)){socket.end('221 Bye\r\n');}
      else socket.write('250 OK\r\n');
    }
  });
});
const fakeGa=`(()=>{const old=window.dataLayer||[];function send(a){if(window['ga-disable-G-FAKE123'])return;if(a[0]==='config'){document.cookie='_ga=FAKE; path=/';a=['event','page_view',{page_location:a[2]?.page_location||location.href}];}if(a[0]==='event')fetch('https://www.google-analytics.com/g/collect?en='+a[1],{method:'POST',body:JSON.stringify(a)});}window.gtag=(...a)=>send(a);old.forEach(a=>send(Array.from(a)));for(const m of ['pushState','replaceState']){const f=history[m];history[m]=function(...a){const r=f.apply(this,a);send(['event','page_view',{page_location:location.href}]);return r;};}})();`;
const fakeCaptcha=`(()=>{function render(){const el=document.querySelector('.g-recaptcha');if(!el)return;let t=document.querySelector('[name="g-recaptcha-response"]');if(!t){t=document.createElement('textarea');t.name='g-recaptcha-response';t.hidden=true;el.append(t);}t.value='TEST-OK';}window.grecaptcha={reset(){render();}};render();new MutationObserver(render).observe(document.body,{childList:true,subtree:true});})();`;

async function main(){
 const chrome=executable();
 for(const testPort of [port,smtpPort])await new Promise((resolve,reject)=>{const probe=net.createServer();probe.once('error',()=>reject(new Error('Port local occupé : '+testPort)));probe.listen(testPort,'127.0.0.1',()=>probe.close(resolve));});
 await build();
 await new Promise((resolve,reject)=>{smtp.once('error',reject);smtp.listen(smtpPort,'127.0.0.1',resolve);});
 const child=spawn(process.execPath,['node_modules/next/dist/bin/next','start','--hostname','127.0.0.1','--port',String(port)],{cwd:root,env:safeEnv,stdio:['ignore','pipe','pipe']});
 child.on('error',e=>serverLog+='SERVER_SPAWN_ERROR '+e.message);
 child.stdout.on('data',d=>serverLog+=d);child.stderr.on('data',d=>serverLog+=d);
 let browser;
 const onSignal=async()=>{child.kill('SIGTERM');for(const socket of sockets)socket.destroy();smtp.close();await browser?.close();process.exit(130);};
 process.once('SIGINT',onSignal);process.once('SIGTERM',onSignal);
 try {
  for(let i=0;i<100;i++){if(child.exitCode!==null)throw Error('Serveur local arrêté avant disponibilité');try{if(serverLog.includes('Ready in') && (await fetch(`http://127.0.0.1:${port}/contact`)).ok)break;}catch{}if(i===99)throw Error('server did not start');await new Promise(r=>setTimeout(r,300));}
  browser=await chromium.launch({executablePath:chrome,headless:true,args:['--no-sandbox','--no-proxy-server','--host-resolver-rules=MAP www.ypios.fr 127.0.0.1']});
  async function session({delay=0,blocked=false,storageBlocked=false}={}){
    const context=await browser.newContext({serviceWorkers:'block',bypassCSP:true,extraHTTPHeaders:{'x-forwarded-for':`192.0.2.${++sessionIndex}`}}),hits=[];
    if(storageBlocked)await context.addInitScript(()=>{Object.defineProperty(Storage.prototype,'getItem',{value(){throw Error('blocked');}});Object.defineProperty(Storage.prototype,'setItem',{value(){throw Error('blocked');}});});
    await context.route('**/*',async route=>{
      const u=new URL(route.request().url());
      if(u.hostname==='www.googletagmanager.com'){
        if(blocked)return route.abort();if(delay)await new Promise(r=>setTimeout(r,delay));
        return route.fulfill({contentType:'application/javascript',body:fakeGa});
      }
      if(u.hostname==='www.google-analytics.com'){hits.push(JSON.parse(route.request().postData()||'[]'));return route.fulfill({status:204});}
      if(u.hostname==='www.google.com'&&u.pathname.includes('/recaptcha/api.js'))return route.fulfill({contentType:'application/javascript',body:fakeCaptcha});
      if(u.protocol==='http:'&&['www.ypios.fr','127.0.0.1','localhost'].includes(u.hostname)&&u.port===String(port))return route.fulfill({response:await route.fetch({url:`http://127.0.0.1:${port}${u.pathname}${u.search}`,headers:{...route.request().headers(),host:u.host},maxRedirects:0})});
      external.push(u.hostname);return route.abort();
    });
    const page=await context.newPage();page.on('pageerror',e=>(oversizedPhase?expectedErrors:consoleErrors).push(e.message));
    await page.goto(origin+'/contact');await page.getByRole('button',{name:'Refuser',exact:true}).waitFor();
    return {context,page,hits};
  }
  const leadCount=s=>s.hits.filter(h=>h[1]==='generate_lead').length;
  async function fill(page,label){await page.locator('[name=nom]').fill('RECETTE LOCALE');await page.locator('[name=email]').fill('test@example.invalid');await page.locator('[name=message]').fill(label);await page.locator('[name=sujet]').fill(label);}
  async function success(page){await page.getByRole('status').filter({hasText:'Merci, votre message'}).waitFor({timeout:20000});}
  async function check(id,name,fn){try{await fn();results.push({id,name,result:'PASS_LOCAL'});}catch(e){results.push({id,name,result:'FAIL',error:e.message});throw e;}}
  const refused=await session();
  await check('R01','Sans choix : aucun Analytics',async()=>{assert.equal(refused.hits.length,0);assert.equal((await refused.context.cookies()).some(c=>c.name.startsWith('_ga')),false);});
  await check('R03','Refus + envoi local : mail dans boîte factice, zéro Analytics',async()=>{
    await refused.page.getByRole('button',{name:'Refuser',exact:true}).click();await fill(refused.page,'REFUS-LOCAL');const before=inbox.length;
    await refused.page.getByRole('button',{name:'Envoyer →',exact:true}).click();await success(refused.page);
    assert.equal(inbox.length,before+1);assert.equal(refused.hits.length,0);assert.ok(inbox.at(-1).body.includes('REFUS-LOCAL'));
  });
  await refused.context.close();
  const accepted=await session();
  await check('R02','Accord : balise unique et navigation mesurée',async()=>{
    await accepted.page.getByRole('button',{name:'Accepter',exact:true}).click();await accepted.page.waitForFunction(()=>typeof window.gtag==='function');
    await accepted.page.waitForFunction(()=>document.cookie.includes('_ga='));
    assert.equal(await accepted.page.locator('script#ypios-ga').count(),1);assert.equal(accepted.hits.filter(h=>h[1]==='page_view').length,1);
  });
  await check('R04','Accord + soumission locale = une réception factice et un lead',async()=>{
    await fill(accepted.page,'ACCORD-LOCAL');const before=inbox.length;await accepted.page.getByRole('button',{name:'Envoyer →',exact:true}).click();await success(accepted.page);
    await accepted.page.waitForTimeout(200);assert.equal(inbox.length,before+1);assert.equal(leadCount(accepted),1);
    assert.deepEqual(accepted.hits.find(h=>h[1]==='generate_lead')[2],{method:'website_form'});
  });
  await check('R05','Rechargement : pas de deuxième lead',async()=>{await accepted.page.reload();await accepted.page.locator('[name=nom]').waitFor();await accepted.page.waitForTimeout(250);assert.equal(leadCount(accepted),1);});
  await check('R07','URL falsifiée : pas de message succès ni de lead',async()=>{
    await accepted.page.goto(origin+'/contact?sent=1&lead=12345678-1234-4234-8234-123456789abc');await accepted.page.locator('[name=nom]').waitFor();
    assert.equal(await accepted.page.getByText('Merci, votre message a bien été envoyé.',{exact:false}).count(),0);assert.equal(leadCount(accepted),1);
  });
  await check('R06','Double soumission : un seul mail factice',async()=>{
    await fill(accepted.page,'DOUBLE-LOCAL');const before=inbox.length;await accepted.page.locator('form').evaluate(form=>{form.requestSubmit();form.requestSubmit();});await success(accepted.page);
    assert.equal(inbox.length,before+1);assert.equal(leadCount(accepted),2);
  });
  await check('R11','Retrait et synchronisation entre onglets : plus aucun hit',async()=>{
    const other=await accepted.context.newPage();await other.goto(origin+'/services/gtc-gtb');await other.locator('h1').waitFor();await other.waitForTimeout(150);
    await accepted.page.getByRole('button',{name:'Cookies',exact:true}).click();await accepted.page.getByRole('button',{name:'Tout refuser',exact:true}).click();
    await other.waitForFunction(()=>window['ga-disable-G-FAKE123']===true);const before=accepted.hits.length;
    await other.getByRole('link',{name:'Nous contacter →',exact:true}).click();await other.locator('[name=nom]').waitFor();await other.waitForTimeout(200);
    assert.equal(accepted.hits.length,before);assert.equal((await accepted.context.cookies()).some(c=>c.name.startsWith('_ga')),false);
  });
  await accepted.context.close();
  const slow=await session({delay:6500});
  await check('R09','GA lent : le succès arrive avant le script, un lead à sa disponibilité',async()=>{
    await slow.page.getByRole('button',{name:'Accepter',exact:true}).click();await fill(slow.page,'LENT-LOCAL');await slow.page.getByRole('button',{name:'Envoyer →',exact:true}).click();await success(slow.page);
    await slow.page.waitForTimeout(7000);assert.equal(leadCount(slow),1);
  });await slow.context.close();
  const restricted=await session({storageBlocked:true});
  await check('R12','Stockage bloqué : refus et envoi restent fonctionnels',async()=>{
    await restricted.page.getByRole('button',{name:'Refuser',exact:true}).click();await fill(restricted.page,'STOCKAGE-LOCAL');await restricted.page.getByRole('button',{name:'Envoyer →',exact:true}).click();await success(restricted.page);assert.equal(restricted.hits.length,0);
  });await restricted.context.close();
  const blocked=await session({blocked:true});
  await check('R09b','GA bloqué : le formulaire réussit quand même',async()=>{
    await blocked.page.getByRole('button',{name:'Accepter',exact:true}).click();await fill(blocked.page,'GA-BLOQUE-LOCAL');await blocked.page.getByRole('button',{name:'Envoyer →',exact:true}).click();await success(blocked.page);assert.equal(leadCount(blocked),0);
  });await blocked.context.close();
  const retry = await session();
  const retryTimeout = 20_000;
  retry.page.setDefaultTimeout(retryTimeout);
  const submitContact = retry.page.getByRole('button', { name: 'Envoyer →', exact: true });
  const mailAlert = retry.page.getByRole('alert').filter({
    hasText: /^Impossible de confirmer l’envoi du message pour le moment\. Merci de réessayer plus tard ou de nous contacter par e-mail\.$/,
  });
  const readyForm = retry.page.locator('form[aria-busy="false"]:has(button[type="submit"]:enabled)');
  const isContactPost = request => request.method() === 'POST' && request.url() === origin + '/contact';
  const waitForContactResponse = () => retry.page.waitForResponse(
    response => isContactPost(response.request()), { timeout: retryTimeout },
  );
  let contactPosts = 0;
  retry.page.on('request', request => {
    if (isContactPost(request)) contactPosts++;
  });
  await retry.page.getByRole('button', { name: 'Accepter', exact: true }).click();
  await retry.page.waitForFunction(() => typeof window.gtag === 'function', null, { timeout: retryTimeout });
  await check('R17', 'Principal refusé : erreur, aucun succès ni lead', async () => {
    const before = inbox.length;
    rejectPrincipal = true;
    try {
      await fill(retry.page, 'PRINCIPAL-REFUSE');
      const [response] = await Promise.all([waitForContactResponse(), submitContact.click()]);
      assert.equal(response.status(), 200);
      await mailAlert.waitFor({ state: 'visible', timeout: retryTimeout });
      await readyForm.waitFor({ state: 'visible', timeout: retryTimeout });

      const messages = inbox.slice(before);
      retryEvidence.refusal = {
        httpStatus: response.status(),
        alert: await mailAlert.innerText(),
        formBusy: await readyForm.getAttribute('aria-busy'),
        contactPosts,
        acceptedRecipients: messages.map(message => message.recipients),
        simulatedLeads: leadCount(retry),
      };
      assert.equal(await retry.page.getByRole('status').count(), 0);
      assert.equal(leadCount(retry), 0);
      assert.equal(contactPosts, 1);
      assert.deepEqual(retryEvidence.refusal.acceptedRecipients, [[safeEnv.CONTACT_CC]]);
      assert.ok(messages[0].body.includes('PRINCIPAL-REFUSE'));
    } finally {
      rejectPrincipal = false;
    }
  });
  await check('RETRY', 'Nouvel envoi après erreur avec ressaisie explicite (P3 exclu)', async () => {
    const before = inbox.length;
    await fill(retry.page, 'REPRISE-APRES-ERREUR');
    const [response, leadResponse] = await Promise.all([
      waitForContactResponse(),
      retry.page.waitForResponse(response => {
        const url = new URL(response.url());
        return response.request().method() === 'POST' && url.origin === 'https://www.google-analytics.com' &&
          url.pathname === '/g/collect' && url.searchParams.get('en') === 'generate_lead';
      }, { timeout: retryTimeout }),
      submitContact.click(),
    ]);
    assert.equal(response.status(), 200);
    assert.equal(leadResponse.status(), 204);
    await success(retry.page);
    await readyForm.waitFor({ state: 'visible', timeout: retryTimeout });

    const messages = inbox.slice(before);
    retryEvidence.retry = {
      httpStatus: response.status(),
      simulatedAnalyticsHttpStatus: leadResponse.status(),
      contactPosts,
      acceptedRecipients: messages.map(message => [...message.recipients].sort()),
      simulatedLeads: leadCount(retry),
    };
    assert.equal(inbox.length, before + 1);
    assert.equal(leadCount(retry), 1);
    assert.equal(contactPosts, 2);
    assert.deepEqual(retryEvidence.retry.acceptedRecipients, [[safeEnv.CONTACT_TO, safeEnv.CONTACT_CC].sort()]);
    assert.ok(messages[0].body.includes('REPRISE-APRES-ERREUR'));
  });
  await retry.context.close();
  const large=await session();
  await check('OVERSIZE','Corps >10 Mio : refus et absence de transaction SMTP',async()=>{
    await large.page.getByRole('button',{name:'Refuser',exact:true}).click();await fill(large.page,'PIECE-TROP-LOURDE');
    await large.page.locator('[name=files]').setInputFiles({name:'local.pdf',mimeType:'application/pdf',buffer:Buffer.concat([Buffer.from('%PDF-1.4\n'),Buffer.alloc(11*1024*1024)])});
    const before=inbox.length;
    oversizedPhase=true;
    const responsePromise=large.page.waitForResponse(r=>r.request().method()==='POST'&&new URL(r.url()).pathname==='/contact');
    await large.page.getByRole('button',{name:'Envoyer →',exact:true}).click();const response=await responsePromise;
    assert.ok([413,500].includes(response.status()),'Attendu : refus HTTP du corps trop volumineux');assert.match(serverLog,/Body exceeded|body.*limit|too large/i);await large.page.waitForTimeout(300);assert.equal(inbox.length,before);assert.equal(leadCount(large),0);oversizedPhase=false;
  });await large.context.close();
  await check('NETWORK','Aucun service externe contacté par le navigateur',async()=>{assert.deepEqual(external,[]);assert.deepEqual(consoleErrors,[]);assert.equal(results.length,14);assert.equal(inbox.length,8);});
 } finally {
  process.removeListener('SIGINT',onSignal);process.removeListener('SIGTERM',onSignal);
  await browser?.close();
  await new Promise(resolve=>{if(child.exitCode!==null||child.signalCode)return resolve();const timer=setTimeout(()=>child.kill('SIGKILL'),5000);child.once('exit',()=>{clearTimeout(timer);resolve();});child.kill('SIGTERM');});
  for(const socket of sockets)socket.destroy();await new Promise(resolve=>smtp.close(resolve));
  const report={scope:'Chromium + build Production local, SMTP/GA/CAPTCHA factices, CSP contournée UNIQUEMENT pour HTTP local',cspValidated:false,expectedFunctionalScenarios:14,results,consoleErrors,expectedOversizeErrors:expectedErrors,externalBlocked:external,messagesInFakeInbox:inbox.length,retryEvidence};
  fs.mkdirSync(path.join(root,'test-results'),{recursive:true});fs.writeFileSync(path.join(root,'test-results/browser.json'),JSON.stringify(report,null,2));fs.writeFileSync(path.join(root,'test-results/server.log'),serverLog);
  console.log(JSON.stringify(report,null,2));
 }
}
main().catch(e=>{console.error(e);process.exitCode=1;});
