<template>
  <b-table-simple small responsive bordered>
    <b-thead head-variant="light">
      <b-tr>
        <b-th class="text-center align-middle" rowspan="2">
          Owner Estimate (Pricelist) Sourcing
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
      <template v-for="(row, idx) in rows">
        <b-tr v-bind:key="`${idx}-main`">
          <th colspan="8" class="p-5">
            <div class="float-left">
              <h3 class="font-weight-bolder text-dark m-0">
                {{ `${idx + 1}. ${row.sourcing.title}` }}
              </h3>
              <small class="text-muted">{{
                row.sourcing.category.label
              }}</small>
            </div>

            <div class="float-right">
              <b-button
                @click="onRowRemove(idx)"
                size="sm"
                variant="outline-danger"
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
                <b-button
                  @click="onViewSource(row.sourcing)"
                  size="sm"
                  variant="primary"
                  >View Source</b-button
                >
              </b-button-group>
            </div>
          </th>
        </b-tr>

        <template v-for="(detail, index) in row.sourcing.details">
          <b-tr
            v-bind:key="`${idx}-${index}-parent`"
            v-if="
              index == 0 ||
                (index > 0 &&
                  detail.title != row.sourcing.details[index - 1].title)
            "
          >
            <th colspan="8">{{ detail.title }}</th>
          </b-tr>

          <b-tr v-bind:key="`${idx}-${index}-child`">
            <td class="align-middle">
              <ol v-if="detail.jobDescriptions.length > 1">
                <li v-for="job in detail.jobDescriptions" v-bind:key="job">
                  {{ job }}
                </li>
              </ol>
              <span v-else>{{ detail.jobDescriptions[0] }}</span>
            </td>
            <td class="text-center align-middle">
              {{ row.volume }}<br />
              <code v-b-tooltip.hover title="Source value">{{
                detail.volume
              }}</code>
            </td>
            <td class="align-middle">{{ detail.uom }}</td>
            <td class="text-center align-middle">
              {{ row.locationIndex }}<br />
              <code v-b-tooltip.hover title="Source value">{{
                detail.locationIndex
              }}</code>
            </td>
            <td class="text-right align-middle">
              {{
                numberFormat(
                  (row.locationIndex / detail.locationIndex) *
                    detail.materialPrice
                )
              }}<br />
              <code v-b-tooltip.hover title="Source value">{{
                numberFormat(detail.materialPrice)
              }}</code>
            </td>
            <td class="text-right align-middle">
              {{
                numberFormat(
                  (row.locationIndex / detail.locationIndex) * detail.serviceFee
                )
              }}<br />
              <code v-b-tooltip.hover title="Source value">{{
                numberFormat(detail.serviceFee)
              }}</code>
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
    onViewSource(params) {
      this.$emit("onViewSource", params);
    },
    onRowRemove(params) {
      this.$emit("onRowRemove", params);
    },
    onRowSelected(params) {
      this.$emit("onRowSelected", params);
    }
  }
};
</script>
