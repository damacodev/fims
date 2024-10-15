<template>
  <b-form @submit.stop.prevent="handleSubmit">
    <div class="card-body">
      <FormHeader
        :form="form"
        :currentProgress="currentProgress"
        :showRemarks="false"
      />
      <hr class="card-separator" />
      <b-row v-if="!currentProgress.locked">
        <b-col lg="12">
          <b-row>
            <b-col lg="12">
              <h5 class="font-weight-bolder mb-6">General Data</h5>
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
            <b-col lg="3">
              <InputText
                label="Nomor Ritase"
                type="number"
                v-model="form.ritase"
                :v="validations.form.ritase"
                :useHorizontal="false"
              />
            </b-col>
          </b-row>
          <b-row>
            <b-col lg="3">
              <Select
                label="Bridger No"
                placeholder="Select Bridger"
                v-model="form.bridgerId"
                :options="options.equipment"
                :useHorizontal="false"
                :multiple="false"
                :v="validations.form.bridgerId"
                @input="changeEquipment"
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
                :precision="4"
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
              <h5 class="font-weight-bolder mb-6">Tank Batch Document</h5>
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
                :precision="4"
                append="Kg/L"
                @input="calculateAll"
              />
            </b-col>
          </b-row>
          <b-row>
            <b-col lg="12">
              <h5 class="font-weight-bolder mb-6">Receiving Document</h5>
            </b-col>
          </b-row>
          <b-row>
            <b-col lg="3">
              <InputText
                label="AFRN No"
                type="text"
                description="Aviation Fuel Delivery Release Note"
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
                :precision="4"
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
                :precision="4"
                append="Kg/L"
              />
            </b-col>
          </b-row>
        </b-col>
      </b-row>
      <template v-for="(item, index) in form.jumlahKompartemen">
        <fragment v-bind:key="index">
          <hr class="card-separator" />
          <b-row>
            <b-col lg="12">
              <h5 class="font-weight-bolder mb-6">
                {{ `Kompartemen ${index + 1}` }}
              </h5>
            </b-col>
          </b-row>
          <b-row>
            <b-col lg="12">
              <h5 class="font-weight-bolder mb-6">Control Check</h5>
            </b-col>
          </b-row>
          <b-row>
            <b-col lg="3">
              <InputMoney
                label="Density Observed"
                type="number"
                v-model="form.records[index].controlCheck.densityObserved"
                :useHorizontal="false"
                :usePrefix="false"
                :precision="4"
                append="Kg/L"
              />
            </b-col>
            <b-col lg="3">
              <InputMoney
                label="Temperature"
                type="number"
                v-model="form.records[index].controlCheck.temperature"
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
                v-model="form.records[index].controlCheck.densityAt15Celcius"
                :useHorizontal="false"
                :usePrefix="false"
                :precision="4"
                append="Kg/L"
                @input="calculate(index)"
              />
            </b-col>
            <b-col lg="3">
              <InputMoney
                label="DIFF.max 0.003 Kg/L"
                type="number"
                v-model="form.records[index].controlCheck.maximumDifferential"
                :usePrefix="false"
                :precision="4"
                :useHorizontal="false"
                disabled
              />
            </b-col>
          </b-row>
          <b-row>
            <b-col lg="12">
              <h5 class="font-weight-bolder mb-6">Product Received</h5>
            </b-col>
          </b-row>
          <b-row>
            <b-col lg="3">
              <Select
                label="Appearance"
                placeholder="Select appearance"
                v-model="form.records[index].appearanceIds"
                :options="options.appearance"
                :multiple="true"
                :useHorizontal="false"
              />
            </b-col>
            <b-col lg="3">
              <InputMoney
                label="Conductivity"
                type="number"
                v-model="form.records[index].conductivity"
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
                v-model="form.records[index].tankNo"
                :useHorizontal="false"
              />
            </b-col>
          </b-row>
        </fragment>
      </template>
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
      equipment: [],
      appearance: []
    }
  }),
  created() {
    const self = this;

    self.getEquipmentByCategory();

    getAppearance().then(response => {
      self.options.appearance = response;
    });
  },
  methods: {
    changeEquipment() {
      const self = this;

      self.form.jumlahKompartemen = null;

      let bridger = self.options.equipment.find(
        x => x.id == self.form.bridgerId
      );
      self.form.jumlahKompartemen = bridger.detail.detail.jumlahKompartemen;
    },
    getEquipmentByCategory() {
      const self = this;

      self.$store
        .dispatch("apis/get", {
          url: `/equipment`,
          params: {
            dppu: self.form.dppuId,
            category: 8
          }
        })
        .then(response => {
          if (response.error) {
            self.$message.error({
              zIndex: 10000,
              message: response.message
            });
          } else {
            self.options.equipment = response.data.data.map(x => ({
              id: x.id,
              label: x.code,
              detail: x
            }));
          }
        });
    },
    calculateAll() {
      const self = this;

      for (let index = 0; index < self.form.jumlahKompartemen; index++) {
        self.calculate(index);
      }
    },
    calculate(index) {
      const self = this;

      let record = self.form.records[index];
      record.controlCheck.maximumDifferential =
        self.form.tankBatchDocument.densityAt15Celcius -
        record.controlCheck.densityAt15Celcius;
    },
    handleSubmit() {
      this.$emit("onSubmit");
    }
  }
};
</script>
