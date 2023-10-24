<template>
  <div>
    <b-row>
      <b-col lg="12">
        <CardForm :title="title" :subTitle="subTitle">
          <template slot="toolbar">
            <b-button variant="secondary" size="lg" @click="$router.go(-1)">
              Back
            </b-button>
          </template>
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
            <b-tab title="Every Day" active>
              <b-row>
                <b-col lg="6">
                  <FormCheck
                    title="Product Tank Drain"
                    subTitle="Every Day"
                    :form="form.everyDay.productTankDrain"
                    :options="options"
                    :buttonVisibility="buttonVisibility"
                    group="EVERY_DAY"
                    check="PRODUCT_TANK_DRAIN"
                    class="mb-7"
                  />
                </b-col>
                <b-col lg="6">
                  <FormCheck
                    title="Before Filter"
                    subTitle="Every Day"
                    :form="form.everyDay.beforeFilter"
                    :options="options"
                    :buttonVisibility="buttonVisibility"
                    group="EVERY_DAY"
                    check="BEFORE_FILTER"
                    class="mb-7"
                  />
                </b-col>
                <b-col lg="6">
                  <FormCheck
                    title="After Filter"
                    subTitle="Every Day"
                    :form="form.everyDay.afterFilter"
                    :options="options"
                    :buttonVisibility="buttonVisibility"
                    group="EVERY_DAY"
                    check="AFTER_FILTER"
                  />
                </b-col>
                <b-col lg="6">
                  <FormCheck
                    title="Recovery Tank Drain"
                    subTitle="Every Day"
                    :form="form.everyDay.recoveryTankDrain"
                    :options="options"
                    :buttonVisibility="buttonVisibility"
                    group="EVERY_DAY"
                    check="RECOVERY_TANK_DRAIN"
                  />
                </b-col>
              </b-row>
            </b-tab>
            <b-tab title="After Wash">
              <b-row>
                <b-col lg="6">
                  <FormCheck
                    title="Product Tank Drain"
                    subTitle="After Wash"
                    :form="form.afterWash.productTankDrain"
                    :options="options"
                    :buttonVisibility="buttonVisibility"
                    group="AFTER_WASH"
                    check="PRODUCT_TANK_DRAIN"
                  />
                </b-col>
                <b-col lg="6">
                  <FormCheck
                    title="Recovery Tank Drain"
                    subTitle="After Wash"
                    :form="form.afterWash.recoveryTankDrain"
                    :options="options"
                    :buttonVisibility="buttonVisibility"
                    group="AFTER_WASH"
                    check="RECOVERY_TANK_DRAIN"
                  />
                </b-col>
              </b-row>
            </b-tab>
            <b-tab title="After Heavy Rain">
              <b-row>
                <b-col lg="6">
                  <FormCheck
                    title="Product Tank Drain"
                    subTitle="After Heavy Rain"
                    :form="form.afterHeavyRain.productTankDrain"
                    :options="options"
                    :buttonVisibility="buttonVisibility"
                    group="AFTER_HEAVY_RAIN"
                    check="PRODUCT_TANK_DRAIN"
                  />
                </b-col>
                <b-col lg="6">
                  <FormCheck
                    title="Recovery Tank Drain"
                    subTitle="After Heavy Rain"
                    :form="form.afterHeavyRain.recoveryTankDrain"
                    :options="options"
                    :buttonVisibility="buttonVisibility"
                    group="AFTER_HEAVY_RAIN"
                    check="RECOVERY_TANK_DRAIN"
                  />
                </b-col>
              </b-row>
            </b-tab>
            <b-tab title="After Toping Up @ Product Tank Drain">
              <b-row>
                <b-col lg="12">
                  <b-button
                    v-if="buttonVisibility"
                    variant="outline-primary"
                    @click="createNewRecord"
                  >
                    Create New Record
                  </b-button>

                  <EmptyTable
                    v-if="form.afterTopingUp.length == 0"
                    title="After toping up @ product tank drain are managed from here"
                    description="All After toping up @ product tank drain will be displayed on this page"
                  />
                </b-col>
                <b-col
                  lg="6"
                  v-for="(afterTopingUp, index) in form.afterTopingUp"
                  v-bind:key="index"
                >
                  <FormCheck
                    :title="`Toping Up #${index + 1}`"
                    subTitle="After Toping Up @ Product Tank Drain"
                    :textButton="afterTopingUp.id == null ? `Submit` : `Update`"
                    :buttonVariant="
                      afterTopingUp.id == null ? `primary` : `outline-primary`
                    "
                    :form="afterTopingUp"
                    :options="options"
                    :buttonVisibility="buttonVisibility"
                    group="AFTER_TOPING_UP"
                    check="PRODUCT_TANK_DRAIN"
                    :deletable="true"
                    :class="buttonVisibility ? `mt-7` : ``"
                    @onDelete="handleDelete(afterTopingUp.id, index)"
                  />
                </b-col>
              </b-row>
            </b-tab>
          </b-tabs>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import FormHeader from "../common/FormHeader.vue";
import FormCheck from "./FormCheck.vue";
import {
  getColour,
  getCleanlines,
  getFreeWater,
  getWaterDetector
} from "@/core/utils";

export default {
  components: {
    FormHeader,
    FormCheck
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
          colourId: null,
          cleanlinesId: null,
          freeWaterId: null,
          waterDetectorId: null
        },
        beforeFilter: {
          id: null,
          colourId: null,
          cleanlinesId: null,
          freeWaterId: null,
          waterDetectorId: null
        },
        afterFilter: {
          id: null,
          colourId: null,
          cleanlinesId: null,
          freeWaterId: null,
          waterDetectorId: null
        },
        recoveryTankDrain: {
          id: null,
          colourId: null,
          cleanlinesId: null,
          freeWaterId: null,
          waterDetectorId: null
        }
      },
      afterWash: {
        productTankDrain: {
          id: null,
          colourId: null,
          cleanlinesId: null,
          freeWaterId: null,
          waterDetectorId: null
        },
        recoveryTankDrain: {
          id: null,
          colourId: null,
          cleanlinesId: null,
          freeWaterId: null,
          waterDetectorId: null
        }
      },
      afterHeavyRain: {
        productTankDrain: {
          id: null,
          colourId: null,
          cleanlinesId: null,
          freeWaterId: null,
          waterDetectorId: null
        },
        recoveryTankDrain: {
          id: null,
          colourId: null,
          cleanlinesId: null,
          freeWaterId: null,
          waterDetectorId: null
        }
      },
      afterTopingUp: []
    },
    currentProgress: {
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
    ...mapGetters("auth", ["user"]),
    buttonVisibility() {
      const self = this;
      if (
        !["New", "Rejected"].includes(self.currentProgress.status) ||
        (self.currentProgress.status == "Rejected" &&
          self.user.id != self.currentProgress.nextAction.id)
      ) {
        return false;
      } else if (
        self.currentProgress.status == "Rejected" &&
        self.user.id == self.currentProgress.nextAction.id
      ) {
        return true;
      }
      return true;
    }
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

    self.getById();
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
            /* self.form.time = dateTimeFormat(response.data.recordTime, "HH:mm");
            self.form.bridgerNo = response.data.bridgerNo;
            self.form.bppNo = response.data.bppNo;
            self.form.volume = response.data.volume;
            self.form.seal = response.data.seal;
            self.form.receivingDocument = response.data.receivingDocument;
            self.form.visualCheck = response.data.visualCheck;
            self.form.appearance = response.data.appearance;
            self.form.appearanceId = response.data.appearance.id;
            self.form.conductivity = response.data.conductivity;
            self.form.remarks = response.data.remarks; */

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
              status: response.data.currentProgress.status,
              nextAction: {
                id: response.data.currentProgress.nextAction?.id,
                label: response.data.currentProgress.nextAction?.label
              }
            };
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
                colourId: response.data.everyDay.productTankDrain?.colour?.id,
                colour: response.data.everyDay.productTankDrain?.colour,
                cleanlinesId:
                  response.data.everyDay.productTankDrain?.cleanlines?.id,
                cleanlines: response.data.everyDay.productTankDrain?.cleanlines,
                freeWaterId:
                  response.data.everyDay.productTankDrain?.freeWater?.id,
                freeWater: response.data.everyDay.productTankDrain?.freeWater,
                waterDetectorId:
                  response.data.everyDay.productTankDrain?.waterDetector?.id,
                waterDetector:
                  response.data.everyDay.productTankDrain?.waterDetector
              },
              beforeFilter: {
                id: response.data.everyDay.beforeFilter?.id,
                colourId: response.data.everyDay.beforeFilter?.colour?.id,
                colour: response.data.everyDay.beforeFilter?.colour,
                cleanlinesId:
                  response.data.everyDay.beforeFilter?.cleanlines?.id,
                cleanlines: response.data.everyDay.beforeFilter?.cleanlines,
                freeWaterId: response.data.everyDay.beforeFilter?.freeWater?.id,
                freeWater: response.data.everyDay.beforeFilter?.freeWater,
                waterDetectorId:
                  response.data.everyDay.beforeFilter?.waterDetector?.id,
                waterDetector:
                  response.data.everyDay.beforeFilter?.waterDetector
              },
              afterFilter: {
                id: response.data.everyDay.afterFilter?.id,
                colourId: response.data.everyDay.afterFilter?.colour?.id,
                colour: response.data.everyDay.afterFilter?.colour,
                cleanlinesId:
                  response.data.everyDay.afterFilter?.cleanlines?.id,
                cleanlines: response.data.everyDay.afterFilter?.cleanlines,
                freeWaterId: response.data.everyDay.afterFilter?.freeWater?.id,
                freeWater: response.data.everyDay.afterFilter?.freeWater,
                waterDetectorId:
                  response.data.everyDay.afterFilter?.waterDetector?.id,
                waterDetector: response.data.everyDay.afterFilter?.waterDetector
              },
              recoveryTankDrain: {
                id: response.data.everyDay.recoveryTankDrain?.id,
                colourId: response.data.everyDay.recoveryTankDrain?.colour?.id,
                colour: response.data.everyDay.recoveryTankDrain?.colour,
                cleanlinesId:
                  response.data.everyDay.recoveryTankDrain?.cleanlines?.id,
                cleanlines:
                  response.data.everyDay.recoveryTankDrain?.cleanlines,
                freeWaterId:
                  response.data.everyDay.recoveryTankDrain?.freeWater?.id,
                freeWater: response.data.everyDay.recoveryTankDrain?.freeWater,
                waterDetectorId:
                  response.data.everyDay.recoveryTankDrain?.waterDetector?.id,
                waterDetector:
                  response.data.everyDay.recoveryTankDrain?.waterDetector
              }
            };
            self.form.afterWash = {
              productTankDrain: {
                id: response.data.afterWash.productTankDrain?.id,
                colourId: response.data.afterWash.productTankDrain?.colour?.id,
                colour: response.data.afterWash.productTankDrain?.colour,
                cleanlinesId:
                  response.data.afterWash.productTankDrain?.cleanlines?.id,
                cleanlines:
                  response.data.afterWash.productTankDrain?.cleanlines,
                freeWaterId:
                  response.data.afterWash.productTankDrain?.freeWater?.id,
                freeWater: response.data.afterWash.productTankDrain?.freeWater,
                waterDetectorId:
                  response.data.afterWash.productTankDrain?.waterDetector?.id,
                waterDetector:
                  response.data.afterWash.productTankDrain?.waterDetector
              },
              recoveryTankDrain: {
                id: response.data.afterWash.recoveryTankDrain?.id,
                colourId: response.data.afterWash.recoveryTankDrain?.colour?.id,
                colour: response.data.afterWash.recoveryTankDrain?.colour,
                cleanlinesId:
                  response.data.afterWash.recoveryTankDrain?.cleanlines?.id,
                cleanlines:
                  response.data.afterWash.recoveryTankDrain?.cleanlines,
                freeWaterId:
                  response.data.afterWash.recoveryTankDrain?.freeWater?.id,
                freeWater: response.data.afterWash.recoveryTankDrain?.freeWater,
                waterDetectorId:
                  response.data.afterWash.recoveryTankDrain?.waterDetector?.id,
                waterDetector:
                  response.data.afterWash.recoveryTankDrain?.waterDetector
              }
            };
            self.form.afterHeavyRain = {
              productTankDrain: {
                id: response.data.afterHeavyRain.productTankDrain?.id,
                colourId:
                  response.data.afterHeavyRain.productTankDrain?.colour?.id,
                colour: response.data.afterHeavyRain.productTankDrain?.colour,
                cleanlinesId:
                  response.data.afterHeavyRain.productTankDrain?.cleanlines?.id,
                cleanlines:
                  response.data.afterHeavyRain.productTankDrain?.cleanlines,
                freeWaterId:
                  response.data.afterHeavyRain.productTankDrain?.freeWater?.id,
                freeWater:
                  response.data.afterHeavyRain.productTankDrain?.freeWater,
                waterDetectorId:
                  response.data.afterHeavyRain.productTankDrain?.waterDetector
                    ?.id,
                waterDetector:
                  response.data.afterHeavyRain.productTankDrain?.waterDetector
              },
              recoveryTankDrain: {
                id: response.data.afterHeavyRain.recoveryTankDrain?.id,
                colourId:
                  response.data.afterHeavyRain.recoveryTankDrain?.colour?.id,
                colour: response.data.afterHeavyRain.recoveryTankDrain?.colour,
                cleanlinesId:
                  response.data.afterHeavyRain.recoveryTankDrain?.cleanlines
                    ?.id,
                cleanlines:
                  response.data.afterHeavyRain.recoveryTankDrain?.cleanlines,
                freeWaterId:
                  response.data.afterHeavyRain.recoveryTankDrain?.freeWater?.id,
                freeWater:
                  response.data.afterHeavyRain.recoveryTankDrain?.freeWater,
                waterDetectorId:
                  response.data.afterHeavyRain.recoveryTankDrain?.waterDetector
                    ?.id,
                waterDetector:
                  response.data.afterHeavyRain.recoveryTankDrain?.waterDetector
              }
            };
            self.form.afterTopingUp = response.data.afterTopingUp.map(x => ({
              id: x.id,
              colourId: x.colour?.id,
              colour: x.colour,
              cleanlinesId: x.cleanlines?.id,
              cleanlines: x.cleanlines,
              freeWaterId: x.freeWater?.id,
              freeWater: x.freeWater,
              waterDetectorId: x.waterDetector?.id,
              waterDetector: x.waterDetector
            }));
          }
        })
        .finally(() => loader.hide());
    },
    createNewRecord() {
      const self = this;

      self.form.afterTopingUp.push({
        id: null,
        colourId: null,
        cleanlinesId: null,
        freeWaterId: null,
        waterDetectorId: null
      });
    },
    handleDelete(id, index) {
      const self = this;

      if (id == null) {
        self.form.afterTopingUp.splice(index, 1);
      } else {
        self.$dialog
          .confirm("You are about to delete this record. Are you sure ?", {
            okText: "Yes, Delete",
            cancelText: "Cancel",
            loader: true
          })
          .then(dialog => {
            self.$store
              .dispatch("apis/remove", {
                url: `/board/standard-form/118/record/${id}`
              })
              .then(response => {
                if (response.error) {
                  self.$message.error({
                    zIndex: 10000,
                    message: response.message
                  });
                } else {
                  self.$message.success({
                    zIndex: 10000,
                    message: response.message
                  });
                  self.form.afterTopingUp.splice(index, 1);
                }
              })
              .finally(() => dialog.close());
          });
      }
    }
  }
};
</script>
