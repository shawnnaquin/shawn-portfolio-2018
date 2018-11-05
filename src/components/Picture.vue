<template>
	<figure>

		<transition name="fade" appear >
			<p :class=" 'loader' " >Loading <span><Loader :go=" showLoader " /></span></p>
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

		<figcaption>
			<slot />
		</figcaption>

	</figure>

</template>

<script>
	import VLazyImage from "v-lazy-image";
	import Loader from "@/components/Loader";

	export default {

		components: {
			Loader,
			VLazyImage
		},
		data() {
			return {
				showLoader: true
			}
		},
		methods:{
			setShowLoader() {
				this.showLoader = !this.showLoader;
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
	.loader {
		color:white;
		text-transform:capitalize;
		display:inline-block;
		width:auto;
		position:relative;
		margin-top:50%;
		span {
			position: absolute;
			right: -8px;
			bottom: 0px;
		}
	}
	.v-lazy-image {
	  filter: blur(10px);
	  transition-property: filter;
	  transition-duration: 0.3s;
	  transition-delay: 0.3s;
	  transition-timing-function: ease-out;
	}

	.v-lazy-image-loaded {
	  filter: blur(0);
	  transition-timing-function: ease-in;
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
