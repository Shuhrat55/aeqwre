const cacheName = "DefaultCompany-My project (13)-1.0.2";
const contentToCache = [
    "Build/Test.loader.js",
    "Build/7331159b2cb6d5e870e16405fe7ee203.js.unityweb",
    "Build/c3495596478d5e233a526480d81d4462.data.unityweb",
    "Build/6be4b2b5941e562bfa00b68acc1e02c9.wasm.unityweb",
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
