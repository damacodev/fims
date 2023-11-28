<template>
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
        class="card-body pb-0"
        v-bind:class="!currentProgress.locked ? `ml-10 mr-10` : ``"
      >
        <template v-if="!currentProgress.locked && !isPreview">
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
                label="Nomor Berita Acara"
                type="text"
                v-model="form.nomorBeritaAcara"
                :v="$v.form.nomorBeritaAcara"
                :useHorizontal="false"
                disabled
              />
            </b-col>
          </b-row>
          <b-row>
            <b-col lg="6">
              <InputText
                label="Tanggal Pekerjaan"
                type="datetime-local"
                v-model="form.tanggalPekerjaan"
                :v="$v.form.tanggalPekerjaan"
                :max="getDate()"
                :useHorizontal="false"
              />
              <form-group
                label="Pekerjaan"
                :validator="$v.form.pekerjaan"
                :useHorizontal="false"
              >
                <b-input-group class="mb-4">
                  <b-input
                    v-model="inputText"
                    class="form-control-lg"
                    autocomplete="off"
                    v-on:keyup.enter="addToActivities"
                  />
                  <b-input-group-append>
                    <b-button @click="addToActivities">Add</b-button>
                  </b-input-group-append>
                </b-input-group>

                <draggable
                  v-model="form.pekerjaan"
                  @start="drag = true"
                  @end="drag = false"
                >
                  <b-alert
                    v-for="(item, index) in form.pekerjaan"
                    v-bind:key="item"
                    variant="light"
                    style="cursor: move"
                    show
                  >
                    {{ item }}
                    <b-btn-close
                      class="ml-3"
                      @click="removeFromActivities(index)"
                    />
                  </b-alert>
                </draggable>
              </form-group>
            </b-col>
            <b-col lg="6">
              <InputText
                label="Meter Name"
                type="text"
                v-model="form.meterName"
                :v="$v.form.meterName"
                :useHorizontal="false"
              />
              <b-row>
                <b-col lg="6">
                  <InputMoney
                    label="Meter Akhir"
                    v-model="form.endMeter"
                    :v="$v.form.endMeter"
                    :usePrefix="false"
                    @input="calculateDifferential"
                    :useHorizontal="false"
                  />
                </b-col>
                <b-col lg="6">
                  <InputMoney
                    label="Meter Awal"
                    v-model="form.startMeter"
                    :v="$v.form.startMeter"
                    :usePrefix="false"
                    @input="calculateDifferential"
                    :useHorizontal="false"
                  />
                </b-col>
              </b-row>
              <InputMoney
                label="Selisih"
                v-model="form.differential"
                :v="$v.form.differential"
                :usePrefix="false"
                append="Liter"
                disabled
                :useHorizontal="false"
              />
            </b-col>
          </b-row>
          <b-row>
            <b-col lg="4">
              <Select
                label="Pelaksana 1"
                placeholder="Search Pelaksana 1"
                v-model="form.pelaksana1.id"
                :v="$v.form.pelaksana1"
                :options="options.account"
                :multiple="false"
                :useHorizontal="false"
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
            </b-col>
            <b-col lg="4">
              <Select
                label="Pelaksana 2"
                placeholder="Search Pelaksana 2"
                v-model="form.pelaksana2.id"
                :v="$v.form.pelaksana2"
                :options="options.account"
                :multiple="false"
                :useHorizontal="false"
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
            </b-col>
            <b-col lg="4">
              <Select
                label="Pengawas"
                placeholder="Search Pengawas"
                v-model="form.pengawas.id"
                :v="$v.form.pengawas.id"
                :options="options.account"
                :multiple="false"
                :useHorizontal="false"
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
            </b-col>
          </b-row>

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
import TemplateDocument from "./TemplateDocument.vue";
import FormHeader from "./FormHeader.vue";

import { mapGetters } from "vuex";
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
    inputText: null,
    form: {
      dppu: {
        id: null,
        label: null
      },
      dppuId: null,
      transactionId: "Auto Generated",
      nomorBeritaAcara: "Auto Generated",
      tanggalPekerjaan: getDateTime(),
      meterName: null,
      pekerjaan: [],
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
    approveProgress: {
      pelaksana1: null,
      pelaksana2: null,
      pengawas: null
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
      tanggalPekerjaan: { required },
      meterName: { required, maxLength: maxLength(50) },
      pekerjaan: { required, maxLength: maxLength(500) },
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
    addToActivities() {
      const self = this;
      self.form.pekerjaan.push(self.inputText);
      self.inputText = null;
    },
    removeFromActivities(index) {
      const self = this;
      self.form.pekerjaan.splice(index, 1);
    },
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
              nomorBeritaAcara:
                response.data.nomorBeritaAcara || "Auto Generated",
              tanggalPekerjaan: dateFormat(
                response.data.tanggalPekerjaan,
                "YYYY-MM-DD HH:mm"
              ),
              pekerjaan: response.data.pekerjaan,
              meterName: response.data.meterName,
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

            if (response.data.approveProgress != null) {
              self.approveProgress = {
                pelaksana1: response.data.approveProgress.pelaksana1,
                pelaksana2: response.data.approveProgress.pelaksana2,
                pengawas: response.data.approveProgress.pengawas
              };
            }

            self.content = [
              {
                template: TemplateDocument,
                props: {
                  form: self.form,
                  approveProgress: self.approveProgress
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
        tanggalPekerjaan: self.form.tanggalPekerjaan,
        meterName: self.form.meterName,
        pekerjaan: self.form.pekerjaan,
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
                    tanggalPekerjaan: dateFormat(
                      response.data.tanggalPekerjaan,
                      "YYYY-MM-DD HH:mm"
                    ),
                    meterName: response.data.meterName,
                    pekerjaan: response.data.pekerjaan,
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
            tanggalPekerjaan: self.form.tanggalPekerjaan,
            meterName: self.form.meterName,
            pekerjaan: self.form.pekerjaan,
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
              url: `/board/export/standard-form/127/${self.$route.params.id}`
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
                fileLink.setAttribute("download", "127.xlsx");
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
