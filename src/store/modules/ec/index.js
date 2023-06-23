import getEcData from '@/lib/get-ec-data';

const initialState = () => ({
  timeseries: [],
  activeEc: null,
});

export default {
  namespaced: true,

  state: {
    ...initialState(),
  },

  getters: {
    timeseries: state => state.timeseries,
    activeEc: state => state.ec,
  },

  mutations: {
    RESET_STATE(state) {
      Object.assign(state, initialState());
    },
    RESET_TIMESERIES(state) {
      state.timeseries = [];
    },
    SET_TIMESERIES(state, { timeseries }) {
      state.timeseries = timeseries;
    },
    SET_ACTIVE_EC(state, { ec }) {
      state.activeEc = ec;
    },
    RESET_ACTIVE_EC(state) {
      state.activeEc = null;
    },
  },

  actions: {
    reset({ commit }) {
      commit('RESET_STATE');
    },
    resetTimeseries({ commit }) {
      commit('RESET_TIMESERIES');
    },
    getEc({ commit }, { id }) {
      return getEcData({ id })
        .then(({ parameters, properties, statistics, timeseries }) => {
          const ec = { parameters, properties, statistics };
          commit('SET_ACTIVE_EC', { ec });
          commit('SET_TIMESERIES', { timeseries: timeseries });
        })
        .catch(err => Promise.reject(err));
    },
  },
};
