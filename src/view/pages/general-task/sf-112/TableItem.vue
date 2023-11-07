<template>
  <b-table-simple responsive="" bordered hover class="text-nowrap">
    <b-thead head-variant="light">
      <b-tr>
        <b-th class="text-center align-middle">Tanks</b-th>
        <b-th class="text-center align-middle">Volume</b-th>
        <b-th class="text-center align-middle">Result Before</b-th>
        <b-th class="text-center align-middle">Result After</b-th>
        <b-th class="text-center align-middle">Receiver Tank</b-th>
      </b-tr>
    </b-thead>
    <b-tbody>
      <template v-for="(row, index) in rows">
        <b-tr v-bind:key="index">
          <td v-bind:class="buttonVisibility ? `align-middle` : ``">
            {{ row.equipment.label }}
          </td>
          <td
            v-bind:class="buttonVisibility ? `align-middle` : ``"
            style="width: 150px"
          >
            <b-input-group v-if="buttonVisibility" append="L">
              <money
                v-model="row.volume"
                v-bind="money"
                class="form-control"
                @blur="handleSubmit(row)"
              />
            </b-input-group>
            <span v-else>
              {{ row.volume == null ? "-" : setVolume(row.volume) }}
            </span>
          </td>
          <td v-bind:class="buttonVisibility ? `align-middle` : ``">
            <treeselect
              v-if="buttonVisibility"
              placeholder="Select result before"
              v-model="row.resultBeforeIds"
              :options="options.appearance"
              :appendToBody="true"
              :multiple="true"
              @input="handleSubmit(row)"
            />
            <template v-else>
              <span v-if="row.resultBeforeIds.length == 0">-</span>
              <template v-else v-for="(row, index) in row.resultBeforeIds">
                <span v-bind:key="index"
                  >{{ `${row.value} - ${row.label}` }}<br
                /></span>
              </template>
            </template>
          </td>
          <td v-bind:class="buttonVisibility ? `align-middle` : ``">
            <treeselect
              v-if="buttonVisibility"
              placeholder="Select result after"
              v-model="row.resultAfterIds"
              :options="options.appearance"
              :appendToBody="true"
              :multiple="true"
              @input="handleSubmit(row)"
            />
            <template v-else>
              <span v-if="row.resultAfterIds.length == 0">-</span>
              <template v-else v-for="(row, index) in row.resultAfterIds">
                <span v-bind:key="index"
                  >{{ `${row.value} - ${row.label}` }}<br
                /></span>
              </template>
            </template>
          </td>
          <td v-bind:class="buttonVisibility ? `align-middle` : ``">
            <b-input
              v-if="buttonVisibility"
              v-model="row.receiverTank"
              type="text"
              @blur="handleSubmit(row)"
              style="width: 200px"
            />
            <span v-else>
              {{ row.receiverTank == null ? "-" : row.receiverTank }}
            </span>
          </td>
        </b-tr>
      </template>
    </b-tbody>
  </b-table-simple>
</template>

<script>
import { Money } from "v-money";
import { getAppearance } from "@/core/utils";
import { setVolume } from "@/core/utils";

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
    },
    options: {
      appearance: []
    }
  }),
  created() {
    const self = this;

    getAppearance().then(response => {
      self.options.appearance = response;
    });
  },
  methods: {
    setVolume,
    handleSubmit(row) {
      const self = this;

      self.$store
        .dispatch("apis/put", {
          url: `/board/standard-form/112/${self.$route.params.id}/record/${row.id}`,
          params: {
            volume: row.volume,
            resultBeforeIds: row.resultBeforeIds,
            resultAfterIds: row.resultAfterIds,
            receiverTank: row.receiverTank
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
};
</script>
