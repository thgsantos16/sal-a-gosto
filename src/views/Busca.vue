<template>
  <div class="busca">

    <div class="container-fluid search-advanced">
      <div class="row">
        <div class="col-lg-8 col-xl-6">
          <form @submit.prevent="newSearch">
            <div class="row">
              <div class="col-lg">
                <input v-model="localText" placeholder="Digite sua busca" class="search-field">
              </div>
              <div class="col-lg-auto">
                <button type="submit" class="button margin-top">Buscar</button>
              </div>
            </div>
          </form>
        </div>
        <div class="col text-right pt-3">
          <a href="#" :disabled="!clickAdvanced" @click.prevent="showAdvanced = !showAdvanced">
            {{ showAdvanced ? '-' : '+' }} Busca Avançada
          </a>
        </div>
      </div>
    </div>

    <div class="advanced-filters" :style="{ height: `${advancedHeight}px` }">
      <div ref="adv" class="row text-left">
        <div class="col-lg">
          <h4>Professores:</h4>
          <multiselect v-model="selectedFilter.professores"
                       v-if="clickAdvanced"
                       :options="filters.professores"
                       :searchable="false"
                       :close-on-select="false"
                       :show-labels="false"
                       :multiple="true"
                       placeholder="Escolha um ou mais"
                       track-by="id"
                       label="titulo"
                       :maxHeight="250" />
        </div>
        <div class="col-lg">
          <h4>Receitas:</h4>
          <multiselect v-model="selectedFilter.receitas"
                       v-if="clickAdvanced"
                       :options="filters.receitas"
                       :searchable="false"
                       :close-on-select="false"
                       :show-labels="false"
                       :multiple="true"
                       placeholder="Escolha uma ou mais"
                       track-by="id"
                       label="titulo"
                       :maxHeight="250" />
        </div>
        <div class="col-lg">
          <h4>Ingredientes:</h4>
          <multiselect v-model="selectedFilter.ingredientes"
                       v-if="clickAdvanced"
                       :options="filters.ingredientes"
                       :searchable="true"
                       :close-on-select="false"
                       :show-labels="false"
                       :multiple="true"
                       placeholder="Escolha um ou mais"
                       track-by="id"
                       label="titulo"
                       :maxHeight="250">
            <span slot="noResult">
              Nenhum resultado encontrado.
            </span>
          </multiselect>
        </div>
        <div class="col-lg-auto col">
          <h4>Tempo de Preparo:</h4>
          <input v-model="selectedFilter.tempo.de" placeholder="De" class="advanced-input">
          <input v-model="selectedFilter.tempo.ate" placeholder="Até" class="advanced-input">
          * Em Segundos
        </div>
        <div class="col-lg-auto col">
          <h4>Calorias:</h4>
          <input v-model="selectedFilter.calorias.de" placeholder="De" class="advanced-input">
          <input v-model="selectedFilter.calorias.ate" placeholder="Até" class="advanced-input">

          <div class="kcal-text" v-html="textKcal" />
        </div>
      </div>
    </div>

    <transition name="fade" mode="out-in" appear>
      <div class="stripes" v-if="!loading">
        <stripe v-scroll-reveal
                v-for="stripe in stripes"
                :key="`${stripe.id}-${stripe.title}`"
                :stripe="stripe"
                :left="!alignCenter(stripe)" />

        <div class="ops" v-if="stripes.length === 0 && !loading">
          <div class="ops-title">
            <span>Nada encontrado.</span>
            A sua busca não retornou nenhum resultado,
            tente modificá-la ou volte para lista de videos.
          </div>
        </div>
      </div>

      <Loader v-else />
    </transition>
  </div>
</template>

<script>
import _ from 'lodash';
import { mapActions, mapGetters } from 'vuex';
import Stripe from '../components/Stripe.vue';

export default {
  name: 'Busca',
  components: {
    Stripe,
  },
  data() {
    return {
      hero: {
        title: '',
        small: '',
        summary: '',
        hasButton: false,
        buttonText: '',
        ready: false,
      },
      loading: true,
      stripes: [],
      localText: '',
      showAdvanced: false,
      filters: {},
      advancedHeight: 0,
      clickAdvanced: false,
      selectedFilter: {
        tempo: {},
        calorias: {},
      },
      textKcal: '',
    };
  },
  computed: {
    ...mapGetters(['getApiUrl', 'getUser']),
    searchText() {
      return this.$route.query.search;
    },
    query() {
      return this.$route.query;
    },
  },
  watch: {
    selectedFilter: {
      handler(val) {
        let idProfessor = '';
        let idReceita = '';
        let ingredientes = '';

        if (val.ingredientes) {
          val.ingredientes.forEach((ing) => {
            if (ingredientes !== '') ingredientes += `;${ing.id}`;
            else ingredientes += ing.id;
          });
        }

        if (val.professores) {
          val.professores.forEach((prof) => {
            if (idProfessor !== '') idProfessor += `;${prof.id}`;
            else idProfessor += prof.id;
          });
        }

        if (val.receitas) {
          val.receitas.forEach((rec) => {
            if (idReceita !== '') idReceita += `;${rec.id}`;
            else idReceita += rec.id;
          });
        }

        this.$router.push({
          name: 'busca',
          query: {
            search: this.$route.query.search,
            // eslint-disable-next-line @typescript-eslint/camelcase
            id_professor: idProfessor,
            // eslint-disable-next-line @typescript-eslint/camelcase
            id_receita: idReceita,
            ingredientes,
          },
        });
      },
      deep: true,
    },
    query: {
      handler(val) {
        if (val) {
          let url = `${this.getApiUrl}&meth=getAulas`;
          if (this.getUser) url += `&id_usuario=${this.getUser.login_token}`;
          if (val.id_professor) url += `&id_professor=${val.id_professor}`;
          if (val.id_receita) url += `&id_receita=${val.id_receita}`;
          if (val.ingredientes) url += `&ingrediente=${val.ingredientes}`;
          url += `&search=${val.search}`;
          this.localText = val.search;

          this.stripes = [];
          this.loading = true;

          fetch(url)
            .then((res) => res.json())
            .then((res) => {
              const { aulas } = res.result[0];

              aulas.forEach((aula) => {
                Object.values(aula).forEach((cat, i) => {
                  if (cat.length > 0) {
                    this.stripes.push({
                      title: cat[0].categoria,
                      classes: cat,
                      id: i,
                    });
                  }
                });
              });
              this.hero.ready = true;
              this.loading = false;
            });
        }
      },
      deep: true,
      immediate: true,
    },
    showAdvanced(val) {
      if (val) this.advancedHeight = this.$refs.adv.clientHeight + 200;
      else this.advancedHeight = 0;
    },
  },
  methods: {
    ...mapActions(['setSiteTitle']),
    setFilter(type, item) {
      this.$set(this.selectedFilter, type, item.id);
    },
    alignCenter(stripe) {
      if (stripe.classes.length < 3) return false;
      if (window.innerWidth > 600 && stripe.classes.length < 4) return false;
      if (window.innerWidth > 1024 && stripe.classes.length < 6) return false;
      if (window.innerWidth > 1600 && stripe.classes.length < 8) return false;
      return true;
    },
    newSearch() {
      if (this.$route.query.search !== this.localText) {
        this.$router.push({
          name: 'busca',
          query: {
            search: this.localText,
          },
        });
      }
    },
  },
  beforeMount() {
    this.setSiteTitle('Minha Lista | Sal a Gosto');
    this.localText = this.$route.query.search;

    let url = `${this.getApiUrl}&meth=getFiltros`;
    if (this.getUser) url += `&id_usuario=${this.getUser.login_token}`;

    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        res.result[0].filtros.forEach((filtro) => {
          this.filters[_.keysIn(filtro)[0]] = filtro[_.keysIn(filtro)[0]];
        });
        this.clickAdvanced = true;
      });

    url = `${this.getApiUrl}&mod=conteudos&where=nome_arquivo=%22calorias%22`;
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        this.textKcal = res.result[0].conteudos[0].texto;
      });
  },
};
</script>

<style lang="scss" scoped>

.busca {
  padding: 52px 0 25px;
}

.search-advanced {
  padding: 0 70px 34px;

  .button.margin-top {
    margin-top: 11px;
  }
}

.advanced-filters {
    transition: all 0.7s;
    width: calc(100% - 160px);
    margin: 0 auto;
    overflow: hidden;
    height: 0;

    @media screen and (max-width: 1024px) {
      width: 90%;

      & > .row > div {
        margin-bottom: 20px;
      }
    }

    input {
      width: 250px !important;

      @media screen and (max-width: 1024px) {
        width: 100% !important;
      }
    }

    .kcal-text {
        width: 250px;
        font-size: 0.75rem;
    }

    &.show {
      margin: 0 auto 25px;
    }

    h4 {
      font-weight: bold;
    }

    div {
      a {
        display: block;
        padding: 2px 0;
        cursor: pointer;

        &.selected {
          color: #e22229 !important;
        }
      }
    }
}

.stripes {
  z-index: 9;
  position: relative;
}

.ops {
  font-size: 38px;
  font-weight: bold;
  width: 60%;
  margin: 11vh auto;
  text-align: left;

  @media screen and (max-width: 1024px) {
    width: 90%;
    overflow-x: hidden;
      text-align: center;
      font-size: 1.6rem;
  }

  span {
    display: block;
    font-size: 70px;
    width: 100%;
    margin-bottom: 25px;

    @media screen and (max-width: 1024px) {
      font-size: 3.4rem;
    }
  }
}

</style>
