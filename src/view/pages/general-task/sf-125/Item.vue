<template>
  <CardForm :title="title" :subTitle="subTitle" :backButton="true">
    <template slot="toolbar">
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
        v-show="!currentProgress.locked"
        variant="primary"
        size="lg"
        @click="handleSubmit"
      >
        {{ textButton }}
      </b-button>
    </template>
    <template slot="form">
      <FormItem
        v-if="!currentProgress.locked"
        :form="form"
        :currentProgress="currentProgress"
        :validations="$v"
        @onSubmit="handleSubmit"
      />
      <FormPlain v-else :form="form" :currentProgress="currentProgress" />
    </template>
  </CardForm>
</template>

<script>
import { mapGetters } from "vuex";
import FormItem from "./FormItem.vue";
import FormPlain from "./FormPlain.vue";

import { dateFormat, dateTimeFormat } from "@/core/utils";

import {
  required,
  integer,
  decimal,
  maxLength
} from "vuelidate/lib/validators";

export default {
  components: {
    FormItem,
    FormPlain
  },
  data: () => ({
    title: "125 SF - Data Penerimaan Avtur",
    subTitle: "You can make a record here",
    route: {
      form: "sf125CreateItem"
    },
    form: {
      standardForm125Id: null,
      dppu: {
        id: null,
        label: null
      },
      transactionId: null,
      transactionDate: null,
      shift: {
        id: null,
        label: null
      },
      updatedBy: null,
      updatedAt: null,
      time: null,
      recordTime: null,
      equipment: {
        id: null,
        label: null
      },
      equipmentId: null,
      strainer: {
        s101A: null,
        s101B: null,
        s101C: null,
        s101D: null
      },
      microFilter: {
        s102A: null,
        s102B: null
      },
      filterSeparator: {
        s103A: null,
        s103B: null
      },
      densityObserved: null,
      temperatureObserved: null,
      elcond: null,
      flowRate: null,
      jumlahTransfer: null,
      visualCheckIds: [],
      remarks: null
    },
    currentProgress: {
      locked: null,
      status: null,
      remarks: null,
      nextAction: {
        id: null,
        label: null
      }
    }
  }),
  validations: {
    form: {
      standardForm125Id: { required },
      time: { required },
      equipmentId: { required },
      microFilter: {
        s102A: { required, integer },
        s102B: { required, integer }
      },
      filterSeparator: {
        s103A: { required, integer },
        s103B: { required, integer }
      },
      densityObserved: { required, decimal },
      temperatureObserved: { required },
      elcond: { required },
      flowRate: { required, decimal },
      visualCheckIds: { required },
      remarks: { maxLength: maxLength(50) }
    }
  },
  computed: {
    ...mapGetters("auth", ["user"]),
    textButton() {
      const self = this;
      return self.$route.name != self.route.form ? "Update" : "Submit";
    }
  },
  created() {
    const self = this;
    self.get();
  },
  methods: {
    get() {
      const self = this;

      let loader = self.$loading.show();
      self.$store
        .dispatch("apis/get", {
          url: `/board/standard-form/125/${self.$route.params.id}`
        })
        .then(response => {
          if (response.error) {
            self.$message.error({
              zIndex: 10000,
              message: response.message
            });

            self.$router.push({ name: self.route.table });
          } else {
            self.form.standardForm125Id = response.data.id;
            self.form.dppu = response.data.dppu;
            self.form.transactionId = response.data.transactionId;
            self.form.transactionDate = dateFormat(
              response.data.transactionDate,
              "YYYY-MM-DD"
            );
            self.form.shift = {
              id: response.data.shift?.id,
              label: response.data.shift?.label
            };
            self.form.grade = response.data.grade;
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

            if (self.$route.name != self.route.form) {
              self.getById();
            }
          }
        })
        .finally(() => loader.hide());
    },
    getById() {
      const self = this;

      let loader = self.$loading.show();
      self.$store
        .dispatch("apis/get", {
          url: `/board/standard-form/125/record/${self.$route.params.iditem}`
        })
        .then(response => {
          if (response.error) {
            self.$message.error({
              zIndex: 10000,
              message: response.message
            });

            self.$router.push({ name: self.route.table });
          } else {
            self.form.time = dateTimeFormat(response.data.recordTime, "HH:mm");
            self.form.equipment = response.data.equipment;
            self.form.equipmentId = response.data.equipment.id;
            self.form.strainer = response.data.strainer;
            self.form.microFilter = response.data.microFilter;
            self.form.filterSeparator = response.data.filterSeparator;
            self.form.densityObserved = response.data.densityObserved;
            self.form.temperatureObserved = response.data.temperatureObserved;
            self.form.elcond = response.data.elcond;
            self.form.flowRate = response.data.flowRate;
            self.form.jumlahTransfer = response.data.jumlahTransfer;
            self.form.visualCheckIds = self.currentProgress.locked
              ? response.data.visualCheckIds
              : response.data.visualCheckIds.map(x => x.id);
            self.form.remarks = response.data.remarks;
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
        _confirmText = "You are about to submit this record. Are you sure ?";
        _okText = "Yes, Submit";
        _action = "apis/post";
        _url = "/board/standard-form/125/record";
      } else {
        _confirmText = "You are about to update this record. Are you sure ?";
        _okText = "Yes, Update";
        _action = "apis/put";
        _url = `/board/standard-form/125/record/${self.$route.params.iditem}`;
      }

      self.$dialog
        .confirm(_confirmText, {
          okText: _okText,
          cancelText: "Cancel",
          loader: true
        })
        .then(dialog => {
          self.form.recordTime = dateTimeFormat(
            `${self.form.transactionDate} ${self.form.time}`,
            "YYYY-MM-DD HH:mm:ss"
          );
          self.$store
            .dispatch(_action, {
              url: _url,
              params: self.form
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

                self.$router.go(-1);
              }
            });
        });
    },
    handleDelete() {
      const self = this;

      self.$dialog
        .confirm("You are about to delete this record. Are you sure ?", {
          okText: "Yes, Delete",
          cancelText: "Cancel",
          loader: true
        })
        .then(dialog => {
          self.$store
            .dispatch("apis/remove", {
              url: `/board/standard-form/125/record/${self.$route.params.iditem}`
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

                self.$router.go(-1);
              }
            });
        });
    }
  }
};
</script>
