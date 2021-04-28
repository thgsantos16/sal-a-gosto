import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// Mutations
const SET_USER = 'SET_USER';
const SET_REDIRECT = 'SET_REDIRECT';
const SET_TEACHERS = 'SET_TEACHERS';
const SET_SITE_TITLE = 'SET_SITE_TITLE';
const SET_VIDEO_STATE = 'SET_VIDEO_STATE';
const SET_LOADING_API = 'SET_LOADING_API';
const SET_CHOSEN_PLAN = 'SET_CHOSEN_PLAN';
const CHANGE_VIDEO_INFO = 'CHANGE_VIDEO_INFO';
const SET_CHOSEN_ADDRESS = 'SET_CHOSEN_ADDRESS';
const SET_ADDRESS_DETAILS = 'SET_ADDRESS_DETAILS';
const CHANGE_VIDEO_DISPLAY = 'CHANGE_VIDEO_DISPLAY';

export default new Vuex.Store({
  state: {
    apiUrl: window.location.hostname.includes('salagosto.com.br')
      ? 'https://salagosto.com.br/app/api?token=uzzyeabuse&get'
      : 'https://uzzye.com/connect/salagosto/api?token=uzzyeabuse&get',
    siteTitle: 'Sal a Gosto',
    user: localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user') as string)
      : null,
    chosenPlan: localStorage.getItem('chosenplan')
      ? localStorage.getItem('chosenplan')
      : null,
    chosenAddress: localStorage.getItem('chosenaddress')
      ? localStorage.getItem('chosenaddress')
      : null,
    addressDetails: localStorage.getItem('address')
      ? localStorage.getItem('address')
      : null,
    showVideo: false,
    video: {},
    redirect: null,
    loadingApi: false,
    teachers: [],
    playing: false,
  },
  getters: {
    isLoggedIn: (state) => !!state.user,
    getUser: (state) => state.user,
    getSiteTitle: (state) => state.siteTitle,
    isShowingVideo: (state) => state.showVideo,
    getVideo: (state) => state.video,
    getApiUrl: (state) => state.apiUrl,
    getChosenPlan: (state) => state.chosenPlan,
    getChosenAddress: (state) => state.chosenAddress,
    getAddressDetails: (state) => state.addressDetails,
    getRedirect: (state) => state.redirect,
    getTeachers: (state) => state.teachers,
    isLoadingApi: (state) => state.loadingApi,
    isPlaying: (state) => state.playing,
  },
  mutations: {
    SET_SITE_TITLE: (state, title) => {
      state.siteTitle = title;
    },
    SET_CHOSEN_PLAN: (state, plan) => {
      state.chosenPlan = plan;
    },
    SET_CHOSEN_ADDRESS: (state, address) => {
      state.chosenAddress = address;
    },
    SET_VIDEO_STATE: (state, video) => {
      state.playing = video;
    },
    SET_ADDRESS_DETAILS: (state, address) => {
      state.addressDetails = address;
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
    SET_REDIRECT: (state, redirect) => {
      state.redirect = redirect;
    },
    SET_TEACHERS: (state, teachers) => {
      state.teachers = teachers;
    },
    SET_LOADING_API: (state, loading) => {
      state.loadingApi = loading;
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
      if (user) localStorage.setItem('user', JSON.stringify(user));
      else localStorage.removeItem('user');
      commit(SET_USER, user);
    },
    setChosenPlan: ({ commit }, plan) => {
      localStorage.setItem('chosenplan', plan);
      commit(SET_CHOSEN_PLAN, plan);
    },
    setChosenAddress: ({ commit }, address) => {
      localStorage.setItem('chosenaddress', address);
      commit(SET_CHOSEN_ADDRESS, address);
    },
    setAddressDetails: ({ commit }, address) => {
      if (address) localStorage.setItem('address', JSON.stringify(address));
      else localStorage.removeItem('address');
      commit(SET_ADDRESS_DETAILS, address);
    },
    setRedirect: ({ commit }, redirect) => {
      commit(SET_REDIRECT, redirect);
    },
    setTeachers: ({ commit }, teachers) => {
      commit(SET_TEACHERS, teachers);
    },
    setLoadingApi: ({ commit }, loading) => {
      commit(SET_LOADING_API, loading);
    },
    setVideoState: ({ commit }, video) => {
      commit(SET_VIDEO_STATE, video);
    },
  },
  modules: {
  },
});
