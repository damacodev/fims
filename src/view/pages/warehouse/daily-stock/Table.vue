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
  >
    <template #toolbar>
      <b-button variant="outline-primary" class="mr-2" @click="handleDownload">
        Download
      </b-button>
      <b-button variant="primary" :to="{ name: 'dailyStockCreate' }">
        Create New Transaction
      </b-button>
    </template>
    <template #search>
      <div class="ml-2 mr-2 mb-2">
        <date-range-picker
          v-model="serverParams.dateRange"
          style="width: 100%; cursor: pointer"
          opens="center"
          :locale-data="{ format: 'dd/mm/yyyy', separator: ' to ' }"
          control-container-class="form-control"
          @update="onFilter"
        />
      </div>
    </template>
    <template #filter>
      <b-row class="p-3">
        <b-col xl="4">
          <b-form-input
            placeholder="Transaction #"
            autocomplete="off"
            v-model="serverParams.keyword"
            @input="onFilter"
          ></b-form-input>
        </b-col>
        <b-col xl="4">
          <treeselect
            class="mb-2"
            placeholder="Select DPPU"
            v-model="serverParams.dppu"
            :options="options.dppu"
            @input="onFilter"
          ></treeselect>
        </b-col>
        <b-col xl="4">
          <b-form-input
            placeholder="Remarks"
            autocomplete="off"
            v-model="serverParams.remarks"
            @input="onFilter"
          ></b-form-input>
        </b-col>
      </b-row>
    </template>
    <template #empty>
      <EmptyTable
        title="Daily stocks are managed from here"
        description="All daily stock transactions will be displayed on this page"
        button-label="Create New Transaction"
        :href="{ name: 'dailyStockCreate' }"
      />
    </template>
    <template #cell(date)="data"> {{ dateFormat(data.value) }}</template>
  </CardTable>
</template>

<script>
import { mapGetters } from "vuex";
import { dailyStock as columns } from "@/core/datasource/columns";
import { status } from "@/core/datasource/options";
import { getDate, getDppu, dateFormat } from "@/core/utils";

import DateRangePicker from "vue2-daterange-picker";
import "vue2-daterange-picker/dist/vue2-daterange-picker.css";

export default {
  components: {
    DateRangePicker
  },
  data: () => ({
    title: "Daily Stock",
    subTitle: "Display all daily stock transactions",
    searchText: "Search by sparepart",
    serverParams: {
      pageNumber: 1,
      pageSize: 20,
      keyword: null,
      dppu: null,
      remarks: null,
      dateRange: {
        startDate: getDate(),
        endDate: getDate()
      }
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
      status
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
    dateFormat,
    updateParams(newProps) {
      this.serverParams = Object.assign({}, this.serverParams, newProps);
    },
    onRowSelected(items) {
      const self = this;
      self.$router.push({
        name: "dailyStockUpdate",
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

      let _serverParams = {
        pageNumber: self.serverParams.pageNumber,
        pageSize: self.serverParams.pageSize,
        keyword: self.serverParams.keyword,
        dppu: self.serverParams.dppu,
        remarks: self.serverParams.remarks,
        startDate: self.serverParams.dateRange.startDate,
        endDate: self.serverParams.dateRange.endDate
      };
      self.table.isLoading = true;
      self.$store
        .dispatch("apis/get", {
          url: "/sparepart/dailystock",
          params: _serverParams
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
    },
    handleDownload() {
      const self = this;

      let _serverParams = {
        pageNumber: self.serverParams.pageNumber,
        pageSize: self.serverParams.pageSize,
        keyword: self.serverParams.keyword,
        dppu: self.serverParams.dppu,
        remarks: self.serverParams.remarks,
        startDate: self.serverParams.dateRange.startDate,
        endDate: self.serverParams.dateRange.endDate
      };
      self.$store
        .dispatch("apis/download", {
          url: `/sparepart/dailystock/export`,
          params: _serverParams
        })
        .then(response => {
          if (response.error) {
            self.$message.error({
              zIndex: 10000,
              message: response.message
            });
          } else {
            let fileURL = window.URL.createObjectURL(new Blob([response])),
              fileLink = document.createElement("a");

            fileLink.href = fileURL;
            fileLink.setAttribute("download", "DailyStock.xlsx");
            document.body.appendChild(fileLink);

            fileLink.click();
          }
        });
    }
  }
};
</script>
