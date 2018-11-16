import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import "intersection-observer";
import { VLazyImagePlugin } from "v-lazy-image";
import { VueHammer } from 'vue2-hammer'
Vue.use(VueHammer)
Vue.use(VLazyImagePlugin);

Vue.config.productionTip = false;

new Vue({
  router,
  store, 
  render: h => h(App)
}).$mount("#app");

router.beforeEach( (to, from, next)=> {

	// store.commit('setHadImage', { image: from.params.image } );

	// const scrollTop = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop)

	// if ( scrollTop !== 0 ) {
	//   store.commit('setLastScroll', {
	//     last: scrollTop
	//   });
	// }

	if ( store.state.hadImage ) {
		// setTimeout(()=> {
		// 	window.pageYOffset = document.documentElement.scrollTop = document.body.scrollTop = store.state.lastScroll;
		// }, 100 );
	} else {
		// setTimeout(()=> {
		// 	window.pageYOffset = document.documentElement.scrollTop = document.body.scrollTop = 0;
		// }, 50 );
	}

	next();
});