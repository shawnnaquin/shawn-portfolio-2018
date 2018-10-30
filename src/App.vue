<template>
  <div id="app">
    <div :class="'flex-column'">
      <Nav />
      <Header />
    </div>
    <router-view/>
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
  
  @media only screen and (min-width:1400px) {
    
    #app {
      text-align:center;
    }
    
    .push {
      margin-left:0;
      width:100%;
    }


  }

</style>
