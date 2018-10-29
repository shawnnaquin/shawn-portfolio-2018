<template>
  
  <header>

    <div class="heading push">
      <h1>Shawn Naquin <span>Front-End-Portfolio</span></h1>
      <h3>October 2018</h3>
    </div>
    
    <video 
      :class="" 
      v-if=" isHome "
      poster="https://via.placeholder.com/1920x1080?text=Video"
    >
    </video>

  </header>

</template>

<script>
  export default {
    data: function () {
      return {}
    },
    computed: {
      isHome() {
        return this.$route.name == 'home';
      }
    }
  }
</script>

<style lang="scss" scoped>

  video {
    width:100%;
  }

  h1 span::before {
    content:'// ';
    color: lighten( black, 75% );
  }
  
  @media only screen and (max-width:630px) {
    h1 span {
      display:block;
      font-size:1rem;
      color: lighten( black, 25% );
      &::before {
        content:none;
      }
    }
  }

  @media only screen and (min-width:1400px) {
    video {
      width:55%;
    }
  }

</style>