self.addEventListener("install", event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open("v2").then(cache => {
      return cache.addAll([
        "./",
        "./index.html",
        "./styles/main.css",
        "./main.js",
        "./manifest.json",
        "./assets/logo.png"
      ]);
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // update cache with fresh copy
        const clone = response.clone();
        caches.open("v1").then(cache => cache.put(event.request, clone));
        return response;
      })
      .catch(() => caches.match(event.request)) // fallback if offline
  );
});


self.addEventListener("activate", event => {
  event.waitUntil(clients.claim()); // make SW control open pages immediately
});
  