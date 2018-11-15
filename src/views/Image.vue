<template>

	<div  :class="[ 'background' ]"  >

		<div class="" style="z-index:1; height:100%; width:100%; top:0; left:0; position:absolute;" ref="background" ></div>

		<router-link :class="['close']" :to="routeBack" ><close></close></router-link>

		<button :class="['external']" @click="goToImage()" > > </button>
		<button :class="['external']" @click="goToPrevImage()" > < </button>


		<div
			  :class="[ orientation, 'grid' ]"
		>

  			<div
  			>
	  			<picture-query
	  				v-if="image"
	  				:type="type"
	  				:path="`${ image.path }`"
	  				:alt="image.alt ? image.alt : '' "
	  			>
	  				<p>{{image.caption}}</p>
	  			</picture-query>
			</div>
		</div>
	</div>

</template>

<script>

import Picture from '@/components/Picture';
import close from '@/components/icons/close';

export default {

	props: [ 'images' ],

	components: {
		'picture-query': Picture,
		close
	},

	data() {
		return {
			index: 0,
			imageTypes: [ 'mobile', 'horiz', 'regular' ]
		}
	},

	computed: {
		type() {
			return this.$route.params.type;
		},

		project() {
			return this.$route.params.project;
		},

		orientation() {

			let h = ['mobile','horiz'];
			let p = null;

			for( let v of h ) {
				if ( this.$route.params.image.includes( v ) ) {
					p = v;
					break;
				}
			}

			if ( p === null ) {
				p = 'regular';
			}

			return p;
		},

		getImageIndex() {

			if (!this.images) return false;

			let p = null;

			this.images[ this.orientation ].forEach( (obj,i ) => {
				if ( obj.path == this.$route.params.image ) {
					p = i;
				}
			});

			return p;

		},

		nextImage() {
			return ( this.getImageIndex + 1 ) % ( this.images[this.orientation].length + 1 );
		},

		prevImage() {
			return this.getImageIndex - 1;
		},

		image() {
			if ( !this.images ) return false;
			return this.images[this.orientation][this.getImageIndex];
		},

		routeBack() {
			return `/${this.type}/${this.project}`;
		},

	},

	mixins: [],

	methods: {
		keyPress() {

			window.onkeydown = ( event ) => {
			    if ( event.keyCode == 27 ) {
					this.$router.push( this.routeBack );
			    }
			};

		},

		changeImageType(subtract) {

			let addIt = (i) => {
				let n = i + 1;

				if ( subtract ) {
					if ( i-1 < 0 ) {
						n = this.imageTypes.length - 1;
					} else {
						n = i-1;
					}
				}

				return n % this.imageTypes.length;

			};

			let p = false;	

			let num = addIt( this.imageTypes.indexOf( this.orientation ) );

			let t = () => {
				if ( this.images[ this.imageTypes[num] ].length ) {
					p = this.imageTypes[num];
				} else {
					num = addIt( num );
					t();
				}
			};

			t();

			return p;

		},

		goToImage() {		
			if ( this.nextImage > this.images[this.orientation].length - 1  ) {
				this.$router.push( `/${this.type}/${this.project}/${ this.images[ this.changeImageType() ][0].path }` )
			} else {
				this.$router.push( `/${this.type}/${this.project}/${ this.images[this.orientation][ this.nextImage ].path }` );
			}
		},

		goToPrevImage() {

			if ( this.prevImage < 0 ) {
				this.$router.push( `/${this.type }/${this.project}/${ this.images[ this.changeImageType(true) ][ this.images[ this.changeImageType(true) ].length - 1 ].path }` )
			} else {
				this.$router.push( `/${this.type }/${this.project}/${ this.images[this.orientation][ this.prevImage ].path }` )
			}

		},
		swipe() {

			var touchStartCoords =  {'x':-1, 'y':-1}, // X and Y coordinates on mousedown or touchstart events.
			    touchEndCoords = {'x':-1, 'y':-1},// X and Y coordinates on mouseup or touchend events.
			    direction = 'undefined',// Swipe direction
			    minDistanceXAxis = 30,// Min distance on mousemove or touchmove on the X axis
			    maxDistanceYAxis = 30,// Max distance on mousemove or touchmove on the Y axis
			    maxAllowedTime = 1000,// Max allowed time between swipeStart and swipeEnd
			    startTime = 0,// Time on swipeStart
			    elapsedTime = 0,// Elapsed time between swipeStart and swipeEnd
			    targetElement = this.$refs.background;// Element to delegate

			function swipeStart(e) {
			  e = e ? e : window.event;
			  e = ('changedTouches' in e)?e.changedTouches[0] : e;
			  touchStartCoords = {'x':e.pageX, 'y':e.pageY};
			  startTime = new Date().getTime();
			  // targetElement.textContent = " ";
			}

			function swipeMove(e){
			  e = e ? e : window.event;
			  e.preventDefault();
			}

			function swipeEnd(e) {
			  e = e ? e : window.event;
			  e = ('changedTouches' in e)?e.changedTouches[0] : e;
			  touchEndCoords = {'x':e.pageX - touchStartCoords.x, 'y':e.pageY - touchStartCoords.y};
			  elapsedTime = new Date().getTime() - startTime;
			  if (elapsedTime <= maxAllowedTime){
			    if (Math.abs(touchEndCoords.x) >= minDistanceXAxis && Math.abs(touchEndCoords.y) <= maxDistanceYAxis){
			      direction = (touchEndCoords.x < 0)? 'left' : 'right';
			      switch(direction){
			        case 'left':
			        console.log('left');
			          // targetElement.textContent = "Left swipe detected";
			          break;
			        case 'right':
			        console.log('right')
			          // targetElement.textContent = "Right swipe detected";
			          break;
			      }
			    }
			  }
			}

			addMultipleListeners(targetElement, 'mousedown touchstart', swipeStart);
			addMultipleListeners(targetElement, 'mousemove touchmove', swipeMove);
			addMultipleListeners(targetElement, 'mouseup touchend', swipeEnd);

		},

	},

	beforeDestroy() {
		window.onkeydown = false;
		this.$store.dispatch('setToggleNoScroll');
	},

	mounted() {
		this.keyPress();
		this.$store.dispatch('setToggleNoScroll');
		this.swipe();
	}

};

</script>

<style lang="scss" >
</style>

<style lang="scss" scoped >

	.external {
		position:absolute;
		top:0;
		left:0;
		padding:48px;

		background:black;
		color:white;
		z-index:2;
		outline:0;
		cursor: pointer;
		transition: color 200ms ease;
		height:100%;
		border:0;
		font-size:48px;
		-webkit-tap-highlight-color: transparent;

		&:hover {
			color: darken(white, 20%);
		}

		&:nth-of-type(1) {
			left:auto;
			right:0;
		}
		@media only screen and (max-width:630px) {
			font-size:12px;
			padding-right:48px;
			padding-left:8px;
			background:transparent;
			&:nth-of-type(1) {
				padding-left:48px;
				padding-right: 8px;
			}
		}
	}

	@keyframes in {
		100% {opacity:1;}
	}

	.close {

		position:absolute;
		top: 16px;
		right: 16px;
		opacity:0;
		color: white;
		text-decoration: none;
		animation-name: in;
		animation-duration: 200ms;
		animation-fill-mode:forwards;
		animation-timing-function: ease;
		animation-delay: 700ms;
		background: black;
		padding: 10px;
		font-size:10px;
		z-index:3;

		&:after {
			display:block;
			position:relative;
			content: '(close/ESC)';
			right:0;
			bottom:-10px;
			padding-top:4px;
			padding-bottom:4px;
			background:black;
		}
		> svg {
			width: 32px;
			height: 32px;
			fill: white;
			transition: fill 200ms ease;
			transition-property: fill, filter;
			filter: blur(0px);
			margin-left:10px;
		}

		&:hover {
			> svg {
				fill: darken(white,20%);
				filter: blur(2px);
			}
		}

		@media only screen and (max-width: 630px) {
			top: 0;
			right: 0;
			// font-size:8px;
			// > svg {
			// 	width: 10px;
			// 	height:10px;
			// }
		}
	}

	.grid.mobile {
		width: 75%;
		max-width: 360px;
	}

	.grid, .grid.horiz {

		position: absolute;
		width: 60%;
		left: 50%;
		top: 50%;
		display: block;
		grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
		grid-gap: 2rem;
		margin-bottom: 10%;
		transform: translate3d(-50%,-50%,0);

		> div {
			position:relative;
		}
		@media only screen and (max-width: 630px) {
			width: 80%;
		}
	}

	.background {
		position:fixed;
		top:0;
		left:0;
		width:100%;
		height:100%;
		background: rgba(black,1);
		z-index:100;
	}

</style>
