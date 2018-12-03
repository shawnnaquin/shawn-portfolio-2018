import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios';
import router from '@/router';

Vue.use(Vuex);

export default new Vuex.Store({

    state: {

        projects: {},
        lastRoute: '/',
        openContact: false,
        loading: true,
        menuOpen: false,
        noScroll: false,
        lastScroll: 0,
        types: [ 'marketing', 'interactive', 'website' ],
        sticky: false,
        resetScroll: false,
        mainTrans: {
            trans: 'fade-up',
            mode: ''
        },
    },

    getters: {

        getSticky: state => state.sticky,

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

        getMenuOpen: state => state.menuOpen,
        getTrans: state => state.mainTrans,
        getTypes: state => state.types,
        getResetScroll: state => state.resetScroll,
        getOpenContact: state => state.openContact,
        getLastRoute: state => state.lastRoute
    },

    mutations: {

        setLastRoute(state,p) {
            state.lastRoute = p;
        },
        setResetScroll(state,p) {
            state.resetScroll = p;
        },
        setOpenContact(state,p) {
            state.openContact = p;
        },
        loading(state) {
            state.loading = state.loading === true ? !state.loading : state.loading;
        },
        setSticky(state, s) {
            state.sticky = s;
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
        },

        setTrans(state, p = { trans: 'fade-up', mode: '' } ) {
            state.mainTrans = p;
        },

        setProjects(state,p) {
            state.projects = p;
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

        async setProjectsExec( {context,commit,state,dispatch}, name ) {

            if ( !state.types.includes(name) ) {
                dispatch('setAllProjects');
                return;
            } else {
                try {

                    const response = await axios.get( `${process.env.BASE_URL}json/${name}.json` );

                    if ( state.loading ) {
                            commit('addProject', {'name': name, 'response': response } )
                            commit('loading');
                    } else {
                        commit('addProject', {'name': name, 'response': response } )
                    }

                } catch (error) {
                    dispatch('setAllProjects');
                    // throw error;
                }
            }

        },

        setProjects( {context,commit,state,dispatch}, name ) {
            if( !state.projects[name] ) {
                dispatch('setProjectsExec', name );
            }
        },

        setAllProjects( {context,commit,state,dispatch} ) {

            for( let t in state.types ) {
                if ( !state.projects[ state.types[t] ] ) {
                    dispatch('setProjectsExec', state.types[t] );
                }
            }

        }

    } // actions


});