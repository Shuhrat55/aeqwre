const cacheName = "DefaultCompany-My project (13)-1.0.2";
const contentToCache = [
    "Build/Test.loader.js",
    "Build/03591a1069dfc35f029f88dfe0cb7d33.js.unityweb",
    "Build/dfec6eab7aee13390caaa432e773cd99.data.unityweb",
    "Build/64106c8c4ac204c638723292f8c6d7d2.wasm.unityweb",
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
