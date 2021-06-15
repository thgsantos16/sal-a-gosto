<template>
  <div class="pagamento">
    <div class="pagamento-inner">
      <h1>Assinatura - Pagamento</h1>

      <form @submit.prevent="submitRegister">
        <div class="row">
          <div class="col-lg-12">
            <select v-model="$v.cartao.$model" placeholder="Estado*">
              <option selected value="0">
                Selecione um Cartão ou cadastre um novo abaixo
              </option>
              <option v-for="cartao in cartoes"
                      :key="cartao.id"
                      :value="cartao.id"
                      class="grey">
                {{ cartao.titulo }}
              </option>
            </select>
          </div>

          <div class="col-lg-12">
            <input v-model="$v.titulo.$model"
                   name="titulo"
                   placeholder="Título*"
                   :disabled="cartao !== '0'">
            <div class="error-container" v-if="$v.titulo.$dirty">
              <div class="error" v-if="!$v.titulo.required">Nome é obrigatório!</div>
            </div>
          </div>

          <div class="col-lg-6">
            <input v-model="$v.nome.$model"
                   placeholder="Nome Impresso no Cartão*"
                   :disabled="cartao !== '0'">
            <div class="error-container" v-if="$v.nome.$dirty">
              <div class="error" v-if="!$v.nome.required">Nome é obrigatório!</div>
            </div>
          </div>

          <div class="col-lg-6">
            <the-mask mask="XXXX XXXX XXXX ####"
                      v-model="$v.numero.$model"
                      placeholder="Número do Cartão*"
                      :disabled="cartao !== '0'" />
            <div class="error-container" v-if="$v.numero.$dirty">
              <div class="error" v-if="!$v.numero.required">Número do Cartão é obrigatório!</div>
            </div>
          </div>

          <div class="col-lg-6">
            <the-mask mask="##"
                      v-model="$v.mes.$model"
                      placeholder="Mês de Validade(MM)*"
                      :disabled="cartao !== '0'" />
            <div class="error-container" v-if="$v.mes.$dirty">
              <div class="error" v-if="!$v.mes.required">Mês de Validade é obrigatório!</div>
            </div>
          </div>

          <div class="col-lg-6">
            <the-mask mask="##"
                      v-model="$v.ano.$model"
                      placeholder="Ano de Validade(AA)*"
                      :disabled="cartao !== '0'" />
            <div class="error-container" v-if="$v.ano.$dirty">
              <div class="error" v-if="!$v.ano.required">Ano de Validade é obrigatório!</div>
            </div>
          </div>

          <div class="col-lg-6">
            <the-mask mask="XXX"
                      v-model="$v.cvv.$model"
                      placeholder="CVV*"
                      :disabled="cartao !== '0'" />
            <div class="error-container" v-if="$v.cvv.$dirty">
              <div class="error" v-if="!$v.cvv.required">CVV é obrigatório!</div>
            </div>
          </div>
        </div>

        <div class="buttons row">
          <div class="col-lg agreement">
            <span class="custom-checkbox"
                  :class="{ selected: saveData }"
                  @click="saveData = !saveData"></span>

            Desejo salvar os dados.
          </div>
        </div>

        <div class="buttons row">
          <div class="col-lg-auto col-md-12 mt-2">
            <button :disabled="blocked" type="submit" class="button">Pagar</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>

import _ from 'lodash';
import { mapActions, mapGetters } from 'vuex';
import { required } from 'vuelidate/lib/validators';

export default {
  name: 'Pagamento',
  components: {
  },
  data() {
    return {
      blocked: false,
      titulo: '',
      cartao: '0',
      cartoes: [],
      nome: '',
      numero: '',
      mes: '',
      ano: '',
      cvv: '',
      saveData: false,
    };
  },
  computed: {
    ...mapGetters(['getApiUrl', 'getUser', 'getChosenPlan', 'getAddressDetails', 'getChosenAddress']),
  },
  watch: {
    cartao(val) {
      if (val !== 0) {
        const card = _.find(this.cartoes, { id: val });
        if (card) {
          this.titulo = card.titulo;
          this.nome = card.nome;
          this.numero = card.numero.replace(' ', '');
          this.mes = card.mes_validade;
          this.ano = card.ano_validade;
          this.cvv = 'XXX';
        }
      }
    },
  },
  methods: {
    ...mapActions(['setSiteTitle', 'setUser', 'setLoadingApi']),
    submitRegister() {
      this.$v.$touch();
      if (!this.$v.$invalid && !this.blocked) this.sendForm();
    },
    sendForm() {
      this.blocked = true;
      this.setLoadingApi(true);

      let url = `${this.getApiUrl}&meth=setPagamento`;
      url += '&agree=1';
      url += '&forma_pagamento=1';
      if (this.getChosenPlan !== '0') url += `&id_plano_assinatura=${this.getChosenPlan}`;
      url += `&id_cupom=${this.getChosenCupom}`;
      url += `&id_endereco_pagamento=${this.getChosenAddress}`;
      url += `&pagamento_cep=${this.getAddressDetails.cep}`;
      url += `&pagamento_endereco=${this.getAddressDetails.endereco}`;
      url += `&pagamento_numero=${this.getAddressDetails.numero}`;
      url += `&pagamento_bairro=${this.getAddressDetails.bairro}`;
      url += `&pagamento_cidade=${this.getAddressDetails.cidade}`;
      url += `&pagamento_estado=${this.getAddressDetails.estado}`;
      url += `&pagamento_pais=${this.getAddressDetails.pais}`;
      if (this.cartao !== '0') url += `&id_cartao=${this.cartao}`;
      url += `&cartao_nome=${this.nome}`;
      url += `&cartao_numero=${this.numero}`;
      url += `&cartao_mes_validade=${this.mes}`;
      url += `&cartao_ano_validade=${this.ano}`;
      url += `&cartao_documento=${this.getUser.cpfcnpj}`;
      url += `&cartao_cvv=${this.cvv}`;
      url += `&titulo=${this.titulo}`;
      url += `&nome=${this.nome}`;
      url += `&numero=${this.numero}`;
      url += `&mes=${this.mes}`;
      url += `&ano=${this.ano}`;
      url += `&cvv=${this.cvv}`;
      url += `&id_usuario=${this.getUser.login_token}`;
      if (this.saveData) url += '&salvar_cartao=1';

      fetch(url)
        .then((res) => res.json())
        .then((res) => {
          if (!res.result[0].loja_pedidos[0].erro) {
            this.$bvToast.toast('Sua assinatura foi feita com sucesso!', {
              title: 'Assinatura realizada',
              variant: 'success',
              solid: true,
            });
            const user = this.getUser;
            // eslint-disable-next-line @typescript-eslint/camelcase
            user.id_plano = res.result[0].loja_pedidos[0].loja_itens_pedidos[0].id_plano_assinatura;
            this.setUser(user);
            this.$router.push({ name: 'assinatura' });
          } else {
            this.$bvToast.toast(res.result[0].loja_pedidos[0].erro, {
              title: 'Algo deu errado',
              variant: 'danger',
              solid: true,
            });
          }

          this.setLoadingApi(false);
        });
    },
  },
  beforeMount() {
    this.setSiteTitle('Assinatura - Pagamento | Sal a Gosto');

    const url = `${this.getApiUrl}&meth=getCartoes&id_usuario=${this.getUser.login_token}`;

    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        this.cartoes = res.result[0].loja_cartoes;
      });
  },
  validations: {
    titulo: { required },
    cartao: { required },
    mes: { required },
    ano: { required },
    numero: { required },
    nome: { required },
    cvv: { required },
  },
};
</script>

<style lang="scss" scoped>

.pagamento {
  .pagamento-inner {
    padding: 7vh 0;
    width: 70%;
    max-width: 1240px;
    margin: 0 auto;

    @media screen and (max-width: 1024px) {
      width: 80%;
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
