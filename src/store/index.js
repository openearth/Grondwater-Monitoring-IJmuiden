import Vue from 'vue';
import Vuex from 'vuex';

import app from './modules/app';
import level from './modules/level';
import locations from './modules/locations';
import ph from './modules/ph';
import ec from './modules/ec';
import redox from './modules/redox';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    app,
    level,
    locations,
    ph,
    ec,
    redox,
  },
});
