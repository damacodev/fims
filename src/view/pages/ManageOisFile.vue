<template>
  <Fragment>
    <CardTable
      ref="CardTable"
      :title="title"
      :subTitle="subTitle"
      :columns="table.columns"
      :rows="table.rows"
      :isLoading="table.isLoading"
      :pageSize="serverParams.pageSize"
      :pageNumber="serverParams.pageNumber"
      :totalPage="table.totalPage"
      :totalRecords="table.totalRecords"
      @onPerPageChange="onPerPageChange"
      @onPageChange="onPageChange"
    >
      <template #toolbar>
        <b-button-group>
          <b-button variant="primary" @click="handleOpenForm">
            Import Excel File
          </b-button>
        </b-button-group>
      </template>
      <template #search>
        <div class="ml-2 mr-2 mb-2">
          <date-range-picker
            v-model="serverParams.dateRange"
            style="width: 100%; cursor: pointer"
            opens="center"
            :locale-data="{ format: 'dd/mm/yyyy', separator: ' to ' }"
            control-container-class="form-control"
            @update="onDateChange"
          />
        </div>
      </template>
      <template #filter>
        <b-row class="p-3">
          <b-col xl="6">
            <b-form-input
              placeholder="Keyword"
              autocomplete="off"
              v-model="serverParams.keyword"
              @input="changeKeyword"
            />
          </b-col>
          <b-col xl="6">
            <treeselect
              class="mb-2"
              placeholder="Select DPPU"
              v-model="serverParams.dppuId"
              :options="options.dppu"
              @input="changeDppu"
            ></treeselect>
          </b-col>
        </b-row>
      </template>
      <template #empty>
        <EmptyTable
          title="OIS File are managed from here"
          description="You can see about OIS File data"
        />
      </template>
      <template #cell(giDate)="data">
        {{ dateFormat(data.item.giDate) }}
      </template>
      <template #cell(meter1StartTime)="data">
        {{ dateFormat(data.item.meter1StartTime, "HH:mm") }}
      </template>
      <template #cell(used)="data">
        <span v-show="data.item.used" class="text-success">Used</span>
        <span v-show="!data.item.used" class="text-danger">Not Use</span>
      </template>
    </CardTable>
    <b-modal
      v-model="modalForm.dialog"
      title="Import"
      ok-title="Import"
      ok-variant="primary"
      :no-close-on-backdrop="true"
      :no-close-on-esc="true"
      @ok="handleImport"
      @cancel="resetModalForm"
    >
      <b-form-group description="Support for Excel File (xls, xlsx)">
        <b-form-file
          v-model="modalForm.file"
          accept=".xls,.xlsx"
          @input="handleChangeFile"
        />
      </b-form-group>
    </b-modal>
  </Fragment>
</template>

<script>
import { mapGetters } from "vuex";
import { oisFile as columns } from "@/core/datasource/columns";
import { getDate, getDppu, dateFormat, pageSize } from "@/core/utils";

import DateRangePicker from "vue2-daterange-picker";
import "vue2-daterange-picker/dist/vue2-daterange-picker.css";

export default {
  components: {
    DateRangePicker
  },
  data: () => ({
    title: "Manage OIS File",
    subTitle: "Display all OIS File data",
    searchText: "Search by delivery number",
    serverParams: {
      dppuId: null,
      pageNumber: null,
      pageSize: null,
      keyword: null,
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
      dppu: []
    },
    modalForm: {
      dialog: false,
      file: null,
      fileName: "",
      fileContent: null
    }
  }),
  computed: {
    ...mapGetters("personalize", ["multipleDppu", "dppu"])
  },
  mounted() {
    const self = this;

    self.serverParams.pageNumber = self.$route.query.pageNumber ?? 1;
    self.serverParams.pageSize = self.$route.query.pageSize ?? pageSize;
    self.serverParams.dppuId = self.$route.query.dppuId;
    self.serverParams.keyword = self.$route.query.keyword;
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
  },
  watch: {
    $route() {
      this.getAll();
    }
  },
  methods: {
    dateFormat,
    updateParams(newProps) {
      const self = this;
      let query = self.$route.query;
      query = Object.assign({}, query, newProps);

      self.$router.push({ query });
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
    changeKeyword() {
      const self = this;
      self.updateParams({ keyword: self.serverParams.keyword });
    },
    changeDppu() {
      const self = this;
      self.updateParams({ dppuId: self.serverParams.dppuId });
    },
    onDateChange() {
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
          url: "/ois",
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
    handleChangeFile() {
      const self = this;

      self.modalForm.fileName = self.modalForm.file.name;

      let reader = new FileReader();
      reader.addEventListener("load", readerLoadEvent => {
        self.modalForm.fileContent = Array.from(
          new Uint8Array(readerLoadEvent.target.result)
        );
      });
      reader.readAsArrayBuffer(self.modalForm.file);
    },
    resetModalForm() {
      const self = this;

      self.modalForm.dialog = false;
      self.modalForm.file = null;
      self.modalForm.fileName = "";
      self.modalForm.fileContent = null;
    },
    handleOpenForm() {
      const self = this;

      self.resetModalForm();
      self.modalForm.dialog = true;
    },
    handleImport(event) {
      event.preventDefault();

      const self = this;

      self.$dialog
        .confirm("You are about to import these OIS file. Are you sure ?", {
          okText: "Yes, Import",
          cancelText: "Cancel",
          loader: true
        })
        .then(dialog => {
          self.$store
            .dispatch("apis/post", {
              url: "/ois/import",
              params: {
                fileName: self.modalForm.fileName,
                fileContent: self.modalForm.fileContent
              }
            })
            .then(response => {
              dialog.close();
              if (response.error) {
                self.$message.error({
                  zIndex: 10000,
                  message: response.message
                });
              } else {
                self.$message.success({
                  zIndex: 10000,
                  message: response.message
                });
                self.resetModalForm();
                self.getAll();
              }
            });
        });
    }
  }
};
</script>
