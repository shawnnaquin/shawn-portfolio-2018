<template>

	<div>

		<transition name="fade" mode="out-in">
			<h1 :key="$route.name" style="color:Purple" class="push">
				{{$route.name}} Projects
				<transition name="fade" >
					<span v-if="!projects($route.name)" >
						&hellip;
					</span>
				</transition>
			</h1>
		</transition>

		<div style="position:relative;">
			<transition name="fade" appear >
				<p v-if="!projects($route.name)" :class="[ 'loading' ]">LOADING <Loader :go=" ( !projects($route.name) ) " /> </p>
			</transition>

			<transition name="fade" appear >
				<div v-if="projects($route.name)" :class="[ 'portfolio' ]">

					<template v-for="project in projects($route.name)">
						<a 
							:to="project.link"
						>
							<figure>

								<picture>

									<source
										media="(min-width: 900px)"
										:srcset=" `./img/portfolio/${ $route.name }/${project.mainImage.path}-lg_1x.webp 1x, ./img/portfolio/${ $route.name }/${project.mainImage.path}-lg_2x.webp 2x` "
										type="image/webp" 
									>

									<source
										media="(min-width: 601px)"
										:srcset=" `./img/portfolio/${ $route.name }/${project.mainImage.path}-md_1x.webp 1x, ./img/portfolio/${ $route.name }/${project.mainImage.path}-md_2x.webp 2x` "
										type="image/webp" 
									>

									<source
										:srcset=" `./img/portfolio/${ $route.name }/${project.mainImage.path}-sm_1x.webp 1x, ./img/portfolio/${ $route.name }/${project.mainImage.path}-sm_2x.webp 2x` "
										type="image/webp" 
									>

									<img 
										:srcset=" `./img/portfolio/${ $route.name }/${project.mainImage.path}-sm_1x.jpg 600w, ./img/portfolio/${ $route.name }/${project.mainImage.path}-md_1x.jpg 900w, ./img/portfolio/${ $route.name }/${project.mainImage.path}-lg_1x.jpg 1440w` "
										:src=" `./img/portfolio/${ $route.name }/${project.mainImage.path}-lg_1x.jpg` "
										type="image/jpeg"
										:alt=" project.mainImage.alt "
									/>

								</picture>

								<figcaption> 
									<h3>{{ project.mainImage.title }}</h3>
									<p>{{ project.mainImage.caption }} </p>
								</figcaption>

							</figure>
						</a>
					</template>

				</div>
			</transition>
		</div>


	</div>

</template>

<script>

	import { mapGetters } from 'vuex';
	import Loader from "@/components/Loader.vue";

	export default {
		components: {
			Loader
		},
		props: ['images'],
		computed: {
			...mapGetters([
				`projects`
			])
		},
		watch: {
			'$route'(routeName) {
				this.startApp(routeName.name);
			},
		},
		mounted() {
			this.startApp();
		},
		methods: {
			startApp( routeName = this.$route.name ) {
				this.dispatchProjects(routeName);
			},
			dispatchProjects(routeName) {
				this.$store.dispatch('setProjects', routeName);
			}
		}
	};

</script>

<style lang="scss" scoped>

	.portfolio {
		padding: 0 10%;
  		display: grid;
		grid-template-columns: repeat( auto-fill, minmax(300px, 1fr) );
		grid-gap: 2rem;
	}

	h1, .loading {
		text-transform:capitalize;
		display:inline-block;
		width:auto;
		position:relative;
		span {
			position: absolute;
			right: -16px;
			bottom: 0px;
		}
	}

	.loading {
		display:block;
		position:absolute;
		left:50%;
		transform:translateX(-50%);
		@media only screen and (max-width:1000px) {
			left:10%;
			transform:translateX(0);
		}
	}

	h1 span {
		right: -36px;
	}

	figure {
		overflow:hidden;
		margin:0;
	}
	img {
		width:100%;
		// max-height:300px;
	}
</style>