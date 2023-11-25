<template>
  <div
    id="kt_header"
    ref="kt_header"
    class="header header-fixed"
    v-bind:class="headerClasses"
  >
    <div
      class="d-flex align-items-stretch justify-content-between"
      v-bind:class="{ 'container-fluid': widthFluid, container: !widthFluid }"
    >
      <div class="d-none d-lg-flex align-items-center mr-3">
        <button
          class="btn btn-icon aside-toggle ml-n3 mr-10"
          id="kt_aside_desktop_toggle"
          ref="kt_aside_desktop_toggle"
        >
          <span class="svg-icon svg-icon-xxl svg-icon-dark-75">
            <inline-svg
              :src="require('@/assets/media/svg/icons/Text/Align-left.svg')"
            />
          </span>
        </button>
        <div class="header-logo">
          <router-link to="/">
            <img
              alt="Logo"
              :src="require('@/assets/media/logos/logo-large-color.png')"
              class="logo-sticky max-h-35px"
            />
          </router-link>
        </div>

        <div
          class="quick-search quick-search-inline ml-20 w-400px"
          id="kt_quick_search_inline"
        >
          <AutoComplete
            placeholder="Goto standard form page..."
            base-class="autocomplete-dashboard"
            :search="search"
            :get-result-value="getResultValue"
            @submit="handleSubmit"
          >
            <template #result="{ result, props }">
              <li v-bind="props" class="autocomplete-result wiki-result">
                <div class="wiki-snippet" v-html="result.subTitle" />
                <div class="wiki-title">
                  {{ result.title }}
                </div>
              </li>
            </template>
          </AutoComplete>
          <div
            id="kt_quick_search_toggle"
            data-toggle="dropdown"
            data-offset="0px,1px"
          ></div>
          <div
            class="dropdown-menu dropdown-menu-left dropdown-menu-lg dropdown-menu-anim-up"
          >
            <div
              class="quick-search-wrapper scroll"
              data-scroll="true"
              data-height="350"
              data-mobile-height="200"
            ></div>
          </div>
        </div>
      </div>

      <KTTopbar></KTTopbar>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import KTTopbar from "@/view/layout/header/Topbar.vue";
import KTLayoutHeader from "@/assets/js/layout/base/header.js";

import AutoComplete from "@trevoreyre/autocomplete-vue";
import "@/assets/css/autocomplete.css";

export default {
  name: "KTHeader",
  components: {
    KTTopbar,
    AutoComplete
  },
  mounted() {
    // Init Desktop & Mobile Headers
    KTLayoutHeader.init("kt_header", "kt_header_mobile");
  },
  computed: {
    ...mapGetters(["layoutConfig", "getClasses"]),

    /**
     * Check if the header menu is enabled
     * @returns {boolean}
     */
    headerMenuEnabled() {
      return !!this.layoutConfig("header.menu.self.display");
    },

    /**
     * Get extra classes for header based on the options
     * @returns {null|*}
     */
    headerClasses() {
      const classes = this.getClasses("header");
      if (typeof classes !== "undefined") {
        return classes.join(" ");
      }
      return null;
    },

    /**
     * Get extra classes for header menu based on the options
     * @returns {null|*}
     */
    headerMenuClasses() {
      const classes = this.getClasses("header_menu");
      if (typeof classes !== "undefined") {
        return classes.join(" ");
      }
      return null;
    },

    /**
     * Check if header container is fluid
     */
    widthFluid() {
      return this.layoutConfig("header.self.width") === "fluid";
    }
  },
  methods: {
    search(input) {
      const self = this;

      return new Promise(resolve => {
        /* if (input.length < 2) {
          return resolve([]);
        } */

        self.$store
          .dispatch("apis/get", {
            url: `/common/standard-form`,
            params: {
              grid: true,
              keyword: input
            }
          })
          .then(response => {
            if (response.error) {
              return resolve([]);
            }

            resolve(response.data.data);
          });
      });
    },
    getResultValue(result) {
      return result.title;
    },
    handleSubmit(result) {
      const self = this;

      self.$router.replace({
        name: result.routeName
      });
      return result.title;
    }
  }
};
</script>
