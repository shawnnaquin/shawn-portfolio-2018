import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({

  state: {
      projects: {},
      loading: true
  },

  getters: {

    getProject: state => (p) => {
      if ( !state.projects[ p.name ] ) {
        return false;
      } else if ( p.name && p.project ) {
        return state.projects[ p.name ][ p.project ];
      } else {
        return state.projects[ p.name ]
      }
    },
    getLoading: state => state.loading

  },

  mutations: {

    loading(state) {
      state.loading = state.loading === true ? !state.loading : state.loading;
    },

    addProject(state, payload) {
      Vue.set( state.projects, payload.name, payload.response.data);
    }

  },

  actions: {

      setLoading(context) {
        context.commit( 'loading' );
      },

      async setProjects( {context,commit,state}, name ) {

        if( !state.projects[name] ) {
          try {
            const response = await axios.get( `/json/${name}.json` );

            if ( state.loading ) {
              setTimeout( ()=> {
                commit('loading');
                commit('addProject', {'name': name, 'response': response } )
              }, 300 );
            } else {
              // setTimeout( ()=> { // test for loader
              // }, 5000 );
              commit('addProject', {'name': name, 'response': response } )
            }

          } catch (error) {
            // console.log(error);
          }
        }

      }

  }


});