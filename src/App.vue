<template>
  <div id="app">

    <vue-headful
      :title="getSiteTitle"/>

    <transition appear name="slow-fade">
      <header-component />
    </transition>

    <transition name="slow-fade" mode="out-in" appear>
      <router-view class="router-view" />
    </transition>

    <transition appear name="slow-fade">
      <footer-component />
    </transition>

    <transition appear name="slow-fade">
      <video-component v-if="isShowingVideo" :video="getVideo" />
    </transition>

    <transition appear name="slow-fade">
      <LoaderApi v-if="isLoadingApi" />
    </transition>

    <div v-html="getEmbed(analytics)" />
  </div>
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import VideoComponent from './components/VideoComponent.vue';
import HeaderComponent from './components/HeaderComponent.vue';
import FooterComponent from './components/FooterComponent.vue';

export interface VueInterface extends Vue {
  getApiUrl: string;
}

@Component({
  data() {
    return {
      analytics: '',
    };
  },
  components: {
    VideoComponent,
    HeaderComponent,
    FooterComponent,
  },
  computed: {
    ...mapGetters([
      'isShowingVideo',
      'getSiteTitle',
      'getVideo',
      'getApiUrl',
      'isLoadingApi',
    ]),
  },
  watch: {
    isShowingVideo: {
      handler(val) {
        const body = document.querySelector('body');
        if (val) {
          if (body) body.style.overflow = 'hidden';
        } else if (body) body.style.overflow = 'auto';
      },
      immediate: true,
    },
  },
  beforeMount() {
    if (this.$store.getters.getTeachers.length === 0) {
      const url = `${this.$store.getters.getApiUrl}&mod=professores&order=ranking%20ASC`;

      fetch(url)
        .then((res) => res.json())
        .then((res) => {
          const { professores } = res.result[0];
          this.$store.dispatch('setTeachers', professores);
        });
    }

    const url = `${this.$store.getters.getApiUrl}&mod=configuracoes`;

    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        this.$data.analytics = res.result[0].configuracoes[0].codigo_analytics;
      });
  },
  metaInfo: {
    meta: [
      {
        property: 'og:title',
        content: 'Sal a Gosto',
      },
      {
        property: 'og:image',
        content: 'https://salagosto.com.br/img/imgShare.png',
      },
    ],
  },
  methods: {
    getEmbed(code) {
      const result = code.replaceAll(/''/g, '"').replaceAll('\\n', '');

      return result;
    },
  },
})
export default class App extends Vue {
  contents: object;

  constructor() {
    super();
    this.contents = {};
  }
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

  .video {
    width: 100%;
    height: 110vh;
    overflow: hidden;
    position: absolute;
    top: 0;
    z-index: 1;

    iframe {
      color: #b10309;

      @media screen and (max-width: 880px) {
        height: 90vh !important;
      }
    }
  }

  .router-view {
    min-height: 50vh;

    @media screen and (max-width: 1024px) {
      padding-top: 88px;
    }
  }

  .error-container {
    text-align: left;
    font-size: 85%;
    color: #f9262d;

    &.center {
      text-align: center;
    }

    div {
      margin-top: -3px;
      padding: 0 0 5px 20px;
    }
  }

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

  input:not(.multiselect__input), select {
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

    &:disabled {
      background-color: #00000022;
      color: #AAA;
      cursor: not-allowed;
    }

    select {
      padding-right: 25px;
    }

    .grey {
      color: #555;
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

// CSS Spinner

.lds-ellipsis {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-ellipsis div {
  position: absolute;
  top: 33px;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background: #fff;
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
}
.lds-ellipsis div:nth-child(1) {
  left: 8px;
  animation: lds-ellipsis1 0.6s infinite;
}
.lds-ellipsis div:nth-child(2) {
  left: 8px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(3) {
  left: 32px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(4) {
  left: 56px;
  animation: lds-ellipsis3 0.6s infinite;
}
@keyframes lds-ellipsis1 {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes lds-ellipsis3 {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
@keyframes lds-ellipsis2 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(24px, 0);
  }
}

@import "scss/dropdown";

</style>
