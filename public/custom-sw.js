/* public/custom-sw.js */

const CACHE_NAME = 'static-cache-v1'; // Cache versioning
const urlsToCache = [
  '/',
  '/offline.html', // Offline fallback page, create one in public/
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
];

self.addEventListener('install', event => {
  console.log('[Service Worker] Installing...');
  // Cache the essential resources
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[Service Worker] Caching essential resources');
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting(); // Activate the service worker immediately
});

self.addEventListener('activate', event => {
  console.log('[Service Worker] Activating...');
  event.waitUntil(
    // Remove old caches when a new service worker activates
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('[Service Worker] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  return self.clients.claim(); // Take control of the page immediately
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  if (url.origin === location.origin) {
    event.respondWith(
      caches.match(event.request).then(cached => {
        if (cached) {
          return cached;
        }

        return fetch(event.request).then(response => {
          // Cache the response if it is fetched
          return caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, response.clone());
            return response;
          });
        }).catch(() => {
          // If the fetch fails (offline), serve the offline page (or fallback)
          return caches.match('/offline.html');
        });
      })
    );
  }
});
