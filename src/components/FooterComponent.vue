<template>
  <footer class="container-fluid">
    <div class="row">
      <div class="medias col-auto">
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
          <router-link :to="{ name: 'lista' }">
            . minha lista
          </router-link>
        </div>
      </nav>

      <div class="col-auto logo">
        <img alt="Sal a Gosto" src="../assets/logo.png">

      </div>
    </div>
  </footer>

</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({

});
</script>

<style lang="scss" scoped>

footer {
  padding: 34px 70px 0;
  z-index: 999;
  position: relative;

  #nav {
    text-align: right;
    padding-top: 0;

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
}

</style>
