import Vue from 'vue';
import VueMeta from 'vue-meta';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import Multiselect from 'vue-multiselect';
import vueHeadful from 'vue-headful';
import VueCryptojs from 'vue-cryptojs';
import Vuelidate from 'vuelidate';
import VueLodash from 'vue-lodash';
import lodash from 'lodash';
import VueTheMask from 'vue-the-mask';
import VueScrollReveal from 'vue-scroll-reveal';
import StarRating from 'vue-star-rating';
import VueLazyload from 'vue-lazyload';
import Loader from './components/Loader.vue';
import LoaderApi from './components/LoaderApi.vue';

import App from './App.vue';

// Importing Boostrap and Icons
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import 'vue-multiselect/dist/vue-multiselect.min.css';

import './registerServiceWorker';
import router from './router';
import store from './store';

Vue.use(VueTheMask);
Vue.use(VueLodash, { name: 'custom', lodash });
Vue.use(Vuelidate);
Vue.use(VueCryptojs);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VueMeta);

Vue.use(VueLazyload, {
  lazyComponent: true,
});

Vue.use(VueScrollReveal, {
  class: 'v-scroll-reveal',
  duration: 800,
  scale: 0.8,
  distance: '16px',
  mobile: false,
  delay: 160,
});

Vue.config.productionTip = false;
Vue.component('vue-headful', vueHeadful);
Vue.component('Loader', Loader);
Vue.component('LoaderApi', LoaderApi);
Vue.component('StarRating', StarRating);
Vue.component('multiselect', Multiselect);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
