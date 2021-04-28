<template>
  <div class="hero">
    <transition appear name="fade">
      <div class="video"
           v-if="data.video"
           ref="herovideo"
           v-html="getEmbed(data.video)"></div>
      <div class="image"
           v-else-if="data.image"
           v-lazy:background-image="data.image"></div>
    </transition>
    <div class="overlay" @click="playPause">
      <transition appear name="fade">
        <div class="info" v-if="data.ready" :class="[textSize, fontSize]">
          <small v-if="data.small">{{ data.small }}</small>
          <h2 class="title" v-html="clean(data.title)" />
          <div class="summary" v-html="clean(data.summary)" />
          <div v-if="data.hasButton" class="buttons">
            <a :href="data.buttonUrl" target="_blank" class="btn">{{ data.buttonText }}</a>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Vimeo from '@vimeo/player';

interface HeroObject {
  title: string;
  image?: string;
  small?: string;
  width?: string;
  font?: string;
  summary: string;
  ready?: boolean;
  hasButton?: boolean;
  buttonText?: string;
  buttonUrl?: string;
}

@Component({
  methods: {
    clean(val: string): string {
      if (!val) return '';
      return val.replaceAll('\\n', '');
    },
    getEmbed(video) {
      const iframe = video.replace(/ width=''(.*?)''/, '')
        .replace(/ height=''(.*?)''/, '')
        .replace('><', ' style="width: 100%; height: calc(900vw / 16);"><')
        .replaceAll(/''/g, '"');

      const element = document.createElement('div');
      element.innerHTML = iframe;

      const htmliframe = element.getElementsByTagName('iframe')[0];
      htmliframe.src += '?autoplay=1';

      this.$store.dispatch('setVideoState', true);

      return htmliframe.outerHTML;
    },
    playPause() {
      const hv = this.$refs.herovideo as HTMLDivElement;
      const video = hv.querySelector('iframe');
      if (video) {
        const player = new Vimeo(video);
        if (this.$store.getters.isPlaying) player.pause();
        else player.play();

        this.$store.dispatch('setVideoState', !this.$store.getters.isPlaying);
      }
    },
  },
})
export default class Hero extends Vue {
  @Prop() private data!: HeroObject;

  get textSize() {
    return this.data.width === 'wide' ? 'col-lg-8' : 'col-lg-4';
  }

  get fontSize() {
    return this.data.font === 'medium' ? 'medium-font' : '';
  }
}
</script>

<style scoped lang="scss">

.hero {
  min-height: calc(90vh - 133px);

  .image {
    background: center/cover no-repeat;
    height: 110vh;
    width: 100%;
    position: absolute;
    top: 0;
    z-index: 1;
  }

  .video {
    width: 100%;
    height: 110vh;
    overflow: hidden;
    position: absolute;
    top: 0;
    z-index: 1;
  }

  .overlay {
    background: #00000077;
    background: linear-gradient(0deg, rgba(0,0,0,1) 0%,
    rgba(0,0,0,0.43) 35%, rgba(0,0,0,0.43) 100%);
    height: 110vh;
    width: 100%;
    position: absolute;
    top: 0;
    z-index: 2;
    overflow-x: hidden;

    @media screen and (max-width: 1024px) {
    background: linear-gradient(0deg, rgba(0,0,0,1) 0%,
    rgba(0,0,0,0.52) 43%, rgba(0,0,0,0.52) 100%);
    }
  }

  .info {
    top: 36vh;
    margin-left: 124px;
    text-align: left;
    font-size: 20px;

    @media screen and (max-width: 1024px) {
      top: 25vh;
      margin-left: 7vw;
      font-size: 1.2rem;
    }

    small {
      text-transform: lowercase;
    }

    h2 {
      text-transform: uppercase;
      font-weight: 800;
      font-size: 5rem;

      @media screen and (max-width: 1024px) {
        font-size: 3rem;
      }
    }

    .summary {
      max-width: 34vw;

      @media (max-width: 1240px) {
        max-width: 50vw;
      }

      @media screen and (max-width: 1024px) {
        max-width: 80vw;

        h2 {
          font-size: 2rem;
        }
      }
    }

    &.medium-font {
      top: 25vh;

      h2 {
        font-size: 60px;

        @media screen and (max-width: 1024px) {
          font-size: 2.6rem;
        }
      }
    }

    .buttons {
      margin-top: 16px;

      .btn {
        transition: all 0.43s;
        background-color: #e00109;
        text-transform: uppercase;
        color: #FFF;
        border-radius: 20px;
        font-weight: 800;
        padding: 7px 25px;
        font-size: 22px;

        &:hover {
          background-color: #b10309;
          color: #FFF !important;
        }
      }
    }
  }
}
</style>
