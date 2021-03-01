<template>
  <div class="home">
    <hero :data="hero" />

    <div class="stripes">
      <stripe v-for="stripe in stripes" :key="stripe.id" :stripe="stripe" />
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

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
      stripes: [
        {
          id: 1,
          title: 'continuar assistindo',
        },
        {
          id: 2,
          title: 'minha lista',
        },
        {
          id: 3,
          title: 'lançamentos',
          classes: ['bigger'],
        },
        {
          id: 4,
          title: 'frutos do mar',
        },
      ],
    };
  },
  methods: {
    ...mapActions(['setSiteTitle']),
  },
  beforeMount() {
    this.setSiteTitle('Sal a Gosto');
  },
};
</script>

<style lang="scss" scoped>

.stripes {
  z-index: 9;
  position: relative;
}

</style>
