<template>
	<figure>

		<transition name="fade" appear >
			<p :class=" 'loader' " :style="{ color: $route.params.image ? 'white' : '' }" v-if="showLoader" >Loading <span><Loader :go=" showLoader " /></span></p>
		</transition>

		<picture>
			<source
				media="(min-width: 900px)"
				:srcset=" `${ getBase }${ type }/${ path }-lg_1x.webp 1x, ${ getBase }${ type }/${ path }-lg_2x.webp 2x` "
				type="image/webp"
			>

			<source
				media="(min-width: 601px)"
				:srcset=" `${ getBase }${ type }/${ path }-md_1x.webp 1x, ${ getBase }${ type }/${ path }-md_2x.webp 2x` "
				type="image/webp"
			>

			<source
				:srcset=" `${ getBase }${ type }/${ path }-sm_1x.webp 1x, ${ getBase }${ type }/${ path }-sm_2x.webp 2x` "
				type="image/webp"
			>

			<v-lazy-image
				@load="setShowLoader"
				v-bind:src="imgSrc"
				:srcset=" `${ getBase }${ type }/${ path }-sm_1x.jpg 600w, ${ getBase }${ type }/${ path }-md_1x.jpg 900w, ${ getBase }${ type }/${ path }-lg_1x.jpg 1440w` "
				type="image/jpeg"
				:alt=" alt "
			/>

		</picture>

		<figcaption :class="[ 'figcaption', { ['blur']: showLoader } ] " >
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
		computed: {
			getBase() {
				return `${ process.env.BASE_URL }img/portfolio/`;
			},
 			imgSrc() {
				return `${ this.getBase }${ this.type }/${ this.path }-lg_1x.jpg`;
			}
		},
		methods: {
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

	.v-lazy-image {
	  filter: blur(10px);
	  transition-property: filter;
	  transition-duration: 0.1s;
	  transition-timing-function: ease-out;
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

	.figcaption {
		display:block;
		position:absolute;
		bottom:0;
		font-size: 10px;
		color: black;
		text-align:left;
		padding:10px;
		background:darken(white,2%);
		width:calc(100% - 20px);
		height:auto;
		filter:blur(0px);
		transition: opacity 200ms ease, filter 0.5s ease-in;
		opacity:1;
		pointer-events: auto;
		&.blur {
			filter:blur(10px);
		}
		@media only screen and (max-width: 1100px) {
			pointer-events:none;
			opacity:0;
		}

	}
	source, img {
		object-fit: cover;
		width: 100%;
		height: 100%;
	}
</style>
