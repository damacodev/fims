<template>
  <CardTable
    :backButton="true"
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
      <b-button variant="primary" :to="{ name: 'sf103Create' }">
        Create New Transaction
      </b-button>
    </template>
    <template #search>
      <div class="ml-2 mr-2 mb-2">
        <date-range-picker
          v-model="serverParams.dateRange"
          style="width: 100%; cursor: pointer"
          opens="left"
          :locale-data="{ format: 'dd/mm/yyyy', separator: ' to ' }"
          control-container-class="form-control"
          @update="onFilter"
        />
      </div>
    </template>
    <template #filter>
      <b-row class="p-3">
        <b-col xl="3">
          <treeselect
            class="mb-2"
            placeholder="Select DPPU"
            v-model="serverParams.dppuId"
            :options="options.dppu"
            @input="changeDppu"
          ></treeselect>
        </b-col>
        <b-col xl="3">
          <b-form-input
            placeholder="Transaction #"
            autocomplete="off"
            v-model="serverParams.keyword"
            @change="onFilter"
          ></b-form-input>
        </b-col>
        <b-col xl="3">
          <treeselect
            class="mb-2"
            placeholder="Select Shift"
            v-model="serverParams.shiftId"
            :options="options.shift"
            @input="onFilter"
          ></treeselect>
        </b-col>
        <b-col xl="3">
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
        button-label="Create New Transaction"
        :href="{ name: 'sf103Create' }"
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
import { sf103 as columns } from "@/core/datasource/columns";
import { standardFormStatus } from "@/core/datasource/options";
import {
  yearStart,
  getDate,
  getDppu,
  dateFormat,
  normalizer
} from "@/core/utils";

import DateRangePicker from "vue2-daterange-picker";
import "vue2-daterange-picker/dist/vue2-daterange-picker.css";

export default {
  components: {
    DateRangePicker
  },
  data: () => ({
    title: "103 SF",
    subTitle: "Bridger Quality Control Before Receipt Record",
    searchText: "Search by transaction #",
    serverParams: {
      pageNumber: 1,
      pageSize: 20,
      keyword: null,
      dppuId: null,
      shiftId: null,
      status: null,
      dateRange: {
        startDate: yearStart(),
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
      shift: [],
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
      self.changeDppu();
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
        name: "sf103Update",
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
    changeDppu() {
      const self = this;

      self.serverParams.shiftId = null;
      self.options.shift = [];
      if (self.serverParams.dppuId != null) {
        self.$store
          .dispatch("apis/get", {
            url: `/dppu/${self.serverParams.dppuId}`
          })
          .then(response => {
            if (response.error) {
              self.$message.error({
                zIndex: 10000,
                message: response.message
              });
            } else {
              self.options.shift = response.data.shifts.map(x => ({
                id: x.id,
                label: `${x.shiftCallSign} (${x.workingTime.start} - ${x.workingTime.end})`
              }));
            }
          });
      }

      self.getAll();
    },
    getAll() {
      const self = this;

      let _serverParams = {
        pageNumber: self.serverParams.pageNumber,
        pageSize: self.serverParams.pageSize,
        keyword: self.serverParams.keyword,
        dppuId: self.serverParams.dppuId,
        shiftId: self.serverParams.shiftId,
        status: self.serverParams.status,
        startDate: self.serverParams.dateRange.startDate,
        endDate: self.serverParams.dateRange.endDate
      };
      self.table.isLoading = true;
      self.$store
        .dispatch("apis/get", {
          url: "/board/standard-form/103",
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
    }
  }
};
</script>
