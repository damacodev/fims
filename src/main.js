import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "@/core/services/store";
import ApiService from "@/core/services/api.service";
import Permission from "@/core/services/permission";

Vue.config.productionTip = false;

// Global 3rd party plugins
import "popper.js";
import "tooltip.js";
import PerfectScrollbar from "perfect-scrollbar";
window.PerfectScrollbar = PerfectScrollbar;
import ClipboardJS from "clipboard";
window.ClipboardJS = ClipboardJS;

// Vue 3rd party plugins
import i18n from "@/core/plugins/vue-i18n";
import "@/core/plugins/apexcharts";
import "@/core/plugins/bootstrap-vue";
import "@/core/plugins/common";
import "@/core/plugins/highlight-js";
import "@/core/plugins/inline-svg";
import "@/core/plugins/loading";
import "@/core/plugins/message";
import "@/core/plugins/metronic";
import "@/core/plugins/onesignal-vue";
import "@/core/plugins/perfect-scrollbar";
import "@/core/plugins/portal-vue";
import "@/core/plugins/vuedraggable";
import "@/core/plugins/vuejs-dialog";
import "@/core/plugins/vuelidate";
import "@/core/plugins/vue-cal";
import "@/core/plugins/vue-html-to-paper";
import "@/core/plugins/vue-phone-number-input";
import "@/core/plugins/vue-password-strength-meter";
import "@/core/plugins/vue2-google-maps";
import "@/core/plugins/v-viewer";
import "@/core/plugins/treeselect";
import "@mdi/font/css/materialdesignicons.css";

ApiService.init();
Permission.init();

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
  beforeMount() {
    this.$OneSignal.init({
      appId: "a9844465-954e-4e9c-8450-cae8d5496998",
      allowLocalhostAsSecureOrigin: true
    });
  }
}).$mount("#app");
