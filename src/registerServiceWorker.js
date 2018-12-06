// /* eslint-disable no-console */
import { register } from "register-service-worker";

let playMessage = ()=> {
  setTimeout(()=> {
    window.sessionStorage.getItem( 'showGeneralMessage', '' );
    console.log('played');
    setTimeout(()=> {
      window.sessionStorage.getItem( 'generalMessage', '' );
    },1000);
  }, 1500 );
};

if (process.env.NODE_ENV === "production") {
  register(`${process.env.BASE_URL}service-worker.js`, {

    ready() {
      console.log('ready');
      window.sessionStorage.setItem('generalMessage', "App is being served from cache by a service worker.");
      window.sessionStorage.setItem('showGeneralMessage', 'true');
      playMessage();
    },

    cached() {
      console.log('cache');
      window.sessionStorage.setItem('generalMessage', "Content has been cached for offline use.");
      window.sessionStorage.setItem('showGeneralMessage', 'true');
      playMessage();
    },

    updated() {
      console.log('updated');
      window.sessionStorage.setItem('generalMessage', "New content is available, please refresh.");
      window.sessionStorage.setItem('showGeneralMessage', 'true');
      playMessage();
    },

    offline() {
      console.log('offline');
      window.sessionStorage.setItem('generalMessage', "No internet connection found. App is running in offline mode.");
      window.sessionStorage.setItem('showGeneralMessage', 'true');
      playMessage();

    },

    error(error) {
      console.log('error');
      window.sessionStorage.setItem( 'generalMessage', "Error during service worker registration: " + error );
      window.sessionStorage.setItem('showGeneralMessage', 'true');
      playMessage();
    }

  });
}
