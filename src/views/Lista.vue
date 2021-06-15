<template>
  <div class="lista">
    <div class="stripes">
      <stripe v-scroll-reveal
              v-for="stripe in stripes"
              :key="`${stripe.id}-${stripe.title}`"
              :stripe="stripe"
              :left="!alignCenter(stripe)" />
      <div class="ops" v-if="stripes.length === 0 && hero.ready">
        <div class="ops-title">
           <span>Oops.</span>
           Parece que não há nada por aqui.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Stripe from '../components/Stripe.vue';

export default {
  name: 'Lista',
  components: {
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
        ready: false,
      },
      stripes: [],
    };
  },
  computed: {
    ...mapGetters(['getApiUrl', 'getUser']),
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
    if (!this.getUser) this.$router.push({ name: 'login' });
    this.setSiteTitle('Minha Lista | Sal a Gosto');

    const url = `${this.getApiUrl}&meth=getAulas&mine=1&id_usuario=${this.getUser.login_token}`;

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
        this.hero.ready = true;
      });
  },
};
</script>

<style lang="scss" scoped>

.lista {
  padding: 52px 0 25px;
}

.stripes {
  z-index: 9;
  position: relative;
}

.ops {
  font-size: 38px;
  font-weight: bold;
  width: 60%;
  margin: 11vh auto;
  text-align: left;

  @media screen and (max-width: 1024px) {
    width: 90%;
    overflow-x: hidden;
      text-align: center;
      font-size: 1.6rem;
  }

  span {
    display: block;
    font-size: 70px;
    width: 100%;
    margin-bottom: 25px;

    @media screen and (max-width: 1024px) {
      font-size: 3.4rem;
    }
  }
}

</style>
