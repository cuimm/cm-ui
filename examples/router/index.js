import VueRouter from 'vue-router';
import Demo from '../demo/index';

const routes = [
  {
    path: '/',
    name: 'Demo',
    component: Demo,
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
