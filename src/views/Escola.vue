<template>
  <div class="escola">
    <hero :data="hero" />

    <div class="row escola-inner">
      <div class="col-lg-6" v-html="column1" />
      <div class="col-lg-6" v-html="column2" />

      <div class="escola-fotos col-12 row">
        <div class="escola-foto col-lg-3" v-for="image in images" :key="image.id">
          <img class="image" :src="image.imagem" />
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import Hero from '../components/Hero.vue';

export default {
  name: 'Escola',
  components: {
    Hero,
  },
  data() {
    return {
      hero: {
        title: '',
        width: 'wide',
        font: 'medium',
        summary: '',
        ready: false,
      },
      images: [],
      column1: '',
      column2: '',
    };
  },
  computed: {
    ...mapGetters(['getApiUrl']),
  },
  methods: {
    ...mapActions(['setSiteTitle']),
  },
  beforeMount() {
    this.setSiteTitle('A Escola | Sal a Gosto');

    let url = `${this.getApiUrl}&mod=conteudos&where=nome_arquivo=%22sobre-capa%22`;
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        const text = res.result[0].conteudos[0];
        this.hero.title = text.titulo;
        this.hero.summary = text.texto;
      });

    url = `${this.getApiUrl}&mod=conteudos&where=nome_arquivo=%22sobre-1%22`;

    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        this.column1 = res.result[0].conteudos[0].texto;
      });

    url = `${this.getApiUrl}&mod=conteudos&where=nome_arquivo=%22sobre-2%22`;

    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        this.column2 = res.result[0].conteudos[0].texto;
      });

    url = `${this.getApiUrl}&mod=imagens&where=referencia=%22sobre-capa%22`;
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        const image = res.result[0].imagens[0];
        this.hero.image = image.imagem || '';
        this.hero.ready = true;
      });

    url = `${this.getApiUrl}&mod=imagens&referencia=%22sobre%22`;
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        this.images = res.result[0].imagens;
      });
  },
};
</script>

<style lang="scss" scoped>

.escola-inner {
  z-index: 9;
  position: relative;
  max-width: 1600px;
  width: 90%;
  margin: 205px auto 52px;

  > .col-lg-6 {
    text-align: left;
    padding: 52px 5vw;
  }

  .escola-fotos {
    border-top: 2px solid #FFF;
    padding-top: 25px;
    vertical-align: top;
    margin: 0 0 12px;

    .escola-foto {
      padding: 0 12px;

      .image {
        width: 100%;
        height: auto;
        margin-bottom: 20px;
      }
    }
  }
}

</style>
