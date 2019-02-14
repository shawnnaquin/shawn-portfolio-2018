<template>

  <main
    :class="[ 'project', 'max-width' ]"
    style="overflow: hidden;" >

    <transition
      :name="mainTrans.trans"
      :mode="mainTrans.mode"
      appear
      @afterLeave="pageAfterLeave"
      @enter="pageEnter" >

      <article
        class=""
        v-if="show" >

        <transition
          name="fade"
          appear
          mode="out-in">
          <div
            :style="{minHeight:'500px'}"
            v-if="!project"
            :class="['article-header']">
            <div>
              <h1>
                Project Loading
                <transition name="fade" >
                  <span v-if="!project">
                    &hellip;
                  </span>
                </transition>
              </h1>
            </div>
            <p
              :class="[ 'loading' ]"
            >
              LOADING
              <Loader :go=" !project " />
            </p>

          </div>

          <div
            v-else
            :class="[ 'article-header' ]"
          >

            <transition
              name="fade"
            >
              <div v-if="$store.state.videoPlaying" @click="hideBackground()" :class="['background', { ['show']: $store.state.videoPlaying } ]"> </div>
            </transition>

            <transition
              name="fade"
              appear
              mode="out-in" >
              <div>
                <h1> {{ project.title }}</h1>
                <p>{{ project.projectDescription }}</p>
              </div>
            </transition>

            <youtube-video
              :class="['video']"
              v-if="project.content.video.length"
              :video-id="project.content.video"
              :video-img=" `https://www.devnola.com${getBase}${ type }/${ images.video }`"
              :video-title="project.title"
              :video-description="project.projectDescription"
              :style="{zIndex:1}"
            />

            <div
              v-if="project && ( project.content.code || project.content.externalSite )"
              class="buttons" >

              <a
                ref="noopener"
                :href="project.content.externalSite"
                v-if="project.content.externalSite"
                target="_blank"
                :class="[ 'external' ]" > Live Site <span :class="['external-span']"><external/></span> </a>
              &nbsp;

              <a
                :href="project.content.code"
                ref="noopener"
                v-if="project.content.code"
                target="_blank"
                :class="[ 'external' ]" >
                //code
              </a>

            </div>

            <div :class="[ 'built-with' ]" >

              <h2>
                Built With:
              </h2>

              <techList :tech-list="project.content.techList" />

            </div>

          </div>

        </transition>

        <div
          :class="[ 'image-container' ]"
          v-if="images.mobile && images.mobile.length" >

          <transition-group
            name="staggered-fade"
            tag="div"
            :css="false"
            @before-enter="beforeEnter"
            @enter="enter"
            @leave="leave"
            :class="[ 'mobile', 'grid' ]"
          >

            <div
              v-for=" (image,i) in images.mobile"
              style="position:relative;"
              :data-index="i"
              :key="image.path"
              v-if="phoneVertLoaded"
            >

              <router-link
                :name="image.path"
                :arial-label="image.path"
                :title="image.path"
                :to=" {
                  path: `/${type}/${project.link}/${image.path}`
                }"
                :class="['link']"
              >
                <picture-query
                  :type="type"
                  :path="image.path"
                  :alt="image.alt"
                >
                  {{ image.caption }}
                </picture-query>
              </router-link>
            </div>

          </transition-group>

        </div>

        <div
          :class="[ 'image-container' ]"
          v-if="images.horiz && images.horiz.length" >

          <transition-group
            name="staggered-fade"
            tag="div"
            :css="false"
            @before-enter="beforeEnter"
            @enter="enter"
            @leave="leave"
            :class="[ 'horiz', 'grid' ]"
          >

            <div
              v-for=" (image,i) in images.horiz"
              style="position:relative;"
              :data-index="i"
              :key="image.path"
              v-if="phoneVertLoaded"
            >
              <router-link
                :to=" {
                  path: `/${type}/${project.link}/${image.path}`
                }"
                :class="['link']"
                :name="image.path"
                :arial-label="image.path"
                :title="image.path"
              >
                <picture-query
                  :type=" type "
                  :path=" image.path "
                  :alt="image.alt"
                >
                  {{ image.caption }}
                </picture-query>
              </router-link>
            </div>

          </transition-group>

        </div>

        <div
          :class="[ 'image-container' ]"
          v-if="images.regular && images.regular.length" >

          <transition-group
            name="staggered-fade"
            tag="div"
            :css="false"
            @before-enter="beforeEnter"
            @enter="enter"
            @leave="leave"
            :class="[ 'grid' ]"
          >

            <div
              v-for=" (image,i) in images.regular"
              style="position:relative;"
              :data-index="i"
              :key="image.path"
              v-if="phoneVertLoaded"
              :style="{ paddingBottom: project.content.imageRatio }"
            >
              <router-link
                :to=" {
                  path: `/${type}/${project.link}/${image.path}`
                }"
                :class="['link']"
                :name="image.path"
                :arial-label="image.path"
                :title="image.path"
              >
                <picture-query
                  :type=" type "
                  :path=" image.path "
                  :alt="image.alt"
                >
                  {{ image.caption }}
                </picture-query>
              </router-link>
            </div>

          </transition-group>

        </div>
        <transition
          name="fade"
          appear >
          <div
            v-if="showBlurb && project"
            :class="[ 'article-header' ]"
            style="transition-delay: 1000ms" >

            <p
              v-if="project.content.article"
              :class="['description']"
              v-html="project.content.article" />

            <div class="buttons" >

              <router-link
                :name="prevProject.title"
                :aria-label="prevProject.title"
                :title="prevProject.title"
                :to="`/${type}/${ prevProject.link }`"
                :class="['external']">
                &lt;
              </router-link>

              <router-link
                :name="nextProject.title"
                :aria-label="nextProject.title"
                :title="nextProject.title"
                :to="`/${type}/${ nextProject.link }`"
                :class="['external']">
                &gt;
              </router-link>

            </div>

          </div>
        </transition>
      </article>
    </transition>
  </main>

</template>

<script>
import YoutubeVideo from "@/components/YoutubeVideo";
import Picture from "@/components/Picture.vue";

import Loader from "@/components/Loader.vue";
import external from "@/components/icons/external";
import techList from "@/components/techList";
import PhoneVert from "@/assets/ui/mobile.vert.png";
import PhoneHoriz from "@/assets/ui/mobile.horiz.png";

import animateIn from "@/mixins/animateIn";
import projects from "@/mixins/projects";
import stripHtml from "string-strip-html";

import { mapGetters } from "vuex";

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

export default {
  components: {
    Loader,
    "picture-query": Picture,
    "youtube-video": YoutubeVideo,
    external,
    techList
  },

  mixins: [animateIn, projects],
  computed: {
    ...mapGetters({
      getLoading: "getLoading",
      mainTrans: "getTrans",
      getSticky: "getSticky"
    }),
    getBase() {
      return `${process.env.BASE_URL}img/portfolio/`;
    },
    getStartProjectKey() {
      return Object.keys(this.projects).indexOf(this.startProject);
    },

    projectNames() {
      if (!this.projects) return;
      return Object.keys(this.projects);
    },

    projectKey() {
      if (!this.project) return;
      let k = this.projectNames.indexOf(this.project.link);
      return k;
    },

    nextProjectKey() {
      if (
        this.projectKey === undefined ||
        this.projectKey === null ||
        this.projectKey === false
      )
        return;

      let k = (1 + this.projectKey) % this.projectNames.length;
      return k;
    },

    nextProject() {
      if (!this.projects) return;
      return this.projects[this.projectNames[this.nextProjectKey]];
    },

    prevProjectKey() {
      if (!this.projects) return;
      let prev = this.projectKey - 1;
      if (prev < 0) {
        prev = this.projectNames.length - 1;
      }
      return prev;
    },

    prevProject() {
      if (!this.projects) return;
      return this.projects[this.projectNames[this.prevProjectKey]];
    },
    pageTitle() {
      return this.project ? this.project.title : this.$route.params.project;
    }
  },

  beforeRouteUpdate(to, from, next) {
    if (!this.nextProject) {
      next();
    }

    if (to.params.project == this.nextProject.link) {
      this.$store.commit("setTrans", { trans: `fade-right`, mode: "" });
    } else {
      this.$store.commit("setTrans", { trans: `fade-left`, mode: "" });
    }

    this.$nextTick(() => {
      this.show = false;
      next();
    });
  },

  data() {
    return {
      phoneHorizLoaded: false,
      phoneVertLoaded: false,
      show: false, // show the page
      showBlurb: false,
      direction: "",
    };
  },
  head: {
    title: function() {
      return {
        inner: this.pageTitle
      };
    },
    script: function() { 
      return [
        {type: 'text/javascript', inner: ""}
      ];
    },
    meta: function() {

      let image = `https://devnola.com/img/portfolio/${this.type}/${this.images.video}-lg_2x.jpg`;
      let title = `${this.pageTitle}${window.metaTitle}`;
      let content = this.project ? stripHtml(this.project.content.article) : '';

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
          content: content
        },
        {
          id: 'item-description',
          itemprop: 'description',
          content: content
        },
        {
          id:'twitter-description',
          name: 'twitter:description',
          content: content
        },
        {
          id: 'og-url',
          property:'og:url',
          content: `https://devnola.com${this.$route.path}`
        },
        {
          id: 'og-description',
          property:'og:description',
          content: content
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
          href: `https://devnola.com${this.$route.path}`,
          id: "canonical"
        }
      ];
    }
  },
  mounted() {
    this.checkPhone();
    this.startProject = this.$route.params.project;
    this.show = true;
    // console.log( this.getBase );
  },
  watch: {
    $route(to) {
      this.title = to.params.project;
      this.$nextTick(() => {
        this.$emit("updateHead");
      });
    },
    "$store.state.projects"() {
      if (!this.projectNames.includes(this.$route.params.project)) {
        this.$router.replace(`/${this.$route.params.type}`);
      }
    }
  },
  methods: {
    hideBackground() {
      this.showBackground = false;
      window.YTPlayerShawn.pauseVideo();
    },
    pageEnter(el, done) {
      setTimeout(() => {
        this.showBlurb = true;
        document.body.style.height = "";
        done();
      }, 100);
    },

    pageAfterLeave() {
      this.show = true;
    },

    checkPhone() {
      let imgVert = new Image();
      imgVert.src = PhoneVert;
      imgVert.onload = () => {
        this.phoneVertLoaded = true;
        return;
      };

      let imgHoriz = new Image();
      imgHoriz.src = PhoneHoriz;
      imgHoriz.onload = () => {
        this.phoneHorizLoaded = true;
        return;
      };
    }
  }
};
</script>

<style lang="scss" scoped >

.background {
  background:
    radial-gradient(
      ellipse at center,
      rgba(0,0,0,1) 0%,
      rgba(0,0,0,0.85) 50%,
      rgba(0,0,0,1) 100%
    );
  z-index: 1;
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  pointer-events:none;

  &.show {
    pointer-events:auto;
    cursor:pointer;
  }

}

.loading {
  margin-top: 112px;
}

.link {
  display: block;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  border: 1px solid transparent;
  transition: border 100ms ease;
  &:focus {
    border: 1px solid Purple;
    outline: 0;
  }
}

h1 {
  // font-size:32px;
}
h3 {
  // margin-bottom:65px;
}

.built-with {
  margin-top: 0;
  transform: translateY(-5px);
  padding-top: 24px;
}

.image-container {
  align-self: normal;
  > .grid {
    &.horiz {
      @media only screen and (max-width: 630px) {
        > div {
          display: none;
        }
      }
    }
    &:not(.horiz) {
      > div {
        @media only screen and (max-width: 630px) {
          display: none;
          &:nth-child(1),
          &:nth-child(2) {
            display: block;
          }
        }
        // @media only screen and (min-width:630px) {
        // display:block;
        // }
      }
    }
  }
}

.grid.mobile,
.grid.horiz {
  .link {
    border-radius: 30px;
  }
}

.images {
  line-height: 0;
  column-count: 5;
  column-gap: 0;
  column-count: 3;
}
img {
  width: 100% !important;
  height: auto !important;
}

article {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 10%;

  @media only screen and (max-width: 1100px) {
    text-align: left;
  }
}

.article-header {
  padding-bottom: 5%;
  width: 100%;
  margin-top: 64px;
  &.no-padding {
    padding-bottom: 0;
  }
  .buttons {
    h1,
    h2,
    h3,
    h4 {
      margin-top: 0;
    }
    a,
    button {
      margin-top: 32px;
      font-size: 18px;
      margin-bottom: 12px;
    }
  }
}
.description {
  display: inline-block;
  column-count: 1;
  text-align: center;
  font-size: 18px;
  line-height: 1.4;
  text-align: left;
  max-width: 600px;
  @media only screen and (min-width: 630px) {
    column-count: 1;
  }

  // @media only screen and (min-width:1100px) {
  // 	column-count:3;
  // }
}
</style>
