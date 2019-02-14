import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import "intersection-observer";
import { VLazyImagePlugin } from "v-lazy-image";
import { VueHammer } from "vue2-hammer";
import VueScrollTo from "vue-scrollto";
import VueAnalytics from "vue-analytics";
import VueHead from "vue-head";

Vue.use(VueHead, {
  complement: "Shawn Naquin - Developer"
});
Vue.use(VueScrollTo);
Vue.use(VueHammer);
Vue.use(VLazyImagePlugin);
Vue.use(VueAnalytics, {
  id: "UA-119672136-2",
  router
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

router.beforeEach((to, from, next) => {

  if ( to.name == 'contact' && from.name != 'contact' ) {
    store.commit('setLastRoute', from.path );
  }

  store.commit("setTrans", { trans: "fade-up", mode: "out-in" });

  next();
});
