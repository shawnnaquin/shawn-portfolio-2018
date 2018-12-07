workbox.routing.registerNavigationRoute("/index.html");

function sendDesktopNotification(text) {

  if (Notification.permission == 'granted') {

    var n = new Notification('Shawn Naquin | Developer', {
      body: text
    }).onclick = () => {
      parent.focus();
      window.focus(); //just in case, older browsers
    };

  }

}

self.addEventListener('message', event => {
	sendDesktopNotification(event.data.msg);
});
