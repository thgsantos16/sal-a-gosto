<template>
  <div class="planos">
    <div class="planos-inner">
      <h1>Escolha seu Plano de Assinatura</h1>

      <form @submit.prevent="submitCupom">
        <div class="row">
          <div class="col-lg-6">
            <input v-model="$v.cupom.$model" placeholder="Possui um cupom? Digite aqui.">
            <div class="error-container" v-if="$v.cupom.$dirty">
              <div class="error" v-if="!$v.cupom.required">Cupom é obrigatório!</div>
            </div>
          </div>
          <div class="col-lg-auto col-md-12">
            <button type="submit" class="button margin-top">Validar</button>
          </div>
        </div>
      </form>

      <transition name="fade" mode="out-in" appear>
        <form @submit.prevent="submitChoosePlan" v-if="loaded">
          <input type="hidden" v-model="$v.selectedPlan.model">
          <div class="plans">
            <div v-scroll-reveal class="plan row" v-for="plan in plans" :key="plan.id">
              <div class="plan-radio col-2 col-md-1">
                <span class="custom-checkbox"
                      :class="{ selected: plan.valor === selectedPlan }"
                      @click="selectedPlan = plan.valor" />
              </div>
              <div class="plan-data col" @click="selectedPlan = plan.valor">
                <div class="plan-name">
                  <span v-html="plan.nome" />
                  - R$ {{ parseValue(plan.valor) }}/{{ parseTime(plan.dias) }}
                </div>
                <div class="plan-descricao" v-html="plan.descricao" />
              </div>
            </div>
          </div>

          <div class="error-container" v-if="$v.selectedPlan.$dirty">
            <div class="error" v-if="!$v.selectedPlan.required">Plano é obrigatório!</div>
          </div>

          <div class="buttons row mt-3">
            <div class="col-lg-auto col-md-12">
              <button type="submit" class="button">Continuar</button>
            </div>
          </div>
        </form>
        <Loader v-else />
      </transition>
    </div>
  </div>
</template>

<script>

import { mapActions, mapGetters } from 'vuex';
import { required } from 'vuelidate/lib/validators';

export default {
  name: 'Planos',
  components: {
  },
  data() {
    return {
      cupom: '',
      selectedPlan: '',
      plans: [],
      loaded: false,
    };
  },
  computed: {
    ...mapGetters(['getApiUrl', 'getUser', 'isLoggedIn']),
  },
  methods: {
    ...mapActions(['setSiteTitle', 'setUser', 'setChosenPlan']),
    parseValue(val) {
      const price = val.split('_');
      return (parseFloat(price[price.length - 1], 10).toFixed(2)).replace('.', ',');
    },
    parseTime(val) {
      if (val === '365') return 'ano';
      if (val === '7') return 'semana';
      return 'mês';
    },
    submitCupom() {
      this.$v.cupom.$touch();
      if (!this.$v.cupom.$invalid) this.sendCupomForm();
    },
    submitChoosePlan() {
      this.$v.selectedPlan.$touch();
      if (!this.$v.selectedPlan.$invalid) this.sendForm();
    },
    sendForm() {
      this.setChosenPlan(this.selectedPlan);

      if (this.isLoggedIn) this.$router.push({ name: 'endereco' });
      else this.$router.push({ name: 'register' });
    },
    sendCupomForm() {
      let url = `${this.getApiUrl}&meth=getCupom`;
      url += `&codigo=${this.cupom}`;

      fetch(url)
        .then((res) => res.json())
        .then((res) => {
          this.plans = res.result[0].loja_cupons;
        });
    },
  },
  beforeMount() {
    if (this.getUser.id_plano) this.$router.push({ name: 'assinatura' });
    this.setSiteTitle('Planos | Sal a Gosto');

    const url = `${this.getApiUrl}&meth=getPlanos&id_usuario=${this.getUser.login_token}`;

    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        this.plans = res.result[0].planos_assinatura;
        this.loaded = true;
      });
  },
  validations: {
    cupom: { required },
    selectedPlan: { required },
  },
};
</script>

<style lang="scss" scoped>

.planos {
  .planos-inner {
    padding: 7vh 0;
    width: 70%;
    max-width: 1240px;
    margin: 0 auto;

    @media screen and (max-width: 1024px) {
      width: 80%;
    }

    .plans {
      text-align: left;
      margin-top: 52px;

      .plan {
        margin: 25px 0;
        width: 60%;

        @media screen and (max-width: 1024px) {
          width: 100%;
        }

        .plan-radio {
          padding-top: 5px;
        }

        .plan-name {
          font-size: 24px;
        }
      }
    }

    .button.margin-top {
      margin-top: 11px;
    }

    h1 {
      text-align: left;

      @media screen and (max-width: 1024px) {
        text-align: center;
      }
    }

    ::placeholder {
      color: #aaa;
    }

    .buttons {
      .agreement {
        text-align: left;
        padding-top: 12px;
      }
    }

    .buttons-extra {
      margin-top: 79px;
    }
  }
}

</style>
