<template>
  <div class="card-body">
    <FormHeader
      :form="form"
      :currentProgress="currentProgress"
      :showRemarks="false"
    />
    <hr class="card-separator" />
    <b-row>
      <b-col lg="4">
        <b-row>
          <b-col lg="12">
            <h5 class="font-weight-bolder mb-6">General Data</h5>
          </b-col>
        </b-row>
        <PlainText label="Record Time" :value="form.time" />
        <PlainText label="Bridger No" :value="form.bridgerNo" />
        <PlainText label="BPP No" :value="form.bppNo" />
        <PlainText label="Volume" :value="setVolume(form.volume)" />
        <PlainText label="Seal / Segel" :value="form.seal" />

        <b-row class="mt-6">
          <b-col lg="12">
            <h5 class="font-weight-bolder mb-6">Tank Batch Document</h5>
          </b-col>
        </b-row>
        <PlainText
          label="Test Report No"
          :value="form.tankBatchDocument.testReportNo"
        />
        <PlainText
          label="Density 15°C"
          :value="setDensity(form.tankBatchDocument.densityAt15Celcius)"
        />
      </b-col>
      <b-col lg="4">
        <b-row>
          <b-col lg="12">
            <h5 class="font-weight-bolder mb-6">Receiving Document</h5>
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
            <h5 class="font-weight-bolder mb-6">Control Check</h5>
          </b-col>
        </b-row>
        <PlainText
          label="Density Observed"
          :value="setDensity(form.controlCheck.densityObserved)"
        />
        <PlainText
          label="Temperature"
          :value="setTemperature(form.controlCheck.temperature)"
        />
        <PlainText
          label="Density 15°C"
          :value="setDensity(form.controlCheck.densityAt15Celcius)"
        />
        <PlainText
          label="DIFF.max 0.003 Kg/L"
          :value="form.controlCheck.maximumDifferential"
        />

        <b-row class="mt-6">
          <b-col lg="12">
            <h5 class="font-weight-bolder mb-6">Product Received</h5>
          </b-col>
        </b-row>
        <PlainText label="Appearance">
          <template #value>
            <span v-if="form.appearanceIds.length == 0">-</span>
            <template v-else v-for="(row, index) in form.appearanceIds">
              <span v-bind:key="index">{{ row.label }}<br /></span>
            </template>
          </template>
        </PlainText>
        <PlainText
          label="Conductivity"
          :value="setConductivity(form.conductivity)"
        />
        <PlainText label="Tank No" :value="form.tankNo" />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import FormHeader from "./FormHeader.vue";

import {
  setVolume,
  setDensity,
  setTemperature,
  setConductivity
} from "@/core/utils";

export default {
  components: { FormHeader },
  props: {
    form: Object,
    currentProgress: Object
  },
  methods: {
    setVolume,
    setDensity,
    setTemperature,
    setConductivity
  }
};
</script>
