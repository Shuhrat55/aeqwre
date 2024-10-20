const cacheName = "DefaultCompany-My project (13)-1.0.2";
const contentToCache = [
    "Build/Test.loader.js",
    "Build/f2d3cecdf1dbd97fc965dd62550d4e70.js.unityweb",
    "Build/30fd418d1bcac5b5ad0b883e9750d455.data.unityweb",
    "Build/d9d737a7405ce962dfa0d3babbfad15c.wasm.unityweb",
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
