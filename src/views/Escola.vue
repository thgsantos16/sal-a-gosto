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
import { mapActions } from 'vuex';

import Hero from '../components/Hero.vue';

export default {
  name: 'Escola',
  components: {
    Hero,
  },
  data() {
    return {
      hero: {
        title: `PARA INICIANTES, INICIADOS E APAIXONADOS
                MAIS QUE CULINÁRIA, HISTÓRIA &
                TÉCNICA & CULTURA.`,
        width: 'wide',
        font: 'medium',
        summary: `Faça parte da maior plataforma de gastronomia para quem cozinha em casa.
                  uma escola especializada no público que deseja cozinhar como um chef!
                  com metodologia única e experiência de 10 anos, já são mais de 25.000
                  alunos que mudaram a sua vida com as nossas aulas. evolua seus conhecimentos
                  de cozinha, aprenda novos pratos e não fique mais refém de receitas prontas.`,
      },
    };
  },
  methods: {
    ...mapActions(['setSiteTitle']),
  },
  beforeMount() {
    this.setSiteTitle('A Escola | Sal a Gosto');
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
