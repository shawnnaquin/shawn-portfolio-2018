import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({

  state: {
      projects: {},
      loading: true,
      menuOpen: false,
      noScroll: false,
      lastScroll: 0
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

    getLoading: state => state.loading,

    getMenuOpen: state => state.menuOpen


  },

  mutations: {

    loading(state) {
      state.loading = state.loading === true ? !state.loading : state.loading;
    },

    addProject(state, payload) {
      Vue.set( state.projects, payload.name, payload.response.data);
    },

    toggleMenu(state) {
      state.menuOpen = !state.menuOpen;
    },

    toggleNoScroll(state) {
      state.noScroll = !state.noScroll;
    },

    setLastScroll(state, p) {
      state.lastScroll = p.last;
    }

  },

  actions: {

      setToggleMenu({context,commit,dispatch} ) {

        commit( 'toggleMenu' );
        dispatch( 'setToggleNoScroll' );

      },

      setToggleNoScroll( {context,commit,state} ) {
        
        const scrollTop = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop)

        if ( !state.noScroll ) {

          commit( 'setLastScroll', { 
              last: scrollTop  
            });
        }

        commit('toggleNoScroll');

        Vue.nextTick( ()=> {

          if ( !state.noScroll ) {
            document.getElementsByTagName('body')[0].style.overflowY = '';
            document.getElementsByTagName('html')[0].style.overflowY = '';

            document.getElementsByTagName('body')[0].style.height = '';
            document.getElementsByTagName('html')[0].style.height = '';

            document.getElementsByTagName('body')[0].style.top = '';
            document.getElementsByTagName('html')[0].style.top = '';

            document.getElementsByTagName('body')[0].style.left = '';
            document.getElementsByTagName('html')[0].style.left = '';

            document.getElementsByTagName('body')[0].style.position = '';
            document.getElementsByTagName('html')[0].style.position = '';

            window.pageYOffset = document.documentElement.scrollTop = document.body.scrollTop = state.lastScroll;
          } else {

            document.getElementsByTagName('body')[0].style.overflowY = 'hidden';
            document.getElementsByTagName('html')[0].style.overflowY = 'hidden';

            document.getElementsByTagName('body')[0].style.height = '100%';
            document.getElementsByTagName('html')[0].style.height = '100%';

            document.getElementsByTagName('body')[0].style.top = '0';
            document.getElementsByTagName('html')[0].style.top = '0';

            document.getElementsByTagName('body')[0].style.left = '0';
            document.getElementsByTagName('html')[0].style.left = '0';

            document.getElementsByTagName('body')[0].style.position = 'absolute';
            document.getElementsByTagName('html')[0].style.position = 'absolute';

          }

        });

      },

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