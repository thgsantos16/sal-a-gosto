import Vue from 'vue';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import vueHeadful from 'vue-headful';

import App from './App.vue';

// Importing Boostrap and Icons
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import './registerServiceWorker';
import router from './router';
import store from './store';

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.config.productionTip = false;
Vue.component('vue-headful', vueHeadful);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
