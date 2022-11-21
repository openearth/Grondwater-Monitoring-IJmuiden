import getLocationsData from '@/lib/get-locations-data';
import getLocationTimeseries from '@/lib/get-location-timeseries';

const initialState = () => ({
  activeLevel: null,
  activeLocation: null,
  locations: [],
  timeseries: [],
});

export default {
  namespaced: true,

  state: {
    ...initialState(),
  },

  getters: {
    activeLevel: state => state.activeLevel,
    activeLocation: state => state.activeLocation,
    locations: state => state.locations,
  },

  mutations: {
    RESET_STATE(state) {
      Object.assign(state, initialState());
    },
    SET_ACTIVE_LEVEL(state, { level }) {
      state.activeLevel = level;
    },
    SET_ACTIVE_LOCATION(state, { id }) {
      state.activeLocation = state.locations.find(location => location.properties.loc_id === id);
    },
    SET_LOCATION_TIMESERIES(state, { timeseries }) {
      state.timeseries = timeseries;
    },
    SET_LOCATIONS(state, { locations }) {
      state.locations = locations;
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
    setActiveLevel({ commit }, { level }) {
      commit('SET_ACTIVE_LEVEL', { level });
    },
    setActiveLocation({ commit }, { id }) {
      commit('SET_ACTIVE_LOCATION', { id });
    },
    setLocationTimeseries({ commit }, { id }) {
      return getLocationTimeseries({ id })
        .then((timeseries) => commit('SET_LOCATION_TIMESERIES', { timeseries }))
        .catch(err => Promise.reject(err));
    },
  },
};
