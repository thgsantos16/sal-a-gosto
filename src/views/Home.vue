<template>
  <div class="home">
    <hero :data="hero" />

    <div class="stripes">
      <transition mode="out-in" name="fade" appear>
        <Loader v-if="!loaded" />
        <div v-else>
          <stripe v-scroll-reveal
                  v-for="stripe in stripes"
                  :key="`${stripe.id}-${stripe.title}`"
                  :stripe="stripe"
                  :left="!alignCenter(stripe)" />
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import _ from 'lodash';
import Hero from '../components/Hero.vue';
import Stripe from '../components/Stripe.vue';

export default {
  name: 'Home',
  components: {
    Hero,
    Stripe,
  },
  data() {
    return {
      hero: {
        title: '',
        small: '',
        summary: '',
        hasButton: false,
        buttonText: '',
        buttonUrl: '',
        ready: false,
      },
      stripes: [],
      loaded: false,
    };
  },
  computed: {
    ...mapGetters(['getApiUrl']),
  },
  methods: {
    ...mapActions(['setSiteTitle']),
    alignCenter(stripe) {
      if (stripe.classes.length < 3) return false;
      if (window.innerWidth > 600 && stripe.classes.length < 4) return false;
      if (window.innerWidth > 1024 && stripe.classes.length < 6) return false;
      if (window.innerWidth > 1600 && stripe.classes.length < 8) return false;
      return true;
    },
  },
  beforeMount() {
    this.setSiteTitle('Sal a Gosto');

    let url = `${this.getApiUrl}&meth=getAulas`;

    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        const { aulas } = res.result[0];
        let video = null;

        aulas.forEach((aula) => {
          Object.values(aula).forEach((cat, i) => {
            if (cat.length > 0) {
              if (!video && this.$route.params.id) {
                video = _.find(cat, { id: this.$route.params.id });
              }

              this.stripes.push({
                title: cat[0].categoria,
                classes: cat,
                id: i,
              });
            }
          });
        });

        if (this.$route.params.id && video) {
          this.$store.dispatch('changeVideoInfo', video);
          this.$store.dispatch('changeVideoDisplay', true);
        }

        this.loaded = true;
      });

    url = `${this.getApiUrl}&mod=banners&order=ranking%20ASC`;

    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        this.hero.image = res.result[0].banners[0].cinemagraph
          ? res.result[0].banners[0].cinemagraph
          : res.result[0].banners[0].imagem_bg_pt;

        this.hero.imageMobile = res.result[0].banners[0].cinemagraph_mobile
          ? res.result[0].banners[0].cinemagraph_mobile
          : res.result[0].banners[0].imagem_bg_mobile_pt;

        if (res.result[0].banners[0].video_embed) {
          this.hero.video = res.result[0].banners[0].video_embed;
          this.hero.videoMobile = res.result[0].banners[0].video_embed_mobile;
        }

        this.hero.title = res.result[0].banners[0].titulo_pt || '';
        this.hero.summary = res.result[0].banners[0].descricao_pt || '';
        this.hero.buttonText = res.result[0].banners[0].texto_botao_pt || 'Assistir';
        this.hero.hasButton = !!res.result[0].banners[0].url;
        this.hero.buttonUrl = res.result[0].banners[0].url || '';

        this.hero.ready = true;
      });
  },
};
</script>

<style lang="scss" scoped>

.stripes {
  z-index: 9;
  position: relative;
}

</style>
