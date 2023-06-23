import getRedoxData from '@/lib/get-redox-data';

const initialState = () => ({
  timeseries: [],
  activeRedox: null,
});

export default {
  namespaced: true,

  state: {
    ...initialState(),
  },

  getters: {
    timeseries: state => state.timeseries,
    activeRedox: state => state.redox,
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
    SET_ACTIVE_REDOX(state, { redox }) {
      state.activeRedox = redox;
    },
    RESET_ACTIVE_REDOX(state) {
      state.activeRedox = null;
    },
  },

  actions: {
    reset({ commit }) {
      commit('RESET_STATE');
    },
    resetTimeseries({ commit }) {
      commit('RESET_TIMESERIES');
    },
    getRedox({ commit }, { id }) {
      return getRedoxData({ id })
        .then(({ parameters, properties, statistics, timeseries }) => {
          const redox = { parameters, properties, statistics };
          commit('SET_ACTIVE_REDOX', { redox });
          commit('SET_TIMESERIES', { timeseries: timeseries });
        })
        .catch(err => Promise.reject(err));
    },
  },
};
