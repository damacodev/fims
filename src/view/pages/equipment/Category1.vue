<template>
  <div>
    <WizardStep>
      <Select
        label="Type"
        v-model="step2.type"
        :options="movAtg"
        :multiple="false"
        :normalizer="normalizer"
      />
      <InputText
        label="Size, Dimensions"
        type="number"
        v-model="step2.dimensions"
      />
      <InputText label="Location" v-model="step2.location" />
      <InputText label="Manufacturer" v-model="step2.manufacturer" />
      <InputText label="Type of ATG" v-model="step2.typeOfAtg" />
      <InputText label="Serial Number" v-model="step2.serialNumber" />
      <InputText label="Model" v-model="step2.model" />
      <Select
        label="Automation Integrated"
        v-model="step2.automationIntegrated"
        :options="yesNo"
        :multiple="false"
        :normalizer="normalizer"
      />
      <!-- <Select
        label="Certificate of Calibration"
        v-model="step2.certificateOfCalibration"
        :options="yesNo"
        :multiple="false"
        :normalizer="normalizer"
      />
      <InputText
        label="Last Calibration"
        type="date"
        v-model="step2.lastCalibration"
      /> -->
      <Select
        label="Year of Manufacture"
        type="number"
        v-model="step2.yearOfManufacture"
        :options="years"
        :multiple="false"
        :normalizer="normalizer"
      />
    </WizardStep>
    <WizardStep>
      <InputText
        label="Condition"
        v-model="step3.condition"
        :v="validator.step3.condition"
      />
      <InputText label="Remarks" v-model="step3.remarks" />
      <RadioGroup
        v-if="$route.name != route.form"
        v-model="step3.actived"
        label="Status"
        :options="status"
      />
    </WizardStep>
  </div>
</template>

<script>
import { movAtg, yesNo, years, status } from "@/core/datasource/options";

export default {
  props: {
    step2: Object,
    step3: Object,
    route: Object,
    validator: Object
  },
  data: () => ({
    movAtg,
    yesNo,
    years,
    status,
    normalizer(node) {
      return {
        id: node.value,
        label: node.text
      };
    }
  })
};
</script>
