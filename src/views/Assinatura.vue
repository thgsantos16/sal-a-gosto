<template>
  <div class="assinatura">
    <div class="assinatura-inner" v-if="loaded">
      <h1>Minha Assinatura</h1>

      <div class="assinatura">
        <div class="plans">
          <div class="plan row">
            <div class="plan-radio col-2 col-md-1">
              <span class="custom-checkbox selected" />
            </div>
            <div class="plan-data col">
              <div class="plan-name">
                <span v-html="currentPlan.nome" />
                - R$ {{ parseValue(currentPlan.valor) }}/{{ parseTime(currentPlan.dias) }}
              </div>
              <div class="plan-descricao" v-html="currentPlan.descricao" />
            </div>
          </div>
        </div>
      </div>

      <div class="buttons row mt-3">
        <div class="col-lg-auto col-md-12">
          <button @click="viewCancel" class="button">Cancelar</button>
        </div>
      </div>
    </div>

    <Loading v-else />

    <b-modal id="confirmar" centered hide-footer hide-header>
      <div class="d-block text-center">
        <h3>Você realmente deseja cancelar sua assinatura?</h3>
      </div>
      <div class="d-block text-right">
        <b-button class="mt-3 mr-3 px-5 py-2" @click="$bvModal.hide('confirmar')">
          Não
        </b-button>

        <b-button class="mt-3 px-5 py-2"
                  variant="danger"
                  @click="cancelConfirmed">
          Sim, quero cancelar
        </b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>

import { mapActions, mapGetters } from 'vuex';
import { required } from 'vuelidate/lib/validators';

export default {
  name: 'Assinatura',
  components: {
  },
  data() {
    return {
      currentPlan: {},
      loaded: false,
    };
  },
  computed: {
    ...mapGetters(['getApiUrl', 'getUser']),
  },
  methods: {
    ...mapActions(['setSiteTitle', 'setUser', 'setChosenPlan']),
    viewCancel() {
      this.$bvModal.show('confirmar');
    },
    cancelConfirmed() {
      const url = `${this.getApiUrl}&meth=setCancelamento&id_usuario=${this.getUser.login_token}`;

      fetch(url)
        .then((res) => res.json())
        .then((res) => {
          this.setUser(res.result[0].login[0]);
          this.$router.push({ name: 'home' });
        });
    },
    parseValue(val) {
      if (!val) return 0;

      const price = val.split('_');
      return (parseFloat(price[price.length - 1], 10).toFixed(2)).replace('.', ',');
    },
    parseTime(val) {
      if (val === '365') return 'ano';
      if (val === '7') return 'semana';
      return 'mês';
    },
  },
  beforeMount() {
    if (!this.getUser.id_plano) this.$router.push({ name: 'planos' });
    this.setSiteTitle('Assinatura | Sal a Gosto');

    let url = `${this.getApiUrl}&meth=getPlanos`;
    url += `&id_usuario=${this.getUser.login_token}`;
    url += `&id_plano=${this.getUser.id_plano}`;

    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        // eslint-disable-next-line prefer-destructuring
        this.currentPlan = res.result[0].planos_assinatura[0];
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

.assinatura {
  .assinatura-inner {
    padding: 7vh 0;
    width: 70%;
    max-width: 1240px;
    margin: 0 auto;

    .plans {
      text-align: left;
      margin: 52px 0;

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
