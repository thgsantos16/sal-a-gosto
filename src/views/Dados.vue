<template>
  <div class="dados">
    <div class="dados-inner">
      <h1>Meus Dados</h1>

      <form @submit.prevent="submitDados">
        <div class="row">
          <div class="col-lg-6">
            <input v-model="$v.nome.$model" name="nome" placeholder="Nome*">
            <div class="error-container" v-if="$v.nome.$dirty">
              <div class="error" v-if="!$v.nome.required">Nome é obrigatório!</div>
            </div>
          </div>

          <div class="col-lg-6">
            <input type="email" v-model="$v.email.$model" placeholder="Email*">
            <div class="error-container" v-if="$v.email.$dirty">
              <div class="error" v-if="!$v.email.required">Email é obrigatório!</div>
            </div>
          </div>

          <div class="col-lg-6">
            <the-mask :mask="['(##) #####-####', '(##) ####-####']"
                      v-model="$v.telefone.$model"
                      placeholder="Telefone*" />
            <div class="error-container" v-if="$v.telefone.$dirty">
              <div class="error" v-if="!$v.telefone.required">Telefone é obrigatório!</div>
            </div>
          </div>
        </div>

        <div class="buttons row mt-3">
          <div class="col-lg-auto col-md-12">
            <button type="submit" class="button">Editar</button>
          </div>
        </div>
      </form>

      <h1 class="mt-5">Alteração de Senha</h1>

      <form @submit.prevent="submitPassword">
        <div class="row">
          <div class="col-lg-6">
            <input type="password" v-model="$v.password.$model" placeholder="Senha*">
            <div class="error-container" v-if="$v.password.$dirty">
              <div class="error" v-if="!$v.password.required">Senha é obrigatório!</div>
            </div>
          </div>

          <div class="col-lg-6">
            <input type="password" v-model="$v.repassword.$model" placeholder="Repetir a Senha*">
            <div class="error-container" v-if="$v.repassword.$dirty">
              <div class="error" v-if="!$v.repassword.required">Repetir Senha é obrigatório!</div>
            </div>
          </div>
        </div>

        <div class="buttons row mt-3">
          <div class="col-lg-auto col-md-12">
            <button type="submit" class="button">Alterar</button>
          </div>
        </div>
      </form>

    </div>
  </div>
</template>

<script>

import _ from 'lodash';
import { mapActions, mapGetters } from 'vuex';
import { required, email } from 'vuelidate/lib/validators';
import EstadosCidades from '../utils/estados-cidades.json';

export default {
  name: 'Dados',
  components: {
  },
  data() {
    return {
      nome: '',
      password: '',
      repassword: '',
      email: '',
      telefone: '',
    };
  },
  computed: {
    ...mapGetters(['getApiUrl', 'getUser']),
    estados() {
      return EstadosCidades.estados;
    },
    cidades() {
      return _.find(EstadosCidades.estados, { sigla: this.estado }).cidades;
    },
  },
  methods: {
    ...mapActions(['setSiteTitle', 'setUser']),
    submitDados() {
      this.$v.nome.$touch();
      this.$v.email.$touch();
      this.$v.telefone.$touch();
      if (!this.$v.nome.$invalid
       && !this.$v.email.$invalid
       && !this.$v.telefone.$invalid) this.sendForm();
    },
    submitPassword() {
      this.$v.password.$touch();
      this.$v.repassword.$touch();
      if (!this.$v.password.$invalid
       && !this.$v.repassword.$invalid) this.sendFormSenha();
    },
    sendForm() {
      let url = `${this.getApiUrl}&meth=cadastro`;
      url += '&edita=1';
      url += `&id_usuario=${this.getUser.login_token}`;
      url += `&nome=${this.nome}`;
      url += `&email=${this.email}`;
      url += `&telefone=${this.telefone}`;

      fetch(url)
        .then((res) => res.json())
        .then((res) => {
          if (res.result[0].login.length > 0) {
            this.setUser(res.result[0].login[0]);
            this.$bvToast.toast('Seus dados foram alterados com sucesso!', {
              title: 'Cadastro alterado',
              variant: 'success',
              solid: true,
            });
          }
        });
    },
    sendFormSenha() {
      let url = `${this.getApiUrl}&meth=setSenha`;
      url += `&id_usuario=${this.getUser.login_token}`;
      url += `&senha=${this.password}`;
      url += `&senha_repetida=${this.repassword}`;

      fetch(url)
        .then((res) => res.json())
        .then((res) => {
          if (res.result[0].login.length > 0) {
            this.$bvToast.toast('Sua senha foi alterada com sucesso!', {
              title: 'Senha alterada',
              variant: 'success',
              solid: true,
            });
          } else {
            this.$bvToast.toast('Sua senha não pode ser alterada no momento.', {
              title: 'Algo deu errado',
              variant: 'danger',
              solid: true,
            });
          }
        });
    },
  },
  beforeMount() {
    this.setSiteTitle('Meus Dados | Sal a Gosto');
    this.nome = _.cloneDeep(this.getUser.nome);
    this.email = _.cloneDeep(this.getUser.email);
    this.telefone = _.cloneDeep(this.getUser.telefone);
  },
  validations: {
    nome: { required },
    email: { required, email },
    telefone: { required },
    password: { required },
    repassword: { required },
  },
};
</script>

<style lang="scss" scoped>

.dados {
  .dados-inner {
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
