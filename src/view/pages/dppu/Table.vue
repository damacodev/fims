<template>
  <CardTable
    ref="CardTable"
    :title="title"
    :subTitle="subTitle"
    :searchText="searchText"
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
    @onSearch="onSearch"
  >
    <template #toolbar>
      <b-button-group>
        <b-button variant="outline-primary" :to="{ name: 'dppuImport' }">
          Import Excel File
        </b-button>
        <b-button variant="primary" :to="{ name: 'dppuCreate' }">
          Create New DPPU
        </b-button>
      </b-button-group>
    </template>
    <template #empty>
      <EmptyTable
        title="DPPU are managed from here"
        description="You can see about DPPU information"
        button-label="Create New DPPU"
        :href="{ name: 'dppuCreate' }"
      />
    </template>
    <template #cell(operatingHours)="data">
      {{
        `${data.item.operatingHours.start} - ${data.item.operatingHours.end}`
      }}
    </template>
    <template #cell(actived)="data">
      <span v-show="data.item.actived" class="text-success">Active</span>
      <span v-show="!data.item.actived" class="text-danger">Inactive</span>
    </template>
  </CardTable>
</template>

<script>
import { dppu as columns } from "@/core/datasource/columns";
import { pageSize } from "@/core/utils";

export default {
  data: () => ({
    title: "Depot Pengisian Pesawat Udara (DPPU)",
    subTitle: "Display all DPPU",
    searchText: "Search by name",
    serverParams: {
      pageNumber: null,
      pageSize: null,
      keyword: null
    },
    table: {
      isLoading: false,
      columns,
      rows: [],
      totalPage: 0,
      totalRecords: 0
    }
  }),
  mounted() {
    const self = this;

    self.serverParams.pageNumber = self.$route.query.pageNumber ?? 1;
    self.serverParams.pageSize = self.$route.query.pageSize ?? pageSize;
    self.serverParams.keyword = self.$route.query.keyword;
    self.$refs.CardTable.keyword = self.$route.query.keyword;

    self.getAll();
  },
  watch: {
    $route() {
      this.getAll();
    }
  },
  methods: {
    updateParams(newProps) {
      const self = this;
      let query = self.$route.query;
      query = Object.assign({}, query, newProps);

      self.$router.push({ query });
    },
    onRowSelected(items) {
      const self = this;
      self.$router.push({
        name: "dppuUpdate",
        params: {
          id: items[0].id
        }
      });
    },
    onPageChange(params) {
      const self = this;
      self.updateParams({ pageNumber: params });
      self.serverParams.pageNumber = params;
      self.getAll();
    },
    onPerPageChange(params) {
      const self = this;
      self.updateParams({ pageNumber: 1, pageSize: params });
      self.serverParams.pageNumber = 1;
      self.serverParams.pageSize = params;
      self.getAll();
    },
    onSearch(params) {
      const self = this;
      self.updateParams({
        pageNumber: 1,
        keyword: params
      });
      self.serverParams.keyword = params;
      self.getAll();
    },
    getAll() {
      const self = this;

      self.table.isLoading = true;
      self.$store
        .dispatch("apis/get", {
          url: "/dppu",
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
