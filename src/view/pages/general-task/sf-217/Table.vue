<template>
  <CardTable
    :backButton="true"
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
    @onSearch="onSearch"
  >
    <template #toolbar>
      <b-button variant="outline-primary" @click="handleExport" class="mr-2">
        Export to Excel
      </b-button>
      <b-button variant="primary" :to="{ name: 'sf217Create' }">
        Create New Transaction
      </b-button>
    </template>
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
          <date-range-picker
            v-model="serverParams.dateRange"
            style="width: 100%; cursor: pointer"
            opens="left"
            :locale-data="{ format: 'dd/mm/yyyy', separator: ' to ' }"
            control-container-class="form-control"
            @update="onFilter"
          />
        </b-col>
        <b-col xl="4">
          <b-form-input
            placeholder="Transaction #"
            autocomplete="off"
            v-model="serverParams.keyword"
            @change="onFilter"
          ></b-form-input>
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
      {{ dateFormat(data.value) }}
    </template>
    <template #cell(maxTestFlowRate)="data">
      {{ `${data.value} l/m/USGPM` }}
    </template>
    <template #cell(againstRigPressure)="data">
      {{ `${data.value} bar/psi` }}
    </template>
    <template #cell(opening)="data">
      <span v-html="setOption(data.value)" />
    </template>
    <template #cell(closing)="data">
      <span v-html="setOption(data.value)" />
    </template>
    <template #cell(overshoot)="data">
      <span v-html="setOption(data.value)" />
    </template>
  </CardTable>
</template>

<script>
import { mapGetters } from "vuex";
import { sf217 as columns } from "@/core/datasource/columns";
import {
  yearStart,
  getDate,
  getDppu,
  dateFormat,
  setOption
} from "@/core/utils";

import DateRangePicker from "vue2-daterange-picker";
import "vue2-daterange-picker/dist/vue2-daterange-picker.css";

export default {
  components: {
    DateRangePicker
  },
  data: () => ({
    title: "217 SF",
    subTitle: "Deadman Valve Test",
    searchText: "Search by transaction #",
    serverParams: {
      pageNumber: 1,
      pageSize: 20,
      keyword: null,
      dppuId: null,
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
      dppu: []
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
    dateFormat,
    setOption,
    updateParams(newProps) {
      this.serverParams = Object.assign({}, this.serverParams, newProps);
    },
    onRowSelected(items) {
      const self = this;
      self.$router.push({
        name: "sf217Update",
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

      let _serverParams = {
        pageNumber: self.serverParams.pageNumber,
        pageSize: self.serverParams.pageSize,
        keyword: self.serverParams.keyword,
        dppuId: self.serverParams.dppuId,
        startDate: self.serverParams.dateRange.startDate,
        endDate: self.serverParams.dateRange.endDate
      };
      self.table.isLoading = true;
      self.$store
        .dispatch("apis/get", {
          url: "/board/standard-form/217",
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
    handleExport() {
      const self = this;

      self.$dialog
        .confirm("You are about to export this transaction. Are you sure ?", {
          okText: "Yes, Export",
          cancelText: "Cancel",
          loader: true
        })
        .then(dialog => {
          self.$store
            .dispatch("apis/download", {
              url: `/board/export/standard-form/217?dppuId=${self.serverParams.dppuId}&startDate=${self.serverParams.dateRange.startDate}&endDate=${self.serverParams.dateRange.endDate}`
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
                fileLink.setAttribute("download", "217.xlsx");
                document.body.appendChild(fileLink);

                fileLink.click();
              }
            })
            .finally(() => dialog.close());
        });
    }
  }
};
</script>
