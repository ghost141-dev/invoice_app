const C='invoice-studio-v1',A=['./','index.html','manifest.webmanifest','lib/jspdf.umd.min.js','lib/docx.umd.js','lib/manrope-400.woff2','lib/manrope-600.woff2','lib/manrope-800.woff2','icons/icon-192.png','icons/icon-512.png','icons/apple-touch-icon.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(A)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;if(new URL(r.url).origin!==location.origin)return;
if(r.mode==='navigate'){e.respondWith(fetch(r).then(x=>{const y=x.clone();caches.open(C).then(c=>c.put('index.html',y));return x}).catch(()=>caches.match('index.html')));return}
e.respondWith(caches.match(r).then(m=>m||fetch(r).then(x=>{const y=x.clone();caches.open(C).then(c=>c.put(r,y));return x})))});
