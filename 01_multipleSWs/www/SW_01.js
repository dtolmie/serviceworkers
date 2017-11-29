const EXERCISE_NAME = "SW_01";
const FOLDER_NAME = "";
const MY_NAME = EXERCISE_NAME + FOLDER_NAME;
const VERSION = "_V1";
const CACHE_NAME = MY_NAME + VERSION;

/** Global variables and code are very unusual, test */
var someGlobal = " someGlobal" + CACHE_NAME;

//console.log('Entering serviceworker ' + someGlobal);
/* end of global test area */


const INITIAL_CACHE = [
  "/index.html",
  "/help.html",   // deliberately leave out more.html
  "/",
  "/blog/PlayTheAcceleratedDragon.html",  // these wont matter cause subfolder SWs will handle them
  "/users/HouYifan.html"
];



self.addEventListener('install', function(event) {
  someGlobal = someGlobal + " install";
  console.log(CACHE_NAME + ': install event' + someGlobal);
  event.waitUntil(caches.open(CACHE_NAME)
    .then(function(cache) {
      return cache.addAll(INITIAL_CACHE);
    })
    .catch(err => console.log('install failed: ' + err))
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
    .catch((err) => console.log('activate failed: ' + err))
  );
});



self.addEventListener('fetch', function(event) {
  console.log(MY_NAME + ': fetch event ' + event.request.url);
  return;  // just return
});
