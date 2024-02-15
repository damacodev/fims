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
            currentProgress.locked && currentProgress.status == 'Approved'
          "
          variant="outline-primary"
          @click="handleExport"
        >
          Export to Excel
        </b-button>
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
            label="Loading/Discharge/Vehicle No."
            placeholder="Select Vehicle"
            v-model="form.equipmentId"
            :v="$v.form.equipmentId"
            :async="true"
            :multiple="false"
            :loadOptions="getEquipmentByCategory"
            :disabled="form.workItemId != null"
          />
          <InputText
            label="Element Type"
            type="text"
            v-model="form.elementType"
          />
          <InputMoney
            label="Vessel Capacity"
            v-model="form.vesselCapacity"
            :usePrefix="false"
            append="Lpm."
          />
          <b-row>
            <b-col lg="8" xl="5" offset-xl="4">
              <h5 class="font-weight-bold mb-6">Condition Filter Before</h5>
            </b-col>
          </b-row>
          <form-group label="Operational Flowrate" class="mb-0">
            <b-row>
              <b-col cols="6">
                <InputMoney
                  label="Observed LPM"
                  v-model="form.conditionFilterBefore.operationalFlowrate.lpm"
                  :useLabel="false"
                  :useHorizontal="false"
                  :usePrefix="false"
                  append="Lpm."
                />
              </b-col>
              <b-col cols="6">
                <InputMoney
                  label="Observed PDG"
                  description="Observed P.D.G"
                  v-model="form.conditionFilterBefore.operationalFlowrate.pdg"
                  :useLabel="false"
                  :useHorizontal="false"
                  :usePrefix="false"
                  :precision="2"
                  append="psi"
                />
              </b-col>
            </b-row>
          </form-group>
          <form-group label="Maximum Achievable Flowrate" class="mb-0">
            <b-row>
              <b-col cols="6">
                <InputMoney
                  label="Observed LPM"
                  v-model="
                    form.conditionFilterBefore.maximumAchievableFlowrate.lpm
                  "
                  :useLabel="false"
                  :useHorizontal="false"
                  :usePrefix="false"
                  append="Lpm."
                />
              </b-col>
              <b-col cols="6">
                <InputMoney
                  label="Corrected PDG"
                  description="Corrected P.D.G"
                  v-model="
                    form.conditionFilterBefore.maximumAchievableFlowrate.pdg
                  "
                  :useLabel="false"
                  :useHorizontal="false"
                  :usePrefix="false"
                  :precision="2"
                  append="psi"
                />
              </b-col>
            </b-row>
          </form-group>
          <InputText
            label="Date Element Filter Last Changed"
            type="date"
            v-model="form.conditionFilterBefore.dateElementFilterLastChanged"
          />
          <InputMoney
            label="Throughput Since Element Last Change"
            v-model="
              form.conditionFilterBefore.throughputSinceElementLastChange
            "
            :usePrefix="false"
            append="Litres"
          />
          <RadioGroup
            v-model="form.conditionFilterBefore.reasonFilterChanged"
            label="Reason Filter Changed"
            :stacked="true"
            :options="options.reasonFilterChanged"
          />

          <b-row>
            <b-col lg="8" xl="5" offset-xl="4">
              <h5 class="font-weight-bold mb-6">
                Filter Vessel Condition Checked
              </h5>
            </b-col>
          </b-row>
          <InputText
            label="Elements Condition"
            type="text"
            v-model="form.filterVesselConditionChecked.elementsCondition"
          />
          <InputText
            label="Vessel Condition (Corrotion, Dirty, Leakage, Lining, Accessories)"
            type="text"
            v-model="form.filterVesselConditionChecked.vesselCondition"
          />

          <b-row>
            <b-col lg="8" xl="5" offset-xl="4">
              <h5 class="font-weight-bold mb-6">Parts Element Changed</h5>
            </b-col>
          </b-row>
          <form-group label="Parts Element Changed" class="mb-0">
            <b-row>
              <b-col cols="4">
                <InputMoney
                  label="Micro"
                  description="Micro"
                  v-model="form.partsElementChanged.micro"
                  :useLabel="false"
                  :useHorizontal="false"
                  :usePrefix="false"
                  append="Pcs"
                />
              </b-col>
              <b-col cols="4">
                <InputMoney
                  label="Coalescer"
                  description="Coalescer"
                  v-model="form.partsElementChanged.coalescer"
                  :useLabel="false"
                  :useHorizontal="false"
                  :usePrefix="false"
                  append="Pcs"
                />
              </b-col>
              <b-col cols="4">
                <InputMoney
                  label="Separator"
                  description="Separator"
                  v-model="form.partsElementChanged.separator"
                  :useLabel="false"
                  :useHorizontal="false"
                  :usePrefix="false"
                  append="Pcs"
                />
              </b-col>
              <b-col cols="4">
                <InputMoney
                  label="Monitor"
                  description="Monitor"
                  v-model="form.partsElementChanged.monitor"
                  :useLabel="false"
                  :useHorizontal="false"
                  :usePrefix="false"
                  append="Pcs"
                />
              </b-col>
              <b-col cols="4">
                <InputMoney
                  label="WBF"
                  description="WBF"
                  v-model="form.partsElementChanged.wbf"
                  :useLabel="false"
                  :useHorizontal="false"
                  :usePrefix="false"
                  append="Pcs"
                />
              </b-col>
            </b-row>
          </form-group>
          <form-group label="Spare Parts Element Filter Available" class="mb-0">
            <b-row>
              <b-col cols="4">
                <InputMoney
                  label="Micro"
                  description="Micro"
                  v-model="
                    form.partsElementChanged.sparepartsElementFilterAvailable
                      .micro
                  "
                  :useLabel="false"
                  :useHorizontal="false"
                  :usePrefix="false"
                  append="Pcs"
                />
              </b-col>
              <b-col cols="4">
                <InputMoney
                  label="Coalescer"
                  description="Coalescer"
                  v-model="
                    form.partsElementChanged.sparepartsElementFilterAvailable
                      .coalescer
                  "
                  :useLabel="false"
                  :useHorizontal="false"
                  :usePrefix="false"
                  append="Pcs"
                />
              </b-col>
              <b-col cols="4">
                <InputMoney
                  label="Separator"
                  description="Separator"
                  v-model="
                    form.partsElementChanged.sparepartsElementFilterAvailable
                      .separator
                  "
                  :useLabel="false"
                  :useHorizontal="false"
                  :usePrefix="false"
                  append="Pcs"
                />
              </b-col>
              <b-col cols="4">
                <InputMoney
                  label="Monitor"
                  description="Monitor"
                  v-model="
                    form.partsElementChanged.sparepartsElementFilterAvailable
                      .monitor
                  "
                  :useLabel="false"
                  :useHorizontal="false"
                  :usePrefix="false"
                  append="Pcs"
                />
              </b-col>
              <b-col cols="4">
                <InputMoney
                  label="WBF"
                  description="WBF"
                  v-model="
                    form.partsElementChanged.sparepartsElementFilterAvailable
                      .wbf
                  "
                  :useLabel="false"
                  :useHorizontal="false"
                  :usePrefix="false"
                  append="Pcs"
                />
              </b-col>
            </b-row>
          </form-group>

          <b-row>
            <b-col lg="8" xl="5" offset-xl="4">
              <h5 class="font-weight-bold mb-6">
                Filter Condition After Installation
              </h5>
            </b-col>
          </b-row>
          <form-group label="Operational Flowrate" class="mb-0">
            <b-row>
              <b-col cols="6">
                <InputMoney
                  label="Observed LPM"
                  v-model="
                    form.filterConditionAfterInstallation.operationalFlowrate
                      .lpm
                  "
                  :useLabel="false"
                  :useHorizontal="false"
                  :usePrefix="false"
                  append="Lpm."
                />
              </b-col>
              <b-col cols="6">
                <InputMoney
                  label="Observed PDG"
                  description="Observed P.D.G"
                  v-model="
                    form.filterConditionAfterInstallation.operationalFlowrate
                      .pdg
                  "
                  :useLabel="false"
                  :useHorizontal="false"
                  :usePrefix="false"
                  :precision="2"
                  append="psi"
                />
              </b-col>
            </b-row>
          </form-group>
          <form-group label="Maximum Achievable Flowrate" class="mb-0">
            <b-row>
              <b-col cols="6">
                <InputMoney
                  label="Observed LPM"
                  v-model="
                    form.filterConditionAfterInstallation
                      .maximumAchievableFlowrate.lpm
                  "
                  :useLabel="false"
                  :useHorizontal="false"
                  :usePrefix="false"
                  append="Lpm."
                />
              </b-col>
              <b-col cols="6">
                <InputMoney
                  label="Corrected PDG"
                  description="Corrected P.D.G"
                  v-model="
                    form.filterConditionAfterInstallation
                      .maximumAchievableFlowrate.pdg
                  "
                  :useLabel="false"
                  :useHorizontal="false"
                  :usePrefix="false"
                  :precision="2"
                  append="psi"
                />
              </b-col>
            </b-row>
          </form-group>
          <InputMoney
            label="Product Circulation"
            v-model="form.filterConditionAfterInstallation.productCirculation"
            :usePrefix="false"
            append="Litres"
          />
          <InputMoney
            label="Meter Totalisator"
            v-model="form.filterConditionAfterInstallation.meterTotalisator"
            :usePrefix="false"
          />
          <!-- <RadioGroup
            v-model="
              form.filterConditionAfterInstallation.milliporeColorimetricTest
            "
            label="Millipore Colorimetric Test"
            :options="options.wetDry"
          /> -->
          <form-group label="Millipore Colorimetric Test" class="mb-0">
            <b-row>
              <b-col cols="6">
                <InputText
                  label="Wet"
                  description="Wet"
                  type="text"
                  v-model="
                    form.filterConditionAfterInstallation
                      .milliporeColorimetricTest.wet
                  "
                  :useLabel="false"
                  :useHorizontal="false"
                />
              </b-col>
              <b-col cols="6">
                <InputText
                  label="Dry"
                  description="Dry"
                  type="text"
                  v-model="
                    form.filterConditionAfterInstallation
                      .milliporeColorimetricTest.dry
                  "
                  :useLabel="false"
                  :useHorizontal="false"
                />
              </b-col>
            </b-row>
          </form-group>
          <RadioGroup
            v-model="
              form.filterConditionAfterInstallation
                .hoseEndStrainerInspectionAndCleaning
            "
            label="Hose End Strainer Inspection & Cleaning"
            :options="options.cleanDirt"
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
import { getDppu, getDate, dateFormat } from "@/core/utils";
import {
  reasonFilterChanged,
  wetDry,
  cleanDirt
} from "@/core/datasource/options";

export default {
  components: {
    FormHeader
  },
  data: () => ({
    title: "209 SF - Laporan Pemasangan / Penggantian Elemen Filter",
    route: {
      form: "sf209Create",
      table: "sf209"
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
      elementType: null,
      vesselCapacity: null,
      conditionFilterBefore: {
        operationalFlowrate: {
          lpm: null,
          pdg: null
        },
        maximumAchievableFlowrate: {
          lpm: null,
          pdg: null
        },
        dateElementFilterLastChanged: null,
        throughputSinceElementLastChange: null,
        reasonFilterChanged: null
      },
      filterVesselConditionChecked: {
        elementsCondition: null,
        vesselCondition: null
      },
      partsElementChanged: {
        micro: null,
        coalescer: null,
        separator: null,
        monitor: null,
        wbf: null,
        sparepartsElementFilterAvailable: {
          micro: null,
          coalescer: null,
          separator: null,
          monitor: null,
          wbf: null
        }
      },
      filterConditionAfterInstallation: {
        operationalFlowrate: {
          lpm: null,
          pdg: null
        },
        maximumAchievableFlowrate: {
          lpm: null,
          pdg: null
        },
        productCirculation: null,
        meterTotalisator: null,
        milliporeColorimetricTest: {
          wet: null,
          dry: null
        },
        hoseEndStrainerInspectionAndCleaning: null
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
      reasonFilterChanged,
      wetDry,
      cleanDirt
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

    if (self.$route.name != self.route.form) {
      self.get();
    }
  },
  methods: {
    dateFormat,
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
              "Loading/Discharge/Vehicle No."
            ].defaultOptions = response.data.data.map(x => ({
              id: x.id,
              label: x.code
            }));
            self.$refs.Equipment.$refs[
              "Loading/Discharge/Vehicle No."
            ].initialize();
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
          url: `/board/standard-form/209/${self.$route.params.id}`
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
              elementType: response.data.elementType,
              vesselCapacity: response.data.vesselCapacity,
              conditionFilterBefore: {
                operationalFlowrate: {
                  lpm:
                    response.data.conditionFilterBefore?.operationalFlowrate
                      ?.lpm,
                  pdg:
                    response.data.conditionFilterBefore?.operationalFlowrate
                      ?.pdg
                },
                maximumAchievableFlowrate: {
                  lpm:
                    response.data.conditionFilterBefore
                      ?.maximumAchievableFlowrate?.lpm,
                  pdg:
                    response.data.conditionFilterBefore
                      ?.maximumAchievableFlowrate?.pdg
                },
                dateElementFilterLastChanged: dateFormat(
                  response.data.conditionFilterBefore
                    ?.dateElementFilterLastChanged,
                  "YYYY-MM-DD"
                ),
                throughputSinceElementLastChange:
                  response.data.conditionFilterBefore
                    ?.throughputSinceElementLastChange,
                reasonFilterChanged:
                  response.data.conditionFilterBefore?.reasonFilterChanged
              },
              filterVesselConditionChecked: {
                elementsCondition:
                  response.data.filterVesselConditionChecked?.elementsCondition,
                vesselCondition:
                  response.data.filterVesselConditionChecked?.vesselCondition
              },
              partsElementChanged: {
                micro: response.data.partsElementChanged?.micro,
                coalescer: response.data.partsElementChanged?.coalescer,
                separator: response.data.partsElementChanged?.separator,
                monitor: response.data.partsElementChanged?.monitor,
                wbf: response.data.partsElementChanged?.wbf,
                sparepartsElementFilterAvailable: {
                  micro:
                    response.data.partsElementChanged
                      ?.sparepartsElementFilterAvailable?.micro,
                  coalescer:
                    response.data.partsElementChanged
                      ?.sparepartsElementFilterAvailable?.coalescer,
                  separator:
                    response.data.partsElementChanged
                      ?.sparepartsElementFilterAvailable?.separator,
                  monitor:
                    response.data.partsElementChanged
                      ?.sparepartsElementFilterAvailable?.monitor,
                  wbf:
                    response.data.partsElementChanged
                      ?.sparepartsElementFilterAvailable?.wbf
                }
              },
              filterConditionAfterInstallation: {
                operationalFlowrate: {
                  lpm:
                    response.data.filterConditionAfterInstallation
                      ?.operationalFlowrate?.lpm,
                  pdg:
                    response.data.filterConditionAfterInstallation
                      ?.operationalFlowrate?.pdg
                },
                maximumAchievableFlowrate: {
                  lpm:
                    response.data.filterConditionAfterInstallation
                      ?.maximumAchievableFlowrate?.lpm,
                  pdg:
                    response.data.filterConditionAfterInstallation
                      ?.maximumAchievableFlowrate?.pdg
                },
                productCirculation:
                  response.data.filterConditionAfterInstallation
                    ?.productCirculation,
                meterTotalisator:
                  response.data.filterConditionAfterInstallation
                    ?.meterTotalisator,
                milliporeColorimetricTest: {
                  wet:
                    response.data.filterConditionAfterInstallation
                      ?.milliporeColorimetricTest?.wet,
                  dry:
                    response.data.filterConditionAfterInstallation
                      ?.milliporeColorimetricTest?.dry
                },
                hoseEndStrainerInspectionAndCleaning:
                  response.data.filterConditionAfterInstallation
                    ?.hoseEndStrainerInspectionAndCleaning
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
        _url = "/board/standard-form/209";
      } else {
        _confirmText =
          "You are about to update this transaction. Are you sure ?";
        _okText = "Yes, Update";
        _action = "apis/put";
        _url = `/board/standard-form/209/${self.$route.params.id}`;
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
              url: `/board/standard-form/209/${self.$route.params.id}`
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
              url: `/board/standard-form/209/${self.$route.params.id}`,
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
    handleExport() {
      const self = this;

      self.$dialog
        .confirm("You are about to export this transaction. Are you sure ?", {
          okText: "Yes, Export",
          cancelText: "Cancel",
          loader: true
        })
        .then(dialog => {
          self.$store
            .dispatch("apis/download", {
              url: `/board/export/standard-form/209/${self.$route.params.id}`
            })
            .then(response => {
              if (response.error) {
                self.$message.error({
                  zIndex: 10000,
                  message: response.message
                });
              } else {
                let fileURL = window.URL.createObjectURL(new Blob([response])),
                  fileLink = document.createElement("a");

                fileLink.href = fileURL;
                fileLink.setAttribute("download", "209.xlsx");
                document.body.appendChild(fileLink);

                fileLink.click();
              }
            })
            .finally(() => dialog.close());
        });
    }
  }
};
</script>
