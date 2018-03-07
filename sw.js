const cacheName = "restaurant-cache-v1";
const cacheFiles = [
    'index.html',
    'restaurant.html',
    'js/dbhelper.js',
    'js/main.js',
    'js/restaurant_info.js',
    'css/media-queries.css',
    'css/styles.css',
    'data/restaurants.json',
    'img/1.jpg',
    'img/2.jpg',
    'img/3.jpg',
    'img/4.jpg',
    'img/5.jpg',
    'img/6.jpg',
    'img/7.jpg',
    'img/8.jpg',
    'img/9.jpg',
    'img/10.jpg'
]

// Install event
self.addEventListener('install', function(event){
    event.waitUntil(
        caches.open(cacheName).then(function(cache){
            return cache.addAll(cacheFiles);
        })
    )
});

// Activate event

// Fetch event
self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request).then(function(response) {
        return response || fetch(event.request);
      })
    );
  });