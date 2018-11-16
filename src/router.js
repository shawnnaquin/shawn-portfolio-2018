import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

const Portfolio = () => import(/* webpackChunkName: "portfolio" */ "./views/Portfolio.vue");
const Project = () => import(/* webpackChunkName: "project" */ "./views/Project.vue");
const Image = () => import(/* webpackChunkNameL "image" */ "./views/Image.vue" );

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
      path: "/:type(marketing|interactive|website)",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // man I love this feature of vue!
      component: Portfolio,
    },

    {
      path: "/:type(marketing|interactive|website)/:project",
      component: Project
    },

    {
      path: "/:type(marketing|interactive|website)/:project/:image",
      component: Image
    },

    {
      path: "/*",
      name: "home",
      component: Home
    }

  ]
});
