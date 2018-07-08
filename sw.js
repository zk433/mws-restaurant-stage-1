const cacheName = "restaurant-cache-v2";
const cacheFiles = [
	'/',
	'/restaurant.html',
	'/js/main.js',
	'/js/restaurant_info.js',
	'/js/dbhelper.js',
	'/dist/idb.js',
	// '/dist/localforage.js',
	'/css/normalize.min.css',
	'/dist/css/styles.min.css',
	'/manifest.json',
	'/favicon.png',
	'/img/webp/1.webp',
	'/img/webp/2.webp',
	'/img/webp/3.webp',
	'/img/webp/4.webp',
	'/img/webp/5.webp',
	'/img/webp/6.webp',
	'/img/webp/7.webp',
	'/img/webp/8.webp',
	'/img/webp/9.webp',
	'/img/webp/10.webp',
	'/img/logo-128.png',
	'/img/logo-144.png',
	'/img/logo-152.png',
	'/img/logo-192.png',
	'/img/logo-512.png',
	'/img/grey-star.png',
	'/img/yellow-star.png'
]

// *Install event 
self.addEventListener('install', function(event){
	console.log("SW installed");
	event.waitUntil(
		caches.open(cacheName)
		.then(function(cache){
			console.log("SW caching cachefiles");
			return cache.addAll(cacheFiles);
		}).then(function() {
			return self.skipWaiting();
		})
	)
});

// Activate event
self.addEventListener('activate', function(event){
	console.log("SW activated");
	return self.clients.claim();
	// event.waitUntil(
	// 	caches.keys().then(function(cacheNames){
	// 		return Promise.all(cacheNames.map(function(thisCacheName){
	// 			if(thisCacheName !== cacheName) {
	// 				console.log("SW Removing cached files from", thisCacheName);
	// 				return caches.delete(thisCacheName);
	// 			}
	// 		}))
	// 	})
	// )
});

// Background sync
self.addEventListener('sync', function(event) {
	console.log('sync listener')
	if (event.tag === 'sync-reviews') {
		console.log('syncing reviews');
		event.waitUntil(
			doSync({ action: 'send-reviews'})
		)
	}
});

// Fetch event
self.addEventListener('fetch', function(event){
	console.log('fetch listener');
	const url = new URL(event.request.url);

	if (url.origin !== self.origin) return;

	if (url.pathname === '/') {
		event.respondWith(
			caches.match('/')
				.then(response => response || fetch(url))
		);
		return;
	}
	else {
		event.respondWith(
			caches.match(url.pathname).then(function(response){
				return response || fetch(url);
			})
		);
	}	
});

function doSync(message){
	console.log('DoSync')
	return clients.matchAll().then(clients => {
		console.log('clients matched')
		for (const client of clients) {
			console.log('posting message')
			client.postMessage(message);
		}
	})
}
