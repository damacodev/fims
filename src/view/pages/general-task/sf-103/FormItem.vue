<template>
  <b-form @submit.stop.prevent="handleSubmit">
    <div class="card-body">
      <FormHeader
        :form="form"
        :currentProgress="currentProgress"
        :showRemarks="false"
      />
      <hr />
      <b-row v-if="!currentProgress.locked">
        <b-col lg="12">
          <b-row>
            <b-col lg="12">
              <h5 class="font-weight-bold mb-6">General Data</h5>
            </b-col>
          </b-row>
          <b-row>
            <b-col lg="3">
              <InputText
                label="Record Time"
                type="time"
                v-model="form.time"
                :v="validations.form.time"
                :useHorizontal="false"
              />
            </b-col>
          </b-row>
          <b-row>
            <b-col lg="3">
              <InputText
                label="Bridger No"
                type="text"
                v-model="form.bridgerNo"
                :v="validations.form.bridgerNo"
                :useHorizontal="false"
              />
            </b-col>
            <b-col lg="3">
              <InputText
                label="BPP No"
                type="text"
                v-model="form.bppNo"
                :v="validations.form.bppNo"
                :useHorizontal="false"
              />
            </b-col>
            <b-col lg="3">
              <InputMoney
                label="Volume"
                type="number"
                v-model="form.volume"
                :v="validations.form.volume"
                :useHorizontal="false"
                :usePrefix="false"
                :precision="2"
                append="LTR"
              />
            </b-col>
            <b-col lg="3">
              <InputText
                label="Seal / Segel"
                type="text"
                v-model="form.seal"
                :v="validations.form.seal"
                :useHorizontal="false"
              />
            </b-col>
          </b-row>
          <b-row>
            <b-col lg="12">
              <h5 class="font-weight-bold mb-6">Tank Batch Document</h5>
            </b-col>
          </b-row>
          <b-row>
            <b-col lg="3">
              <InputText
                label="Test Report No"
                type="text"
                v-model="form.tankBatchDocument.testReportNo"
                :v="validations.form.tankBatchDocument.testReportNo"
                :useHorizontal="false"
              />
            </b-col>
            <b-col lg="3">
              <InputMoney
                label="Density 15°C"
                type="number"
                v-model="form.tankBatchDocument.densityAt15Celcius"
                :v="validations.form.tankBatchDocument.densityAt15Celcius"
                :useHorizontal="false"
                :usePrefix="false"
                :precision="2"
                append="Kg/L"
                @input="calculate"
              />
            </b-col>
          </b-row>
          <b-row>
            <b-col lg="12">
              <h5 class="font-weight-bold mb-6">Receiving Document</h5>
            </b-col>
          </b-row>
          <b-row>
            <b-col lg="3">
              <InputText
                label="Aviation Fuel Delivery Release Note"
                type="text"
                v-model="form.receivingDocument.afrnNo"
                :v="validations.form.receivingDocument.afrnNo"
                :useHorizontal="false"
              />
            </b-col>
            <b-col lg="3">
              <InputMoney
                label="Density Observed"
                type="number"
                v-model="form.receivingDocument.densityObserved"
                :v="validations.form.receivingDocument.densityObserved"
                :useHorizontal="false"
                :usePrefix="false"
                :precision="2"
                append="Kg/L"
              />
            </b-col>
            <b-col lg="3">
              <InputMoney
                label="Temperature"
                type="number"
                v-model="form.receivingDocument.temperature"
                :v="validations.form.receivingDocument.temperature"
                :useHorizontal="false"
                :usePrefix="false"
                :precision="0"
                append="°C"
              />
            </b-col>
            <b-col lg="3">
              <InputMoney
                label="Density 15°C"
                type="number"
                v-model="form.receivingDocument.densityAt15Celcius"
                :v="validations.form.receivingDocument.densityAt15Celcius"
                :useHorizontal="false"
                :usePrefix="false"
                :precision="2"
                append="Kg/L"
              />
            </b-col>
          </b-row>
          <b-row>
            <b-col lg="12">
              <h5 class="font-weight-bold mb-6">Control Check</h5>
            </b-col>
          </b-row>
          <b-row>
            <b-col lg="3">
              <InputMoney
                label="Density Observed"
                type="number"
                v-model="form.controlCheck.densityObserved"
                :v="validations.form.controlCheck.densityObserved"
                :useHorizontal="false"
                :usePrefix="false"
                :precision="2"
                append="Kg/L"
              />
            </b-col>
            <b-col lg="3">
              <InputMoney
                label="Temperature"
                type="number"
                v-model="form.controlCheck.temperature"
                :v="validations.form.controlCheck.temperature"
                :useHorizontal="false"
                :usePrefix="false"
                :precision="0"
                append="°C"
              />
            </b-col>
            <b-col lg="3">
              <InputMoney
                label="Density 15°C"
                type="number"
                v-model="form.controlCheck.densityAt15Celcius"
                :v="validations.form.controlCheck.densityAt15Celcius"
                :useHorizontal="false"
                :usePrefix="false"
                :precision="2"
                append="Kg/L"
                @input="calculate"
              />
            </b-col>
            <b-col lg="3">
              <InputMoney
                label="DIFF.max 0.003 Kg/L"
                type="number"
                v-model="form.controlCheck.maximumDifferential"
                :v="validations.form.controlCheck.maximumDifferential"
                :usePrefix="false"
                :precision="2"
                :useHorizontal="false"
              />
            </b-col>
          </b-row>
          <b-row>
            <b-col lg="12">
              <h5 class="font-weight-bold mb-6">Product Received</h5>
            </b-col>
          </b-row>
          <b-row>
            <b-col lg="3">
              <Select
                label="Appearance"
                placeholder="Select appearance"
                v-model="form.appearanceIds"
                :v="validations.form.appearanceIds"
                :options="options.appearance"
                :multiple="true"
                :useHorizontal="false"
              />
            </b-col>
            <b-col lg="3">
              <InputMoney
                label="Conductivity"
                type="number"
                v-model="form.conductivity"
                :v="validations.form.conductivity"
                :useHorizontal="false"
                :usePrefix="false"
                :precision="0"
                append="pS/m"
              />
            </b-col>
            <b-col lg="3">
              <InputText
                label="Tank No"
                type="text"
                v-model="form.tankNo"
                :v="validations.form.tankNo"
                :useHorizontal="false"
              />
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </div>
  </b-form>
</template>

<script>
import FormHeader from "./FormHeader.vue";

import { getAppearance } from "@/core/utils";

export default {
  components: { FormHeader },
  props: {
    form: Object,
    currentProgress: Object,
    validations: Object
  },
  data: () => ({
    options: {
      appearance: []
    }
  }),
  created() {
    getAppearance().then(response => {
      this.options.appearance = response;
    });
  },
  methods: {
    calculate() {
      const self = this;
      self.form.controlCheck.maximumDifferential =
        self.form.tankBatchDocument.densityAt15Celcius -
        self.form.controlCheck.densityAt15Celcius;
    },
    handleSubmit() {
      this.$emit("onSubmit");
    }
  }
};
</script>
