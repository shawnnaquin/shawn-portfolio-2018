<template>

  <div 
    :class="['max-width']" 
    style="overflow: hidden; min-height:520px" >

    <h1>
      Featured Web Technologies
    </h1>

    <techList :tech-list="localList" />

  </div>

</template>

<script>
import projects from "@/mixins/projects";
import techList from "@/components/techList";

export default {
  mixins: [projects],
  components: {
    techList
  },
  data() {
    return {
      localList: []
    };
  },
  head: {
    title: function() {
      return {
        inner: "Tech"
      };
    },
    meta: function() {
      let image = `https://devnola.com/img/meta/code.jpg`;
      let title = `Tech`;
      let content = "A full list of all technoligies displayed in Shawn's portfolio. Shawn's skill include JavaScript, HTML, and CSS but some other specialties include: Greensock, SVG, Webpack, VueJS, UX, performance testing, and accessibility."
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
          href: `https://devnola.com/tech`,
          id: "canonical"
        }
      ];
    }
  },
  mounted() {
    this.setCompileList(this.$store.state.projects);
    this.$scrollTo(":root");
  },
  watch: {
    "$store.state.projects"(p) {
      this.setCompileList(p);
    }
  },
  methods: {
    setCompileList(p) {
      if (Object.keys(p).length == this.$store.state.types.length) {
        this.compileList(p);
      }
    },

    compileList(p) {
      for (let type in p) {
        for (let project in p[type]) {
          let techList = p[type][project].content["techList"];
          for (let tech in techList) {
            this.addTechItem(techList[tech]);
          }
        }
      }
    },

    addTechItem(item) {
      if (!this.localList.includes(item)) {
        this.localList.push(item);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
h1 {
  text-align: center;
  margin-top: 74.5px;
  max-width: 75%;
  text-transform: capitalize;
  display: inline-block;
  width: auto;
  position: relative;
  @media only screen and (max-width: 630px) {
    font-size: 24px;
  }
}
</style>
