import Vue from 'vue';
import App from './app.vue';
import VueRouter from 'vue-router';
import CmComponents from '@src/index';
import router from './router';

Vue.use(VueRouter);
Vue.use(CmComponents);

new Vue({
  el: '#app',
  router,
  render: h => h(App),
});
