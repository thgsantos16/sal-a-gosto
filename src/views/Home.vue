<template>
  <div class="home">
    <hero :data="hero" />

    <div class="stripes">
      <stripe v-scroll-reveal v-for="stripe in stripes" :key="stripe.id" :stripe="stripe" />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

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
        title: 'Nhoque',
        small: 'cozinha italiana',
        summary: `Você confere aqui: História do nhoque, cultura, receitas e muito mais!
                 Uma aula completa das centenas que estão disponíveis na maior plataforma de gastronomia,
                 totalmente gratuita para você assistir!!!`,
        hasButton: true,
        buttonText: 'Assistir',
      },
      stripes: [],
    };
  },
  computed: {
    ...mapGetters(['getApiUrl']),
  },
  methods: {
    ...mapActions(['setSiteTitle']),
  },
  beforeMount() {
    this.setSiteTitle('Sal a Gosto');

    let url = `${this.getApiUrl}&meth=getAulas`;

    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        const { aulas } = res.result[0];

        aulas.forEach((aula) => {
          Object.values(aula).forEach((cat, i) => {
            if (cat.length > 0) {
              this.stripes.push({
                title: cat[0].categoria,
                classes: cat,
                id: i,
              });
            }
          });
        });
      });

    url = `${this.getApiUrl}&mod=banners`;

    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
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
