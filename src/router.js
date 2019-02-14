import Vue from "vue";
import Router from "vue-router";
import LoaderPage from "@/components/LoaderPage.vue";

const Home = () => ({
  component: import(/* webpackChunkName: "Home" */ "@/views/Home.vue"),
  loading: LoaderPage
});

const Portfolio = () => ({
  component: import(/* webpackChunkName: "portfolio" */ "@/views/Portfolio.vue"),
  loading: LoaderPage
});

const Project = () => ({
  component: import(/* webpackChunkName: "project" */ "@/views/Project.vue"),
  loading: LoaderPage
});

const Image = () => ({
  component: import(/* webpackChunkName: "image" */ "@/views/Image.vue"),
  loading: LoaderPage
});

const Tech = () => ({
  component: import(/* webpackChunkName: "tech" */ "@/views/Tech.vue"),
  loading: LoaderPage
});

const Contact = () => ({
  component: import(/* webpackChunkName: "Contact" */ "@/components/Contact.vue"),
  loading: LoaderPage
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
      component: Contact
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
      path: "/:type/:project/:image",
      name: 'Image',
      component: Image
    },

    {
      path: "/*",
      name: "404",
      component: Home
    }
  ]
});
