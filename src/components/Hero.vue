<template>
  <div class="hero">
    <transition appear name="fade">
      <div class="image"
           v-if="data.image"
           :style="{ backgroundImage: `url(${data.image})` }"></div>
    </transition>
    <div class="overlay">
      <transition appear name="fade">
        <div class="info" v-if="data.ready" :class="[textSize, fontSize]">
          <small v-if="data.small">{{ data.small }}</small>
          <h2 class="title">{{ data.title }}</h2>
          <div class="summary">{{ data.summary }}
          </div>
          <div v-if="data.hasButton" class="buttons">
            <button class="btn">{{ data.buttonText }}</button>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

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
}

@Component
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
  min-height: calc(100vh - 133px);

  .image {
    background: center/cover no-repeat;
    height: 110vh;
    width: 100%;
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
  }

  .info {
    top: 36vh;
    margin-left: 124px;
    text-align: left;
    font-size: 20px;

    small {
      text-transform: lowercase;
    }

    h2 {
      text-transform: uppercase;
      font-weight: 800;
      font-size: 80px;
    }

    .summary {
      max-width: 34vw;
    }

    &.medium-font {
      h2 {
        font-size: 60px;
      }
    }

    .buttons {
      margin-top: 16px;

      .btn {
        background-color: #e00109;
        text-transform: uppercase;
        color: #FFF;
        border-radius: 20px;
        font-weight: 800;
        padding: 7px 25px;
        font-size: 22px;
      }
    }
  }
}
</style>
