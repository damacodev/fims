<template>
  <b-row>
    <b-col lg="12">
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
          <div class="card-body pb-0">
            <template v-if="!currentProgress.locked">
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
                label="Transaction #"
                type="text"
                v-model="form.transactionId"
                disabled
              />
              <InputText
                label="Transaction Date"
                type="date"
                v-model="form.transactionDate"
                :v="$v.form.transactionDate"
                :max="getDate()"
              />
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
            <FormHeader
              v-else
              :form="form"
              :currentProgress="currentProgress"
              :showRemarks="true"
            />
          </div>
        </b-row>
        <TableItem
          v-if="$route.name != route.form"
          :currentProgress="currentProgress"
          :details="form.details"
          @onUpdate="get"
        />
      </div>
    </b-col>
  </b-row>
</template>

<script>
import { mapGetters } from "vuex";
import FormHeader from "../common/FormHeader.vue";
import TableItem from "./TableItem.vue";
import { required } from "vuelidate/lib/validators";
import { getDppu, numberFormat, getDate, dateFormat } from "@/core/utils";

export default {
  components: {
    FormHeader,
    TableItem,
  },
  data: () => ({
    title: "215 SF - Fire Extinguisher Check List",
    route: {
      form: "sf215Create",
      table: "sf215",
    },
    form: {
      dppu: {
        id: null,
        label: null,
      },
      dppuId: null,
      transactionId: "Auto Generated",
      transactionDate: getDate(),
      remarks: null,
      details: [],
      sendApproval: false,
      updatedBy: null,
      updatedAt: null,
    },
    currentProgress: {
      locked: null,
      status: null,
      remarks: null,
      nextAction: {
        id: null,
        label: null,
      },
    },
    options: {
      dppu: [],
    },
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
      return self.$route.name != self.route.form
        ? "Update"
        : "Save and Continue";
    },
  },
  validations: {
    form: {
      dppuId: { required },
      transactionDate: { required },
    },
  },
  created() {
    const self = this;

    if (self.multipleDppu) {
      getDppu().then((response) => {
        self.options.dppu = response.data.map((x) => ({
          id: x.id,
          label: x.name,
        }));
      });
    } else {
      self.options.dppu = [self.dppu];
    }
    if (self.dppu) {
      self.form.dppu = self.dppu;
      self.form.dppuId = self.dppu.id;
    }

    if (self.$route.name != self.route.form) {
      self.get();
    }
  },
  methods: {
    dateFormat,
    numberFormat,
    getDate,
    get() {
      const self = this;

      let loader = self.$loading.show();
      self.$store
        .dispatch("apis/get", {
          url: `/board/standard-form/215/${self.$route.params.id}`,
        })
        .then((response) => {
          if (response.error) {
            self.$message.error({
              zIndex: 10000,
              message: response.message,
            });

            self.$router.push({ name: self.route.table });
          } else {
            self.form = {
              dppu: response.data.dppu,
              dppuId: response.data.dppu?.id,
              transactionId: response.data.transactionId,
              transactionDate: dateFormat(
                response.data.transactionDate,
                "YYYY-MM-DD"
              ),
              remarks: response.data.remarks,
              details: response.data.details,
              updatedBy: response.data.updatedBy,
              updatedAt: response.data.updatedAt,
            };

            self.currentProgress = {
              locked: response.data.currentProgress.locked,
              status: response.data.currentProgress.status,
              remarks: response.data.currentProgress.remarks,
              nextAction: {
                id: response.data.currentProgress.nextAction?.id,
                label: response.data.currentProgress.nextAction?.label,
              },
            };
          }
        })
        .finally(() => loader.hide());
    },
    handleSubmit() {
      const self = this;

      self.$v.form.$touch();
      if (self.$v.form.$pending || self.$v.form.$error) return;

      let loader = self.$loading.show();
      let _action = "",
        _url = "";

      if (self.$route.name == self.route.form) {
        _action = "apis/post";
        _url = "/board/standard-form/215";
      } else {
        _action = "apis/put";
        _url = `/board/standard-form/215/${self.$route.params.id}`;
      }

      self.$store
        .dispatch(_action, {
          url: _url,
          params: self.form,
        })
        .then((response) => {
          if (response.error) {
            self.$message.error({
              zIndex: 10000,
              message: response.message,
            });
          } else {
            if (self.$route.name == self.route.form) {
              self.$router.replace({
                name: "sf215Update",
                params: {
                  id: response.data.id,
                },
              });

              self.form = {
                dppu: response.data.dppu,
                dppuId: response.data.dppu?.id,
                transactionId: response.data.transactionId,
                transactionDate: dateFormat(
                  response.data.transactionDate,
                  "YYYY-MM-DD"
                ),
                details: response.data.details,
                updatedBy: response.data.updatedBy,
                updatedAt: response.data.updatedAt,
              };

              self.currentProgress = {
                status: response.data.currentProgress.status,
                remarks: response.data.currentProgress.remarks,
                nextAction: {
                  id: response.data.currentProgress.nextAction?.id,
                  label: response.data.currentProgress.nextAction?.label,
                },
              };

              self.table.rows = response.data.details;
            }
          }
        })
        .finally(() => loader.hide());
    },
    handleDelete() {
      const self = this;

      self.$dialog
        .confirm("You are about to delete this transaction. Are you sure ?", {
          okText: "Yes, Delete",
          cancelText: "Cancel",
          loader: true,
        })
        .then((dialog) => {
          self.$store
            .dispatch("apis/remove", {
              url: `/board/standard-form/215/${self.$route.params.id}`,
            })
            .then((response) => {
              if (response.error) {
                self.$message.error({
                  zIndex: 10000,
                  message: response.message,
                });
              } else {
                self.$message.success({
                  zIndex: 10000,
                  message: response.message,
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
            loader: true,
          }
        )
        .then((dialog) => {
          self.form.sendApproval = true;

          self.$store
            .dispatch("apis/put", {
              url: `/board/standard-form/215/${self.$route.params.id}`,
              params: self.form,
            })
            .then((response) => {
              if (response.error) {
                self.$message.error({
                  zIndex: 10000,
                  message: response.message,
                });
              } else {
                self.$message.success({
                  zIndex: 10000,
                  message: response.message,
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
          loader: true,
        })
        .then((dialog) => {
          self.$store
            .dispatch("apis/download", {
              url: `/board/export/standard-form/215/${self.$route.params.id}`,
            })
            .then((response) => {
              if (response.error) {
                self.$message.error({
                  zIndex: 10000,
                  message: response.message,
                });
              } else {
                let fileURL = window.URL.createObjectURL(new Blob([response])),
                  fileLink = document.createElement("a");

                fileLink.href = fileURL;
                fileLink.setAttribute("download", "215.xlsx");
                document.body.appendChild(fileLink);

                fileLink.click();
              }
            })
            .finally(() => dialog.close());
        });
    },
  },
};
</script>
