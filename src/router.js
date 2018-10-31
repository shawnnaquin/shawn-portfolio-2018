import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/website",
      name: "website",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // man I love this feature of vue!
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Portfolio.vue")
    },
    {
      path: "/marketing",
      name: "marketing",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Portfolio.vue")
    }
  ]
});
