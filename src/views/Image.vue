<template>

	<div :class="[ 'background' ]" >

		<router-link :class="['close']" :to="routeBack" >( close / ESC )<close></close></router-link>

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
			index: 0
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
	},

	watch: {

	},
	beforeDestroy() {
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
			// padding-bottom: 56.25%;
			position:relative;
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

	figcaption {
		background: white;
		color:black;
		height:auto;
	}

</style>
