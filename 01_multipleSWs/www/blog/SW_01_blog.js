const EXERCISE_NAME = "SW_01";
const FOLDER_NAME = "_blog";
const MY_NAME = EXERCISE_NAME + FOLDER_NAME;
const VERSION = "_V1";
const CACHE_NAME = MY_NAME + VERSION;

/** Global variables and code are very unusual, test */
var someGlobal = "";

/* end of global test area */


const INITIAL_CACHE = ['PlayTheAcceleratedDragon.html'];


self.addEventListener('install', function(event) {
  someGlobal = someGlobal + " install";
  console.log(CACHE_NAME + ': install event' + someGlobal);
  event.waitUntil(caches.open(CACHE_NAME)
    .then(function(cache) {
      return cache.addAll(INITIAL_CACHE);
    })
    /*
      Failure is not only an option, it is the best option
      Don't install a faulty ServiceWorker

    .catch(function(err) { console.log('install failed: ' + err)} )
    */
  );
});


self.addEventListener('activate', function(event) {
  someGlobal = someGlobal + " & activate";
  console.log(CACHE_NAME + ': activate event' + someGlobal);
  event.waitUntil(
    caches.keys()
    .then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (!cacheName.endsWith(VERSION)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
    // .catch((err) => console.log('activate failed: ' + err))
  );
});



self.addEventListener('fetch', function(event) {
  console.log(MY_NAME + ': fetch event ' + event.request.url);
  return;  // just return
});
