<template>

  <div 
    id="app" 
    :class="[{['no-scroll']: $store.state.noScroll } ]" >

    <Contact :showGeneralMessage="$store.state.showGeneralMessage" :generalMessage="$store.state.generalMessage"/>

    <transition name="fade" >
      <div 
        :class="[ 'loader' ]" 
        v-if="getLoading" 
        ref="background" 
        :style="{height:height}" >
        <p :class="[ 'paragraph' ]" >
          <span v-if="getLoading" >Loading <Loader :go="getLoading" /></span>
          <span v-else >Content Loaded!</span>
        </p>
      </div>
    </transition>

    <div :class="'flex-column'" >
      <Nav />
      <Header :loaded="!getLoading" />
    </div>

    <transition 
      :name="mainTrans.trans" 
      :mode="mainTrans.mode" 
      appear >
      <router-view/>
    </transition>

    <transition 
      name="fade" 
      appear >
      <button
        v-if="getSticky && $route.name != 'home' || getSticky && $route.name != 'contact' "
        v-scroll-to="{
          el: ':root',
          duration: 200,
          easing: 'ease-out'
        }"
        :class="['external', 'bottom' ]"
      >
        <up/>
      </button>
    </transition>

    <aside :class="[ 'aside' ]" >

      <div :class="['footer-buttons']" >
        <button 
          name="Resumé" 
          aria-label="Resumé" 
          title="Resumé" 
          @click="openContact(true)" 
          :class="['external']">Resumé</button>
        <button 
          name="Contact" 
          aria-label="Contact" 
          title="Contact" 
          @click="openContact(false)" 
          :class="['external']">Contact</button>
        <router-link 
          name="Technology List" 
          aria-label="Technology List" 
          title="Technology List" 
          v-if="$route.name != 'tech' " 
          :class="['external']" 
          to="/tech" >Technology List</router-link>
        <router-link 
          name="More Work" 
          aria-label="More Work" 
          title="More Work" 
          v-else 
          :class="['external']" 
          to="/marketing" >More Work</router-link>
      </div>

      <div :class="['footer-about']" >

        <p>

          Shawn is a Front-End developer focused on writing beautiful and maintainable Javascript, HTML, and CSS projects. More of his work can be found on Github. Some specialties include: Greensock, SVG, Webpack, Vue, UX, performance testing, and accesbility.

          <span v-if="$route.name != 'tech' " >
            Click below for <router-link 
              name="Technology List" 
              aria-label="Technology List" 
              title="Technology List" 
              to="/tech"> a complete list</router-link>
            of all technologies used in this portfolio!
          </span>
          <span v-else >
            Click below to see <router-link 
              name="Marketing" 
              aria-label="Marketing" 
              title="Marketing" 
              to="/marketing">more work</router-link> from Shawn's portfolio.
          </span>

        </p>

      </div>

    </aside>

    <footer :class="['footer']" >
      <div :class="['footer-copy']" ><small>Shawn Naquin | Front-End Portfolio | &copy; {{ getDate }}</small></div>
      <div :class="['footer-icons']">
        <a 
          href="#" 
          name="Github" 
          aria-label="Github" 
          title="Github" 
          :class="['footer-icon']" 
          target="_blank">
          <git />
        </a>

        <a 
          href="#" 
          name="LinkedIn" 
          aria-label="LinkedIn" 
          title="LinkedIn" 
          :class="['footer-icon']" 
          target="_blank">
          <lin />
        </a>

        <a 
          href="#" 
          name="Youtube" 
          aria-label="Youtube" 
          title="Youtube" 
          :class="['footer-icon']" 
          target="_blank">
          <you />
        </a>

        <a 
          href="#" 
          name="Behance" 
          aria-label="Behance" 
          title="Behance" 
          :class="['footer-icon']" 
          target="_blank">
          <be />
        </a>

        <a 
          href="#" 
          name="Email" 
          aria-label="Email" 
          title="Email" 
          :class="['footer-icon']" 
          target="_blank">
          <mail />
        </a>
      </div>
    </footer>

  </div>

</template>

<script>
// @ is an alias to /src
import Loader from "@/components/Loader";
import Nav from "@/components/Nav.vue";
import Header from "@/components/Header.vue";
import Contact from "@/components/Contact.vue";

import up from "@/components/icons/up";

import git from "@/components/icons/gitcat";
import lin from "@/components/icons/in";
import you from "@/components/icons/youtube";
import be from "@/components/icons/be";
import mail from "@/components/icons/mail";
import H from "@/mixins/height";
import { mapGetters } from "vuex";

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

export default {
  name: "Home",
  mixins: [H],

  computed: {
    ...mapGetters({
      getLoading: "getLoading",
      mainTrans: "getTrans",
      getSticky: "getSticky"
    }),

    getDate() {
      let d = new Date();
      return `${this.monthNames[d.getMonth()]} ${d.getFullYear()}`;
    }
  },

  data() {
    return {
      title: "home",
      mod: "",
      monthNames: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ]
    };
  },

  head: {
    title: function() {
      return {
        inner: this.title.capitalize()
      };
    },
    link: function() {
      return [
        {
          rel: "canonical",
          href: `https://shawnnaquin.github.io/${this.title}`,
          id: "canonical"
        }
      ];
    }
  },

  watch: {
    "$store.state.openContact"(o) {
      if (o) {
        this.title = "contact";
      } else {
        this.title = "home";
      }
      this.$nextTick(() => {
        this.$emit("updateHead");
      });
    },
    getLoading(l) {
      if (!l) {
        //destroy
        this.forceNoTouchMove = false;
        this.heightTrigger = false;
      } else {
        this.forceNoTouchMove = false;
        this.$nextTick(() => {
          this.heightTrigger = true;
        });
      }
    }
  },

  methods: {
    playMessage() {

      this.$store.state.showGeneralMessage = 'true';

      if ( this.$store.state.messageType == 'registered' && parseInt( (window.sessionStorage.getItem('registeredMessage') ) || 0 ) > 1 ) {
        this.$store.state.showGeneralMessage = '';
        this.$store.state.generalMessage = '';
        return;
      }

      this.$store.state.messageType = '';

      setTimeout(()=> {
        this.$store.state.showGeneralMessage = '';
        setTimeout(()=> {
          this.$store.state.generalMessage = '';
        }, 1000 );
      }, 2000 );
    },
    openContact(p) {
      const scrollTop = () => {
        const el = document.scrollingElement || document.documentElement;
        return el.scrollTop;
      };

      this.$store.commit("setLastScroll", {
        last: scrollTop()
      });

      if (p) {
        this.$router.push({
          query: Object.assign({}, this.$route.query, {
            subject: encodeURI("Resumé Request")
          })
        });
      }

      this.$nextTick(() => {
        this.$store.commit("setOpenContact", true);
      });
    }
  },
  watch: {
    '$store.state.loading'(l) {
      // console.log('loading');
      if ( !l && this.$store.state.generalMessage.length ) {
        this.playMessage();
      }
    },
    '$store.state.generalMessage'(m) {
      // console.log('message');
      if ( !this.$store.state.loading && m.length ) {
        this.playMessage();
      }
    }
  },
  mounted() {

    if (this.$route.name == "contact") {
      this.$store.commit("setOpenContact", true);
    }

    if (this.getLoading) {
      this.forceNoTouchMove = false;
      this.$nextTick(() => {
        this.heightTrigger = true;
      });
    }

  },

  components: {
    Contact,
    Loader,
    Header,
    Nav,
    up,
    git,
    lin,
    you,
    be,
    mail
  }
};
</script>

<style lang="scss" scoped >
.aside,
.footer {
  .external {
    font-weight: normal;
    font-size: 14px;
    padding: 8px 12px;
  }
}

.aside {
  padding: 24px;
  background: whitesmoke;
  text-align: left;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1rem;
  @media only screen and (max-width: 630px) {
    grid-template-columns: 1fr;
  }
  align-items: center;
  justify-items: center;
}

.footer-about {
  p {
    @media only screen and (min-width: 1400px) {
      width: 50%;
    }
  }
}

.footer-buttons {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 8px;
}

.footer-icon {
  margin-right: 12px;
  display: inline-block;
  height: 24px;
  width: auto;
  > svg {
    fill: lighten(black, 25%);
    width: auto;
    height: 100%;
    transform: scale(1);
    transition: transform 200ms ease;
    transition-property: transform, fill;
  }
  &:focus {
    > svg {
      transform: scale(1.2);
      fill: black;
    }
    outline: 0;
    border: 0;
  }
  @media only screen and (min-width: 630px) {
    &:hover {
      > svg {
        transform: scale(1.2);
        fill: black;
      }
    }
  }
}

.footer {
  padding: 16px;
  background: darken(white, 8%);
  color: black;
  text-align: left;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 2rem;
  @media only screen and (max-width: 630px) {
    grid-template-columns: 1fr;
    .footer-icons {
      order: 1;
    }
    .footer-copy {
      order: 2;
    }
  }
  grid-gap: 1rem;
  align-items: center;
  justify-items: center;
}

.bottom {
  position: fixed;
  bottom: 32px;
  right: 32px;
  padding: 8px 12px;
  cursor: pointer;
  svg {
    width: 32px;
    height: 32px;
    pointer-event: none;
  }

  @media only screen and (max-width: 1100px) {
    bottom: 8px;
    right: 8px;
    padding: 4px 6px;
    cursor: pointer;
    svg {
      width: 24px;
      height: 24px;
      pointer-event: none;
    }
  }
}

.no-scroll {
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.paragraph {
  color: white;
  margin: 0 auto;
}

.loader {
  background: black;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  height: 100%;
  width: 100%;
  color: white;
  display: flex;
  justify-content: center;
  flex-flow: column;

  p {
    position: absolute;
    left: 50%;
    transform: translate3d(-60%, 0, 0);
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
.max-width {
  max-width: 1440px;
  margin-left: auto !important;
  margin-right: auto !important;
}

body {
  // display: none;
  width: 100%;
  box-sizing: border-box;
  margin: 0;
  background: darken(white, 2%);
  min-height: 100%;
  transition: background 300ms ease;
  overflow-x:hidden;
}

#app {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  text-rendering: optimizeLegibility !important;
  -webkit-font-smoothing: antialiased !important;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin: 0 auto;
  width: 100%;
  overflow-x: hidden;
}

ul {
  padding-left: 0;
}

p {
  color: black;
}

p a {
  color: Purple;
  transition: color 100ms ease-out;
  outline: none;
  &:focus,
  &:active,
  &:hover {
    color: darken(Purple, 10%);
    transition-timing-function: ease-in;
  }
}

.flex-column {
  display: flex;
  flex-direction: column;
}

.external-span {
  font-size: 12px;
  margin-left: 2px;
  font-weight: normal;
  transform: translateY(-10%);
  display: inline-block;
  > svg {
    width: 12px;
  }
}
.external {
  display: inline-block;
  padding: 0.75rem 2rem;
  font-weight: bold;
  text-decoration: none;
  width: auto;
  background: darken(white, 5%);
  border: 1px solid darken(white, 10%);
  font-size: 16px;
  transition: border-color 150ms ease-out;
  color: black;
  outline: none;
  cursor: pointer;
  @media only screen and (min-width: 630px) {
    &:hover,
    &:active,
    &:focus {
      color: black;
      border-color: Purple;
      transition-timing-function: ease-in;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease-in;
  transition-delay: 0s;
}

.fade-leave-active {
  transition-timing-function: ease-out;
}

.fade-abs-enter-active,
.fade-abs-leave-active,
.fade-o-enter-active,
.fade-o-leave-active {
  position: absolute !important;
  top: 0;
  min-height: 100vh;
  width: 100%;
  z-index: 0;
  overflow: hidden;
  overflow-y: hidden;
  &:not(.background) {
    left: 50%;
    transform: translateX(-50%);
  }

  &:not(.project) {
    position: fixed !important;
  }
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.fade-abs-enter-active,
.fade-abs-leave-active {
  opacity: 1;
  transition: opacity 0.2s ease;
}

.fade-abs-enter,
.fade-abs-leave-to {
  opacity: 0;
}

.fade-o-enter-active,
.fade-o-leave-active {
  transition: opacity 0.2s ease;
}

.fade-o-leave-active {
}

.fade-o-enter,
.fade-o-leave-to {
  opacity: 0;
}

.fade-up-enter-active,
.fade-up-leave-active {
  transition: transform 0.2s ease;
  transition-property: transform, opacity;
}

.fade-up-enter-active {
  transition-timing-function: ease-out;
}
.fade-up-leave-active {
  transition-timing-function: ease-in;
}
.fade-up-enter {
  // transform: translateY(10%);
  opacity: 0;
}
.fade-up-leave-to {
  // transform: translateY(-20%);
  opacity: 0;
}
/*

enter ---- enter-to   leave ---- leave-to
|-----------------|   |-----------------|
enter-active         leave-active

*/

.fade-left-enter {
  transform: translateX(100%);
}
.fade-left-leave-to {
  transform: translateX(-100%);
}
.fade-left-enter-active,
.fade-left-leave-active {
  transition: transform 0.1s;
}

.fade-right-enter {
  transform: translateX(-100%);
}
.fade-right-leave-to {
  transform: translateX(100%);
}
.fade-right-enter-active,
.fade-right-leave-active {
  transition: transform 0.1s;
}

.grid {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  grid-gap: 2rem;
  margin-bottom: 4%;
  perspective: 1100px;
  > div {
    padding-bottom: 56.25%;
    transform-origin: center;
    transform: translate3d(0, 0, 0);
    transition: transform 150ms ease;
    &:hover {
      transform: translate3d(0, 0, 10px);
    }
  }

  source,
  img {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }

  @media only screen and (max-width: 630px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
}
@keyframes fadeInS {
  100% {
    opacity: 1;
  }
}
.grid.horiz {
  > div {
    padding-bottom: 56.1%;
    @media only screen and (min-width: 630px) {
      padding-bottom: 49.21%;
      background-image: url("~@/assets/ui/mobile.horiz.png");
      background-size: cover;
      background-position: center;
      opacity: 0;

      animation-name: fadeInS;
      animation-fill-mode: forwards;
      animation-duration: 2000ms;
    }
  }
}

.grid.mobile {
  width: 100%;
  grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));

  > div {
    padding-bottom: 177%;
    @media only screen and (min-width: 630px) {
      padding-bottom: 202.9%;
      background-image: url("~@/assets/ui/mobile.vert.png");
      background-size: cover;
      background-position: center;
    }
    opacity: 0;
    animation-name: fadeInS;
    animation-fill-mode: forwards;
    animation-duration: 2000ms;
  }
}

@media only screen and (min-width: 630px) {
  .grid.mobile {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
  .grid.horiz figure {
    width: 77.5%;
    height: 88%;
    left: 11%;
    top: 6%;
  }

  .grid.mobile figure {
    width: 88%;
    height: 77%;
    left: 5.5%;
    top: 11.25%;
  }
}
</style>
