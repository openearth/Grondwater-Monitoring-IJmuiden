import cookie from '@/lib/cookie';

const initialState = () => ({
  panelIsCollapsed: true,
  toastMessage: null,
});

export default {
  namespaced: true,

  state: {
    termsAndConditionsAccepted: false,
    showImagesDialog: false,
    ...initialState(),
    
  },

  getters: {
    panelIsCollapsed: state => state.panelIsCollapsed,
    toastMessage: state => state.toastMessage,
    termsAndConditionsAccepted: state => state.termsAndConditionsAccepted,
    showImagesDialog: state => state.showImagesDialog,
  },

  mutations: {
    RESET_STATE(state) {
      Object.assign(state, initialState());
    },
    RESET_TOAST_MESSAGE(state) {
      state.toastMessage = null;
    },
    SET_PANEL_IS_COLLAPSED(state, { isCollapsed }) {
      state.panelIsCollapsed = isCollapsed;
    },
    SET_TERMS_AND_CONDITIONS_ACCEPTED(state, { accepted }) {
      state.termsAndConditionsAccepted = accepted;
    },
    SET_TOAST_MESSAGE(state, { type, text }) {
      state.toastMessage = { type, text };
    },
    OPEN_IMAGE_DIALOG(state) {
      state.showImagesDialog = true;
    },
    HIDE_IMAGE_DIALOG(state) {
      state.showImagesDialog = false;
    },
  },

  actions: {
    reset({ commit }) {
      commit('RESET_STATE');
    },
    resetToastMessage({ commit }) {
      commit('RESET_TOAST_MESSAGE');
    },
    setPanelIsCollapsed({ commit }, { isCollapsed }) {
      commit('SET_PANEL_IS_COLLAPSED', { isCollapsed });
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
