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
              v-show="$route.name != route.form"
              variant="outline-danger"
              size="lg"
              class="mr-2"
              @click="handleDelete"
            >
              Delete
            </b-button>
            <b-button variant="primary" size="lg" @click="handleSubmit">
              {{ textButton }}
            </b-button>
          </div>
        </div>
        <b-row class="p-2">
          <div class="card-body pb-0">
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
            <InputMoney
              label="At Max Test Flow Rate"
              v-model="form.maxTestFlowRate"
              :usePrefix="false"
              append="l/m/USGPM"
            />
            <InputMoney
              label="Against Rig Pressure P.3"
              v-model="form.againstRigPressure"
              :usePrefix="false"
              append="bar/psi"
            />
            <Select
              label="Opening"
              description="Time from start of flow to maximum flow"
              placeholder="Select Result"
              v-model="form.openingId"
              :options="options.deadmanValveTest"
              :multiple="false"
            />
            <Select
              label="Closing"
              description="Time from initial flow reduction to zero flow"
              placeholder="Select Result"
              v-model="form.closingId"
              :options="options.deadmanValveTest"
              :multiple="false"
            />
            <Select
              label="Overshoot"
              description="Volume passed from deadman release to zero flow"
              placeholder="Select Result"
              v-model="form.overshootId"
              :options="options.deadmanValveTest"
              :multiple="false"
            />
          </div>
        </b-row>
      </div>
    </b-col>
  </b-row>
</template>

<script>
import { mapGetters } from "vuex";
import { required } from "vuelidate/lib/validators";
import {
  getDppu,
  getDate,
  dateFormat,
  getDeadmanValveTest
} from "@/core/utils";

export default {
  data: () => ({
    title: "217 SF - Deadman Valve Test",
    route: {
      form: "sf217Create",
      table: "sf217"
    },
    form: {
      dppu: {
        id: null,
        label: null
      },
      dppuId: null,
      transactionId: "Auto Generated",
      transactionDate: getDate(),
      maxTestFlowRate: null,
      againstRigPressure: null,
      openingId: null,
      closingId: null,
      overshootId: null,
      updatedBy: null,
      updatedAt: null
    },
    options: {
      dppu: [],
      deadmanValveTest: []
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
      self.form.dppu = self.dppu;
      self.form.dppuId = self.dppu.id;
    }

    getDeadmanValveTest().then(response => {
      self.options.deadmanValveTest = response;
    });

    if (self.$route.name != self.route.form) {
      self.get();
    }
  },
  methods: {
    dateFormat,
    getDate,
    get() {
      const self = this;

      let loader = self.$loading.show();
      self.$store
        .dispatch("apis/get", {
          url: `/board/standard-form/217/${self.$route.params.id}`
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
              maxTestFlowRate: response.data.maxTestFlowRate,
              againstRigPressure: response.data.againstRigPressure,
              opening: response.data.opening,
              openingId: response.data.opening?.id,
              closing: response.data.closing,
              closingId: response.data.closing?.id,
              overshoot: response.data.overshoot,
              overshootId: response.data.overshoot?.id,
              updatedBy: response.data.updatedBy,
              updatedAt: response.data.updatedAt
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
        _url = "/board/standard-form/217";
      } else {
        _confirmText =
          "You are about to update this transaction. Are you sure ?";
        _okText = "Yes, Update";
        _action = "apis/put";
        _url = `/board/standard-form/217/${self.$route.params.id}`;
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
              url: `/board/standard-form/217/${self.$route.params.id}`
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
