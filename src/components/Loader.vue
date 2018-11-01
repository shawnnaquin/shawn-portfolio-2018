<template>
	<span>{{ bracket }}</span>
</template>

<script>
	export default {

		data() {
			return {
				bracket: '/',
				// bracketArray: [ '/', '--', "\\" ],
				aF: false,
				bracketArray: [ '/', '-', '\\', "&", "a", "#", "?", "9", "@", "$", "~", "<", "{", "+", "l", "%", "//" ],
				stop: false,
				fps: 20,
				startTime: 0,
				now: 0,
				then: 0,
				elapsed: 0
			}
		},
		props: {
			go: {
				type: Boolean,
				default: true,
				required: false
			}
		},
		computed: {
			fpsInterval() {
				return 1000 / this.fps;
			}
		},
		mounted() {
			this.start();
		},
		beforeDestroy() {
			this.stopAnimate();
		},
		watch: {
			'go'( go ) {
				if( go ) {
					this.start();
				} else {
					this.stopAnimate();
				}
			}
		},
		methods: {
			start() {
				this.startTime = this.then = Date.now();
				this.animate();
			},
			stopAnimate() {
				window.cancelAnimationFrame( this.aF );
			},
			animate() {
				// request another frame
				if ( !this.go ) {
					this.stopAnimate();
					return;
				}

				this.aF = window.requestAnimationFrame( this.animate );

				const fpsInterval = this.fpsInterval;
				// calc elapsed time since last loop
				this.now = Date.now();
				this.elapsed = this.now - this.then;
				// if enough time has elapsed, draw the next frame
				if ( this.elapsed > fpsInterval ) {
				    // Get ready for next frame by setting then=now, but also adjust for your
				    // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
				    this.then = this.now - (this.elapsed % fpsInterval );
				    // console.log( this.bracketArray[ new Date().getMilliseconds() % this.bracketArray.length] );
				    this.bracket = this.bracketArray[ new Date().getMilliseconds() % this.bracketArray.length ];
				}
			}
		},

	}
</script>


