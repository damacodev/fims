<template>
  <div>
    <WizardStep>
      <b-row>
        <b-col cols="4">
          <InputText
            label="Product"
            v-model="step2.product"
            :v="validator.step2.product"
            :use-horizontal="false"
          />
        </b-col>
        <b-col cols="4">
          <InputText
            label="Pos Location"
            v-model="step2.posLocation"
            :use-horizontal="false"
          />
        </b-col>
      </b-row>

      <b-row>
        <b-col cols="12">
          <h5 class="font-weight-bold mb-6">Pump</h5>
        </b-col>
        <b-col cols="4">
          <InputText
            label="Serial Number"
            v-model="step2.pumpSerialNumber"
            :use-horizontal="false"
          />
        </b-col>
        <b-col cols="4">
          <InputText
            label="Brand"
            v-model="step2.pumpBrand"
            :use-horizontal="false"
          />
        </b-col>
        <b-col cols="4">
          <InputText
            label="Type"
            v-model="step2.pumpType"
            :use-horizontal="false"
          />
        </b-col>
        <b-col cols="4">
          <InputText
            label="Capacity"
            description="in (m3/hr)/LPM units"
            v-model="step2.pumpCapacity"
            :use-horizontal="false"
          />
        </b-col>
        <b-col cols="4">
          <InputText
            label="Total Head"
            description="in meter units"
            v-model="step2.pumpTotalHead"
            :use-horizontal="false"
          />
        </b-col>
      </b-row>

      <b-row>
        <b-col cols="12">
          <h5 class="font-weight-bold mb-6">Motor</h5>
        </b-col>
        <b-col cols="4">
          <InputText
            label="Type"
            v-model="step2.motorType"
            :use-horizontal="false"
          />
        </b-col>
        <b-col cols="4">
          <InputText
            label="Brand"
            v-model="step2.motorBrand"
            :use-horizontal="false"
          />
        </b-col>
        <b-col cols="4">
          <InputText
            label="Serial Number"
            v-model="step2.motorSerialNumber"
            :use-horizontal="false"
          />
        </b-col>
      </b-row>
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
import { status } from "@/core/datasource/options";

export default {
  props: {
    step2: Object,
    step3: Object,
    route: Object,
    validator: Object
  },
  data: () => ({
    status
  })
};
</script>
