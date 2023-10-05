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
        <b-col lg="6">
          <TaskProgress :data="statistic.taskProgress" />
        </b-col>
        <b-col lg="6">
          <ManPower :data="statistic.manPower" />
        </b-col>
      </b-row>
      <b-row>
        <b-col lg="6">
          <WorkItem :data="statistic.workItem" />
        </b-col>
        <b-col lg="6">
          <EquipmentAvailability :data="statistic.equipmentAvailability" />
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
import Pusher from "pusher-js";

import { mapGetters } from "vuex";
import AutoComplete from "@trevoreyre/autocomplete-vue";
import "@trevoreyre/autocomplete-vue/dist/style.css";

import { apiUrl } from "@/core/services/api.url";
import { camelizeKeys } from "@/core/utils";

import TaskProgress from "./TaskProgress.vue";
import ManPower from "./ManPower.vue";
import WorkItem from "./WorkItem.vue";
import EquipmentAvailability from "./EquipmentAvailability.vue";

export default {
  name: "dashboard",
  components: {
    AutoComplete,
    TaskProgress,
    ManPower,
    WorkItem,
    EquipmentAvailability
  },
  data: () => ({
    baseUrl: process.env.NODE_ENV === "production" ? apiUrl.prod : apiUrl.dev,
    statistic: {
      loadData: false,
      workItem: [],
      taskProgress: {
        preventiveMaintenance: 0,
        breakdownMaintenance: 0,
        pendingTask: 0
      },
      manPower: {
        available: 0,
        unavailable: 0
      },
      equipmentAvailability: {
        pump: {
          available: 0,
          inService: 0
        },
        refuelerOrHydrantDispenser: {
          available: 0,
          inService: 0
        },
        storageTank: {
          available: 0,
          inService: 0
        }
      }
    }
  }),
  computed: {
    ...mapGetters("personalize", ["dppu", "multipleDppu"])
  },
  created() {
    const self = this;
    self.subscribe();
    if (self.dppu) {
      self.statistic.loadData = true;
      self.getStatistic();
      self.getWorkItem();
    }
  },
  methods: {
    subscribe() {
      const self = this;
      const pusher = new Pusher("7fcfe6712eb3ef996108", {
        cluster: "ap1",
        authEndpoint: `${self.baseUrl}/auth/pusher`
      });
      pusher.subscribe("private-mtc-notification");

      // pusher.bind("dashboard", (data) => {
      //   // self.$message.info({
      //   //   zIndex: 10000,
      //   //   message: JSON.stringify(data),
      //   //   position: "top-right",
      //   // });
      //   data = camelizeKeys(data);
      //   if (self.dppu.id == data.dppuId) {
      //     self.statistic.taskProgress = data.taskProgress;
      //     self.statistic.manPower = data.manPower;
      //     self.statistic.equipmentAvailability = data.equipmentAvailability;
      //   }
      // });

      pusher.bind("dppu-changes", data => {
        data = camelizeKeys(data);
        if (self.dppu.id == data) {
          self.getStatistic();
          self.getWorkItem();
        }
      });
    },
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
      self.getStatistic();
      self.getWorkItem();
      return result.name;
    },
    getStatistic() {
      const self = this;

      self.$store
        .dispatch("apis/get", {
          url: `/common/statistic/${self.dppu.id}`
        })
        .then(response => {
          if (response.error) {
            self.$message.error({
              zIndex: 10000,
              message: response.message
            });
          } else {
            self.statistic.taskProgress = response.data.taskProgress;
            self.statistic.manPower = response.data.manPower;
            self.statistic.equipmentAvailability =
              response.data.equipmentAvailability;
          }
        });
    },
    getWorkItem() {
      const self = this;

      self.$store
        .dispatch("apis/get", {
          url: "/board/workitem",
          params: {
            pageNumber: 1,
            pageSize: 5,
            assignedTo: "me"
          }
        })
        .then(response => {
          if (response.error) {
            self.$message.error({
              zIndex: 10000,
              message: response.message
            });
          } else {
            self.statistic.workItem = response.data.data.map(x => ({
              id: x.id,
              taskId: x.taskId,
              dppu: x.dppu,
              type: x.type,
              title: x.title,
              description: x.description,
              status: x.statuses.find(x => x.actived),
              createdBy: x.createdBy,
              createdAt: x.createdAt
            }));
          }
        });
    }
  }
};
</script>
