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
        <router-link v-if="isLoggedIn" :to="{ name: 'lista' }">
          . minha lista
        </router-link>
      </nav>

      <div class="col-auto profile row">
        <div class="search row col">
          <div class="col text" @click="searchClick">
            Buscar
          </div>
          <div class="col-auto search-input" :class="{ closed: !showSearch}">
            <form @submit.prevent="doSearch" ref="sf">
              <input v-model="searchText"
                     placeholder="Digite sua busca"
                     class="search-field"
                     ref="search">
            </form>
            <div class="advanced-search-link">
              <a @click.prevent="advancedSearch">
                Busca avançada
              </a>
            </div>
          </div>
          <div class="col-auto icon" @click="searchClick">
            <img class="search-icon" src="../assets/search.png">
          </div>
        </div>

        <div class="col-auto notifications" v-if="isLoggedIn">
          <img class="notifications-icon" src="../assets/bell.png">
        </div>

        <div class="col-auto profile-image">
          <transition name="fade" mode="out-in" appear>
            <div class="dropdown" v-if="isLoggedIn" key="profile-pic">
              <div class="profile-pic" @click="show = !show"></div>
              <transition name="dropdown">
                <div class="dropdown__menu" v-bind:class="{ active: show }" v-if="show">
                  <ul class="dropdown__menu-nav">
                    <li @click="show = false"
                        class="dropdown__menu-item"
                        v-for="pl in profileLinks"
                        :key="pl.id">
                      <router-link v-if="pl.to" :to="pl.to"
                                   class="dropdown__menu-link"
                                   :title="pl.text">
                        <div class="dropdown__menu-text">{{ pl.text }}</div>
                      </router-link>
                      <a class="dropdown__menu-link logout" v-else @click="logout">
                        <div class="dropdown__menu-text">{{ pl.text }}</div>
                      </a>
                    </li>
                  </ul>
                </div>
              </transition>
            </div>
            <router-link :to="{ name: 'login' }" class="button" key="login-button" v-else>
              Login
            </router-link>
          </transition>
        </div>
      </div>
    </div>

    <div class="mobile-only">
      <div class="hamburger-menu" :class="{ active: menu }" @click="toogleMenu">
        <span v-for="i in 3" :key="i" />
      </div>

      <nav id="mobileNav" class="col" :class="{ active: menu }">
        <form @submit.prevent="doSearch" ref="sf">
          <input v-model="searchText"
                  placeholder="Digite sua busca"
                  class="search-field"
                  ref="search">
        </form>

        <router-link :to="{ name: 'escola'}">
          . a escola
        </router-link>
        <router-link :to="{ name: 'professores' }">
          . professores
        </router-link>
        <router-link :to="{ name: 'destaque' }">
          . destaque
        </router-link>
        <router-link v-if="isLoggedIn" :to="{ name: 'lista' }">
          . minha lista
        </router-link>
        <router-link v-if="isLoggedIn" :to="{ name: 'dados' }">
          . meus dados
        </router-link>
        <router-link v-if="isLoggedIn" :to="{ name: 'assinatura' }">
          . minha assinatura
        </router-link>
        <a v-if="isLoggedIn" href="#" @click.prevent="logout">
          . sair
        </a>

        <router-link :to="{ name: 'login' }" class="button" key="login-button" v-else>
          Login
        </router-link>

        <div class="medias">
          <a target="_blank"
             v-for="link in links"
             :key="link.id"
             :href="link.url"
             :class="link.referencia"></a>
        </div>
      </nav>
    </div>
  </header>

</template>

<script lang="ts">
import { mapActions, mapGetters } from 'vuex';
import Vue from 'vue';

export default Vue.extend({
  data() {
    return {
      links: [],
      showSearch: false,
      searchText: '',
      show: false,
      menu: false,
      profileLinks: [
        {
          id: 1,
          to: { name: 'dados' },
          text: 'Meus Dados',
        },
        {
          id: 2,
          to: { name: 'assinatura' },
          text: 'Minha Assinatura',
        },
        {
          id: 3,
          to: false,
          text: 'Sair',
        },
      ],
    };
  },
  watch: {
    $route() {
      this.menu = false;
    },
  },
  computed: {
    ...mapGetters(['isLoggedIn', 'getApiUrl']),
  },
  beforeMount() {
    const url = `${this.getApiUrl}&mod=links_uteis`;
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        this.links = res.result[0].links_uteis;
      });
  },
  methods: {
    ...mapActions(['setUser']),
    toogleMenu() {
      this.menu = !this.menu;
    },
    advancedSearch() {
      this.showSearch = false;
      this.searchText = '';
      this.$router.push({ name: 'busca', params: { advancedSearch: 'true' } });
    },
    searchClick() {
      if (!this.showSearch) {
        this.showSearch = true;
        const search = this.$refs.search as HTMLInputElement;
        search.focus();
      } else {
        this.doSearch();
      }
    },
    doSearch() {
      if (this.$route.query.search !== this.searchText && this.searchText) {
        this.$router.push({
          name: 'busca',
          query: {
            search: this.searchText,
          },
        });
        this.showSearch = false;
      }
    },
    logout() {
      this.setUser(false);
      this.$router.push({ name: 'login' });
    },
  },
});
</script>

<style lang="scss" scoped>

header {
  transition: all 0.43s;
  padding: 34px 70px 0;
  z-index: 999;
  position: relative;

  @media screen and (max-width: 1420px) {
    padding: 34px 34px 0;

    #nav {
      padding: 20px;
    }
  }

  @media screen and (max-width: 1024px) {
    padding: 16px 20px 10px;
    position: fixed;
    background: #111;

    #nav, .profile {
      display: none;
    }

    img {
      max-width: 60%;
      float: left;
    }
  }

  .dropdown__menu-link {
    cursor: pointer;
  }

  #nav {
    text-align: left;
    padding-top: 40px;

    a {
      transition: all 0.43s;
      color: #FFF;
      opacity: .7;
      margin-right: 25px;

      &:last-child {
        margin-right: 0;
      }

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

    .search-icon {
      cursor: pointer;
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
      cursor: pointer;
    }

    .button {
      margin-top: 4px;
      display: inline-block;
    }
  }

  .notifications {
    padding-top: 32px;
  }

  .mobile-only {
    display: none;

    @media screen and (max-width: 1024px) {
      display: block;
    }
  }

  .hamburger-menu {
    position: fixed;
    top: 24px;
    right: 24px;
    width: 42px;
    z-index: 1092;

    span {
      transition: all 0.43s;
      width: 100%;
      display: block;
      height: 6px;
      background: #EEE;
      margin-bottom: 9px;
    }

    &.active {
      span {
        &:nth-child(2) {
          opacity: 0;
        }

        &:nth-child(1) {
          transform: rotateZ(45deg);
          margin-top: 15px;
        }

        &:nth-child(3) {
          transform: rotateZ(-45deg);
          margin-top: -30px;
        }
      }
    }
  }

  #mobileNav {
    transition: all .7s;
    position: fixed;
    height: 100%;
    width: 100%;
    background: #111111EE;
    top: -100%;
    left: 0;
    padding-top: 10vh;

    &.active {
      top: 0;
    }

    a {
      width: 70%;
      margin: 0 auto;
      display: block;
      font-size: 2.8vh;
      padding: 1.6vh 0;
      border-bottom: 1px #222 solid;
    }

    .medias {
      padding-top: 52px;

      a {
        display: inline-block;
        height: 28px;
        width: 30px;
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
}

</style>
