<template>
  <b-table-simple responsive="" bordered hover class="text-nowrap">
    <b-thead head-variant="light">
      <b-tr>
        <b-th class="text-center align-middle">Storage Tank</b-th>
        <b-th class="text-center align-middle">Result</b-th>
        <b-th class="text-center align-middle">After Heavy Rain</b-th>
      </b-tr>
    </b-thead>
    <b-tbody>
      <template v-for="(row, index) in rows">
        <b-tr v-bind:key="index">
          <td class="align-middle">{{ row.equipment.label }}</td>
          <td class="align-middle">
            <treeselect
              v-if="buttonVisibility"
              placeholder="Select result"
              v-model="row.resultId"
              :options="options.appearance"
              :appendToBody="true"
              @input="handleSubmit(index)"
            />
            <span v-else>
              {{ row.result == null ? "-" : row.result.label }}
            </span>
          </td>
          <td class="align-middle">
            <treeselect
              v-if="buttonVisibility"
              placeholder="Select after heavy rain"
              v-model="row.afterHeavyRainId"
              :options="options.appearance"
              :appendToBody="true"
              @input="handleSubmit(index)"
            />
            <span v-else>
              {{ row.afterHeavyRain == null ? "-" : row.afterHeavyRain.label }}
            </span>
          </td>
        </b-tr>
      </template>
    </b-tbody>
  </b-table-simple>
</template>

<script>
import { getAppearance } from "@/core/utils";

export default {
  props: {
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
    handleSubmit(index) {
      const self = this;

      self.$store
        .dispatch("apis/put", {
          url: `/board/standard-form/109/${self.$route.params.id}/record/${self.rows[index].id}`,
          params: {
            resultId: self.rows[index].resultId,
            afterHeavyRainId: self.rows[index].afterHeavyRainId
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
