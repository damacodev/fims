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
              <fragment v-bind:key="index">
                <span v-html="setOption(row)"></span>
                <br />
              </fragment>
            </template>
          </td>
          <td class="text-left">
            <span v-if="row.everyDay.recoveryTank == null">-</span>
            <template
              v-else
              v-for="(row, index) in row.everyDay.recoveryTank.cleanlinesIds"
            >
              <fragment v-bind:key="index">
                <span v-html="setOption(row)"></span>
                <br />
              </fragment>
            </template>
          </td>
          <td class="text-left">
            <span v-if="row.everyDay.recoveryTank == null">-</span>
            <template
              v-else
              v-for="(row, index) in row.everyDay.recoveryTank.freeWaterIds"
            >
              <fragment v-bind:key="index">
                <span v-html="setOption(row)"></span>
                <br />
              </fragment>
            </template>
          </td>
          <td class="text-left">
            <span v-if="row.everyDay.recoveryTank == null">-</span>
            <template
              v-else
              v-for="(row, index) in row.everyDay.recoveryTank.waterDetectorIds"
            >
              <fragment v-bind:key="index">
                <span v-html="setOption(row)"></span>
                <br />
              </fragment>
            </template>
          </td>

          <td class="text-left">
            <span v-if="row.everyDay.pipeSystem == null">-</span>
            <template
              v-else
              v-for="(row, index) in row.everyDay.pipeSystem.colourIds"
            >
              <fragment v-bind:key="index">
                <span v-html="setOption(row)"></span>
                <br />
              </fragment>
            </template>
          </td>
          <td class="text-left">
            <span v-if="row.everyDay.pipeSystem == null">-</span>
            <template
              v-else
              v-for="(row, index) in row.everyDay.pipeSystem.cleanlinesIds"
            >
              <fragment v-bind:key="index">
                <span v-html="setOption(row)"></span>
                <br />
              </fragment>
            </template>
          </td>
          <td class="text-left">
            <span v-if="row.everyDay.pipeSystem == null">-</span>
            <template
              v-else
              v-for="(row, index) in row.everyDay.pipeSystem.freeWaterIds"
            >
              <fragment v-bind:key="index">
                <span v-html="setOption(row)"></span>
                <br />
              </fragment>
            </template>
          </td>
          <td class="text-left">
            <span v-if="row.everyDay.pipeSystem == null">-</span>
            <template
              v-else
              v-for="(row, index) in row.everyDay.pipeSystem.waterDetectorIds"
            >
              <fragment v-bind:key="index">
                <span v-html="setOption(row)"></span>
                <br />
              </fragment>
            </template>
          </td>

          <td class="text-left">
            <span v-if="row.everyDay.beforeFilter == null">-</span>
            <template
              v-else
              v-for="(row, index) in row.everyDay.beforeFilter.colourIds"
            >
              <fragment v-bind:key="index">
                <span v-html="setOption(row)"></span>
                <br />
              </fragment>
            </template>
          </td>
          <td class="text-left">
            <span v-if="row.everyDay.beforeFilter == null">-</span>
            <template
              v-else
              v-for="(row, index) in row.everyDay.beforeFilter.cleanlinesIds"
            >
              <fragment v-bind:key="index">
                <span v-html="setOption(row)"></span>
                <br />
              </fragment>
            </template>
          </td>
          <td class="text-left">
            <span v-if="row.everyDay.beforeFilter == null">-</span>
            <template
              v-else
              v-for="(row, index) in row.everyDay.beforeFilter.freeWaterIds"
            >
              <fragment v-bind:key="index">
                <span v-html="setOption(row)"></span>
                <br />
              </fragment>
            </template>
          </td>
          <td class="text-left">
            <span v-if="row.everyDay.beforeFilter == null">-</span>
            <template
              v-else
              v-for="(row, index) in row.everyDay.beforeFilter.waterDetectorIds"
            >
              <fragment v-bind:key="index">
                <span v-html="setOption(row)"></span>
                <br />
              </fragment>
            </template>
          </td>

          <td class="text-left">
            <span v-if="row.everyDay.afterFilter == null">-</span>
            <template
              v-else
              v-for="(row, index) in row.everyDay.afterFilter.colourIds"
            >
              <fragment v-bind:key="index">
                <span v-html="setOption(row)"></span>
                <br />
              </fragment>
            </template>
          </td>
          <td class="text-left">
            <span v-if="row.everyDay.afterFilter == null">-</span>
            <template
              v-else
              v-for="(row, index) in row.everyDay.afterFilter.cleanlinesIds"
            >
              <fragment v-bind:key="index">
                <span v-html="setOption(row)"></span>
                <br />
              </fragment>
            </template>
          </td>
          <td class="text-left">
            <span v-if="row.everyDay.afterFilter == null">-</span>
            <template
              v-else
              v-for="(row, index) in row.everyDay.afterFilter.freeWaterIds"
            >
              <fragment v-bind:key="index">
                <span v-html="setOption(row)"></span>
                <br />
              </fragment>
            </template>
          </td>
          <td class="text-left">
            <span v-if="row.everyDay.afterFilter == null">-</span>
            <template
              v-else
              v-for="(row, index) in row.everyDay.afterFilter.waterDetectorIds"
            >
              <fragment v-bind:key="index">
                <span v-html="setOption(row)"></span>
                <br />
              </fragment>
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
              <fragment v-bind:key="index">
                <span v-html="setOption(row)"></span>
                <br />
              </fragment>
            </template>
          </td>
          <td class="text-left">
            <span v-if="row.afterWash.recoveryTank == null">-</span>
            <template
              v-else
              v-for="(row, index) in row.afterWash.recoveryTank.cleanlinesIds"
            >
              <fragment v-bind:key="index">
                <span v-html="setOption(row)"></span>
                <br />
              </fragment>
            </template>
          </td>
          <td class="text-left">
            <span v-if="row.afterWash.recoveryTank == null">-</span>
            <template
              v-else
              v-for="(row, index) in row.afterWash.recoveryTank.freeWaterIds"
            >
              <fragment v-bind:key="index">
                <span v-html="setOption(row)"></span>
                <br />
              </fragment>
            </template>
          </td>
          <td class="text-left">
            <span v-if="row.afterWash.recoveryTank == null">-</span>
            <template
              v-else
              v-for="(row, index) in row.afterWash.recoveryTank
                .waterDetectorIds"
            >
              <fragment v-bind:key="index">
                <span v-html="setOption(row)"></span>
                <br />
              </fragment>
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
              <fragment v-bind:key="index">
                <span v-html="setOption(row)"></span>
                <br />
              </fragment>
            </template>
          </td>
          <td class="text-left">
            <span v-if="row.afterHeavyRain.recoveryTank == null">-</span>
            <template
              v-else
              v-for="(row, index) in row.afterHeavyRain.recoveryTank
                .cleanlinesIds"
            >
              <fragment v-bind:key="index">
                <span v-html="setOption(row)"></span>
                <br />
              </fragment>
            </template>
          </td>
          <td class="text-left">
            <span v-if="row.afterHeavyRain.recoveryTank == null">-</span>
            <template
              v-else
              v-for="(row, index) in row.afterHeavyRain.recoveryTank
                .freeWaterIds"
            >
              <fragment v-bind:key="index">
                <span v-html="setOption(row)"></span>
                <br />
              </fragment>
            </template>
          </td>
          <td class="text-left">
            <span v-if="row.afterHeavyRain.recoveryTank == null">-</span>
            <template
              v-else
              v-for="(row, index) in row.afterHeavyRain.recoveryTank
                .waterDetectorIds"
            >
              <fragment v-bind:key="index">
                <span v-html="setOption(row)"></span>
                <br />
              </fragment>
            </template>
          </td>
          <!-- END AFTER HEAVY RAIN -->
        </b-tr>
      </template>
    </b-tbody>
  </b-table-simple>
</template>

<script>
import { setOption } from "@/core/utils";
export default {
  props: {
    transactionDate: String,
    rows: Array,
    buttonVisibility: Boolean
  },
  methods: {
    setOption,
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
