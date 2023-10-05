import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

import auth from "./auth.module";
import apis from "./apis.module";
import htmlClass from "./htmlclass.module";
import config from "./config.module";
import personalize from "./personalize.module";
// import breadcrumbs from "./breadcrumbs.module";
// import profile from "./profile.module";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      paths: [
        "auth.user",
        "auth.token",
        "auth.config",
        "personalize.dppu",
        "personalize.multipleDppu",
        "personalize.signature"
      ]
    })
  ],
  modules: {
    auth,
    apis,
    htmlClass,
    config,
    personalize
    // breadcrumbs,
    // profile
  }
});
