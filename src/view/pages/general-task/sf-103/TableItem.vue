<template>
  <b-table-simple responsive="" bordered hover class="text-nowrap">
    <b-thead head-variant="light">
      <b-tr>
        <b-th rowspan="2" class="text-center align-middle">Record Time</b-th>
        <b-th rowspan="2" class="text-center align-middle">Bridger No</b-th>
        <b-th rowspan="2" class="text-center align-middle">BPP No</b-th>
        <b-th rowspan="2" class="text-center align-middle">Volume</b-th>
        <b-th rowspan="2" class="text-center align-middle">Seal/Segel</b-th>
        <b-th colspan="2" class="text-center align-middle">
          Tank Batch Document
        </b-th>
        <b-th colspan="4" class="text-center align-middle">
          Receiving Document
        </b-th>
        <b-th colspan="4" class="text-center align-middle">Control Check</b-th>
        <b-th rowspan="2" class="text-center align-middle">Appearance</b-th>
        <b-th rowspan="2" class="text-center align-middle">Conductivity</b-th>
        <b-th rowspan="2" class="text-center align-middle">Tank No</b-th>
      </b-tr>
      <b-tr>
        <b-th class="text-center align-middle">Test Report No</b-th>
        <b-th class="text-center align-middle">Density 15°C</b-th>
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
          <td>
            {{ dateTimeFormat(row.recordTime, "HH:mm") }}
          </td>
          <td>{{ row.bridgerNo }}</td>
          <td>{{ row.bppNo }}</td>
          <td class="text-right">
            {{ setVolume(row.volume) }}
          </td>
          <td>{{ row.seal }}</td>
          <td>{{ row.tankBatchDocument.testReportNo }}</td>
          <td class="text-right">
            {{ setDensity(row.tankBatchDocument.densityAt15Celcius) }}
          </td>
          <td>{{ row.receivingDocument.afrnNo }}</td>
          <td class="text-right">
            {{ setDensity(row.receivingDocument.densityObserved) }}
          </td>
          <td class="text-right">
            {{ setTemperature(row.receivingDocument.temperature) }}
          </td>
          <td class="text-right">
            {{ setDensity(row.receivingDocument.densityAt15Celcius) }}
          </td>
          <td class="text-right">
            {{ setDensity(row.controlCheck.densityObserved) }}
          </td>
          <td class="text-right">
            {{ setTemperature(row.controlCheck.temperature) }}
          </td>
          <td class="text-right">
            {{ setDensity(row.controlCheck.densityAt15Celcius) }}
          </td>
          <td class="text-right">
            {{ row.controlCheck.maximumDifferential }}
          </td>
          <td class="text-left">
            <template v-for="(row, index) in row.appearanceIds">
              <span v-bind:key="index">{{ row.label }}<br /></span>
            </template>
          </td>
          <td class="text-right">
            {{ setConductivity(row.conductivity) }}
          </td>
          <td>{{ row.tankNo }}</td>
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
