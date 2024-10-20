const CACHE_NAME = 'pwa-demo-cache-v1';
const urlsToCache = [
  '/',
  'rsc/jpg/icon.jpg',
  'rsc/jpg/splash.jpg',
  'base.html',
  'google003edc76aef5317f.html',
  'index.html',
  'manifest.json',
  'service-worker.js'
];

// Install event: Cache all necessary assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event: Serve cached assets if available
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});

// Activate event: Clean up old caches
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});