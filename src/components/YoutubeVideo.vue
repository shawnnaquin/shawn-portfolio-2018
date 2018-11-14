<template>

		<div :class="['player', { ['stuck']: stuck } ]" 
			@mouseenter="mouseenter"
			@mouseleave="mouseleave"
		>

			<div id="player"> </div>

		</div>

</template>

<script>

export default {

	props: {
		videoImg: {
			required: false,
			type: String
		},
		videoId: {
			required: true,
			type: String
		}
	},

	data() {
		return {
			done: false,
			stuck: false,
			mousein: false
		}
	},

	mounted() {
		this.createScript();
	},

	watch: {
		'$route'(r) {
			if ( r.params.image && window.YTPlayer.getPlayerState() != 2 ) {
				window.YTPlayer.pauseVideo();
				this.stuck = false;
			}
		}
	},

	methods: {

		mouseenter() {
			this.stuck = true;
			this.mousein = true;
		},

		mouseleave() {
			this.mousein = false;

			if ( !window.YTPlayer )  return;

			if ( window.YTPlayer.getPlayerState() != 1 && window.YTPlayer.getPlayerState() != 3 ) {
				this.stuck = false;
			}

		},

		onPlayerReady(event) {
		},

		onPlayerStateChange(event) {

			// -1 (unstarted)
			// 0 (ended)
			// 1 (playing)
			// 2 (paused)
			// 3 (buffering)
			// 5 (video cued)

			if ( event.data == 0 ) {
				window.YTPlayer.seekTo( 0, true);
				window.YTPlayer.pauseVideo();
				if ( !this.mousein ) {
					this.stuck = false;
				}
			}

		},

		createScript() {

			const tag = document.createElement('script');
			const firstScriptTag = document.getElementsByTagName('script')[0];
			tag.src = "https://www.youtube.com/iframe_api";
			tag.id = "youtube";

			firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

			window.onYouTubeIframeAPIReady = () => { 
				this.createPlayer();
			}

			if( window.YT ) {				
				this.createPlayer();
			}

		},

		createPlayer() {
			window.YTPlayer = new YT.Player( 'player', {
							videoId: this.videoId,
							host: 'https://www.youtube.com',
							origin: 'localhost',
							playerVars: { 
								'rel': 0, 
								'width': '100%',
								'height': '100%',
								'showinfo': 0, 
								'ecver': 2,
								'autoplay': 0, 
								'controls': 1, 
								'color': 'white', 
								'modestbranding': 1 
							},
							events: {
								'onReady': this.onPlayerReady,
								'onStateChange': this.onPlayerStateChange
							}
						});

		}

	}

};
</script>
<style lang="scss">
	iframe {
	  display:block;
		position:absolute;
		left:0;
		top:0;
	  width:100%;
	  height:100%;
	  box-shadow: 8px 8px 40px darken(white,20%);
	  transform: scale(.8) rotateY(-10deg) translate3d(-12%,0,0);
	  transition: transform 200ms ease;
	}

	iframe:hover, iframe:active, iframe:focus,
	.stuck iframe {
		left:0;
		transform: scale(1) rotateY(0deg) translate3d(0%,0,2px);
	}
</style>

<style lang="scss" scoped >
@keyframes blurIn {
	100% {
		filter: blur(0px);
		opacity:1;
	}
}
	.player {
		opacity:0;
		filter: blur(10px);
		animation-name: blurIn;
		animation-duration: 800ms;
		animation-fill-mode: forwards;
		animation-timing-function: ease-in;
		animation-delay: 300ms;
	}
	.player {
		position:relative;
		perspective: 200px;
		perspective-origin: 50% 50%;
		padding-bottom: 56.25%;
		margin-top:32px;
	}

</style>

