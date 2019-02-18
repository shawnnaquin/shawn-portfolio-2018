// self.addEventListener('activate', function(event) {});
const FALLBACK_IMAGE_URL = '/img/meta/offline.svg';
const FALLBACK_IMAGE_PLAYER = '/img/meta/player.svg';

const urlHandler = workbox.strategies.cacheFirst({
    cacheName: '2019-portfolio-shawn'
});

workbox.routing.registerRoute(
    /\.(png|webp|jpe?g)(?!\?player)/,
    ({event}) => {
        return urlHandler.handle({event})
            .then((response) => {
                return response || caches.match(FALLBACK_IMAGE_URL);
            })
            .catch(() => caches.match(FALLBACK_IMAGE_URL));
    });

workbox.routing.registerRoute(
    /\.(png|webp|jpe?g)(\?player)/,
    ({event}) => {
        return urlHandler.handle({event})
            .then((response) => {
                return response || caches.match(FALLBACK_IMAGE_PLAYER);
            })
            .catch(() => caches.match(FALLBACK_IMAGE_PLAYER));
    });

// workbox.routing.registerRoute(
//   /\.(png|webp|jpe?g)(?!\?player)/
//   async ({event}) => {
//     try {
//       return await workbox.strategies.cacheFirst().handle({event});
//     } catch (error) {
//       return caches.match(FALLBACK_IMAGE_URL);
//     }
//   }
// );


// // Use a stale-while-revalidate strategy for all other requests.
// workbox.routing.setDefaultHandler(
//   workbox.strategies.cacheFirst()
// );

// // This "catch" handler is triggered when any of the other routes fail to
// // generate a response.
// workbox.routing.setCatchHandler( ( {event} ) => {
//   // Use event, request, and url to figure out how to respond.
//   // One approach would be to use request.destination, see
//   // https://medium.com/dev-channel/service-worker-caching-strategies-based-on-request-types-57411dd7652c

//   let wide = event.request.url.match( /\.(png|webp|jpe?g)(\?player)/ );
//   let notWide = event.request.url.match( /\.(png|webp|jpe?g)(?!\?player)/ );

//   if (  wide ) {
//     return caches.match( FALLBACK_IMAGE_PLAYER );
//   } else if ( notWide ) {
//     return caches.match( FALLBACK_IMAGE_URL );
//   } else {
//       return Response.error();
//   }

// } );

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