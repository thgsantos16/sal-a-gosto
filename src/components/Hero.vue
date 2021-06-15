<template>
  <div class="hero" ref="hero">
    <transition appear name="fade">
      <div v-if="data.video">
        <div class="video"
            v-if="!isMobile"
            ref="herovideo"
            v-html="getEmbed(data.video)"></div>
        <div class="video"
            v-else
            ref="herovideo"
            v-html="getEmbedMobile(data.videoMobile)"></div>
      </div>
      <div v-else>
        <div class="image"
            v-if="data.image && !isMobile"
            v-lazy:background-image="data.image"></div>
        <div class="image mobile"
            v-else-if="data.imageMobile && isMobile"
            v-lazy:background-image="data.image"></div>
      </div>
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
      <div v-if="data.video" class="mute">
        <div @click.stop="muteVideo"
             class="mute-inner"
             v-if="!$store.getters.isMuted"
             title="Desligar o som">
          <b-icon-volume-up-fill />
        </div>
        <div @click.stop="unmuteVideo" class="mute-inner" v-else title="Ligar o som">
          <b-icon-volume-mute-fill />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Vimeo from '@vimeo/player';

interface HeroObject {
  title: string;
  image?: string;
  imageMobile?: string;
  video?: string;
  videoMobile?: string;
  small?: string;
  width?: string;
  font?: string;
  summary: string;
  ready?: boolean;
  isCarousel?: boolean;
  hasButton?: boolean;
  buttonText?: string;
  buttonUrl?: string;
}

@Component({
  watch: {
    muted: {
      handler(val) {
        const hv = this.$refs.herovideo as HTMLDivElement;
        const video = hv.querySelector('iframe');

        if (video) {
          const player = new Vimeo(video);

          if (val) player.setVolume(0);
          else player.setVolume(1);
        }
      },
      immediate: true,
    },
  },
  computed: {
    muted() {
      return this.$store.getters.isMuted;
    },
    isMobile() {
      const hero = this.$refs.hero as HTMLDivElement;
      return document.body.clientWidth <= 800 || hero.offsetWidth <= 800;
    },
  },
  methods: {
    muteVideo() {
      this.$store.dispatch('setMuted', true);
    },
    unmuteVideo() {
      this.$store.dispatch('setMuted', false);
    },
    clean(val: string): string {
      if (!val) return '';
      return val.replaceAll('\\n', '');
    },
    getEmbed(video) {
      if (!video) return '';

      const iframe = video.replace(/ width=''(.*?)''/, '')
        .replace(/ height=''(.*?)''/, '')
        .replace('><', ' style="width: 100%; height: calc(900vw / 16);"><')
        .replaceAll(/''/g, '"');

      const element = document.createElement('div');
      element.innerHTML = iframe;

      const htmliframe = element.getElementsByTagName('iframe')[0];
      if (!this.$store.getters.isShowingVideo) htmliframe.src += '?autoplay=1';
      else htmliframe.src += '?muted=1';

      this.$store.dispatch('setVideoState', true);

      return htmliframe.outerHTML;
    },
    getEmbedMobile(video) {
      if (!video) return '';

      const iframe = video.replace(/ width=''(.*?)''/, '')
        .replace(/ height=''(.*?)''/, '')
        .replace('><', ' style="width: 100%; height: calc(1600vw / 9);"><')
        .replaceAll(/''/g, '"');

      const element = document.createElement('div');
      element.innerHTML = iframe;

      const htmliframe = element.getElementsByTagName('iframe')[0];
      if (!this.$store.getters.isShowingVideo) htmliframe.src += '?autoplay=1';
      else htmliframe.src += '?muted=1';

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
        font-size: 2.8rem;
      }

      @media screen and (max-width: 720px) {
        font-size: 2.5rem;
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

.mute-inner {
    background: #00000077;
    float: right;
    padding: 7px 25px;
    border-radius: 25px;
    font-size: 24px;
    cursor: pointer;
    top: 70vh;
    right: 25px;
    position: absolute;
}
</style>
