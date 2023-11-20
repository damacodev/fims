import Vue from "vue";
import { Money } from "v-money";
import { component as VueNumber } from "@coders-tm/vue-number-format";

Vue.component("money", Money);
Vue.component("VueNumber", VueNumber);
