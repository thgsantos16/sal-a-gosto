import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

// Pages
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Lista from '../views/Lista.vue';
import Dados from '../views/Dados.vue';
import Busca from '../views/Busca.vue';
import Escola from '../views/Escola.vue';
import Forgot from '../views/Forgot.vue';
import Planos from '../views/Planos.vue';
import Endereco from '../views/Endereco.vue';
import Destaque from '../views/Destaque.vue';
import Register from '../views/Register.vue';
import Pagamento from '../views/Pagamento.vue';
import Assinatura from '../views/Assinatura.vue';
import Professores from '../views/Professores.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/forgot',
    name: 'forgot',
    component: Forgot,
  },
  {
    path: '/dados',
    name: 'dados',
    component: Dados,
  },
  {
    path: '/planos',
    name: 'planos',
    component: Planos,
  },
  {
    path: '/terms',
    name: 'terms',
    component: Register,
  },
  {
    path: '/busca',
    name: 'busca',
    component: Busca,
  },
  {
    path: '/politics',
    name: 'politics',
    component: Register,
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
  },
  {
    path: '/endereco',
    name: 'endereco',
    component: Endereco,
  },
  {
    path: '/escola',
    name: 'escola',
    component: Escola,
  },
  {
    path: '/professores',
    name: 'professores',
    component: Professores,
  },
  {
    path: '/pagamento',
    name: 'pagamento',
    component: Pagamento,
  },
  {
    path: '/destaque',
    name: 'destaque',
    component: Destaque,
  },
  {
    path: '/assinatura',
    name: 'assinatura',
    component: Assinatura,
  },
  {
    path: '/minha-lista',
    name: 'lista',
    component: Lista,
  },
  {
    path: '/aulas/:slug/:id',
    name: 'home-permalink',
    component: Home,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
