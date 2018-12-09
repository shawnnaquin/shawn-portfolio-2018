import { mapGetters } from "vuex";

export default {
  data() {
    return {
      type: false,
      projectError: false,
      techList: []
    };
  },
  computed: {
    ...mapGetters(["getProject"]),

    projects() {
      if (!this.type) return false;

      let n = this.getProject({ name: this.type });

      if (!n) {
        // try to sort by route if no projects found!

        n = {};

        for (let type in this.$store.state.projects) {
          for (let project in this.$store.state.projects[type]) {
            let techList = this.$store.state.projects[type][project].content[
              "techList"
            ];

            let r = decodeURI(this.$route.params.type);
            // console.log( r )
            if (!this.$store.state.types.includes(r.toLocaleLowerCase())) {

              for (let tech in techList) {
                if ( !this.techList.includes( techList[tech] )) {
                  this.techList.push(techList[tech]);
                }
                if (
                  techList[tech].toLocaleLowerCase() == r.toLocaleLowerCase()
                ) {
                  n[project] = this.$store.state.projects[type][project];
                  n[project].type = type;
                } else {
                }
              }

            }
          }
        }
      }

      return n;
    },
    project() {
      if (!this.$route.params.project) return false;
      return this.projects[this.$route.params.project];
    },

    images() {
      if (!this.project) return false;

      return this.project.content.images.reduce(
        (result, item) => {
          if (item.path.includes("mobile")) {
            result.mobile.push(item);
          } else if (item.path.includes("horiz")) {
            result.horiz.push(item);
          } else {
            result.regular.push(item);
          }

          if (item.path.includes(`one.${this.$route.params.project}`)) {
            result.video = item.path;
          }

          return result;
        },
        { mobile: [], regular: [], horiz: [], video: false }
      );
    }
  },
  mounted() {
    this.setProjects(this.$route.params.type);
  },
  methods: {
    getType(name) {
      // console.log(name);
      if (this.$store.state.types.includes(this.type)) {
        return this.type;
      } else {
        return this.projects[name].type;
      }
    },
    setProjects(type) {
      this.type = type;
      this.$nextTick(() => {
        this.$store.dispatch("setProjects", type);
      });
    }
  }
};
