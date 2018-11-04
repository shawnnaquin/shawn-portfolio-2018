<template>
  <div id="app">
    <div :class="'flex-column'">
      <Nav />
      <Header />
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

export default {
  name: "home",
  components: {
    Header,
    Nav
  }
};
</script>

<style lang="scss">

  //  GENERAL

  body {
    box-sizing: border-box;
    margin: 0;
    background: darken(white,2%);
  }

  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
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

  .fade-fast-enter-active, .fade-fast-leave-active {
    opacity: opacity 0.1s;
  }

  .fade-fast-enter, .fade-fast-leave-to {
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
