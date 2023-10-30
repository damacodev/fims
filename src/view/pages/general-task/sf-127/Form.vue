<template>
  <!-- eslint-disable-next-line vue/max-attributes-per-line -->

  <div class="card card-custom">
    <div class="card-header py-3">
      <div class="card-title align-items-start flex-column">
        <h3 class="card-label font-weight-bolder text-dark">
          <b-button class="btn-icon mr-2" size="xs" @click="$router.go(-1)">
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
          v-show="$route.name != route.form && !currentProgress.locked"
          variant="outline-secondary"
          size="lg"
          class="mr-5"
          @click="isPreview = !isPreview"
        >
          {{ isPreview ? `Hide` : `Show` }} Preview
        </b-button>
        <b-button
          v-show="currentProgress.locked"
          variant="outline-primary"
          @click="handleDownload"
        >
          Download
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
      <div class="card-body pb-0">
        <template v-if="!currentProgress.locked && !isPreview">
          <Select
            v-if="multipleDppu"
            label="Depot Pengisian Pesawat Udara"
            v-model="form.dppuId"
            :v="$v.form.dppuId"
            :options="options.dppu"
            :multiple="false"
            :disabled="$route.name != route.form"
          />
          <InputText
            label="Nomor Berita Acara"
            type="text"
            v-model="form.transactionId"
            :v="$v.form.transactionId"
          />
          <InputText
            label="Tanggal Pekerjaan"
            type="datetime-local"
            v-model="form.transactionDate"
            :v="$v.form.transactionDate"
            :max="getDate()"
          />
          <InputText
            label="Meter Name"
            type="text"
            v-model="form.meterName"
            :v="$v.form.meterName"
          />
          <TextEditor
            label="Pekerjaan"
            v-model="form.activity"
            :v="$v.form.activity"
          />
          <InputMoney
            label="Meter Akhir"
            v-model="form.endMeter"
            :v="$v.form.endMeter"
            :usePrefix="false"
            @input="calculateDifferential"
          />
          <InputMoney
            label="Meter Awal"
            v-model="form.startMeter"
            :v="$v.form.startMeter"
            :usePrefix="false"
            @input="calculateDifferential"
          />
          <InputMoney
            label="Selisih"
            v-model="form.differential"
            :v="$v.form.differential"
            :usePrefix="false"
            append="Liter"
            disabled
          />
          <Select
            label="Pelaksana 1"
            placeholder="Search Pelaksana 1"
            v-model="form.pelaksana1.id"
            :v="$v.form.pelaksana1"
            :options="options.account"
            :multiple="false"
          >
            <label
              slot="option-label"
              slot-scope="{ node, labelClassName }"
              :class="labelClassName"
            >
              {{ node.label }}
              <br />
              <small class="font-weight-bolder">
                {{ node.raw.role }}
              </small>
            </label>
          </Select>
          <Select
            label="Pelaksana 2"
            placeholder="Search Pelaksana 2"
            v-model="form.pelaksana2.id"
            :v="$v.form.pelaksana2"
            :options="options.account"
            :multiple="false"
          >
            <label
              slot="option-label"
              slot-scope="{ node, labelClassName }"
              :class="labelClassName"
            >
              {{ node.label }}
              <br />
              <small class="font-weight-bolder">
                {{ node.raw.role }}
              </small>
            </label>
          </Select>
          <Select
            label="Pengawas"
            placeholder="Search Pengawas"
            v-model="form.pengawas.id"
            :v="$v.form.pengawas.id"
            :options="options.account"
            :multiple="false"
          >
            <label
              slot="option-label"
              slot-scope="{ node, labelClassName }"
              :class="labelClassName"
            >
              {{ node.label }}
              <br />
              <small class="font-weight-bolder">
                {{ node.raw.role }}
              </small>
            </label>
          </Select>
          <b-row v-if="currentProgress.status == 'Rejected'">
            <b-col lg="8" xl="5" offset="4">
              <b-alert show variant="danger">
                <h4 class="alert-heading">Rejected</h4>
                <hr />
                <p class="mb-0">
                  {{ currentProgress.remarks }}
                </p>
              </b-alert>
            </b-col>
          </b-row>
        </template>
        <vue-document-editor
          v-else-if="!currentProgress.locked && isPreview"
          :content.sync="content"
          :editable="false"
        />
        <FormHeader
          v-else
          :form="form"
          :currentProgress="currentProgress"
          :content="content"
          :showRemarks="true"
        />
      </div>
    </b-row>
  </div>
</template>

<script>
import VueDocumentEditor from "vue-document-editor";
import { mapGetters } from "vuex";
import FormHeader from "./FormHeader.vue";
import { required, decimal, maxLength } from "vuelidate/lib/validators";
import {
  getDppu,
  numberFormat,
  getDate,
  getDateTime,
  dateFormat
} from "@/core/utils";

export default {
  components: {
    VueDocumentEditor,
    FormHeader
  },
  data: () => ({
    isPreview: false,
    content: [],

    title: "127 SF - Berita Acara Perubahan Meter",
    route: {
      form: "sf127Create",
      table: "sf127"
    },
    form: {
      dppu: {
        id: null,
        label: null
      },
      dppuId: null,
      transactionId: null,
      transactionDate: getDateTime(),
      meterName: null,
      activity: "",
      startMeter: null,
      endMeter: null,
      differential: null,
      pelaksana1: {
        id: null,
        label: null
      },
      pelaksana2: {
        id: null,
        label: null
      },
      pengawas: {
        id: null,
        label: null
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
      account: []
    }
  }),
  computed: {
    ...mapGetters("personalize", ["multipleDppu", "dppu"]),
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
      meterName: { required, maxLength: maxLength(50) },
      activity: { required, maxLength: maxLength(500) },
      startMeter: { required, decimal },
      endMeter: { required, decimal },
      differential: { required, decimal },
      pelaksana1: {
        id: { required }
      },
      pelaksana2: {
        id: { required }
      },
      pengawas: {
        id: { required }
      }
    }
  },
  created() {
    const self = this;

    self.form.pelaksana1.id = self.user.id;
    self.form.pelaksana1.label = self.user.fullName;
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
      self.getAccount();
    }

    if (self.$route.name != self.route.form) {
      self.get();
    }
  },
  methods: {
    dateFormat,
    numberFormat,
    getDate,
    calculateDifferential() {
      const self = this;
      self.form.differential = self.form.endMeter - self.form.startMeter;
    },
    getAccount() {
      const self = this;

      self.options.account = [];
      self.$store
        .dispatch("apis/get", {
          url: "/account",
          params: {
            dppu: self.form.dppuId
          }
        })
        .then(response => {
          if (response.error) {
            self.$message.error({
              zIndex: 10000,
              message: response.message
            });
          } else {
            self.options.account = response.data.data.map(x => ({
              id: x.id,
              label: x.fullName,
              role: x.role.label
            }));
          }
        });
    },
    get() {
      const self = this;

      let loader = self.$loading.show();
      self.$store
        .dispatch("apis/get", {
          url: `/board/standard-form/127/${self.$route.params.id}`
        })
        .then(response => {
          if (response.error) {
            self.$message.error({
              zIndex: 10000,
              message: response.message
            });

            self.$router.push({ name: self.route.table });
          } else {
            self.form = {
              dppu: response.data.dppu,
              dppuId: response.data.dppu?.id,
              transactionId: response.data.transactionId,
              transactionDate: dateFormat(
                response.data.transactionDate,
                "YYYY-MM-DD HH:mm"
              ),
              meterName: response.data.meterName,
              activity: response.data.activity,
              startMeter: response.data.startMeter,
              endMeter: response.data.endMeter,
              differential: response.data.differential,
              pelaksana1: {
                id: response.data.pelaksana1?.id,
                label: response.data.pelaksana1?.label
              },
              pelaksana2: {
                id: response.data.pelaksana2?.id,
                label: response.data.pelaksana2?.label
              },
              pengawas: {
                id: response.data.pengawas?.id,
                label: response.data.pengawas?.label
              },
              updatedBy: response.data.updatedBy,
              updatedAt: response.data.updatedAt
            };

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
              `
<table class="table table-borderless">
  <thead>
    <tr>
      <td class="align-middle text-center" width="80%">
        <h4 class="font-weight-bolder">
          BERITA ACARA<br>
          PERUBAHAN METER<br>
        </h4>
        <span>N0 : 1234/F11340/2010 - S3</span>
      </td>
      <td class="align-middle">
        <img src="https://www.pertamina.com/Media/Image/Pertamina.png" height="40px">
      </td>
    </tr>
  </thead>
</table>
<p class="mt-10">
Pada hari ini ${self.dateFormat(
                self.form.transactionDate,
                "dddd"
              )}, Tanggal  ${self.dateFormat(
                self.form.transactionDate,
                "DD MMMM YYYY"
              )}, Jam ${self.dateFormat(
                self.form.transactionDate,
                "HH:mm"
              )} telah dilaksanakan pekerjaan,
${self.form.activity}
</p>

<table class="table table-borderless mt-8">
  <tbody>
    <tr>
      <td class="text-left p-0" colspan="3">Sehingga terjadi perubahan totalisator meter penyerahan ${
        self.form.meterName
      }</td>
    </tr>
    <tr>
      <td class="text-left m-0 p-0" width="100px">Sebanyak</td>
      <td class="text-center m-0 p-0" width="20px">:</td>
      <td class="text-left m-0 p-0">${self.numberFormat(
        self.form.differential
      )} Liter</td>
    </tr>
    <tr>
      <td class="text-left m-0 p-0 pt-5">Meter Akhir</td>
      <td class="text-center m-0 p-0 pt-5">:</td>
      <td class="text-left m-0 p-0 pt-5">${self.numberFormat(
        self.form.endMeter
      )}</td>
    </tr>
    <tr>
      <td class="text-left m-0 p-0">Meter Awal</td>
      <td class="text-center m-0 p-0">:</td>
      <td class="text-left m-0 p-0">${self.numberFormat(
        self.form.startMeter
      )}</td>
    </tr>
    <tr>
      <td class="text-left m-0 p-0 pt-5">Selisih</td>
      <td class="text-center m-0 p-0 pt-5">:</td>
      <td class="text-left m-0 p-0 pt-5">${self.numberFormat(
        self.form.differential
      )}</td>
    </tr>
  </tbody>
</table>

<p class="mt-10">Demikian Berita Acara ini dibuat untuk dipergunakan seperlunya.</p>

<table class="table table-borderless mt-10">
  <tbody>
    <tr>
      <td class="text-center">
        Pelaksana II
        <p class="mt-20 font-weight-bolder">${self.form.pelaksana2.label}</p>
      </td>
      <td class="text-center">
        Pelaksana I
        <p class="mt-20 font-weight-bolder">${self.form.pelaksana1.label}</p>
      </td>
    </tr>
    <tr>
      <td class="text-center" colspan="2">
        Mengetahui,
        <br>Pengawas
        <p class="mt-20 font-weight-bolder">${self.form.pengawas.label}</p>
      </td>
    </tr>
  </tbody>
</table>
`
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
        _url = "/board/standard-form/127";
      } else {
        _confirmText =
          "You are about to update this transaction. Are you sure ?";
        _okText = "Yes, Update";
        _action = "apis/put";
        _url = `/board/standard-form/127/${self.$route.params.id}`;
      }

      let _form = {
        dppuId: self.form.dppuId,
        transactionId: self.form.transactionId,
        transactionDate: self.form.transactionDate,
        meterName: self.form.meterName,
        activity: self.form.activity,
        startMeter: self.form.startMeter,
        endMeter: self.form.endMeter,
        pelaksana1: self.form.pelaksana1.id,
        pelaksana2: self.form.pelaksana2.id,
        pengawas: self.form.pengawas.id,
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

                if (self.$route.name == self.route.form) {
                  self.$router.replace({
                    name: "sf127Update",
                    params: {
                      id: response.data.id
                    }
                  });

                  self.form = {
                    dppu: response.data.dppu,
                    dppuId: response.data.dppu?.id,
                    transactionId: response.data.transactionId,
                    transactionDate: dateFormat(
                      response.data.transactionDate,
                      "YYYY-MM-DD HH:mm"
                    ),
                    meterName: response.data.meterName,
                    activity: response.data.activity,
                    startMeter: response.data.startMeter,
                    endMeter: response.data.endMeter,
                    differential: response.data.differential,
                    pelaksana1: {
                      id: response.data.pelaksana1?.id,
                      label: response.data.pelaksana1?.label
                    },
                    pelaksana2: {
                      id: response.data.pelaksana2?.id,
                      label: response.data.pelaksana2?.label
                    },
                    pengawas: {
                      id: response.data.pengawas?.id,
                      label: response.data.pengawas?.label
                    },
                    updatedBy: response.data.updatedBy,
                    updatedAt: response.data.updatedAt
                  };

                  self.currentProgress = {
                    status: response.data.currentProgress.status,
                    remarks: response.data.currentProgress.remarks,
                    nextAction: {
                      id: response.data.currentProgress.nextAction?.id,
                      label: response.data.currentProgress.nextAction?.label
                    }
                  };
                }
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
              url: `/board/standard-form/127/${self.$route.params.id}`
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
          let _form = {
            dppuId: self.form.dppuId,
            transactionId: self.form.transactionId,
            transactionDate: self.form.transactionDate,
            meterName: self.form.meterName,
            activity: self.form.activity,
            startMeter: self.form.startMeter,
            endMeter: self.form.endMeter,
            pelaksana1: self.form.pelaksana1.id,
            pelaksana2: self.form.pelaksana2.id,
            pengawas: self.form.pengawas.id,
            sendApproval: true
          };

          self.$store
            .dispatch("apis/put", {
              url: `/board/standard-form/127/${self.$route.params.id}`,
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
    handleDownload() {
      const self = this;

      self.$store
        .dispatch("apis/download", {
          url: `/board/standard-form/127/export/${self.$route.params.id}`
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
            fileLink.setAttribute("download", "127 SF.xlsx");
            document.body.appendChild(fileLink);

            fileLink.click();
          }
        });
    }
  }
};
</script>
