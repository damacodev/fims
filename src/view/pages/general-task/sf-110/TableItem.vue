<template>
  <b-table-simple responsive="" bordered hover class="text-nowrap">
    <b-thead head-variant="light">
      <b-tr>
        <b-th class="text-center align-middle">Filter</b-th>
        <b-th class="text-center align-middle">Result</b-th>
      </b-tr>
    </b-thead>
    <b-tbody>
      <template v-for="(row, index) in rows">
        <b-tr v-bind:key="index">
          <td v-bind:class="buttonVisibility ? `align-middle` : ``" width="50%">
            {{ row.equipment.label }}
          </td>
          <td v-bind:class="buttonVisibility ? `align-middle` : ``" width="50%">
            <treeselect
              v-if="buttonVisibility"
              placeholder="Select result"
              v-model="row.resultIds"
              :options="options.appearance"
              :appendToBody="true"
              :multiple="true"
              @input="handleSubmit(index)"
            />
            <template v-else>
              <span v-if="row.resultIds.length == 0">-</span>
              <template v-else v-for="(row, index) in row.resultIds">
                <fragment v-bind:key="index">
                  <span v-html="setOption(row)"></span>
                  <br />
                </fragment>
              </template>
            </template>
          </td>
        </b-tr>
      </template>
    </b-tbody>
  </b-table-simple>
</template>

<script>
import { getAppearance, setOption } from "@/core/utils";

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
    setOption,
    handleSubmit(index) {
      const self = this;

      self.$store
        .dispatch("apis/put", {
          url: `/board/standard-form/110/${self.$route.params.id}/record/${self.rows[index].id}`,
          params: {
            resultIds: self.rows[index].resultIds
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
