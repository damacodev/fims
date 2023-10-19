<template>
  <CardForm :title="title" :subTitle="subTitle">
    <template slot="toolbar">
      <b-button
        v-show="$route.name != route.form && buttonVisibility"
        variant="outline-danger"
        size="lg"
        class="mr-10"
        @click="handleDelete"
      >
        Delete
      </b-button>
      <b-button
        v-show="buttonVisibility"
        variant="primary"
        size="lg"
        class="mr-2"
        @click="handleSubmit"
      >
        {{ textButton }}
      </b-button>
      <b-button variant="secondary" size="lg" @click="$router.go(-1)">
        Cancel
      </b-button>
    </template>
    <template slot="form">
      <b-form @submit.stop.prevent="handleSubmit">
        <div class="card-body">
          <FormHeader :form="form" :currentProgress="currentProgress" />
          <hr />
          <b-row v-if="buttonVisibility">
            <b-col lg="3">
              <b-row>
                <b-col lg="12">
                  <h5 class="font-weight-bold mb-6">General Data</h5>
                </b-col>
              </b-row>
              <InputText
                label="Record Time"
                type="time"
                v-model="form.time"
                :v="$v.form.time"
                :useHorizontal="false"
              />
              <InputText
                label="Bridger No"
                type="text"
                v-model="form.bridgerNo"
                :v="$v.form.bridgerNo"
                :useHorizontal="false"
              />
              <InputText
                label="BPP No"
                type="text"
                v-model="form.bppNo"
                :v="$v.form.bppNo"
                :useHorizontal="false"
              />
              <InputText
                label="Volume"
                type="number"
                v-model="form.volume"
                :v="$v.form.volume"
                :step="2"
                :useHorizontal="false"
                append="LTR"
              />
              <InputText
                label="Seal / Segel"
                type="text"
                v-model="form.seal"
                :v="$v.form.seal"
                :useHorizontal="false"
              />
            </b-col>
            <b-col lg="3">
              <b-row>
                <b-col lg="12">
                  <h5 class="font-weight-bold mb-6">Receiving Document</h5>
                </b-col>
              </b-row>
              <InputText
                label="Aviation Fuel Delivery Release Note"
                type="text"
                v-model="form.receivingDocument.afrnNo"
                :v="$v.form.receivingDocument.afrnNo"
                :useHorizontal="false"
              />
              <InputText
                label="Density Observed"
                type="number"
                v-model="form.receivingDocument.densityObserved"
                :v="$v.form.receivingDocument.densityObserved"
                :step="2"
                :useHorizontal="false"
                append="Kg/L"
              />
              <InputText
                label="Temperature"
                type="number"
                v-model="form.receivingDocument.temperature"
                :v="$v.form.receivingDocument.temperature"
                :useHorizontal="false"
                append="°C"
              />
              <InputText
                label="Density 15°C"
                type="number"
                v-model="form.receivingDocument.densityAt15Celcius"
                :v="$v.form.receivingDocument.densityAt15Celcius"
                :step="2"
                :useHorizontal="false"
                append="Kg/L"
              />
            </b-col>
            <b-col lg="3">
              <b-row>
                <b-col lg="12">
                  <h5 class="font-weight-bold mb-6">Visual Check</h5>
                </b-col>
              </b-row>
              <InputText
                label="Density Observed"
                type="number"
                v-model="form.visualCheck.densityObserved"
                :v="$v.form.visualCheck.densityObserved"
                :step="2"
                :useHorizontal="false"
                append="Kg/L"
              />
              <InputText
                label="Temperature"
                type="number"
                v-model="form.visualCheck.temperature"
                :v="$v.form.visualCheck.temperature"
                :useHorizontal="false"
                append="°C"
              />
              <InputText
                label="Density 15°C"
                type="number"
                v-model="form.visualCheck.densityAt15Celcius"
                :v="$v.form.visualCheck.densityAt15Celcius"
                :step="2"
                :useHorizontal="false"
                append="Kg/L"
              />
              <InputText
                label="DIFF.max 0.003 kg/l"
                type="number"
                v-model="form.visualCheck.maximumDifferential"
                :v="$v.form.visualCheck.maximumDifferential"
                :step="2"
                :useHorizontal="false"
              />
            </b-col>
            <b-col lg="3">
              <b-row>
                <b-col lg="12">
                  <h5 class="font-weight-bold mb-6">Result</h5>
                </b-col>
              </b-row>
              <Select
                label="Appearance"
                placeholder="Select appearance"
                v-model="form.appearanceId"
                :v="$v.form.appearanceId"
                :options="options.appearance"
                :multiple="false"
                :useHorizontal="false"
              />
              <InputText
                label="Conductivity"
                type="number"
                v-model="form.conductivity"
                :v="$v.form.conductivity"
                :step="2"
                :useHorizontal="false"
                append="pS/m"
              />
              <TextArea
                label="Remarks"
                type="text"
                v-model="form.remarks"
                :v="$v.form.remarks"
                :useHorizontal="false"
                :rows="6"
              />
            </b-col>
          </b-row>
          <b-row v-else>
            <b-col lg="4">
              <b-row>
                <b-col lg="12">
                  <h5 class="font-weight-bold mb-6">General Data</h5>
                </b-col>
              </b-row>
              <PlainText label="Record Time" :value="form.time" />
              <PlainText label="Bridger No" :value="form.bridgerNo" />
              <PlainText label="BPP No" :value="form.bppNo" />
              <PlainText label="Volume" :value="setVolume(form.volume)" />
              <PlainText label="Seal / Segel" :value="form.seal" />
              <PlainText label="Appearance" :value="form.appearance.label" />
              <PlainText
                label="Conductivity"
                :value="setConductivity(form.conductivity)"
              />
              <PlainText label="Remarks" :value="form.remarks" />
            </b-col>
            <b-col lg="4">
              <b-row>
                <b-col lg="12">
                  <h5 class="font-weight-bold mb-6">Receiving Document</h5>
                </b-col>
              </b-row>
              <PlainText
                label="Aviation Fuel Delivery Release Note"
                :value="form.receivingDocument.afrnNo"
              />
              <PlainText
                label="Density Observed"
                :value="setDensity(form.receivingDocument.densityObserved)"
              />
              <PlainText
                label="Temperature"
                :value="setTemperature(form.receivingDocument.temperature)"
              />
              <PlainText
                label="Density 15°C"
                :value="setDensity(form.receivingDocument.densityAt15Celcius)"
              />
            </b-col>
            <b-col lg="4">
              <b-row>
                <b-col lg="12">
                  <h5 class="font-weight-bold mb-6">Visual Check</h5>
                </b-col>
              </b-row>
              <PlainText
                label="Density Observed"
                :value="setDensity(form.visualCheck.densityObserved)"
              />
              <PlainText
                label="Temperature"
                :value="setTemperature(form.visualCheck.temperature)"
              />
              <PlainText
                label="Density 15°C"
                :value="setDensity(form.visualCheck.densityAt15Celcius)"
              />
              <PlainText
                label="DIFF.max 0.003 Kg/L"
                :value="form.visualCheck.maximumDifferential"
              />
            </b-col>
          </b-row>
        </div>
      </b-form>
    </template>
  </CardForm>
</template>

<script>
import FormHeader from "./FormHeader.vue";
import { apiUrl } from "@/core/services/api.url";
import {
  required,
  integer,
  decimal,
  maxLength
} from "vuelidate/lib/validators";
import {
  dateFormat,
  dateTimeFormat,
  getAppearance,
  setVolume,
  setDensity,
  setTemperature,
  setConductivity
} from "@/core/utils";

export default {
  components: {
    FormHeader
  },
  data: () => ({
    title: "103 SF - Bridger Quality Control Before Receipt Record",
    subTitle: "You can make a record here",
    route: {
      form: "sf103CreateItem"
    },
    baseUrl: process.env.NODE_ENV === "production" ? apiUrl.prod : apiUrl.dev,
    form: {
      standardForm103Id: null,
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
      grade: null,
      time: null,
      recordTime: null,
      bridgerNo: null,
      bppNo: null,
      volume: null,
      seal: null,
      receivingDocument: {
        afrnNo: null,
        densityObserved: null,
        temperature: null,
        densityAt15Celcius: null
      },
      visualCheck: {
        densityObserved: null,
        temperature: null,
        densityAt15Celcius: null,
        maximumDifferential: null
      },
      appearance: {
        id: null,
        label: null
      },
      appearanceId: null,
      conductivity: null,
      remarks: null
    },
    currentProgress: {
      status: null,
      nextAction: {
        id: null,
        label: null
      }
    },
    options: {
      appearance: []
    }
  }),
  computed: {
    textButton() {
      const self = this;
      return self.$route.name != self.route.form ? "Update" : "Submit";
    },
    buttonVisibility() {
      const self = this;

      return self.currentProgress.status == "New";
    }
  },
  validations: {
    form: {
      standardForm103Id: { required },
      time: { required },
      bridgerNo: { required },
      bppNo: { required },
      volume: { required, decimal },
      seal: { required },
      receivingDocument: {
        afrnNo: { required },
        densityObserved: { required, decimal },
        temperature: { required, integer },
        densityAt15Celcius: { required, decimal }
      },
      visualCheck: {
        densityObserved: { required, decimal },
        temperature: { required, integer },
        densityAt15Celcius: { required, decimal },
        maximumDifferential: { required, decimal }
      },
      appearanceId: { required },
      conductivity: { required, integer },
      remarks: { maxLength: maxLength(250) }
    }
  },
  created() {
    const self = this;
    self.get();

    getAppearance().then(response => {
      self.options.appearance = response;
    });

    if (self.$route.name != self.route.form) {
      self.getById();
    }

    /* self.form.time = "10:22";
    self.form.bridgerNo = "BR123";
    self.form.bppNo = "BPP123";
    self.form.volume = 9800;
    self.form.seal = "S123";
    self.form.receivingDocument = {
      afrnNo: "AFRN123",
      densityObserved: 90.8,
      temperature: 26,
      densityAt15Celcius: 67.2
    };
    self.form.visualCheck = {
      densityObserved: 87.4,
      temperature: 31,
      densityAt15Celcius: 54.22,
      maximumDifferential: 43.123
    };
    self.form.appearanceId = "1E";
    self.form.conductivity = 32; */
  },
  methods: {
    setVolume,
    setDensity,
    setTemperature,
    setConductivity,
    get() {
      const self = this;

      let loader = self.$loading.show();
      self.$store
        .dispatch("apis/get", {
          url: `/board/standard-form/103/${self.$route.params.id}`
        })
        .then(response => {
          if (response.error) {
            self.$message.error({
              zIndex: 10000,
              message: response.message
            });

            self.$router.push({ name: self.route.table });
          } else {
            self.form.standardForm103Id = response.data.id;
            self.form.dppu = response.data.dppu;
            self.form.transactionId = response.data.transactionId;
            self.form.transactionDate = dateFormat(
              response.data.transactionDate,
              "YYYY-MM-DD"
            );
            self.form.shift = {
              id: response.data.shift?.id,
              label: response.data.shift?.label
            };
            self.form.grade = response.data.grade;

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
          url: `/board/standard-form/103/record/${self.$route.params.iditem}`
        })
        .then(response => {
          if (response.error) {
            self.$message.error({
              zIndex: 10000,
              message: response.message
            });

            self.$router.push({ name: self.route.table });
          } else {
            self.form.time = dateTimeFormat(response.data.recordTime, "HH:mm");
            self.form.bridgerNo = response.data.bridgerNo;
            self.form.bppNo = response.data.bppNo;
            self.form.volume = response.data.volume;
            self.form.seal = response.data.seal;
            self.form.receivingDocument = response.data.receivingDocument;
            self.form.visualCheck = response.data.visualCheck;
            self.form.appearance = response.data.appearance;
            self.form.appearanceId = response.data.appearance.id;
            self.form.conductivity = response.data.conductivity;
            self.form.remarks = response.data.remarks;
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
        _confirmText = "You are about to submit this record. Are you sure ?";
        _okText = "Yes, Submit";
        _action = "apis/post";
        _url = "/board/standard-form/103/record";
      } else {
        _confirmText = "You are about to update this record. Are you sure ?";
        _okText = "Yes, Update";
        _action = "apis/put";
        _url = `/board/standard-form/103/record/${self.$route.params.iditem}`;
      }

      self.$dialog
        .confirm(_confirmText, {
          okText: _okText,
          cancelText: "Cancel",
          loader: true
        })
        .then(dialog => {
          self.form.recordTime = dateTimeFormat(
            `${self.form.transactionDate} ${self.form.time}`,
            "YYYY-MM-DD HH:mm:ss"
          );
          self.$store
            .dispatch(_action, {
              url: _url,
              params: self.form
            })
            .then(response => {
              dialog.close();
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
            });
        });
    },
    handleDelete() {
      const self = this;

      self.$dialog
        .confirm("You are about to delete this record. Are you sure ?", {
          okText: "Yes, Delete",
          cancelText: "Cancel",
          loader: true
        })
        .then(dialog => {
          self.$store
            .dispatch("apis/remove", {
              url: `/board/standard-form/103/record/${self.$route.params.iditem}`
            })
            .then(response => {
              dialog.close();
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
            });
        });
    }
  }
};
</script>
