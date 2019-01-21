<template>

  <div :class="['home', 'push', 'max-width' ]">

    <main :class="['flex-on-em']">

      <h2>View More Work</h2>
      <div>
        <div>
          <router-link
            name="Marketing"
            aria-label="Marketing"
            title="Marketing"
            :class="['external']"
            to="/marketing" >Marketing</router-link>
          <p>Marketing includes banner advertisements, one-page call to action, sales tools and much more!</p>
        </div>
        <div>
          <router-link
            name="Website"
            aria-label="Website"
            title="Website"
            :class="['external']"
            to="/website" >Website</router-link>
          <p>View projects created to be a standalone website. Websites display various technologies and CMS systems.</p>
        </div>
        <div>
          <router-link
            name="Interactive"
            aria-label="Interactive"
            title="Interactive"
            :class="['external']"
            to="/interactive" >Interactive / 3D</router-link>
          <p>Interactive projects have something more! These include 3d experiences and games.</p>
        </div>
        <div>
          <router-link
            name="Technology"
            aria-label="Technology"
            title="Technology"
            :class="['external']"
            to="/tech" >Technology</router-link>
          <p>View a stack of technologies used in my front-end development.</p>
        </div>
        <div>
          <a
            ref="noopener"
            name="Github"
            aria-label="Github"
            title="Github"
            :class="['external']"
            href="https://github.com/shawnnaquin" >Github</a>
          <p>View other projects on Github.</p>
        </div>
      </div>

    </main>

  </div>

</template>

<script>
import Header from "@/components/Header.vue";
import Nav from "@/components/Nav.vue";
import { mapGetters } from "vuex";

export default {
  name: "Home",
  components: {
    Header,
    Nav
  },
  watch:{
    '$store.state.openContact'(p) {
      this.$emit('updateHead');
    },
    '$route'() {
      this.$emit('updateHead');
    }
  },
  head: {
    title: function() {
      let t = this.$store.state.openContact ? 'Contact' : 'Home'
      return {
        inner: t
      };
    },
    meta: function() {

      let t = this.$store.state.openContact ? 'Contact' : 'Home'

      let image = window.metaImage;
      let title = t;
      let content = this.$store.state.openContact ? 'Contact Shawn for more details on any project, request a project, or contact even if you just want to chat!' : window.metaDescription;

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
          content: `https://devnola.com`
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
          href: `https://devnola.com/`,
          id: "canonical"
        }
      ];
    }
  },
  computed: {
    ...mapGetters(["getLoading"])
  },
  mounted() {
    setTimeout(() => {
      this.$store.dispatch("setLoading");
    }, 1000);
  }
};
</script>
<style lang="scss" scoped>
h2 {
  width: 100%;
  margin: 2rem auto;
  margin-bottom: 3rem;
  margin-top: 0;
  display: block;
}

.flex-on-em {
  // display: flex;
  justify-content: center;
  background: darken(white, 3%);
  margin: 2rem auto;
  padding: 2rem;
  max-width: 800px;

  .external {
    margin-bottom: 0;
    margin-top: 0;
    background: transparent;
  }
  > div {
    margin: 0 auto;
    flex-wrap: wrap;

    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    display: grid;
    justify-items: center;
    > div {
      max-width: 250px;
      margin-bottom: 1rem;
    }
  }
}
.external {
  display: inline-block;
  margin-top: 32px;
  margin-bottom: 64px;
}
</style>
