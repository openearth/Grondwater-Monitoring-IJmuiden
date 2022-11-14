import Vue from 'vue';
import VueRouter from 'vue-router';

import Map from '@/views/map';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    meta: {
      title: 'Home',
    },
  },
  {
    path: '/map',
    component: Map,
    name: 'map',
    meta: {
      title: 'Map',
    },
  },
  {
    path: '*',
    redirect: { name: 'home' },
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
