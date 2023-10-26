<template>
  <b-table-simple responsive="" bordered hover class="text-nowrap">
    <b-thead head-variant="light">
      <b-tr>
        <b-th class="text-center align-middle" rowspan="3">Equipment</b-th>
        <b-th class="text-center align-middle" colspan="16">Every Day</b-th>
        <b-th class="text-center align-middle" colspan="8">After Wash</b-th>
        <b-th class="text-center align-middle" colspan="8">
          After Heavy Rain
        </b-th>
        <b-th class="text-center align-middle" rowspan="3">
          After Toping Up
        </b-th>
      </b-tr>
      <b-tr>
        <b-th class="text-center align-middle" colspan="4">
          Product Tank Drain
        </b-th>
        <b-th class="text-center align-middle" colspan="4">Before Filter</b-th>
        <b-th class="text-center align-middle" colspan="4">After Filter</b-th>
        <b-th class="text-center align-middle" colspan="4">
          Recovery Tank Drain
        </b-th>

        <b-th class="text-center align-middle" colspan="4">
          Product Tank Drain
        </b-th>
        <b-th class="text-center align-middle" colspan="4">
          Recovery Tank Drain
        </b-th>

        <b-th class="text-center align-middle" colspan="4">
          Product Tank Drain
        </b-th>
        <b-th class="text-center align-middle" colspan="4">
          Recovery Tank Drain
        </b-th>
      </b-tr>
      <b-tr>
        <b-th class="text-center align-middle">Colour</b-th>
        <b-th class="text-center align-middle">Cleanlines</b-th>
        <b-th class="text-center align-middle">Free Water</b-th>
        <b-th class="text-center align-middle">CWD</b-th>

        <b-th class="text-center align-middle">Colour</b-th>
        <b-th class="text-center align-middle">Cleanlines</b-th>
        <b-th class="text-center align-middle">Free Water</b-th>
        <b-th class="text-center align-middle">CWD</b-th>

        <b-th class="text-center align-middle">Colour</b-th>
        <b-th class="text-center align-middle">Cleanlines</b-th>
        <b-th class="text-center align-middle">Free Water</b-th>
        <b-th class="text-center align-middle">CWD</b-th>

        <b-th class="text-center align-middle">Colour</b-th>
        <b-th class="text-center align-middle">Cleanlines</b-th>
        <b-th class="text-center align-middle">Free Water</b-th>
        <b-th class="text-center align-middle">CWD</b-th>

        <b-th class="text-center align-middle">Colour</b-th>
        <b-th class="text-center align-middle">Cleanlines</b-th>
        <b-th class="text-center align-middle">Free Water</b-th>
        <b-th class="text-center align-middle">CWD</b-th>

        <b-th class="text-center align-middle">Colour</b-th>
        <b-th class="text-center align-middle">Cleanlines</b-th>
        <b-th class="text-center align-middle">Free Water</b-th>
        <b-th class="text-center align-middle">CWD</b-th>

        <b-th class="text-center align-middle">Colour</b-th>
        <b-th class="text-center align-middle">Cleanlines</b-th>
        <b-th class="text-center align-middle">Free Water</b-th>
        <b-th class="text-center align-middle">CWD</b-th>

        <b-th class="text-center align-middle">Colour</b-th>
        <b-th class="text-center align-middle">Cleanlines</b-th>
        <b-th class="text-center align-middle">Free Water</b-th>
        <b-th class="text-center align-middle">CWD</b-th>
      </b-tr>
    </b-thead>
    <b-tbody>
      <template v-for="(row, index) in rows">
        <b-tr v-bind:key="index" @click="onRowSelected(row)">
          <td>{{ row.equipment.label }}</td>

          <!-- START EVERYDAY -->
          <td class="text-left">
            <span v-if="row.everyDay.productTankDrain == null">-</span>
            <template
              v-else
              v-for="(row, index) in row.everyDay.productTankDrain.colourIds"
            >
              <span v-bind:key="index">{{ row.label }}<br /></span>
            </template>
          </td>
          <td class="text-left">
            <span v-if="row.everyDay.productTankDrain == null">-</span>
            <template
              v-else
              v-for="(row, index) in row.everyDay.productTankDrain
                .cleanlinesIds"
            >
              <span v-bind:key="index">{{ row.label }}<br /></span>
            </template>
          </td>
          <td class="text-left">
            <span v-if="row.everyDay.productTankDrain == null">-</span>
            <template
              v-else
              v-for="(row, index) in row.everyDay.productTankDrain.freeWaterIds"
            >
              <span v-bind:key="index">{{ row.label }}<br /></span>
            </template>
          </td>
          <td class="text-left">
            <span v-if="row.everyDay.productTankDrain == null">-</span>
            <template
              v-else
              v-for="(row, index) in row.everyDay.productTankDrain
                .waterDetectorIds"
            >
              <span v-bind:key="index">{{ row.label }}<br /></span>
            </template>
          </td>

          <td class="text-left">
            <span v-if="row.everyDay.beforeFilter == null">-</span>
            <template
              v-else
              v-for="(row, index) in row.everyDay.beforeFilter.colourIds"
            >
              <span v-bind:key="index">{{ row.label }}<br /></span>
            </template>
          </td>
          <td class="text-left">
            <span v-if="row.everyDay.beforeFilter == null">-</span>
            <template
              v-else
              v-for="(row, index) in row.everyDay.beforeFilter.cleanlinesIds"
            >
              <span v-bind:key="index">{{ row.label }}<br /></span>
            </template>
          </td>
          <td class="text-left">
            <span v-if="row.everyDay.beforeFilter == null">-</span>
            <template
              v-else
              v-for="(row, index) in row.everyDay.beforeFilter.freeWaterIds"
            >
              <span v-bind:key="index">{{ row.label }}<br /></span>
            </template>
          </td>
          <td class="text-left">
            <span v-if="row.everyDay.beforeFilter == null">-</span>
            <template
              v-else
              v-for="(row, index) in row.everyDay.beforeFilter.waterDetectorIds"
            >
              <span v-bind:key="index">{{ row.label }}<br /></span>
            </template>
          </td>

          <td class="text-left">
            <span v-if="row.everyDay.afterFilter == null">-</span>
            <template
              v-else
              v-for="(row, index) in row.everyDay.afterFilter.colourIds"
            >
              <span v-bind:key="index">{{ row.label }}<br /></span>
            </template>
          </td>
          <td class="text-left">
            <span v-if="row.everyDay.afterFilter == null">-</span>
            <template
              v-else
              v-for="(row, index) in row.everyDay.afterFilter.cleanlinesIds"
            >
              <span v-bind:key="index">{{ row.label }}<br /></span>
            </template>
          </td>
          <td class="text-left">
            <span v-if="row.everyDay.afterFilter == null">-</span>
            <template
              v-else
              v-for="(row, index) in row.everyDay.afterFilter.freeWaterIds"
            >
              <span v-bind:key="index">{{ row.label }}<br /></span>
            </template>
          </td>
          <td class="text-left">
            <span v-if="row.everyDay.afterFilter == null">-</span>
            <template
              v-else
              v-for="(row, index) in row.everyDay.afterFilter.waterDetectorIds"
            >
              <span v-bind:key="index">{{ row.label }}<br /></span>
            </template>
          </td>

          <td class="text-left">
            <span v-if="row.everyDay.recoveryTankDrain == null">-</span>
            <template
              v-else
              v-for="(row, index) in row.everyDay.recoveryTankDrain.colourIds"
            >
              <span v-bind:key="index">{{ row.label }}<br /></span>
            </template>
          </td>
          <td class="text-left">
            <span v-if="row.everyDay.recoveryTankDrain == null">-</span>
            <template
              v-else
              v-for="(row, index) in row.everyDay.recoveryTankDrain
                .cleanlinesIds"
            >
              <span v-bind:key="index">{{ row.label }}<br /></span>
            </template>
          </td>
          <td class="text-left">
            <span v-if="row.everyDay.recoveryTankDrain == null">-</span>
            <template
              v-else
              v-for="(row, index) in row.everyDay.recoveryTankDrain
                .freeWaterIds"
            >
              <span v-bind:key="index">{{ row.label }}<br /></span>
            </template>
          </td>
          <td class="text-left">
            <span v-if="row.everyDay.recoveryTankDrain == null">-</span>
            <template
              v-else
              v-for="(row, index) in row.everyDay.recoveryTankDrain
                .waterDetectorIds"
            >
              <span v-bind:key="index">{{ row.label }}<br /></span>
            </template>
          </td>
          <!-- END EVERYDAY -->

          <!-- START AFTER WASH -->
          <td class="text-left">
            <span v-if="row.afterWash.productTankDrain == null">-</span>
            <template
              v-else
              v-for="(row, index) in row.afterWash.productTankDrain.colourIds"
            >
              <span v-bind:key="index">{{ row.label }}<br /></span>
            </template>
          </td>
          <td class="text-left">
            <span v-if="row.afterWash.productTankDrain == null">-</span>
            <template
              v-else
              v-for="(row, index) in row.afterWash.productTankDrain
                .cleanlinesIds"
            >
              <span v-bind:key="index">{{ row.label }}<br /></span>
            </template>
          </td>
          <td class="text-left">
            <span v-if="row.afterWash.productTankDrain == null">-</span>
            <template
              v-else
              v-for="(row, index) in row.afterWash.productTankDrain
                .freeWaterIds"
            >
              <span v-bind:key="index">{{ row.label }}<br /></span>
            </template>
          </td>
          <td class="text-left">
            <span v-if="row.afterWash.productTankDrain == null">-</span>
            <template
              v-else
              v-for="(row, index) in row.afterWash.productTankDrain
                .waterDetectorIds"
            >
              <span v-bind:key="index">{{ row.label }}<br /></span>
            </template>
          </td>

          <td class="text-left">
            <span v-if="row.afterWash.recoveryTankDrain == null">-</span>
            <template
              v-else
              v-for="(row, index) in row.afterWash.recoveryTankDrain.colourIds"
            >
              <span v-bind:key="index">{{ row.label }}<br /></span>
            </template>
          </td>
          <td class="text-left">
            <span v-if="row.afterWash.recoveryTankDrain == null">-</span>
            <template
              v-else
              v-for="(row, index) in row.afterWash.recoveryTankDrain
                .cleanlinesIds"
            >
              <span v-bind:key="index">{{ row.label }}<br /></span>
            </template>
          </td>
          <td class="text-left">
            <span v-if="row.afterWash.recoveryTankDrain == null">-</span>
            <template
              v-else
              v-for="(row, index) in row.afterWash.recoveryTankDrain
                .freeWaterIds"
            >
              <span v-bind:key="index">{{ row.label }}<br /></span>
            </template>
          </td>
          <td class="text-left">
            <span v-if="row.afterWash.recoveryTankDrain == null">-</span>
            <template
              v-else
              v-for="(row, index) in row.afterWash.recoveryTankDrain
                .waterDetectorIds"
            >
              <span v-bind:key="index">{{ row.label }}<br /></span>
            </template>
          </td>
          <!-- END AFTER WASH -->

          <!-- START AFTER HEAVY RAIN -->
          <td class="text-left">
            <span v-if="row.afterHeavyRain.productTankDrain == null">-</span>
            <template
              v-else
              v-for="(row, index) in row.afterHeavyRain.productTankDrain
                .colourIds"
            >
              <span v-bind:key="index">{{ row.label }}<br /></span>
            </template>
          </td>
          <td class="text-left">
            <span v-if="row.afterHeavyRain.productTankDrain == null">-</span>
            <template
              v-else
              v-for="(row, index) in row.afterHeavyRain.productTankDrain
                .cleanlinesIds"
            >
              <span v-bind:key="index">{{ row.label }}<br /></span>
            </template>
          </td>
          <td class="text-left">
            <span v-if="row.afterHeavyRain.productTankDrain == null">-</span>
            <template
              v-else
              v-for="(row, index) in row.afterHeavyRain.productTankDrain
                .freeWaterIds"
            >
              <span v-bind:key="index">{{ row.label }}<br /></span>
            </template>
          </td>
          <td class="text-left">
            <span v-if="row.afterHeavyRain.productTankDrain == null">-</span>
            <template
              v-else
              v-for="(row, index) in row.afterHeavyRain.productTankDrain
                .waterDetectorIds"
            >
              <span v-bind:key="index">{{ row.label }}<br /></span>
            </template>
          </td>

          <td class="text-left">
            <span v-if="row.afterHeavyRain.recoveryTankDrain == null">-</span>
            <template
              v-else
              v-for="(row, index) in row.afterHeavyRain.recoveryTankDrain
                .colourIds"
            >
              <span v-bind:key="index">{{ row.label }}<br /></span>
            </template>
          </td>
          <td class="text-left">
            <span v-if="row.afterHeavyRain.recoveryTankDrain == null">-</span>
            <template
              v-else
              v-for="(row, index) in row.afterHeavyRain.recoveryTankDrain
                .cleanlinesIds"
            >
              <span v-bind:key="index">{{ row.label }}<br /></span>
            </template>
          </td>
          <td class="text-left">
            <span v-if="row.afterHeavyRain.recoveryTankDrain == null">-</span>
            <template
              v-else
              v-for="(row, index) in row.afterHeavyRain.recoveryTankDrain
                .freeWaterIds"
            >
              <span v-bind:key="index">{{ row.label }}<br /></span>
            </template>
          </td>
          <td class="text-left">
            <span v-if="row.afterHeavyRain.recoveryTankDrain == null">-</span>
            <template
              v-else
              v-for="(row, index) in row.afterHeavyRain.recoveryTankDrain
                .waterDetectorIds"
            >
              <span v-bind:key="index">{{ row.label }}<br /></span>
            </template>
          </td>
          <!-- END AFTER HEAVY RAIN -->

          <td>
            <span>{{ row.afterTopingUp.length }} Records</span>
          </td>
        </b-tr>
      </template>
    </b-tbody>
  </b-table-simple>
</template>

<script>
export default {
  props: {
    transactionDate: String,
    rows: Array,
    buttonVisibility: Boolean
  },
  methods: {
    onRowSelected(params) {
      this.$emit("onRowSelected", params);
    },
    setValue(params) {
      if (params.length == 0) {
        return `<span>-</span>`;
      } else {
        return params.map(x => `<span>${x.label}</span>`);
      }
    }
  }
};
</script>
