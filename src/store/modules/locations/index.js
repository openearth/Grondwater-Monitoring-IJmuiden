import getLocationsData from '@/lib/get-locations-data';

const initialState = () => ({
  activeLocation: null,
  locations: [],
  selectedLocation: null,
});

export default {
  namespaced: true,

  state: {
    ...initialState(),
  },

  getters: {
    activeLocation: state => state.activeLocation,
    locations: state => state.locations,
    selectedLocation: state => state.selectedLocation,
  },

  mutations: {
    RESET_ACTIVE_LOCATION(state) {
      state.activeLocation = null;
    },
    RESET_STATE(state) {
      Object.assign(state, initialState());
    },
    SET_ACTIVE_LOCATION(state, { id }) {
      state.activeLocation = state.locations.find(location => location.properties.loc_id === id);
    },
    SET_LOCATIONS(state, { locations }) {
      state.locations = locations;
    },
    SET_SELECTED_LOCATION(state, { id }) {
      state.selectedLocation = state.locations.find(location => location.properties.loc_id === id);
    },
  },

  actions: {
    getLocations({ commit }) {
      return getLocationsData()
        .then(({ features }) => commit('SET_LOCATIONS', { locations: features }))
        .catch(err => Promise.reject(err));
    },
    reset({ commit }) {
      commit('RESET_STATE');
    },
    resetActiveLocation({ commit }) {
      commit('RESET_ACTIVE_LOCATION');
    },
    setActiveLocation({ commit }, { id }) {
      commit('SET_ACTIVE_LOCATION', { id });
    },
    setSelectedLocation({ commit }, { id }) {
      commit('SET_SELECTED_LOCATION', { id });
    },
  },
};
