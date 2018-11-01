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
						<figure>
							<img :src="project.image" :alt="project.title" />
							<figcaption>{{project.title}}</figcaption>
						</figure>
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
		computed: {
			...mapGetters([
				`projects`
			]),
		},
		watch: {
			'$route'(newa) {
				this.dispatchProjects(newa.name);
			},
		},
		mounted() {
			this.dispatchProjects(this.$route.name);
		},
		methods: {
			killIt() {
				// simple test for the loader to check reactivity;
				setTimeout( ()=> {
					this.$set( this.$store.state, 'projects', {} ); // you shouldn't do this!
					console.log( 'killed projects: ', this.projects(this.$route.name) );
				}, 5000 );
			},
			dispatchProjects(name) {
				this.$store.dispatch('setProjects', name);
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