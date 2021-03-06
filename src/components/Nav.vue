<template>
  <div :class="['top', { ['sticky']: getSticky } ]">
    <transition
      name="fade"
      appear>
      <button
        role="button"
        tabindex="0"
        ref="hamburger"
        aria-label="Menu"
        :class="[ 'external', 'menu', { ['menu-open']: menuOpen } ]"
        v-if="!menuOpen"
        @click="toggleMenu()" >
        <hamburger/>
      </button>
    </transition>

    <div
      :class="['fake-nav']"
      ref="fakenav"/>

    <nav
      itemscope itemtype="http://www.schema.org/SiteNavigationElement"
      id="nav"
      :class="[ { ['menu-open']: menuOpen }, { ['sticky']: getSticky } ]"
      ref="nav" >
      <FocusLock
        :disabled="$store.state.modalOpen != 'nav' " >
        <ul>

          <transition name="fade">

            <li
              v-if="menuOpen"
              @click="toggleMenu()"
              :class="['dark']"
            >
              <button ref="close">Close X</button>
            </li>

          </transition>

          <transition name="fade">

            <li v-if="$route.name !== 'home' && $route.name !== 'contact' " 
              itemprop="name"
            >
              <router-link
                itemprop="url"
                tabindex="0"
                to="/"
                name="Home"
                aria-label="Home"
                title="Home"
                :class="[ { [ 'is-active' ]: isActive('/')} ]"
                @click.native="click('/')" >Home</router-link>
            </li>

          </transition>

          <li 
          itemprop="name"
          >

            <router-link
              itemprop="url"
              tabindex="0"
              to="/marketing"
              name="Marketing"
              aria-label="Marketing"
              title="Marketing"
              :class="[ { [ 'is-active' ]: isActive('/marketing')} ]"
              @click.native="click('/marketing')" >Marketing</router-link>

          </li>

          <li 
            itemprop="name"
          >

            <router-link
              itemprop="url"
              tabindex="0"
              to="/interactive"
              name="Interactive / 3D"
              aria-label="Interactive / 3D"
              title="Interactive / 3D"
              :class="[ { [ 'is-active' ]: isActive('/interactive')} ]"
              @click.native="click('/interactive')" >Interactive / 3D</router-link>

          </li>

          <li
            itemprop="name"
          >

            <router-link
              itemprop="url"
              tabindex="0"
              to="/website"
              name="Website"
              aria-label="Website"
              title="Website"
              :class="[ { [ 'is-active' ]: isActive('/website')} ]"
              @click.native="click('/website')" >Website</router-link>

          </li>


          <li
            itemprop="name"
          >

            <a
              itemprop="url"
              tabindex="0"
              href="https://github.com/shawnnaquin/"
              rel="noopener"
              name="Shawn's Github"
              title="Shawn's Github"
              aria-label="Shawn's Github"
              target="_blank"
            >
              <github/>&nbsp;<span :class="['external-span']" ><external/></span>
            </a>

          </li>

        </ul>
      </FocusLock>
    </nav>

    <BreadCrumb></BreadCrumb>

  </div>
</template>

<script>
import github from "@/components/icons/github";
import hamburger from "@/components/icons/hamburger";
import external from "@/components/icons/external";
import BreadCrumb from "@/components/BreadCrumb";
import { mapGetters } from "vuex";
import { debounce } from "lodash";
import FocusLock from "vue-focus-lock";

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

export default {
  components: {
    BreadCrumb,
    github,
    hamburger,
    external,
    FocusLock
  },

  data() {
    return {
      observer: null
    };
  },

  computed: {
    ...mapGetters({
      menuOpen: "getMenuOpen",
      getSticky: "getSticky"
    }),

    d() {
      return debounce(this.resizeFn, 50, { leading: true, trailing: true });
    }
  },

  watch: {
    $route() {
      if (this.$store.state.menuOpen) {
        setTimeout(() => {
          this.toggleMenu();
        }, 150);
      }
    },

    menuOpen(o) {
      if (o) {
        this.keyPress();
        this.openModal();
      } else {
        window.onkeydown = null;
        this.closeModal();
      }
    }
  },

  mounted() {
    this.resize();
    this.observe();
  },

  beforeDestroy() {
    window.removeEventListener("resize", this.d);
    this.observer.disconnect();
    if (this.getSticky) {
      this.$store.commit("setSticky", false);
    }
  },

  methods: {
    openModal() {
      this.$store.commit("setModalOpen", "nav");
      setTimeout(() => {
        if ( this.$refs.close ) {
          this.$refs.close.focus();
        }
      }, 1000);
    },
    closeModal() {
      this.$store.commit("setModalOpen", false);

      setTimeout(() => {
        let $a =
          document.activeElement ||
          document.querySelector('a[name="marketing"]');
        let $b = this.$refs.hamburger;
        if (window.innerWidth > 1100 && $a) {
          $a.focus();
        } else {
          $b.focus();
        }
      }, 300);
    },
    observe() {
      this.observer = new IntersectionObserver(entry => {
        entry.forEach(e => {
          if (e.intersectionRatio <= 0) {
            this.$store.commit("setSticky", true);
          } else {
            this.$store.commit("setSticky", false);
          }
        });
      });

      this.observer.observe(this.$refs.fakenav);
    },
    resizeFn() {
      if (!this.menuOpen) return;

      // console.log('happening');

      if (window.innerWidth >= 1100 && this.menuOpen) {
        this.toggleMenu();
        return;
      } else {
        return;
      }
    },

    resize() {
      window.addEventListener("resize", this.d);
    },

    isActive(r) {
      let t = "/" + this.$route.params.type == r;
      return r == this.$route.pat || t;
    },

    click(path) {
      // console.log(!path, this.$route.path);
      if (!path || path == this.$route.path) {
        this.toggleMenu();
      }
    },

    keyPress() {
      window.onkeydown = event => {
        if (event.keyCode == 27) {
          this.toggleMenu();
        }
      };
    },

    toggleMenu() {
      this.$store.dispatch("setToggleMenu");
    }
  }
};
</script>

<style lang="scss" scoped>
.menu {
  border: 1px solid transparent;
  transition: border 200ms ease;
  @media only screen and (min-width: 1100px) {
    &:focus,
    &:active {
      border: 1px solid Purple;
    }
  }
}

.fake-nav {
  position: absolute;
  top: 48px;
  left: 0;
  width: 1px;
  height: 1px;
  pointer-events: none;
}
@keyframes fadeIn {
  100% {
    opacity: 1;
  }
}

#nav {
  z-index: 2;
  order: 1;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  box-shadow: 2px 2px 3px rgba(black, 0.05);
  background: rgba(darken(white, 4%), 0.95);

  ul {
    margin: 0;
    display: flex;
    flex-direction: column;
  }

  li {
    text-align: center;
    background: darken(white, 5%);
    list-style: none;
    cursor: pointer;
    transition: background 200ms ease;
    margin: 0;
    padding: 0;
    padding-left: 0;
  }
  li.dark {
    background: black;
    button {
      color: white;
      &:focus,
      &:active {
        color: darken(aqua, 10%);
      }
      @media only screen and (min-width: 630px) {
        &:hover {
          color: darken(aqua, 25%);
        }
      }
    }
  }
  button,
  a {
    padding: 0.75rem 4rem;
    padding-left: 64px;
    display: inline-block;
    font-weight: bold;
    text-decoration: none;
    -webkit-tap-highlight-color: transparent;
    font-size: 16px;
    text-align: left;
    cursor: pointer;
    background: transparent;
    outline: none;
    border: 0;
    transition: color 200ms ease-in;
    color: black;
    &:focus {
      color: darken(aqua, 25%);
      > svg {
        color: darken(aqua, 25%);
        fill: darken(aqua, 25%);
      }
      .external-span svg {
        fill: darken(aqua, 25%);
      }
    }

    @media only screen and (min-width: 630px) {
      &:hover {
        color: darken(aqua, 25%);
        svg {
          fill: darken(aqua, 25%);
          color: darken(aqua, 25%);
        }
      }
    }

    svg {
      display: inline;
      height: 14px;
      width: auto;
      fill: black;
      transition: fill 200ms ease-in;
    }

    &.router-link-exact-active,
    &.is-active {
      // color:Purple;
      background: darken(white, 2%);
      svg {
        // fill: Purple;
      }
    }
  }
}

small {
  display: block;
  background: darken(white, 85%);
  color: darken(white, 10%);
  padding: 8px 16px;
}

@keyframes opacityIn {
  100% {
    opacity: 1;
  }
}

.external {
  border: 0;
  outline: 0;

  position: fixed;
  top: 0;
  left: 0;

  cursor: pointer;
  opacity: 0;
  background: rgba(gray, 0.1);

  color: white;
  font-weight: bold;

  padding: 4px 8px;
  margin-bottom: 0;
  margin-left: 0;
  margin-top: 0;
  z-index: 1;
  animation-name: opacityIn;
  animation-duration: 500ms;
  animation-delay: 0s;
  animation-fill-mode: forwards;
  animation-timing-function: ease-in;

  > svg {
    width: 42px;
    height: 42px;
    transition: width 200ms ease;
  }

  &.menu-open {
    pointer-events: none;
  }
}

// large up

@media only screen and (min-width: 1100px) {
  .top {
    padding-top: 0;
  }

  .external {
    opacity: 0;
    display: none;
  }

  #nav {
    &.sticky {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      li {
        button,
        a {
        }
      }
    }
    li.dark {
      display: none;
    }

    ul {
      order: 0;
      flex-direction: row;
      justify-content: center;
    }
    li {
      button,
      a {
        text-align: center;
      }
    }
  }
}

// small only

@media only screen and (max-width: 630px) {
  .top {
    &.sticky {
      // don't style this!

      .external {
        background: transparent;
        padding: 4px 6px;

        &:after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          height: 45px;
          width: 100vw;
          background: linear-gradient(
            to bottom,
            rgba(darken(white, 3%), 0.9),
            rgba(white, 0)
          );
          z-index: -1;
          pointer-events: none;
        }

        > svg {
          width: 24px;
          height: 24px;
        }
      }
    }
  }
}

@media only screen and (max-width: 1100px) {
  #nav {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
    z-index: 2;
    background: rgba(gray, 1);
    filter: blur(10px);
    opacity: 0;
    transform: translate3d(-100%, -25%, 0);
    transition: transform 200ms ease-out;
    // transition-property: transform, filter, opacity;
    transition-delay: 100ms, 0s, 60ms;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    overflow-x: hidden;

    &.menu-open {
      transform: translate3d(0, 0, 0);
      opacity: 1;
      filter: blur(0px);
      transition-timing-function: ease-in;
      transition-delay: 0s, 100ms, 40ms;
      li a,
      li button {
        padding: 1.5rem 4rem;
      }
    }

    ul {
      margin-bottom: 100px;
    }

    li {
      text-align: left;
      button,
      a {
        width: 100%;
      }
    }
  }
}
</style>
