[![License](http://img.shields.io/badge/license-MIT-A31F34.svg)](https://github.com/MorganConrad/serviceworkers)

# Exercises in Service Workers

## How to run these

The **best way** to go through the exercises is to serve each folder on your localhost. That way you can modify the code as you wish.
If you have a web server already installed, such as Apache or Nginx, use them.

If not, a simple node.js based server that I use a lot for testing is [http-server](https://www.npmjs.com/package/http-server).

`npm install http-server -g`

To run, use the provided serve.bat or serve.sh scripts, or, from the command line, `http-server [path] [options]`

Alternatively, you can browse these pages on GitHub Pages.  Though you won't be able to change the code.
The URL will be https://morganconrad.github.io/serviceworkers/{exercise folder}/www/index.html

## 01_multipleSWs: Hook up multiple service workers.  

This shows how you can setup separate service workers per folder.  It installs one service worker for
 - index.html
 - help.html   (note - also in /)
 - blog/
 - users/

In the console, you will see the workers get registered, then log messages when they get called for a fetch.

Different Service Workers _per folder_ is a reasonable idea: Blog vs. images. vs CSS, or security

Because two different workers (SW_01.js and SW_01_help.js) try to control the root directory, they swap back and forth.  
 - This is probably a bug in real code.
 - In the Developer Console, note how they are waiting on each other...
 - In all the other exercises, only a single service worker gets registered, at the root level.

[Open on GitHub Pages](http://morganconrad.github.io/serviceworkers/01_multipleSWs/www/index.html)


## 02_multipleListeners: Attach multiple listeners to the fetch event

One listener, named `doNothing()`, just logs.  Since it doesn't call `event.respondTo()`, processing continues.

The second listener, `realHandler()`, responds by calling the normal fetch method, ending the listener chain.

Try swapping the order, putting `realHandler` first, and see if `doNothing` still gets called.

In a "real" example, one listener might handle HTML, another CSS, etc...

[Open on GitHub Pages](http://morganconrad.github.io/serviceworkers/02_multipleListeners/www/index.html)



## 03_fetch: A vaguely realistic fetch listener

This example responds with either cached results (`cacheFirstThenNetwork()`), or responses from the network (`networkFirstThenCache()`).
Edit the code and see what happens.  Note that more.html is deliberately left out of the initial cache, so it will always require one network call.

[Open on GitHub Pages](http://morganconrad.github.io/serviceworkers/03_fetch/www/index.html)



## 04_templating: More fun stuff to do with Fetch - Templating

Illustrates how you could modify the response.  For example, fetching some JSON data to use in a template engine like Handlebars.

[Open on GitHub Pages](http://morganconrad.github.io/serviceworkers/04_templating/www/index.html)




## More Interesting "Fetch" Use Cases of Service Workers

 - Use user's location to switch to a geographically closer server.
 - Load Balancing
 - Analytics
