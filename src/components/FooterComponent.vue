<template>
  <footer class="container-fluid">
    <div class="row">
      <div class="medias col-md-auto col-12">
        <div class="icons">
          <a target="_blank"
             v-for="link in links"
             :key="link.id"
             :href="link.permalink"
             :class="link.referencia"></a>

          <div class="mdeias-text">
            Para mais dicas, receitas e curiosidades,<br>
            siga-nos nas redes.
          </div>
        </div>
      </div>

      <nav id="nav" class="col">
        <div>
          <router-link :to="{ name: 'escola'}">
            . a escola
          </router-link>
        </div>
        <div>
          <router-link :to="{ name: 'professores' }">
            . professores
          </router-link>
        </div>
        <div>
          <router-link :to="{ name: 'destaque' }">
            . destaque
          </router-link>
        </div>
        <div>
          <router-link v-if="isLoggedIn" :to="{ name: 'lista' }">
            . minha lista
          </router-link>
        </div>
      </nav>

      <div class="col-md-auto col-12 logo">
        <img alt="Sal a Gosto" src="../assets/logo.png">
      </div>
    </div>
  </footer>

</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';

export default Vue.extend({
  computed: {
    ...mapGetters(['isLoggedIn', 'getApiUrl']),
  },
  data() {
    return {
      links: [],
    };
  },
  beforeMount() {
    const url = `${this.getApiUrl}&mod=links_uteis`;
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        this.links = res.result[0].links_uteis;
      });
  },
});
</script>

<style lang="scss" scoped>

footer {
  padding: 34px 70px 0;
  z-index: 99;
  position: relative;

  .logo img {
    @media screen and (max-width: 1024px) {
      margin-bottom: 20px;
      max-width: 70%;
    }
  }

  #nav {
    text-align: right;
    padding-top: 0;

    @media screen and (max-width: 1024px) {
      display: none;
    }

    a {
      transition: all 0.43s;
      color: #FFF;
      opacity: .7;
      margin-right: 7px;

      &:hover {
        text-decoration: none;
        opacity: 1;
      }

      &.router-link-exact-active {
        // color: #e00109;
        opacity: 1;
        text-shadow: 2px 2px 6px #00000077;
      }
    }
  }

  .medias {
    padding-top: 25px;

    .mdeias-text {
      display: inline-block;
      text-align: left;
      vertical-align: top;
      font-size: 12px;
      margin-top: -3px;

      @media screen and (max-width: 1024px) {
        display: block;
        width: 100%;
        margin: 12px auto;
      }
    }

    a {
      display: inline-block;
      height: 28px;
      min-width: 30px;
      margin-right: 10px;
      background: url(../assets/icon-facebook.png) center/contain no-repeat;
      vertical-align: top;
      opacity: .7;

      &:hover {
        opacity: 1;
      }

      &.instagram {
        background-image: url(../assets/icon-instagram.png);
      }

      &.youtube {
        background-image: url(../assets/icon-youtube.png);
        width: 40px;
      }

      &.instagram-text {
        opacity: 1;
        background-image: none;
      }
    }
  }
}

</style>
