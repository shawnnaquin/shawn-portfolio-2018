<template>
  <div id="app">

    <transition name="long-fade" >

      <div :class="[ 'loader' ]"  v-if="getLoading" >
        <p :class="[ 'paragraph' ]" >Loading <Loader :go="getLoading" /></p>
      </div>

    </transition>

    <div :class="'flex-column'">
      <Nav />
      <Header :loaded="!getLoading" />
    </div>
    <transition name="fade" appear>
      <router-view/>
    </transition>
  </div>
</template>

<script>
  // @ is an alias to /src
import Header from "@/components/Header.vue";
import Nav from "@/components/Nav.vue";
import Loader from "@/components/Loader";
import { mapGetters } from 'vuex';

export default {
  name: "home",
  computed: {
    ...mapGetters([
        'getLoading'
      ])
  },
  components: {
    Loader,
    Header,
    Nav
  }
};
</script>

<style lang="scss" scoped >
    
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

</style>

<style lang="scss">

  //  GENERAL

  body {
    box-sizing: border-box;
    margin: 0;
    background: darken(white,2%);
  }

  #app {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
    text-rendering: optimizeLegibility !important;
    -webkit-font-smoothing: antialiased !important;
    -moz-osx-font-smoothing: grayscale;
    text-align:left;
    color: #2c3e50;
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
    margin-bottom:48px;
  }

  @media only screen and (min-width:1000px) {

    #app {
      text-align:center;
    }

    .push {
      margin-left:0;
      width:100%;
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

</style>
