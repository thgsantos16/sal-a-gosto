<template>
  <div class="professores">
    <hero :data="hero" />

    <div class="professores-inner">
      <professor v-for="(professor, i) in professores"
                 :key="professor.id"
                 :professor="professor"
                 :left="i % 2 !== 0"
                 :class="{ last: i === professores.length - 1 }" />
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

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
        title: 'Professores',
        small: 'conheça nossos',
        summary: `Você confere aqui: História do nhoque, cultura, receitas e muito mais!
                 Uma aula completa das centenas que estão disponíveis na maior plataforma de gastronomia,
                 totalmente gratuita para você assistir!!!`,
      },
      professores: [
        {
          id: 1,
          name: 'Gabriel Lourenço',
          specialty: 'especialista em culinária oriental',
          facebook: 'chefgabi',
          youtube: 'chefgabi',
          instagram: 'chefgabi',
          summary: `Você confere aqui: História do nhoque, cultura, receitas e muito mais!
                 Uma aula completa das centenas que estão disponíveis na maior plataforma de gastronomia,
                 totalmente gratuita para você assistir!!!`,
        },
        {
          id: 2,
          name: 'Gabriel Lourenço',
          specialty: 'especialista em culinária oriental',
          facebook: 'chefgabi',
          youtube: 'chefgabi',
          instagram: 'chefgabi',
          summary: `Você confere aqui: História do nhoque, cultura, receitas e muito mais!
                 Uma aula completa das centenas que estão disponíveis na maior plataforma de gastronomia,
                 totalmente gratuita para você assistir!!!`,
        },
        {
          id: 3,
          name: 'Gabriel Lourenço',
          specialty: 'especialista em culinária oriental',
          facebook: 'chefgabi',
          youtube: 'chefgabi',
          instagram: 'chefgabi',
          summary: `Você confere aqui: História do nhoque, cultura, receitas e muito mais!
                 Uma aula completa das centenas que estão disponíveis na maior plataforma de gastronomia,
                 totalmente gratuita para você assistir!!!`,
        },
        {
          id: 4,
          name: 'Gabriel Lourenço',
          specialty: 'especialista em culinária oriental',
          facebook: 'chefgabi',
          youtube: 'chefgabi',
          instagram: 'chefgabi',
          summary: `Você confere aqui: História do nhoque, cultura, receitas e muito mais!
                 Uma aula completa das centenas que estão disponíveis na maior plataforma de gastronomia,
                 totalmente gratuita para você assistir!!!`,
        },
      ],
    };
  },
  methods: {
    ...mapActions(['setSiteTitle']),
  },
  beforeMount() {
    this.setSiteTitle('Professores | Sal a Gosto');
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
}

</style>
