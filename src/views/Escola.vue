<template>
  <div class="escola">
    <hero :data="hero" />

    <div class="row escola-inner">
      <div class="col-lg-6">
        <p>
          Nascemos em 17 de maio de 2011, através do Chef  Gabriel Lourenço,
          sendo a primeira escola de Gastronomia do Brasil com bancadas
          individuais voltada 100% ao público não profissional.
        </p>

        <p>
          Abrimos nossas portas trazendo uma ideia inovadora e mostrando que
          a cozinha, seja ela simples ou elaborada, tem sua essência no coração
          e nos bons momentos vividos ao redor de uma mesa ou fogão.
        </p>

        <p>
          Nosso público abrange desde pessoas querendo perder o medo do fogão
          até cozinheiros buscando refinar suas técnicas e conhecer novas receitas.
        </p>

        <p>
          Nesses 10 anos, mais de 25.000 pessoas já passaram por nossas aulas presenciais e ONLINE.
        </p>
      </div>
      <div class="col-lg-6">
        <p>
          Além dessas atividades, a Escola participa de projetos sociais proporcionando
          conhecimento para comunidades, jovens e organizações que necessitam de auxílio na área.
        </p>

        <p>
          Fomos certificados como uma das empresas mais inovadoras de todo o território nacional,
          pelo programa ALI no SEBRAE, atingindo notas máximas históricas.
        </p>

        <p>
          Atualmente contamos com um time de professores do mais alto nível, sendo referência no
          segmento e a maior escola presencial e online ao vivo, para o público não profissional,
          do Brasil!
        </p>
      </div>
      <div class="escola-fotos col-12 row">
        <div class="escola-foto col-lg-3" v-for="i in 4" :key="i">
          <div class="image"></div>
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

    const url = `${this.getApiUrl}&mod=conteudos&where=nome_arquivo=%22sobre-capa%22`;
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        const text = res.result[0].conteudos[0];
        this.hero.title = text.titulo;
        this.hero.summary = text.texto;
        this.hero.image = text.banner_topo;
        this.hero.ready = true;
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
  margin: 124px auto 52px;

  > .col-lg-6 {
    text-align: left;
    padding: 52px 5vw;
  }

  .escola-fotos {
    border-top: 2px solid #FFF;
    padding-top: 25px;

    .escola-foto {
      padding: 0 12px;

      .image {
        background-color: #FFF;
        height: 18vw;
      }
    }
  }
}

</style>
