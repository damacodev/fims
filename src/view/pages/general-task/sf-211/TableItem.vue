<template>
  <b-table-simple responsive="" bordered hover class="text-nowrap">
    <b-thead head-variant="light">
      <b-tr>
        <b-th class="text-center align-middle">Location</b-th>
        <b-th class="text-center align-middle">Test Point Number</b-th>
        <b-th class="text-center align-middle">Resistance (Ohm)</b-th>
        <b-th class="text-center align-middle">Weather Condition</b-th>
        <b-th class="text-center align-middle">Eart Condition</b-th>
        <b-th class="text-center align-middle">Remark</b-th>
      </b-tr>
    </b-thead>
    <b-tbody>
      <template v-for="(row, index) in rows">
        <b-tr v-bind:key="index" @click="onRowSelected(row)">
          <td>{{ row.equipment.label }}</td>
          <td>{{ row.testPointNumber }}</td>
          <td>{{ setOhm(row.resistance) }}</td>
          <td>{{ row.weatherCondition }}</td>
          <td>{{ row.eartCondition }}</td>
          <td>{{ row.remark }}</td>
        </b-tr>
      </template>
    </b-tbody>
  </b-table-simple>
</template>

<script>
import { setOhm } from "@/core/utils";

export default {
  props: {
    rows: Array
  },
  methods: {
    setOhm,
    onRowSelected(params) {
      this.$emit("onRowSelected", params);
    }
  }
};
</script>
