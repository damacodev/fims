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
    <template #filter>
      <b-row class="p-3">
        <b-col xl="4">
          <treeselect
            class="mb-2"
            placeholder="Select DPPU"
            v-model="serverParams.dppuId"
            :options="options.dppu"
            @input="onFilter"
          ></treeselect>
        </b-col>
        <b-col xl="4">
          <b-form-input
            placeholder="Transaction Date"
            type="date"
            v-model="serverParams.transactionDate"
            @input="onFilter"
          ></b-form-input>
        </b-col>
        <b-col xl="4">
          <treeselect
            class="mb-2"
            placeholder="Select request status"
            v-model="serverParams.status"
            :options="options.standardFormStatus"
            :normalizer="normalizer"
            :multiple="true"
            @input="onFilter"
          />
        </b-col>
      </b-row>
    </template>
    <template #empty>
      <EmptyTable
        :title="`${subTitle} are managed from here`"
        :description="`All ${subTitle} will be displayed on this page`"
      />
    </template>
    <template #cell(transactionDate)="data">
      {{ dateFormat(data.value) }}</template
    >
    <template #cell(transactionRecords)="data">
      {{ data.item.details.length }} Records</template
    >
  </CardTable>
</template>

<script>
import { mapGetters } from "vuex";
import { sf109 as columns } from "@/core/datasource/columns";
import { standardFormStatus } from "@/core/datasource/options";
import { getDate, getDppu, dateFormat, normalizer } from "@/core/utils";

export default {
  data: () => ({
    title: "109 SF",
    subTitle: "Storage Tank Sump Record",
    searchText: "Search by transaction #",
    serverParams: {
      pageNumber: 1,
      pageSize: 20,
      transactionDate: getDate(),
      keyword: null,
      dppuId: null,
      status: null
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
      standardFormStatus
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
    self.getAll();
  },
  methods: {
    normalizer,
    dateFormat,
    updateParams(newProps) {
      this.serverParams = Object.assign({}, this.serverParams, newProps);
    },
    onRowSelected(items) {
      const self = this;
      self.$router.push({
        name: "sf109Update",
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
    onFilter() {
      const self = this;
      self.getAll();
    },
    getAll() {
      const self = this;

      self.table.isLoading = true;
      self.$store
        .dispatch("apis/get", {
          url: "/board/standard-form/109",
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
