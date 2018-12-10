<template>

  <div
    :class="['player', { ['stuck']: stuck } ]"
    @mouseenter="mouseenter"
    @mouseleave="mouseleave"
    :ref=" 'player' "
    v-if="getOnline() || !getOnline() && videoImg.length"
  >

    <div :class="[ 'frame' ]" >


      <div
        :class="['loader']"
        style="overflow:hidden;" 
      >
        <transition name="fade">
          <span v-if="!playerReady && getOnline()" >Loading <Loader :go="!playerReady" /> </span>
        </transition>
        <transition name="fade">
          <div
            v-if="getOnline()"
            :class="['sub-loader', { ['offline']: !getOnline() } ]"
            :style="{ backgroundImage: getMainImage() }" />

          <div
            :class="['sub-loader', { ['offline']: !getOnline() } ]"
            v-if="!getOnline() && videoImg.length" >
            <picture-query
              v-if="getImageName().length"
              :type="$route.params.type"
              :path="getImageName()"
              alt="Video Image"
            />
          </div>

        </transition>
      </div>

      <div 
        id="player" 
        v-if="getOnline()" />

    </div>

  </div>

</template>

<script>
import Loader from "@/components/Loader.vue";
import Picture from "@/components/Picture.vue";

export default {
  components: {
    Loader,
    "picture-query": Picture
  },
  props: {
    videoImg: {
      default: "",
      required: false,
      type: String
    },
    videoId: {
      required: true,
      type: String
    }
  },

  data() {
    return {
      done: false,
      stuck: false,
      mousein: false,
      observer: null,
      playerReady: false,
      YTPlayer: null
    };
  },

  mounted() {
    this.createScript();
  },

  watch: {
    $route(r) {
      if (r.params.image && this.YTPlayer.getPlayerState() != 2) {
        this.YTPlayer.pauseVideo();
        this.stuck = false;
      }
      if ( this.YTPlayer ) {
        this.YTPlayer.destroy();
        this.YTPlayer = null;
      }
    }
  },
  beforeRouteUpdate(to,from,next) {
    if ( this.YTPlayer ){
      this.YTPlayer.destroy();
      this.YTPlayer = null;
    }
    next()
  },
  beforeRouteLeave(to,from,next) {
    if ( this.YTPlayer ){
      this.YTPlayer.destroy();
      this.YTPlayer = null;
    }
    next();
  },
  beforeDestroy() {
    if ( this.YTPlayer ){
      this.YTPlayer.destroy();
      this.YTPlayer = null;
    }
    if ( this.observer) {
      this.observer.unobserve(this.$refs.player);
    }
  },
  created() {
    if ( this.YTPlayer ){
      this.YTPlayer.destroy();
      this.YTPlayer = null;
    }
  },
  methods: {
    getOnline() {
      return navigator.onLine;
    },
    mouseenter() {
      this.stuck = true;
      this.mousein = true;
    },

    mouseleave() {
      this.mousein = false;

      if (!this.YTPlayer || !this.YTPlayer.getPlayerState) return;

      if (
        this.YTPlayer.getPlayerState() != 1 &&
        this.YTPlayer.getPlayerState() != 3
      ) {
        this.stuck = false;
      }
    },

    onPlayerReady() {
      this.playerReady = true;
      // console.log('ready');
    },

    onPlayerStateChange(event) {
      // -1 (unstarted)
      // 0 (ended)
      // 1 (playing)
      // 2 (paused)
      // 3 (buffering)
      // 5 (video cued)
      if (event.data == -1) {
        // console.log('!');
      }
      if (event.data == 0) {
        this.YTPlayer.seekTo(0, true);
        this.YTPlayer.pauseVideo();
        if (!this.mousein) {
          this.stuck = false;
        }
      }
    },
    getImageName() {
      if (!this.videoImg || !this.$route.params.type) return "";
      return this.videoImg.split(this.$route.params.type + "/")[1];
    },
    getMainImage() {
      if (!this.videoImg) {
        return "none";
      }

      let width = window.innerWidth;
      let size = "-lg_1x.jpg";
      let image = this.videoImg;

      if (width < 900) {
        size = "-sm_1x.jpg";
      } else if (width >= 900) {
        size = "-md_1x.jpg";
      } else {
        size = "-lg_1x.jpg";
      }

      return `url( ${image}${size}`;
    },
    createScript() {
      if (!navigator.onLine) return;

      const tag = document.createElement("script");
      const firstScriptTag = document.getElementsByTagName("script")[0];
      tag.src = "https://www.youtube.com/iframe_api";
      tag.id = "youtube";

      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = () => {
        this.createPlayer();
      };

      if (window.YT) {
        this.createPlayer();
      }
    },

    createPlayer() {
      this.YTPlayer = new window.YT.Player("player", {
        videoId: this.videoId,
        playerVars: {
          rel: 0,
          host: "https://youtube.com",
          origin: "https://shawnnaquin.github.io",
          width: "100%",
          height: "100%",
          showinfo: 0,
          ecver: 2,
          autoplay: 0,
          controls: 1,
          color: "white",
          modestbranding: 1,
          enablejsapi: 1
        },
        events: {
          onReady: this.onPlayerReady,
          onStateChange: this.onPlayerStateChange
        }
      });

      this.observer = new IntersectionObserver(entry => {
        entry.forEach(e => {
          if (
            e.intersectionRatio <= 0 &&
            this.YTPlayer &&
            this.YTPlayer.pauseVideo
          ) {
            this.YTPlayer.pauseVideo();
          }
        });
      });

      this.observer.observe(this.$refs.player);
    }
  }
};
</script>
<style lang="scss">
.frame {
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  transform: scale(0.98) rotateY(0) translate3d(0, 0, 0);
  transition: transform 200ms ease;
  > div,
  iframe {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
  }
}

.frame:hover,
.frame:active,
.frame:focus,
.stuck .frame {
  left: 0;
  transform: scale(1) rotateY(0deg) translate3d(0, 0, 0);
}
</style>

<style lang="scss" scoped >
.loader {
  z-index: 1;
  display: flex;
  justify-content: center;
  flex-direction: column;
  z-index: 0;
  font-weight: bold;
  text-align: center;
  .sub-loader {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    filter: blur(10px);
    z-index: -1;
    &.offline {
      filter: blur(0);
    }
  }
}

@keyframes blurIn {
  100% {
    filter: blur(0px);
    opacity: 1;
  }
}
.player {
  opacity: 0;
  filter: blur(10px);
  animation-name: blurIn;
  animation-duration: 200ms;
  animation-fill-mode: forwards;
  animation-timing-function: ease-in;
  animation-delay: 300ms;
}
.player {
  position: relative;
  perspective: 200px;
  perspective-origin: 50% 50%;
  padding-bottom: 56.25%;
  margin-top: 32px;
}
</style>
