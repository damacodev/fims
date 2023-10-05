<template>
  <div class="card card-custom">
    <div class="card-header py-3">
      <div class="card-title align-items-start flex-column">
        <h3 class="card-label font-weight-bolder text-dark">{{ title }}</h3>
        <span class="text-muted font-weight-bold font-size-sm mt-1">
          {{ subTitle }}
        </span>
      </div>
      <div class="card-toolbar">
        <a
          href="/template/dppu.xlsx"
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
        <b-col offset-lg="7" lg="5">
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
              title="Potential duplicates"
            >
              <i class="fas fa-times text-danger"></i>
            </b-button>
            <span
              class="is-link"
              v-b-tooltip.hover
              title="Before clicking this button, make sure again if this data is not duplicated"
              @click="handleUpload(data.item)"
            >
              Upload
            </span>
          </div>
        </template>
        <template #cell(operatingHours)="data">
          {{
            `${data.item.operatingHours.start} - ${data.item.operatingHours.end}`
          }}
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
          <b-card>
            <b-row>
              <b-col lg="6">
                <b-row class="mb-2">
                  <b-col sm="6" class="text-sm-right"><b>Plant Code:</b></b-col>
                  <b-col>{{ row.item.plant }}</b-col>
                </b-row>
                <b-row class="mb-2">
                  <b-col sm="6" class="text-sm-right"><b>Main Plant:</b></b-col>
                  <b-col>{{
                    row.item.mainDppu != null ? row.item.mainDppu.label : "-"
                  }}</b-col>
                </b-row>
                <b-row class="mb-2">
                  <b-col sm="6" class="text-sm-right"><b>Land Area:</b></b-col>
                  <b-col>{{ row.item.landArea }} m2</b-col>
                </b-row>
                <b-row class="mb-2">
                  <b-col sm="6" class="text-sm-right"
                    ><b>Land Status:</b></b-col
                  >
                  <b-col>{{ row.item.landStatus }}</b-col>
                </b-row>
                <b-row class="mb-2">
                  <b-col sm="6" class="text-sm-right"
                    ><b>Type of Supply:</b></b-col
                  >
                  <b-col>{{ row.item.supplyType }}</b-col>
                </b-row>
                <b-row class="mb-2">
                  <b-col sm="6" class="text-sm-right"
                    ><b>Supply Point:</b></b-col
                  >
                  <b-col>{{ row.item.supplyPoint }}</b-col>
                </b-row>
                <b-row class="mb-2">
                  <b-col sm="6" class="text-sm-right"
                    ><b>Supply Point Distance:</b></b-col
                  >
                  <b-col>{{ row.item.supplyPointDistance }} km</b-col>
                </b-row>
              </b-col>
              <b-col lg="6">
                <b-row class="mb-2">
                  <b-col sm="3" class="text-sm-right"><b>Address:</b></b-col>
                  <b-col>{{ row.item.address }}</b-col>
                </b-row>
                <b-row class="mb-2">
                  <b-col sm="3" class="text-sm-right"><b>City:</b></b-col>
                  <b-col>{{ row.item.city }}</b-col>
                </b-row>
                <b-row class="mb-2">
                  <b-col sm="3" class="text-sm-right"><b>Phone:</b></b-col>
                  <b-col>{{
                    row.item.phone != null
                      ? row.item.phone.formattedNumber
                      : "-"
                  }}</b-col>
                </b-row>
                <b-row class="mb-2">
                  <b-col sm="3" class="text-sm-right"><b>Fax:</b></b-col>
                  <b-col>{{
                    row.item.fax != null ? row.item.fax.formattedNumber : "-"
                  }}</b-col>
                </b-row>
                <b-row class="mb-2">
                  <b-col sm="3" class="text-sm-right"><b>Email:</b></b-col>
                  <b-col>{{ row.item.email }}</b-col>
                </b-row>
              </b-col>
            </b-row>
          </b-card>
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
import { importDppu as columns } from "@/core/datasource/columns";

export default {
  data: () => ({
    title: "Depot Pengisian Pesawat Udara (DPPU)",
    subTitle: "Import DPPU using Excel file",
    searchText: "Search DPPU by name",
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
        .confirm("You are about to import these DPPU. Are you sure ?", {
          okText: "Yes, Import",
          cancelText: "Cancel",
          loader: true
        })
        .then(dialog => {
          self.$store
            .dispatch("apis/post", {
              url: "/dppu/import",
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
    },
    handleUpload(params) {
      const self = this;

      let _form = {
        regionId: params.region.id,
        name: params.name,
        type: params.type,
        phone: params.phone,
        fax: params.fax,
        email: params.email,
        operatingHours: params.operatingHours,
        actived: params.actived,
        plant: params.plant,
        iata: params.iata,
        icao: params.icao,
        mainDppuId: params.mainDppu?.id ?? null,
        supplyType: params.supplyType,
        supplyPoint: params.supplyPoint,
        supplyPointDistance: params.supplyPointDistance,
        address: params.address,
        city: params.city,
        landArea: params.landArea,
        landStatus: params.landStatus,
        latitude: params.latitude,
        longitude: params.longitude
      };

      self.$dialog
        .confirm("You are about to upload this DPPU. Are you sure ?", {
          okText: "Yes, Upload",
          cancelText: "Cancel",
          loader: true
        })
        .then(dialog => {
          self.$store
            .dispatch("apis/post", {
              url: `/dppu/${params.id}`,
              params: _form
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

                let index = self.table.rows.findIndex(x => x.id == params.id);
                self.table.rows[index].uploaded = true;
              }
            });
        });
    }
  }
};
</script>
