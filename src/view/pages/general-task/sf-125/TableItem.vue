<template>
  <b-table-simple responsive="" bordered hover class="text-nowrap">
    <b-thead head-variant="light">
      <b-tr>
        <b-th rowspan="2" class="text-center align-middle">Record Time</b-th>
        <b-th rowspan="2" class="text-center align-middle">MOV</b-th>
        <b-th colspan="4" class="text-center align-middle">Strainer</b-th>
        <b-th colspan="2" class="text-center align-middle">PDG MF (Psi)</b-th>
        <b-th colspan="2" class="text-center align-middle">PDG FS (Psi)</b-th>
        <b-th rowspan="2" class="text-center align-middle"
          >Density Observed</b-th
        >
        <b-th rowspan="2" class="text-center align-middle"
          >Temperature Observed</b-th
        >
        <b-th rowspan="2" class="text-center align-middle">Elcond</b-th>
        <b-th rowspan="2" class="text-center align-middle">Flow Rate</b-th>
        <b-th rowspan="2" class="text-center align-middle"
          >Jumlah Transfer</b-th
        >
        <b-th rowspan="2" class="text-center align-middle">Visual Check</b-th>
        <b-th rowspan="2" class="text-center align-middle">Remarks</b-th>
      </b-tr>
      <b-tr>
        <b-th class="text-center align-middle">S 101-A</b-th>
        <b-th class="text-center align-middle">S 101-B</b-th>
        <b-th class="text-center align-middle">S 101-C</b-th>
        <b-th class="text-center align-middle">S 101-D</b-th>
        <b-th class="text-center align-middle">S 102-A</b-th>
        <b-th class="text-center align-middle">S 102-B</b-th>
        <b-th class="text-center align-middle">S 103-A</b-th>
        <b-th class="text-center align-middle">S 103-B</b-th>
      </b-tr>
    </b-thead>
    <b-tbody>
      <template v-for="(row, index) in rows">
        <b-tr v-bind:key="index" @click="onRowSelected(row)">
          <td>
            {{ dateTimeFormat(row.recordTime, "HH:mm") }}
          </td>
          <td>{{ row.equipment.label }}</td>
          <td>{{ row.strainer.s101A == null ? "-" : row.strainer.s101A }}</td>
          <td>{{ row.strainer.s101B == null ? "-" : row.strainer.s101B }}</td>
          <td>{{ row.strainer.s101C == null ? "-" : row.strainer.s101C }}</td>
          <td>{{ row.strainer.s101D == null ? "-" : row.strainer.s101D }}</td>
          <td class="text-right">
            {{ row.microFilter == null ? "-" : setPsi(row.microFilter.s102A) }}
          </td>
          <td class="text-right">
            {{ row.microFilter == null ? "-" : setPsi(row.microFilter.s102B) }}
          </td>
          <td class="text-right">
            {{
              row.filterSeparator == null
                ? "-"
                : setPsi(row.filterSeparator.s103A)
            }}
          </td>
          <td class="text-right">
            {{
              row.filterSeparator == null
                ? "-"
                : setPsi(row.filterSeparator.s103B)
            }}
          </td>
          <td class="text-right">{{ setDensity(row.densityObserved) }}</td>
          <td class="text-right">
            {{ setTemperature(row.temperatureObserved) }}
          </td>
          <td class="text-right">{{ setConductivity(row.elcond) }}</td>
          <td class="text-right">{{ setFlowRate(row.flowRate) }}</td>
          <td class="text-right">{{ setVolume(row.jumlahTransfer, "KL") }}</td>
          <td class="text-left">
            <template v-for="(row, index) in row.visualCheckIds">
              <span v-bind:key="index"
                >{{ `${row.value} - ${row.label}` }}<br
              /></span>
            </template>
          </td>
          <td>{{ row.remarks }}</td>
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
  setConductivity,
  setPsi,
  setFlowRate
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
    setPsi,
    setFlowRate,
    onRowSelected(params) {
      this.$emit("onRowSelected", params);
    }
  }
};
</script>
