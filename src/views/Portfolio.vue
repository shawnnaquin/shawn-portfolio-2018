<template>

  <div
    :class="['max-width']"
    style="overflow: hidden;" >

    <transition
      name="fade"
      mode="out-in"
      appear >
      <h1
        :key="type"
        class="push"
        v-if="type" >

        <b
          style=""
          v-if="!Object.keys(projects).length" >
          Loading Projects
        </b>

        <b v-else>
          {{ getTrueCaps(type) }} Projects
        </b>

        <transition name="fade" >
          <span v-if="!Object.keys(projects).length" >
            &hellip;
          </span>
        </transition>
      </h1>
    </transition>

    <main :style="{position:'relative'}">

      <transition
        :name=" 'fade' "
        appear >
        <p
          :key="type"
          v-if="!Object.keys(projects).length"
          :class="[ 'loading' ]">LOADING <Loader :go=" ( !Object.keys(projects).length ) " /> </p>
      </transition>

      <transition
        name="fade"
        mode="out-in"
        @afterEnter="pageAfterEnter"
        appear >

        <div
          :key="type"
          v-if="projects"
          :class="[
            'portfolio',
            direction,
            { ['one']: Object.keys(projects).length === 1 },
            { ['two']: Object.keys(projects).length === 2 },
            { ['three']: Object.keys(projects).length === 3 }
          ]"
          ref="portfolio"
        >

          <router-link
            v-for="p in projects"
            :to="`/${ getType( p.link ) }/${p.link}`"
            :class="[ 'link', p.link ]"
            :style="{ 'transitionDelay': String( ( getIndex(p.link) ) * 50 ) + 'ms' }"
            :data-name="p.link"
            :name="p.title"
            :aria-label="p.title"
            :title="p.title"
            :key="p.link"
          >
            <div :class="[ 'main-description' ]" >
              <h2>{{ p.title }}</h2>
              <small>{{ p.projectDescription }}</small>
            </div>

            <div :class="'image'" >
              <picture-query
                :type="getType( p.link )"
                :path="p.mainImage.path"
                :alt="p.mainImage.alt"
              >
                <h3>{{ p.mainImage.alt }}</h3>
                <p>{{ p.mainImage.caption }}</p>
              </picture-query>
            </div>
          </router-link>

        </div>

      </transition>

    </main>

    <transition
      name="fade"
      appear>
      <div
        :class="['buttons']"
        v-if="showButtons"
        :key="showButtons" >

        <router-link
          :name="prevType"
          :aria-label="prevType"
          :title="prevType"
          :to="`/${prevType}`"
          @click.native="setDirection('left')"
          :class="['external']">
          &lt;
        </router-link>

        <router-link
          :name="nextType"
          :aria-label="nextType"
          :title="nextType"
          :to="`/${nextType}`"
          @click.native="setDirection('right')"
          :class="['external']">
          &gt;
        </router-link>

      </div>
    </transition>

  </div>

</template>

<script>
import { mapGetters } from "vuex";
import Loader from "@/components/Loader.vue";
import Picture from "@/components/Picture.vue";
import animateIn from "@/mixins/animateIn";
import projects from "@/mixins/projects";
import store from "@/store";

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

export default {
  components: {
    Loader,
    "picture-query": Picture
  },

  data() {
    return {
      direction: "",
      showButtons: false
    };
  },

  head: {
    title: function() {
      return {
        inner: this.pageTitle
      };
    },
    meta: function() {
      let image = `https://devnola.com/img/meta/code.jpg`;
      let t = this.pageTitle;
      let title = `${t}${window.metaTitle}`;
      let content = `View Shawn's freelance ${t} portfolio projects. These ${t} projects demonstrate how various front-end technologies can be combined to display ${t} projects on your device. Please contact Shawn for more details.`
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
  computed: {
    ...mapGetters({
      getLoading: "getLoading",
      types: "getTypes",
      getTrans: "getTrans"
    }),
    typeKey() {
      let n = this.types.indexOf(this.$route.params.type);

      if (n === -1) {
        n = 0;
      }

      return n;
    },

    nextTypeKey() {
      return (1 + this.typeKey) % this.types.length;
    },

    prevTypeKey() {
      let k = this.typeKey - 1;
      if (k < 0) {
        k = this.types.length - 1;
      }
      return k;
    },

    prevType() {
      return this.types[this.prevTypeKey];
    },

    nextType() {
      return this.types[this.nextTypeKey];
    },
    pageTitle() {
      let n = this.getTrueCaps(this.type);
      if ( n && n.length ) {
        n = n.capitalize();
      }
      return this.type ? n : this.$route.params.type;
    }
  },
  beforeRouteEnter(to,from,next) {

    if (
      to.name == 'techtype' &&
      ( to.params.type == 'marketing' || to.params.type == 'website' || to.params.type == 'interactive' )
    ) {
      next("/tech");
    }

    if (
      to.params.type !== "website" &&
      to.params.type !== "marketing" &&
      to.params.type !== "interactive" &&
      to.name !== "tech" &&
      to.name !== "techtype"
    ) {
      next("/" + store.state.types[0]);
    } else {
      next();
    }
  },
  beforeRouteUpdate(to,from,next) {
    this.showButtons = false;
    next();
    if (
      to.name == 'techtype' &&
      ( to.params.type == 'marketing' || to.params.type == 'website' || to.params.type == 'interactive' )
    ) {
      this.$router.replace("/tech");
    }
    if (
      to.params.type !== "website" &&
      to.params.type !== "marketing" &&
      to.params.type !== "interactive" &&
      to.name !== "tech" &&
      to.name !== "techtype"
    ) {
      this.$router.replace("/" + store.state.types[0]);
    } else {
      next();
    }

  },
  beforeRouteLeave(to,from,next) {
      if (
        to.name == 'techtype' &&
        ( to.params.type == 'marketing' || to.params.type == 'website' || to.params.type == 'interactive' )
      ) {
        this.$router.replace("/tech");
      }

      if ( !to.params.type ){
        next();
      }

      if (
        to.params.type &&
        to.params.type !== "website" &&
        to.params.type !== "marketing" &&
        to.params.type !== "interactive" &&
        to.name !== "tech" &&
        to.name !== "techtype"
      ) {
        this.$router.replace("/" + store.state.types[0]);
      } else {
        this.direction = "";
        this.showButtons = false;
        let t = 0;

        if ( this.$refs.portfolio && this.$refs.portfolio.children && to.params.project ) {
          for (let c of this.$refs.portfolio.children) {
            c.style.transition = "opacity 200ms ease-out";
            c.style.transitionDelay = t * 50 + "ms";

            if (c.getAttribute("data-name") != to.params.project) {
              c.style.opacity = 0;
            }

            t++;
          }
        }

        setTimeout(() => {
          next();
        }, t * 50 + 100);
      }

  },
  mixins: [animateIn, projects],
  created() {

    if (
      this.$route.name == 'techtype' &&
      ( this.$route.params.type == 'marketing' || this.$route.params.type == 'website' || this.$route.params.type == 'interactive' )
    ) {
      this.$router.replace("/tech");
    }

    if (
      this.$route.params.type !== "website" &&
      this.$route.params.type !== "marketing" &&
      this.$route.params.type !== "interactive" &&
      this.$route.name !== "tech" &&
      this.$route.name !== "techtype"
    ) {
      this.$router.replace("/" + store.state.types[0]);
    }

  },
  mounted() {
    this.showButtons = true;
  },

  watch: {
    $route(to) {
      this.setProjects(to.params.type);
      this.$emit("updateHead");
    },
    projects(p) {
      let k = this.typeKey - 1;
      if (k < 0) {
        k = this.types.length - 1;
      }
      if ( this.$route.name == 'techtype' && !Object.keys(p).length && this.techList.length ) {
        this.$router.replace('/tech');
      }
    }
  },

  methods: {
    pageAfterEnter() {
      this.direction = "";
      this.showButtons = true;
      this.$scrollTo(":root");
    },

    getTrueCaps(type) {
      if (!Object.keys(this.projects).length) return;

      let t = this.projects[Object.keys(this.projects)[0]].content["techList"];
      let n = null;

      for (let i = 0; i < t.length; i++) {
        if (type.toLocaleLowerCase() == t[i].toLocaleLowerCase()) {
          return (n = t[i]);
        }
      }

      if (n === null) {
        return type.capitalize();
      }
    },

    setDirection(d) {
      this.direction = d;
      return;
    },

    getIndex(name) {
      return Object.keys(this.projects).indexOf(name);
    }
  }
};
</script>

<style lang="scss" >
.portfolio {
}
</style>

<style lang="scss" scoped>
.buttons {
  margin: 48px auto;
  margin-bottom: 64px;
}
.portfolio {
  padding: 0 10%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 2rem;

  @media only screen and (max-height: 420px) {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  }

  @media only screen and (min-width: 630px) {
    &.one,
    &.two,
    &.three {
      grid-template-columns: unset;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      > a {
        flex-basis: 30%;
        max-width: 300px;
        margin-left: 1%;
        margin-right: 1%;
      }
    }

    &.one {
    }
    &.two {
    }
    &.three {
    }
  }

  &.fade-enter-active {
    transition-delay: 0s;
  }

  &.fade-leave-active {
    transition-delay: 300ms;
  }

  &.fade-leave-active,
  &.fade-enter-active {
    > a {
      transition: transform 200ms ease;
      transition-property: opacity, transform;
    }
  }

  &.fade-enter,
  &.fade-leave-to {
    > a {
      opacity: 0;
    }
  }

  &.left.fade-enter,
  &.left.fade-leave-to {
    > a {
      transform: translateX(100%);
    }
  }

  &.right.fade-leave-to,
  &.right.fade-enter {
    > a {
      transform: translateX(-100%);
    }
  }
}

h1 {
  text-align: left;
  margin-top: 74.5px;
  max-width: 75%;
  @media only screen and (max-width: 630px) {
    font-size: 24px;
  }
}

h1,
.loading {
  text-transform: capitalize;
  display: inline-block;
  width: auto;
  position: relative;
  span {
    position: absolute;
    right: -16px;
    bottom: 0px;
  }
}
h2 {
  font-size: 1.25rem;
}
.loading {
  display: block;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

h1 span {
  right: -36px;
}

/*
router-link
	figure
		picture
			source
			img
		figcaption
			h2
			p
*/
a {
  text-decoration: none;
  text-align: left;
  border: 1px solid rgba(black, 0.1);
  color: black;

  &:active,
  &:visited,
  &:focus {
    color: black;
  }
  &:focus {
    border: 0;
    outline: 0;
    border: 1px solid Purple;
  }
  @media only screen and (min-width: 630px) {
    &:hover {
      border-color: rgba(black, 0.4);
      border-size: 2;
    }
  }
}

.link {
  display: flex;
  flex-flow: wrap;
  align-content: space-between;
}

.image {
  position: relative;
  width: 100%;
  padding-bottom: 50%;
  @media only screen and (min-width: 630px) {
    padding-bottom: 120%;
  }
}

.main-description {
  margin: 8px auto;
  padding-left: 16px;
  padding-right: 16px;
  padding-bottom: 16px;
  font-size: 16px;
}
</style>
