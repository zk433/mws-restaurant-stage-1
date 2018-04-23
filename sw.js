const cacheName = "restaurant-cache-v1";
const cacheFiles = [
	'/',
	'/restaurant.html',
	'/js/main.js',
	'/js/restaurant_info.js',
	'/js/lazyload.min.js',
	'/dist/idb.js',
	'/dist/localforage.js',
	'/dist/dbhelper.js',
	'/css/normalize.min.css',
	'/dist/css/styles.min.css',
	'/manifest.json',
	'/favicon.png',
	'/img/compressed/1.jpg',
	'/img/compressed/2.jpg',
	'/img/compressed/3.jpg',
	'/img/compressed/4.jpg',
	'/img/compressed/5.jpg',
	'/img/compressed/6.jpg',
	'/img/compressed/7.jpg',
	'/img/compressed/8.jpg',
	'/img/compressed/9.jpg',
	'/img/compressed/10.jpg',
	'/img/logo-128.png',
	'/img/logo-144.png',
	'/img/logo-152.png',
	'/img/logo-192.png',
	'/img/logo-512.png',
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

	var url = new URL(event.request.url)
	if (url.origin !== self.origin) return;
	event.respondWith(
		caches.match(url.pathname).then(function(response){
			return response || fetch(url);
		})
	);
});
