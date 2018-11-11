<template>

  <header>

    <transition name="fade" appear >

    <div :class="[ 'heading', 'push' ]" v-if="loaded" >
      <h1>Shawn Naquin <span>Front-End-Portfolio</span></h1>
      <h3>October 2018</h3>

      <router-link :to="'/'" :class="['external']">
        About Shawn
      </router-link>

    </div>

    </transition>

    <transition name="fade" appear >
      <youtube-video v-if=" isHome" ></youtube-video>
    </transition>

  </header>

</template>

<script>

  import YoutubeVideo from '@/components/YoutubeVideo';

  export default {
    props: ['loaded'],
    components: {
      'youtube-video': YoutubeVideo
    },
    computed: {
      isHome() {
        return this.$route.name == 'home';
      }
    }
  };
</script>

<style lang="scss" scoped>

  header {
    perspective: 1000px;
    perspective-origin: center;
  }

  .heading {
    margin-bottom: 32px;
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

</style>