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
          Update
        </b-button>
        <b-button variant="secondary" size="lg" @click="back"> Back </b-button>
      </div>
    </div>
    <b-row class="p-2">
      <div class="card-body pb-0">
        <template v-if="buttonVisibility">
          <InputPlainText
            label="Depot Pengisian Pesawat Udara"
            css-class="m-0"
            v-model="form.dppu.label"
          />
          <InputPlainText
            label="Transaction #"
            css-class="m-0"
            v-model="form.transactionId"
          />
          <InputPlainText
            label="Transaction Date"
            v-model="form.transactionDate"
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
    <div v-show="$route.name != route.form">
      <TableItem
        :transactionDate="form.transactionDate"
        :rows="table.rows"
        :buttonVisibility="buttonVisibility"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import FormHeader from "../common/FormHeader.vue";
import TableItem from "./TableItem.vue";
import { required, maxLength } from "vuelidate/lib/validators";
import {
  getDppu,
  numberFormat,
  getDate,
  dateFormat,
  isNullOrEmpty
} from "@/core/utils";

export default {
  components: {
    FormHeader,
    TableItem
  },
  data: () => ({
    title: "112 SF - Storage Tank Water Draw Off Record",
    route: {
      form: "sf112Create",
      table: "sf112"
    },
    form: {
      dppu: {
        id: null,
        label: null
      },
      dppuId: null,
      transactionId: "Auto Generated",
      transactionDate: getDate(),
      remarks: null,
      sendApproval: false,
      updatedBy: null,
      updatedAt: null
    },
    currentProgress: {
      status: null,
      remarks: null,
      nextAction: {
        id: null,
        label: null
      }
    },
    table: {
      rows: []
    },
    options: {
      dppu: []
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
    buttonVisibility() {
      const self = this;
      if (
        (self.$route.name != self.route.form &&
          !["New", "Rejected"].includes(self.currentProgress.status)) ||
        (self.currentProgress.status == "Rejected" &&
          self.user.id != self.currentProgress.nextAction.id)
      ) {
        return false;
      } else if (
        self.currentProgress.status == "Rejected" &&
        self.user.id == self.currentProgress.nextAction.id
      ) {
        return true;
      }
      return true;
    }
  },
  validations: {
    form: {
      dppuId: { required },
      transactionDate: { required },
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

    if (self.$route.name != self.route.form) {
      self.get();
    }
  },
  methods: {
    dateFormat,
    numberFormat,
    back() {
      const self = this;

      if (isNullOrEmpty(self.$route.query.from || "")) self.$router.go(-1);
      else window.close();
    },
    get() {
      const self = this;

      let loader = self.$loading.show();
      self.$store
        .dispatch("apis/get", {
          url: `/board/standard-form/112/${self.$route.params.id}`
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
              remarks: response.data.remarks,
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

            self.table.rows = response.data.details.map(x => ({
              id: x.id,
              equipment: x.equipment,
              volume: x.volume,
              resultBeforeId: x.resultBefore?.id ?? null,
              resultBefore: x.resultBefore,
              resultAfterId: x.resultAfter?.id ?? null,
              resultAfter: x.resultAfter,
              receiverTank: x.receiverTank
            }));
          }
        })
        .finally(() => loader.hide());
    },
    handleSubmit() {
      const self = this;

      self.$v.form.$touch();
      if (self.$v.form.$pending || self.$v.form.$error) return;

      self.$dialog
        .confirm("You are about to update this transaction. Are you sure ?", {
          okText: "Yes, Update",
          cancelText: "Cancel",
          loader: true
        })
        .then(dialog => {
          self.$store
            .dispatch("apis/put", {
              url: `/board/standard-form/112/${self.$route.params.id}`,
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
              url: `/board/standard-form/112/${self.$route.params.id}`,
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
