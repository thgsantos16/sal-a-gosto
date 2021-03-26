<template>
  <div class="video">
    <div class="video-overlay" @click="closeVideo"></div>
    <div class="video-close" @click="closeVideo">x</div>
    <div class="video-inner">
      <div class="video-player-outer">
        <div class="video-player">
          <video controls="controls">
            <source :src="video.arquivo_url" />
            O seu navegador não suporta a tag vídeo
          </video>
        </div>
      </div>
      <div class="row video-data">
        <div class="col-lg-8">
          <h2>{{ video.titulo }}</h2>
          <small>Chef Gabriel . 2021 . 60min</small>

          <p class="video-summary">{{ video.descricao }}</p>

          <div class="row video-commentaries">
            <div class="col-lg">
              <input placeholder="Escrever um comentário...">
            </div>
            <div class="col-lg-auto col-md-12">
              <button class="button">Enviar</button>
            </div>
          </div>
        </div>
        <div class="col-lg-3"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';

export default Vue.extend({
  props: ['video'],
  beforeMount() {
    console.log(this.video);
  },
  methods: {
    ...mapActions(['changeVideoDisplay']),
    closeVideo() {
      this.changeVideoDisplay(false);
    },
  },
});
</script>

<style lang="scss" scoped>

.video {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 9990;

  .video-overlay {
    background-color: #00000099;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 9991;
  }

  .video-close {
    position: fixed;
    color: #FFF;
    top: calc(10vh - 34px);
    right: calc(5% - 20px);
    font-size: 25px;
    cursor: pointer;

    @media screen and (min-width: 1330px) {
    right: calc(15% - 20px);
    }

  }

  .video-inner {
    background-color: #00000099;
    position: fixed;
    width: 90%;
    height: 100%;
    top: 10vh;
    margin-left: 5%;
    z-index: 9992;

    @media screen and (min-width: 1330px) {
      width: 70%;
      margin-left: 15%;
    }

    .video-player-outer {
      height: 520px;
    }

    .video-player {
      background-color: #000;
      animation: appear .5s;
      width: 100%;
      height: 520px;
    }

    .video-data {
      text-align: left;
      padding: 28px;

      .video-summary {
        margin-top: 20px;
      }

      .video-commentaries {
        button {
          margin-top: 11px;
        }
      }
    }
  }
}

@keyframes appear {
  from {
    width: 0;
    height: 0;
    margin: 10vh 0 0 50%;
  }
  to {
    width: 100%;
    height: 520px;
    margin: 0;
  }
}

</style>
