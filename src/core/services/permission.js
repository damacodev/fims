/* eslint-disable */

import router from "@/router";
import store from "@/core/services/store";
import getPageTitle from "@/core/utils/page-title";
import { RESET_LAYOUT_CONFIG } from "@/core/services/store/config.module";

const Permission = {
  init() {
    const whiteList = ["/auth", "/setup-password"];

    router.beforeEach((to, from, next) => {
      document.title = getPageTitle(to.meta.title);
      store.dispatch(RESET_LAYOUT_CONFIG);

      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 100);

      if (store.getters["auth/isLoggedIn"]) {
        if (to.path == "/auth") {
          next({ path: "/dashboard" });
        } else {
          next();
        }
      } else {
        if (whiteList.indexOf(to.path) != -1) {
          next();
        } else {
          next(`/auth`);
        }
      }
    });
  },
};

export default Permission;