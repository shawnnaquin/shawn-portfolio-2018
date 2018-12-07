// /* eslint-disable no-console */
import { register } from "register-service-worker";
import store from "@/store.js";

// if (process.env.NODE_ENV === "production") {
// localhost is safe to use now. everything including workbox is made on dev.
register(`${process.env.BASE_URL}service-worker.js`, {
  // must be served from route dir
  ready() {
    // only fires on localhost?!
    console.log("ready");
  },

  cached() {
    store.state.generalMessage = "Content has been cached for offline use!";
  },
  registered() {
    if (!window.navigator.onLine) {
      store.state.generalMessage = "Offline Mode: Serving content from cache!";
    } else {
      let w =
        (parseInt(window.sessionStorage.getItem("registeredMessage")) || 0) + 1;
      window.sessionStorage.setItem("registeredMessage", w);
      store.state.messageType = "registered";
      store.state.generalMessage =
        "Content cache registered. Content available offline!";
    }
  },
  updateFound() {
    console.log("New content is downloading.");
  },
  updated(registration) {
    store.state.generalMessage = "New content is available; please refresh!";
    let worker = registration.waiting;
    worker.postMessage({ action: "skipWaiting" });
  },

  offline() {
    // only fires on localhost?!
    store.state.generalMessage =
      "No internet connection found. App is running in offline mode.";
  },

  error() {
    // only fires on localhost?!
    store.state.generalMessage =
      "No internet connection found. App is running in offline mode.";
  }
});

// }
