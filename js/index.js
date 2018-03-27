/*
Register the service worker
*/
if ('serviceWorker' in navigator){
  navigator.serviceWorker
  .register('/sw.js')
  .then(function(registration){
    console.log("SW registration completed");
  }).catch(function(err){
    console.log("SW registration failed", err);
  });
} else {
  console.log("SW is not supported in this browser");
};

/*
Check if IndexedDB is supported
*/
if (!('indexedDB' in window)) {
  console.log('This browser doesn\'t support IndexedDB');
}

function openDB(){
  const name = 'restaurant-review-db';
  const version = 1;

  const dbPromise = idb.open(name, version, function(upgradeDb){
    console.log('making a new object store');
    const store = upgradeDb.createObjectStore('restaurants', { keyPath: 'id'});
  });
}