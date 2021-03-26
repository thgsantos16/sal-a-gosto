import Vue from 'vue';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import vueHeadful from 'vue-headful';
import VueCryptojs from 'vue-cryptojs';
import Vuelidate from 'vuelidate';
import VueLodash from 'vue-lodash';
import lodash from 'lodash';
import VueTheMask from 'vue-the-mask';
import VueScrollReveal from 'vue-scroll-reveal';

import App from './App.vue';

// Importing Boostrap and Icons
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import './registerServiceWorker';
import router from './router';
import store from './store';

Vue.use(VueTheMask);
Vue.use(VueLodash, { name: 'custom', lodash });
Vue.use(Vuelidate);
Vue.use(VueCryptojs);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

Vue.use(VueScrollReveal, {
  class: 'v-scroll-reveal',
  duration: 800,
  scale: 0.8,
  distance: '16px',
  mobile: false,
  delay: 250,
});

Vue.config.productionTip = false;
Vue.component('vue-headful', vueHeadful);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
