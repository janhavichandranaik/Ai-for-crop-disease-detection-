// AgriShield Service Worker - Offline Disease Library & Agronomy Reference Caching
const CACHE_NAME = 'agrishield-offline-v1';

// Essential assets and reference data to precache for field farmers
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon.svg',
];

// Install event - precache core app shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[AgriShield SW] Precaching offline essentials...');
      return cache.addAll(PRECACHE_URLS).catch((err) => {
        console.warn('[AgriShield SW] Precache partial error (ignored for non-critical):', err);
      });
    }).then(() => self.skipWaiting())
  );
});

// Activate event - clean up older caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('[AgriShield SW] Removing legacy cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - Stale-While-Revalidate for app assets and offline fallback
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Skip non-GET requests (e.g. POST /api/diagnose)
  if (event.request.method !== 'GET') {
    return;
  }

  // Handle API GET requests or Weather requests (Network first with cache fallback)
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          if (response && response.status === 200) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
          }
          return response;
        })
        .catch(() => {
          return caches.match(event.request);
        })
    );
    return;
  }

  // Static assets & navigation: Stale-While-Revalidate
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseClone);
            });
          }
          return networkResponse;
        })
        .catch(() => {
          // If offline and requesting navigation, return index.html
          if (event.request.mode === 'navigate') {
            return caches.match('/') || caches.match('/index.html');
          }
          return cachedResponse;
        });

      return cachedResponse || fetchPromise;
    })
  );
});
