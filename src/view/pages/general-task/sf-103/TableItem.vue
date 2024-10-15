<template>
  <b-table-simple responsive="" bordered hover class="text-nowrap">
    <b-thead head-variant="light">
      <b-tr>
        <b-th rowspan="2" class="text-center align-middle">Record Time</b-th>
        <b-th rowspan="2" class="text-center align-middle">Bridger No</b-th>
        <b-th rowspan="2" class="text-center align-middle">Nomor Ritase</b-th>
        <b-th rowspan="2" class="text-center align-middle">BPP No</b-th>
        <b-th rowspan="2" class="text-center align-middle">Volume</b-th>
        <b-th rowspan="2" class="text-center align-middle">Seal/Segel</b-th>
        <b-th colspan="2" class="text-center align-middle">
          Tank Batch Document
        </b-th>
        <b-th colspan="4" class="text-center align-middle">
          Receiving Document
        </b-th>
        <b-th rowspan="2" class="text-center align-middle">Kompartemen</b-th>
        <b-th colspan="4" class="text-center align-middle">Control Check</b-th>
        <b-th rowspan="2" class="text-center align-middle">Appearance</b-th>
        <b-th rowspan="2" class="text-center align-middle">Conductivity</b-th>
        <b-th rowspan="2" class="text-center align-middle">Tank No</b-th>
      </b-tr>
      <b-tr>
        <b-th class="text-center align-middle">Test Report No</b-th>
        <b-th class="text-center align-middle">Density 15°C</b-th>
        <b-th class="text-center align-middle">AFRN No</b-th>
        <b-th class="text-center align-middle">Density Observed</b-th>
        <b-th class="text-center align-middle">Temperature</b-th>
        <b-th class="text-center align-middle">Density 15°C</b-th>
        <b-th class="text-center align-middle">Density Observed</b-th>
        <b-th class="text-center align-middle">Temperature</b-th>
        <b-th class="text-center align-middle">Density 15°C</b-th>
        <b-th class="text-center align-middle">DIFF.max 0.003 kg/l</b-th>
      </b-tr>
    </b-thead>
    <b-tbody>
      <fragment v-for="(row, index) in rows" v-bind:key="`row-${index}`">
        <fragment v-if="row.records == null || row.records.length == 0">
          <b-tr @click="onRowSelected(row)">
            <td>
              {{ dateTimeFormat(row.recordTime, "HH:mm") }}
            </td>
            <td>{{ row.bridgerNo }}</td>
            <td class="text-center">{{ row.ritase }}</td>
            <td>{{ row.bppNo }}</td>
            <td class="text-right">
              {{ setVolume(row.volume) }}
            </td>
            <td>{{ row.seal }}</td>
            <td>{{ row.tankBatchDocument.testReportNo }}</td>
            <td class="text-right">
              {{ setDensity(row.tankBatchDocument.densityAt15Celcius) }}
            </td>
            <td>{{ row.receivingDocument.afrnNo }}</td>
            <td class="text-right">
              {{ setDensity(row.receivingDocument.densityObserved) }}
            </td>
            <td class="text-right">
              {{ setTemperature(row.receivingDocument.temperature) }}
            </td>
            <td class="text-right">
              {{ setDensity(row.receivingDocument.densityAt15Celcius) }}
            </td>
            <td class="text-center" colspan="8">-</td>
          </b-tr>
        </fragment>
        <fragment v-if="row.records != null || row.records.length > 0">
          <b-tr
            v-for="(record, indexRecord) in row.records"
            v-bind:key="`record-${indexRecord}`"
            @click="onRowSelected(row)"
          >
            <td>
              {{ dateTimeFormat(row.recordTime, "HH:mm") }}
            </td>
            <td>{{ row.bridgerNo }}</td>
            <td class="text-center">{{ row.ritase }}</td>
            <td>{{ row.bppNo }}</td>
            <td class="text-right">
              {{ setVolume(row.volume) }}
            </td>
            <td>{{ row.seal }}</td>
            <td>{{ row.tankBatchDocument.testReportNo }}</td>
            <td class="text-right">
              {{ setDensity(row.tankBatchDocument.densityAt15Celcius) }}
            </td>
            <td>{{ row.receivingDocument.afrnNo }}</td>
            <td class="text-right">
              {{ setDensity(row.receivingDocument.densityObserved) }}
            </td>
            <td class="text-right">
              {{ setTemperature(row.receivingDocument.temperature) }}
            </td>
            <td class="text-right">
              {{ setDensity(row.receivingDocument.densityAt15Celcius) }}
            </td>
            <td class="text-center">
              {{ record.kompartemen }}
              <br /><small>{{ record.labelKompartemen }}</small>
            </td>
            <td class="text-right">
              {{ setDensity(record.controlCheck.densityObserved) }}
            </td>
            <td class="text-right">
              {{ setTemperature(record.controlCheck.temperature) }}
            </td>
            <td class="text-right">
              {{ setDensity(record.controlCheck.densityAt15Celcius) }}
            </td>
            <td class="text-right">
              {{ record.controlCheck.maximumDifferential }}
            </td>
            <td class="text-left">
              <template v-for="(item, indexAppearance) in record.appearanceIds">
                <fragment v-bind:key="indexAppearance">
                  <span v-html="setOption(item)"></span>
                  <br />
                </fragment>
              </template>
            </td>
            <td class="text-right">
              {{ setConductivity(record.conductivity) }}
            </td>
            <td>{{ record.tankNo }}</td>
          </b-tr>
        </fragment>
      </fragment>
    </b-tbody>
  </b-table-simple>
</template>

<script>
import {
  numberFormat,
  dateTimeFormat,
  setVolume,
  setDensity,
  setTemperature,
  setConductivity,
  setOption
} from "@/core/utils";

export default {
  props: {
    rows: Array
  },
  methods: {
    numberFormat,
    dateTimeFormat,
    setVolume,
    setDensity,
    setTemperature,
    setConductivity,
    setOption,
    onRowSelected(params) {
      this.$emit("onRowSelected", params);
    }
  }
};
</script>
