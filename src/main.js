import Vue from 'vue';
import App from '@/App.vue';
import vuetify from '@/plugins/vuetify';
import vue2mapbox from '@/plugins/vue2mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import store from '@/store';
import router from '@/router';

import './main.css';

Vue.config.productionTip = false;

new Vue({
  vuetify,
  vue2mapbox,
  store,
  router,
  render: h => h(App),
}).$mount('#app');
