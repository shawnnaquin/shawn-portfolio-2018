<template>

	<article class="project"  >

		<transition name="fade" appear mode="out-in"
			v-on:enter="articleEnter"
		>

			<p
				v-if="!project"
				:class="[ 'loading' ]"
			>
				LOADING
				<Loader :go=" !project " />
			</p>

		  	<div v-else :class="[ 'article-header' ]" >
			  	<h1>{{project.title}}</h1>
			  	<h3>{{project.projectDescription}}</h3>
			  	<button>Visit (external site)</button>
			  	<p :class="['description']">
			  		{{ project.content.article }} Minim aute adipisicing officia excepteur veniam dolor exercitation consequat occaecat aute dolor nostrud laborum in veniam in veniam sunt id sit proident sit cillum laboris dolor excepteur officia esse nostrud dolore ad labore deserunt incididunt non aliqua proident est incididunt do commodo incididunt laborum qui ad minim labore ut dolor reprehenderit fugiat qui reprehenderit ut enim et nisi minim dolore dolore sed dolore quis ad aliqua eu reprehenderit ea culpa ea sunt ea nisi laboris qui duis sunt anim enim ad dolore officia eiusmod do ea ullamco sit consequat adipisicing do fugiat officia irure sit consequat velit incididunt enim dolor sint eu eiusmod reprehenderit deserunt cupidatat sed enim ut dolore in ut cupidatat dolore qui duis nulla ut ex do fugiat minim in sit et nulla veniam dolore.
			  	</p>
			</div>

		</transition>

  		<div v-if="showImages && images.mobile && images.mobile.length" >

  			<transition-group
  			  name="staggered-fade"
  			  tag="div"
  			  v-bind:css="false"
  			  v-on:before-enter="beforeEnter"
  			  v-on:enter="enter"
  			  v-on:leave="leave"
  			  :class="[ 'mobile', 'grid' ]"
  			>

	  			<div
	  				v-for=" (image,i) in images.mobile"
	  				style="position:relative;"
	  				:data-index="i"
	  				v-bind:key="image.path"
	  				v-if="phoneVertLoaded"
	  			>
					<picture-query
						:type=" $route.params.type "
						:path=" image.path "
						:alt=" '' "
					>
					</picture-query>
				</div>

	  		</transition-group>

  		</div>

<!-- 		<div v-if="images.horiz.length" :class="[ 'horiz', 'grid' ]" >
			<template v-for="image in images.horiz" transition="fade" stagger="1250">
				<div style="position:relative;" v-if="phoneHorizLoaded" >
					<picture-query
						:type=" $route.params.type "
						:path=" image.path "
						:alt=" '' "
					>
					</picture-query>
				</div>
			</template>
		</div>

  		<div :class="[ 'grid' ]" >
  			<template v-for="image in images.regular" >
  				<div style="position:relative;">

  				<picture-query
  					:type=" $route.params.type "
  					:path=" image.path "
  					:alt=" '' "
  				>
  				</picture-query>
	  			</div>
  			</template>
  		</div> -->

  </article>

</template>

<script>
	import { mapGetters } from 'vuex';
	import Picture from '@/components/Picture.vue';
	import Loader from "@/components/Loader.vue";
	import PhoneVert from '@/assets/ui/mobile.vert.png';
	import PhoneHoriz from '@/assets/ui/mobile.horiz.png';
	import mixins from '@/mixins';

	export default {

		components: {
			Loader,
			'picture-query': Picture
		},

		mixins: [mixins],

		data() {
			return {
				phoneHorizLoaded: false,
				phoneVertLoaded: false,
				showImages: false
			}
		},
		computed: {
			...mapGetters([
				'getProject'
			]),

			type() {
				return this.$route.params.type;
			},

			project() {
				return this.getProject( { name: this.type, project: this.$route.params.project } );
			},

			images() {

				if ( !this.project ) return false;

				return this.project.content.images.reduce( (result, item ) => {

						if ( item.path.includes( 'mobile' ) ) {
							result.mobile.push( item );
						} else if ( item.path.includes( 'horiz' ) ) {
							result.horiz.push( item );
						} else {
							result.regular.push( item );
						}

						return result;
					}, { mobile: [], regular: [], horiz: [] } );

			}

		},

		mounted() {

			if ( !this.project ) {
				this.$store.dispatch('setProjects', this.type );
			}
			this.checkPhone();

		},

		methods: {
			articleEnter(el,done){
				if  ( el.classList.contains('article-header') ) {
					this.showImages = true;
				}
				done;
			},
			checkPhone() {
				let imgVert = new Image();
				imgVert.src = PhoneVert;
				imgVert.onload = () => {
					this.phoneVertLoaded = true;
					return;
				};

				let imgHoriz = new Image();
				imgHoriz.src = PhoneHoriz;
				imgHoriz.onload = () => {
					this.phoneHorizLoaded = true;
					return;
				}

			}
		}

	};

</script>

<style lang="scss" >
	.grid {
		source, img {
			object-fit: contain;
			width: 100%;
			height: 100%;
		}
		figcaption {
			// background:white;
			// color:black;
			background:black;
			padding:0;
			color:white;
			font-size:16px;
			text-align:left;
		}
	}
	@media only screen and (min-width: 630px) {
		.grid.horiz figure {
			width: 77.5%;
		    height: 88%;
		    left: 11%;
		    top: 6%;
		}

		.grid.mobile figure {
			width: 88%;
			height: 77%;
			left: 5.5%;
			top: 11.25%;
		}
	}

</style>

<style lang="scss" scoped >
	.images {
		line-height: 0;
		column-count: 5;
		column-gap: 0;
		column-count: 3;
	}
	img {
		width: 100% !important;
		height: auto !important;
	}
	article {
		padding:0 10%;
	}
	.article-header {

		padding-bottom: 10%;

		> *:not( button ) {
			display:inline-block;
			width:100%;
			margin: 0 auto 16px auto;
		}

		button {
			float:none;
			margin: 0 auto 32px auto;
			display: block;
			@media only screen and (max-width: 1000px) {
				float:left;
			}
		}
	}
	.description {
		display:inline-block;
		column-count:1;
		line-height:24px;
		text-align:left;
		max-width:1000px;

		@media only screen and (min-width:630px) {
			column-count:2;
		}

		@media only screen and (min-width:1000px) {
			column-count:3;
		}

	}

	.grid {

		width:100%;
		display: grid;
		grid-template-columns: repeat( auto-fill, minmax(400px, 1fr ) );
		grid-gap: 2rem;
		margin-bottom:10%;

		> div {
			padding-bottom:62.5% ;
		}

		@media only screen and (max-width:630px) {
			grid-template-columns: repeat( auto-fill, minmax(300px, 1fr) )
		}

	}

	.grid.horiz {
		> div {
			padding-bottom: 56.1%;
			@media only screen and (min-width: 630px) {
				padding-bottom: 49.21%;
				background-image: url( '~@/assets/ui/mobile.horiz.png' );
				background-size: cover;
				background-position: center;
			}

		}
	}

	.grid.mobile {
		width:100%;
		grid-template-columns: repeat( auto-fill, minmax(200px, 1fr ) );
		> div {
			padding-bottom: 177%;
			@media only screen and (min-width: 630px) {
				padding-bottom: 202.9%;
				background-image: url( '~@/assets/ui/mobile.vert.png' );
				background-size: cover;
				background-position: center;
			}
		}
	}

</style>