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
              v-model="row.resultIds"
              :options="options.appearance"
              :appendToBody="true"
              :multiple="true"
              @input="handleSubmit(index)"
            />
            <span v-else>
              {{ row.resultIds.length == 0 ? "-" : row.resultIds.join("/") }}
            </span>
          </td>
          <td class="align-middle">
            <treeselect
              v-if="buttonVisibility"
              placeholder="Select after heavy rain"
              v-model="row.afterHeavyRainIds"
              :options="options.appearance"
              :appendToBody="true"
              :multiple="true"
              @input="handleSubmit(index)"
            />
            <span v-else>
              {{
                row.afterHeavyRainIds.length == 0
                  ? "-"
                  : row.afterHeavyRainIds.join("/")
              }}
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
            resultIds: self.rows[index].resultIds,
            afterHeavyRainIds: self.rows[index].afterHeavyRainIds
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
