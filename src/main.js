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

// router.afterEach( (to,from)=> {
// 	console.log( from.name == 'contact' );
// });

router.beforeEach((to, from, next) => {
  store.commit("setResetScroll", false);

  if (!store.state.menuOpen && !from.params.image && !store.state.openContact) {
    const scrollTop = () => {
      const el = document.scrollingElement || document.documentElement;
      return el.scrollTop;
    };

    store.commit("setLastScroll", {
      last: scrollTop()
    });
  }

  if (from.params.image || from.name == "contact") {
    store.commit("setResetScroll", true);
  }

  store.commit("setTrans", { trans: "fade-up", mode: "out-in" });
  // if ( to.params.image && !from.params.image ) {
  // } else if (!to.params.image && from.params.image) {
  // 	store.commit('setTrans', { trans: 'fade-o', mode: '' } );
  // } else {
  // 	store.commit('setTrans', { trans: 'fade-up' } );
  // }

  next();
});
