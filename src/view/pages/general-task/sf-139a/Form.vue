<template>
  <fragment>
    <b-row class="mb-6">
      <b-col lg="12">
        <div class="card card-custom">
          <div class="card-header py-3">
            <div class="card-title align-items-start flex-column">
              <h3 class="card-label font-weight-bolder text-dark">
                <b-button
                  class="btn-icon mr-2"
                  size="xs"
                  @click="$router.go(-1)"
                >
                  <i class="flaticon2-back" />
                </b-button>
                {{ title }}
              </h3>
              <span class="text-muted font-weight-bold font-size-sm mt-1 pl-10">
                {{ subTitle }}
              </span>
            </div>
            <div class="card-toolbar">
              <b-button
                v-show="
                  currentProgress.locked && currentProgress.status == 'Approved'
                "
                variant="outline-primary"
                @click="handleExport"
              >
                Export to Excel
              </b-button>
              <b-button
                v-show="$route.name != route.form && !currentProgress.locked"
                variant="outline-danger"
                size="lg"
                class="mr-2"
                @click="handleDelete"
              >
                Delete
              </b-button>
              <b-button
                v-show="$route.name != route.form && !currentProgress.locked"
                variant="outline-primary"
                size="lg"
                class="mr-2"
                @click="handleSendApproval"
              >
                Save and Send Approval
              </b-button>
              <b-button
                v-show="!currentProgress.locked"
                variant="primary"
                size="lg"
                @click="handleSubmit"
              >
                {{ textButton }}
              </b-button>
            </div>
          </div>
          <b-row class="p-2">
            <div
              class="card-body"
              v-bind:class="!currentProgress.locked ? `ml-10 mr-10` : ``"
            >
              <template v-if="!currentProgress.locked">
                <b-row>
                  <b-col lg="6">
                    <Select
                      v-if="multipleDppu"
                      label="Depot Pengisian Pesawat Udara"
                      v-model="form.dppuId"
                      :v="$v.form.dppuId"
                      :options="options.dppu"
                      :useHorizontal="false"
                      :multiple="false"
                      :disabled="$route.name != route.form"
                      @input="changeDppu"
                    />
                  </b-col>
                </b-row>
                <b-row>
                  <b-col lg="6">
                    <InputText
                      label="Transaction #"
                      type="text"
                      v-model="form.transactionId"
                      :v="$v.form.transactionId"
                      :useHorizontal="false"
                      disabled
                    />
                  </b-col>
                  <b-col lg="6">
                    <InputText
                      label="Transaction Date"
                      type="date"
                      v-model="form.transactionDate"
                      :v="$v.form.transactionDate"
                      :max="getDate()"
                      :useHorizontal="false"
                    />
                  </b-col>
                </b-row>
                <b-row>
                  <b-col lg="3">
                    <Select
                      label="Nomor Polisi"
                      placeholder="Select Bridger"
                      v-model="form.bridgerId"
                      :v="$v.form.bridgerId"
                      :options="options.equipment"
                      :useHorizontal="false"
                      :multiple="false"
                      @input="changeEquipment"
                    />
                  </b-col>
                  <b-col lg="3">
                    <InputText
                      label="Jumlah Kompartemen"
                      type="number"
                      v-model="form.jumlahKompartemen"
                      :v="$v.form.jumlahKompartemen"
                      :useHorizontal="false"
                      disabled
                    />
                  </b-col>
                  <b-col lg="3">
                    <InputText
                      label="Masa Berlaku TERA Tangki"
                      type="date"
                      v-model="form.masaBerlakuTeraTangki"
                      :v="$v.form.masaBerlakuTeraTangki"
                      :useHorizontal="false"
                      disabled
                    />
                  </b-col>
                  <b-col lg="3">
                    <InputMoney
                      label="Volume"
                      v-model="form.volume"
                      :v="$v.form.volume"
                      :useHorizontal="false"
                      :usePrefix="false"
                      append="Liter"
                      disabled
                    />
                  </b-col>
                </b-row>
                <hr class="card-separator-50" />
                <b-row>
                  <b-col lg="12">
                    <h5 class="text-center font-weight-bolder mt-6 mb-6">
                      Pemeriksaan dan Pencatatan Minimal 10 Menit Setelah
                      Settling Time
                    </h5>
                  </b-col>
                  <b-col lg="6">
                    <h5 class="font-weight-bolder mb-6">
                      Jarak t1 Pada Dokumen Kalibrasi
                    </h5>
                    <fragment
                      v-for="(detail, index) in form.jumlahKompartemen"
                      v-bind:key="index"
                    >
                      <h6 class="font-weight-bolder">
                        {{ setKompartemen(index + 1) }}
                      </h6>
                      <b-row>
                        <b-col cols="6">
                          <InputMoney
                            label="Ullage"
                            :use-horizontal="false"
                            :usePrefix="false"
                            append="mm"
                            v-model="
                              form.details[index].atDokumenKalibrasi.ullage
                            "
                          />
                        </b-col>
                        <b-col cols="6">
                          <InputMoney
                            label="Temperature"
                            :use-horizontal="false"
                            :usePrefix="false"
                            append="°C"
                            v-model="
                              form.details[index].atDokumenKalibrasi.temperature
                            "
                          />
                        </b-col>
                      </b-row>
                    </fragment>
                    <TextArea
                      label="Remarks"
                      :use-horizontal="false"
                      v-model="form.remarks.dokumenKalibrasi"
                    />
                  </b-col>
                  <b-col lg="6">
                    <h5 class="font-weight-bolder mb-6">
                      Jarak Cairan Terhadap t1 (Ullage) @Supply Point
                    </h5>
                    <fragment
                      v-for="(detail, index) in form.jumlahKompartemen"
                      v-bind:key="index"
                    >
                      <h5 class="font-weight-bolder">
                        {{ setKompartemen(index + 1) }}
                      </h5>
                      <b-row>
                        <b-col cols="4">
                          <InputMoney
                            label="Ullage"
                            :use-horizontal="false"
                            :usePrefix="false"
                            append="mm"
                            v-model="form.details[index].atSupplyPoint.ullage"
                          />
                        </b-col>
                        <b-col cols="4">
                          <InputMoney
                            label="Density Observed"
                            :use-horizontal="false"
                            :usePrefix="false"
                            append="mm"
                            v-model="
                              form.details[index].atSupplyPoint.densityObserved
                            "
                          />
                        </b-col>
                        <b-col cols="4">
                          <InputMoney
                            label="Temperature"
                            :use-horizontal="false"
                            :usePrefix="false"
                            append="°C"
                            v-model="
                              form.details[index].atSupplyPoint.temperature
                            "
                          />
                        </b-col>
                      </b-row>
                    </fragment>
                    <TextArea
                      label="Remarks"
                      :use-horizontal="false"
                      v-model="form.remarks.supplyPoint"
                    />
                  </b-col>
                </b-row>
                <hr class="card-separator-50" />
                <b-row>
                  <b-col lg="12">
                    <h5 class="text-center font-weight-bolder mt-6 mb-6">
                      Pemeriksaan Oleh Security Sebelum Keluar Lokasi
                    </h5>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col lg="6">
                    <b-row>
                      <b-col lg="6">
                        <InputText
                          label="Bottom Loader Cover"
                          description="Nomor / Kode Segel"
                          type="text"
                          v-model="form.bottomLoaderCover"
                          :useHorizontal="false"
                        />
                      </b-col>
                      <b-col lg="6">
                        <InputText
                          label="Jam Keluar"
                          type="time"
                          v-model="form.jamKeluar"
                          :v="$v.form.jamKeluar"
                          :useHorizontal="false"
                        />
                      </b-col>
                    </b-row>
                  </b-col>
                  <b-col lg="6">
                    <InputText
                      label="Nama Security"
                      type="text"
                      v-model="form.namaSecurity"
                      :v="$v.form.namaSecurity"
                      :useHorizontal="false"
                    />
                  </b-col>
                </b-row>
                <b-row>
                  <fragment
                    v-for="(detail, index) in form.jumlahKompartemen"
                    v-bind:key="index"
                  >
                    <b-col lg="6">
                      <h6 class="font-weight-bolder">
                        {{ setKompartemen(index + 1) }}
                      </h6>
                      <b-row>
                        <b-col cols="6">
                          <InputText
                            label="Mainhole"
                            description="Nomor / Kode Segel"
                            type="text"
                            :use-horizontal="false"
                            v-model="form.details[index].mainhole"
                          />
                        </b-col>
                        <b-col cols="6">
                          <InputText
                            label="Bottom Loader Valve"
                            description="Nomor / Kode Segel"
                            type="text"
                            :use-horizontal="false"
                            v-model="form.details[index].bottomLoaderValve"
                          />
                        </b-col>
                      </b-row>
                    </b-col>
                  </fragment>
                </b-row>
              </template>
              <FormHeader
                v-else
                :form="form"
                :currentProgress="currentProgress"
                :content="content"
              />
            </div>
          </b-row>
        </div>
      </b-col>
    </b-row>
  </fragment>
</template>

<script>
import TemplateDocument from "./TemplateDocument.vue";
import FormHeader from "./FormHeader.vue";

import { mapGetters } from "vuex";
import { required, maxLength, minValue } from "vuelidate/lib/validators";
import {
  getDppu,
  changeDppu,
  numberFormat,
  getDate,
  dateFormat,
  dateTimeFormat,
  setKompartemen
} from "@/core/utils";

export default {
  components: {
    FormHeader
  },
  data: () => ({
    content: [],

    title:
      "139A SF - Formulir Pemeriksaan Bridger Masuk Keluar Lokasi Supply Point",
    route: {
      form: "sf139aCreate",
      table: "sf139a"
    },
    form: {
      dppu: {
        id: null,
        label: null
      },
      dppuId: null,
      transactionId: "Auto Generated",
      transactionDate: getDate(),
      bridgerId: null,
      nomorPolisi: null,
      jumlahKompartemen: 1,
      masaBerlakuTeraTangki: null,
      volume: 0,
      details: [
        {
          atDokumenKalibrasi: {
            ullage: 0,
            temperature: 0
          },
          atSupplyPoint: {
            ullage: 0,
            densityObserved: 0,
            temperature: 0
          },
          mainhole: null,
          bottomLoaderValve: null
        },
        {
          atDokumenKalibrasi: {
            ullage: 0,
            temperature: 0
          },
          atSupplyPoint: {
            ullage: 0,
            densityObserved: 0,
            temperature: 0
          },
          mainhole: null,
          bottomLoaderValve: null
        },
        {
          atDokumenKalibrasi: {
            ullage: 0,
            temperature: 0
          },
          atSupplyPoint: {
            ullage: 0,
            densityObserved: 0,
            temperature: 0
          },
          mainhole: null,
          bottomLoaderValve: null
        },
        {
          atDokumenKalibrasi: {
            ullage: 0,
            temperature: 0
          },
          atSupplyPoint: {
            ullage: 0,
            densityObserved: 0,
            temperature: 0
          },
          mainhole: null,
          bottomLoaderValve: null
        }
      ],
      bottomLoaderCover: null,
      jamKeluar: null,
      namaSecurity: null,
      remarks: {
        dokumenKalibrasi: null,
        supplyPoint: null
      },
      sendApproval: false,
      updatedBy: null,
      updatedAt: null
    },
    currentProgress: {
      locked: null,
      status: null,
      remarks: null,
      nextAction: {
        id: null,
        label: null
      }
    },
    options: {
      dppu: [],
      equipment: []
    }
  }),
  computed: {
    ...mapGetters("personalize", ["multipleDppu", "dppu", "sf139a"]),
    ...mapGetters("auth", ["user"]),
    subTitle() {
      const self = this;
      return self.$route.name != self.route.form
        ? "Update transaction"
        : "Create new transaction";
    },
    textButton() {
      const self = this;
      return self.$route.name != self.route.form ? "Update" : "Save";
    }
  },
  validations: {
    form: {
      dppuId: { required },
      transactionId: { required, maxLength: maxLength(50) },
      transactionDate: { required },
      bridgerId: { required },
      nomorPolisi: { required, maxLength: maxLength(9) },
      jumlahKompartemen: { required },
      masaBerlakuTeraTangki: { required },
      volume: { required, minValue: minValue(1) },
      namaSecurity: { required },
      jamKeluar: { required }
    }
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
      self.form.dppuId = self.dppu.id;
    }

    self.getEquipmentByCategory();

    if (self.$route.name != self.route.form) {
      self.get();
    }
  },
  methods: {
    dateFormat,
    numberFormat,
    getDate,
    setKompartemen,
    changeDppu,
    changeEquipment() {
      const self = this;

      self.form.nomorPolisi = null;
      self.form.jumlahKompartemen = 1;
      self.form.masaBerlakuTeraTangki = null;
      self.form.volume = null;

      let bridger = self.options.equipment.find(
        x => x.id == self.form.bridgerId
      );
      self.form.nomorPolisi = bridger.detail.code;
      self.form.jumlahKompartemen = bridger.detail.detail.jumlahKompartemen;
      self.form.masaBerlakuTeraTangki =
        bridger.detail.detail.masaBerlakuTeraTangki;
      self.form.volume = bridger.detail.detail.volume;
    },
    getEquipmentByCategory() {
      const self = this;

      self.$store
        .dispatch("apis/get", {
          url: `/equipment`,
          params: {
            dppu: self.form.dppuId,
            category: 8
          }
        })
        .then(response => {
          if (response.error) {
            self.$message.error({
              zIndex: 10000,
              message: response.message
            });
          } else {
            self.options.equipment = response.data.data.map(x => ({
              id: x.id,
              label: x.code,
              detail: x
            }));
          }
        });
    },
    get() {
      const self = this;

      let loader = self.$loading.show();
      self.$store
        .dispatch("apis/get", {
          url: `/board/standard-form/139a/${self.$route.params.id}`
        })
        .then(response => {
          if (response.error) {
            self.$message.error({
              zIndex: 10000,
              message: response.message
            });

            self.$router.push({ name: self.route.table });
          } else {
            response.data.details.forEach((item, index) => {
              self.form.details[index].mainhole = item.mainhole;
              self.form.details[index].bottomLoaderValve =
                item.bottomLoaderValve;
              self.form.details[index].atDokumenKalibrasi = {
                ullage: item.atDokumenKalibrasi.ullage,
                temperature: item.atDokumenKalibrasi.temperature
              };
              self.form.details[index].atSupplyPoint = {
                ullage: item.atSupplyPoint.ullage,
                densityObserved: item.atSupplyPoint.densityObserved,
                temperature: item.atSupplyPoint.temperature
              };
            });

            self.form.id = response.data.id;
            self.form.dppu = response.data.dppu;
            self.form.dppuId = response.data.dppu?.id;
            self.form.transactionId = response.data.transactionId;
            self.form.transactionDate = dateFormat(
              response.data.transactionDate,
              "YYYY-MM-DD"
            );
            self.form.bridgerId = response.data.bridgerId;
            self.form.nomorPolisi = response.data.nomorPolisi;
            self.form.jumlahKompartemen = response.data.jumlahKompartemen;
            self.form.masaBerlakuTeraTangki = dateFormat(
              response.data.masaBerlakuTeraTangki,
              "YYYY-MM-DD"
            );
            self.form.volume = response.data.volume;
            self.form.remarks = response.data.remarks;
            self.form.bottomLoaderCover = response.data.bottomLoaderCover;
            self.form.jamKeluar = dateFormat(response.data.jamKeluar, "HH:mm");
            self.form.namaSecurity = response.data.namaSecurity;
            self.form.updatedBy = response.data.updatedBy;
            self.form.updatedAt = response.data.updatedAt;

            self.currentProgress = {
              locked: response.data.currentProgress.locked,
              status: response.data.currentProgress.status,
              remarks: response.data.currentProgress.remarks,
              nextAction: {
                id: response.data.currentProgress.nextAction?.id,
                label: response.data.currentProgress.nextAction?.label
              }
            };

            self.content = [
              {
                template: TemplateDocument,
                props: {
                  form: self.form
                }
              }
            ];
          }
        })
        .finally(() => loader.hide());
    },
    handleSubmit() {
      const self = this;

      self.$v.form.$touch();
      if (self.$v.form.$pending || self.$v.form.$error) return;

      let _confirmText = "",
        _okText = "",
        _action = "",
        _url = "";

      if (self.$route.name == self.route.form) {
        _confirmText = "You are about to save this transaction. Are you sure ?";
        _okText = "Yes, Save";
        _action = "apis/post";
        _url = "/board/standard-form/139a";
      } else {
        _confirmText =
          "You are about to update this transaction. Are you sure ?";
        _okText = "Yes, Update";
        _action = "apis/put";
        _url = `/board/standard-form/139a/${self.$route.params.id}`;
      }

      let details = [];
      for (let index = 0; index < self.form.jumlahKompartemen; index++) {
        let detail = self.form.details[index];

        details.push({
          mainhole: detail.mainhole,
          bottomLoaderValve: detail.bottomLoaderValve,
          atDokumenKalibrasi: {
            ullage: detail.atDokumenKalibrasi.ullage,
            temperature: detail.atDokumenKalibrasi.temperature
          },
          atSupplyPoint: {
            ullage: detail.atSupplyPoint.ullage,
            densityObserved: detail.atSupplyPoint.densityObserved,
            temperature: detail.atSupplyPoint.temperature
          }
        });
      }

      let _form = {
        dppuId: self.form.dppuId,
        transactionDate: self.form.transactionDate,
        bridgerId: self.form.bridgerId,
        bottomLoaderCover: self.form.bottomLoaderCover,
        jamKeluar: dateTimeFormat(
          `${self.form.transactionDate} ${self.form.jamKeluar}`,
          "YYYY-MM-DD HH:mm:ss"
        ),
        namaSecurity: self.form.namaSecurity,
        details: details,
        remarks: self.form.remarks,
        sendApproval: false
      };

      self.$dialog
        .confirm(_confirmText, {
          okText: _okText,
          cancelText: "Cancel",
          loader: true
        })
        .then(dialog => {
          self.$store
            .dispatch(_action, {
              url: _url,
              params: _form
            })
            .then(response => {
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

                self.$router.go(-1);
              }
            })
            .finally(() => dialog.close());
        });
    },
    handleDelete() {
      const self = this;

      self.$dialog
        .confirm("You are about to delete this transaction. Are you sure ?", {
          okText: "Yes, Delete",
          cancelText: "Cancel",
          loader: true
        })
        .then(dialog => {
          self.$store
            .dispatch("apis/remove", {
              url: `/board/standard-form/139a/${self.$route.params.id}`
            })
            .then(response => {
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

                self.$router.go(-1);
              }
            })
            .finally(() => dialog.close());
        });
    },
    handleSendApproval() {
      const self = this;

      self.$v.form.$touch();
      if (self.$v.form.$pending || self.$v.form.$error) return;

      self.$dialog
        .confirm(
          "You are about to save & send approval this transaction. Are you sure ?",
          {
            okText: "Yes, Send",
            cancelText: "Cancel",
            loader: true
          }
        )
        .then(dialog => {
          let details = [];
          for (let index = 0; index < self.form.jumlahKompartemen; index++) {
            let detail = self.form.details[index];

            details.push({
              mainhole: detail.mainhole,
              bottomLoaderValve: detail.bottomLoaderValve,
              atDokumenKalibrasi: {
                ullage: detail.atDokumenKalibrasi.ullage,
                temperature: detail.atDokumenKalibrasi.temperature
              },
              atSupplyPoint: {
                ullage: detail.atSupplyPoint.ullage,
                densityObserved: detail.atSupplyPoint.densityObserved,
                temperature: detail.atSupplyPoint.temperature
              }
            });
          }

          let _form = {
            dppuId: self.form.dppuId,
            transactionDate: self.form.transactionDate,
            bridgerId: self.form.bridgerId,
            bottomLoaderCover: self.form.bottomLoaderCover,
            jamKeluar: dateTimeFormat(
              `${self.form.transactionDate} ${self.form.jamKeluar}`,
              "YYYY-MM-DD HH:mm:ss"
            ),
            namaSecurity: self.form.namaSecurity,
            details: details,
            remarks: self.form.remarks,
            sendApproval: true
          };

          self.$store
            .dispatch("apis/put", {
              url: `/board/standard-form/139a/${self.$route.params.id}`,
              params: _form
            })
            .then(response => {
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

                self.$router.go(-1);
              }
            })
            .finally(() => dialog.close());
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
              url: `/board/export/standard-form/139a/${self.$route.params.id}`
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
                fileLink.setAttribute("download", "139A.xlsx");
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
