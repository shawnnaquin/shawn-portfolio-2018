// /* eslint-disable no-console */
import { register } from "register-service-worker";
import store from './store.js';

let playMessage = ()=> {
  setTimeout(()=> {
    store.state.showGeneralMessage = '';
    console.log('played');
    setTimeout(()=> {
      store.state.generalMessage = '';
    },1000);
  }, 1500 );
};

if (process.env.NODE_ENV === "production") {
  register(`${process.env.BASE_URL}service-worker.js`, {

    ready() {
      console.log('ready');
      store.state.generalMessage = "App is being served from cache by a service worker.";
      store.state.showGeneralMessage = 'true';
      playMessage();
    },

    cached() {
      console.log('cache');
      store.state.generalMessage = "Content has been cached for offline use.";
      store.state.showGeneralMessage = 'true';
      playMessage();
    },

    updated() {
      console.log('updated');
      store.state.generalMessage = "New content is available; please refresh.";
      store.state.showGeneralMessage = 'true';
      playMessage();
    },

    offline() {
      console.log('offline');
      store.state.generalMessage = "No internet connection found. App is running in offline mode.";
      store.state.showGeneralMessage = 'true';
      playMessage();

    },

    error() {
      console.log('error');
      store.state.generalMessage = "Error during service worker registration: " + error;
      store.state.showGeneralMessage = 'true';
      playMessage();
    }

  });
}
