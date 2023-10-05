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
      <!-- <b-button variant="outline-primary" class="mr-2">
        Download
      </b-button> -->
      <!-- <b-button variant="outline-primary" class="mr-2" :to="{ name: 'sparepartDailyStock' }">
        Daily Stock Report
      </b-button> -->
      <b-button variant="outline-primary" class="mr-2" :to="{ name: 'qrCode' }">
        Print QR Code
      </b-button>
      <b-button variant="primary" :to="{ name: 'sparepartCreate' }">
        Create New Sparepart
      </b-button>
    </template>
    <template #filter>
      <b-row class="p-3">
        <b-col xl="3">
          <treeselect
            class="mb-2"
            placeholder="Select DPPU"
            v-model="serverParams.dppu"
            :options="options.dppu"
            @input="onFilter"
          ></treeselect>
        </b-col>
        <b-col xl="3">
          <treeselect
            class="mb-2"
            placeholder="Select Category"
            v-model="serverParams.category"
            :options="options.category"
            :normalizer="normalizer"
            @input="onFilter"
          ></treeselect>
        </b-col>
        <b-col xl="3">
          <treeselect
            class="mb-2"
            placeholder="Select status"
            v-model="serverParams.actived"
            :options="options.status"
            :normalizer="normalizer"
            @input="onFilter"
          ></treeselect>
        </b-col>
        <b-col xl="3">
          <treeselect
            class="mb-2"
            placeholder="Warning"
            v-model="serverParams.warning"
            :options="options.warning"
            :normalizer="normalizer"
            @input="onFilter"
          ></treeselect>
        </b-col>
      </b-row>
    </template>
    <template #empty>
      <EmptyTable
        title="Spareparts are managed from here"
        description="All spareparts will be displayed on this page"
        button-label="Create New Sparepart"
        :href="{ name: 'sparepartCreate' }"
      />
    </template>
    <template #cell(currentStock)="data"> {{ data.value }} pcs </template>
    <template #cell(actived)="data">
      <span v-show="data.item.actived" class="text-success">Active</span>
      <span v-show="!data.item.actived" class="text-danger">Inactive</span>
    </template>
  </CardTable>
</template>

<script>
import { mapGetters } from "vuex";
import { sparepart as columns } from "@/core/datasource/columns";
import { category, status, warning } from "@/core/datasource/options";
import { getDppu } from "@/core/utils";

export default {
  data: () => ({
    title: "Sparepart",
    subTitle: "Display all spareparts",
    searchText: "Search by label",
    serverParams: {
      pageNumber: 1,
      pageSize: 20,
      dppu: null,
      category: null,
      keyword: null,
      status: null,
      warning: null
    },
    table: {
      isLoading: false,
      columns,
      rows: [],
      totalPage: 0,
      totalRecords: 0
    },
    options: {
      dppu: [],
      category,
      status,
      warning
    },
    normalizer(node) {
      return {
        id: node.value,
        label: node.text
      };
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
      self.serverParams.dppu = self.dppu.id;
    }
    self.getAll();
  },
  methods: {
    updateParams(newProps) {
      this.serverParams = Object.assign({}, this.serverParams, newProps);
    },
    onRowSelected(items) {
      const self = this;
      self.$router.push({
        name: "sparepartUpdate",
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
        label: params
      });
      self.getAll();
    },
    onFilter() {
      const self = this;
      self.getAll();
    },
    getAll() {
      const self = this;

      self.table.isLoading = true;
      self.$store
        .dispatch("apis/get", {
          url: "/sparepart",
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
