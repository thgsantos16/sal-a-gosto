<template>
  <div class="professores">
    <hero :data="hero" />

    <div class="professores-inner">
      <professor v-for="(professor, i) in professores"
                 :key="professor.id"
                 :professor="professor"
                 :left="i % 2 !== 0"
                 v-scroll-reveal
                 :class="{ last: i === professores.length - 1 }" />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import Hero from '../components/Hero.vue';
import Professor from '../components/Professor.vue';

export default {
  name: 'Professores',
  components: {
    Hero,
    Professor,
  },
  data() {
    return {
      hero: {
        title: '',
        small: '',
        summary: '',
        ready: false,
      },
      professores: [],
    };
  },
  computed: {
    ...mapGetters(['getApiUrl']),
  },
  methods: {
    ...mapActions(['setSiteTitle']),
  },
  beforeMount() {
    this.setSiteTitle('Professores | Sal a Gosto');

    let url = `${this.getApiUrl}&mod=conteudos&where=nome_arquivo=%22professores%22`;
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        const text = res.result[0].conteudos[0];
        this.hero.small = text.titulo;

        const html = document.createElement('div');
        html.innerHTML = text.texto;
        this.hero.title = html.querySelector('h1').innerText;
        html.querySelector('h1').remove();
        this.hero.summary = html.innerText.replaceAll('\\n', '');
      });

    url = `${this.getApiUrl}&mod=imagens&where=referencia=%22professores-capa%22`;
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        const image = res.result[0].imagens[0];
        this.hero.image = image.imagem || '';
        this.hero.ready = true;
      });

    url = `${this.getApiUrl}&mod=professores&order=ranking%20ASC`;

    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        const { professores } = res.result[0];
        professores.forEach((prof) => {
          this.professores.push({
            id: prof.id,
            name: prof.nome,
            image: prof.imagem,
            specialty: prof.chamada_pt,
            facebook: prof.url_facebook,
            youtube: prof.url_youtube,
            instagram: prof.url_instagram,
            summary: prof.descricao_pt,
          });
        });
      });
  },
};
</script>

<style lang="scss" scoped>

.professores-inner {
  z-index: 9;
  position: relative;
  max-width: 1600px;
  width: 90%;
  margin: 124px auto 0;

  @media screen and (max-width: 1024px) {
    margin-top: 142px;
  }
}

</style>
