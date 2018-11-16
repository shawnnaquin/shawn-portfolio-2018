<template>

	<div :class="[ 'background' ]" :style="" ref="background" >

		<div
			:class="[ 'swipe' ]"
			ref="swipe"
			v-hammer:swipe="swipe"
		> </div>

		<router-link :class="['close']" :to="routeBack" ><close></close></router-link>

		<button :class="['external']" @click="goToImage()" > &gt; </button>
		<button :class="['external']" @click="goToPrevImage()" > &lt; </button>

		<div
			  :class="[ orientation, 'grid' ]"
		>

  			<div
  			>

  			<transition name="fade" appear >
	  			<picture-query
	  				:key="image.path"
	  				v-if="image"
	  				:type="type"
	  				:path="`${ image.path }`"
	  				:alt="image.alt ? image.alt : '' "
	  			>
	  				<p>{{image.caption}}</p>
	  			</picture-query>
	  		</transition>

			</div>
		</div>
	</div>

</template>

<script>

import Picture from '@/components/Picture';
import close from '@/components/icons/close';
import projects from '@/mixins/projects';
import height from '@/mixins/height';

export default {

	// props: [ 'images' ],
	mixins: [ projects, height ],
	components: {
		'picture-query': Picture,
		close
	},

	data() {
		return {
			index: 0,
			imageTypes: [ 'mobile', 'horiz', 'regular' ],
			height: true
		}
	},

	computed: {

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
			if ( !this.project ) return '';
			return `/${this.type}/${this.project.link}`;
		},

	},

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

			// take advantage of blocking script

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
				this.$router.replace( `/${this.type}/${this.project.link}/${ this.images[ this.changeImageType() ][0].path }` )
			} else {
				this.$router.replace( `/${this.type}/${this.project.link}/${ this.images[this.orientation][ this.nextImage ].path }` );
			}
		},

		goToPrevImage() {

			if ( this.prevImage < 0 ) {
				this.$router.replace( `/${this.type }/${this.project.link}/${ this.images[ this.changeImageType(true) ][ this.images[ this.changeImageType(true) ].length - 1 ].path }` )
			} else {
				this.$router.replace( `/${this.type }/${this.project.link}/${ this.images[this.orientation][ this.prevImage ].path }` )
			}

		},

		swipe(e) {

			// DIRECTION_NONE	1
			// DIRECTION_LEFT	2
			// DIRECTION_RIGHT	4
			// DIRECTION_UP	8
			// DIRECTION_DOWN	16
			// DIRECTION_HORIZONTAL	6
			// DIRECTION_VERTICAL	24
			// DIRECTION_ALL	30

			switch( e.direction ) {
				case 4:
					// right
					this.goToImage();
					break;
				case 2:
					// left
					this.goToPrevImage();
					break;
				case 8:
					// up
					this.goToPrevImage();
					break;
				case 16:
					// down
					this.goToImage();
					break;
				default:
					// do nothing
					break;
			}

		}

	},

	beforeDestroy() {
		this.height = false;
		window.onkeydown = false;
	},

	mounted() {
		this.keyPress();
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
		background: rgba(black,0.5);
		padding: 10px;
		font-size:10px;
		z-index:3;

		&:after {
			display:block;
			position:relative;
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

		// width: 40%;
		max-width:180px;

		@media only screen and (max-height: 420px) {
			width: 20%;
		}
		@media only screen and (min-width: 1500px) {
			// max-width:500px;
			width:30%;
			max-width: 100%;
		}
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

		@media only screen and (max-height: 420px) {
			width: 60%;
		}

	}

	.background {
		position:fixed;
		top:0;
		left:0;
		width:100%;
		height:100%;
		overflow-y:hidden;
		background: rgba(black,1);
		z-index:100;
	}

	.swipe {
		position:absolute;
		z-index:1;
		height:100%;
		width:100%;
		top:0;
		left:0;
	}

</style>
