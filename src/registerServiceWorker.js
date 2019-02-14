// /* eslint-disable no-console */
import { register } from "register-service-worker";
import store from "@/store.js";

// if (process.env.NODE_ENV === "production") {
// localhost is safe to use now. everything including workbox is made on dev.
register(`${process.env.BASE_URL}service-worker.js`, {
  ready() {
  },
  cached() {
  },
  registered(regis) {
  },
  updateFound() {
  },
  updated(registration) {
  },
  offline() {
  },
  error(error) {
  }
});
// }
