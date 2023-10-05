/* eslint-disable */

const personalize = {
  namespaced: true,
  state: {
    dppu: null,
    multipleDppu: true,
    signature: [],
  },
  getters: {
    dppu: (state) => state.dppu,
    multipleDppu: (state) => state.multipleDppu,
    signature: (state) => state.signature,
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
  },
};

export default personalize;
