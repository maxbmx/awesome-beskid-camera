// Strategia:
// - dokument (HTML): najpierw sieć, offline – kopia z pamięci podręcznej,
// - pozostałe pliki z tej domeny (CSS, ikony, manifest): stale-while-revalidate –
//   od razu kopia z pamięci, a w tle pobranie nowszej wersji na następną wizytę.
// Nowa wersja workera przejmuje stronę od razu (skipWaiting + clients.claim).
const CACHE_NAME = 'v7';
const CACHE_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './awesome-beskid-camera.svg',
  './logo.svg',
  './favicon.ico',
  './apple-touch-icon.png',
  './icon-192.png',
  './icon-512.png',
  './icon-maskable-512.png',
  './styles.css'
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
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  const isDocument = req.mode === 'navigate' || req.destination === 'document';
  if (isDocument) {
    event.respondWith((async () => {
      try {
        const fresh = await fetch(req);
        event.waitUntil(putInCache(req, fresh.clone()));
        return fresh;
      } catch (_) {
        const cached = await caches.match(req, { ignoreSearch: true });
        return cached || (await caches.match('./index.html')) || (await caches.match('./')) || Response.error();
      }
    })());
    return;
  }

  event.respondWith((async () => {
    const cached = await caches.match(req);
    // no-cache: zapytaj serwer (warunkowo, 304 gdy bez zmian), a nie pamięć HTTP przeglądarki
    const update = fetch(new Request(req, { cache: 'no-cache' })).then(async fresh => {
      await putInCache(req, fresh.clone());
      return fresh;
    });
    if (cached) {
      event.waitUntil(update.catch(() => {}));
      return cached;
    }
    return update;
  })());
});
