import getLocationsData from '@/lib/get-locations-data';

const initialState = () => ({
  locations: [],
});

export default {
  namespaced: true,

  state: {
    ...initialState(),
  },

  getters: {
    locations: state => state.locations,
  },

  mutations: {
    RESET_STATE(state) {
      Object.assign(state, initialState());
    },
    SET_LOCATIONS(state, { locations }) {
      state.locations = locations;
    },
  },

  actions: {
    getLocations({ commit }) {
      return getLocationsData()
        .then((locations) => commit('SET_LOCATIONS', { locations }))
        .catch(err => Promise.reject(err));
    },
    reset({ commit }) {
      commit('RESET_STATE');
    },
  },
};
