/* eslint-disable */

const personalize = {
  namespaced: true,
  state: {
    dppu: null,
    multipleDppu: true,
    signature: [],
    sf139b: {
      harga: null,
      persentaseLosses: null,
    }
  },
  getters: {
    dppu: (state) => state.dppu,
    multipleDppu: (state) => state.multipleDppu,
    signature: (state) => state.signature,
    sf139b: (state) => state.sf139b,
  },
  mutations: {
    UPDATE_DPPU: (state, payload) => {
      state.dppu = payload;
    },
    UPDATE_MULTIPLE_DPPU: (state, payload) => {
      state.multipleDppu = payload;
    },
    UPDATE_SIGNATURE: (state, payload) => {
      state.signature = payload;
    },
    UPDATE_SF139B: (state, payload) => {
      state.sf139b = payload;
    },
  },
  actions: {
    updateDppu({ commit }, payload) {
      commit("UPDATE_DPPU", payload);
    },
    updateMultipleDppu({ commit }, payload) {
      commit("UPDATE_MULTIPLE_DPPU", payload);
    },
    updateSignature({ commit }, payload) {
      commit("UPDATE_SIGNATURE", payload);
    },
    updateSf139b({ commit }, payload) {
      commit("UPDATE_SF139B", payload);
    },
  },
};

export default personalize;
