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


// export default function IndexController(container){
//   this._container = container;
//   this._receiveData();
//   this._registerServiceWorker();
// }

// IndexController.prototype._registerServiceWorker = function(){
//   if (!navigator.serviceWorker) return;

//   navigator.serviceWorker.register('/sw.js').then(function(registration){
//     console.log("SW registration successful");
//   }).catch(function(error){
//     console.log("SW registration failed", error);  
//   });
// }

// IndexController.prototype._receiveData = function(data){
//   const restaurants = JSON.parse(data);
// }

// function openDB(){
//   const name = 'restaurant-review-db';
//   const version = 1;

//   return idb.open(name, version, function(upgradeDb){
//     console.log('making a new object store');
//     const store = upgradeDb.createObjectStore('restaurants', { keyPath: 'id'});
//   });
// };

// function IndexController(container){
//   this._container = container;
//   this._receiveData();
// }

// IndexController.prototype._receiveData = function(data){
//   const restaurants = JSON.parse(data);
// }

// function openDB(){
//   const name = 'restaurant-review-db';
//   const version = 1;

//   return idb.open(name, version, function(upgradeDb){
//     console.log('making a new object store');
//     const store = upgradeDb.createObjectStore('restaurants', { keyPath: 'id'});
//   });
// };

/*
Check if IndexedDB is supported
*/
// if (!('indexedDB' in window)) {
//   console.log('This browser doesn\'t support IndexedDB');
// }

// function openDB(){
//   const name = 'restaurant-review-db';
//   const version = 1;

//   const dbPromise = idb.open(name, version, function(upgradeDb){
//     console.log('making a new object store');
//     const store = upgradeDb.createObjectStore('restaurants', { keyPath: 'id'});
//   });
// }

// IndexController.prototype._registerServiceWorker = function(){
//   if (!navigator.serviceWorker) return;

//   navigator.serviceWorker.register('/sw.js').then(function(registration){
//     console.log("SW registration successful");
//   }).catch(function(error){
//     console.log("SW registration failed", error);  
//   });
// };