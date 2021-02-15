import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/escola',
    name: 'escola',
    component: Home,
  },
  {
    path: '/professores',
    name: 'professores',
    component: Home,
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
