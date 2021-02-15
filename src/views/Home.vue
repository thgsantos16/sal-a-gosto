<template>
  <div class="home">
    <hero />

    <div class="stripes">
      <stripe v-for="stripe in stripes" :key="stripe.id" :stripe="stripe" />
    </div>
  </div>
</template>

<script>

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
};
</script>

<style lang="scss" scoped>

.stripes {
  z-index: 9;
  position: relative;
}

</style>
