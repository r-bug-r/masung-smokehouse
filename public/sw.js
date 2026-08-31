const CACHE_NAME = 'masung-pwa-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/logo.png',
  '/favicon.svg',
  '/masung_smoked_meat_hero_hd.png',
  '/masung_brisket_food_asset_hd.png',
  '/masung_origin_to_ubelt_map_asset_hd.png',
  '/manifest.webmanifest'
];

// Install Event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

// Activate Event
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event: Cache First for Static Assets, Network First for HTML
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // Network first for navigation requests
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => caches.match('/index.html'))
    );
    return;
  }

  // Cache first for static images, fonts, and assets
  if (
    url.pathname.match(/\.(png|jpg|jpeg|svg|webp|woff2|woff|css|js)$/) ||
    ASSETS_TO_CACHE.includes(url.pathname)
  ) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          // Fetch updated version in background (stale-while-revalidate)
          fetch(event.request)
            .then((networkResponse) => {
              if (networkResponse && networkResponse.status === 200) {
                caches.open(CACHE_NAME).then((cache) => cache.put(event.request, networkResponse));
              }
            })
            .catch(() => {});
          return cachedResponse;
        }

        return fetch(event.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
          }
          return networkResponse;
        });
      })
    );
    return;
  }

  // Default network fetch
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
