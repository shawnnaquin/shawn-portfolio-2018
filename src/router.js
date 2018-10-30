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
      name: "Website",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // man I love this feature of vue!
      props: {
        projects: 
            [
                {
                  link: 'one-website',
                  title: 'One Website',
                  image: 'https://via.placeholder.com/400x600.png?text=Portfolio%20Image',
                  content: [

                  ]
                },
                {
                  link: 'two-website',
                  title: 'Two Website',
                  image: 'https://via.placeholder.com/400x600.png?text=Portfolio%20Image',
                  content: [

                  ]
                },
                {
                  link: 'three-website',
                  title: 'Three Website',
                  image: 'https://via.placeholder.com/400x600.png?text=Portfolio%20Image',
                  content: [

                  ]
                }
            ]
      },
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Portfolio.vue")
    },
    {
      path: "/marketing",
      name: "marketing",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // man I love this feature of vue!
      props: {
        projects: 
            [
                {
                  link: 'buntin-marketing',
                  title: 'Buntin Marketing',
                  image: 'https://via.placeholder.com/400x600.png?text=Portfolio%20Image',
                  content: [

                  ]
                },
                {
                  link: 'buntin-marketing',
                  title: 'Buntin Marketing',
                  image: 'https://via.placeholder.com/400x600.png?text=Portfolio%20Image',
                  content: [

                  ]
                },
                {
                  link: 'buntin-marketing',
                  title: 'Buntin Marketing',
                  image: 'https://via.placeholder.com/400x600.png?text=Portfolio%20Image',
                  content: [

                  ]
                }
            ]
      },
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Portfolio.vue")
    }
  ]
});
