import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// Mutations
const SET_SITE_TITLE = 'SET_SITE_TITLE';

export default new Vuex.Store({
  state: {
    siteTitle: 'Sal a Gosto',
    user: null,
    showVideo: false,
  },
  getters: {
    isLoggedIn: (state) => !!state.user,
    getSiteTitle: (state) => state.siteTitle,
    isShowingVideo: (state) => state.showVideo,
  },
  mutations: {
    SET_SITE_TITLE: (state, title) => {
      state.siteTitle = title;
    },
  },
  actions: {
    setSiteTitle: ({ commit }, title) => {
      commit(SET_SITE_TITLE, title);
    },
  },
  modules: {
  },
});
