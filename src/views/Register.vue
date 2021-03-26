<template>
  <div class="register">
    <div class="register-inner">
      <h1>Cadastro</h1>

      <form @submit.prevent="submitRegister">
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
            <the-mask mask="###.###.###-##" v-model="$v.cpf.$model" placeholder="CPF*" />
            <div class="error-container" v-if="$v.cpf.$dirty">
              <div class="error" v-if="!$v.cpf.required">CPF é obrigatório!</div>
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

          <div class="col-lg-6">
            <input v-model="$v.rua.$model" placeholder="Rua*">
            <div class="error-container" v-if="$v.rua.$dirty">
              <div class="error" v-if="!$v.rua.required">Rua é obrigatório!</div>
            </div>
          </div>

          <div class="col-lg-6">
            <input v-model="$v.numero.$model" placeholder="Número*">
            <div class="error-container" v-if="$v.numero.$dirty">
              <div class="error" v-if="!$v.numero.required">Número é obrigatório!</div>
            </div>
          </div>

          <div class="col-lg-6">
            <input v-model="$v.bairro.$model" placeholder="Bairro*">
            <div class="error-container" v-if="$v.bairro.$dirty">
              <div class="error" v-if="!$v.bairro.required">Bairro é obrigatório!</div>
            </div>
          </div>

          <div class="col-lg-6">
            <the-mask mask="#####-###"
                      v-model="$v.cep.$model"
                      placeholder="CEP*" />
            <div class="error-container" v-if="$v.cep.$dirty">
              <div class="error" v-if="!$v.cep.required">CEP é obrigatório!</div>
            </div>
          </div>

          <div class="col-lg-6">
            <select v-model="$v.cidade.$model" placeholder="Cidade*">
              <option v-for="cidade in cidades"
                      :key="cidade"
                      :value="cidade"
                      class="grey">
                {{ cidade }}
              </option>
            </select>
            <div class="error-container" v-if="$v.cidade.$dirty">
              <div class="error" v-if="!$v.cidade.required">Cidade é obrigatório!</div>
            </div>
          </div>

          <div class="col-lg-6">
            <select v-model="$v.estado.$model" placeholder="Estado*">
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
            <input v-model="$v.password.$model"
                   placeholder="Senha*"
                   type="password"
                   name="password">
            <div class="error-container" v-if="$v.password.$dirty">
              <div class="error" v-if="!$v.password.required">Senha é obrigatório!</div>
            </div>
          </div>

          <div class="col-lg-6">
            <input v-model="$v.repassword.$model"
                   placeholder="Repetir a Senha*"
                   type="password"
                   name="repassword">
            <div class="error-container" v-if="$v.repassword.$dirty">
              <div class="error" v-if="!$v.repassword.required">Repetir a Senha é obrigatório!</div>
            </div>
          </div>
        </div>

        <div class="buttons row">
          <div class="col-lg agreement">
            <span class="custom-checkbox"
                  :class="{ selected: agreement }"
                  @click="agreement = !agreement"></span>

            Concordo com os
            <router-link :to="{ name: 'terms' }">Termos de Uso</router-link>
            e
            <router-link :to="{ name: 'politics' }">Política de Privacidade</router-link>
            da plataforma.
          </div>

          <div class="col-lg-auto col-md-12">
            <button type="submit" class="button">Cadastrar</button>
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
  name: 'Register',
  components: {
  },
  data() {
    return {
      nome: '',
      cpf: '',
      password: '',
      repassword: '',
      rua: '',
      bairro: '',
      cidade: '',
      email: '',
      telefone: '',
      numero: '',
      cep: '',
      estado: 'RS',
      agreement: false,
    };
  },
  computed: {
    ...mapGetters(['getApiUrl']),
    estados() {
      return EstadosCidades.estados;
    },
    cidades() {
      return _.find(EstadosCidades.estados, { sigla: this.estado }).cidades;
    },
  },
  methods: {
    ...mapActions(['setSiteTitle', 'setUser']),
    submitRegister() {
      this.$v.$touch();
      if (!this.$v.$invalid) this.sendForm();
    },
    sendForm() {
      let url = `${this.getApiUrl}&meth=cadastro`;
      url += `&nome=${this.nome}`;
      url += `&cpfcnpj=${this.cpf}`;
      url += `&senha=${this.password}`;
      url += `&senha_repetida=${this.repassword}`;
      url += `&endereco=${this.rua}`;
      url += `&bairro=${this.bairro}`;
      url += `&cidade=${this.cidade}`;
      url += `&email=${this.email}`;
      url += `&telefone=${this.telefone}`;
      url += `&numero=${this.numero}`;
      url += `&cep=${this.cep}`;
      url += `&estado=${this.estado}`;
      url += '&pais=Brasil';
      url += '&agree=1';

      fetch(url)
        .then((res) => res.json())
        .then((res) => {
          if (res.result[0].login.length > 0) {
            this.setUser(res.result[0].login[0]);
            this.$router.push({ name: 'home' });
          }
        });
    },
  },
  beforeMount() {
    this.setSiteTitle('Cadastro | Sal a Gosto');
  },
  validations: {
    nome: { required },
    cpf: { required },
    rua: { required },
    bairro: { required },
    cidade: { required },
    email: { required, email },
    telefone: { required },
    numero: { required },
    cep: { required },
    estado: { required },
    password: { required },
    repassword: { required },
  },
};
</script>

<style lang="scss" scoped>

.register {
  .register-inner {
    padding: 7vh 0;
    width: 70%;
    max-width: 1240px;
    margin: 0 auto;

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
