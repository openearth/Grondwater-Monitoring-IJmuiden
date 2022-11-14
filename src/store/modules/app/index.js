import cookie from '@/lib/cookie';

const initialState = () => ({
  toastMessage: null,
});

export default {
  namespaced: true,

  state: {
    termsAndConditionsAccepted: false,
    ...initialState(),
  },

  getters: {
    toastMessage: state => state.toastMessage,
    termsAndConditionsAccepted: state => state.termsAndConditionsAccepted,
  },

  mutations: {
    RESET_STATE(state) {
      Object.assign(state, initialState());
    },
    RESET_TOAST_MESSAGE(state) {
      state.toastMessage = null;
    },
    SET_TERMS_AND_CONDITIONS_ACCEPTED(state, { accepted }) {
      state.termsAndConditionsAccepted = accepted;
    },
    SET_TOAST_MESSAGE(state, { type, text }) {
      state.toastMessage = { type, text };
    },
  },

  actions: {
    reset({ commit }) {
      commit('RESET_STATE');
    },
    resetToastMessage({ commit }) {
      commit('RESET_TOAST_MESSAGE');
    },
    setTermsAndConditionsAccepted({ commit }, { accepted }) {
      cookie('gtb_tac_accepted', accepted, 1);
      commit('SET_TERMS_AND_CONDITIONS_ACCEPTED', { accepted });
    },
    setToastMessage({ commit }, { type, text }) {
      commit('SET_TOAST_MESSAGE', { type, text });
    },
  },
};
