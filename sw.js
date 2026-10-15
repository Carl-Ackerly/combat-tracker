const CACHE='combat-tracker-crystal-theme-v1';
const FILES=['crystal-theme.css','theme.js','./','index.html','style.css','rules.js','spells-data.js','spell-index-2024.js','class-rules-2024.js','subclass-reference-2024.js','subclass-grants-2024.js','invocations-2024.js','app.js','icon.svg','manifest.webmanifest'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('combat-tracker-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET'||new URL(e.request.url).origin!==self.location.origin)return;e.respondWith(fetch(e.request).then(response=>{if(response.ok){const copy=response.clone();caches.open(CACHE).then(c=>c.put(e.request,copy))}return response}).catch(()=>caches.match(e.request,{ignoreSearch:true})))});
