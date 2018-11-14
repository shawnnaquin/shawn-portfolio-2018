<template>

	<div>

	<button :class="[ 'external', { ['menu-open']: menuOpen } ]" @click="button" >Menu</button>

	<nav id="nav" :class="[ { ['menu-open']: menuOpen } ]" >

		<ul>

			<transition name="fade">

				<li
					v-if="menuOpen"
					@click="toggleMenu()"
					:class="['dark']"
				>
					<button>Close / Esc (x)</button>
				</li>

			</transition>

			<transition name="fade">

				<li v-if="$route.name !== 'home'"
					@click="$router.push('/')"
				>

					<router-link to="/">Home</router-link>

				</li>

			</transition>

			<li @click="$router.push('/website')" >

				<router-link to="/website">Website</router-link>

			</li>

			<li @click="$router.push('/marketing')" >

				<router-link to="/marketing">Marketing</router-link>

			</li>

			<li @click="$router.push('/interactive')" >

				<router-link to="/interactive">Interactive / 3d</router-link>

			</li>


			<li @click="$router.push('/')" >

				<a href="#" target="_blank">
					<github/>&nbsp;<span :class="['external-span']" >(external)</span>
				</a>

			</li>

		</ul>

	</nav>
	</div>
</template>

<script>

import github from '@/components/icons/github';

export default {
	components: {
		github
	},
	data() {
		return {
			menuOpen: false
		};
	},
	watch: {
		'$route'(r) {
			if ( this.menuOpen ) {
				this.toggleMenu();				
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
	methods: {
		keyPress() {

			window.onkeydown = ( event ) => {
			    if ( event.keyCode == 27 ) {
			    	this.toggleMenu();
			    }
			};

		},
		button() {
			this.toggleMenu();
		},
		toggleMenu() {
			this.menuOpen = !this.menuOpen;			
		}
	}
};

</script>

<style lang="scss" scoped>

	#nav {

		order: 1;
		margin-bottom:24px;

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
		&:hover {
			background: darken(white, 8%);
		}

		button, a {
			display:inline-block;
			padding: 0.75rem 4rem;
			font-weight: bold;
			text-decoration:none;
		}

		button {
			background: transparent;
			outline: none;
			border:0;
			cursor: pointer;
		}

		a {
			color: #2c3e50;
			transition: color 200ms ease-in;

			&:hover {
				color: darken(aqua, 25%);
				> svg {
					fill: darken(aqua, 25%);
				}
			}

			> svg {
				display:inline;
				height:14px;
				width: auto;
				fill: #2c3e50;
				transition: fill 200ms ease-in;
			}

			&.router-link-exact-active {
				color:Purple;
				> svg {
					fill: Purple;
				}
			}

		}

		&:nth-last-child(1) {
			border-right:0;
		}

		&:nth-child(even) {
			background:darken(white,2%);
			&:hover {
				background: darken(white,8%);
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

		cursor: pointer;
		opacity:0;
		background: black;

		color: white;
		font-size: 12px;
		font-weight: normal;

		padding: 16px 16px;
		margin: 32px;
		margin-top: 24px;
		margin-bottom: 0;

		animation-name: opacityIn;
		animation-duration: 500ms;
		animation-delay: 0s;
		animation-fill-mode: forwards;
		animation-timing-function: ease-in;

		&.menu-open {
			pointer-events: none;
		}

	}

	// large up

	@media only screen and (min-width:1100px) {

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

	}

	// small only

	@media only screen and ( max-width: 1100px ) {

		#nav {

			position: fixed;
			top:0;
			left:0;
			height:100%;
			width:100%;
			z-index:100;
			background: rgba(gray,1);
			filter:blur(10px);
			opacity:0;
			transform: translate3d(0,-100%,0);
			transition: transform 100ms ease-out;
			transition-property: transform, filter, opacity;
			transition-delay: 50ms, 0s, 30ms;

			&.menu-open {
				transform: translate3d(0,0,0);
				opacity:1;
				filter:blur(0px);
				transition-timing-function: ease-in;
				transition-delay: 0s, 50ms, 20ms;
				li a, li button {
					padding: 1.5rem 4rem;
				}
			}

		}

		li {
			text-align: left;
			padding-left: 18px;
		}

	}

</style>