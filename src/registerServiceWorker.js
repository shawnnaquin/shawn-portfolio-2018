// /* eslint-disable no-console */
import { register } from "register-service-worker";
import store from "@/store.js";

// if (process.env.NODE_ENV === "production") {
// localhost is safe to use now. everything including workbox is made on dev.
register(`/service-worker.js`, {
  // must be served from route dir
  ready() {
    // only fires on localhost?!
    // console.log("ready");
  },

  cached() {
    store.state.generalMessage = "Content has been cached for offline use!";
  },
  registered(regis) {
    store.state.messageType = "registered";
    store.state.generalMessage = "Content cache registered. Content available offline!";
  },
  updateFound() {
    store.state.generalMessage = "New Content is available! Downloading...";
  },
  updated(registration) {
    store.state.generalMessage = "New content is available; please refresh!";
    let worker = registration.waiting;
    worker.postMessage({ action: "skipWaiting", msg: 'New content is available!' });
  },

  offline() {
    // only fires on localhost?!
    store.state.generalMessage = "No internet connection found. App is running in offline mode.";
  },

  error(error) {
    // only fires on localhost?!
    store.state.generalMessage = error;
  }
});
// }
