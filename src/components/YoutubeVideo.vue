<template>

  <div
    :class="['player', { ['stuck']: stuck } ]"
    @mouseenter="mouseenter"
    @mouseleave="mouseleave"
    :ref=" 'player' "
    v-if="videoImg.length"
  >

    <div class="background"></div>

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
            :style="{ backgroundImage: 'url(' + getMainImage() + '.jpg)', backgroundImage: 'url(' + getMainImage() + '.webp)' }" />

          <div
            :class="['sub-loader', { ['offline']: !getOnline() } ]"
            v-if="!getOnline() && videoImg.length" >
            <picture-query
              v-if="getImageName().length"
              :type="getType()"
              :path="getImageName()"
              alt="Video Image"
            />
          </div>

        </transition>
      </div>

      <div
        itemprop="video"
        itemscope
        itemtype="http://schema.org/VideoObject"
      >

        <meta itemprop="name" :content="videoTitle" />
        <meta itemprop="duration" :content="videoDuration" />
        <meta itemprop="thumbnailUrl" :content="getMainImage()+'.jpg'" />
        <meta itemprop="contentURL" :content=" `https://www.youtube.com/watch?v=${videoId}` " />
        <meta itemprop="embedURL" :content="videoEmbed" />
        <meta itemprop="height" content="1080" />
        <meta itemprop="width" content="1920" />
        <meta itemprop="description" :content="videoDescription" />

        <div
          id="player"
          v-if="getOnline()" />

      </div>

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
    videoDescription:{
      default: "",
      required:false,
      type:String
    },
    videoTitle: {
      default: "",
      required: false,
      type:String
    },
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
      YTPlayer: null,
      videoEmbed: '',
      videoDuration: '',
    };
  },

  mounted() {
    this.createScript();
  },

  watch: {
    $route(r) {
      if (r.query.imagelink && this.YTPlayer.getPlayerState() != 2) {
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

      this.videoDuration = `PT${this.YTPlayer.getDuration()}S`;
      this.videoEmbed = `http://www.youtube.com/embed/${this.videoId}?enablejsapi=1`

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
      let vidEnded = () => {
        this.YTPlayer.seekTo(0, true);
        this.YTPlayer.pauseVideo();

        this.$store.commit('videoPlaying', false );

        if (!this.mousein) {
          this.stuck = false;
        }
      };

      switch(event.data) {
        case -1:
          break;
        case 0:
          vidEnded();
          break;
        case 1:
          this.$store.commit('setVideoPlaying', true );
          this.stuck = true;
          break;
        case 2:
          this.$store.commit('setVideoPlaying', false );
          this.stuck = false;
          break;
        default:
      }

    },
    getImageName() {
      if (!this.videoImg ) return "";
      return this.videoImg.split( this.getType() + '/' )[1];
    },
    getType() {
      if (!this.videoImg ) return "";
      return this.videoImg.split('/')[ this.videoImg.split('/').length - 2 ];
    },
    getMainImage() {
      if (!this.videoImg) {
        return "none";
      }

      let width = window.innerWidth;
      let size = "-lg_2x";
      let image = this.videoImg;

      return `${image}${size}`;
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
          origin: "https://www.devnola.com",
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

      window.YTPlayerShawn = this.YTPlayer;

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
