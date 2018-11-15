<template>
	<figure>

		<transition name="fade" appear >
			<p :class=" 'loader' " v-if="showLoader"  >Loading <span><Loader :go=" showLoader " /></span></p>
		</transition>

		<picture>
			<source
				media="(min-width: 900px)"
				:srcset=" `/img/portfolio/${ type }/${ path }-lg_1x.webp 1x, /img/portfolio/${ type }/${ path }-lg_2x.webp 2x` "
				type="image/webp" 
			>

			<source
				media="(min-width: 601px)"
				:srcset=" `/img/portfolio/${ type }/${ path }-md_1x.webp 1x, /img/portfolio/${ type }/${ path }-md_2x.webp 2x` "
				type="image/webp" 
			>

			<source
				:srcset=" `/img/portfolio/${ type }/${ path }-sm_1x.webp 1x, /img/portfolio/${ type }/${ path }-sm_2x.webp 2x` "
				type="image/webp" 
			>

			<v-lazy-image
				:srcset=" `/img/portfolio/${ type }/${ path }-sm_1x.jpg 600w, /img/portfolio/${ type }/${ path }-md_1x.jpg 900w, /img/portfolio/${ type }/${ path }-lg_1x.jpg 1440w` "
				:src=" `/img/portfolio/${ type }/${ path }-lg_1x.jpg` "
				type="image/jpeg"
				:alt=" alt "
				@load="setShowLoader"
			/>

		</picture>

		<figcaption :class="[ { ['blur']: !setShowLoader } ] " >
			<slot />
		</figcaption>

	</figure>

</template>

<script>

	import Loader from "@/components/Loader";

	export default {

		components: {
			Loader
		},
		data() {
			return {
				showLoader: true
			}
		},
		methods:{
			setShowLoader() {
				this.showLoader = false;
			}
		},
		props: {
			path: {
				required: true,
				type: String
			},
			type: {
				required: true,
				type: String
			},
			alt: {
				required: true,
				type: String
			}
		}
	};
</script>
<style lang="scss" scoped>

	picture {

	}

	img {

	}

	.horiz .loader, 
	.mobile .loader {
		color: white;
	}

	.loader {
		color:black;
		text-transform:capitalize;
		display:inline-block;
		width:auto;
		position:relative;
		top:50%;
		transform:translateY(-50%);
		text-align:center;
		margin-top:0;
		margin-bottom:0;
		span {
			position: absolute;
			right: -8px;
			bottom: 0px;
		}
	}

	.v-lazy-image, .blur {
	  transition-property: filter;
	  transition-duration: 0.3s;
	  filter: blur(10px);
	  // transition-delay: 0.3s;
	  transition-timing-function: ease-out;

	  // @media only screen and (max-width: 630px) {
	  // }

	} 

	.v-lazy-image-loaded {
	  filter: blur(0);
	  transition-timing-function: ease-in;
	}

	figure {
		text-align:center;
	}

	figure, picture {
		position:absolute;
		left:0;
		top:0;
		width:100%;
		height:100%;
		margin:0;
	}

	figure {
	}

	figcaption {
		position:absolute;
		bottom:0;
		font-size: 10px;
		color: white;
		text-shadow: 2px 2px 5px rgba(black,0.4);
		z-index:1;
		text-align:left;
		padding:10px;
		background:black;
		width:calc(100% - 20px);
		height:auto;
	}

	source, img {
		object-fit: cover;
		width: 100%;
		height: 100%;
	}
</style>
