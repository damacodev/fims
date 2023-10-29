<template>
  <div class="card-body">
    <FormHeader
      :form="form"
      :currentProgress="currentProgress"
      :showRemarks="false"
    />
    <hr />
    <b-row>
      <!-- <b-col lg="12">
        <pre>{{ currentProgress }}</pre>
        <pre>{{ form }}</pre>
      </b-col> -->
      <b-col lg="4">
        <b-row>
          <b-col lg="12">
            <h5 class="font-weight-bolder mb-6">General Data</h5>
          </b-col>
        </b-row>
        <PlainText label="Record Time" :value="form.time" />
        <PlainText label="Equipment" :value="form.equipment.label" />

        <b-row class="mt-6">
          <b-col lg="12">
            <h5 class="font-weight-bolder mb-6">Strainer</h5>
          </b-col>
        </b-row>
        <PlainText label="S 101-A" :value="form.strainer.s101A" />
        <PlainText label="S 101-B" :value="form.strainer.s101B" />
        <PlainText label="S 101-C" :value="form.strainer.s101C" />
        <PlainText label="S 101-D" :value="form.strainer.s101D" />
      </b-col>
      <b-col lg="4">
        <b-row>
          <b-col lg="12">
            <h5 class="font-weight-bolder mb-6">Micro Fiber</h5>
          </b-col>
        </b-row>
        <PlainText label="S 102-A" :value="setPsi(form.microFiber.s102A)" />
        <PlainText label="S 102-B" :value="setPsi(form.microFiber.s102B)" />

        <b-row class="mt-6">
          <b-col lg="12">
            <h5 class="font-weight-bolder mb-6">Filter Separator</h5>
          </b-col>
        </b-row>
        <PlainText
          label="S 103-A"
          :value="setPsi(form.filterSeparator.s103A)"
        />
        <PlainText
          label="S 103-B"
          :value="setPsi(form.filterSeparator.s103B)"
        />
      </b-col>
      <b-col lg="4">
        <PlainText
          label="Density Observed"
          :value="setDensity(form.densityObserved)"
        />
        <PlainText
          label="Temperature Observed"
          :value="setTemperature(form.temperatureObserved)"
        />
        <PlainText label="Elcond" :value="setConductivity(form.elcond)" />
        <PlainText label="Flow Rate" :value="setFlowRate(form.flowRate)" />
        <PlainText
          label="Jumlah Transfer"
          :value="setVolume(form.jumlahTransfer, 'KL')"
        />
        <PlainText label="Visual Check">
          <template #value>
            <span v-if="form.visualCheckIds.length == 0">-</span>
            <template v-else v-for="(row, index) in form.visualCheckIds">
              <span v-bind:key="index">{{ row.label }}<br /></span>
            </template>
          </template>
        </PlainText>
        <PlainText label="Remarks" :value="form.remarks" />
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
  setConductivity,
  setPsi,
  setFlowRate
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
    setConductivity,
    setPsi,
    setFlowRate
  }
};
</script>
