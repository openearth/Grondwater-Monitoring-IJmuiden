import getLevelData from '@/lib/get-level-data';

const initialState = () => ({
  activeLevel: null,
  timeseries: [],
});

export default {
  namespaced: true,

  state: {
    ...initialState(),
  },

  getters: {
    activeLevel: state => state.activeLevel,
    timeseries: state => state.timeseries,
  },

  mutations: {
    RESET_ACTIVE_LEVEL(state) {
      state.activeLevel = null;
    },
    RESET_STATE(state) {
      Object.assign(state, initialState());
    },
    RESET_TIMESERIES(state) {
      state.timeseries = [];
    },
    SET_ACTIVE_LEVEL(state, { level }) {
      state.activeLevel = level;
    },
    SET_TIMESERIES(state, { timeseries }) {
      state.timeseries = timeseries;
    },
  },

  actions: {
    reset({ commit }) {
      commit('RESET_STATE');
    },
    resetActiveLevel({ commit }) {
      commit('RESET_ACTIVE_LEVEL');
    },
    resetTimeseries({ commit }) {
      commit('RESET_TIMESERIES');
    },
    getLevel({ commit }, { id }) {
      return getLevelData({ id })
        .then(data => {
          const { location, timeseries } = data;
          commit('SET_ACTIVE_LEVEL', { level: location });
          commit('SET_TIMESERIES', { timeseries });
        })
        .catch(err => Promise.reject(err));
    },
  },
};
