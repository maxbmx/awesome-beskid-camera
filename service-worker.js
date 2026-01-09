const CACHE_NAME = 'v2';
const CACHE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/awesome-beskid-camera.svg',
  '/awesome-beskid-camera.png',
  '/icon-192.png',
  '/icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(CACHE_ASSETS))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(key => (key === CACHE_NAME ? null : caches.delete(key))))
    )
  );
});
