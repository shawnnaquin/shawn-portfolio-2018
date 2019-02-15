<template>

  <div
    :class="[ 'background' ]"
    :style="{height:height}"
    ref="background" >

    <div
      :class="[ 'swipe' ]"
      ref="swipe"
      v-hammer:swipe="swipe"
    />

    <router-link
      :class="['close']"
      :to="routeBack" ><close/></router-link>

    <BreadCrumb :dark="true" :class="['bread']" ></BreadCrumb>

    <button
      :class="['external']"
      @click="goToImage()" > &gt; </button>
    <button
      :class="['external']"
      @click="goToPrevImage()" > &lt; </button>

    <div
      :class="[ orientation, 'grid' ]"
    >
      <div
      >
        <transition
          :name="trans"
          mode="out-in"
          appear >
          <picture-query
            :key="image.path"
            v-if="image"
            :type="type"
            :path="image.path"
            :alt="image.alt ? image.alt : '' "
            ref="image"
          >
            <p>{{ image.caption }}</p>
          </picture-query>
        </transition>

      </div>


    </div>

  </div>

</template>

<script>
import BreadCrumb from '@/components/BreadCrumb';
import Picture from "@/components/Picture";
import close from "@/components/icons/close";
import projects from "@/mixins/projects";
import H from "@/mixins/height";

export default {
  mixins: [projects, H],

  components: {
    BreadCrumb,
    "picture-query": Picture,
    close: close
  },

  created() {
    this.$emit("updateHead");
  },

  data() {
    return {
      index: 0,
      imageTypes: ["mobile", "horiz", "regular"],
      trans: "fade-left",
    };
  },

  head: {
    title: function() {
      return {
        inner: this.title
      };
    },
    meta: function() {
      let base = this.imageBase.split('/')[1];
      let image = `https://devnola.com/img/portfolio/${ base }/${ this.imagePath }-lg_1x.jpg`;
      let title = `${this.title}${window.metaTitle}`;
      return [
        {
          id:'item-name',
          itemprop: 'name',
          content: title
        },
        {
          id: 'twitter-title',
          name: 'twitter:title',
          content: title
        },
        {
          id: 'og-title',
          property: 'og:title',
          content: title
        },
        {
          id:'meta-description',
          name: 'description',
          content: this.imageCaption
        },
        {
          id: 'item-description',
          itemprop: 'description',
          content: this.imageCaption
        },
        {
          id:'twitter-description',
          name: 'twitter:description',
          content: this.imageCaption
        },
        {
          id: 'og-url',
          property:'og:url',
          content: `https://devnola.com${this.$route.path}/${this.imageLink}`
        },
        {
          id: 'og-description',
          property:'og:description',
          content: this.imageCaption
        },
        {
          id: 'item-image',
          itemprop: 'image',
          content: image
        },
        {
          id: 'twitter-image',
          name: 'twitter:image',
          content: image
        },

        {
          id: 'og-image',
          property:'og:image',
          content: image
        }
      ];
    },
    link: function() {
      return [
        {
          rel: "canonical",
          href: `https://devnola.com${this.$route.path}/${this.imageLink}`,
          id: "canonical"
        }
      ];
    }
  },
  computed: {
    imageLink() {
      return this.$route.params.image;
    },
    title() {
      return this.imageLink ? this.imageLink : '';
    },
    orientation() {
      if (!this.imageLink) return;

      let h = ["mobile", "horiz"];
      let p = null;

      for (let v of h) {
        if (this.imageLink.includes(v)) {
          p = v;
          break;
        }
      }

      if (p === null) {
        p = "regular";
      }

      return p;
    },

    getImageIndex() {
      if (!this.imageLink || !this.images || !this.images[this.orientation]) return false;

      let p = null;

      this.images[this.orientation].forEach((obj, i) => {
        if (obj.path == this.imageLink) {
          p = i;
        }
      });
      return p;
    },

    nextImage() {
      if (!this.imageLink && !this.images || !this.images[this.orientation]) return false;
      return (
        (this.getImageIndex + 1) % (this.images[this.orientation].length + 1)
      );
    },

    prevImage() {
      return this.getImageIndex - 1;
    },
    imageBase() {
      if ( !this.type || !this.project || !this.project.link ) return '';
      return `/${this.type}/${this.project.link}/`;
    },
    prevImagePath() {
      if (this.prevImage < 0) {
        return `${
          this.images[this.changeImageType(true)][
            this.images[this.changeImageType(true)].length - 1
          ].path
        }`;
      } else {
        return `${this.images[this.orientation][this.prevImage].path}`;
      }
    },
    nextImagePath() {
      if (!this.images || !this.images[this.orientation]) return false;
      if (this.nextImage > this.images[this.orientation].length - 1) {
        return `${this.images[this.changeImageType()][0].path}`;
      } else {
        return `${this.images[this.orientation][this.nextImage].path}`;
      }
    },
    image() {
      if ( !this.images ) return false;
      return this.images[this.orientation][this.getImageIndex];
    },
    imagePath() {
      if( !this.image ) { return ''; }
      return this.image.path;
    },
    imageCaption() {
      if( !this.image ) { return ''; }
      return this.image.caption;
    },
    routeBack() {
      if (!this.project) return "";
      return `/${this.type}/${this.project.link}`;
    }
  },
  watch: {
    'projects'(p) {
      if ( this.image === undefined ) {
        this.$router.replace('/'+this.$route.params.type+'/'+this.$route.params.project);
      }
    },
    image(i) {
      this.$emit("updateHead");
    },
    $route(to, from) {
      if (!this.images) return;

      if (from.params.image == this.prevImagePath) {
        this.trans = "fade-left";
      } else if (from.params.image == this.nextImagePath) {
        this.trans = "fade-right";
      }
      this.$nextTick(() => {
        this.$emit("updateHead");
      });
    }
  },
  methods: {
    keyPress() {
      window.onkeydown = event => {
        switch (event.keyCode) {
          case 27:
            this.$router.push(this.routeBack);
            break;
          case 37: // left
            this.goToPrevImage();
            break;
          case 38: // up
            this.goToPrevImage();
            break;
          case 39: // right
            this.goToImage();
            break;
          case 40: // down
            this.goToImage();
            break;
          default:
            return;
        }
      };
    },

    changeImageType(subtract) {
      let addIt = i => {
        let n = i + 1;

        if (subtract) {
          if (i - 1 < 0) {
            n = this.imageTypes.length - 1;
          } else {
            n = i - 1;
          }
        }

        return n % this.imageTypes.length;
      };

      // take advantage of blocking script

      let p = false;

      let num = addIt(this.imageTypes.indexOf(this.orientation));

      let t = () => {
        if (this.images[this.imageTypes[num]].length) {
          p = this.imageTypes[num];
        } else {
          num = addIt(num);
          t();
        }
      };

      t();

      return p;
    },

    goToImage() {
      this.$router.replace(
        {
          path: `${this.imageBase}${this.nextImagePath}`
        }
      );
    },

    goToPrevImage() {
      this.$router.replace(
        {
          path: `${this.imageBase}${this.prevImagePath}`
        }
      );
    },

    swipe(e) {
      // DIRECTION_NONE	1
      // DIRECTION_LEFT	2
      // DIRECTION_RIGHT	4
      // DIRECTION_UP	8
      // DIRECTION_DOWN	16
      // DIRECTION_HORIZONTAL	6
      // DIRECTION_VERTICAL	24
      // DIRECTION_ALL	30

      switch (e.direction) {
        case 4: // right
          this.goToPrevImage();
          break;
        case 2: // left
          this.goToImage();
          break;
        case 8: // up
          this.goToPrevImage();
          break;
        case 16: // down
          this.goToImage();
          break;
        default:
          // do nothing
          break;
      }
    }
  },

  beforeDestroy() {
    window.onkeydown = false;
    this.forceNoTouchMove = false;
    this.heightTrigger = false;
  },

  mounted() {
    this.keyPress();
    this.forceNoTouchMove = true;
    this.$nextTick(() => {
      this.heightTrigger = true;
    });
  }
};
</script>

<style lang="scss" >
</style>

<style lang="scss" scoped >

.bread {

}

.external {
  position: absolute;
  top: 0;
  left: 0;
  padding: 48px;

  background: transparent;
  color: white;
  z-index: 2;
  outline: 0;
  cursor: pointer;
  transition: color 200ms ease;
  height: 100%;
  border: 0;
  font-size: 48px;
  -webkit-tap-highlight-color: transparent;

  &:hover {
    color: darken(white, 20%);
  }

  &:focus {
    color: darken(white, 20%);
    filter: blur(2px);
  }

  &:nth-of-type(1) {
    left: auto;
    right: 0;
  }
  @media only screen and (max-width: 630px) {
    font-size: 24px;
    padding-right: 48px;
    padding-left: 8px;
    background: transparent;
    &:nth-of-type(1) {
      padding-left: 48px;
      padding-right: 8px;
    }
  }
}

@keyframes in {
  100% {
    opacity: 1;
  }
}

.close {
  cursor: pointer;
  position: fixed;
  top: 24px;
  right: 16px;
  opacity: 0;
  color: white;
  text-decoration: none;
  animation-name: in;
  animation-duration: 200ms;
  animation-fill-mode: forwards;
  animation-timing-function: ease;
  animation-delay: 700ms;
  background: rgba(black, 0.5);
  padding: 10px;
  font-size: 10px;
  z-index: 3;

  &:after {
    display: block;
    position: relative;
    right: 0;
    bottom: -10px;
    padding-top: 4px;
    padding-bottom: 4px;
    background: black;
  }
  > svg {
    width: 32px;
    height: 32px;
    fill: white;
    transition: fill 200ms ease;
    transition-property: fill, filter;
    filter: blur(0px);
  }
  &:focus,
  &:active {
    outline: 0;
    border: 0;
    > svg {
      fill: darken(white, 20%);
      filter: blur(2px);
    }
  }
  @media only screen and (min-width: 630px) {
    &:hover {
      > svg {
        fill: darken(white, 20%);
        filter: blur(2px);
      }
    }
  }

  @media only screen and (max-width: 630px) {
    // font-size:8px;
    // > svg {
    // 	width: 10px;
    // 	height:10px;
    // }
  }
}

.grid.mobile {
  // width: 40%;
  max-width: 180px;

  @media only screen and (min-width: 1100px) {
    @media only screen and (min-height: 420px) {
      max-width: 300px;
      width: 25%;
    }
  }

  @media only screen and (max-height: 420px) {
    width: 20%;
  }

  @media only screen and (min-width: 2000px) {
    @media only screen and (min-height: 420px) {
      max-width: 500px;
      width: 30%;
      max-width: 450px;
    }
  }
}

.grid,
.grid.horiz {
  position: absolute;
  width: 60%;
  left: 50%;
  top: 50%;
  display: block;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  grid-gap: 2rem;
  margin-bottom: 0;
  transform: translate3d(-50%, -50%, 0);

  > div {
    position: relative;
  }

  @media only screen and (max-width: 630px) {
    width: 80%;
  }

  @media only screen and (max-height: 420px) {
    width: 60%;
  }
}

.background {
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  background: rgba(black, 1);
  z-index: 100;
  overflow-y:hidden;
}

.swipe {
  position: absolute;
  z-index: 1;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
}
</style>
