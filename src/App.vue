<template>
  <div id="app">

    <vue-headful
        title="Sal a Gosto"
    />

    <transition appear name="slow-fade">
      <header-component></header-component>
    </transition>

    <transition name="slow-fade" mode="out-in" appear>
      <router-view />
    </transition>

    <transition appear name="slow-fade">
      <footer-component></footer-component>
    </transition>
  </div>
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator';
import HeaderComponent from './components/HeaderComponent.vue';
import FooterComponent from './components/FooterComponent.vue';

@Component({
  components: {
    HeaderComponent,
    FooterComponent,
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
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

.slow-fade-enter-active, .slow-fade-leave-active {
  transition: opacity 1s;
}
.slow-fade-enter, .slow-fade-leave-to {
  opacity: 0;
}

</style>
