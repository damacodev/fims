<template>
  <b-table-simple small responsive bordered>
    <b-thead head-variant="light">
      <b-th class="text-center">No</b-th>
      <b-th class="text-center">Checks</b-th>
      <b-th class="text-center">S/C</b-th>
      <b-th class="text-center">Remarks</b-th>
    </b-thead>
    <b-tbody>
      <template v-for="(row, idx) in rows">
        <b-tr v-if="row.seq == 0" v-bind:key="`${idx}-main`">
          <td v-if="row.step == 1" colspan="4" class="font-weight-bolder">
            Cleanliness
          </td>
          <td v-if="row.step == 2" colspan="4" class="font-weight-bolder">
            Truck Conditions
          </td>
          <td v-if="row.step == 3" colspan="4" class="font-weight-bolder">
            Tank Conditions
          </td>
          <td v-if="row.step == 4" colspan="4" class="font-weight-bolder">
            Safety Equipments
          </td>
          <td v-if="row.step == 5" colspan="4" class="font-weight-bolder">
            Refueling Equipments (Before)
          </td>
          <td v-if="row.step == 6" colspan="4" class="font-weight-bolder">
            Refueling Equipments (During)
          </td>
          <td v-if="row.step == 7" colspan="4" class="font-weight-bolder">
            Others
          </td>
        </b-tr>
        <b-tr
          v-bind:key="`${idx}`"
          :variant="row.notes == 'Not Available' ? 'danger' : null"
        >
          <td class="text-center">
            {{ row.seq + 1 }}
          </td>
          <td>
            {{ row.checks }}
          </td>
          <td>
            {{ row.notes }}
          </td>
          <td>
            <template v-if="row.remarks != null">
              {{ row.remarks }} <br />
            </template>
            <span v-if="row.step == 4 && [5, 6].includes(row.seq)">
              {{ dateFormat(row.date) }}
            </span>
            <span v-else-if="row.step == 5 && [10].includes(row.seq)">
              {{ row.psi }} PSI (40-70 PSI)
            </span>
            <span v-else-if="row.step == 6 && [0, 1, 2].includes(row.seq)">
              {{ row.kg }} Kg/Cm2 or PSI
            </span>
            <span v-else-if="row.step == 6 && [3].includes(row.seq)">
              {{ `${row.psi} PSI, Flowrate ${row.flowRate} LPM` }}
            </span>
          </td>
        </b-tr>
      </template>
    </b-tbody>
  </b-table-simple>
  <!-- <b-table
    hover
    selectable
    responsive
    striped
    select-mode="single"
    head-variant="light"
    :fields="columns"
    :items="rows"
  >
    <template #cell(no)="data">
      {{ `${data.item.step} ${data.item.seq}` }}
    </template>
  </b-table> -->
</template>

<script>
import { checklistDetail as columns } from "@/core/datasource/columns";
import { dateFormat, numberFormat } from "@/core/utils";

export default {
  props: {
    rows: Array
  },
  data: () => ({
    columns
  }),
  methods: {
    dateFormat,
    numberFormat
  }
};
</script>
