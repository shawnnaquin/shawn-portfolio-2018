<template>

  <div id="app" :class="[{['no-scroll']: $store.state.noScroll }]" >

    <transition name="long-fade" >
      <div :class="[ 'loader' ]" v-if="getLoading" ref="background" >
        <p :class="[ 'paragraph' ]" >Loading <Loader :go="getLoading" /></p>
      </div>
    </transition>

    <div :class="'flex-column'" >
      <Nav />
      <Header :loaded="!getLoading" />
    </div>

    <transition name="fade" appear>
      <router-view />
    </transition>

<!--     <div :class="['footer']">

    </div> -->

  </div>

</template>

<script>
  // @ is an alias to /src
import Header from "@/components/Header.vue";
import Nav from "@/components/Nav.vue";
import Loader from "@/components/Loader";
import height from '@/mixins/height';
import { mapGetters } from 'vuex';


export default {
  name: "home",
  computed: {
    ...mapGetters([
        'getLoading'
      ]),
      height() {
        return this.getLoading;
      }
  },

  mixins: [ height ],

  components: {
    Loader,
    Header,
    Nav
  }
};
</script>

<style lang="scss" scoped >

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

  body {
    width:100%;
    box-sizing: border-box;
    margin: 0;
    background: darken(white,2%);
    transition: background 100ms ease;
  }

  #app {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
    text-rendering: optimizeLegibility !important;
    -webkit-font-smoothing: antialiased !important;
    -moz-osx-font-smoothing: grayscale;
    text-align:left;
    color: #2c3e50;
    max-width: 1440px;
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
    .flex-column {

      margin-bottom:48px;
    }

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

  .long-fade-enter-active {
    transition-timing-function: ease-in;
  }
  .long-fade-leave-active {
    transition-timing-function: ease-out;
  }

  .long-fade-enter-active, .long-fade-leave-active {
    transform: translateY(0);
    filter: blur(0px);
    transition: opacity 0.4s, transform 0.5s, filter 0.1s;
  }

  .long-fade-enter, .long-fade-leave-to {
    transform: translateY(-100%);
    filter: blur(10px);
    opacity: 0;
  }

  .fade-enter-active, .fade-leave-active {
    transform: translateY(0);
    transition: opacity 0.3s, transform 0.3s;
    transition-timing-function:ease-out;
    // transition-property: opacity, transform;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    transform: translateY(10%);
    transition: opacity 0.05s, transform 0.1s;
    transition-timing-function:ease-in;
    opacity: 0;
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

  .grid.horiz {
    > div {
      padding-bottom: 56.1%;
      @media only screen and (min-width: 630px) {
        padding-bottom: 49.21%;
        background-image: url( '~@/assets/ui/mobile.horiz.png' );
        background-size: cover;
        background-position: center;
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
