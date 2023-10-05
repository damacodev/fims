<template>
  <CardTable
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
      <b-button variant="primary" :to="{ name: 'regionCreate' }"
        >Create New Region</b-button
      >
    </template>
    <template #empty>
      <EmptyTable
        title="Regions are managed from here"
        description="You can see about region information"
        button-label="Create New Region"
        :href="{ name: 'regionCreate' }"
      />
    </template>
  </CardTable>
</template>

<script>
import { region as columns } from "@/core/datasource/columns";

export default {
  data: () => ({
    title: "Region",
    subTitle: "Display all regions",
    searchText: "Search regions",
    serverParams: {
      pageNumber: 1,
      pageSize: 20,
      keyword: null
    },
    table: {
      isLoading: true,
      columns,
      rows: [],
      totalPage: 0,
      totalRecords: 0
    }
  }),
  created() {
    const self = this;
    self.getAll();
  },
  methods: {
    updateParams(newProps) {
      this.serverParams = Object.assign({}, this.serverParams, newProps);
    },
    onRowSelected(items) {
      const self = this;
      self.$router.push({
        name: "regionUpdate",
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
        keyword: params
      });
      self.getAll();
    },
    getAll() {
      const self = this;

      self.table.isLoading = true;
      self.$store
        .dispatch("apis/get", {
          url: "/common/region",
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
