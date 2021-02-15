<template>
  <div class="hero">
    <div class="image"></div>
    <div class="overlay">
      <div class="info col-4">
        <small>Cozinha Italiana</small>
        <h2 class="title">Nhoque</h2>
        <div class="summary">
          Você confere aqui: História do nhoque, cultura, receitas e muito mais!<br>
          Uma aula completa das centenas que estão disponíveis na maior plataforma de gastronomia,
          totalmente gratuita para você assistir!!!
        </div>
        <div class="button">
          <button class="btn">Assistir</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Hero extends Vue {
}
</script>

<style scoped lang="scss">

.hero {
  min-height: calc(100vh - 133px);

  .image {
    background: center/cover no-repeat;
    background-image: url(../assets/video.jpg);
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

    .button {
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
