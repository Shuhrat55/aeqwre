const cacheName = "DefaultCompany-My project (13)-1.0.2";
const contentToCache = [
    "Build/Test.loader.js",
    "Build/480e82fa03619cc9704df457690f0ed6.js.unityweb",
    "Build/da2ddfbc77c41c702400223df18b3c99.data.unityweb",
    "Build/871ba590c46b08f2da9438b7c0dfd220.wasm.unityweb",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
