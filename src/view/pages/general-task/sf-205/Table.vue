<template>
  <fragment>
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
        <b-button
          variant="outline-primary"
          @click="openModalExport"
          class="mr-2"
        >
          Export to Excel
        </b-button>
        <b-button variant="primary" :to="{ name: 'sf205Create' }">
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
              @input="onFilter"
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
              placeholder="Equipment"
              v-model="serverParams.equipmentId"
              :async="true"
              :loadOptions="getEquipmentByCategory"
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
        />
      </template>
      <template #cell(transactionDate)="data">
        {{ dateFormat(data.value) }}
      </template>
      <template #cell(reel.front)="data">
        <span v-html="setOption(data.value)"></span>
      </template>
      <template #cell(reel.rear)="data">
        <span v-html="setOption(data.value)"></span>
      </template>
      <template #cell(deck.left)="data">
        <span v-html="setOption(data.value)"></span>
      </template>
      <template #cell(deck.right)="data">
        <span v-html="setOption(data.value)"></span>
      </template>
      <template #cell(overwingNozzle)="data">
        <span v-html="setOption(data.value)"></span>
      </template>
    </CardTable>
    <b-modal
      v-model="modalForm.export"
      title="Export to Excel"
      ok-title="Export"
      :no-close-on-backdrop="true"
      :no-close-on-esc="true"
      @ok="handleExport"
    >
      <InputText
        label="Period"
        type="number"
        v-model="modalForm.period"
        :useHorizontal="false"
      />
      <Select
        ref="Equipment"
        label="Equipment"
        placeholder="Select Equipment"
        v-model="modalForm.equipmentId"
        :useHorizontal="false"
        :async="true"
        :multiple="false"
        :loadOptions="getEquipmentByCategory"
      />
    </b-modal>
  </fragment>
</template>

<script>
import { ASYNC_SEARCH } from "@riophae/vue-treeselect";
import { mapGetters } from "vuex";
import { sf205 as columns } from "@/core/datasource/columns";
import { standardFormStatus } from "@/core/datasource/options";
import {
  startDate,
  getDate,
  getDppu,
  dateFormat,
  normalizer,
  isNullOrEmpty,
  setOption
} from "@/core/utils";

import DateRangePicker from "vue2-daterange-picker";
import "vue2-daterange-picker/dist/vue2-daterange-picker.css";

export default {
  components: {
    DateRangePicker
  },
  data: () => ({
    title: "205 SF",
    subTitle: "Hose-End Strainer Check",
    searchText: "Search by transaction #",
    serverParams: {
      pageNumber: 1,
      pageSize: 20,
      keyword: null,
      equipmentId: null,
      dppuId: null,
      status: null,
      dateRange: {
        startDate: startDate(),
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
      standardFormStatus
    },
    modalForm: {
      export: false,
      period: null,
      equipmentId: null
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
    isNullOrEmpty,
    setOption,
    updateParams(newProps) {
      this.serverParams = Object.assign({}, this.serverParams, newProps);
    },
    onRowSelected(items) {
      const self = this;
      self.$router.push({
        name: "sf205Update",
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
        status: self.serverParams.status,
        startDate: self.serverParams.dateRange.startDate,
        endDate: self.serverParams.dateRange.endDate
      };
      self.table.isLoading = true;
      self.$store
        .dispatch("apis/get", {
          url: "/board/standard-form/205",
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
    openModalExport() {
      const self = this;
      self.modalForm.export = true;
      self.modalForm.period = dateFormat(
        self.serverParams.dateRange.startDate,
        "yyyy"
      );
      self.modalForm.equipmentId = self.serverParams.equipmentId;
    },
    handleExport(event) {
      event.preventDefault();
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
              url: `/board/export/standard-form/205?dppuId=${
                self.serverParams.dppuId
              }&year=${self.modalForm.period.substr(0, 4)}&equipmentId=${
                self.modalForm.equipmentId
              }`
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
                fileLink.setAttribute("download", "205.xlsx");
                document.body.appendChild(fileLink);

                fileLink.click();
              }
            })
            .finally(() => {
              self.modalForm.export = false;
              self.modalForm.period = null;
              self.modalForm.equipmentId = null;
              dialog.close();
            });
        });
    },
    getEquipmentByCategory({ action, searchQuery, callback }) {
      const self = this;

      if (action === ASYNC_SEARCH) {
        self.$store
          .dispatch("apis/get", {
            url: `/equipment`,
            params: {
              dppu: self.serverParams.dppuId,
              pageNumber: 1,
              pageSize: 20,
              category: 6,
              keyword: searchQuery,
              actived: true
            }
          })
          .then(response => {
            if (response.error) {
              self.$message.error({
                zIndex: 10000,
                message: response.message
              });
            } else {
              callback(
                null,
                response.data.data.map(x => ({
                  id: x.id,
                  label: x.code
                }))
              );
            }
          });
      }
    }
  }
};
</script>
