<template>
	<figure>

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

			<img 
				:srcset=" `/img/portfolio/${ type }/${ path }-sm_1x.jpg 600w, /img/portfolio/${ type }/${ path }-md_1x.jpg 900w, /img/portfolio/${ type }/${ path }-lg_1x.jpg 1440w` "
				:src=" `/img/portfolio/${ type }/${ path }-lg_1x.jpg` "
				type="image/jpeg"
				:alt=" alt "
			/>

		</picture>

		<figcaption> 
			<slot />
		</figcaption>

	</figure>

</template>

<script>
	export default {
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
