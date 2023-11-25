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
          v-show="
            $route.name != route.form &&
              !currentProgress.locked &&
              form.workItemId == null
          "
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
      <div class="card-body">
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
          />
          <Select
            ref="DeadlegDrain"
            label="Deadleg Drain Identity"
            placeholder="Select Deadleg Drain"
            v-model="form.deadlegDrainId"
            :v="$v.form.deadlegDrainId"
            :async="true"
            :multiple="false"
            :loadOptions="getEquipmentByCategory"
            :disabled="form.workItemId != null"
          />
          <!-- <InputPlainText
            label="Depot Pengisian Pesawat Udara"
            css-class="m-0"
            v-model="form.dppu.label"
          />
          <InputPlainText
            label="Transaction #"
            css-class="m-2"
            v-model="form.transactionId"
          />
          <InputText
            label="Transaction Date"
            type="date"
            v-model="form.transactionDate"
            :v="$v.form.transactionDate"
          /> -->
          <!-- <InputPlainText
            label="Deadleg Drain Identity"
            css-class="m-2"
            v-model="form.deadlegDrain.label"
          /> -->
          <Select
            label="Colour"
            placeholder="Select Colour"
            v-model="form.colourId"
            :v="$v.form.colourId"
            :options="options.colour"
            :multiple="false"
          />
          <Select
            label="Cleanlines"
            placeholder="Select Cleanlines"
            v-model="form.cleanlinesId"
            :v="$v.form.cleanlinesId"
            :options="options.cleanlines"
            :multiple="false"
          />
          <Select
            label="Free Water"
            placeholder="Select Free Water"
            v-model="form.freeWaterId"
            :v="$v.form.freeWaterId"
            :options="options.freeWater"
            :multiple="false"
          />
          <Select
            label="Water Detector"
            placeholder="Select Water Detector"
            v-model="form.waterDetectorId"
            :v="$v.form.waterDetectorId"
            :options="options.waterDetector"
            :multiple="false"
          />
          <TextArea
            label="Remarks"
            placeholder="Please write your remarks here..."
            type="text"
            v-model="form.remarks"
            :v="$v.form.remarks"
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
  </div>
</template>

<script>
import { ASYNC_SEARCH } from "@riophae/vue-treeselect";
import { mapGetters } from "vuex";
import FormHeader from "./FormHeader.vue";
import { required, maxLength } from "vuelidate/lib/validators";
import {
  getDppu,
  numberFormat,
  getDate,
  dateFormat,
  getColour,
  getCleanlines,
  getFreeWater,
  getWaterDetector
} from "@/core/utils";

export default {
  components: {
    FormHeader
  },
  data: () => ({
    title: "137 SF - Deadleg Drain Quality Check",
    route: {
      form: "sf137Create",
      table: "sf137"
    },
    form: {
      dppu: {
        id: null,
        label: null
      },
      dppuId: null,
      transactionId: "Auto Generated",
      transactionDate: getDate(),
      deadlegDrain: null,
      colour: null,
      colourId: null,
      cleanlines: null,
      cleanlinesId: null,
      freeWater: null,
      freeWaterId: null,
      waterDetector: null,
      waterDetectorId: null,
      workItemId: null,
      remarks: null,
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
      colour: [],
      cleanlines: [],
      freeWater: [],
      waterDetector: []
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
    },
    transactionDateFormatting() {
      return dateFormat(this.form.transactionDate);
    }
  },
  validations: {
    form: {
      dppuId: { required },
      transactionDate: { required },
      deadlegDrainId: { required },
      colourId: { required },
      cleanlinesId: { required },
      freeWaterId: { required },
      waterDetectorId: { required },
      remarks: { maxLength: maxLength(250) }
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

    self.getDefaultEquipment();
    getColour().then(response => {
      self.options.colour = response;
    });
    getCleanlines().then(response => {
      self.options.cleanlines = response;
    });
    getFreeWater().then(response => {
      self.options.freeWater = response;
    });
    getWaterDetector().then(response => {
      self.options.waterDetector = response;
    });

    if (self.$route.name != self.route.form) {
      self.get();
    }
  },
  methods: {
    dateFormat,
    numberFormat,
    getDefaultEquipment() {
      const self = this;

      self.$store
        .dispatch("apis/get", {
          url: `/equipment`,
          params: {
            dppu: self.form.dppuId,
            pageNumber: 1,
            pageSize: 20,
            category: 9,
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
            self.$refs.DeadlegDrain.$refs[
              "Deadleg Drain Identity"
            ].defaultOptions = response.data.data.map(x => ({
              id: x.id,
              label: x.code
            }));
            self.$refs.DeadlegDrain.$refs[
              "Deadleg Drain Identity"
            ].initialize();
          }
        });
    },
    getEquipmentByCategory({ action, searchQuery, callback }) {
      const self = this;

      if (action === ASYNC_SEARCH) {
        self.$store
          .dispatch("apis/get", {
            url: `/equipment`,
            params: {
              dppu: self.form.dppuId,
              pageNumber: 1,
              pageSize: 20,
              category: 9,
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
    },
    get() {
      const self = this;

      let loader = self.$loading.show();
      self.$store
        .dispatch("apis/get", {
          url: `/board/standard-form/137/${self.$route.params.id}`
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
              deadlegDrain: response.data.deadlegDrain,
              deadlegDrainId: response.data.deadlegDrain?.id,
              colour: response.data.colour,
              colourId: response.data.colour?.id,
              cleanlines: response.data.cleanlines,
              cleanlinesId: response.data.cleanlines?.id,
              freeWater: response.data.freeWater,
              freeWaterId: response.data.freeWater?.id,
              waterDetector: response.data.waterDetector,
              waterDetectorId: response.data.waterDetector?.id,
              workItemId: response.data.workItemId,
              remarks: response.data.remarks,
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
        _url = "/board/standard-form/137";
      } else {
        _confirmText =
          "You are about to update this transaction. Are you sure ?";
        _okText = "Yes, Update";
        _action = "apis/put";
        _url = `/board/standard-form/137/${self.$route.params.id}`;
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
              url: `/board/standard-form/137/${self.$route.params.id}`
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
              url: `/board/standard-form/137/${self.$route.params.id}`,
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
