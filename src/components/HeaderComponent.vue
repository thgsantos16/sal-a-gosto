<template>
  <header class="container-fluid">
    <div class="row">
      <div class="logo col-auto">
        <router-link :to="{ name: 'home'}">
          <img alt="Sal a Gosto" src="../assets/logo.png">
        </router-link>
      </div>

      <nav id="nav" class="col">
        <router-link :to="{ name: 'escola'}">
          . a escola
        </router-link>
        <router-link :to="{ name: 'professores' }">
          . professores
        </router-link>
        <router-link :to="{ name: 'destaque' }">
          . destaque
        </router-link>
        <router-link :to="{ name: 'lista' }">
          . minha lista
        </router-link>
      </nav>

      <div class="col-auto profile row">
        <div class="search row col">
          <div class="col text">
            Buscar
          </div>
          <div class="col-auto search-input" :class="{ closed: !showSearch}">
            <input placeholder="Digite sua busca" class="search-field">
          </div>
          <div class="col-auto icon" @click="showSearch = true">
            <img class="search-icon" src="../assets/search.png">
          </div>
        </div>

        <div class="col-auto notifications">
          <img class="notifications-icon" src="../assets/bell.png">
        </div>

        <div class="col-auto profile-image">
          <div v-if="$store.getters.isLoggedIn" class="profile-pic"></div>
          <router-link :to="{ name: 'login' }" class="button" v-else>Login</router-link>
        </div>
      </div>
    </div>
  </header>

</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  data() {
    return {
      showSearch: false,
    };
  },
});
</script>

<style lang="scss" scoped>

header {
  padding: 34px 70px 0;
  z-index: 999;
  position: relative;

  #nav {
    text-align: left;
    padding-top: 40px;

    a {
      transition: all 0.43s;
      color: #FFF;
      opacity: .7;
      margin-right: 25px;

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

  .profile {
    text-align: right;
  }

  .search {
    padding-top: 30px;

    .text {
      padding-top: 7px;
    }

    .icon {
      padding-top: 2px;
    }

    .search-input {
      transition: all 0.43s;
      overflow: hidden;
      margin-top: -19px;
      width: 250px;

      &.closed {
        width: 0;
        max-width: 0;
        padding: 0;
      }
    }
  }

  .profile-image {
    padding-top: 18px;

    .profile-pic {
      width: 57px;
      height: 57px;
      background-color: #FFF;
      border-radius: 50%;
    }

    .button {
      margin-top: 4px;
      display: inline-block;
    }
  }

  .notifications {
    padding-top: 32px;
  }
}

</style>
