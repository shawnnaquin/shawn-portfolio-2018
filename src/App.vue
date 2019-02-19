<template>

	<div id="app">

	  <transition name="fade" >
		<HeaderMessage :key="getMessage" :message="getMessage" :error="getMessageError" v-if="getMessage" ></HeaderMessage>
	  </transition>

	  <transition name="fade" >
		<loader-page v-if="getLoading" >
		</loader-page>
	  </transition>

		<div :class="'flex-column'" v-if="$route.name != 'contact' && $route.name != 'Image' " >
			<Nav />
			<Header :loaded="!getLoading" :aria-hidden="$store.state.modalOpen !== false" />
		</div>

		<div :aria-hidden="$store.state.modalOpen !== false">
		  <transition :name="mainTrans.trans" :mode="mainTrans.mode" appear >

		   	<router-view/>

		   </transition>
		</div>

	  <transition name="fade" appear >

		<button
		  v-if="getSticky && $route.name != 'home' || getSticky && $route.name != 'contact' "
		  :aria-hidden="$store.state.modalOpen !== false"
		  v-scroll-to="{
			el: ':root',
			duration: 200,
			easing: 'ease-out'
		  }"
		  :class="['external', 'bottom' ]"
		>
			<up/>
		</button>

	  </transition>

		<aside
		  :class="[ 'aside' ]"
		  :aria-hidden="$store.state.modalOpen !== false"
		  v-if="$route.name != 'contact' && $route.name != 'Image' "
		>

			<div :class="['footer-buttons']" >

				<router-link name="Resumé" aria-label="Resumé" title="Resumé"
				  :class="['external']"
				  :to="{
				  	path:'/contact',
				  	query: Object.assign( {}, this.$route.query, { subject: encodeURI('Resumé Request') } )
				  }"
				> Resumé </router-link>

				<router-link to="/contact" name="Contact" aria-label="Contact" title="Contact"
				  :class="['external']"
				> Contact </router-link>

				<button name="Install" aria-label="Install" title="Install"
				  @click="installer()" v-if="installBtn"
				  :class="['external']"
				> Install to Home Screen </button>

				<router-link name="Technology List" aria-label="Technology List" title="Technology List"
				  v-if="$route.name != 'tech' "
				  :class="['external']"
				  to="/tech"
				 > Technology List </router-link>

				<router-link name="More Work" aria-label="More Work" title="More Work"
				  v-else
				  :class="['external']"
				  to="/marketing"
				> More Work </router-link>

			</div>

			<div :class="['footer-about']" >
				<p>Shawn is a Front-End developer focused on writing beautiful and maintainable JavaScript, HTML, CSS projects. More of his work can be found on <a href="https://github.com/shawnnaquin" rel="noopener" target="_blank">GitHub</a>. Some specialties include: <router-link to="/tech/greensock" name="Greensock" aria-label="Greensock">Greensock</router-link>, <router-link to="/tech/svg" name="SVG" aria-label="SVG">SVG</router-link>, <router-link to="/tech/webpack" name="Webpack" aria-label="Webpack">Webpack</router-link>, <router-link to="/tech/vuejs" name="VueJS" aria-label="VueJS" >VueJS</router-link>, UX, performance testing, and accessibility.
					<span v-if="$route.name != 'tech' " >Click below for <router-link name="Technology List" aria-label="Technology List" title="Technology List" to="/tech"> a complete list</router-link> of all technologies used in this portfolio! </span>
					<span v-else >Click below to see <router-link name="Marketing" aria-label="Marketing" title="Marketing" to="/marketing">more work</router-link> from Shawn's portfolio.</span>
				</p>
			</div>

		</aside>

		<footer  :class="['footer']" :aria-hidden="$store.state.modalOpen !== false" v-if="$route.name != 'contact' && $route.name != 'Image' " >

			<div :class="['footer-copy']" >
				<small>&copy; Shawn Naquin | Front-End Portfolio | {{ getDate }}</small>
			</div>

			<div :class="['footer-icons']">

				<a name="Github" aria-label="Github" title="Github" href="https://github.com/shawnnaquin/"
				  :class="['footer-icon']"
				  target="_blank"
				>
					<git />
				</a>

				<a href="https://www.linkedin.com/in/shawnnaquin/" name="LinkedIn" aria-label="LinkedIn" title="LinkedIn"
				  :class="['footer-icon']"
				  target="_blank"
				>
					<lin />
				</a>

				<a href="https://www.upwork.com/freelancers/~01350c7cc22183580b" name="UpWork" aria-label="UpWork" title="UpWork"
				  :class="['footer-icon']"
				  target="_blank"
				>
					<upwork />
				</a>

				<a href="https://codepen.io/shawn-naquin/" name="CodePen" aria-label="CodePen" title="CodePen"
				  :class="['footer-icon']"
				  target="_blank"
				>
					<codepen />
				</a>

				<a href="mailto:shawn.naquin@gmail.com" name="Email" aria-label="Email" title="Email"
				  :class="['footer-icon']"
				>
					<mail />
				</a>

			</div>

		</footer>

	</div>

</template>

<script>
// @ is an alias to /src
import Nav from "@/components/Nav.vue";
import Header from "@/components/Header.vue";
// import Contact from "@/components/Contact.vue";

import up from "@/components/icons/up";

import git from "@/components/icons/gitcat";
import lin from "@/components/icons/in";
import you from "@/components/icons/youtube";
import be from "@/components/icons/be";
import upwork from "@/components/icons/upwork";
import codepen from "@/components/icons/codepen";
import mail from "@/components/icons/mail";
import LoaderPage from "@/components/LoaderPage";
import HeaderMessage from "@/components/HeaderMessage";


import { mapGetters } from "vuex";

String.prototype.capitalize = function() {
	return this.charAt(0).toUpperCase() + this.slice(1);
};

export default {
	name: "Home",

	computed: {
		...mapGetters({
			getLoading: "getLoading",
			mainTrans: "getTrans",
			getSticky: "getSticky",
			getMessage: "getMessage",
			getMessageError: "getMessageError"
		}),
		getDate() {
			let d = new Date();
			return `${this.monthNames[d.getMonth()]} ${d.getFullYear()}`;
		}
	},

	data() {
		return {
			title: "home",
			installBtn: false,
			installer: undefined,
			mod: "",
			messageTimeout: false,
			monthNames: [
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December"
			]
		};
	},

	watch: {

		'$store.state.message'(message) {

			if (message) {
				clearTimeout(this.messageTimeout);
				this.messageTimeout = setTimeout( ()=> {
					this.$store.commit('setMessage', false );
				}, 3000 );
			}
		},

		'$route'(to,from) {
			if ( to.name == 'Image' ) {
				document.body.style.background = 'black';
			} else {
				document.body.style.background = '';
			}
		}

	},

	methods: {
		sendMessage(message) {

			if ( `Notification` in window ) {
				if ( Notification && Notification.permission == 'granted') {
					var n = new Notification('Shawn Naquin | Developer', {
						body: message
					});
				}
			}

		}
	},
	created() {

		if ( this.$route.name == 'Image' ) {
			document.body.style.background = 'black';
		} else {
			document.body.style.background = '';
		}

		let installPrompt;
		window.addEventListener('beforeinstallprompt', e => {
			e.preventDefault();
			installPrompt = e;
			this.installBtn = true;
		});
		this.installer = () => {
			this.installBtn = false;
			installPrompt.prompt();
			installPrompt.userChoice.then(result=>{
		// console.log(result.outcome);
		if (result.outcome == 'accepted'){
			this.sendMessage('Thanks for installing! Stay tuned!');
		} else {
		  // console.log('deny');
		}
		installPrompt = null;
	})
	};

	if( `Notification` in window ) {
		if ( Notification && Notification.permission === 'default') {

			let resolve = (permission)=> {
				if(!('permission' in Notification)) {
					Notification.permission = permission;
				}
				if( permission == 'granted' ) {
					this.sendMessage('Thanks for accepting! Stay tuned!');
				}
			};

			let request = Notification.requestPermission(resolve);

		}
	}

},

mounted() {},

	// Contact,
	components: {
		HeaderMessage,
		LoaderPage,
		Header,
		Nav,
		up,
		git,
		lin,
		you,
		be,
		upwork,
		codepen,
		mail
	}
};
</script>

<style lang="scss" scoped >
.aside,
.footer {
	.external {
		font-weight: normal;
		font-size: 14px;
		padding: 8px 12px;
	}
}

.aside {
	padding: 24px;
	background: whitesmoke;
	text-align: left;
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-gap: 1rem;
	@media only screen and (max-width: 630px) {
		grid-template-columns: 1fr;
	}
	align-items: center;
	justify-items: center;
}

.footer-about {
	p {
		@media only screen and (min-width: 1400px) {
			width: 50%;
		}
	}
}

.footer-buttons {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-gap: 8px;
	text-align: center;
}

.footer-icon {
	margin-right: 12px;
	display: inline-block;
	height: 24px;
	width: auto;
	> svg {
		fill: lighten(black, 25%);
		width: auto;
		height: 100%;
		transform: scale(1);
		transition: transform 200ms ease;
		transition-property: transform, fill;
	}
	&:focus {
		> svg {
			transform: scale(1.2);
			fill: black;
		}
		outline: 0;
		border: 0;
	}
	@media only screen and (min-width: 630px) {
		&:hover {
			> svg {
				transform: scale(1.2);
				fill: black;
			}
		}
	}
}

.footer {
	padding: 16px;
	background: darken(white, 8%);
	color: black;
	text-align: left;
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-gap: 2rem;
	@media only screen and (max-width: 630px) {
		grid-template-columns: 1fr;
		.footer-icons {
			order: 1;
		}
		.footer-copy {
			order: 2;
		}
	}
	grid-gap: 1rem;
	align-items: center;
	justify-items: center;
}

.bottom {
	position: fixed;
	bottom: 32px;
	right: 32px;
	padding: 8px 12px;
	cursor: pointer;
	svg {
		width: 32px;
		height: 32px;
		pointer-events: none;
	}

	@media only screen and (max-width: 1100px) {
		bottom: 8px;
		right: 8px;
		padding: 4px 6px;
		cursor: pointer;
		svg {
			width: 24px;
			height: 24px;
			pointer-events: none;
		}
	}
}

.no-scroll {
	overflow: hidden;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
}

</style>

<style lang="scss">
//  GENERAL
.max-width {
	max-width: 1440px;
	margin-left: auto !important;
	margin-right: auto !important;
}

body {
  // display: none;
  width: 100%;
  box-sizing: border-box;
  margin: 0;
  background: darken(white, 2%);
  min-height: 100%;
  transition: background 300ms ease;
  overflow-x: hidden;
}

#app {
	font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
	"Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
	sans-serif;
	text-rendering: optimizeLegibility !important;
	-webkit-font-smoothing: antialiased !important;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	margin: 0 auto;
	width: 100%;
	overflow-x: hidden;
}

ul {
	padding-left: 0;
}

p {
	color: black;
}

p a {
	color: Purple;
	transition: color 100ms ease-out;
	outline: none;
	&:focus,
	&:active,
	&:hover {
		color: darken(Purple, 10%);
		transition-timing-function: ease-in;
	}
}

.flex-column {
	display: flex;
	flex-direction: column;
}

.external-span {
	font-size: 12px;
	margin-left: 2px;
	font-weight: normal;
	transform: translateY(-10%);
	display: inline-block;
	> svg {
		width: 12px;
	}
}

button, a {
	font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
	"Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
	sans-serif;
}

.external {
	display: inline-block;
	padding: 0.75rem 2rem;
	font-weight: bold;
	text-decoration: none;
	width: auto;
	background: darken(white, 5%);
	border: 1px solid darken(white, 10%);
	font-size: 16px;
	transition: border-color 150ms ease-out;
	color: black;
	outline: none;
	cursor: pointer;
	font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
	"Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
	sans-serif;
	@media only screen and (min-width: 630px) {
		&:hover,
		&:active,
		&:focus {
			color: black;
			border-color: Purple;
			transition-timing-function: ease-in;
		}
	}
}

.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.2s ease-in;
	transition-delay: 0s;
}

.fade-leave-active {
	transition-timing-function: ease-out;
}

.fade-abs-enter-active,
.fade-abs-leave-active,
.fade-o-enter-active,
.fade-o-leave-active {
	position: absolute !important;
	top: 0;
	min-height: 100vh;
	width: 100%;
	z-index: 0;
	overflow: hidden;
	overflow-y: hidden;
	&:not(.background) {
		left: 50%;
		transform: translateX(-50%);
	}

	&:not(.project) {
		position: fixed !important;
	}
}

.fade-enter,
.fade-leave-to {
	opacity: 0;
}

.fade-abs-enter-active,
.fade-abs-leave-active {
	opacity: 1;
	transition: opacity 0.2s ease;
}

.fade-abs-enter,
.fade-abs-leave-to {
	opacity: 0;
}

.fade-o-enter-active,
.fade-o-leave-active {
	transition: opacity 0.2s ease;
}

.fade-o-leave-active {
}

.fade-o-enter,
.fade-o-leave-to {
	opacity: 0;
}

.fade-up-enter-active,
.fade-up-leave-active {
	transition: transform 0.2s ease;
	transition-property: transform, opacity;
}

.fade-up-enter-active {
	transition-timing-function: ease-out;
}
.fade-up-leave-active {
	transition-timing-function: ease-in;
}
.fade-up-enter {
  // transform: translateY(10%);
  opacity: 0;
}
.fade-up-leave-to {
  // transform: translateY(-20%);
  opacity: 0;
}
/*

enter ---- enter-to   leave ---- leave-to
|-----------------|   |-----------------|
enter-active         leave-active

*/

.fade-left-enter {
	transform: translateX(100%);
}
.fade-left-leave-to {
	transform: translateX(-100%);
}
.fade-left-enter-active,
.fade-left-leave-active {
	transition: transform 0.1s;
}

.fade-right-enter {
	transform: translateX(-100%);
}
.fade-right-leave-to {
	transform: translateX(100%);
}
.fade-right-enter-active,
.fade-right-leave-active {
	transition: transform 0.1s;
}

.grid {
	width: 100%;
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
	grid-gap: 2rem;
	margin-bottom: 4%;
	perspective: 1100px;
	> div {
		padding-bottom: 56.25%;
		transform-origin: center;
		transform: translate3d(0, 0, 0);
		transition: transform 150ms ease;
		&:hover {
			transform: translate3d(0, 0, 10px);
		}
	}

	source,
	img {
		object-fit: contain;
		width: 100%;
		height: 100%;
	}

	@media only screen and (max-width: 630px) {
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
	}
}
@keyframes fadeInS {
	100% {
		opacity: 1;
	}
}
.grid.horiz {
	> div {
		padding-bottom: 56.1%;
		@media only screen and (min-width: 630px) {
			padding-bottom: 49.21%;
			background-image: url("~@/assets/ui/mobile.horiz.png");
			background-size: cover;
			background-position: center;
			opacity: 0;

			animation-name: fadeInS;
			animation-fill-mode: forwards;
			animation-duration: 2000ms;
		}
	}
}

.grid.mobile {
	width: 100%;
	grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));

	> div {
		padding-bottom: 177%;
		@media only screen and (min-width: 630px) {
			padding-bottom: 202.9%;
			background-image: url("~@/assets/ui/mobile.vert.png");
			background-size: cover;
			background-position: center;
		}
		opacity: 0;
		animation-name: fadeInS;
		animation-fill-mode: forwards;
		animation-duration: 2000ms;
	}
}

@media only screen and (min-width: 630px) {
	.grid.mobile {
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
	}
	.grid.horiz figure {
		width: 77.5%;
		height: 88%;
		left: 11%;
		top: 6%;
	}

	.grid.mobile figure {
		width: 88%;
		height: 77%;
		left: 5.5%;
		top: 11.25%;
	}
}
</style>
