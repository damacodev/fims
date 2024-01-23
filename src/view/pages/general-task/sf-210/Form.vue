<template>
  <div class="card card-custom">
    <div class="card-header py-3">
      <div class="card-title align-items-start flex-column">
        <h3 class="card-label font-weight-bolder text-dark">
          <b-button class="btn-icon mr-2" size="xs" @click="$router.go(-1)">
            <i class="flaticon2-back" />
          </b-button>
          {{ title }}
        </h3>
        <span class="text-muted font-weight-bold font-size-sm mt-1 pl-10">
          {{ subTitle }}
        </span>
      </div>
      <div class="card-toolbar">
        <b-button
          v-show="
            $route.name != route.form &&
              !currentProgress.locked &&
              form.workItemId == null
          "
          variant="outline-danger"
          size="lg"
          class="mr-2"
          @click="handleDelete"
        >
          Delete
        </b-button>
        <b-button
          v-show="$route.name != route.form && !currentProgress.locked"
          variant="outline-primary"
          size="lg"
          class="mr-2"
          @click="handleSendApproval"
        >
          Save and Send Approval
        </b-button>
        <b-button
          v-show="!currentProgress.locked"
          variant="primary"
          size="lg"
          @click="handleSubmit"
        >
          {{ textButton }}
        </b-button>
      </div>
    </div>
    <b-row class="p-2">
      <div class="card-body">
        <template v-if="!currentProgress.locked">
          <Select
            v-if="multipleDppu"
            label="Depot Pengisian Pesawat Udara"
            v-model="form.dppuId"
            :v="$v.form.dppuId"
            :options="options.dppu"
            :multiple="false"
            :disabled="$route.name != route.form"
          />
          <InputText
            label="Transaction #"
            type="text"
            v-model="form.transactionId"
            disabled
          />
          <InputText
            label="Date"
            type="date"
            v-model="form.transactionDate"
            :v="$v.form.transactionDate"
          />
          <Select
            ref="Equipment"
            label="Equipment Identity"
            placeholder="Select Vehicle"
            v-model="form.equipmentId"
            :v="$v.form.equipmentId"
            :async="true"
            :multiple="false"
            :loadOptions="getEquipmentByCategory"
            :disabled="form.workItemId != null"
          />
          <b-row>
            <b-col lg="8" xl="5" offset-xl="4">
              <h5 class="font-weight-bold mb-6">Front Bonding Reel</h5>
            </b-col>
          </b-row>
          <Select
            label="Clip"
            placeholder="Select Condition"
            v-model="form.frontBondingReel.clipId"
            :options="options.bondingReelCondition"
            :multiple="false"
          />
          <Select
            label="Wire & Insulation"
            placeholder="Select Condition"
            v-model="form.frontBondingReel.wireAndInsulationId"
            :options="options.bondingReelCondition"
            :multiple="false"
          />
          <Select
            label="Connection & Reel"
            placeholder="Select Condition"
            v-model="form.frontBondingReel.connectionAndReelId"
            :options="options.bondingReelCondition"
            :multiple="false"
          />
          <InputMoney
            label="Resistance"
            type="number"
            v-model="form.frontBondingReel.resistance"
            :usePrefix="false"
            append="Ohm (Ω)"
          />

          <b-row>
            <b-col lg="8" xl="5" offset-xl="4">
              <h5 class="font-weight-bold mb-6">Rear Bonding Reel</h5>
            </b-col>
          </b-row>
          <Select
            label="Clip"
            placeholder="Select Condition"
            v-model="form.rearBondingReel.clipId"
            :options="options.bondingReelCondition"
            :multiple="false"
          />
          <Select
            label="Wire & Insulation"
            placeholder="Select Condition"
            v-model="form.rearBondingReel.wireAndInsulationId"
            :options="options.bondingReelCondition"
            :multiple="false"
          />
          <Select
            label="Connection & Reel"
            placeholder="Select Condition"
            v-model="form.rearBondingReel.connectionAndReelId"
            :options="options.bondingReelCondition"
            :multiple="false"
          />
          <InputMoney
            label="Resistance"
            type="number"
            v-model="form.rearBondingReel.resistance"
            :usePrefix="false"
            append="Ohm (Ω)"
          />

          <b-row>
            <b-col lg="8" xl="5" offset-xl="4">
              <h5 class="font-weight-bold mb-6">Lanyard</h5>
            </b-col>
          </b-row>
          <Select
            label="Carabiner Hook"
            placeholder="Select Condition"
            v-model="form.lanyard.carabinerHookId"
            :options="options.bondingReelCondition"
            :multiple="false"
          />
          <Select
            label="Wire & Insulation"
            placeholder="Select Condition"
            v-model="form.lanyard.wireAndInsulationId"
            :options="options.bondingReelCondition"
            :multiple="false"
          />
          <Select
            label="Reel"
            placeholder="Select Condition"
            v-model="form.lanyard.reelId"
            :options="options.bondingReelCondition"
            :multiple="false"
          />
          <RadioGroup
            label="Electrical Connection"
            v-model="form.lanyard.electricalConnection"
            :options="options.yesNo"
          />

          <b-row>
            <b-col lg="8" xl="5" offset-xl="4">
              <h5 class="font-weight-bold mb-6">Flame Trap</h5>
            </b-col>
          </b-row>
          <Select
            label="Tightness"
            placeholder="Select Condition"
            v-model="form.flameTrap.tightnessId"
            :options="options.bondingReelCondition"
            :multiple="false"
          />
          <Select
            label="Cleanliness"
            placeholder="Select Condition"
            v-model="form.flameTrap.cleanlinessId"
            :options="options.bondingReelCondition"
            :multiple="false"
          />

          <TextArea
            label="Remarks"
            placeholder="Please write your remarks here..."
            type="text"
            v-model="form.remarks"
            :v="$v.form.remarks"
          />
          <b-row v-if="currentProgress.status == 'Rejected'">
            <b-col lg="8" xl="5" offset="4">
              <b-alert show variant="danger">
                <h4 class="alert-heading">Rejected</h4>
                <hr />
                <p class="mb-0">
                  {{ currentProgress.remarks }}
                </p>
              </b-alert>
            </b-col>
          </b-row>
        </template>
        <FormHeader
          v-else
          :form="form"
          :currentProgress="currentProgress"
          :showRemarks="true"
        />
      </div>
    </b-row>
  </div>
</template>

<script>
import { ASYNC_SEARCH } from "@riophae/vue-treeselect";
import { mapGetters } from "vuex";
import FormHeader from "./FormHeader.vue";
import { required, maxLength } from "vuelidate/lib/validators";
import {
  getDppu,
  getDate,
  dateFormat,
  normalizer,
  getBondingReelCondition
} from "@/core/utils";
import { yesNo } from "@/core/datasource/options";

export default {
  components: {
    FormHeader
  },
  data: () => ({
    title: "210 SF - Bonding Wire, Lanyard, And Flame Trap Checked",
    route: {
      form: "sf210Create",
      table: "sf210"
    },
    form: {
      dppu: {
        id: null,
        label: null
      },
      dppuId: null,
      transactionId: "Auto Generated",
      transactionDate: getDate(),
      equipmentId: null,
      frontBondingReel: {
        clipId: null,
        wireAndInsulationId: null,
        connectionAndReelId: null,
        resistance: null
      },
      rearBondingReel: {
        clipId: null,
        wireAndInsulationId: null,
        connectionAndReelId: null,
        resistance: null
      },
      lanyard: {
        carabinerHookId: null,
        wireAndInsulationId: null,
        reelId: null,
        electricalConnection: null
      },
      flameTrap: {
        tightnessId: null,
        cleanlinessId: null
      },
      workItemId: null,
      remarks: null,
      sendApproval: false,
      updatedBy: null,
      updatedAt: null
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
      dppu: [],
      bondingReelCondition: [],
      yesNo
    }
  }),
  computed: {
    ...mapGetters("personalize", ["multipleDppu", "dppu"]),
    ...mapGetters("auth", ["user"]),
    subTitle() {
      const self = this;
      return self.$route.name != self.route.form
        ? "Update transaction"
        : "Create new transaction";
    },
    textButton() {
      const self = this;
      return self.$route.name != self.route.form ? "Update" : "Save";
    }
  },
  validations: {
    form: {
      dppuId: { required },
      transactionDate: { required },
      equipmentId: { required },
      remarks: { maxLength: maxLength(250) }
    }
  },
  created() {
    const self = this;

    if (self.multipleDppu) {
      getDppu().then(response => {
        self.options.dppu = response.data.map(x => ({
          id: x.id,
          label: x.name
        }));
      });
    } else {
      self.options.dppu = [self.dppu];
    }
    if (self.dppu) {
      self.form.dppuId = self.dppu.id;
    }

    self.getDefaultEquipment();
    getBondingReelCondition().then(response => {
      self.options.bondingReelCondition = response;
    });

    if (self.$route.name != self.route.form) {
      self.get();
    }
  },
  methods: {
    dateFormat,
    normalizer,
    getDefaultEquipment() {
      const self = this;

      self.$store
        .dispatch("apis/get", {
          url: `/equipment`,
          params: {
            dppu: self.form.dppuId,
            pageNumber: 1,
            pageSize: 20,
            category: 6,
            actived: true
          }
        })
        .then(response => {
          if (response.error) {
            self.$message.error({
              zIndex: 10000,
              message: response.message
            });
          } else {
            self.$refs.Equipment.$refs[
              "Equipment Identity"
            ].defaultOptions = response.data.data.map(x => ({
              id: x.id,
              label: x.code
            }));
            self.$refs.Equipment.$refs["Equipment Identity"].initialize();
          }
        });
    },
    getEquipmentByCategory({ action, searchQuery, callback }) {
      const self = this;

      if (action === ASYNC_SEARCH) {
        self.$store
          .dispatch("apis/get", {
            url: `/equipment`,
            params: {
              dppu: self.form.dppuId,
              pageNumber: 1,
              pageSize: 20,
              category: 6,
              keyword: searchQuery,
              actived: true
            }
          })
          .then(response => {
            if (response.error) {
              self.$message.error({
                zIndex: 10000,
                message: response.message
              });
            } else {
              callback(
                null,
                response.data.data.map(x => ({
                  id: x.id,
                  label: x.code
                }))
              );
            }
          });
      }
    },
    get() {
      const self = this;

      let loader = self.$loading.show();
      self.$store
        .dispatch("apis/get", {
          url: `/board/standard-form/210/${self.$route.params.id}`
        })
        .then(response => {
          if (response.error) {
            self.$message.error({
              zIndex: 10000,
              message: response.message
            });

            self.$router.push({ name: self.route.table });
          } else {
            self.form = {
              dppu: response.data.dppu,
              dppuId: response.data.dppu?.id,
              transactionId: response.data.transactionId,
              transactionDate: dateFormat(
                response.data.transactionDate,
                "YYYY-MM-DD"
              ),
              equipment: response.data.equipment,
              equipmentId: response.data.equipment?.id,
              frontBondingReel: {
                clip: response.data.frontBondingReel?.clip,
                clipId: response.data.frontBondingReel?.clip?.id,
                wireAndInsulation:
                  response.data.frontBondingReel?.wireAndInsulation,
                wireAndInsulationId:
                  response.data.frontBondingReel?.wireAndInsulation?.id,
                connectionAndReel:
                  response.data.frontBondingReel?.connectionAndReel,
                connectionAndReelId:
                  response.data.frontBondingReel?.connectionAndReel?.id,
                resistance: response.data.frontBondingReel?.resistance
              },
              rearBondingReel: {
                clip: response.data.rearBondingReel?.clip,
                clipId: response.data.rearBondingReel?.clip?.id,
                wireAndInsulation:
                  response.data.rearBondingReel?.wireAndInsulation,
                wireAndInsulationId:
                  response.data.rearBondingReel?.wireAndInsulation?.id,
                connectionAndReel:
                  response.data.rearBondingReel?.connectionAndReel,
                connectionAndReelId:
                  response.data.rearBondingReel?.connectionAndReel?.id,
                resistance: response.data.rearBondingReel?.resistance
              },
              lanyard: {
                carabinerHook: response.data.lanyard?.carabinerHook,
                carabinerHookId: response.data.lanyard?.carabinerHook?.id,
                wireAndInsulation: response.data.lanyard?.wireAndInsulation,
                wireAndInsulationId:
                  response.data.lanyard?.wireAndInsulation?.id,
                reel: response.data.lanyard?.reel,
                reelId: response.data.lanyard?.reel?.id,
                electricalConnection:
                  response.data.lanyard?.electricalConnection
              },
              flameTrap: {
                tightness: response.data.flameTrap?.tightness,
                tightnessId: response.data.flameTrap?.tightness?.id,
                cleanliness: response.data.flameTrap?.cleanliness,
                cleanlinessId: response.data.flameTrap?.cleanliness?.id
              },

              workItemId: response.data.workItemId,
              remarks: response.data.remarks,
              updatedBy: response.data.updatedBy,
              updatedAt: response.data.updatedAt
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
          }
        })
        .finally(() => loader.hide());
    },
    handleSubmit() {
      const self = this;

      self.$v.form.$touch();
      if (self.$v.form.$pending || self.$v.form.$error) return;

      let _confirmText = "",
        _okText = "",
        _action = "",
        _url = "";

      if (self.$route.name == self.route.form) {
        _confirmText = "You are about to save this transaction. Are you sure ?";
        _okText = "Yes, Save";
        _action = "apis/post";
        _url = "/board/standard-form/210";
      } else {
        _confirmText =
          "You are about to update this transaction. Are you sure ?";
        _okText = "Yes, Update";
        _action = "apis/put";
        _url = `/board/standard-form/210/${self.$route.params.id}`;
      }

      self.$dialog
        .confirm(_confirmText, {
          okText: _okText,
          cancelText: "Cancel",
          loader: true
        })
        .then(dialog => {
          self.$store
            .dispatch(_action, {
              url: _url,
              params: self.form
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

                self.$router.go(-1);
              }
            })
            .finally(() => dialog.close());
        });
    },
    handleDelete() {
      const self = this;

      self.$dialog
        .confirm("You are about to delete this transaction. Are you sure ?", {
          okText: "Yes, Delete",
          cancelText: "Cancel",
          loader: true
        })
        .then(dialog => {
          self.$store
            .dispatch("apis/remove", {
              url: `/board/standard-form/210/${self.$route.params.id}`
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

                self.$router.go(-1);
              }
            })
            .finally(() => dialog.close());
        });
    },
    handleSendApproval() {
      const self = this;

      self.$v.form.$touch();
      if (self.$v.form.$pending || self.$v.form.$error) return;

      self.$dialog
        .confirm(
          "You are about to save & send approval this transaction. Are you sure ?",
          {
            okText: "Yes, Send",
            cancelText: "Cancel",
            loader: true
          }
        )
        .then(dialog => {
          self.form.sendApproval = true;

          self.$store
            .dispatch("apis/put", {
              url: `/board/standard-form/210/${self.$route.params.id}`,
              params: self.form
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

                self.$router.go(-1);
              }
            })
            .finally(() => dialog.close());
        });
    }
  }
};
</script>
