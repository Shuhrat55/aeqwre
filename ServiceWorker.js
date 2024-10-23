const cacheName = "DefaultCompany-My project (13)-1.0.2";
const contentToCache = [
    "Build/Test.loader.js",
    "Build/01bc75f34ebdc6520a4c08c058ba9019.js.unityweb",
    "Build/dc7f1bb52640661f38ca63b18d2cf3c3.data.unityweb",
    "Build/7799c3dcc4c0a6db06be7a514416e545.wasm.unityweb",
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
