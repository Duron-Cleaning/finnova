const CACHE_NAME = 'finnova-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles/main.css',
  '/styles/detalles-credito.css',
  '/js/loan-application.js',
  '/js/detalles-credito.js',
  '/js/historial.js',
  '/manifest.json',
  '/icons/icon-72x72.png',
  '/icons/icon-96x96.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache opened');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request)
          .then(response => {
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
            return response;
          });
      })
  );
});
