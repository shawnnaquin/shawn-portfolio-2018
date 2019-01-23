import Vue from "vue";
import Router from "vue-router";
import Home from "@/views/Home.vue";
import Loader from "@/components/Loader";

const Portfolio = () => ({
  component: import(/* webpackChunkName: "portfolio" */ "@/views/Portfolio.vue"),
  loading: Loader
});

const Project = () => ({
  component: import(/* webpackChunkName: "project" */ "@/views/Project.vue"),
  loading: Loader
});

const Image = () => ({
  component: import(/* webpackChunkName: "image" */ "@/views/Image.vue"),
  loading: Loader
});

const Tech = () => ({
  component: import(/* webpackChunkName: "tech" */ "@/views/Tech.vue"),
  loading: Loader
});


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
      path: "/tech/:type",
      name: "techtype",
      component: Portfolio
    },

    {
      path: "/contact",
      name: "contact",
      component: Home
    },

    {
      path: "/:type",
      name: 'portfolio',
      component: Portfolio
    },

    {
      path: "/:type/:project",
      component: Project
    },
    {
      path: "/:type/:project/image",
      component: Image
    },

    {
      path: "/*",
      name: "404",
      component: Home
    }
  ]
});
