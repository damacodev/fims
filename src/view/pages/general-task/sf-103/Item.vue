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
  decimal
  // maxLength,
} from "vuelidate/lib/validators";

export default {
  components: {
    FormItem,
    FormPlain
  },
  data: () => ({
    title: "103 SF - Bridger Quality Control Before Receipt Record",
    subTitle: "You can make a record here",
    route: {
      form: "sf103CreateItem"
    },
    form: {
      standardForm103Id: null,
      dppu: {
        id: null,
        label: null
      },
      dppuId: null,
      transactionId: null,
      transactionDate: null,
      shift: {
        id: null,
        label: null
      },
      grade: null,
      updatedBy: null,
      updatedAt: null,
      time: null,
      recordTime: null,
      ritase: 1,
      bridgerId: null,
      bridgerNo: null,
      jumlahKompartemen: null,
      bppNo: null,
      volume: null,
      seal: null,
      tankBatchDocument: {
        testReportNo: null,
        densityAt15Celcius: null
      },
      receivingDocument: {
        afrnNo: null,
        densityObserved: null,
        temperature: null,
        densityAt15Celcius: null
      },
      records: [
        {
          controlCheck: {
            densityObserved: null,
            temperature: null,
            densityAt15Celcius: null,
            maximumDifferential: null
          },
          appearanceIds: [],
          conductivity: null,
          tankNo: null
        },
        {
          controlCheck: {
            densityObserved: null,
            temperature: null,
            densityAt15Celcius: null,
            maximumDifferential: null
          },
          appearanceIds: [],
          conductivity: null,
          tankNo: null
        },
        {
          controlCheck: {
            densityObserved: null,
            temperature: null,
            densityAt15Celcius: null,
            maximumDifferential: null
          },
          appearanceIds: [],
          conductivity: null,
          tankNo: null
        },
        {
          controlCheck: {
            densityObserved: null,
            temperature: null,
            densityAt15Celcius: null,
            maximumDifferential: null
          },
          appearanceIds: [],
          conductivity: null,
          tankNo: null
        }
      ]
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
      standardForm103Id: { required },
      time: { required },
      ritase: { required },
      bridgerId: { required },
      // bridgerNo: { required },
      bppNo: { required },
      volume: { required, decimal },
      seal: { required },
      tankBatchDocument: {
        testReportNo: { required },
        densityAt15Celcius: { required, decimal }
      },
      receivingDocument: {
        afrnNo: { required },
        densityObserved: { required, decimal },
        temperature: { required, integer },
        densityAt15Celcius: { required, decimal }
      }
      /* records: [
        {
          controlCheck: {
            densityObserved: { required, decimal },
            temperature: { required, integer },
            densityAt15Celcius: { required, decimal },
            maximumDifferential: { required, decimal },
          },
          appearanceIds: { required },
          conductivity: { required, integer },
          tankNo: { required, maxLength: maxLength(50) },
        },
        {
          controlCheck: {
            densityObserved: { required, decimal },
            temperature: { required, integer },
            densityAt15Celcius: { required, decimal },
            maximumDifferential: { required, decimal },
          },
          appearanceIds: { required },
          conductivity: { required, integer },
          tankNo: { required, maxLength: maxLength(50) },
        },
        {
          controlCheck: {
            densityObserved: { required, decimal },
            temperature: { required, integer },
            densityAt15Celcius: { required, decimal },
            maximumDifferential: { required, decimal },
          },
          appearanceIds: { required },
          conductivity: { required, integer },
          tankNo: { required, maxLength: maxLength(50) },
        },
        {
          controlCheck: {
            densityObserved: { required, decimal },
            temperature: { required, integer },
            densityAt15Celcius: { required, decimal },
            maximumDifferential: { required, decimal },
          },
          appearanceIds: { required },
          conductivity: { required, integer },
          tankNo: { required, maxLength: maxLength(50) },
        },
      ], */
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

    /* self.form.time = "10:22";
    self.form.bridgerNo = "BR123";
    self.form.bppNo = "BPP123";
    self.form.volume = 9800;
    self.form.seal = "S123";
    self.form.receivingDocument = {
      afrnNo: "AFRN123",
      densityObserved: 90.8,
      temperature: 26,
      densityAt15Celcius: 67.2
    };
    self.form.controlCheck = {
      densityObserved: 87.4,
      temperature: 31,
      densityAt15Celcius: 54.22,
      maximumDifferential: 43.123
    };
    // self.form.appearanceIds = "1E";
    self.form.conductivity = 32; */
  },
  methods: {
    get() {
      const self = this;

      let loader = self.$loading.show();
      self.$store
        .dispatch("apis/get", {
          url: `/board/standard-form/103/${self.$route.params.id}`
        })
        .then(response => {
          if (response.error) {
            self.$message.error({
              zIndex: 10000,
              message: response.message
            });

            self.$router.push({ name: self.route.table });
          } else {
            self.form.standardForm103Id = response.data.id;
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
          url: `/board/standard-form/103/record/${self.$route.params.iditem}`
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
            self.form.bridgerId = response.data.bridgerId;
            self.form.bppNo = response.data.bppNo;
            self.form.volume = response.data.volume;
            self.form.seal = response.data.seal;
            self.form.tankBatchDocument = response.data.tankBatchDocument;
            self.form.receivingDocument = response.data.receivingDocument;

            if (response.data.records != null) {
              response.data.records.forEach((item, index) => {
                self.form.records[index].controlCheck = item.controlCheck;
                self.form.records[index].appearanceIds = self.currentProgress
                  .locked
                  ? item.appearanceIds
                  : item.appearanceIds.map(x => x.id);
                self.form.records[index].conductivity = item.conductivity;
                self.form.records[index].tankNo = item.tankNo;
              });
            }
          }
        })
        .finally(() => loader.hide());
    },
    handleSubmit() {
      const self = this;

      self.$v.form.$touch();
      if (self.$v.form.$pending || self.$v.form.$error) return;

      let loader = self.$loading.show();
      let /* _confirmText = "",
        _okText = "", */
        _action = "",
        _url = "";

      if (self.$route.name == self.route.form) {
        // _confirmText = "You are about to submit this record. Are you sure ?";
        // _okText = "Yes, Submit";
        _action = "apis/post";
        _url = "/board/standard-form/103/record";
      } else {
        // _confirmText = "You are about to update this record. Are you sure ?";
        // _okText = "Yes, Update";
        _action = "apis/put";
        _url = `/board/standard-form/103/record/${self.$route.params.iditem}`;
      }

      let records = [];
      for (let index = 0; index < self.form.jumlahKompartemen; index++) {
        let record = self.form.records[index];

        records.push(record);
      }

      let _form = {
        standardForm103Id: self.form.standardForm103Id,
        bridgerId: self.form.bridgerId,
        recordTime: dateTimeFormat(
          `${self.form.transactionDate} ${self.form.time}`,
          "YYYY-MM-DD HH:mm:ss"
        ),
        ritase: self.form.ritase,
        bppNo: self.form.bppNo,
        volume: self.form.volume,
        seal: self.form.seal,
        tankBatchDocument: self.form.tankBatchDocument,
        receivingDocument: self.form.receivingDocument,
        records: records
      };

      // self.$dialog
      //   .confirm(_confirmText, {
      //     okText: _okText,
      //     cancelText: "Cancel",
      //     loader: true,
      //   })
      //   .then((dialog) => {
      self.$store
        .dispatch(_action, {
          url: _url,
          params: _form
        })
        .then(response => {
          // dialog.close();
          if (response.error) {
            self.$message.error({
              zIndex: 10000,
              message: response.message
            });
          } else {
            // self.$message.success({
            //   zIndex: 10000,
            //   message: response.message,
            // });

            self.$router.go(-1);
          }
        })
        .finally(() => loader.hide());
      // });
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
              url: `/board/standard-form/103/record/${self.$route.params.iditem}`
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
