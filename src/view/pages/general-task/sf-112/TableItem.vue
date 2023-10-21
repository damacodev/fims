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
          <td class="align-middle">{{ row.equipment.label }}</td>
          <td class="align-middle" style="width: 150px;">
            <b-input-group v-if="buttonVisibility" append="L">
              <b-input
                v-model="row.volume"
                type="number"
                @blur="handleSubmit(row)"
              />
            </b-input-group>
            <span v-else>
              {{ row.volume == null ? "-" : setVolume(row.volume) }}
            </span>
          </td>
          <td class="align-middle">
            <treeselect
              v-if="buttonVisibility"
              placeholder="Select result before"
              v-model="row.resultBeforeId"
              :options="options.appearance"
              :appendToBody="true"
              @input="handleSubmit(row)"
            />
            <span v-else>
              {{ row.resultBeforeId == null ? "-" : row.resultBefore.label }}
            </span>
          </td>
          <td class="align-middle">
            <treeselect
              v-if="buttonVisibility"
              placeholder="Select result after"
              v-model="row.resultAfterId"
              :options="options.appearance"
              :appendToBody="true"
              @input="handleSubmit(row)"
            />
            <span v-else>
              {{ row.resultAfterId == null ? "-" : row.resultAfter.label }}
            </span>
          </td>
          <td class="align-middle">
            <b-input
              v-if="buttonVisibility"
              v-model="row.receiverTank"
              type="text"
              @blur="handleSubmit(row)"
              style="width: 200px;"
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
import { getAppearance } from "@/core/utils";

import { setVolume } from "@/core/utils";

export default {
  props: {
    transactionDate: String,
    rows: Array,
    buttonVisibility: Boolean
  },
  data: () => ({
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
            resultBeforeId: row.resultBeforeId,
            resultAfterId: row.resultAfterId,
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
