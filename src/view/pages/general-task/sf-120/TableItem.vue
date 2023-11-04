<template>
  <b-table-simple responsive="" bordered hover class="text-nowrap">
    <b-thead head-variant="light">
      <b-tr>
        <b-th class="text-center align-middle">ETA</b-th>
        <b-th class="text-center align-middle">ETD</b-th>
        <b-th class="text-center align-middle">Airline IATA</b-th>
        <b-th class="text-center align-middle">Flight Number</b-th>
        <b-th class="text-center align-middle">Refueler</b-th>
        <b-th class="text-center align-middle">CRO</b-th>
        <b-th class="text-center align-middle">Quick Handling</b-th>
        <b-th class="text-center align-middle">Exron</b-th>
        <b-th class="text-center align-middle">Remarks</b-th>
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
          <td>{{ row.refueler == null ? "-" : row.refueler.label }}</td>
          <td>{{ row.cro == null ? "-" : row.cro.label }}</td>
          <td>{{ row.quickHandling ? "Yes" : "No" }}</td>
          <td>{{ row.exron ? "Yes" : "No" }}</td>
          <td>{{ row.remarks || "-" }}</td>
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
