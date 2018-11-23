<template>

	<div id="app" :class="[{['no-scroll']: $store.state.noScroll }]" >

		<transition name="fade-o" >
			<div :class="[ 'loader' ]" v-if="getLoading" ref="background" >
				<p :class="[ 'paragraph' ]" >Loading <Loader :go="getLoading" /></p>
			</div>
		</transition>

      <transition name="fade-up" appear>

      <div :class="'flex-column'" >
        <Nav />
        <Header :loaded="!getLoading" />
      </div>

    </transition>

		<transition :name="mainTrans.trans" :mode="mainTrans.mode" appear >
			<router-view />
		</transition>

    <transition name="fade" appear >
      <button v-if="getSticky" v-scroll-to=" ':root' " :class="['external', 'bottom' ]">
        <up/>
      </button>
    </transition>

	</div>

</template>

<script>
  // @ is an alias to /src
  import Loader from "@/components/Loader";
  import height from '@/mixins/height';
  import Nav from "@/components/Nav.vue";
  import Header from "@/components/Header.vue";
  import up from '@/components/icons/up';

  import { mapGetters } from 'vuex';


  export default {
  	name: "home",

  	computed: {
  		...mapGetters({
  			getLoading: 'getLoading',
        mainTrans: 'getTrans',
        getSticky: 'getSticky'
  			}),
  		height() {
  			return this.getLoading;
  		}
  	},
  	data() {
  		return {
  			mod: ''
  		}
  	},

  	mixins: [ height ],
  	created() {
  		  		this.$router.beforeEach((to, from, next) => {

  		  			if ( to.params.image && !from.params.image ) {
  		  				this.$store.commit('setTrans', { trans: 'fade-abs', mode: '' } );
                document.body.style.background = 'black';
              } else if (!to.params.image && from.params.image) {
                this.$store.commit('setTrans', { trans: 'fade-o', mode: '' } );
                document.body.style.background = '';
              } else {
                this.$store.commit('setTrans', { trans: 'fade-up', mode: '' } );
                document.body.style.background = '';
  		  			}

  		  			this.$nextTick(()=> {
  			  			next();
  		  			});

  		  		});
  	},
  	components: {
  		Loader,
      Header,
      Nav,
      up
  	}
  };
  </script>

  <style lang="scss" scoped >

  .bottom {
    position: fixed;
    bottom:32px;
    right:32px;
    padding:8px 12px;
    cursor: pointer;
    svg {
      width:32px;
      height:32px;
      pointer-event:none;
    }

    @media only screen and (max-width: 1100px ) {
      bottom:8px;
      right:8px;
      padding:4px 6px;
      cursor: pointer;
      svg {
        width:16px;
        height:16px;
        pointer-event:none;
      }
    }

  }

  .no-scroll {

  	overflow:hidden;
  	position:fixed;
  	top:0;
  	left:0;
  	right:0;
  	bottom:0;

  }

  .paragraph {
  	margin: 0 auto;
  }

  .loader {
  	background: black;
  	position: fixed;
  	top:0;
  	left:0;
  	z-index:100;
  	height:100%;
  	width:100%;
  	color: white;
  	display:flex;
  	justify-content: center;
  	flex-flow: column;
  	p {
  		position:absolute;
  		left: 50%;
  		transform: translate3d(-60%,0,0);
  		font-size: 32px;
  		font-weight: bold;
  		span {
  			position: absolute;
  			right: -32px;
  			bottom: 0;
  		}
  	}
  }

  .footer {

  	position:fixed;
  	left:0;
  	bottom:0;
  	background:lighten(black, 10%);
  	min-height:32px;
  	width:100vw;
  	box-shadow: 2px 2px 3px 4px rgba(black,0.2);
  	border-top: 1px solid lighten(black,25%);
  }

  </style>

  <style lang="scss">

  //  GENERAL
  .max-width {
    max-width: 1440px;
    margin-left: auto!important;
    margin-right: auto!important;
  }

  body {
  	width:100%;
  	box-sizing: border-box;
  	margin: 0;
  	background: darken(white,2%);
    min-height:100%;
  	transition: background 300ms ease;
  }

  #app {
  	font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  	text-rendering: optimizeLegibility !important;
  	-webkit-font-smoothing: antialiased !important;
  	-moz-osx-font-smoothing: grayscale;
  	text-align:left;
  	color: #2c3e50;
  	margin: 0 auto;
  	width:100%;
  	overflow-x: hidden;
  }

  ul {
  	padding-left: 0;
  }

  .push {
  	margin-left:10%;
  	width:90%;
  }

  .flex-column {
  	display: flex;
  	flex-direction: column;
  }

  @media only screen and (min-width:1100px) {

  	#app {
  		text-align:center;
  	}

  	.push {
  		margin-left:0;
  		width:100%;
  	}


  }
  .external-span {
  	font-size:12px; margin-left:2px; font-weight:normal; transform: translateY(-10%); display:inline-block;
    > svg {
      width: 12px;
    }
  }
  .external {
  	display:inline-block;
  	padding: 0.75rem 2rem;
  	font-weight: bold;
  	color: #2c3e50;
  	text-decoration:none;
  	width:auto;
  	background:darken(white,5%);
  	border:1px solid darken(white,10%);
  	font-size:16px;
  	transition: border-color 150ms ease-out;

  	&:hover, &:active, &:focus {
  		border-color:Purple;
  		transition-timing-function:ease-in;
  	}
  }



.fade-enter-active, .fade-leave-active {
  transition: opacity 0.1s ease-in;
}

.fade-leave-active {
  transition-timing-function: ease-out;
}

.fade-abs-enter-active,
.fade-abs-leave-active,
.fade-o-enter-active,
.fade-o-leave-active {
    position:absolute!important;
    top:0;
    min-height:100vh;
    width:100%;
    z-index:0;
    &:not(.background) {
      left: 50%;
      transform: translateX(-50%);
    }
    &:not(.project) {
      position:fixed!important;
    }
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}


.fade-abs-enter-active, .fade-abs-leave-active {
  opacity:1;
  transition: opacity 0.2s ease;
}

.fade-abs-enter, .fade-abs-leave-to {
  opacity: 0;
}

.fade-o-enter-active, .fade-o-leave-active {
  transition: opacity 0.2s ease;
}

.fade-o-leave-active {
}

.fade-o-enter, .fade-o-leave-to {
  opacity: 0;
}

.fade-up-enter-active, .fade-up-leave-active {
  transition: transform 0.2s ease;
  transition-property: transform,opacity;
}

.fade-up-enter-active {
  transition-timing-function: ease-out;
}
.fade-up-leave-active {
  transition-timing-function: ease-in;
}
.fade-up-enter {
  // transform: translateY(10%);
  opacity:0;
}
.fade-up-leave-to {
  // transform: translateY(-20%);
  opacity:0;
}
/*

enter ---- enter-to   leave ---- leave-to
|-----------------|   |-----------------|
    enter-active         leave-active

*/

.fade-left-enter {
  transform:translateX(100%);
}
.fade-left-leave-to {
  transform:translateX(-100%);
}
.fade-left-enter-active, .fade-left-leave-active {
  transition: transform 0.1s;
}

.fade-right-enter {
  transform:translateX(-100%);
}
.fade-right-leave-to {
  transform:translateX(100%);
}
.fade-right-enter-active, .fade-right-leave-active {
  transition: transform 0.1s;
}

.grid {

	width:100%;
	display: grid;
	grid-template-columns: repeat( auto-fill, minmax(400px, 1fr ) );
	grid-gap: 2rem;
	margin-bottom:10%;
	perspective: 1100px;
	> div {
		padding-bottom: 56.25%;
		transform-origin:center;
		transform: translate3d(0,0,0);
		transition: transform 150ms ease;
		&:hover {
			transform: translate3d(0,0,10px);
		}
	}

	source, img {
		object-fit: contain;
		width: 100%;
		height: 100%;
	}

	@media only screen and (max-width:630px) {
		grid-template-columns: repeat( auto-fill, minmax(200px, 1fr) )
	}

}
@keyframes fadeInS {
  100% {
    opacity:1;
  }
}
.grid.horiz {

	> div {
		padding-bottom: 56.1%;
		@media only screen and (min-width: 630px) {
			padding-bottom: 49.21%;
			background-image: url( '~@/assets/ui/mobile.horiz.png' );
			background-size: cover;
			background-position: center;
      opacity:0;

      animation-name: fadeInS;
      animation-fill-mode: forwards;
      animation-duration: 2000ms;

		}

	}
}

.grid.mobile {
	width:100%;
	grid-template-columns: repeat( auto-fill, minmax(250px, 1fr ) );
	> div {
		padding-bottom: 177%;
		@media only screen and (min-width: 630px) {
			padding-bottom: 202.9%;
			background-image: url( '~@/assets/ui/mobile.vert.png' );
			background-size: cover;
			background-position: center;
		}
    opacity:0;

    animation-name: fadeInS;
    animation-fill-mode: forwards;
    animation-duration: 2000ms;
	}
}

@media only screen and (min-width: 630px) {
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
