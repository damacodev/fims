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
          v-show="$route.name != route.form && !currentProgress.locked"
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
      <div
        class="card-body pb-0"
        v-bind:class="!currentProgress.locked ? `ml-10 mr-10` : ``"
      >
        <template v-if="!currentProgress.locked && !isPreview">
          <b-row>
            <b-col lg="6">
              <Select
                v-if="multipleDppu"
                label="Depot Pengisian Pesawat Udara"
                v-model="form.dppuId"
                :v="$v.form.dppuId"
                :options="options.dppu"
                :useHorizontal="false"
                :multiple="false"
                :disabled="$route.name != route.form"
              />
            </b-col>
          </b-row>
          <b-row>
            <b-col lg="6">
              <InputText
                label="Transaction #"
                type="text"
                v-model="form.transactionId"
                :v="$v.form.transactionId"
                :useHorizontal="false"
                disabled
              />
            </b-col>
            <b-col lg="6">
              <InputText
                label="Number"
                type="text"
                v-model="form.number"
                :useHorizontal="false"
                disabled
              />
            </b-col>
            <b-col lg="6">
              <Select
                ref="Tank"
                label="Tank"
                placeholder="Search tank..."
                v-model="form.tankId"
                :v="$v.form.tankId"
                :async="true"
                :multiple="false"
                :loadOptions="getEquipmentByCategory"
                :useHorizontal="false"
              />
            </b-col>
          </b-row>
          <b-row>
            <b-col lg="6">
              <h5 class="font-weight-bold mb-6">Grade</h5>
              <InputText
                label="Grade"
                type="text"
                v-model="form.grade.grade"
                :useHorizontal="false"
              />
              <InputText
                label="Batch No."
                type="text"
                v-model="form.grade.batchNo"
                :useHorizontal="false"
              />
              <InputText
                label="Date"
                type="date"
                v-model="form.grade.date"
                :useHorizontal="false"
              />
            </b-col>
            <b-col lg="6">
              <h5 class="font-weight-bold mb-6">Source</h5>
              <InputText
                label="Source"
                type="text"
                v-model="form.source.source"
                :useHorizontal="false"
              />
              <InputText
                label="Batch No."
                type="text"
                v-model="form.source.batchNo"
                :useHorizontal="false"
              />
              <InputText
                label="Date"
                type="date"
                v-model="form.source.date"
                :useHorizontal="false"
              />
            </b-col>
          </b-row>
          <b-row>
            <b-col lg="6">
              <h5 class="font-weight-bold mb-6">Re-Certification</h5>
              <InputText
                label="Certificate No"
                type="text"
                v-model="form.reCertification.no"
                :useHorizontal="false"
              />
              <InputText
                label="Date"
                type="date"
                v-model="form.reCertification.date"
                :useHorizontal="false"
              />
            </b-col>
            <b-col lg="6">
              <h5 class="font-weight-bold mb-6">
                Ex Certificate of Quality No.
              </h5>
              <InputText
                label="Certificate No"
                type="text"
                v-model="form.exCertificate.no"
                :useHorizontal="false"
              />
              <InputText
                label="Date"
                type="date"
                v-model="form.exCertificate.date"
                :useHorizontal="false"
              />
            </b-col>
          </b-row>
          <hr style="margin-left: -56px; margin-right: -56px" />
          <b-row>
            <b-col lg="6">
              <h6 class="font-weight-bold mb-6">
                Check and complete the following before release of aviation fuel
                tanks (following acceptance test)
              </h6>
              <RadioGroup
                v-model="form.question.satisfactoryCoq"
                label="Satisfactory COQ received from supply point"
                labelAlign="left"
                labelCols="9"
                contentCols="3"
                labelColsXl="9"
                contentColsXl="3"
                :options="options.yesNo"
                cssClass="text-right"
              />
              <RadioGroup
                v-model="form.question.tankBatchRelease"
                label="Tank Batch Release sign by Aviation Manager or Acting Manager Region"
                labelAlign="left"
                labelCols="9"
                contentCols="3"
                labelColsXl="9"
                contentColsXl="3"
                :options="options.yesNo"
                cssClass="text-right"
              />
              <RadioGroup
                v-model="form.question.settlingTimeRequirement"
                label="Settling time requirement has been met (minimum 2 hours)"
                labelAlign="left"
                labelCols="9"
                contentCols="3"
                labelColsXl="9"
                contentColsXl="3"
                :options="options.yesNo"
                cssClass="text-right"
              />
              <RadioGroup
                v-model="form.question.tankHasRemained"
                label="Tank has remained isolated since receipt of product"
                labelAlign="left"
                labelCols="9"
                contentCols="3"
                labelColsXl="9"
                contentColsXl="3"
                :options="options.yesNo"
                cssClass="text-right"
              />
              <RadioGroup
                v-model="form.question.tankSumpSamples"
                label="Tank sump samples, visually free from suspended dirt and water"
                labelAlign="left"
                labelCols="9"
                contentCols="3"
                labelColsXl="9"
                contentColsXl="3"
                :options="options.yesNo"
                cssClass="text-right"
              />
              <RadioGroup
                v-model="form.question.tankDrained"
                label="Tank drained, sample checked and result recorded as below."
                labelAlign="left"
                labelCols="9"
                contentCols="3"
                labelColsXl="9"
                contentColsXl="3"
                :options="options.yesNo"
                cssClass="text-right"
              />
              <RadioGroup
                v-model="form.question.electricalConductivity"
                label="Electrical Conductivity measured on site and recorded as below"
                labelAlign="left"
                labelCols="9"
                contentCols="3"
                labelColsXl="9"
                contentColsXl="3"
                :options="options.yesNo"
                cssClass="text-right"
              />
            </b-col>
            <b-col lg="6">
              <h5 class="font-weight-bold mb-6">Sampling Record</h5>
              <b-row>
                <b-col lg="6">
                  <InputText
                    label="Dirty (Visual)"
                    type="text"
                    labelAlign="left"
                    v-model="form.samplingRecord.dirty"
                    :v="$v.form.samplingRecord.dirty"
                    :useHorizontal="false"
                  />
                </b-col>
                <b-col lg="6">
                  <InputText
                    label="Free Water"
                    type="text"
                    labelAlign="left"
                    v-model="form.samplingRecord.freeWater"
                    :v="$v.form.samplingRecord.freeWater"
                    :useHorizontal="false"
                  />
                </b-col>
                <b-col lg="6">
                  <InputText
                    label="Suspended Water"
                    type="text"
                    labelAlign="left"
                    v-model="form.samplingRecord.freeWater"
                    :useHorizontal="false"
                    disabled
                  />
                </b-col>
                <b-col lg="6">
                  <InputText
                    label="Colour"
                    type="text"
                    labelAlign="left"
                    v-model="form.samplingRecord.colour"
                    :v="$v.form.samplingRecord.colour"
                    :useHorizontal="false"
                  />
                </b-col>
                <b-col lg="6">
                  <InputMoney
                    label="Density Observed"
                    labelAlign="left"
                    append="Kg/Ltr"
                    v-model="form.samplingRecord.densityObserved"
                    :v="$v.form.samplingRecord.densityObserved"
                    :usePrefix="false"
                    :precision="4"
                    :useHorizontal="false"
                  />
                </b-col>
                <b-col lg="6">
                  <InputMoney
                    label="Temperature Observed"
                    labelAlign="left"
                    append="°C"
                    v-model="form.samplingRecord.temperatureObserved"
                    :v="$v.form.samplingRecord.temperatureObserved"
                    :usePrefix="false"
                    :precision="0"
                    :useHorizontal="false"
                  />
                </b-col>
                <b-col lg="6">
                  <InputMoney
                    label="Electrical Conductivity"
                    labelAlign="left"
                    v-model="form.samplingRecord.electricalConductivity"
                    :v="$v.form.samplingRecord.electricalConductivity"
                    append="pS/m"
                    :usePrefix="false"
                    :precision="0"
                    :useHorizontal="false"
                  />
                </b-col>
                <b-col lg="6">
                  <InputMoney
                    label="Tank Density"
                    labelAlign="left"
                    v-model="form.samplingRecord.tankDensityAt15Degree"
                    :v="$v.form.samplingRecord.tankDensityAt15Degree"
                    append="@15°C"
                    :usePrefix="false"
                    :precision="4"
                    :useHorizontal="false"
                    @input="calculateVariance"
                  />
                </b-col>
                <b-col lg="6">
                  <InputMoney
                    label="Batch Density"
                    labelAlign="left"
                    v-model="form.samplingRecord.batchDensity"
                    :v="$v.form.samplingRecord.batchDensity"
                    :usePrefix="false"
                    :precision="4"
                    :useHorizontal="false"
                    @input="calculateVariance"
                  />
                </b-col>
                <b-col lg="6">
                  <InputMoney
                    label="Variance"
                    labelAlign="left"
                    v-model="form.samplingRecord.variance"
                    :v="$v.form.samplingRecord.variance"
                    :usePrefix="false"
                    :precision="4"
                    :useHorizontal="false"
                    disabled
                  />
                </b-col>
              </b-row>
            </b-col>
          </b-row>
          <hr style="margin-left: -56px; margin-right: -56px" />
          <b-row>
            <b-col lg="12">
              <h5 class="font-weight-bold mb-6">Date Specification</h5>
            </b-col>
            <b-col lg="6">
              <InputText
                label="Date of Tank Release on"
                type="datetime-local"
                v-model="form.tankReleaseDate"
                :useHorizontal="false"
              />
            </b-col>
            <b-col lg="6">
              <InputText
                label="Date of Beginning Settling"
                type="datetime-local"
                v-model="form.beginningSettlingDate"
                :useHorizontal="false"
              />
            </b-col>
          </b-row>

          <b-row v-if="currentProgress.status == 'Rejected'">
            <b-col lg="12">
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
        <vue-document-editor
          v-else-if="!currentProgress.locked && isPreview"
          :content.sync="content"
          :editable="false"
        />
        <FormHeader
          v-else
          :form="form"
          :currentProgress="currentProgress"
          :content="content"
          :showRemarks="true"
        />
      </div>
    </b-row>
  </div>
</template>

<script>
import TemplateDocument from "./TemplateDocument.vue";

import VueDocumentEditor from "vue-document-editor";
import { ASYNC_SEARCH } from "@riophae/vue-treeselect";
import { mapGetters } from "vuex";
import FormHeader from "./FormHeader.vue";
import {
  required,
  maxLength,
  integer,
  decimal
} from "vuelidate/lib/validators";
import { getDppu, numberFormat, getDate, dateFormat } from "@/core/utils";
import { yesNo } from "@/core/datasource/options";

export default {
  components: {
    VueDocumentEditor,
    FormHeader
  },
  data: () => ({
    isPreview: false,
    content: [],

    title: "128 SF - Tank Release",
    route: {
      form: "sf128Create",
      table: "sf128"
    },
    form: {
      dppu: {
        id: null,
        label: null
      },
      dppuId: null,
      transactionId: "Auto Generated",
      number: "Auto Generated",
      tankId: null,
      grade: {
        grade: null,
        batchNo: null,
        date: null
      },
      source: {
        source: null,
        batchNo: null,
        date: null
      },
      reCertification: {
        no: null,
        date: null
      },
      exCertificate: {
        no: null,
        date: null
      },
      question: {
        satisfactoryCoq: false,
        tankBatchRelease: false,
        settlingTimeRequirement: false,
        tankHasRemained: false,
        tankSumpSamples: false,
        tankDrained: false,
        electricalConductivity: false
      },
      samplingRecord: {
        dirty: null,
        freeWater: null,
        suspendedWater: null,
        colour: null,
        densityObserved: null,
        temperatureObserved: null,
        electricalConductivity: null,
        tankDensityAt15Degree: null,
        batchDensity: null,
        variance: null
      },
      tankReleaseDate: null,
      beginningSettlingDate: null,
      sendApproval: false,
      updatedBy: null,
      updatedAt: null
    },
    approveProgress: {
      qualityControllerBy: null,
      releasedBy: null
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
      transactionId: { required, maxLength: maxLength(50) },
      tankId: { required },
      samplingRecord: {
        dirty: { required },
        freeWater: { required },
        colour: { required },
        densityObserved: { required, decimal },
        temperatureObserved: { required, integer },
        electricalConductivity: { required, integer },
        tankDensityAt15Degree: { required, decimal },
        batchDensity: { required, decimal },
        variance: { required, decimal }
      },
      tankReleaseDate: { required }
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
    numberFormat,
    getDate,
    getDefaultEquipment() {
      const self = this;

      self.$store
        .dispatch("apis/get", {
          url: `/equipment`,
          params: {
            dppu: self.form.dppuId,
            pageNumber: 1,
            pageSize: 20,
            category: 7,
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
            self.$refs.Tank.$refs.Tank.defaultOptions = response.data.data.map(
              x => ({
                id: x.id,
                label: x.code
              })
            );
            self.$refs.Tank.$refs.Tank.initialize();
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
              category: 7,
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
    calculateVariance() {
      const self = this;
      self.form.samplingRecord.variance =
        self.form.samplingRecord.tankDensityAt15Degree -
        self.form.samplingRecord.batchDensity;
    },
    get() {
      const self = this;

      let loader = self.$loading.show();
      self.$store
        .dispatch("apis/get", {
          url: `/board/standard-form/128/${self.$route.params.id}`
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
              number: response.data.number || "Auto Generated",
              tank: response.data.tank,
              tankId: response.data.tank.id,
              grade: response.data.grade,
              source: response.data.source,
              reCertification: response.data.reCertification,
              exCertificate: response.data.exCertificate,
              question: response.data.question,
              samplingRecord: response.data.samplingRecord,
              tankReleaseDate: response.data.tankReleaseDate,
              beginningSettlingDate: response.data.beginningSettlingDate,
              updatedBy: response.data.updatedBy,
              updatedAt: response.data.updatedAt
            };
            self.form.grade.date =
              self.form.grade.date == null
                ? null
                : dateFormat(self.form.grade.date, "YYYY-MM-DD");
            self.form.source.date =
              self.form.source.date == null
                ? null
                : dateFormat(self.form.source.date, "YYYY-MM-DD");
            self.form.reCertification.date =
              self.form.reCertification.date == null
                ? null
                : dateFormat(self.form.reCertification.date, "YYYY-MM-DD");
            self.form.exCertificate.date =
              self.form.exCertificate.date == null
                ? null
                : dateFormat(self.form.exCertificate.date, "YYYY-MM-DD");

            self.currentProgress = {
              locked: response.data.currentProgress.locked,
              status: response.data.currentProgress.status,
              remarks: response.data.currentProgress.remarks,
              nextAction: {
                id: response.data.currentProgress.nextAction?.id,
                label: response.data.currentProgress.nextAction?.label
              }
            };

            self.approveProgress = {
              qualityControllerBy:
                response.data.approveProgress.qualityControllerBy,
              releasedBy: response.data.approveProgress.releasedBy
            };

            self.content = [
              {
                template: TemplateDocument,
                props: {
                  form: self.form,
                  approveProgress: self.approveProgress
                }
              }
            ];
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
        _url = "/board/standard-form/128";
      } else {
        _confirmText =
          "You are about to update this transaction. Are you sure ?";
        _okText = "Yes, Update";
        _action = "apis/put";
        _url = `/board/standard-form/128/${self.$route.params.id}`;
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
              url: `/board/standard-form/128/${self.$route.params.id}`
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
              url: `/board/standard-form/128/${self.$route.params.id}`,
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
              url: `/board/export/standard-form/128/${self.$route.params.id}`
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
                fileLink.setAttribute("download", "128.xlsx");
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
