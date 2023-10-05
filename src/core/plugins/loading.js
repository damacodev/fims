import Vue from "vue";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

Vue.use(Loading, {
  loader: "dots",
  container: null,
  color: "#036ab7",
  zIndex: 10001
});
