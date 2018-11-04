<template>

  <article class="project" v-if="project" >

  	<div :class="[ 'article-header' ]" >
	  	<h1>{{project.title}}</h1>
	  	<h3>{{project.projectDescription}}</h3>
	  	<button>Visit (external site)</button>

	  	<p :class="['description']"> {{ project.content.article }} Minim aute adipisicing officia excepteur veniam dolor exercitation consequat occaecat aute dolor nostrud laborum in veniam in veniam sunt id sit proident sit cillum laboris dolor excepteur officia esse nostrud dolore ad labore deserunt incididunt non aliqua proident est incididunt do commodo incididunt laborum qui ad minim labore ut dolor reprehenderit fugiat qui reprehenderit ut enim et nisi minim dolore dolore sed dolore quis ad aliqua eu reprehenderit ea culpa ea sunt ea nisi laboris qui duis sunt anim enim ad dolore officia eiusmod do ea ullamco sit consequat adipisicing do fugiat officia irure sit consequat velit incididunt enim dolor sint eu eiusmod reprehenderit deserunt cupidatat sed enim ut dolore in ut cupidatat dolore qui duis nulla ut ex do fugiat minim in sit et nulla veniam dolore.</p>

	</div> 
  		<div v-if="images.mobile.length" :class="[ 'mobile', 'grid' ]" >
  			<template v-for="image in images.mobile" >
  				<div style="position:relative;">
				<picture-query 
					:type=" $route.params.type " 
					:path=" image.path " 
					:alt=" '' " 
				>
					<p>some text.</p>

				</picture-query>

				</div>
  			</template>
  		</div>

		<div v-if="images.horiz.length" :class="[ 'horiz', 'grid' ]" >
			<template v-for="image in images.horiz" >
				<div style="position:relative;">
			<picture-query 
				:type=" $route.params.type " 
				:path=" image.path " 
				:alt=" '' " 
			>
				<p>some text.</p>

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
  					<p>some text.</p>

  				</picture-query>
  				<!-- <div></div> -->
	  			</div>
  			</template>
  		</div>

  </article>

</template>

<script>
	import { mapGetters } from 'vuex';
	import Picture from '@/components/Picture.vue';

	export default {
		components: {
			'picture-query': Picture
		},
		data() {
			return {
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
			background:white;
			color:black;
			text-align:left;
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
			padding-bottom:64%;
		}

		@media only screen and (max-width:630px) {
			grid-template-columns: repeat( auto-fill, minmax(300px, 1fr) )
		}

	}

	.grid.horiz {
		> div {
			padding-bottom: 25%;
		}
	}

	.grid.mobile {
		width:100%;
		grid-template-columns: repeat( auto-fill, minmax(200px, 1fr ) );
		> div {
			padding-bottom:200%;
		}
	}

</style>