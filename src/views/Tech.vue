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
    link: function() {
      return [
        {
          rel: "canonical",
          href: `https://shawnnaquin.github.io/tech`,
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
