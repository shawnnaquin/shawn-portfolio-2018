<template>

<transition name="fade" appear mode="out-in">

	<header v-if="isHome" >

		<transition name="fade" appear mode="out-in">

			<div :class="[ 'heading' ]" v-if="loaded" >

				<h1>Shawn Naquin</h1>
				<p>Front-End Portfolio</p>
				<!-- {{getDate}} -->
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

		data() {
			return {
				monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ],
			}
		},

		components: {
			'youtube-video': YoutubeVideo
		},

		computed: {
			getDate() {
				let d = new Date();
				return `${ this.monthNames[ d.getMonth() ] } ${ d.getFullYear() }`;
			},
			isHome() {
				return this.$route.name == 'home' || this.$route.name == 'contact';
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
		perspective: 1100px;
		perspective-origin: center;
	}

	.heading {
		margin-bottom: 32px;
		margin-top: 72.5px;
		text-align:center;
		h1 {
			text-align:center;
			margin-bottom:0;
		}
	}

	h1 span::before {
		content:'// ';
		color: lighten( black, 75% );
	}

	@media only screen and (max-width:630px) {

		.video {
			width:90%;
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