<template>
  <div>
    <WizardStep>
      <InputText
        label="Product"
        v-model="step2.product"
        :v="validator.step2.product"
      />
      <form-group label="Dimensions">
        <b-row>
          <b-col cols="6">
            <InputText
              label="Diameter"
              description="Diameter (in meter units)"
              type="number"
              :use-horizontal="false"
              :use-label="false"
              v-model="step2.diameter"
            />
          </b-col>
          <b-col cols="6">
            <InputText
              label="Height"
              description="Height (in meter units)"
              type="number"
              :use-horizontal="false"
              :use-label="false"
              v-model="step2.height"
            />
          </b-col>
        </b-row>
      </form-group>
      <InputText label="Roof Construction" v-model="step2.roofConstruction" />
      <InputText label="Type of Tank" v-model="step2.typeOfTank" />
      <form-group label="Pipe Diameter">
        <b-row>
          <b-col cols="6">
            <InputText
              label="Inlet"
              description="Inlet (in inch units)"
              type="number"
              :use-horizontal="false"
              :use-label="false"
              v-model="step2.inlet"
            />
          </b-col>
          <b-col cols="6">
            <InputText
              label="Outlet"
              description="Outlet (in inch units)"
              type="number"
              :use-horizontal="false"
              :use-label="false"
              v-model="step2.outlet"
            />
          </b-col>
        </b-row>
      </form-group>

      <Select
        label="Breather Valve Type"
        v-model="step2.breatherValveType"
        :options="breatherValve"
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
        label="Year of Manufacture"
        type="number"
        v-model="step2.yearOfManufacture"
        :options="years"
        :multiple="false"
        :normalizer="normalizer"
      />
    </WizardStep>

    <WizardStep>
      <b-row>
        <b-col lg="12">
          <h5 class="font-weight-bold mb-6">Capacity</h5>
        </b-col>
        <b-col lg="3">
          <InputText
            label="Maximum Capacity"
            description="in kiloliter (KL) units"
            type="number"
            :use-horizontal="false"
            v-model="step3.maximumCapacity"
          />
        </b-col>
        <b-col lg="3">
          <InputText
            label="Safe Capacity"
            description="in kiloliter (KL) units"
            type="number"
            :use-horizontal="false"
            v-model="step3.safeCapacity"
          />
        </b-col>
        <b-col lg="3">
          <InputText
            label="Dead Stock"
            description="in kiloliter (KL) units"
            type="number"
            :use-horizontal="false"
            v-model="step3.deadStock"
          />
        </b-col>
        <b-col lg="3">
          <InputText
            label="Pumpable Stock"
            description="in kiloliter (KL) units"
            type="number"
            :use-horizontal="false"
            v-model="step3.pumpableStock"
          />
        </b-col>
      </b-row>
      <b-row>
        <b-col lg="12">
          <h5 class="font-weight-bold mb-6">Date Specifications</h5>
        </b-col>
        <b-col lg="3">
          <InputText
            label="Last Epicoat"
            type="date"
            :use-horizontal="false"
            v-model="step3.lastEpicoat"
          />
        </b-col>
        <b-col lg="3">
          <InputText
            label="Last Calibration"
            type="date"
            :use-horizontal="false"
            v-model="step3.lastCalibration"
          />
        </b-col>
        <b-col lg="3">
          <InputText
            label="Last Inspection"
            type="date"
            :use-horizontal="false"
            v-model="step3.lastInspection"
          />
        </b-col>
        <b-col lg="3">
          <InputText
            label="Last Cleaning"
            type="date"
            :use-horizontal="false"
            v-model="step3.lastCleaning"
          />
        </b-col>
      </b-row>
      <b-row>
        <b-col lg="12">
          <h5 class="font-weight-bold mb-6">Refuelling System</h5>
        </b-col>
        <b-col lg="3">
          <Select
            label="Water Pipeline"
            :use-horizontal="false"
            v-model="step3.waterPipeline"
            :options="available"
            :multiple="false"
            :normalizer="normalizer"
          />
        </b-col>
        <b-col lg="3">
          <Select
            label="Water Sprinkle"
            :use-horizontal="false"
            v-model="step3.waterSprinkle"
            :options="available"
            :multiple="false"
            :normalizer="normalizer"
          />
        </b-col>
        <b-col lg="3">
          <Select
            label="Foam Pipeline"
            :use-horizontal="false"
            v-model="step3.foamPipeline"
            :options="available"
            :multiple="false"
            :normalizer="normalizer"
          />
        </b-col>
        <b-col lg="3">
          <Select
            label="Foam Trailer / Mixer"
            :use-horizontal="false"
            v-model="step3.foamTrailerMixer"
            :options="available"
            :multiple="false"
            :normalizer="normalizer"
          />
        </b-col>
      </b-row>
      <b-row>
        <b-col lg="6">
          <InputText
            label="Condition"
            :use-horizontal="false"
            v-model="step3.condition"
            :v="validator.step3.condition"
          />
        </b-col>
        <b-col lg="6">
          <InputText
            label="Remarks"
            :use-horizontal="false"
            v-model="step3.remarks"
          />
        </b-col>
        <b-col lg="6">
          <RadioGroup
            v-if="$route.name != route.form"
            label="Status"
            :use-horizontal="false"
            v-model="step3.actived"
            :options="status"
          />
        </b-col>
      </b-row>
    </WizardStep>
  </div>
</template>

<script>
import {
  yesNo,
  years,
  status,
  available,
  breatherValve
} from "@/core/datasource/options";

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
    available,
    breatherValve,
    normalizer(node) {
      return {
        id: node.value,
        label: node.text
      };
    }
  })
};
</script>
