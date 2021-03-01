<template>
  <div class="forgot">
    <div class="forgot-inner">
      <h1>Recupere sua senha</h1>

      <form>
        <input placeholder="Entre seu email">

        <div class="buttons row">
          <div class="col-lg forgot">
          </div>

          <div class="col-lg-auto col-md-12">
            <button class="button">Recuperar</button>
          </div>
        </div>
      </form>

      <div class="buttons-extra">
        <router-link :to="{ name: 'login' }" class="button btn-block">
          Voltar ao Login
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Forgot',
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
    this.setSiteTitle('Esqueci minha senha | Sal a Gosto');
  },
};
</script>

<style lang="scss" scoped>

.forgot {
  .forgot-inner {
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
