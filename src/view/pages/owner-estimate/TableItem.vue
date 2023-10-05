<template>
  <b-table-simple responsive="" bordered>
    <b-thead head-variant="light">
      <b-tr>
        <b-th class="text-center align-middle">Job Description</b-th>
        <b-th class="text-center align-middle" width="80px"> Volume </b-th>
        <b-th class="text-center align-middle" width="180px">
          Unit of Measure
        </b-th>
        <b-th class="text-center align-middle" width="130px">
          Location Index<br /><small>(INKINDO)</small>
        </b-th>
        <b-th class="text-center align-middle" width="130px"
          >Material Price</b-th
        >
        <b-th class="text-center align-middle" width="130px">Service Fee</b-th>
      </b-tr>
    </b-thead>
    <b-tbody>
      <template v-for="(row, index) in rows">
        <b-tr
          v-bind:key="`${index}-parent`"
          v-if="index == 0 || (index > 0 && row.title != rows[index - 1].title)"
        >
          <th class="align-middle" colspan="8">
            {{ row.title }}
            <div class="float-right">
              <b-button
                @click="onRowSelected(row)"
                size="sm"
                variant="outline-primary"
                >View</b-button
              >
            </div>
          </th>
        </b-tr>

        <b-tr v-bind:key="`${index}-child`">
          <td class="align-middle">
            <ul v-if="row.jobDescriptions.length > 1">
              <li v-for="job in row.jobDescriptions" v-bind:key="job">
                {{ job }}
              </li>
            </ul>
            <span v-else>{{ row.jobDescriptions[0] }}</span>
          </td>
          <td class="text-center align-middle">{{ row.volume }}</td>
          <td class="align-middle">{{ row.uom }}</td>
          <td class="text-center align-middle">
            {{ row.locationIndex }}
          </td>
          <td class="text-right align-middle">
            {{ numberFormat(row.materialPrice) }}
          </td>
          <td class="text-right align-middle">
            {{ numberFormat(row.serviceFee) }}
          </td>
        </b-tr>
      </template>
    </b-tbody>
  </b-table-simple>
</template>

<script>
import { numberFormat } from "@/core/utils";

export default {
  props: {
    rows: Array
  },
  methods: {
    numberFormat,
    onRowRemove(params) {
      this.$emit("onRowRemove", params);
    },
    onRowSelected(params) {
      this.$emit("onRowSelected", params);
    }
  }
};
</script>
