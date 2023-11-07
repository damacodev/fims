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
            <ItemAfterTopingUp
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
import ItemAfterTopingUp from "./ItemAfterTopingUp.vue";
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
    ItemAfterHeavyRain,
    ItemAfterTopingUp
  },
  data: () => ({
    title: "118 SF - Refuellers Quality Control Record",
    subTitle: "You can manage an records here",
    route: {
      form: "sf118CreateItem"
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
        productTankDrain: {
          id: null,
          colourIds: [],
          cleanlinesIds: [],
          freeWaterIds: [],
          waterDetectorIds: [],
          colour: [],
          cleanlines: [],
          freeWater: [],
          waterDetector: []
        },
        beforeFilter: {
          id: null,
          colourIds: [],
          cleanlinesIds: [],
          freeWaterIds: [],
          waterDetectorIds: [],
          colour: [],
          cleanlines: [],
          freeWater: [],
          waterDetector: []
        },
        afterFilter: {
          id: null,
          colourIds: [],
          cleanlinesIds: [],
          freeWaterIds: [],
          waterDetectorIds: [],
          colour: [],
          cleanlines: [],
          freeWater: [],
          waterDetector: []
        },
        recoveryTankDrain: {
          id: null,
          colourIds: [],
          cleanlinesIds: [],
          freeWaterIds: [],
          waterDetectorIds: [],
          colour: [],
          cleanlines: [],
          freeWater: [],
          waterDetector: []
        }
      },
      afterWash: {
        productTankDrain: {
          id: null,
          colourIds: [],
          cleanlinesIds: [],
          freeWaterIds: [],
          waterDetectorIds: [],
          colour: [],
          cleanlines: [],
          freeWater: [],
          waterDetector: []
        },
        recoveryTankDrain: {
          id: null,
          colourIds: [],
          cleanlinesIds: [],
          freeWaterIds: [],
          waterDetectorIds: [],
          colour: [],
          cleanlines: [],
          freeWater: [],
          waterDetector: []
        }
      },
      afterHeavyRain: {
        productTankDrain: {
          id: null,
          colourIds: [],
          cleanlinesIds: [],
          freeWaterIds: [],
          waterDetectorIds: [],
          colour: [],
          cleanlines: [],
          freeWater: [],
          waterDetector: []
        },
        recoveryTankDrain: {
          id: null,
          colourIds: [],
          cleanlinesIds: [],
          freeWaterIds: [],
          waterDetectorIds: [],
          colour: [],
          cleanlines: [],
          freeWater: [],
          waterDetector: []
        }
      },
      afterTopingUp: []
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
          url: `/board/standard-form/118/${self.$route.params.id}`
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
          url: `/board/standard-form/118/record/${self.$route.params.iditem}`
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
              productTankDrain: {
                id: response.data.everyDay.productTankDrain?.id,
                colourIds: response.data.everyDay.productTankDrain?.colourIds.map(
                  x => x.id
                ),
                colour: response.data.everyDay.productTankDrain?.colourIds,
                cleanlinesIds: response.data.everyDay.productTankDrain?.cleanlinesIds.map(
                  x => x.id
                ),
                cleanlines:
                  response.data.everyDay.productTankDrain?.cleanlinesIds,
                freeWaterIds: response.data.everyDay.productTankDrain?.freeWaterIds.map(
                  x => x.id
                ),
                freeWater:
                  response.data.everyDay.productTankDrain?.freeWaterIds,
                waterDetectorIds: response.data.everyDay.productTankDrain?.waterDetectorIds.map(
                  x => x.id
                ),
                waterDetector:
                  response.data.everyDay.productTankDrain?.waterDetectorIds
              },
              beforeFilter: {
                id: response.data.everyDay.beforeFilter?.id,
                colourIds: response.data.everyDay.beforeFilter?.colourIds.map(
                  x => x.id
                ),
                colour: response.data.everyDay.beforeFilter?.colourIds,
                cleanlinesIds: response.data.everyDay.beforeFilter?.cleanlinesIds.map(
                  x => x.id
                ),
                cleanlines: response.data.everyDay.beforeFilter?.cleanlinesIds,
                freeWaterIds: response.data.everyDay.beforeFilter?.freeWaterIds.map(
                  x => x.id
                ),
                freeWater: response.data.everyDay.beforeFilter?.freeWaterIds,
                waterDetectorIds: response.data.everyDay.beforeFilter?.waterDetectorIds.map(
                  x => x.id
                ),
                waterDetector:
                  response.data.everyDay.beforeFilter?.waterDetectorIds
              },
              afterFilter: {
                id: response.data.everyDay.afterFilter?.id,
                colourIds: response.data.everyDay.afterFilter?.colourIds.map(
                  x => x.id
                ),
                colour: response.data.everyDay.afterFilter?.colourIds,
                cleanlinesIds: response.data.everyDay.afterFilter?.cleanlinesIds.map(
                  x => x.id
                ),
                cleanlines: response.data.everyDay.afterFilter?.cleanlinesIds,
                freeWaterIds: response.data.everyDay.afterFilter?.freeWaterIds.map(
                  x => x.id
                ),
                freeWater: response.data.everyDay.afterFilter?.freeWaterIds,
                waterDetectorIds: response.data.everyDay.afterFilter?.waterDetectorIds.map(
                  x => x.id
                ),
                waterDetector:
                  response.data.everyDay.afterFilter?.waterDetectorIds
              },
              recoveryTankDrain: {
                id: response.data.everyDay.recoveryTankDrain?.id,
                colourIds: response.data.everyDay.recoveryTankDrain?.colourIds.map(
                  x => x.id
                ),
                colour: response.data.everyDay.recoveryTankDrain?.colourIds,
                cleanlinesIds: response.data.everyDay.recoveryTankDrain?.cleanlinesIds.map(
                  x => x.id
                ),
                cleanlines:
                  response.data.everyDay.recoveryTankDrain?.cleanlinesIds,
                freeWaterIds: response.data.everyDay.recoveryTankDrain?.freeWaterIds.map(
                  x => x.id
                ),
                freeWater:
                  response.data.everyDay.recoveryTankDrain?.freeWaterIds,
                waterDetectorIds: response.data.everyDay.recoveryTankDrain?.waterDetectorIds.map(
                  x => x.id
                ),
                waterDetector:
                  response.data.everyDay.recoveryTankDrain?.waterDetectorIds
              }
            };
            self.form.afterWash = {
              productTankDrain: {
                id: response.data.afterWash.productTankDrain?.id,
                colourIds: response.data.afterWash.productTankDrain?.colourIds.map(
                  x => x.id
                ),
                colour: response.data.afterWash.productTankDrain?.colourIds,
                cleanlinesIds: response.data.afterWash.productTankDrain?.cleanlinesIds.map(
                  x => x.id
                ),
                cleanlines:
                  response.data.afterWash.productTankDrain?.cleanlinesIds,
                freeWaterIds: response.data.afterWash.productTankDrain?.freeWaterIds.map(
                  x => x.id
                ),
                freeWater:
                  response.data.afterWash.productTankDrain?.freeWaterIds,
                waterDetectorIds: response.data.afterWash.productTankDrain?.waterDetectorIds.map(
                  x => x.id
                ),
                waterDetector:
                  response.data.afterWash.productTankDrain?.waterDetectorIds
              },
              recoveryTankDrain: {
                id: response.data.afterWash.recoveryTankDrain?.id,
                colourIds: response.data.afterWash.recoveryTankDrain?.colourIds.map(
                  x => x.id
                ),
                colour: response.data.afterWash.recoveryTankDrain?.colourIds,
                cleanlinesIds: response.data.afterWash.recoveryTankDrain?.cleanlinesIds.map(
                  x => x.id
                ),
                cleanlines:
                  response.data.afterWash.recoveryTankDrain?.cleanlinesIds,
                freeWaterIds: response.data.afterWash.recoveryTankDrain?.freeWaterIds.map(
                  x => x.id
                ),
                freeWater:
                  response.data.afterWash.recoveryTankDrain?.freeWaterIds,
                waterDetectorIds: response.data.afterWash.recoveryTankDrain?.waterDetectorIds.map(
                  x => x.id
                ),
                waterDetector:
                  response.data.afterWash.recoveryTankDrain?.waterDetectorIds
              }
            };
            self.form.afterHeavyRain = {
              productTankDrain: {
                id: response.data.afterHeavyRain.productTankDrain?.id,
                colourIds: response.data.afterHeavyRain.productTankDrain?.colourIds.map(
                  x => x.id
                ),
                colour:
                  response.data.afterHeavyRain.productTankDrain?.colourIds,
                cleanlinesIds: response.data.afterHeavyRain.productTankDrain?.cleanlinesIds.map(
                  x => x.id
                ),
                cleanlines:
                  response.data.afterHeavyRain.productTankDrain?.cleanlinesIds,
                freeWaterIds: response.data.afterHeavyRain.productTankDrain?.freeWaterIds.map(
                  x => x.id
                ),
                freeWater:
                  response.data.afterHeavyRain.productTankDrain?.freeWaterIds,
                waterDetectorIds: response.data.afterHeavyRain.productTankDrain?.waterDetectorIds.map(
                  x => x.id
                ),
                waterDetector:
                  response.data.afterHeavyRain.productTankDrain
                    ?.waterDetectorIds
              },
              recoveryTankDrain: {
                id: response.data.afterHeavyRain.recoveryTankDrain?.id,
                colourIds: response.data.afterHeavyRain.recoveryTankDrain?.colourIds.map(
                  x => x.id
                ),
                colour:
                  response.data.afterHeavyRain.recoveryTankDrain?.colourIds,
                cleanlinesIds: response.data.afterHeavyRain.recoveryTankDrain?.cleanlinesIds.map(
                  x => x.id
                ),
                cleanlines:
                  response.data.afterHeavyRain.recoveryTankDrain?.cleanlinesIds,
                freeWaterIds: response.data.afterHeavyRain.recoveryTankDrain?.freeWaterIds.map(
                  x => x.id
                ),
                freeWater:
                  response.data.afterHeavyRain.recoveryTankDrain?.freeWaterIds,
                waterDetectorIds: response.data.afterHeavyRain.recoveryTankDrain?.waterDetectorIds.map(
                  x => x.id
                ),
                waterDetector:
                  response.data.afterHeavyRain.recoveryTankDrain
                    ?.waterDetectorIds
              }
            };
            self.form.afterTopingUp = response.data.afterTopingUp.map(x => ({
              id: x.id,
              colourIds: x.colourIds.map(x => x.id),
              cleanlinesIds: x.cleanlinesIds.map(x => x.id),
              freeWaterIds: x.freeWaterIds.map(x => x.id),
              waterDetectorIds: x.waterDetectorIds.map(x => x.id)
            }));
          }
        })
        .finally(() => loader.hide());
    }
  }
};
</script>
