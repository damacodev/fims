<template>
  <div>
    <!-- <pre>
      {{ multipleDppu }}
    </pre> -->
    <div
      v-if="multipleDppu"
      class="card position-relative"
      style="margin-bottom: 150px"
    >
      <div
        class="
          position-absolute
          bottom-0
          left-0
          right-0
          d-none d-lg-flex
          flex-row-fluid
        "
      >
        <span
          class="svg-icon svg-icon-full flex-row-fluid svg-icon-dark opacity-3"
        >
          <inline-svg :src="require('@/assets/media/bg/home-2-bg.svg')" />
        </span>
      </div>
      <div
        class="
          position-absolute
          d-flex
          top-0
          right-0
          offset-lg-6
          col-lg-6
          opacity-30 opacity-lg-100
        "
      >
        <span class="svg-icon svg-icon-full flex-row-fluid p-10">
          <inline-svg
            :src="require('@/assets/media/svg/illustrations/working.svg')"
          />
        </span>
      </div>
      <div class="card-body">
        <div class="col-lg-6">
          <div class="align-items-center flex-wrap py-25 px-5">
            <AutoComplete
              placeholder="Select DPPU (Depot Pengisian Pesawat Udara)"
              :search="search"
              :get-result-value="getResultValue"
              :defaultValue="dppu ? dppu.label : ''"
              @submit="handleSubmit"
            >
              <template #result="{ result, props }">
                <li v-bind="props" class="autocomplete-result wiki-result">
                  <div class="wiki-title">
                    {{ `${result.plant} - ${result.name}` }}
                  </div>
                  <div class="wiki-snippet" v-html="result.address" />
                </li>
              </template>
            </AutoComplete>
          </div>
        </div>
      </div>
    </div>

    <div v-if="statistic.loadData">
      <b-row>
        <b-col lg="12">
          <PreventiveMaintenance />
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<style>
.autocomplete-input {
  background-color: #ffffff !important;
  padding-top: 1.75rem !important;
  padding-bottom: 1.75rem !important;
}
.autocomplete-input:focus {
  box-shadow: unset !important;
}
[data-position="above"] .autocomplete-result-list {
  border-bottom: none;
  border-radius: 8px 8px 0 0;
}
</style>

<script>
import { mapGetters } from "vuex";
import AutoComplete from "@trevoreyre/autocomplete-vue";
import "@trevoreyre/autocomplete-vue/dist/style.css";

import PreventiveMaintenance from "./PreventiveMaintenance.vue";

export default {
  name: "dashboard",
  components: {
    AutoComplete,
    PreventiveMaintenance
  },
  data: () => ({
    statistic: {
      loadData: false,
      technician: null
    }
  }),
  computed: {
    ...mapGetters("personalize", ["dppu", "multipleDppu"])
  },
  created() {
    const self = this;
    if (self.dppu) {
      self.statistic.loadData = true;
      self.getTechnician();
    }
  },
  methods: {
    search(input) {
      const self = this;
      self.statistic.loadData = false;

      return new Promise(resolve => {
        if (input.length < 3) {
          return resolve([]);
        }

        self.$store
          .dispatch("apis/get", {
            url: "/dppu",
            params: {
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
      return result.name;
    },
    handleSubmit(result) {
      const self = this;

      self.$store.dispatch("personalize/updateDppu", {
        id: result.id,
        label: result.name
      });

      self.statistic.loadData = true;
      self.getTechnician();
      return result.name;
    },
    getTechnician() {
      const self = this;

      self.$store
        .dispatch("apis/get", {
          url: "/account/technician",
          params: {
            dppu: self.dppu.id
          }
        })
        .then(response => {
          if (response.error) {
            self.$message.error({
              zIndex: 10000,
              message: response.message
            });
          } else {
            self.statistic.technician = response.data.data;
          }
        });
    }
  }
};
</script>
