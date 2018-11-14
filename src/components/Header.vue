<template>

<transition name="fade" appear mode="out-in">
	<header v-if="isHome" >

		<transition name="fade" appear >

			<div :class="[ 'heading', 'push' ]" v-if="loaded" >

				<h1>Shawn Naquin <span>Front-End-Portfolio</span></h1>

				<h3>October 2018</h3>

			</div>

		</transition>

		<div :class="['video']">

			<youtube-video :videoId="'EYyELvmsw4c'" ></youtube-video>

		</div>

	</header>
</transition>

</template>

<script>

	import YoutubeVideo from '@/components/YoutubeVideo';

	export default {

		props: ['loaded'],

		components: {
			'youtube-video': YoutubeVideo
		},

		computed: {
			isHome() {
				return this.$route.name == 'home';
			}
		}

	};

</script>

<style lang="scss" scoped>

	.video {
		width:55%;
		float:none;
		margin: 0 auto;
	}

	header {
		perspective: 1000px;
		perspective-origin: center;
	}

	.heading {
		margin-bottom: 32px;
		margin-top: 64px;
	}

	h1 span::before {
		content:'// ';
		color: lighten( black, 75% );
	}

	@media only screen and (max-width:630px) {

		.video {
			width:100%;
		}

		h1 span {
			display:block;
			font-size:1rem;
			color: lighten( black, 25% );

			&::before {
				content:none;
			}

		}

	}

</style>