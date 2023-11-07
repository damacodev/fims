<template>
  <CardTable
    :title="title"
    :subTitle="subTitle"
    :columns="table.columns"
    :rows="table.rows"
    :isLoading="table.isLoading"
    :pageSize="serverParams.pageSize"
    :pageNumber="serverParams.pageNumber"
    :totalPage="table.totalPage"
    :totalRecords="table.totalRecords"
    @onRowSelected="onRowSelected"
    @onPerPageChange="onPerPageChange"
    @onPageChange="onPageChange"
  >
    <template #toolbar>
      <b-button variant="primary" :to="{ name: 'documentNumberCreate' }">
        Create New Document Number
      </b-button>
    </template>
    <template #filter>
      <b-row class="p-3">
        <b-col xl="6">
          <treeselect
            class="mb-2"
            placeholder="Select DPPU"
            v-model="serverParams.dppuId"
            :options="options.dppu"
            @input="onFilter"
          />
        </b-col>
        <b-col xl="6">
          <treeselect
            class="mb-2"
            placeholder="Select Standard Form"
            v-model="serverParams.standardFormId"
            :options="options.standardForm"
            @input="onFilter"
          />
        </b-col>
      </b-row>
    </template>
    <template #empty>
      <EmptyTable
        title="Document numbers are managed from here"
        description="You can see about document number information or which ones are active/inactive status"
        button-label="Create New Document Number"
        :href="{ name: 'documentNumberCreate' }"
      />
    </template>
  </CardTable>
</template>

<script>
import { mapGetters } from "vuex";
import { documentNumber as columns } from "@/core/datasource/columns";
import { getDppu, normalizer } from "@/core/utils";

export default {
  data: () => ({
    title: "Document Number",
    subTitle: "Display all document numbers",
    serverParams: {
      pageNumber: 1,
      pageSize: 20,
      dppuId: null,
      standardFormId: null
    },
    table: {
      isLoading: true,
      columns,
      rows: [],
      totalPage: 0,
      totalRecords: 0
    },
    options: {
      dppu: [],
      standardForm: []
    }
  }),
  computed: {
    ...mapGetters("personalize", ["multipleDppu", "dppu"])
  },
  created() {
    const self = this;
    if (self.multipleDppu) {
      getDppu().then(response => {
        self.options.dppu = response.data.map(x => ({
          id: x.id,
          label: x.name
        }));
      });
    } else {
      self.options.dppu = [self.dppu];
    }
    if (self.dppu) {
      self.serverParams.dppuId = self.dppu.id;
    }

    self.getStandardForm();
    self.getAll();
  },
  methods: {
    normalizer,
    updateParams(newProps) {
      this.serverParams = Object.assign({}, this.serverParams, newProps);
    },
    onRowSelected(items) {
      const self = this;
      self.$router.push({
        name: "documentNumberUpdate",
        params: {
          id: items[0].id
        }
      });
    },
    onPageChange(params) {
      this.updateParams({ pageNumber: params });
      this.getAll();
    },
    onPerPageChange(params) {
      this.updateParams({ pageSize: params });
      this.getAll();
    },
    onSearch(params) {
      const self = this;
      self.updateParams({
        fullName: params
      });
      self.getAll();
    },
    onFilter() {
      const self = this;
      self.getAll();
    },
    getStandardForm() {
      const self = this;

      self.$store
        .dispatch("apis/get", {
          url: `/common/standard-form`,
          params: {
            numberingDocument: true
          }
        })
        .then(response => {
          if (response.error) {
            self.$message.error({
              zIndex: 10000,
              message: response.message
            });
          } else {
            self.options.standardForm = response.data.data;
          }
        });
    },
    getAll() {
      const self = this;

      self.table.isLoading = true;
      self.$store
        .dispatch("apis/get", {
          url: "/documentnumber",
          params: self.serverParams
        })
        .then(response => {
          if (response.error) {
            self.$message.error({
              zIndex: 10000,
              message: response.message
            });
          } else {
            self.table.rows = response.data.data;
            self.table.totalPage = response.data.totalPage;
            self.table.totalRecords = response.data.totalData;
          }
          self.table.isLoading = false;
        });
    }
  }
};
</script>
