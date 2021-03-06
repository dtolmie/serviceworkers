# Example 2: Multiple Listeners

In this example, we have only one Service Worker, but we attach multiple listeners to the "fetch" event.
This also shows an example of a "cache buster" in initialize.

See SW_02.js

`doNothing()`, which doesn't `event.respondWith()` anything.  The event passes on to any other handlers.

`realHandler()` fetches from the network and calls `event.respondWith()`.

In the console, you will see that doNothing() got called, followed by the real handler.

<pre>
SW_02: doNothing() fetch listener called for http://127.0.0.1:8080/...
SW_02: realHandler() fetch listener called for http://127.0.0.1:8080/...
</pre>

Edit SW_02.js by cut/paste the code so that `realHandler()` is added first.  
Since `realHandler()` does respond to `event.respondWith()`, `doNothing()` never gets called.

If you edit so that only `doNothing()` is added, the event falls through to the system default handler, which is `fetch(event.request)`.

### Notes on install() and INITIAL_CACHE

 1. In some cases you end up fighting the browser's cache, and not downloading the latest versions.
 This example adds a "cache-busting" query to the urls.

 2. Unfortunately, you cannot grab files with globs or wildcards.  That is, you cannot go:

  `INITIAL_CACHE = ['*.html', '/assets/css/*.css'];`

  If you dislike all the typing, plus the necessity/flakiness to constantly updating this list, another strategy is to
  GET the list from the server (say, in JSON format), then create the initial array from that.

### Major Icky Gotcha

Astute observers may notice that the subfolder serviceworkers (SW_01)users.js and SW_01_blog.js) are **still installed**.
This is a big weakness of ServiceWorkers - getting rid of outdated / "zombie" ServiceWorkers.

 - For us techie guys, use Developer Tools and unregister, or just blow away all the cache (Application -> Clear storage).
 - For programmatic deletion, can use `navigator.serviceworker.getRegistrations() ... unregister()`.


### Run it
 - Start your own Apache or Nginx on the WWW folder
 - Launch serve or serve.bat (if you have [http-server](https://www.npmjs.com/package/http-server) installed)
 - [Open on GitHub Pages](https://morganconrad.github.io/serviceworkers/02_multipleListeners/www/index.html)
