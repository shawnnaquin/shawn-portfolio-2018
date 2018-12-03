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
			path: "/:type",
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
