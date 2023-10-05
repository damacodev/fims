/* eslint-disable */

import { get, post } from "@/core/services/apis";

const auth = {
  namespaced: true,
  state: {
    authStatus: "signin",
    isFailed: false,
    failMessage: "",
    user: null,
    token: null,
    config: null,
  },
  getters: {
    user: (state) => state.user,
    token: (state) => state.token,
    config: (state) => state.config,
    authStatus: (state) => state.authStatus,
    isLoggedIn: (state) => !!state.token,
    isFailed: (state) => state.isFailed,
    failMessage: (state) => state.failMessage,
  },
  mutations: {
    FAILED: (state, payload) => {
      state.authStatus = "signin";
      state.isFailed = true;
      state.failMessage = payload.message ? payload.message : payload.title;
    },
    SIGNIN_SUCCESS: (state, payload) => {
      state.authStatus = "loggedin";
      state.isFailed = false;
      state.failMessage = "";
      state.user = payload.data.me;
      state.token = {
        accessToken: payload.data.token.auth,
        refreshToken: payload.data.token.refresh,
      };
      state.config = payload.data.config;
    },
    UPDATE_USER: (state, payload) => {
      state.user = payload;
    },
    REFRESH_SUCCESS: (state, payload) => {
      state.token = {
        accessToken: payload.data.token.auth,
        refreshToken: payload.data.token.refresh,
      };
    },
  },
  actions: {
    updateUser({ commit }, payload) {
      commit("UPDATE_USER", payload);
    },
    async signin({ commit }, payload) {
      try {
        let response = await post({
          url: "/auth/signin",
          params: payload,
        });
        commit("SIGNIN_SUCCESS", response);
        return response;
      } catch (e) {
        return { error: true, message: e.title || e.message };
      }
    },
    async refreshToken({ commit }, payload) {
      try {
        let response = await post({
          url: "/auth/refresh-token",
          params: payload,
        });
        commit("REFRESH_SUCCESS", response);
        return response;
      } catch (e) {
        return { error: true, message: e.title || e.message };
      }
    },
    async logout() {
      try {
        let response = await get({
          url: "/auth/logout",
        });
        localStorage.removeItem("vuex");
        return response;
      } catch (e) {
        return { error: true, message: e.title || e.message };
      }
    },
    async forgotPassword({}, payload) {
      try {
        let response = await post({
          url: "/auth/forgot-password",
          params: payload,
        });
        return response;
      } catch (e) {
        return { error: true, message: e.title || e.message };
      }
    },
    async me() {
      try {
        let response = await get({
          url: "/auth/me",
        });
        return response;
      } catch (e) {
        return { error: true, message: e.title || e.message };
      }
    },
  },
};

export default auth;
