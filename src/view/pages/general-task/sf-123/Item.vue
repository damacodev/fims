<template>
  <div>
    <b-row>
      <b-col lg="12">
        <CardForm :title="title" :subTitle="subTitle" :backButton="true">
          <template slot="form">
            <div class="card-body">
              <FormHeader
                :form="header"
                :currentProgress="currentProgress"
                :showRemarks="false"
              />
            </div>
          </template>
        </CardForm>
      </b-col>
    </b-row>
    <b-row class="mt-6">
      <b-col lg="12">
        <span class="font-weight-bolder text-dark font-size-h4">
          Equipment : {{ form.equipment.label }}
        </span>
      </b-col>
      <b-col lg="12" class="mt-6">
        <b-card no-body>
          <b-tabs pills card>
            <ItemEveryDay
              :form="form"
              :options="options"
              :currentProgress="currentProgress"
            />
            <ItemAfterWash
              :form="form"
              :options="options"
              :currentProgress="currentProgress"
            />
            <ItemAfterHeavyRain
              :form="form"
              :options="options"
              :currentProgress="currentProgress"
            />
          </b-tabs>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import FormHeader from "../common/FormHeader.vue";
import ItemEveryDay from "./ItemEveryDay.vue";
import ItemAfterWash from "./ItemAfterWash.vue";
import ItemAfterHeavyRain from "./ItemAfterHeavyRain.vue";
import {
  getColour,
  getCleanlines,
  getFreeWater,
  getWaterDetector
} from "@/core/utils";

export default {
  components: {
    FormHeader,
    ItemEveryDay,
    ItemAfterWash,
    ItemAfterHeavyRain
  },
  data: () => ({
    title: "123 SF - Hydrant Dispenser & Cart Quality Check",
    subTitle: "You can manage an records here",
    route: {
      form: "sf123CreateItem"
    },
    header: {
      dppu: {
        id: null,
        label: null
      },
      transactionId: null,
      transactionDate: null,
      shift: {
        id: null,
        label: null
      },
      updatedBy: null,
      updatedAt: null,
      remarks: null
    },
    form: {
      equipment: {
        id: null,
        label: null
      },
      everyDay: {
        recoveryTank: {
          id: null,
          colourIds: [],
          cleanlinesIds: [],
          freeWaterIds: [],
          waterDetectorIds: null
        },
        pipeSystem: {
          id: null,
          colourIds: [],
          cleanlinesIds: [],
          freeWaterIds: [],
          waterDetectorIds: null
        },
        beforeFilter: {
          id: null,
          colourIds: [],
          cleanlinesIds: [],
          freeWaterIds: [],
          waterDetectorIds: null
        },
        afterFilter: {
          id: null,
          colourIds: [],
          cleanlinesIds: [],
          freeWaterIds: [],
          waterDetectorIds: null
        }
      },
      afterWash: {
        recoveryTank: {
          id: null,
          colourIds: [],
          cleanlinesIds: [],
          freeWaterIds: [],
          waterDetectorIds: null
        }
      },
      afterHeavyRain: {
        recoveryTank: {
          id: null,
          colourIds: [],
          cleanlinesIds: [],
          freeWaterIds: [],
          waterDetectorIds: null
        }
      }
    },
    currentProgress: {
      locked: null,
      status: null,
      remarks: null,
      nextAction: {
        id: null,
        label: null
      }
    },
    options: {
      colour: [],
      cleanlines: [],
      freeWater: [],
      waterDetector: []
    }
  }),
  computed: {
    ...mapGetters("auth", ["user"])
  },
  created() {
    const self = this;

    getColour().then(response => {
      self.options.colour = response;
    });

    getCleanlines().then(response => {
      self.options.cleanlines = response;
    });

    getFreeWater().then(response => {
      self.options.freeWater = response;
    });

    getWaterDetector().then(response => {
      self.options.waterDetector = response;
    });

    self.get();
  },
  methods: {
    get() {
      const self = this;

      let loader = self.$loading.show();
      self.$store
        .dispatch("apis/get", {
          url: `/board/standard-form/123/${self.$route.params.id}`
        })
        .then(response => {
          if (response.error) {
            self.$message.error({
              zIndex: 10000,
              message: response.message
            });

            self.$router.push({ name: self.route.table });
          } else {
            self.header = {
              dppu: response.data.dppu,
              transactionId: response.data.transactionId,
              transactionDate: response.data.transactionDate,
              shift: {
                id: response.data.shift?.id,
                label: response.data.shift?.label
              },
              updatedBy: response.data.updatedBy,
              updatedAt: response.data.updatedAt,
              remarks: response.data.remarks
            };

            self.currentProgress = {
              locked: response.data.currentProgress.locked,
              status: response.data.currentProgress.status,
              remarks: response.data.currentProgress.remarks,
              nextAction: {
                id: response.data.currentProgress.nextAction?.id,
                label: response.data.currentProgress.nextAction?.label
              }
            };

            self.getById();
          }
        })
        .finally(() => loader.hide());
    },
    getById() {
      const self = this;

      let loader = self.$loading.show();
      self.$store
        .dispatch("apis/get", {
          url: `/board/standard-form/123/record/${self.$route.params.iditem}`
        })
        .then(response => {
          if (response.error) {
            self.$message.error({
              zIndex: 10000,
              message: response.message
            });

            self.$router.push({ name: self.route.table });
          } else {
            self.form.equipment = response.data.equipment;
            self.form.everyDay = {
              recoveryTank: {
                id: response.data.everyDay.recoveryTank?.id,
                colourIds: response.data.everyDay.recoveryTank?.colourIds.map(
                  x => x.id
                ),
                cleanlinesIds: response.data.everyDay.recoveryTank?.cleanlinesIds.map(
                  x => x.id
                ),
                freeWaterIds: response.data.everyDay.recoveryTank?.freeWaterIds.map(
                  x => x.id
                ),
                waterDetectorIds: response.data.everyDay.recoveryTank?.waterDetectorIds.map(
                  x => x.id
                )
              },
              pipeSystem: {
                id: response.data.everyDay.pipeSystem?.id,
                colourIds: response.data.everyDay.pipeSystem?.colourIds.map(
                  x => x.id
                ),
                cleanlinesIds: response.data.everyDay.pipeSystem?.cleanlinesIds.map(
                  x => x.id
                ),
                freeWaterIds: response.data.everyDay.pipeSystem?.freeWaterIds.map(
                  x => x.id
                ),
                waterDetectorIds: response.data.everyDay.pipeSystem?.waterDetectorIds.map(
                  x => x.id
                )
              },
              beforeFilter: {
                id: response.data.everyDay.beforeFilter?.id,
                colourIds: response.data.everyDay.beforeFilter?.colourIds.map(
                  x => x.id
                ),
                cleanlinesIds: response.data.everyDay.beforeFilter?.cleanlinesIds.map(
                  x => x.id
                ),
                freeWaterIds: response.data.everyDay.beforeFilter?.freeWaterIds.map(
                  x => x.id
                ),
                waterDetectorIds: response.data.everyDay.beforeFilter?.waterDetectorIds.map(
                  x => x.id
                )
              },
              afterFilter: {
                id: response.data.everyDay.afterFilter?.id,
                colourIds: response.data.everyDay.afterFilter?.colourIds.map(
                  x => x.id
                ),
                cleanlinesIds: response.data.everyDay.afterFilter?.cleanlinesIds.map(
                  x => x.id
                ),
                freeWaterIds: response.data.everyDay.afterFilter?.freeWaterIds.map(
                  x => x.id
                ),
                waterDetectorIds: response.data.everyDay.afterFilter?.waterDetectorIds.map(
                  x => x.id
                )
              }
            };
            self.form.afterWash = {
              recoveryTank: {
                id: response.data.afterWash.recoveryTank?.id,
                colourIds: response.data.afterWash.recoveryTank?.colourIds.map(
                  x => x.id
                ),
                cleanlinesIds: response.data.afterWash.recoveryTank?.cleanlinesIds.map(
                  x => x.id
                ),
                freeWaterIds: response.data.afterWash.recoveryTank?.freeWaterIds.map(
                  x => x.id
                ),
                waterDetectorIds: response.data.afterWash.recoveryTank?.waterDetectorIds.map(
                  x => x.id
                )
              }
            };
            self.form.afterHeavyRain = {
              recoveryTank: {
                id: response.data.afterHeavyRain.recoveryTank?.id,
                colourIds: response.data.afterHeavyRain.recoveryTank?.colourIds.map(
                  x => x.id
                ),
                cleanlinesIds: response.data.afterHeavyRain.recoveryTank?.cleanlinesIds.map(
                  x => x.id
                ),
                freeWaterIds: response.data.afterHeavyRain.recoveryTank?.freeWaterIds.map(
                  x => x.id
                ),
                waterDetectorIds: response.data.afterHeavyRain.recoveryTank?.waterDetectorIds.map(
                  x => x.id
                )
              }
            };
          }
        })
        .finally(() => loader.hide());
    }
  }
};
</script>
