<template>
  <b-table-simple responsive="" bordered hover class="text-nowrap">
    <b-thead head-variant="light">
      <b-tr>
        <b-th class="text-center align-middle" rowspan="3">Equipment</b-th>
        <b-th class="text-center align-middle" colspan="16">Every Day</b-th>
        <b-th class="text-center align-middle" colspan="4">After Wash</b-th>
        <b-th class="text-center align-middle" colspan="4">
          After Heavy Rain
        </b-th>
      </b-tr>
      <b-tr>
        <b-th class="text-center align-middle" colspan="4">Recovery Tank</b-th>
        <b-th class="text-center align-middle" colspan="4">Pipe System</b-th>
        <b-th class="text-center align-middle" colspan="4">Before Filter</b-th>
        <b-th class="text-center align-middle" colspan="4">After Filter</b-th>

        <b-th class="text-center align-middle" colspan="4">Recovery Tank</b-th>
        <b-th class="text-center align-middle" colspan="4">Recovery Tank</b-th>
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
      </b-tr>
    </b-thead>
    <b-tbody>
      <template v-for="(row, index) in rows">
        <b-tr v-bind:key="index" @click="onRowSelected(row)">
          <td>{{ row.equipment.label }}</td>

          <!-- START EVERYDAY -->
          <td class="text-left">
            <span v-if="row.everyDay.recoveryTank == null">-</span>
            <template
              v-else
              v-for="(row, index) in row.everyDay.recoveryTank.colourIds"
            >
              <span v-bind:key="index"
                >{{ `${row.value} - ${row.label}` }}<br
              /></span>
            </template>
          </td>
          <td class="text-left">
            <span v-if="row.everyDay.recoveryTank == null">-</span>
            <template
              v-else
              v-for="(row, index) in row.everyDay.recoveryTank.cleanlinesIds"
            >
              <span v-bind:key="index"
                >{{ `${row.value} - ${row.label}` }}<br
              /></span>
            </template>
          </td>
          <td class="text-left">
            <span v-if="row.everyDay.recoveryTank == null">-</span>
            <template
              v-else
              v-for="(row, index) in row.everyDay.recoveryTank.freeWaterIds"
            >
              <span v-bind:key="index"
                >{{ `${row.value} - ${row.label}` }}<br
              /></span>
            </template>
          </td>
          <td class="text-left">
            <span v-if="row.everyDay.recoveryTank == null">-</span>
            <template
              v-else
              v-for="(row, index) in row.everyDay.recoveryTank.waterDetectorIds"
            >
              <span v-bind:key="index"
                >{{ `${row.value} - ${row.label}` }}<br
              /></span>
            </template>
          </td>

          <td class="text-left">
            <span v-if="row.everyDay.pipeSystem == null">-</span>
            <template
              v-else
              v-for="(row, index) in row.everyDay.pipeSystem.colourIds"
            >
              <span v-bind:key="index"
                >{{ `${row.value} - ${row.label}` }}<br
              /></span>
            </template>
          </td>
          <td class="text-left">
            <span v-if="row.everyDay.pipeSystem == null">-</span>
            <template
              v-else
              v-for="(row, index) in row.everyDay.pipeSystem.cleanlinesIds"
            >
              <span v-bind:key="index"
                >{{ `${row.value} - ${row.label}` }}<br
              /></span>
            </template>
          </td>
          <td class="text-left">
            <span v-if="row.everyDay.pipeSystem == null">-</span>
            <template
              v-else
              v-for="(row, index) in row.everyDay.pipeSystem.freeWaterIds"
            >
              <span v-bind:key="index"
                >{{ `${row.value} - ${row.label}` }}<br
              /></span>
            </template>
          </td>
          <td class="text-left">
            <span v-if="row.everyDay.pipeSystem == null">-</span>
            <template
              v-else
              v-for="(row, index) in row.everyDay.pipeSystem.waterDetectorIds"
            >
              <span v-bind:key="index"
                >{{ `${row.value} - ${row.label}` }}<br
              /></span>
            </template>
          </td>

          <td class="text-left">
            <span v-if="row.everyDay.beforeFilter == null">-</span>
            <template
              v-else
              v-for="(row, index) in row.everyDay.beforeFilter.colourIds"
            >
              <span v-bind:key="index"
                >{{ `${row.value} - ${row.label}` }}<br
              /></span>
            </template>
          </td>
          <td class="text-left">
            <span v-if="row.everyDay.beforeFilter == null">-</span>
            <template
              v-else
              v-for="(row, index) in row.everyDay.beforeFilter.cleanlinesIds"
            >
              <span v-bind:key="index"
                >{{ `${row.value} - ${row.label}` }}<br
              /></span>
            </template>
          </td>
          <td class="text-left">
            <span v-if="row.everyDay.beforeFilter == null">-</span>
            <template
              v-else
              v-for="(row, index) in row.everyDay.beforeFilter.freeWaterIds"
            >
              <span v-bind:key="index"
                >{{ `${row.value} - ${row.label}` }}<br
              /></span>
            </template>
          </td>
          <td class="text-left">
            <span v-if="row.everyDay.beforeFilter == null">-</span>
            <template
              v-else
              v-for="(row, index) in row.everyDay.beforeFilter.waterDetectorIds"
            >
              <span v-bind:key="index"
                >{{ `${row.value} - ${row.label}` }}<br
              /></span>
            </template>
          </td>

          <td class="text-left">
            <span v-if="row.everyDay.afterFilter == null">-</span>
            <template
              v-else
              v-for="(row, index) in row.everyDay.afterFilter.colourIds"
            >
              <span v-bind:key="index"
                >{{ `${row.value} - ${row.label}` }}<br
              /></span>
            </template>
          </td>
          <td class="text-left">
            <span v-if="row.everyDay.afterFilter == null">-</span>
            <template
              v-else
              v-for="(row, index) in row.everyDay.afterFilter.cleanlinesIds"
            >
              <span v-bind:key="index"
                >{{ `${row.value} - ${row.label}` }}<br
              /></span>
            </template>
          </td>
          <td class="text-left">
            <span v-if="row.everyDay.afterFilter == null">-</span>
            <template
              v-else
              v-for="(row, index) in row.everyDay.afterFilter.freeWaterIds"
            >
              <span v-bind:key="index"
                >{{ `${row.value} - ${row.label}` }}<br
              /></span>
            </template>
          </td>
          <td class="text-left">
            <span v-if="row.everyDay.afterFilter == null">-</span>
            <template
              v-else
              v-for="(row, index) in row.everyDay.afterFilter.waterDetectorIds"
            >
              <span v-bind:key="index"
                >{{ `${row.value} - ${row.label}` }}<br
              /></span>
            </template>
          </td>
          <!-- END EVERYDAY -->

          <!-- START AFTER WASH -->
          <td class="text-left">
            <span v-if="row.afterWash.recoveryTank == null">-</span>
            <template
              v-else
              v-for="(row, index) in row.afterWash.recoveryTank.colourIds"
            >
              <span v-bind:key="index"
                >{{ `${row.value} - ${row.label}` }}<br
              /></span>
            </template>
          </td>
          <td class="text-left">
            <span v-if="row.afterWash.recoveryTank == null">-</span>
            <template
              v-else
              v-for="(row, index) in row.afterWash.recoveryTank.cleanlinesIds"
            >
              <span v-bind:key="index"
                >{{ `${row.value} - ${row.label}` }}<br
              /></span>
            </template>
          </td>
          <td class="text-left">
            <span v-if="row.afterWash.recoveryTank == null">-</span>
            <template
              v-else
              v-for="(row, index) in row.afterWash.recoveryTank.freeWaterIds"
            >
              <span v-bind:key="index"
                >{{ `${row.value} - ${row.label}` }}<br
              /></span>
            </template>
          </td>
          <td class="text-left">
            <span v-if="row.afterWash.recoveryTank == null">-</span>
            <template
              v-else
              v-for="(row, index) in row.afterWash.recoveryTank
                .waterDetectorIds"
            >
              <span v-bind:key="index"
                >{{ `${row.value} - ${row.label}` }}<br
              /></span>
            </template>
          </td>
          <!-- END AFTER WASH -->

          <!-- START AFTER HEAVY RAIN -->
          <td class="text-left">
            <span v-if="row.afterHeavyRain.recoveryTank == null">-</span>
            <template
              v-else
              v-for="(row, index) in row.afterHeavyRain.recoveryTank.colourIds"
            >
              <span v-bind:key="index"
                >{{ `${row.value} - ${row.label}` }}<br
              /></span>
            </template>
          </td>
          <td class="text-left">
            <span v-if="row.afterHeavyRain.recoveryTank == null">-</span>
            <template
              v-else
              v-for="(row, index) in row.afterHeavyRain.recoveryTank
                .cleanlinesIds"
            >
              <span v-bind:key="index"
                >{{ `${row.value} - ${row.label}` }}<br
              /></span>
            </template>
          </td>
          <td class="text-left">
            <span v-if="row.afterHeavyRain.recoveryTank == null">-</span>
            <template
              v-else
              v-for="(row, index) in row.afterHeavyRain.recoveryTank
                .freeWaterIds"
            >
              <span v-bind:key="index"
                >{{ `${row.value} - ${row.label}` }}<br
              /></span>
            </template>
          </td>
          <td class="text-left">
            <span v-if="row.afterHeavyRain.recoveryTank == null">-</span>
            <template
              v-else
              v-for="(row, index) in row.afterHeavyRain.recoveryTank
                .waterDetectorIds"
            >
              <span v-bind:key="index"
                >{{ `${row.value} - ${row.label}` }}<br
              /></span>
            </template>
          </td>
          <!-- END AFTER HEAVY RAIN -->
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
