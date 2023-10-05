import Vue from "vue";
import * as VueGoogleMaps from "vue2-google-maps";
Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyAI8Pq6aSIV9D3BZmxdSFIPp4Qe-wErRqc",
    libraries: "places,drawing"
  }
});
