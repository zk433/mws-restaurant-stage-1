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