import { mapGetters } from "vuex";
// import store from '@/store';

// let protectRoute = (to,next,t) => {

//   let n;

//   if ( to.name == 'techtype' ) {
//     if ( store.state.types.includes(to.params.type) ) {
//       n = '/tech';
//     }
//     // console.log('has this', t);
//   }

//   if (
//     to.params.type !== "website" &&
//     to.params.type !== "marketing" &&
//     to.params.type !== "interactive" &&
//     to.name !== "tech" &&
//     to.name !== "techtype"
//   ) {
//     n = "/" + store.state.types[0];
//   }

//   if ( t && n ) {
//     t.$router.replace(n);
//   } else if ( n ) {
//     next(n);
//   } else {
//     next();
//   }

// };

export default {
  data() {
    return {
      type: false,
      projectError: false,
      projectContainer: {},
    };
  },
  computed: {
    ...mapGetters(["getProject"]),

    projects: {
      get() {
        return this.projectContainer
      },
      set(p) {
        this.projectContainer = p;
      }
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

  watch: {
    '$store.state.projects'(p) {
      this.type = this.$route.params.type; // SET TYPE REGARDLESS
      this.setProjects(this.$route.params.type);
    },
    '$route'(to,from){
      this.$store.dispatch("setProjects", to.params.type);
      console.log(this.projects);
    }
  },

  created() {
    this.setAllProjects(this.$route.params.type);
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
      let n = this.getProject({ name: type }); // only place using this method.

      // if (!n) {
      //   // try to sort by route if no projects found!
      //   n = {};

      //   for (let type in this.$store.state.projects) {
      //     for (let project in this.$store.state.projects[type]) {
      //       let techList = this.$store.state.projects[type][project].content[
      //         "techList"
      //       ];
      //       let r = decodeURI(this.$route.params.type);

      //       if (!this.$store.state.types.includes(r.toLocaleLowerCase())) {
      //         for (let tech in techList) {
      //           if (
      //             techList[tech].toLocaleLowerCase() == r.toLocaleLowerCase()
      //           ) {
      //             n[project] = this.$store.state.projects[type][project];
      //             n[project].type = type;
      //           }
      //         }
      //       }
      //     }
      //   }
      // }

      this.projects = n;

    },

    setAllProjects(type) {
      this.type = type;
      this.$store.dispatch("setProjects", type);
    }

  }

};
