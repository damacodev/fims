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
          <td class="align-middle">{{ row.equipment.label }}</td>

          <!-- START EVERYDAY -->
          <td class="align-middle">
            <span>{{
              row.everyDay.productTankDrain == null ||
              row.everyDay.productTankDrain.colour == null
                ? "-"
                : row.everyDay.productTankDrain.colour.label
            }}</span>
          </td>
          <td class="align-middle">
            <span>{{
              row.everyDay.productTankDrain == null ||
              row.everyDay.productTankDrain.cleanlines == null
                ? "-"
                : row.everyDay.productTankDrain.cleanlines.label
            }}</span>
          </td>
          <td class="align-middle">
            <span>{{
              row.everyDay.productTankDrain == null ||
              row.everyDay.productTankDrain.freeWater == null
                ? "-"
                : row.everyDay.productTankDrain.freeWater.label
            }}</span>
          </td>
          <td class="align-middle">
            <span>{{
              row.everyDay.productTankDrain == null ||
              row.everyDay.productTankDrain.waterDetector == null
                ? "-"
                : row.everyDay.productTankDrain.waterDetector.label
            }}</span>
          </td>
          <td class="align-middle">
            <span>{{
              row.everyDay.beforeFilter == null ||
              row.everyDay.beforeFilter.colour == null
                ? "-"
                : row.everyDay.beforeFilter.colour.label
            }}</span>
          </td>
          <td class="align-middle">
            <span>{{
              row.everyDay.beforeFilter == null ||
              row.everyDay.beforeFilter.cleanlines == null
                ? "-"
                : row.everyDay.beforeFilter.cleanlines.label
            }}</span>
          </td>
          <td class="align-middle">
            <span>{{
              row.everyDay.beforeFilter == null ||
              row.everyDay.beforeFilter.freeWater == null
                ? "-"
                : row.everyDay.beforeFilter.freeWater.label
            }}</span>
          </td>
          <td class="align-middle">
            <span>{{
              row.everyDay.beforeFilter == null ||
              row.everyDay.beforeFilter.waterDetector == null
                ? "-"
                : row.everyDay.beforeFilter.waterDetector.label
            }}</span>
          </td>
          <td class="align-middle">
            <span>{{
              row.everyDay.afterFilter == null ||
              row.everyDay.afterFilter.colour == null
                ? "-"
                : row.everyDay.afterFilter.colour.label
            }}</span>
          </td>
          <td class="align-middle">
            <span>{{
              row.everyDay.afterFilter == null ||
              row.everyDay.afterFilter.cleanlines == null
                ? "-"
                : row.everyDay.afterFilter.cleanlines.label
            }}</span>
          </td>
          <td class="align-middle">
            <span>{{
              row.everyDay.afterFilter == null ||
              row.everyDay.afterFilter.freeWater == null
                ? "-"
                : row.everyDay.afterFilter.freeWater.label
            }}</span>
          </td>
          <td class="align-middle">
            <span>{{
              row.everyDay.afterFilter == null ||
              row.everyDay.afterFilter.waterDetector == null
                ? "-"
                : row.everyDay.afterFilter.waterDetector.label
            }}</span>
          </td>
          <td class="align-middle">
            <span>{{
              row.everyDay.recoveryTankDrain == null ||
              row.everyDay.recoveryTankDrain.colour == null
                ? "-"
                : row.everyDay.recoveryTankDrain.colour.label
            }}</span>
          </td>
          <td class="align-middle">
            <span>{{
              row.everyDay.recoveryTankDrain == null ||
              row.everyDay.recoveryTankDrain.cleanlines == null
                ? "-"
                : row.everyDay.recoveryTankDrain.cleanlines.label
            }}</span>
          </td>
          <td class="align-middle">
            <span>{{
              row.everyDay.recoveryTankDrain == null ||
              row.everyDay.recoveryTankDrain.freeWater == null
                ? "-"
                : row.everyDay.recoveryTankDrain.freeWater.label
            }}</span>
          </td>
          <td class="align-middle">
            <span>{{
              row.everyDay.recoveryTankDrain == null ||
              row.everyDay.recoveryTankDrain.waterDetector == null
                ? "-"
                : row.everyDay.recoveryTankDrain.waterDetector.label
            }}</span>
          </td>
          <!-- END EVERYDAY -->

          <!-- START AFTER WASH -->
          <td class="align-middle">
            <span>{{
              row.afterWash.productTankDrain == null ||
              row.afterWash.productTankDrain.colour == null
                ? "-"
                : row.afterWash.productTankDrain.colour.label
            }}</span>
          </td>
          <td class="align-middle">
            <span>{{
              row.afterWash.productTankDrain == null ||
              row.afterWash.productTankDrain.cleanlines == null
                ? "-"
                : row.afterWash.productTankDrain.cleanlines.label
            }}</span>
          </td>
          <td class="align-middle">
            <span>{{
              row.afterWash.productTankDrain == null ||
              row.afterWash.productTankDrain.freeWater == null
                ? "-"
                : row.afterWash.productTankDrain.freeWater.label
            }}</span>
          </td>
          <td class="align-middle">
            <span>{{
              row.afterWash.productTankDrain == null ||
              row.afterWash.productTankDrain.waterDetector == null
                ? "-"
                : row.afterWash.productTankDrain.waterDetector.label
            }}</span>
          </td>
          <td class="align-middle">
            <span>{{
              row.afterWash.recoveryTankDrain == null ||
              row.afterWash.recoveryTankDrain.colour == null
                ? "-"
                : row.afterWash.recoveryTankDrain.colour.label
            }}</span>
          </td>
          <td class="align-middle">
            <span>{{
              row.afterWash.recoveryTankDrain == null ||
              row.afterWash.recoveryTankDrain.cleanlines == null
                ? "-"
                : row.afterWash.recoveryTankDrain.cleanlines.label
            }}</span>
          </td>
          <td class="align-middle">
            <span>{{
              row.afterWash.recoveryTankDrain == null ||
              row.afterWash.recoveryTankDrain.freeWater == null
                ? "-"
                : row.afterWash.recoveryTankDrain.freeWater.label
            }}</span>
          </td>
          <td class="align-middle">
            <span>{{
              row.afterWash.recoveryTankDrain == null ||
              row.afterWash.recoveryTankDrain.waterDetector == null
                ? "-"
                : row.afterWash.recoveryTankDrain.waterDetector.label
            }}</span>
          </td>
          <!-- END AFTER WASH -->

          <!-- START AFTER WASH -->
          <td class="align-middle">
            <span>{{
              row.afterHeavyRain.productTankDrain == null ||
              row.afterHeavyRain.productTankDrain.colour == null
                ? "-"
                : row.afterHeavyRain.productTankDrain.colour.label
            }}</span>
          </td>
          <td class="align-middle">
            <span>{{
              row.afterHeavyRain.productTankDrain == null ||
              row.afterHeavyRain.productTankDrain.cleanlines == null
                ? "-"
                : row.afterHeavyRain.productTankDrain.cleanlines.label
            }}</span>
          </td>
          <td class="align-middle">
            <span>{{
              row.afterHeavyRain.productTankDrain == null ||
              row.afterHeavyRain.productTankDrain.freeWater == null
                ? "-"
                : row.afterHeavyRain.productTankDrain.freeWater.label
            }}</span>
          </td>
          <td class="align-middle">
            <span>{{
              row.afterHeavyRain.productTankDrain == null ||
              row.afterHeavyRain.productTankDrain.waterDetector == null
                ? "-"
                : row.afterHeavyRain.productTankDrain.waterDetector.label
            }}</span>
          </td>
          <td class="align-middle">
            <span>{{
              row.afterHeavyRain.recoveryTankDrain == null ||
              row.afterHeavyRain.recoveryTankDrain.colour == null
                ? "-"
                : row.afterHeavyRain.recoveryTankDrain.colour.label
            }}</span>
          </td>
          <td class="align-middle">
            <span>{{
              row.afterHeavyRain.recoveryTankDrain == null ||
              row.afterHeavyRain.recoveryTankDrain.cleanlines == null
                ? "-"
                : row.afterHeavyRain.recoveryTankDrain.cleanlines.label
            }}</span>
          </td>
          <td class="align-middle">
            <span>{{
              row.afterHeavyRain.recoveryTankDrain == null ||
              row.afterHeavyRain.recoveryTankDrain.freeWater == null
                ? "-"
                : row.afterHeavyRain.recoveryTankDrain.freeWater.label
            }}</span>
          </td>
          <td class="align-middle">
            <span>{{
              row.afterHeavyRain.recoveryTankDrain == null ||
              row.afterHeavyRain.recoveryTankDrain.waterDetector == null
                ? "-"
                : row.afterHeavyRain.recoveryTankDrain.waterDetector.label
            }}</span>
          </td>
          <!-- END AFTER WASH -->

          <td class="align-middle">
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
    }
  }
};
</script>
