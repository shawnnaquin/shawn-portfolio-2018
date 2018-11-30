import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

const Portfolio = () => import(/* webpackChunkName: "portfolio" */ "./views/Portfolio.vue");
const Project = () => import(/* webpackChunkName: "project" */ "./views/Project.vue");
const Image = () => import(/* webpackChunkName: "image" */ "./views/Image.vue" );
const Tech = () => import(/* webpackChunkName: "tech" */ "./views/Tech.vue" );

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
      path: "/tech",
      name: "tech",
      component: Tech
    },
    {
      path: "/contact",
      name: "contact",
      component: Home
    },
    {
      // (marketing|interactive|website)
      path: "/:type",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // man I love this feature of vue!
      component: Portfolio,
    },

    {
      path: "/:type/:project",
      component: Project
    },

    {
      path: "/:type/:project/:image",
      component: Image
    },

    {
      path: "/*",
      name: "404",
      component: Home
    }

  ]
});
