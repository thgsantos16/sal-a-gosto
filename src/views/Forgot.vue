<template>
  <div class="forgot">
    <div class="forgot-inner">
      <h1>Recupere sua senha</h1>

      <form @submit.prevent="submitForgot">
        <input placeholder="Entre seu email" v-model="$v.email.$model">
        <div class="error-container" v-if="$v.email.$dirty">
          <div class="error" v-if="!$v.email.required">Email é obrigatório!</div>
          <div class="error" v-else-if="!$v.email.email">Esse não é um email válido!</div>
        </div>

        <div class="buttons row">
          <div class="col-lg forgot">
          </div>

          <div class="col-lg-auto col-md-12">
            <button type="submit" class="button">Recuperar</button>
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
import { mapActions, mapGetters } from 'vuex';
import { required, email } from 'vuelidate/lib/validators';

export default {
  name: 'Forgot',
  components: {
  },
  data() {
    return {
      email: '',
    };
  },
  computed: {
    ...mapGetters(['getApiUrl']),
  },
  methods: {
    ...mapActions(['setSiteTitle']),
    submitForgot() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let url = `${this.getApiUrl}&meth=novaSenha`;
        url += `&login=${this.email}`;

        fetch(url)
          .then((res) => res.json())
          .then((res) => {
            if (res.result[0].login.length > 0) {
              this.$bvToast.toast('Enviamos um email com sua nova senha!', {
                title: 'Email enviado',
                variant: 'success',
                solid: true,
              });

              this.$router.push({ name: 'login' });
            } else this.error = 'Usuário não encontrado.';
          });
      }
    },
  },
  beforeMount() {
    this.setSiteTitle('Esqueci minha senha | Sal a Gosto');
  },
  validations: {
    email: { required, email },
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
