<template>
  <b-table-simple responsive="" bordered hover class="text-nowrap">
    <b-thead head-variant="light">
      <b-tr>
        <b-th rowspan="2" class="text-center align-middle">Record Time</b-th>
        <b-th rowspan="2" class="text-center align-middle">Bridger No</b-th>
        <b-th rowspan="2" class="text-center align-middle">BPP No</b-th>
        <b-th rowspan="2" class="text-center align-middle">Volume</b-th>
        <b-th rowspan="2" class="text-center align-middle">Seal/Segel</b-th>
        <b-th colspan="4" class="text-center align-middle"
          >Receiving Document</b-th
        >
        <b-th colspan="4" class="text-center align-middle">Visual Check</b-th>
        <b-th rowspan="2" class="text-center align-middle">Appearance</b-th>
        <b-th rowspan="2" class="text-center align-middle">Conductivity</b-th>
        <b-th rowspan="2" class="text-center align-middle">Remarks</b-th>
      </b-tr>
      <b-tr>
        <b-th class="text-center align-middle">AFRN No</b-th>
        <b-th class="text-center align-middle">Density Observed</b-th>
        <b-th class="text-center align-middle">Temperature</b-th>
        <b-th class="text-center align-middle">Density 15°C</b-th>
        <b-th class="text-center align-middle">Density Observed</b-th>
        <b-th class="text-center align-middle">Temperature</b-th>
        <b-th class="text-center align-middle">Density 15°C</b-th>
        <b-th class="text-center align-middle">DIFF.max 0.003 kg/l</b-th>
      </b-tr>
    </b-thead>
    <b-tbody>
      <template v-for="(row, index) in rows">
        <b-tr v-bind:key="index" @click="onRowSelected(row)">
          <td class="align-middle">
            {{ dateTimeFormat(row.recordTime, "HH:mm") }}
          </td>
          <td class="align-middle">{{ row.bridgerNo }}</td>
          <td class="align-middle">{{ row.bppNo }}</td>
          <td class="align-middle text-right">
            {{ setVolume(row.volume) }}
          </td>
          <td class="align-middle">{{ row.seal }}</td>
          <td class="align-middle">{{ row.receivingDocument.afrnNo }}</td>
          <td class="align-middle text-right">
            {{ setDensity(row.receivingDocument.densityObserved) }}
          </td>
          <td class="align-middle text-right">
            {{ setTemperature(row.receivingDocument.temperature) }}
          </td>
          <td class="align-middle text-right">
            {{ setDensity(row.receivingDocument.densityAt15Celcius) }}
          </td>
          <td class="align-middle text-right">
            {{ setDensity(row.visualCheck.densityObserved) }}
          </td>
          <td class="align-middle text-right">
            {{ setTemperature(row.visualCheck.temperature) }}
          </td>
          <td class="align-middle text-right">
            {{ setDensity(row.visualCheck.densityAt15Celcius) }}
          </td>
          <td class="align-middle text-right">
            {{ row.visualCheck.maximumDifferential }}
          </td>
          <td class="align-middle">{{ row.appearance.label }}</td>
          <td class="align-middle text-right">
            {{ setConductivity(row.conductivity) }}
          </td>
          <td class="align-middle">{{ row.remarks }}</td>
        </b-tr>
      </template>
    </b-tbody>
  </b-table-simple>
</template>

<script>
import {
  numberFormat,
  dateTimeFormat,
  setVolume,
  setDensity,
  setTemperature,
  setConductivity
} from "@/core/utils";

export default {
  props: {
    rows: Array
  },
  methods: {
    numberFormat,
    dateTimeFormat,
    setVolume,
    setDensity,
    setTemperature,
    setConductivity,
    onRowSelected(params) {
      this.$emit("onRowSelected", params);
    }
  }
};
</script>
