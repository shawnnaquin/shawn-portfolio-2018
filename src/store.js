import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({

  state: {
      projects: {}
  },

  getters: {

    projects: state => name => state.projects[name]

  },

  mutations: {

    addProject(state, payload) {
      Vue.set( state.projects, payload.name, payload.response.data);
    }

  },

  actions: {

      async setProjects( {context,commit,state}, name ) {
      if( !state.projects[name] ) {
        try {
          const response = await axios.get( `./json/${name}.json` );
          // setTimeout( ()=> { // test for loader
            commit('addProject', {'name': name, 'response': response } )
          // }, 5000 );
        } catch (error) {
          // console.log(error);
        }
      }
    }

  }


});