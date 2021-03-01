<template>
  <div class="register">
    <div class="register-inner">
      <h1>Cadastro</h1>

      <form>
        <div class="row">
          <div class="col-lg-6">
            <input placeholder="Nome">
            <input placeholder="CPF">
            <input placeholder="Rua">
            <input placeholder="Bairro">
            <input placeholder="Cidade">
            <input placeholder="Senha" type="password">
          </div>

          <div class="col-lg-6">
            <input placeholder="Email">
            <input placeholder="Telefone">
            <input placeholder="Número">
            <input placeholder="CEP">
            <input placeholder="Estado">
            <input placeholder="Repetir a Senha" type="password">
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
            <button class="button">Cadastrar</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Register',
  components: {
  },
  data() {
    return {
      username: '',
      password: '',
      agreement: false,
    };
  },
  methods: {
    ...mapActions(['setSiteTitle']),
  },
  beforeMount() {
    this.setSiteTitle('Cadastro | Sal a Gosto');
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
