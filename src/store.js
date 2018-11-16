import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios';
import router from '@/router';

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

        setToggleMenu( {context,commit,dispatch,state} ) {

            const scrollTop = () => {
                const el = document.scrollingElement || document.documentElement;
                return el.scrollTop
            }

            commit( 'toggleMenu' );

            setTimeout(()=> {

                if ( !state.noScroll ) {
                    commit('setLastScroll', {
                        last: scrollTop()
                    });
                }

                commit('toggleNoScroll');

            }, state.menuOpen ? 150 : 0 ); // roughly the menu animate time

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
                        commit('addProject', {'name': name, 'response': response } )
                    }
                } catch (error) {
                    // console.log(error);
                }
            }
        } // setProjects

    } // actions


});