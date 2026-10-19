/* Archivio clinico - funzionamento senza rete. Conserva solo i file dell'app, mai dati. */
const V='ac-352442a4f573';
const FILES=["./", "./index.html", "./manifest.webmanifest", "./apple-touch-icon.png", "./icon-192.png", "./icon-512.png"];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  const r=e.request;if(r.method!=='GET')return;
  const u=new URL(r.url);if(u.origin!==location.origin)return;
  const key=r.mode==='navigate'?'./index.html':r;
  e.respondWith(caches.open(V).then(c=>c.match(key,{ignoreSearch:true}).then(hit=>hit||fetch(r).then(res=>{if(res&&res.ok&&res.type==='basic')c.put(r,res.clone());return res}))));
});
