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
    <template #empty>
      <EmptyTable
        title="Spareparts are managed from here"
        description="All spareparts will be displayed on this page"
      />
    </template>
    <template #cell(icon)="data">
      <div class="mr-4 flex-shrink-0 text-center" style="width: 40px">
        <i
          v-if="['xls', 'xlsx'].includes(getExt(data.item.document.url))"
          class="icon-2x text-success far fa-file-excel"
        />
        <i
          v-else-if="['doc', 'docx'].includes(getExt(data.item.document.url))"
          class="icon-2x text-primary far fa-file-word"
        />
        <i
          v-else-if="
            ['png', 'jpg', 'jpeg'].includes(getExt(data.item.document.url))
          "
          class="icon-2x text-dark-50 far fa-file-image"
        />
        <i
          v-else-if="['pdf'].includes(getExt(data.item.document.url))"
          class="icon-2x text-danger far fa-file-pdf"
        />
      </div>
    </template>
    <template #cell(title)="data">
      {{ data.value }}
      <br /><span class="text-muted">{{ data.item.description }}</span>
      <br /><small class="text-muted font-italic">{{
        data.item.category.label
      }}</small>
    </template>
    <template #cell(type)="data">
      {{ data.item.document.group.label }}
    </template>
  </CardTable>
</template>

<script>
import { document as columns } from "@/core/datasource/columns";
import { apiUrl } from "@/core/services/api.url";
import { getExt } from "@/core/utils";

export default {
  data: () => ({
    title: "Documents",
    subTitle: "Display all documents",
    baseUrl: process.env.NODE_ENV === "production" ? apiUrl.prod : apiUrl.dev,
    searchText: "Search document",
    serverParams: {
      pageNumber: 1,
      pageSize: 20,
      dppu: null,
      keyword: null,
      status: null
    },
    table: {
      isLoading: false,
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
    getExt,
    updateParams(newProps) {
      this.serverParams = Object.assign({}, this.serverParams, newProps);
    },
    onRowSelected(items) {
      const self = this;
      window.open(`${self.baseUrl}${items[0].document.url}`, "_blank");
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
          url: "/preventivemaintenance/document",
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
