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
                v-show="currentProgress.locked"
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
                  <b-col lg="6">
                    <InputText
                      label="Supply Point"
                      type="text"
                      v-model="form.supplyPoint"
                      :useHorizontal="false"
                    />
                  </b-col>
                  <b-col lg="3">
                    <Select
                      label="Nomor Polisi"
                      placeholder="Select Bridger"
                      v-model="form.bridgerId"
                      :options="options.equipment"
                      :useHorizontal="false"
                      :multiple="false"
                      @input="changeEquipment"
                    />
                  </b-col>
                  <b-col lg="3">
                    <InputText
                      label="Nama Pengemudi"
                      type="text"
                      v-model="form.namaPengemudi"
                      :useHorizontal="false"
                    />
                  </b-col>
                  <!-- <b-col lg="12">
                    <RadioGroup
                      label="Jumlah Kompartemen"
                      v-model="form.jumlahKompartemen"
                      :options="options.kompartemen"
                      :useHorizontal="false"
                      disabled
                      @onInput="calculateKlaim"
                    />
                  </b-col> -->
                </b-row>
                <b-row>
                  <b-col lg="3">
                    <InputText
                      label="Jumlah Kompartemen"
                      type="number"
                      v-model="form.jumlahKompartemen"
                      :v="$v.form.jumlahKompartemen"
                      :useHorizontal="false"
                      disabled
                      @onInput="calculateKlaim"
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
                    />
                  </b-col>
                  <b-col lg="3">
                    <InputMoney
                      label="Harga Avtur (Include tax)"
                      v-model="form.harga"
                      :v="$v.form.harga"
                      :useHorizontal="false"
                      :precision="2"
                      append="/Liter"
                      @onBlur="handleUpdateCache"
                    />
                  </b-col>
                </b-row>
                <b-row>
                  <b-col lg="3">
                    <InputText
                      label="Bottom Loader Cover"
                      description="Nomor / Kode Segel"
                      type="text"
                      v-model="form.bottomLoaderCover"
                      :useHorizontal="false"
                    />
                  </b-col>
                  <b-col lg="3">
                    <RadioGroup
                      label="Kondisi Kompartemen"
                      description="Setelah Discharge"
                      v-model="form.kondisiKompartemen"
                      :options="options.dryCheck"
                      :useHorizontal="false"
                    />
                  </b-col>
                  <b-col lg="6">
                    <b-row>
                      <b-col lg="6">
                        <InputText
                          label="Jam Masuk"
                          type="time"
                          v-model="form.jamMasuk"
                          :v="$v.form.jamMasuk"
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
                </b-row>
              </template>
              <FormHeader
                v-else
                :form="form"
                :currentProgress="currentProgress"
              />
            </div>
          </b-row>
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col
        v-for="(detail, index) in form.jumlahKompartemen"
        v-bind:key="index"
        :lg="!currentProgress.locked ? 12 : 6"
        class="mb-6"
      >
        <FormPemeriksaan
          v-if="!currentProgress.locked"
          :title="`Kompartemen ${index + 1}`"
          :form="form.details[index]"
          :options="options"
          @onCalculateKlaim="calculateKlaim"
        />
        <FormPemeriksaanPlain
          v-else
          :title="`Kompartemen ${index + 1}`"
          :form="form.details[index]"
        />
      </b-col>
      <b-col :lg="!currentProgress.locked ? 12 : 6">
        <FormKlaim
          v-if="!currentProgress.locked"
          :form="form"
          @onUpdateCache="handleUpdateCache"
        />
        <FormKlaimPlain v-else :form="form" />
      </b-col>
    </b-row>

    <b-modal
      v-model="modalRitase.show"
      title="Ritase"
      :hide-footer="true"
      :no-close-on-backdrop="true"
      :no-close-on-esc="true"
    >
      <p>
        Bridger record with Nomor Polisi
        <strong>{{ modalRitase.bridgerNo }}</strong> was found in SF103. Please
        select one.
      </p>
      <b-button
        v-for="(record, index) in modalRitase.records"
        v-bind:key="index"
        class="mr-2"
        size="sm"
        variant="outline-success"
        @click="selectRitase(record)"
      >
        Ritase {{ record.ritase }}
      </b-button>
    </b-modal>
  </fragment>
</template>

<script>
import FormHeader from "./FormHeader.vue";
import FormPemeriksaan from "./FormPemeriksaan.vue";
import FormPemeriksaanPlain from "./FormPemeriksaanPlain.vue";
import FormKlaim from "./FormKlaim.vue";
import FormKlaimPlain from "./FormKlaimPlain.vue";

import { mapGetters } from "vuex";
import { required, maxLength, minValue } from "vuelidate/lib/validators";
import { kompartemen, dryCheck } from "@/core/datasource/options";
import {
  getDppu,
  changeDppu,
  numberFormat,
  getDate,
  dateFormat,
  dateTimeFormat
} from "@/core/utils";

export default {
  components: {
    FormHeader,
    FormPemeriksaan,
    FormPemeriksaanPlain,
    FormKlaim,
    FormKlaimPlain
  },
  data: () => ({
    title:
      "139B SF - Formulir Pemeriksaan Bridger Masuk Keluar Lokasi Penerima",
    route: {
      form: "sf139bCreate",
      table: "sf139b"
    },
    form: {
      dppu: {
        id: null,
        label: null
      },
      dppuId: null,
      transactionId: "Auto Generated",
      transactionDate: getDate(),
      supplyPoint: null,
      bridgerId: null,
      nomorPolisi: null,
      jumlahKompartemen: 1,
      masaBerlakuTeraTangki: null,
      volume: 0,
      harga: 0,
      bottomLoaderCover: null,
      kondisiKompartemen: "Kering",
      jamMasuk: null,
      jamKeluar: null,
      details: [
        {
          mainhole: null,
          bottomLoaderValve: null,
          teraMetrologi: 0,
          rMmLiter: 0,
          atSupplyPoint: {
            ullage: 0,
            densityObserved: 0,
            temperature: 0
          },
          atDppu: {
            ullage: 0,
            densityObserved: 0,
            temperature: 0
          },
          selisih: {
            mm: 0,
            liter: 0
          },
          densityAt15Celcius: 0,
          correctionFactor: 0,
          literAt15Celcius: 0,
          dryCheck: "Kering"
        },
        {
          mainhole: null,
          bottomLoaderValve: null,
          teraMetrologi: 0,
          rMmLiter: 0,
          atSupplyPoint: {
            ullage: 0,
            densityObserved: 0,
            temperature: 0
          },
          atDppu: {
            ullage: 0,
            densityObserved: 0,
            temperature: 0
          },
          selisih: {
            mm: 0,
            liter: 0
          },
          densityAt15Celcius: 0,
          correctionFactor: 0,
          literAt15Celcius: 0,
          dryCheck: "Kering"
        },
        {
          mainhole: null,
          bottomLoaderValve: null,
          teraMetrologi: 0,
          rMmLiter: 0,
          atSupplyPoint: {
            ullage: 0,
            densityObserved: 0,
            temperature: 0
          },
          atDppu: {
            ullage: 0,
            densityObserved: 0,
            temperature: 0
          },
          selisih: {
            mm: 0,
            liter: 0
          },
          densityAt15Celcius: 0,
          correctionFactor: 0,
          literAt15Celcius: 0,
          dryCheck: "Kering"
        },
        {
          mainhole: null,
          bottomLoaderValve: null,
          teraMetrologi: 0,
          rMmLiter: 0,
          atSupplyPoint: {
            ullage: 0,
            densityObserved: 0,
            temperature: 0
          },
          atDppu: {
            ullage: 0,
            densityObserved: 0,
            temperature: 0
          },
          selisih: {
            mm: 0,
            liter: 0
          },
          densityAt15Celcius: 0,
          correctionFactor: 0,
          literAt15Celcius: 0,
          dryCheck: "Kering"
        }
      ],
      persentaseLosses: 0,
      klaim: {
        totalSelisih: null,
        toleransiLosses: null,
        volume: null,
        nilai: null
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
      equipment: [],
      kompartemen,
      dryCheck
    },
    modalRitase: {
      show: false,
      bridgerNo: "",
      records: []
    }
  }),
  computed: {
    ...mapGetters("personalize", ["multipleDppu", "dppu", "sf139b"]),
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
      nomorPolisi: { required, maxLength: maxLength(9) },
      jumlahKompartemen: { required },
      masaBerlakuTeraTangki: { required },
      volume: { required, minValue: minValue(1) },
      harga: { required, minValue: minValue(1000) },
      kondisiKompartemen: { required },
      jamMasuk: { required },
      jamKeluar: { required },
      persentaseLosses: { required }
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
      self.form.supplyPoint = self.dppu.supplyPoint;
    }

    self.getEquipmentByCategory();

    if (self.sf139b != null) {
      self.form.harga = parseFloat(self.sf139b.harga);
      self.form.persentaseLosses = parseFloat(self.sf139b.persentaseLosses);
    }

    if (self.$route.name != self.route.form) {
      self.get();
    }
  },
  methods: {
    dateFormat,
    numberFormat,
    getDate,
    changeDppu,
    changeEquipment() {
      const self = this;

      self.modalRitase.records = [];
      self.form.nomorPolisi = null;
      self.form.jumlahKompartemen = null;
      self.form.masaBerlakuTeraTangki = null;

      let bridger = self.options.equipment.find(
        x => x.id == self.form.bridgerId
      );
      self.form.nomorPolisi = bridger.detail.code;
      self.form.jumlahKompartemen = bridger.detail.detail.jumlahKompartemen;
      self.form.masaBerlakuTeraTangki =
        bridger.detail.detail.masaBerlakuTeraTangki;

      for (let index = 0; index < self.form.jumlahKompartemen; index++) {
        self.form.details[index].teraMetrologi =
          bridger.detail.detail.kompartemen[index].ullage;
      }

      self.getSf103ByBridger();
    },
    getSf103ByBridger() {
      const self = this;

      let loader = self.$loading.show();
      let _serverParams = {
        dppuId: self.form.dppuId,
        bridgerId: self.form.bridgerId,
        recordDate: self.form.transactionDate
      };
      self.$store
        .dispatch("apis/get", {
          url: "/board/standard-form/103/record",
          params: _serverParams
        })
        .then(response => {
          if (response.error) {
            self.$message.error({
              zIndex: 10000,
              message: response.message
            });
          } else {
            if (response.data.length > 0) {
              self.modalRitase.show = true;
              self.modalRitase.bridgerNo = response.data[0].bridgerNo;
              self.modalRitase.records = response.data;
            }
          }
        })
        .finally(() => loader.hide());
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
          url: `/board/standard-form/139b/${self.$route.params.id}`
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
              self.form.details[index].teraMetrologi = item.teraMetrologi;
              self.form.details[index].rMmLiter = item.rMmLiter;
              self.form.details[index].atSupplyPoint = {
                ullage: item.atSupplyPoint.ullage,
                densityObserved: item.atSupplyPoint.densityObserved,
                temperature: item.atSupplyPoint.temperature
              };
              self.form.details[index].atDppu = {
                ullage: item.atDppu.ullage,
                densityObserved: item.atDppu.densityObserved,
                temperature: item.atDppu.temperature
              };
              self.form.details[index].selisih = {
                mm: item.selisih.mm,
                liter: item.selisih.liter
              };
              self.form.details[index].densityAt15Celcius =
                item.densityAt15Celcius;
              self.form.details[index].correctionFactor = item.correctionFactor;
              self.form.details[index].literAt15Celcius = item.literAt15Celcius;
              self.form.details[index].dryCheck = item.dryCheck;
            });

            self.form.id = response.data.id;
            self.form.dppu = response.data.dppu;
            self.form.dppuId = response.data.dppu?.id;
            self.form.transactionId = response.data.transactionId;
            self.form.transactionDate = dateFormat(
              response.data.transactionDate,
              "YYYY-MM-DD"
            );
            self.form.supplyPoint = response.data.supplyPoint;
            self.form.bridgerId = response.data.bridgerId;
            self.form.nomorPolisi = response.data.nomorPolisi;
            self.form.namaPengemudi = response.data.namaPengemudi;
            self.form.jumlahKompartemen = response.data.jumlahKompartemen;
            self.form.masaBerlakuTeraTangki = dateFormat(
              response.data.masaBerlakuTeraTangki,
              "YYYY-MM-DD"
            );
            self.form.volume = response.data.volume;
            self.form.harga = response.data.harga;
            self.form.bottomLoaderCover = response.data.bottomLoaderCover;
            self.form.kondisiKompartemen = response.data.kondisiKompartemen;
            self.form.jamMasuk = dateFormat(response.data.jamMasuk, "HH:mm");
            self.form.jamKeluar = dateFormat(response.data.jamKeluar, "HH:mm");
            self.form.persentaseLosses = response.data.persentaseLosses;
            self.form.klaim = response.data.klaim;
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
          }
        })
        .finally(() => loader.hide());
    },
    selectRitase(params) {
      const self = this;

      self.form.volume = params.volume * params.records.length;
      self.form.bottomLoaderCover = params.seal;
      params.records.forEach((item, index) => {
        self.form.details[index].atSupplyPoint.densityObserved =
          params.receivingDocument.densityObserved;
        self.form.details[index].atSupplyPoint.temperature =
          params.receivingDocument.temperature;
        self.form.details[index].atDppu.densityObserved =
          item.controlCheck.densityObserved;
        self.form.details[index].atDppu.temperature =
          item.controlCheck.temperature;
      });

      self.modalRitase.show = false;
    },
    calculateKlaim() {
      const self = this;

      let selisih = 0;
      for (let index = 0; index < self.form.jumlahKompartemen; index++) {
        selisih += self.form.details[index].literAt15Celcius;
      }

      self.form.klaim.totalSelisih = selisih;
      self.form.klaim.toleransiLosses =
        (self.form.persentaseLosses * self.form.volume) / 100;
      self.form.klaim.volume =
        self.form.klaim.totalSelisih + self.form.klaim.toleransiLosses < 0
          ? self.form.klaim.totalSelisih + self.form.klaim.toleransiLosses
          : 0;
      self.form.klaim.nilai = self.form.klaim.volume * self.form.harga;
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
        _url = "/board/standard-form/139b";
      } else {
        _confirmText =
          "You are about to update this transaction. Are you sure ?";
        _okText = "Yes, Update";
        _action = "apis/put";
        _url = `/board/standard-form/139b/${self.$route.params.id}`;
      }

      let details = [];
      for (let index = 0; index < self.form.jumlahKompartemen; index++) {
        let detail = self.form.details[index];

        details.push({
          mainhole: detail.mainhole,
          bottomLoaderValve: detail.bottomLoaderValve,
          teraMetrologi: detail.teraMetrologi,
          rMmLiter: detail.rMmLiter,
          dryCheck: detail.dryCheck,
          atSupplyPoint: {
            ullage: detail.atSupplyPoint.ullage,
            densityObserved: detail.atSupplyPoint.densityObserved,
            temperature: detail.atSupplyPoint.temperature
          },
          atDppu: {
            ullage: detail.atDppu.ullage,
            densityObserved: detail.atDppu.densityObserved,
            temperature: detail.atDppu.temperature
          }
        });
      }

      let _form = {
        dppuId: self.form.dppuId,
        transactionDate: self.form.transactionDate,
        supplyPoint: self.form.supplyPoint,
        bridgerId: self.form.bridgerId,
        namaPengemudi: self.form.namaPengemudi,
        volume: self.form.volume,
        harga: self.form.harga,
        bottomLoaderCover: self.form.bottomLoaderCover,
        kondisiKompartemen: self.form.kondisiKompartemen,
        jamMasuk: dateTimeFormat(
          `${self.form.transactionDate} ${self.form.jamMasuk}`,
          "YYYY-MM-DD HH:mm:ss"
        ),
        jamKeluar: dateTimeFormat(
          `${self.form.transactionDate} ${self.form.jamKeluar}`,
          "YYYY-MM-DD HH:mm:ss"
        ),
        persentaseLosses: self.form.persentaseLosses,
        details: details,
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
              url: `/board/standard-form/139b/${self.$route.params.id}`
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
              teraMetrologi: detail.teraMetrologi,
              rMmLiter: detail.rMmLiter,
              dryCheck: detail.dryCheck,
              atSupplyPoint: {
                ullage: detail.atSupplyPoint.ullage,
                densityObserved: detail.atSupplyPoint.densityObserved,
                temperature: detail.atSupplyPoint.temperature
              },
              atDppu: {
                ullage: detail.atDppu.ullage,
                densityObserved: detail.atDppu.densityObserved,
                temperature: detail.atDppu.temperature
              }
            });
          }

          let _form = {
            dppuId: self.form.dppuId,
            transactionDate: self.form.transactionDate,
            supplyPoint: self.form.supplyPoint,
            bridgerId: self.form.bridgerId,
            namaPengemudi: self.form.namaPengemudi,
            volume: self.form.volume,
            harga: self.form.harga,
            bottomLoaderCover: self.form.bottomLoaderCover,
            kondisiKompartemen: self.form.kondisiKompartemen,
            jamMasuk: dateTimeFormat(
              `${self.form.transactionDate} ${self.form.jamMasuk}`,
              "YYYY-MM-DD HH:mm:ss"
            ),
            jamKeluar: dateTimeFormat(
              `${self.form.transactionDate} ${self.form.jamKeluar}`,
              "YYYY-MM-DD HH:mm:ss"
            ),
            persentaseLosses: self.form.persentaseLosses,
            details: details,
            sendApproval: true
          };

          self.$store
            .dispatch("apis/put", {
              url: `/board/standard-form/139b/${self.$route.params.id}`,
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
    handleUpdateCache() {
      const self = this;

      self.$store.dispatch("personalize/updateSf139b", {
        harga: parseFloat(self.form.harga),
        persentaseLosses: parseFloat(self.form.persentaseLosses)
      });

      self.calculateKlaim();
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
              url: `/board/export/standard-form/139b/${self.$route.params.id}`
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
                fileLink.setAttribute("download", "139B.xlsx");
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
