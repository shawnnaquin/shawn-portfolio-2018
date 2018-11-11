<template>

	<article class="project"  >

		<transition name="fade" appear >
			<router-view :images="images" />
		</transition>

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

			  	<div v-if="project.content.code || project.content.externalSite" class="buttons" >
			  		<a :href="project.content.externalSite" v-if="project.content.externalSite" target="_blank" :class="[ 'external' ]" > Visit (external site) </a>
			  		&nbsp;
			  		<a :href="project.content.code" v-if="project.content.code" target="_blank" :class="[ 'external' ]" >
			  			//code
			  		</a>
			  	</div>

			  	<div v-if="project.content.techList" class="buttons" >
			  		<h4>Tech List: </h4>
			  		<p>{{ project.content.techList }}</p>
			  	</div>

			  	<p v-if="project.content.article" :class="['description']">
			  		{{ project.content.article }}
			  	</p>
			</div>

		</transition>

  		<div :class="[ 'image-container' ]" v-if="showImages && images.mobile && images.mobile.length" >

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

	  				<router-link
	  					:to=" `/${type}/${project.link}/${image.path}`"
						:class="['link']"
	  				>
						<picture-query
							:type="type"
							:path="image.path"
							:alt="image.alt"
						>
							{{ image.caption }}
						</picture-query>
					</router-link>

				</div>

	  		</transition-group>

  		</div>

		<div :class="[ 'image-container' ]" v-if="showImages && images.horiz && images.horiz.length" >

			<transition-group
				name="staggered-fade"
				tag="div"
				v-bind:css="false"
				v-on:before-enter="beforeEnter"
				v-on:enter="enter"
				v-on:leave="leave"
				:class="[ 'horiz', 'grid' ]"
			>

				<div
					v-for=" (image,i) in images.horiz"
					style="position:relative;"
					:data-index="i"
					v-bind:key="image.path"
					v-if="phoneVertLoaded"
				>
					<router-link
						:to=" `/${type}/${project.link}/${image.path}`"
						:class="['link']"
					>
						<picture-query
							:type=" type "
							:path=" image.path "
							:alt="image.alt"
						>
							{{ image.caption }}
						</picture-query>
					</router-link>
				</div>

			</transition-group>

		</div>

		<div :class="[ 'image-container' ]" v-if="showImages && images.regular && images.regular.length" >

			<transition-group
				name="staggered-fade"
				tag="div"
				v-bind:css="false"
				v-on:before-enter="beforeEnter"
				v-on:enter="enter"
				v-on:leave="leave"
				:class="[ 'grid' ]"
			>

				<div
					v-for=" (image,i) in images.regular"
					style="position:relative;"
					:data-index="i"
					v-bind:key="image.path"
					v-if="phoneVertLoaded"
					:style="{ paddingBottom: project.content.imageRatio }"
				>
					<router-link
						:to=" `/${type}/${project.link}/${image.path}`"
						:class="['link']"
					>
						<picture-query
							:type=" type "
							:path=" image.path "
							:alt="image.alt"
						>
							{{ image.caption }}
						</picture-query>
					</router-link>
				</div>

			</transition-group>

		</div>

  </article>

</template>

<script>

	import YoutubeVideo from '@/components/YoutubeVideo';
	import Picture from '@/components/Picture.vue';
	import Loader from "@/components/Loader.vue";
	import PhoneVert from '@/assets/ui/mobile.vert.png';
	import PhoneHoriz from '@/assets/ui/mobile.horiz.png';
	import animateIn from '@/mixins/animateIn';
	import projects from '@/mixins/projects';

	export default {

		components: {
			Loader,
			'picture-query': Picture
		},

		mixins: [ animateIn, projects ],

		data() {
			return {
				phoneHorizLoaded: false,
				phoneVertLoaded: false,
				showImages: false
			}
		},

		mounted() {
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

		width:100%;
		display: grid;
		grid-template-columns: repeat( auto-fill, minmax(400px, 1fr ) );
		grid-gap: 2rem;
		margin-bottom:10%;
		perspective: 1000px;
		perspective-origin:center;
		> div {
			padding-bottom: 56.25%;
			transform-origin:center;
			transform: translate3d(0,0,0);
			transition: transform 150ms ease;
			&:hover {
				transform: translate3d(0,0,10px);
			}
		}

		source, img {
			object-fit: contain;
			width: 100%;
			height: 100%;
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

	.image-container {
		align-self: normal;
	}

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
		display: flex;
		flex-direction: column;
		align-items: center;
		padding:0 10%;
	}
	.article-header {
		max-width:600px;
		padding-bottom: 10%;
		> *:not( .external ) {
			display:inline-block;
			width:100%;
			margin: 0 auto 16px auto;
		}

		.buttons {
			h1,h2,h3,h4 {
				margin-top:0;
			}
			margin-bottom:48px;
			&:nth-of-type(1) {
				margin-top:32px;
			}
		}
	}
	.description {
		display:inline-block;
		column-count:1;
		line-height:24px;
		text-align:left;

		@media only screen and (min-width:630px) {
			column-count:2;
		}

		// @media only screen and (min-width:1000px) {
		// 	column-count:3;
		// }

	}

</style>