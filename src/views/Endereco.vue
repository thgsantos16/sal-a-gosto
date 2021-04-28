<template>
  <div class="endereco">
    <div class="endereco-inner">
      <h1>Assinatura - Endereço</h1>

      <form @submit.prevent="submitRegister">
        <div class="row">
          <div class="col-lg-12">
            <select v-model="$v.endereco.$model" placeholder="Estado*">
              <option selected value="0" class="grey">
                Selecione um Endereço ou cadastre um novo abaixo
              </option>
              <option v-for="endereco in enderecos"
                      :key="endereco.id"
                      :value="endereco.id"
                      class="grey">
                {{ endereco.titulo }}
              </option>
            </select>
          </div>

          <div class="col-lg-12">
            <input :disabled="endereco !== '0'"
                    v-model="$v.titulo.$model"
                    name="titulo" placeholder="Título*">
            <div class="error-container" v-if="$v.titulo.$dirty">
              <div class="error" v-if="!$v.titulo.required">Nome é obrigatório!</div>
            </div>
          </div>

          <div class="col-lg-6">
            <input :disabled="endereco !== '0'"
                    v-model="$v.rua.$model"
                    placeholder="Rua*">
            <div class="error-container" v-if="$v.rua.$dirty">
              <div class="error" v-if="!$v.rua.required">Rua é obrigatório!</div>
            </div>
          </div>

          <div class="col-lg-6">
            <input :disabled="endereco !== '0'"
                    v-model="$v.numero.$model"
                    placeholder="Número*">
            <div class="error-container" v-if="$v.numero.$dirty">
              <div class="error" v-if="!$v.numero.required">Número é obrigatório!</div>
            </div>
          </div>

          <div class="col-lg-6">
            <input :disabled="endereco !== '0'"
                    v-model="$v.bairro.$model"
                    placeholder="Bairro*">
            <div class="error-container" v-if="$v.bairro.$dirty">
              <div class="error" v-if="!$v.bairro.required">Bairro é obrigatório!</div>
            </div>
          </div>

          <div class="col-lg-6">
            <the-mask mask="#####-###"
                      v-model="$v.cep.$model"
                      placeholder="CEP*"
                      :disabled="endereco !== '0'" />
            <div class="error-container" v-if="$v.cep.$dirty">
              <div class="error" v-if="!$v.cep.required">CEP é obrigatório!</div>
            </div>
          </div>

          <div class="col-lg-6">
            <select v-model="$v.estado.$model"
                    placeholder="Estado*"
                    :disabled="endereco !== '0'">
              <option v-for="estado in estados"
                      :key="estado.sigla"
                      :value="estado.sigla"
                      class="grey">
                {{ estado.nome }}
              </option>
            </select>
            <div class="error-container" v-if="$v.estado.$dirty">
              <div class="error" v-if="!$v.estado.required">Estado é obrigatório!</div>
            </div>
          </div>

          <div class="col-lg-6">
            <select v-model="$v.cidade.$model"
                    placeholder="Cidade*"
                    :disabled="endereco !== '0'">
              <option v-for="cidade in cidades"
                      :key="cidade"
                      :value="cidade"
                      :disabled="cidade === 'Cidade'"
                      class="grey">
                {{ cidade }}
              </option>
            </select>
            <div class="error-container" v-if="$v.cidade.$dirty">
              <div class="error" v-if="!$v.cidade.required || !$v.cidade.notDefault">
                Cidade é obrigatório!
              </div>
            </div>
          </div>
        </div>

        <div class="buttons row mt-2">
          <div class="col-lg-auto col-md-12">
            <button type="submit" class="button">Continuar</button>
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
import EstadosCidades from '../utils/estados-cidades.json';

const notDefault = (value) => (value !== 'Cidade');

export default {
  name: 'Endereço',
  components: {
  },
  data() {
    return {
      titulo: '',
      endereco: '0',
      enderecos: [],
      cep: '',
      rua: '',
      numero: '',
      bairro: '',
      cidade: 'Cidade',
      pais: 'Brasil',
      estado: 'RS',
    };
  },
  watch: {
    endereco(val) {
      if (val) {
        const end = _.find(this.enderecos, { id: val });
        this.titulo = end.titulo;
        this.cep = end.cep;
        this.rua = end.endereco;
        this.numero = end.numero;
        this.bairro = end.bairro;
        this.cidade = end.cidade;
        this.pais = end.pais;
        this.estado = end.estado;
      }
    },
  },
  computed: {
    ...mapGetters(['getApiUrl', 'getUser']),
    estados() {
      return EstadosCidades.estados;
    },
    cidades() {
      const { cidades } = _.find(EstadosCidades.estados, { sigla: this.estado });
      if (!cidades.includes('Cidade')) cidades.unshift('Cidade');
      return cidades;
    },
  },
  methods: {
    ...mapActions(['setSiteTitle', 'setUser', 'setChosenAddress', 'setAddressDetails']),
    submitRegister() {
      this.$v.$touch();
      if (!this.$v.$invalid) this.sendForm();
    },
    sendForm() {
      if (this.endereco === '0') {
        let url = `${this.getApiUrl}&meth=setEndereco`;
        url += `&titulo=${this.titulo}`;
        url += `&cep=${this.cep}`;
        url += `&endereco=${this.rua}`;
        url += `&numero=${this.numero}`;
        url += `&bairro=${this.bairro}`;
        url += `&cidade=${this.cidade}`;
        url += `&estado=${this.estado}`;
        url += `&pais=${this.pais}`;
        url += `&id_usuario=${this.getUser.login_token}`;

        fetch(url)
          .then((res) => res.json())
          .then((res) => {
            if (res.result[0].loja_enderecos[0].erro) {
              this.$bvToast.toast(res.result[0].loja_enderecos[0].erro, {
                title: 'Algo deu errado!',
                variant: 'danger',
                solid: true,
              });
            } else {
              this.setAddressDetails({
                titulo: res.result[0].loja_enderecos.titulo,
                cep: res.result[0].loja_enderecos.cep,
                endereco: res.result[0].loja_enderecos.rua,
                numero: res.result[0].loja_enderecos.numero,
                bairro: res.result[0].loja_enderecos.bairro,
                cidade: res.result[0].loja_enderecos.cidade,
                estado: res.result[0].loja_enderecos.estado,
                pais: res.result[0].loja_enderecos.pais,
              });

              this.$router.push({ name: 'pagamento' });
            }
          });
      } else {
        this.setAddressDetails({
          titulo: this.titulo,
          cep: this.cep,
          endereco: this.rua,
          numero: this.numero,
          bairro: this.bairro,
          cidade: this.cidade,
          estado: this.estado,
          pais: this.pais,
        });

        this.setChosenAddress(this.endereco);
        this.$router.push({ name: 'pagamento' });
      }
    },
  },
  beforeMount() {
    this.setSiteTitle('Assinatura - Endereço | Sal a Gosto');

    const url = `${this.getApiUrl}&meth=getEnderecos&id_usuario=${this.getUser.login_token}`;

    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        this.enderecos = res.result[0].loja_enderecos;
      });
  },
  validations: {
    titulo: { required },
    endereco: { required },
    rua: { required },
    bairro: { required },
    cidade: { required, notDefault },
    numero: { required },
    cep: { required },
    estado: { required },
  },
};
</script>

<style lang="scss" scoped>

.endereco {
  .endereco-inner {
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
