// self.addEventListener('activate', function(event) {});
this.addEventListener('fetch', function(event) {

    // Full documentation for respondWith is available on
    // MDN (http://mzl.la/1SKtV92), but basically with this
    // you are able to customize the response from the
    // request you initially get by the browser.

    event.respondWith(

    // caches.open look familiar? It should! We just used
    // it in the code above! Here we are finding a match
    // for the event.request in our cached v1 storage (in
    // the browser).
    //
    // If we find a match for the request in the cache
    // storage, that means our service worker will serve
    // that file right up from the browser itself rather
    // than going alllll the way to the server to get it!
    // NICE!!!

    // However, if the resource isn't found, then it WILL
    // go ALLLL the way to the server to grab it, or if
    // it's in offline mode, will break and not show the
    // file. Bummer!

        caches.open('shawn-portfolio-2018-precache-https://www.devnola.com/').then(function(cache) {
            return cache.match(event.request).then(function(response) {
                return response || fetch(event.request).then(function(response) {
                    cache.put(event.request, response.clone());
                    return response;
                });
            });
        })
    );
});

self.addEventListener('message', event => {

	event.waitUntil(
	  self.registration.showNotification( 'Shawn Naquin - Developer', {
	    body: event.data.msg
	  })
	);

});

self.addEventListener('push', function(event) {

  event.waitUntil(
    self.registration.showNotification( 'Shawn Naquin - Developer', {
      body: event.data.text()
    })
  );

});

self.addEventListener('notificationclick', function(event) {

  // console.log('On notification click: ', event.notification.tag);
  // Android doesn’t close the notification when you click on it
  // See: http://crbug.com/463146
  event.notification.close();

  // This looks to see if the current is already open and
  // focuses if it is
  event.waitUntil(clients.matchAll({
    type: 'window'
  }).then(function(clientList) {
    for (var i = 0; i < clientList.length; i++) {
      var client = clientList[i];
      if (client.url === '/' && 'focus' in client) {
        return client.focus();
      }
    }
    if (clients.openWindow) {
      return clients.openWindow('/');
    }
  }));

});