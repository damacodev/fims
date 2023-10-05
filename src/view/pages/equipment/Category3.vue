<template>
  <div>
    <WizardStep>
      <InputText label="Location" v-model="step2.location" />
      <InputText label="Type of Filter" v-model="step2.typeOfFilter" />
      <InputText label="Brand" v-model="step2.brand" />
      <InputText label="Model Number" v-model="step2.modelNumber" />
      <InputText label="Serial Number" v-model="step2.serialNumber" />
      <InputText
        label="Vessel Capacity (GPM/LPM)"
        type="number"
        v-model="step2.vesselCapacity"
      />
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
      <form-group label="1st Stage">
        <b-row>
          <b-col cols="6">
            <InputText
              label="Original Element Filter"
              description="Original Element Filter"
              :use-horizontal="false"
              :use-label="false"
              v-model="step3.firstStageOriginalElementFilter"
            />
          </b-col>
          <b-col cols="6">
            <InputText
              label="Number of Element Filter"
              description="Number of Element Filter"
              :use-horizontal="false"
              :use-label="false"
              v-model="step3.firstStageNumberOfOriginalElementFilter"
            />
          </b-col>
        </b-row>
      </form-group>
      <form-group label="2nd Stage">
        <b-row>
          <b-col cols="6">
            <InputText
              label="Original Element Filter"
              description="Original Element Filter"
              :use-horizontal="false"
              :use-label="false"
              v-model="step3.secondStageOriginalElementFilter"
            />
          </b-col>
          <b-col cols="6">
            <InputText
              label="Number of Element Filter"
              description="Number of Element Filter"
              :use-horizontal="false"
              :use-label="false"
              v-model="step3.secondStageNumberOfOriginalElementFilter"
            />
          </b-col>
        </b-row>
      </form-group>
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
import { years, status } from "@/core/datasource/options";

export default {
  props: {
    step2: Object,
    step3: Object,
    route: Object,
    validator: Object
  },
  data: () => ({
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
