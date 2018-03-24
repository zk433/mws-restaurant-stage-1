const cacheName = "restaurant-cache-v2";
const cacheFiles = [
	'/',
	'/restaurant.html',
	'/js/dbhelper.js',
	'/js/main.js',
	'/js/restaurant_info.js',
	'/js/indexedDB.js',
	'/vendor/idb.js',
	'/css/media-queries.css',
	'/css/styles.css',
	'/data/restaurants.json',
	'/img/1.jpg',
	'/img/2.jpg',
	'/img/3.jpg',
	'/img/4.jpg',
	'/img/5.jpg',
	'/img/6.jpg',
	'/img/7.jpg',
	'/img/8.jpg',
	'/img/9.jpg',
	'/img/10.jpg',
	'https://fonts.googleapis.com/css?family=Open+Sans:400,700'
]

// *Install event 
self.addEventListener('install', function(event){
	console.log("SW installed");
	event.waitUntil(
		caches.open(cacheName)
		.then(function(cache){
			console.log("SW caching cachefiles");
			return cache.addAll(cacheFiles);
		})
	)
});

// Activate event
self.addEventListener('activate', function(event){
	console.log("SW activated");
	event.waitUntil(
		caches.keys().then(function(cacheNames){
			return Promise.all(cacheNames.map(function(thisCacheName){
				if(thisCacheName !== cacheName) {
					console.log("SW Removing cached files from", thisCacheName);
					return caches.delete(thisCacheName);
				}
			}))
		})
	)
});

// Fetch event
self.addEventListener('fetch', function(event){
	event.respondWith(
		caches.match(event.request).then(function(response){
			return response || fetch(event.request);
		})
	);
});
