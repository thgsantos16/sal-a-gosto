import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// Mutations
const SET_USER = 'SET_USER';
const SET_SITE_TITLE = 'SET_SITE_TITLE';
const CHANGE_VIDEO_INFO = 'CHANGE_VIDEO_INFO';
const CHANGE_VIDEO_DISPLAY = 'CHANGE_VIDEO_DISPLAY';

export default new Vuex.Store({
  state: {
    apiUrl: 'https://uzzye.com/connect/salagosto/api?token=uzzyeabuse&get',
    siteTitle: 'Sal a Gosto',
    user: null,
    showVideo: false,
    video: {},
  },
  getters: {
    isLoggedIn: (state) => !!state.user,
    getUser: (state) => state.user,
    getSiteTitle: (state) => state.siteTitle,
    isShowingVideo: (state) => state.showVideo,
    getVideo: (state) => state.video,
    getApiUrl: (state) => state.apiUrl,
  },
  mutations: {
    SET_SITE_TITLE: (state, title) => {
      state.siteTitle = title;
    },
    CHANGE_VIDEO_DISPLAY: (state, display) => {
      state.showVideo = display;
    },
    CHANGE_VIDEO_INFO: (state, video) => {
      state.video = video;
    },
    SET_USER: (state, user) => {
      state.user = user;
    },
  },
  actions: {
    setSiteTitle: ({ commit }, title) => {
      commit(SET_SITE_TITLE, title);
    },
    changeVideoInfo: ({ commit }, video) => {
      commit(CHANGE_VIDEO_INFO, video);
    },
    changeVideoDisplay: ({ commit }, display) => {
      commit(CHANGE_VIDEO_DISPLAY, display);
    },
    setUser: ({ commit }, user) => {
      commit(SET_USER, user);
    },
  },
  modules: {
  },
});
