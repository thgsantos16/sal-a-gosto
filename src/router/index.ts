import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

// Pages
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Escola from '../views/Escola.vue';
import Forgot from '../views/Forgot.vue';
import Register from '../views/Register.vue';
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
    path: '/terms',
    name: 'terms',
    component: Register,
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
    path: '/destaque',
    name: 'destaque',
    component: Home,
  },
  {
    path: '/minha-lista',
    name: 'lista',
    component: Home,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
