<template>
	<div :class="['top', { ['sticky']: sticky } ]">
		<transition name="fade" appear>
			<button :class="[ 'external', 'menu', { ['menu-open']: menuOpen } ]" v-if="!menuOpen" @click="toggleMenu()" >
				<hamburger/>
			</button>
		</transition>

	<div :class="['fake-nav']" ref="fakenav"></div>

	<nav id="nav" :class="[ { ['menu-open']: menuOpen }, { ['sticky']: sticky } ]" ref="nav" >

		<ul>

			<transition name="fade">

				<li
					v-if="menuOpen"
					@click="setScrollAndToggle()"
					:class="['dark']"
				>
					<button>Close X</button>
				</li>

			</transition>

			<transition name="fade">

				<li v-if="$route.name !== 'home'" >
					<button  :class="[ { [ 'is-active' ]: isActive('/')} ]" @click="click('/')" >Home</button>
				</li>

			</transition>

			<li >

				<button  :class="[ { [ 'is-active' ]: isActive('/marketing')} ]" @click="click('/marketing')" >Marketing</button>

			</li>

			<li >

				<button :class="[ { [ 'is-active' ]: isActive('/interactive')} ]"  @click="click('/interactive')" >Interactive / 3D</button>

			</li>

			<li>

				<button :class="[ { [ 'is-active' ]: isActive('/website')} ]"  @click="click('/website')" >Website</button>

			</li>


			<li>

				<a href="#" target="_blank" @click="click()" >
					<github/>&nbsp;<span :class="['external-span']" ><external/></span>
				</a>

			</li>

		</ul>

	</nav>
	</div>
</template>

<script>

import github from '@/components/icons/github';
import hamburger from '@/components/icons/hamburger';
import external from '@/components/icons/external';
import { mapGetters } from 'vuex';
import { debounce } from 'lodash';

export default {

	components: {
		github,
		hamburger,
		external
	},

	data() {
		return {
			observer: null,
			sticky: false
		}
	},

	computed: {

		...mapGetters({
			menuOpen: 'getMenuOpen'
		}),

		d() {
			return debounce( this.resizeFn, 50, { 'leading': true, 'trailing': true } )
		}

	},
	watch: {

		'$route'() {
			if ( this.menuOpen ) {
				this.toggleMenu();
                document.documentElement.scrollTop = document.body.scrollTop = 0;
			}

		},

		'menuOpen'(o) {

			if ( o ) {
				this.keyPress();
			} else {
				window.onkeydown = null;
			}

		},
	},

	mounted() {
		this.resize();
		this.observe();
	},

	beforeDestroy() {
		window.removeEventListener("resize", this.d );
		this.observer.disconnect();
	},

	methods: {

		observe() {

			this.observer = new IntersectionObserver( entry => {
				entry.forEach( (e) =>  {

				    if ( e.intersectionRatio <= 0 ) {
				    	this.sticky = true;

				    } else {
				    	this.sticky = false;
				    }

				});
			});

			this.observer.observe( this.$refs.fakenav );

		},
		resizeFn() {

			if ( !this.menuOpen ) return;

			// console.log('happening');

			if ( window.innerWidth >= 1100 && this.menuOpen ) {
				this.toggleMenu();
				return;
			} else {
				return;
			}
		},

		resize() {
			window.addEventListener("resize", this.d );
		},

		isActive(r) {
			let t = '/'+this.$route.params.type == r;
			return r == this.$route.pat || t;
		},

		click(path) {

			if ( path && path != this.$route.path ) {
				this.$router.push( path );
			} else if ( !path || path == this.$route.path ) {
				this.setScrollAndToggle();
			} else {
				console.log("!");
			}

		},

		keyPress() {

			window.onkeydown = ( event ) => {
			    if ( event.keyCode == 27 ) {
			    	this.setScrollAndToggle();
			    }
			};

		},

		setScrollAndToggle() {
			this.toggleMenu();
			setTimeout(()=> {
                document.documentElement.scrollTop = document.body.scrollTop = this.$store.state.lastScroll;
			}, 100 );
		},

		toggleMenu() {
			this.$store.dispatch( 'setToggleMenu' );
		}

	}
};

</script>

<style lang="scss" scoped>

	.top {
		&.sticky {
		}
	}

	.fake-nav {
		position:absolute;
		top:48px;
		left:0;
		width:1px;
		height:1px;
		pointer-events:none;
	}
	@keyframes fadeIn {
		100% {
			opacity:1;
		}
	}

	#nav {
		z-index:1;
		order: 1;
		position: absolute;
		top:0;
		left:0;
		width:100%;
		&.sticky {
			@media only screen and (min-width: 1100px) {
				position: fixed;
				top:0;
				left:0;
				width:100%;
				opacity:0;
				background: darken(white, 3%);
				animation-name: fadeIn;
				animation-duration: 0.3s;
				animation-fill-mode: forwards;
				animation-timing-function: ease-in;
				transition: background 5s ease;
			}
		}
	}

	ul {
		margin:0;
		display: flex;
		flex-direction:column;
	}

	li {

		text-align: center;
		background:darken(white, 5%);
		list-style:none;
		cursor: pointer;
		transition: background 200ms ease;
		margin: 0;
		padding: 0;
		padding-left:0;

		&:hover {
			background: darken(white, 8%);
		}

		button, a {
			padding: 0.75rem 4rem;
			padding-left:64px;
			display:inline-block;
			font-weight: bold;
			text-decoration:none;
			-webkit-tap-highlight-color: transparent;
			font-size:16px;
			text-align:left;
			cursor: pointer;
		}

		button,a  {
			background: transparent;
			outline: none;
			border:0;
		}

		button,a {
			color: #2c3e50;
			transition: color 200ms ease-in;

			&:hover {
				color: darken(aqua, 25%);
				svg {
					fill: darken(aqua, 25%);
				}
			}

			svg {
				display:inline;
				height:14px;
				width: auto;
				fill: #2c3e50;
				transition: fill 200ms ease-in;
			}

			&.router-link-exact-active, &.is-active {
				// color:Purple;
				background:darken(white,2%);
				svg {
					// fill: Purple;
				}
			}

		}

		&:nth-last-child(1) {
			border-right:0;
		}

		&:nth-child(even) {
			&:hover {
				// background: darken(white,8%);
			}
		}

	}

	li.dark {
		background: black;
		button {
			color: white;
		}
	}

	small {
		display:block;
		background:darken(white, 85%);
		color:darken(white, 10%);
		padding:8px 16px;
	}

	@keyframes opacityIn {
		100% { opacity: 1; }
	}

	.external {

		border:0;
		outline: 0;

		position:fixed;
		top:0;
		left:0;

		cursor: pointer;
		opacity:0;
		background: rgba( gray,0.1);

		color: white;
		font-weight: bold;

		padding:6px 10px;
		margin-bottom: 0;
		margin-left:0;
		margin-top:0;
		z-index:1;
		animation-name: opacityIn;
		animation-duration: 500ms;
		animation-delay: 0s;
		animation-fill-mode: forwards;
		animation-timing-function: ease-in;

		> svg {
			width: 50px;
		}

		&.menu-open {
			pointer-events: none;
		}

	}

	// large up

	@media only screen and (min-width:1100px) {
		.top {
			padding-top:0;
		}
		.external {
			opacity:0;
			display:none;
		}

		li.dark {
			display: none;
		}

		ul {
			order: 0;
			flex-direction:row;
			justify-content:center;
		}
		li {
			button,a {
				text-align:center;
			}
		}
	}

	// small only

	@media only screen and ( max-width: 1100px ) {

		#nav {

			position: fixed;
			top:0;
			left:0;
			width:100%;
			height:100%;
			z-index:100;
			z-index:1;
			background: rgba(gray,1);
			filter:blur(10px);
			opacity:0;
			transform: translate3d(-100%,-25%,0);
			transition: transform 200ms ease-out;
			transition-property: transform, filter, opacity;
			transition-delay: 100ms, 0s, 60ms;
			overflow-y: auto;
			-webkit-overflow-scrolling: touch;
			overflow-x:hidden;

			&.menu-open {
				transform: translate3d(0,0,0);
				opacity:1;
				filter:blur(0px);
				transition-timing-function: ease-in;
				transition-delay: 0s, 100ms, 40ms;
				li a, li button {
					padding: 1.5rem 4rem;
				}
			}

		}
		ul {
			margin-bottom: 100px;
		}
		li {
			text-align: left;
			button, a  {
				width:100%;
			}
		}

	}

</style>