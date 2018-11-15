import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import "intersection-observer";
import { VLazyImagePlugin } from "v-lazy-image";
import { VueGesture } from 'vue2-gesture';

Vue.use(VLazyImagePlugin);
Vue.use(VueGesture);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");