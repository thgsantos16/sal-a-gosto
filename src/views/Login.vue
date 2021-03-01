<template>
  <div class="login">
    <div class="login-inner">
      <h1>Login</h1>

      <form>
        <input placeholder="Email">
        <input placeholder="Senha" type="password">

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
        <router-link :to="{ name: 'register' }" class="button btn-block">
          Quero Assinar
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Login',
  components: {
  },
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    ...mapActions(['setSiteTitle']),
  },
  beforeMount() {
    this.setSiteTitle('Login | Sal a Gosto');
  },
};
</script>

<style lang="scss" scoped>

.login {
  .login-inner {
    padding: 15vh 0;
    width: 486px;
    margin: 0 auto;

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
