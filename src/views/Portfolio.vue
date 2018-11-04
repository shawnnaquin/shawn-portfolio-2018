<template>

	<div>

		<transition name="fade" mode="out-in">
			<h1 :key="$route.params.type" class="push">
				{{$route.params.type}} Projects
				<transition name="fade" >
					<span v-if="!projects($route.params.type)" >
						&hellip;
					</span>
				</transition>
			</h1>
		</transition>

		<div style="position:relative;">
			<transition name="fade" appear >
				<p v-if="!projects($route.params.type)" :class="[ 'loading' ]">LOADING <Loader :go=" ( !projects($route.params.type) ) " /> </p>
			</transition>

			<transition name="fade" appear >
				<div v-if="projects($route.params.type)" :class="[ 'portfolio' ]">

					<template v-for="project in projects($route.params.type)">
						<router-link 
							:to="`${$route.params.type}/${project.link}`"
							:class="[ 'link' ]" 
						>
							<div :class="[ 'main-description' ]" >
								<h3>{{ project.title }}</h3>
								<small>{{ project.projectDescription }}</small>
							</div>

							<div :class="'image'" >
								<picture-query 
									:type="$route.params.type" 
									:path="project.mainImage.path" 
									:alt="project.mainImage.alt" 
								>
									<h3>{{ project.title }} Title </h3>
									<p>{{ project.mainImage.caption }} This is a caption; </p>
								</picture-query>
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
	import Picture from '@/components/Picture.vue';

	export default {
		components: {
			Loader,
			'picture-query': Picture
		},
		props: ['images'],
		computed: {
			...mapGetters([
				`projects`
			])
		},
		watch: {
			'$route'(routeName) {
				this.startApp(routeName.params.type);
			},
		},
		mounted() {
			this.startApp();
		},
		methods: {
			startApp( routeName = this.$route.params.type ) {
				this.dispatchProjects(routeName);
			},
			dispatchProjects(routeName) {
				this.$store.dispatch('setProjects', routeName);
			}
		}
	};

</script>

<style lang="scss" >
	.portfolio {

	}
</style>

<style lang="scss" scoped>

	.portfolio {
		padding: 0 10%;
  		display: grid;
		grid-template-columns: repeat( auto-fill, minmax(300px, 1fr) );
		grid-gap: 2rem;
		transition: grid-template-columns 5s ease;
	}

	h1 {
		text-align:left;
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
		background: white;
		&:hover {
			border-color:rgba(black, 0.4);
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

</style>