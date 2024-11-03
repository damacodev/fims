<template>
  <b-table-simple responsive="" bordered hover class="text-nowrap">
    <b-thead head-variant="light">
      <b-tr>
        <b-th class="text-center" colspan="6">Program</b-th>
        <b-th class="text-center" colspan="4">Realization</b-th>
      </b-tr>
      <b-tr>
        <b-th class="text-center align-middle">ETA</b-th>
        <b-th class="text-center align-middle">ETD</b-th>
        <b-th class="text-center align-middle">Airline IATA</b-th>
        <b-th class="text-center align-middle">Flight Number</b-th>
        <b-th class="text-center align-middle">Aircraft Type</b-th>
        <b-th class="text-center align-middle">Remarks</b-th>
        <b-th class="text-center align-middle">Refueling Time</b-th>
        <b-th class="text-center align-middle">CRO</b-th>
        <b-th class="text-center align-middle">Quick Handling</b-th>
        <b-th class="text-center align-middle">Exron</b-th>
      </b-tr>
    </b-thead>
    <b-tbody>
      <template v-for="(row, index) in rows">
        <b-tr v-bind:key="index" @click="onRowSelected(row)">
          <td>
            {{ dateTimeFormat(row.eta, "HH:mm") }}
          </td>
          <td>
            {{ dateTimeFormat(row.etd, "HH:mm") }}
          </td>
          <td>{{ row.airlineIata }}</td>
          <td>{{ row.flightNumber }}</td>
          <td>{{ row.aircraftType }}</td>
          <td>{{ row.remarks == null ? "-" : row.remarks.label }}</td>
          <td>
            {{ dateTimeFormat(row.refuelingTime, "HH:mm") }}
          </td>
          <td>{{ row.cro == null ? "-" : row.cro.label }}</td>
          <td>{{ row.quickHandling ? "Yes" : "No" }}</td>
          <td>{{ row.exron ? "Yes" : "No" }}</td>
        </b-tr>
      </template>
    </b-tbody>
  </b-table-simple>
</template>

<script>
import { dateTimeFormat } from "@/core/utils";

export default {
  props: {
    rows: Array
  },
  methods: {
    dateTimeFormat,
    onRowSelected(params) {
      this.$emit("onRowSelected", params);
    }
  }
};
</script>
