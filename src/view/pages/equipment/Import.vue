<template>
  <div class="card card-custom">
    <div class="card-header py-3">
      <div class="card-title align-items-start flex-column">
        <h3 class="card-label font-weight-bolder text-dark">
          {{ category.text }}
        </h3>
        <span class="text-muted font-weight-bold font-size-sm mt-1">
          {{ subTitle }}
        </span>
      </div>
      <div class="card-toolbar">
        <a
          href="/template/equipment.xlsx"
          class="btn btn-outline-primary btn-lg mr-2"
          target="_blank"
        >
          Download Example
        </a>
        <b-button variant="secondary" size="lg" @click="$router.go(-1)">
          Back
        </b-button>
      </div>
    </div>
    <div class="min-card-h">
      <b-row class="p-2">
        <b-col lg="7">
          <b-row v-if="table.rows.length > 0">
            <b-col sm="4">
              <ImportNumber
                type="success"
                icon="Files/Export.svg"
                :detail="{
                  text: 'Total Rows',
                  value: table.rows.length
                }"
              />
            </b-col>
            <b-col sm="4">
              <ImportNumber
                type="success"
                icon="Code/Done-circle.svg"
                :detail="{
                  text: 'Success',
                  value: table.rows.filter(x => x.uploaded).length
                }"
              />
            </b-col>
            <b-col sm="4">
              <ImportNumber
                type="danger"
                icon="Code/Error-circle.svg"
                :detail="{
                  text: 'Failed',
                  value: table.rows.filter(x => !x.uploaded).length
                }"
              />
            </b-col>
          </b-row>
        </b-col>
        <b-col lg="5">
          <b-form-group
            description="Support for Excel File (xls, xlsx)"
            class="m-0"
          >
            <b-form-file
              v-model="form.file"
              accept=".xls,.xlsx"
              @input="handleImport"
            ></b-form-file>
          </b-form-group>
        </b-col>
      </b-row>
      <b-table
        responsive
        sticky-header="650px"
        head-variant="light"
        :busy="table.isLoading"
        :fields="table.columns"
        :items="table.rows"
      >
        <template #table-busy>
          <div class="text-center empty">
            <b-button variant="primary" disabled>
              <b-spinner small type="grow"></b-spinner>
              Loading...
            </b-button>
          </div>
        </template>
        <template #cell(uploaded)="data">
          <b-button
            v-if="data.item.uploaded"
            variant="light"
            size="sm"
            class="btn-icon"
            v-b-tooltip.hover
            title="Uploaded"
          >
            <i class="fas fa-check text-success"></i>
          </b-button>
          <div v-else-if="!data.item.uploaded">
            <b-button
              variant="light"
              size="sm"
              class="btn-icon mr-2"
              v-b-tooltip.hover
              title="Duplicate/DPPU not found"
            >
              <i class="fas fa-times text-danger"></i>
            </b-button>
          </div>
        </template>
        <template #cell(details)="row">
          <b-button
            size="sm"
            @click="row.toggleDetails"
            class="mr-2"
            variant="outline-secondary"
          >
            {{ row.detailsShowing ? "Hide" : "Show" }} Details
          </b-button>
        </template>
        <template #row-details="row">
          <Category1Detail
            v-if="category.value == 1"
            :detail="row.item.detail"
          />
          <Category3Detail
            v-else-if="category.value == 3"
            :detail="row.item.detail"
          />
          <Category4Detail
            v-else-if="category.value == 4"
            :detail="row.item.detail"
          />
          <Category5Detail
            v-else-if="category.value == 5"
            :detail="row.item.detail"
          />
          <Category6Detail
            v-else-if="category.value == 6"
            :detail="row.item.detail"
          />
          <Category7Detail
            v-else-if="category.value == 7"
            :detail="row.item.detail"
          />
        </template>
      </b-table>
      <EmptyTable
        v-if="table.rows.length == 0"
        title="Imported files will be displayed here"
        description="Please choose your Excel file first"
      />
    </div>
  </div>
</template>

<script>
import ImportNumber from "./ImportNumber.vue";
import Category1Detail from "./Category1Detail.vue";
import Category3Detail from "./Category3Detail.vue";
import Category4Detail from "./Category4Detail.vue";
import Category5Detail from "./Category5Detail.vue";
import Category6Detail from "./Category6Detail.vue";
import Category7Detail from "./Category7Detail.vue";
import { category } from "@/core/datasource/options";
import { importEquipment as columns } from "@/core/datasource/columns";

export default {
  components: {
    ImportNumber,
    Category1Detail,
    Category3Detail,
    Category4Detail,
    Category5Detail,
    Category6Detail,
    Category7Detail
  },
  data: () => ({
    title: "Equipment",
    subTitle: "Import equipment using Excel file",
    searchText: "Search equipment by code",
    serverParams: {
      pageNumber: 1,
      pageSize: 20,
      keyword: null,
      name: null
    },
    table: {
      isLoading: false,
      columns,
      rows: [],
      totalPage: 0,
      totalRecords: 0
    },
    form: {
      file: null,
      fileName: "",
      fileContent: null
    }
  }),
  computed: {
    category() {
      const self = this;
      return category.find(x => x.value == self.$route.params.category);
    }
  },
  // mounted() {
  //   this.table.rows = [
  //     {
  //       uploaded: false,
  //       id: "3a13407b-6751-41e1-9bae-2458535fcf17",
  //       region: {
  //         id: 8,
  //         label: "Region VIII",
  //       },
  //       dppu: {
  //         id: "fff7a6c0-2af6-4d13-ba19-ccdda483aa17",
  //         label: "DEO Sorong",
  //       },
  //       category: {
  //         id: 1,
  //         label: "Automation & Field Instrument",
  //       },
  //       code: "MOV 201A",
  //       detail: {
  //         modulPm: "SOQ-MOV-201A/00",
  //         type: "MOV",
  //         dimensions: 8.0,
  //         location: "Inlet Tangki T-201",
  //         manufacturer: "Rotork",
  //         typeOfAtg: "IQ20",
  //         serialNumber: "SG97530101",
  //         model: "IQ3",
  //         automationIntegrated: true,
  //         yearOfManufacture: 2019,
  //         remarks: "Belum BASTP - II",
  //       },
  //       actived: true,
  //       createdBy: {
  //         id: "49f819a4-d1bc-4d79-9d56-742f5244aff8",
  //         label: "Habibullah",
  //       },
  //     },
  //   ];
  // },
  methods: {
    handleImport() {
      const self = this;

      self.form.fileName = self.form.file.name;

      let reader = new FileReader();
      reader.addEventListener("load", readerLoadEvent => {
        self.form.fileContent = Array.from(
          new Uint8Array(readerLoadEvent.target.result)
        );
      });
      reader.readAsArrayBuffer(self.form.file);

      self.$dialog
        .confirm(
          `You are about to import these ${self.category.text}. Are you sure ?`,
          {
            okText: "Yes, Import",
            cancelText: "Cancel",
            loader: true
          }
        )
        .then(dialog => {
          self.$store
            .dispatch("apis/post", {
              url: `/equipment/import/${self.$route.params.category}`,
              params: {
                fileName: self.form.fileName,
                fileContent: self.form.fileContent
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
                self.table.rows = response.data;
              }
            });
        });
    }
  }
};
</script>
