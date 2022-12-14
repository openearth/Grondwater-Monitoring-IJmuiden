import Vue from 'vue';
import Vuex from 'vuex';

import app from './modules/app';
import level from './modules/level';
import locations from './modules/locations';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    app,
    level,
    locations,
  },
});
