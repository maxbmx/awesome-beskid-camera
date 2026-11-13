// Strategia: wszystkie pliki z tej domeny najpierw z sieci, offline – kopia z pamięci podręcznej.
// Dzięki temu HTML, CSS i JS zawsze pochodzą z tego samego wydania.
// Nowa wersja workera przejmuje stronę od razu (skipWaiting + clients.claim).
const CACHE_NAME = 'v8';
const CACHE_ASSETS = [
  './',
  './manifest.json',
  './awesome-beskid-camera.svg',
  './logo.svg',
  './favicon.ico',
  './apple-touch-icon.png',
  './icon-192.png',
  './icon-512.png',
  './icon-maskable-512.png',
  './app.css',
  './app.js'
];

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    // cache: 'reload' – pomiń pamięć HTTP przeglądarki, żeby nie zapisać starych plików
    await cache.addAll(CACHE_ASSETS.map(url => new Request(url, { cache: 'reload' })));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});

const putInCache = async (req, res) => {
  if (!res || !res.ok || res.type === 'opaque') return;
  const cache = await caches.open(CACHE_NAME);
  await cache.put(req, res);
};

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;

  event.respondWith((async () => {
    try {
      const fresh = await fetch(req);
      event.waitUntil(putInCache(req, fresh.clone()));
      return fresh;
    } catch (_) {
      const cached = await caches.match(req, { ignoreSearch: true });
      return cached || (req.mode === 'navigate' && (await caches.match('./'))) || Response.error();
    }
  })());
});
