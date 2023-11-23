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
            <b-col lg="6">
              <Select
                label="MOV"
                placeholder="Select MOV"
                v-model="form.equipmentId"
                :v="validations.form.equipmentId"
                :options="options.equipment"
                :useHorizontal="false"
                :multiple="false"
              />
            </b-col>
          </b-row>
          <b-row>
            <b-col lg="12">
              <h5 class="font-weight-bolder mb-6">Strainer</h5>
            </b-col>
          </b-row>
          <b-row>
            <b-col lg="3">
              <InputText
                label="S 101-A"
                type="text"
                v-model="form.strainer.s101A"
                :useHorizontal="false"
              />
            </b-col>
            <b-col lg="3">
              <InputText
                label="S 101-B"
                type="text"
                v-model="form.strainer.s101B"
                :useHorizontal="false"
              />
            </b-col>
            <b-col lg="3">
              <InputText
                label="S 101-C"
                type="text"
                v-model="form.strainer.s101C"
                :useHorizontal="false"
              />
            </b-col>
            <b-col lg="3">
              <InputText
                label="S 101-D"
                type="text"
                v-model="form.strainer.s101D"
                :useHorizontal="false"
              />
            </b-col>
          </b-row>
          <b-row>
            <b-col lg="6">
              <b-row>
                <b-col lg="12">
                  <h5 class="font-weight-bolder mb-6">PDG Micro Filter</h5>
                </b-col>
              </b-row>
              <b-row>
                <b-col lg="6">
                  <InputMoney
                    label="S 102-A"
                    type="number"
                    v-model="form.microFilter.s102A"
                    :v="validations.form.microFilter.s102A"
                    :useHorizontal="false"
                    :usePrefix="false"
                    append="Psi"
                  />
                </b-col>
                <b-col lg="6">
                  <InputMoney
                    label="S 102-B"
                    type="number"
                    v-model="form.microFilter.s102B"
                    :v="validations.form.microFilter.s102B"
                    :useHorizontal="false"
                    :usePrefix="false"
                    append="Psi"
                  />
                </b-col>
              </b-row>
            </b-col>
            <b-col lg="6">
              <b-row>
                <b-col lg="12">
                  <h5 class="font-weight-bolder mb-6">PDG Filter Separator</h5>
                </b-col>
              </b-row>
              <b-row>
                <b-col lg="6">
                  <InputMoney
                    label="S 103-A"
                    type="number"
                    v-model="form.filterSeparator.s103A"
                    :v="validations.form.filterSeparator.s103A"
                    :useHorizontal="false"
                    :usePrefix="false"
                    append="Psi"
                  />
                </b-col>
                <b-col lg="6">
                  <InputMoney
                    label="S 103-B"
                    type="number"
                    v-model="form.filterSeparator.s103B"
                    :v="validations.form.filterSeparator.s103B"
                    :useHorizontal="false"
                    :usePrefix="false"
                    append="Psi"
                  />
                </b-col>
              </b-row>
            </b-col>
          </b-row>
          <hr class="card-separator" />
          <b-row>
            <b-col lg="3">
              <InputMoney
                label="Density Observed"
                type="number"
                v-model="form.densityObserved"
                :v="validations.form.densityObserved"
                :useHorizontal="false"
                :usePrefix="false"
                :precision="4"
                append="Kg/L"
              />
            </b-col>
            <b-col lg="3">
              <InputMoney
                label="Temperature Observed"
                type="number"
                v-model="form.temperatureObserved"
                :v="validations.form.temperatureObserved"
                :useHorizontal="false"
                :usePrefix="false"
                :precision="0"
                append="°C"
              />
            </b-col>
            <b-col lg="3">
              <InputMoney
                label="Elcond"
                type="number"
                v-model="form.elcond"
                :v="validations.form.elcond"
                :useHorizontal="false"
                :usePrefix="false"
                :precision="0"
                append="pS/m"
              />
            </b-col>
            <b-col lg="3">
              <InputMoney
                label="Flow Rate"
                v-model="form.flowRate"
                :v="validations.form.flowRate"
                :useHorizontal="false"
                :usePrefix="false"
                :precision="0"
                append="Ltr/Mnt"
              />
            </b-col>
            <b-col lg="3">
              <InputMoney
                label="Jumlah Transfer"
                v-model="form.jumlahTransfer"
                :v="validations.form.jumlahTransfer"
                :useHorizontal="false"
                :usePrefix="false"
                :precision="4"
                append="KL"
              />
            </b-col>
            <b-col lg="3">
              <Select
                label="Visual Check"
                placeholder="Select visual check"
                v-model="form.visualCheckIds"
                :v="validations.form.visualCheckIds"
                :options="options.visualCheck"
                :multiple="true"
                :useHorizontal="false"
              />
            </b-col>
          </b-row>
          <b-row>
            <b-col lg="6">
              <TextArea
                label="Remarks"
                v-model="form.remarks"
                :v="validations.form.remarks"
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

import { getVisualCheck } from "@/core/utils";

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
      visualCheck: []
    }
  }),
  created() {
    const self = this;

    self.getEquipmentByCategory();
    getVisualCheck().then(response => {
      self.options.visualCheck = response;
    });
  },
  methods: {
    getEquipmentByCategory() {
      const self = this;

      self.$store
        .dispatch("apis/get", {
          url: `/equipment`,
          params: {
            dppu: self.form.dppu.id,
            category: 1
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
              label: x.code
            }));
          }
        });
    },
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
