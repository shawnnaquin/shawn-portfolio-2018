// self.addEventListener('activate', function(event) {});
const FALLBACK_IMAGE_URL = '/img/meta/offline.svg';
const FALLBACK_IMAGE_PLAYER = '/img/meta/player.svg';

const urlHandler = workbox.strategies.cacheFirst({
    cacheName: '2019-portfolio-shawn'
});

workbox.routing.registerRoute(
    /^((?!mobile\.(vert|horiz)).)*(png|jpe?g|webp)$/,
    ({event}) => {
        return urlHandler.handle({event})
            .then((response) => {
                return response || caches.match(FALLBACK_IMAGE_URL);
            })
            .catch(() => caches.match(FALLBACK_IMAGE_URL));
    });

workbox.routing.registerRoute(
    /\.(png|jpe?g|webp)(\?player)/,
    ({event}) => {
        return urlHandler.handle({event})
            .then((response) => {
                return response || caches.match(FALLBACK_IMAGE_PLAYER);
            })
            .catch(() => caches.match(FALLBACK_IMAGE_PLAYER));
    });


workbox.googleAnalytics.initialize();

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