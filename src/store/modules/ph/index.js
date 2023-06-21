import getPhData from '@/lib/get-ph-data';

const initialState = () => ({
  timeseries: [],
  activePh: null,
});

export default {
  namespaced: true,

  state: {
    ...initialState(),
  },

  getters: {
    timeseries: state => state.timeseries,
    activePh: state => state.ph,
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
    SET_ACTIVE_PH(state, { ph }) {
      state.activePh = ph;
    },
    RESET_ACTIVE_PH(state) {
      state.activePh = null;
    },
  },

  actions: {
    reset({ commit }) {
      commit('RESET_STATE');
    },
    resetTimeseries({ commit }) {
      commit('RESET_TIMESERIES');
    },
    getPh({ commit }, { id }) {
      return getPhData({ id })
        .then(({ parameters, properties, statistics, timeseries }) => {
          const ph = { parameters, properties, statistics };
          commit('SET_ACTIVE_PH', { ph });
          commit('SET_TIMESERIES', { timeseries: timeseries });
        })
        .catch(err => Promise.reject(err));
    },
  },
};
