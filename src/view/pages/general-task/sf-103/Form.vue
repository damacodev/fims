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
        <b-button
          v-show="$route.name != route.form && buttonVisibility"
          variant="outline-danger"
          size="lg"
          class="mr-10"
          @click="handleDelete"
        >
          Delete
        </b-button>
        <b-button
          v-show="$route.name != route.form && buttonVisibility"
          variant="outline-primary"
          size="lg"
          class="mr-2"
          @click="handleSendApproval"
        >
          Save and Send Approval
        </b-button>
        <b-button
          v-show="buttonVisibility"
          variant="primary"
          size="lg"
          class="mr-2"
          @click="handleSubmit"
        >
          {{ textButton }}
        </b-button>
        <b-button
          variant="secondary"
          size="lg"
          @click="$router.push({ name: 'sf103' })"
        >
          Back
        </b-button>
      </div>
    </div>
    <b-row class="p-2">
      <div class="card-body pb-0">
        <template v-if="buttonVisibility">
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
          />
          <Select
            label="Shift"
            v-model="form.shiftId"
            :options="options.shift"
            :multiple="false"
          />
          <InputText label="Grade" type="text" v-model="form.grade" />
        </template>
        <FormHeader v-else :form="form" />
      </div>
    </b-row>
    <div v-show="$route.name != route.form">
      <hr v-show="buttonVisibility" />
      <b-row>
        <b-col>
          <b-button
            v-show="buttonVisibility"
            variant="outline-primary"
            class="ml-2 mb-4"
            @click="handleOpenForm"
          >
            Add New Record
          </b-button>
        </b-col>
      </b-row>
      <div class="min-card-h">
        <TableItem
          :rows="table.rows"
          @onRowRemove="onRowRemove"
          @onRowSelected="onRowSelected"
        />
        <EmptyTable
          v-if="table.rows.length == 0"
          title="Bridger Quality Control Before Receipt Records will be displayed here"
          description="Please add an items first"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import FormHeader from "./FormHeader.vue";
import TableItem from "./TableItem.vue";
import { required } from "vuelidate/lib/validators";
import { getDppu, numberFormat, getDate, dateFormat } from "@/core/utils";

export default {
  components: {
    FormHeader,
    TableItem
  },
  data: () => ({
    title: "103 SF - Bridger Quality Control Before Receipt Record",
    route: {
      form: "sf103Create",
      table: "sf103"
    },
    form: {
      dppu: {
        id: null,
        label: null
      },
      dppuId: null,
      transactionId: "Auto Generated",
      transactionDate: getDate(),
      shift: {
        id: null,
        label: null
      },
      shiftId: null,
      grade: null,
      sendApproval: false
    },
    currentProgress: {
      status: null,
      nextAction: {
        id: null,
        label: null
      }
    },
    table: {
      rows: []
    },
    options: {
      dppu: [],
      shift: []
    }
  }),
  computed: {
    ...mapGetters("personalize", ["multipleDppu", "dppu"]),
    subTitle() {
      const self = this;
      return self.$route.name != self.route.form
        ? "Update transaction"
        : "Create new transaction";
    },
    textButton() {
      const self = this;
      return self.$route.name != self.route.form ? "Update" : "Save";
    },
    buttonVisibility() {
      const self = this;
      if (
        self.$route.name != self.route.form &&
        self.currentProgress.status != "New"
      ) {
        return false;
      }
      return true;
    }
  },
  validations: {
    form: {
      dppuId: { required },
      transactionDate: { required }
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
      self.changeDppu();
    }

    if (self.$route.name != self.route.form) {
      self.get();
    }
  },
  methods: {
    dateFormat,
    numberFormat,
    changeDppu() {
      const self = this;

      self.form.shiftId = null;
      self.options.shift = [];
      if (self.form.dppuId != null) {
        self.$store
          .dispatch("apis/get", {
            url: `/dppu/${self.form.dppuId}`
          })
          .then(response => {
            if (response.error) {
              self.$message.error({
                zIndex: 10000,
                message: response.message
              });
            } else {
              self.options.shift = response.data.shifts.map(x => ({
                id: x.id,
                label: `${x.shiftCallSign} (${x.workingTime.start} - ${x.workingTime.end})`
              }));
            }
          });
      }
    },
    get() {
      const self = this;

      let loader = self.$loading.show();
      self.$store
        .dispatch("apis/get", {
          url: `/board/sf-103/${self.$route.params.id}`
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
                "YYYY-MM-DD"
              ),
              shift: {
                id: response.data.shift?.id,
                label: response.data.shift?.label
              },
              shiftId: response.data.shift?.id,
              grade: response.data.grade
            };

            self.currentProgress = {
              status: response.data.currentProgress.status,
              nextAction: {
                id: response.data.currentProgress.nextAction?.id,
                label: response.data.currentProgress.nextAction?.label
              }
            };

            self.table.rows = response.data.details;
          }
        })
        .finally(() => loader.hide());
    },
    handleOpenForm() {
      const self = this;

      self.$router.push({
        name: "sf103CreateItem",
        params: {
          id: self.$route.params.id
        }
      });
    },
    onRowSelected(item) {
      const self = this;

      self.$router.push({
        name: "sf103UpdateItem",
        params: {
          id: self.$route.params.id,
          iditem: item.id
        }
      });
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
        _url = "/board/sf-103";
      } else {
        _confirmText =
          "You are about to update this transaction. Are you sure ?";
        _okText = "Yes, Update";
        _action = "apis/put";
        _url = `/board/sf-103/${self.$route.params.id}`;
      }

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
              params: self.form
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
                  self.$router.push({
                    name: "sf103Update",
                    params: {
                      id: response.data.id
                    }
                  });
                } else {
                  self.$router.go(-1);
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
              url: `/board/sf-103/${self.$route.params.id}`
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
          self.form.sendApproval = true;

          self.$store
            .dispatch("apis/put", {
              url: `/board/sf-103/${self.$route.params.id}`,
              params: self.form
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
    }
  }
};
</script>
