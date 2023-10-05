<template>
  <div>
    <div
      v-for="(row, idx) in rows"
      v-bind:key="row.id"
      class="card card-custom m-5"
    >
      <div class="card-header py-3">
        <div class="card-title align-items-start flex-column">
          <h3 class="card-label font-weight-bolder text-dark">
            {{ `${idx + 1}. ${row.sourcing.title}` }}
          </h3>
          <span class="text-muted font-weight-bold font-size-sm mt-1">
            {{ row.sourcing.category.label }}
          </span>
        </div>
        <div class="card-toolbar">
          <b-button @click="onRowRemove(idx)" size="sm" variant="outline-danger"
            >Remove</b-button
          >
          <b-button-group class="ml-2">
            <b-button
              @click="onRowSelected(row)"
              size="sm"
              variant="outline-primary"
            >
              Edit
            </b-button>
            <b-button size="sm" variant="primary">View Source</b-button>
          </b-button-group>
        </div>
      </div>
      <b-table-simple small responsive="" bordered>
        <b-thead head-variant="light">
          <b-tr>
            <b-th class="text-center align-middle" rowspan="2">
              Owner Estimate Sourcing
            </b-th>
            <b-th class="text-center align-middle" rowspan="2" width="80px">
              Volume
            </b-th>
            <b-th class="text-center align-middle" rowspan="2" width="180px">
              Unit of Measure
            </b-th>
            <b-th class="text-center align-middle" rowspan="2" width="130px">
              Location Index<br /><small>(INKINDO)</small>
            </b-th>
            <b-th class="text-center" colspan="2">Unit Price</b-th>
            <b-th class="text-center" colspan="2">Total Price</b-th>
          </b-tr>
          <b-tr>
            <b-th class="text-center" width="130px">Material Price</b-th>
            <b-th class="text-center" width="130px">Service Fee</b-th>
            <b-th class="text-center" width="130px">Material Price</b-th>
            <b-th class="text-center" width="130px">Service Fee</b-th>
          </b-tr>
        </b-thead>
        <b-tbody>
          <template v-for="(detail, index) in row.sourcing.details">
            <b-tr
              v-bind:key="`${index}-parent`"
              v-if="
                index == 0 ||
                  (index > 0 &&
                    detail.title != row.sourcing.details[index - 1].title)
              "
            >
              <th colspan="8">{{ detail.title }}</th>
            </b-tr>

            <b-tr v-bind:key="`${index}-child`">
              <td class="align-middle">
                <ul v-if="detail.jobDescriptions.length > 1">
                  <li v-for="job in detail.jobDescriptions" v-bind:key="job">
                    {{ job }}
                  </li>
                </ul>
                <span v-else>{{ detail.jobDescriptions[0] }}</span>
              </td>
              <td class="text-center align-middle">{{ row.volume }}</td>
              <td class="align-middle">{{ detail.uom }}</td>
              <td class="text-center align-middle">
                {{ row.locationIndex }}
              </td>
              <td class="text-right align-middle">
                {{
                  numberFormat(
                    (row.locationIndex / detail.locationIndex) *
                      detail.materialPrice
                  )
                }}
              </td>
              <td class="text-right align-middle">
                {{
                  numberFormat(
                    (row.locationIndex / detail.locationIndex) *
                      detail.serviceFee
                  )
                }}
              </td>
              <td class="text-right align-middle">
                {{
                  numberFormat(
                    row.volume *
                      (row.locationIndex / detail.locationIndex) *
                      detail.materialPrice
                  )
                }}
              </td>
              <td class="text-right align-middle">
                {{
                  numberFormat(
                    row.volume *
                      (row.locationIndex / detail.locationIndex) *
                      detail.serviceFee
                  )
                }}
              </td>
            </b-tr>
          </template>
        </b-tbody>
      </b-table-simple>
    </div>
  </div>
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
