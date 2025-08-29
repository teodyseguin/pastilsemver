const CACHE_NAME = "v1.0.3";
const ASSETS = [
  "./",
  "./index.html",
  "./styles/main.css",
  "./main.js",
  "./manifest.json",
  "./assets/logo.png",
  "https://dev-ding-and-mamitas.pantheonsite.io/sites/default/files/2025-08/chicken-pastil-only-regular.webp",
  "https://dev-ding-and-mamitas.pantheonsite.io/sites/default/files/2025-08/chicken-pastil-only-spicy.webp",
  "https://dev-ding-and-mamitas.pantheonsite.io/sites/default/files/2025-08/chicken-pastil-regular-with-regular-rice.webp",
  "https://dev-ding-and-mamitas.pantheonsite.io/sites/default/files/2025-08/chicken-pastil-spicy-with-regular-rice.webp",
  "https://dev-ding-and-mamitas.pantheonsite.io/sites/default/files/2025-08/chicken-pastil-lumpia-with-regular-rice.webp",
  "https://dev-ding-and-mamitas.pantheonsite.io/sites/default/files/2025-08/chicken-pastil-with-regular-rice-plus-egg.webp",
  "https://dev-ding-and-mamitas.pantheonsite.io/sites/default/files/2025-08/chicken-pastil-lumpia-10-pcs.webp",
  "https://dev-ding-and-mamitas.pantheonsite.io/sites/default/files/2025-08/chicken-pastil-sisig.webp"
];

// Install: pre-cache essential assets
self.addEventListener("install", event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

// Activate: clean up old caches
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => 
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    ).then(() => self.clients.claim())
  );
});

// Fetch: cache-first with network fallback
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).then(networkResponse => {
        const clone = networkResponse.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        return networkResponse;
      }).catch(() => caches.match("./offline.html")); // Optional fallback
    })
  );
});
