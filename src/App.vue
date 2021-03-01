<template>
  <div id="app">

    <vue-headful
      :title="getSiteTitle"/>

    <transition appear name="slow-fade">
      <header-component />
    </transition>

    <transition name="slow-fade" mode="out-in" appear>
      <router-view />
    </transition>

    <transition appear name="slow-fade">
      <footer-component />
    </transition>

    <transition appear name="slow-fade">
      <video-component v-if="isShowingVideo" />
    </transition>
  </div>
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import VideoComponent from './components/VideoComponent.vue';
import HeaderComponent from './components/HeaderComponent.vue';
import FooterComponent from './components/FooterComponent.vue';

@Component({
  components: {
    VideoComponent,
    HeaderComponent,
    FooterComponent,
  },
  computed: {
    ...mapGetters(['isShowingVideo', 'getSiteTitle']),
  },
})
export default class App extends Vue {

}
</script>

<style lang="scss">

@font-face {
    font-family: 'Gilroy';
    src: url('./assets/fonts/Gilroy-Light.eot');
    src: url('./assets/fonts/Gilroy-Light.eot?#iefix') format('embedded-opentype'),
        url('./assets/fonts/Gilroy-Light.woff2') format('woff2'),
        url('./assets/fonts/Gilroy-Light.woff') format('woff'),
        url('./assets/fonts/Gilroy-Light.ttf') format('truetype'),
        url('./assets/fonts/Gilroy-Light.svg#Gilroy-Light') format('svg');
    font-weight: 300;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'Gilroy';
    src: url('./assets/fonts/Gilroy-ExtraBold.eot');
    src: url('./assets/fonts/Gilroy-ExtraBold.eot?#iefix') format('embedded-opentype'),
        url('./assets/fonts/Gilroy-ExtraBold.woff2') format('woff2'),
        url('./assets/fonts/Gilroy-ExtraBold.woff') format('woff'),
        url('./assets/fonts/Gilroy-ExtraBold.ttf') format('truetype'),
        url('./assets/fonts/Gilroy-ExtraBold.svg#Gilroy-ExtraBold') format('svg');
    font-weight: 800;
    font-style: normal;
    font-display: swap;
}

body {
  background-color: #1a1a1a !important;
  background-image: url(./assets/texture.png);
}

#app {
  font-family: 'Gilroy', Avenir, Helvetica, Arial, sans-serif;
  letter-spacing: 1px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #EEE;

  .button {
    transition: all 0.43s;
    background-color: #e00109;
    border: none;
    border-radius: 27px;
    color: #FFF;
    padding: 12px 52px;

    &:hover {
      background-color: #bd0809;
      color: #FFF;
    }
  }

  input {
    transition: all 0.43s;
    display: block;
    width: 100%;
    border: 2px solid #dededf;
    color: #FFF;
    background-color: transparent;
    border-radius: 27px;
    padding: 12px 16px;
    margin: 10px 0;

    &:focus {
      border-color: #e22229;
    }
  }

  .custom-checkbox {
    display: inline-block;
    width: 30px;
    height: 30px;
    border: 2px  solid #dededf;
    border-radius: 50%;
    vertical-align: bottom;
    margin-bottom: -2px;
    margin-right: 7px;
    cursor: pointer;

    &.selected {
      &:before {
        content: "";
        display: inline-block;
        width: 17px;
        height: 17px;
        background: #e00109;
        border-radius: 50%;
        margin: 5px 0 0 5px;
      }
    }
  }

  :focus {
    outline: none;
  }

  a {
    transition: all 0.43s;
    color: #FFF;
    text-decoration: none;

    &:hover {
      color: #e22229;
    }
  }
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .43s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

.slow-fade-enter-active, .slow-fade-leave-active {
  transition: opacity .7s;
}
.slow-fade-enter, .slow-fade-leave-to {
  opacity: 0;
}

</style>
