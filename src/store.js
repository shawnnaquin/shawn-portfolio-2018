import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    message: "",
    messageError: "false",
    projects: {},
    lastRoute: "/",
    openContact: false,
    loading: true,
    menuOpen: false,
    types: ["marketing", "interactive", "website"],
    sticky: false,
    modalOpen: false,
    videoPlaying: false,
    mainTrans: {
      trans: "fade-up",
      mode: ""
    }
  },

  getters: {
    getSticky: state => state.sticky,
    getMessage: state => state.message,
    getMessageError: state => state.messageError,
    getProject: state => p => {
      if (!state.projects[p.name]) {
        return false;
      } else if (p.name && p.project) {
        return state.projects[p.name][p.project];
      } else {
        return state.projects[p.name];
      }
    },

    getLoading: state => state.loading,
    getVideoPlaying: state => state.videoPlaying,
    getMenuOpen: state => state.menuOpen,
    getTrans: state => state.mainTrans,
    getTypes: state => state.types,
    getOpenContact: state => state.openContact,
    getLastRoute: state => state.lastRoute
  },

  mutations: {
    setVideoPlaying(state, p) {
      state.videoPlaying = p;
    },
    setLastRoute(state, p) {
      state.lastRoute = p;
    },
    setOpenContact(state, p) {
      state.openContact = p;
    },
    loading(state) {
      state.loading = state.loading === true ? !state.loading : state.loading;
    },
    setMessage(state,s) {
      state.message = s;
    },
    setMessageError(state,s) {
      state.messageError = s;
    },
    setSticky(state, s) {
      state.sticky = s;
    },
    addProject(state, payload) {
      Vue.set(state.projects, payload.name, payload.response.data);
    },

    toggleMenu(state) {
      state.menuOpen = !state.menuOpen;
    },

    toggleNoScroll(state) {
      state.noScroll = !state.noScroll;
    },

    setTrans(state, p = { trans: "fade-up", mode: "" }) {
      state.mainTrans = p;
    },
    setModalOpen(state, p) {
      state.modalOpen = p;
    },
    setProjects(state, p) {
      state.projects = p;
    }
  },

  actions: {
    openContact({ commit }, o) {
      commit("setOpenContact", o);
    },
    setToggleMenu({ commit, state }) {
      commit("toggleMenu");
    },

    setLoading(context) {
      context.commit("loading");
    },

    async setProjectsExec({ commit, state, dispatch }, name) {
      if (!state.types.includes(name)) {
        dispatch("setAllProjects");
        return;
      } else {
        try {
          const response = await axios.get(
            `${process.env.BASE_URL}json/${name}.json`
          );

          if (state.loading) {
            commit("addProject", { name: name, response: response });
            commit("loading");
          } else {
            commit("addProject", { name: name, response: response });
          }
        } catch (error) {
          dispatch("setAllProjects");
          // throw error;
        }
      }
    },

    setProjects({ state, dispatch }, name) {
      if (!state.projects[name]) {
        dispatch("setProjectsExec", name);
      }
    },

    setAllProjects({ state, dispatch }) {
      for (let t in state.types) {
        if (!state.projects[state.types[t]]) {
          dispatch("setProjectsExec", state.types[t]);
        }
      }
    }
  } // actions
});
