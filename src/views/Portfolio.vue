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
						<router-link 
							:to="`${$route.name}/${project.link}`"
							:class="[ 'link' ]" 
						>
							<div :class="[ 'main-description' ]" >
								<h3>{{ project.title }}</h3>
								<small>{{ project.projectDescription }}</small>
							</div>

							<div :class="'image'" >
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
										<h3>{{ project.title }} Title </h3>
										<p>{{ project.mainImage.caption }} This is a caption; </p>
									</figcaption>

								</figure>
							</div>
						</router-link>
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
		transition: grid-template-columns 5s ease;
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
/*	
router-link
	figure
		picture
			source
			img
		figcaption
			h3
			p
*/
	a {
		text-decoration: none;
		color:black;
		text-align:left;
		border:1px solid rgba(black, 0.1);
		transition: border-color 200ms ease;
		transition-property: border-color, border-size;
		&:hover {
			border-color:black;
			border-size:2;
		}
	}
	.link {
		display: flex;
		flex-flow: wrap;
		align-content: space-between;
	}

	.image {
		position:relative;
		width:100%;
		padding-bottom:200%;
	}

	.main-description {
		margin: 8px auto;
		padding-left:16px;
		padding-right: 16px;
		padding-bottom: 16px;
		font-size:16px;
	}

	figure, picture {
		position:absolute;
		left:0;
		top:0;
		width:100%;
		height:100%;
		margin:0;
	}

	figcaption {
		position:absolute;
		bottom:0;
		left:0;
		width:calc( 100% - 32px );
		z-index:1;
		height:auto;
		font-size:12px;
		padding: 16px;
		color: darken( white, 20%);
		background:rgba(black,0.9);
		border-top-right-radius:16px;
		border-top-left-radius:8px;
	}

	source, img {
		object-fit: cover;
		width: 100%;
		height: 100%;
	}

</style>