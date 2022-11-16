import getLocationsData from '@/lib/get-locations-data';

const initialState = () => ({
  locations: [],
  activeLocation: null,
});

export default {
  namespaced: true,

  state: {
    ...initialState(),
  },

  getters: {
    activeLocation: state => state.activeLocation,
    locations: state => state.locations,
  },

  mutations: {
    RESET_STATE(state) {
      Object.assign(state, initialState());
    },
    SET_ACTIVE_LOCATION(state, { id }) {
      state.activeLocation = state.locations.find(location => location.properties.loc_id === id);
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
    setActiveLocation({ commit }, { id }) {
      commit('SET_ACTIVE_LOCATION', { id });
    },
    reset({ commit }) {
      commit('RESET_STATE');
    },
  },
};
