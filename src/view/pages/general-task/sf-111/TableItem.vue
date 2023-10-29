<template>
  <b-table-simple responsive="" bordered hover class="text-nowrap">
    <b-thead head-variant="light">
      <b-tr>
        <b-th class="text-center align-middle">Tank Identity</b-th>
        <b-th class="text-center align-middle">Record Time</b-th>
        <b-th class="text-center align-middle">Conductivity</b-th>
        <b-th class="text-center align-middle">Temperature</b-th>
      </b-tr>
    </b-thead>
    <b-tbody>
      <template v-for="(row, index) in rows">
        <b-tr v-bind:key="index">
          <td class="align-middle">{{ row.equipment.label }}</td>
          <td class="align-middle">
            <b-input
              v-if="buttonVisibility"
              v-model="row.recordTime"
              :min="transactionDate"
              :max="dateFormat(dateAdd(transactionDate, 6, 'd'), 'YYYY-MM-DD')"
              type="date"
              @blur="handleSubmit(row)"
            />
            <span v-else>
              {{ row.recordTime == null ? "-" : dateFormat(row.recordTime) }}
            </span>
          </td>
          <td class="align-middle">
            <b-input-group v-if="buttonVisibility" append="pS/m">
              <money
                v-model="row.conductivity"
                v-bind="money"
                class="form-control"
                @blur="handleSubmit(row)"
              />
            </b-input-group>
            <span v-else>
              {{
                row.conductivity == null
                  ? "-"
                  : setConductivity(row.conductivity)
              }}
            </span>
          </td>
          <td class="align-middle">
            <b-input-group v-if="buttonVisibility" append="°C">
              <b-input
                v-model="row.temperature"
                type="number"
                @blur="handleSubmit(row)"
              />
            </b-input-group>
            <span v-else>
              {{
                row.temperature == null ? "-" : setTemperature(row.temperature)
              }}
            </span>
          </td>
        </b-tr>
      </template>
    </b-tbody>
  </b-table-simple>
</template>

<script>
import { Money } from "v-money";
import {
  dateAdd,
  dateFormat,
  setConductivity,
  setTemperature
} from "@/core/utils";

export default {
  components: {
    Money
  },
  props: {
    transactionDate: String,
    rows: Array,
    buttonVisibility: Boolean
  },
  data: () => ({
    money: {
      decimal: ",",
      thousands: ".",
      precision: 0,
      masked: false /* doesn't work with directive */
    }
  }),
  methods: {
    dateAdd,
    dateFormat,
    setConductivity,
    setTemperature,
    handleSubmit(row) {
      const self = this;

      if (row.recordTime == null) {
        self.$message.error({
          zIndex: 10000,
          message: "Record time must not be empty"
        });
      } else {
        self.$store
          .dispatch("apis/put", {
            url: `/board/standard-form/111/${self.$route.params.id}/record/${row.id}`,
            params: {
              recordTime: row.recordTime,
              conductivity: row.conductivity,
              temperature: row.temperature
            }
          })
          .then(response => {
            if (response.error) {
              self.$message.error({
                zIndex: 10000,
                message: response.message
              });
            }
          });
      }
    }
  }
};
</script>
