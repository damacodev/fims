<template>
  <div>
    <WizardStep>
      <InputText
        label="Type of Equipment"
        v-model="step2.type"
        :v="validator.step2.type"
      />

      <b-row>
        <b-col lg="8" xl="5" offset-xl="4">
          <h5 class="font-weight-bold mb-6">Trucktive</h5>
        </b-col>
      </b-row>
      <InputText label="Brand" v-model="step2.trucktiveBrand" />
      <InputText label="Type" v-model="step2.trucktiveType" />

      <b-row>
        <b-col lg="8" xl="5" offset-xl="4">
          <h5 class="font-weight-bold mb-6">Tank Information</h5>
        </b-col>
      </b-row>
      <InputText
        label="Manufacturer"
        v-model="step2.refuellingModulManufacturer"
      />
      <InputText
        label="Tank Capacity"
        description="in Kiloliter (KL) units"
        type="number"
        v-model="step2.capacity"
      />
      <InputText
        label="Flowrate"
        description="in Liters per minute (LPM) units"
        type="number"
        v-model="step2.flowrate"
      />
      <Select
        label="Year of Manufacture"
        type="number"
        v-model="step2.yearOfManufacture"
        :options="years"
        :multiple="false"
        :normalizer="normalizer"
      />
      <Select
        label="Overfill Protection Available"
        v-model="step2.overfillProtectionAvailable"
        :options="yesNo"
        :multiple="false"
        :normalizer="normalizer"
      />
      <Select
        label="Platform Available"
        v-model="step2.platformAvailable"
        :options="yesNo"
        :multiple="false"
        :normalizer="normalizer"
      />
      <InputText label="Meter Register" v-model="step2.meterRegister" />
      <InputText
        label="Filter Vessel Brand"
        v-model="step2.filterVesselBrand"
      />
      <InputText
        label="Original Element Filter"
        v-model="step2.originalElementFilter"
      />
      <InputText
        label="Number of Original Element Filter"
        type="number"
        v-model="step2.numberOfOriginalElementFilter"
      />
    </WizardStep>

    <WizardStep>
      <InputText
        label="Certificate of Operating"
        v-model="step3.certificateOfOperating"
      />
      <InputText label="Asset Number" v-model="step3.assetNumber" />
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
import { yesNo, years, status } from "@/core/datasource/options";

export default {
  props: {
    step2: Object,
    step3: Object,
    route: Object,
    validator: Object
  },
  data: () => ({
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
