import Vue from "vue";
import axios from "axios";
import router from "@/router";
import store from "@/core/services/store";
import { apiUrl } from "@/core/services/api.url";

const ApiService = {
  init() {
    Vue.http = axios.create({
      baseURL: process.env.NODE_ENV === "production" ? apiUrl.prod : apiUrl.dev,
      withCredentials: false,
      headers: {
        Accept: "application/vnd.hal+json",
        "Content-Type": "application/json"
      }
    });

    Vue.http.interceptors.request.use(
      config => {
        if (store.getters["auth/isLoggedIn"]) {
          config.headers.Authorization =
            "Bearer " + store.state.auth.token.accessToken;
        }

        return config;
      },
      error => {
        Promise.reject(error.response.data);
      }
    );

    Vue.http.interceptors.response.use(
      response => {
        return response.data;
      },
      async error => {
        const originalRequest = error.config;

        if (!error.response) {
          return Promise.reject({
            isError: true,
            title:
              "Sorry, couldn't connect to the server. Please contact your administrator"
          });
        } else if (
          error.response.status != 401 &&
          originalRequest.url.includes("auth/refresh-token")
        ) {
          await store.dispatch("auth/logout");
          router.push({ name: "login" });

          return Promise.reject(error);
        } else if (error.response.status == 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          await store.dispatch("auth/refreshToken", {
            refreshToken: store.state.auth.token.refreshToken
          });

          return Vue.http(originalRequest);
        }

        return Promise.reject(error.response.data);
      }
    );
  }
};

export default ApiService;
