<template>
  <div class="login">
    <div class="login-inner">
      <h1>Login</h1>

      <form @submit.prevent="submitLogin">
        <div class="error-container center" v-if="!!error">
          {{ error }}
        </div>

        <input v-model="$v.email.$model" name="email" placeholder="Email">
        <div class="error-container" v-if="$v.email.$dirty">
          <div class="error" v-if="!$v.email.required">Email é obrigatório!</div>
        </div>
        <input v-model="$v.password.$model" name="password" placeholder="Senha" type="password">
        <div class="error-container" v-if="$v.password.$dirty">
          <div class="error" v-if="!$v.password.required">Senha é obrigatório!</div>
        </div>

        <div class="buttons row">
          <div class="col-lg forgot">
            <router-link :to="{ name: 'forgot' }">Esqueci minha senha</router-link>
          </div>

          <div class="col-lg-auto col-md-12">
            <button class="button">Entrar</button>
          </div>
        </div>
      </form>

      <div class="buttons-extra">
        <router-link :to="{ name: 'planos' }" class="button btn-block">
          Quero Assinar
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { required, email } from 'vuelidate/lib/validators';

export default {
  name: 'Login',
  components: {
  },
  data() {
    return {
      email: '',
      password: '',
      error: '',
    };
  },
  computed: {
    ...mapGetters(['getApiUrl']),
  },
  methods: {
    ...mapActions(['setSiteTitle', 'setUser']),
    submitLogin() {
      this.$v.$touch();
      if (!this.$v.$invalid) this.sendForm();
    },
    sendForm() {
      let url = `${this.getApiUrl}&meth=login`;
      url += `&senha=${this.CryptoJS.MD5(this.password)}`;
      url += `&login=${this.email}`;

      fetch(url)
        .then((res) => res.json())
        .then((res) => {
          if (res.result[0].login.length > 0) {
            this.setUser(res.result[0].login[0]);
            this.$router.push({ name: 'home' });
          } else this.error = 'Usuário ou senha incorretos';
        });
    },
  },
  beforeMount() {
    this.setSiteTitle('Login | Sal a Gosto');
  },
  validations: {
    password: { required },
    email: { required, email },
  },
};
</script>

<style lang="scss" scoped>

.login {
  .login-inner {
    padding: 13vh 0;
    width: 486px;
    margin: 0 auto;
    max-width: 80%;

    @media screen and (max-width: 1024px) {
      padding: 18vh 0 7vh;
    }

    h1 {
      text-align: left;
    }

    .buttons {
      .forgot {
        padding-top: 12px;
      }
    }

    .buttons-extra {
      margin-top: 79px;
    }
  }
}

</style>
