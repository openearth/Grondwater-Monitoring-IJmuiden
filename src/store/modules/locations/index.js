import getLocationsData from '@/lib/get-locations-data';
import getLocationTimeseries from '@/lib/get-location-timeseries';

const initialState = () => ({
  activeLevel: null,
  activeLocation: null,
  locations: [],
  timeseries: [],
  timeseriesModalOpen: false,
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
    timeseries: state => state.timeseries,
    timeseriesModalOpen: state => state.timeseriesModalOpen,
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
    SET_TIMESERIES(state, { timeseries }) {
      state.timeseries = timeseries;
    },
    SET_TIMESERIES_MODAL_OPEN(state, { open }) {
      state.timeseriesModalOpen = open;
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
    setTimeseries({ commit }, { id }) {
      return getLocationTimeseries({ id })
        .then((timeseries) => commit('SET_TIMESERIES', { timeseries }))
        .catch(err => Promise.reject(err));
    },
    setTimeseriesModalOpen({ commit }, { open }) {
      commit('SET_TIMESERIES_MODAL_OPEN', { open });
    },
  },
};
