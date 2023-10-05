<template>
  <CardForm :title="title" :subTitle="subTitle">
    <template slot="toolbar">
      <b-button variant="primary" size="lg" class="mr-2" @click="handleSubmit">
        Submit
      </b-button>
      <b-button variant="secondary" size="lg" @click="$router.go(-1)">
        Cancel
      </b-button>
    </template>
    <template slot="form">
      <b-form @submit.stop.prevent="handleSubmit">
        <div class="card-body">
          <b-row>
            <b-col lg="6" offset-lg="3">
              <Select
                v-if="options.dppu.length != 1"
                label="Depot Pengisian Pesawat Udara"
                v-model="form.dppu"
                :useHorizontal="false"
                :v="$v.form.dppu"
                :options="options.dppu"
                :multiple="false"
                @input="changeDppu"
              />
              <Select
                label="Category"
                v-model="form.category"
                :useHorizontal="false"
                :v="$v.form.category"
                :options="options.category"
                :multiple="false"
                :normalizer="normalizer"
                @input="getActivity"
              />
              <Select
                label="Activity"
                v-model="form.activity"
                :useHorizontal="false"
                :v="$v.form.activity"
                :options="options.activity"
                :multiple="false"
                @input="getEquipment"
              />
              <Select
                label="Equipment"
                v-model="form.equipment"
                :useHorizontal="false"
                :v="$v.form.equipment"
                :options="options.equipment"
                :multiple="false"
              />
            </b-col>
          </b-row>
          <div class="separator separator-dashed mt-8 mb-5"></div>
          <b-row>
            <b-col lg="6" offset-lg="3">
              <TableSparepart :rows="form.spareparts" :editable="true" />
              <b-row>
                <b-col lg="6">
                  <form-group
                    label="Start Date"
                    :useHorizontal="false"
                    :validator="$v.form.startDate"
                  >
                    <DatePicker
                      v-model="form.startDate"
                      :v="$v.form.startDate"
                      type="datetime"
                      input-class="form-control form-control-solid"
                      :show-second="false"
                    />
                  </form-group>
                </b-col>
                <b-col lg="6">
                  <form-group
                    label="Finish Date"
                    :useHorizontal="false"
                    :validator="$v.form.finishDate"
                  >
                    <DatePicker
                      v-model="form.finishDate"
                      :v="$v.form.finishDate"
                      type="datetime"
                      input-class="form-control form-control-solid"
                      :show-second="false"
                    />
                  </form-group>
                </b-col>
              </b-row>
              <TextArea
                label="Notes"
                v-model="form.remarks"
                :useHorizontal="false"
                :v="$v.form.remarks"
              />
              <Select
                label="Assigned To"
                v-model="form.assignedTo"
                :v="$v.form.assignedTo"
                :options="options.technician"
                :useHorizontal="false"
              />
            </b-col>
          </b-row>
        </div>
      </b-form>
    </template>
  </CardForm>
</template>

<script>
import { getDppu } from "@/core/utils";
import { category } from "@/core/datasource/options";
import { required } from "vuelidate/lib/validators";

import TableSparepart from "./work-item/common/TableSparepart.vue";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";

export default {
  components: {
    TableSparepart,
    DatePicker
  },
  data: () => ({
    title: "Create New Work Order",
    subTitle: "Work Order adjustments based on Preventive Maintenance Schedule",
    form: {
      dppu: null,
      category: null,
      activity: null,
      equipment: null,
      spareparts: [],
      startDate: null,
      finishDate: null,
      remarks: null,
      assignedTo: []
    },
    options: {
      dppu: [],
      activity: [],
      equipment: [],
      technician: [],
      category
    },
    normalizer(node) {
      return {
        id: node.value,
        label: node.text
      };
    }
  }),
  validations: {
    form: {
      dppu: { required },
      activity: { required },
      category: { required },
      equipment: { required },
      startDate: { required },
      finishDate: { required },
      assignedTo: { required }
    }
  },
  created() {
    const self = this;
    getDppu().then(response => {
      self.options.dppu = response.data.map(x => ({
        id: x.id,
        label: x.name
      }));

      if (self.options.dppu.length == 1) {
        self.form.dppu = self.options.dppu[0].id;

        self.changeDppu();
      }
    });
  },
  methods: {
    changeDppu() {
      const self = this;

      self.form.category = null;

      self.form.activity = null;
      self.options.activity = [];

      self.form.equipment = null;
      self.options.equipment = [];

      self.form.assignedTo = null;
      self.options.technician = [];

      if (self.form.dppu != null) {
        self.getActivity();
        self.getTechnician();
      }
    },
    getActivity() {
      const self = this;

      self.form.activity = null;
      self.options.activity = [];

      self.form.equipment = null;
      self.options.equipment = [];

      if (self.form.dppu != null && self.form.category != null) {
        let loader = self.$loading.show();

        self.$store
          .dispatch("apis/get", {
            url: `/preventivemaintenance/schedule`,
            params: {
              dppu: self.form.dppu,
              category: [self.form.category],
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
              self.options.activity = response.data.data.map(x => ({
                id: x.id,
                label: x.activity.title,
                detail: x
              }));
            }
          });

        loader.hide();
      }
    },
    getEquipment() {
      const self = this;

      self.form.equipment = null;
      self.options.equipment = [];
      let activity = self.options.activity.find(
        x => x.id == self.form.activity
      );
      if (activity != null) self.options.equipment = activity.detail.equipments;
    },
    getTechnician() {
      const self = this;

      if (self.form.dppu != null) {
        self.$store
          .dispatch("apis/get", {
            url: `/common/technician/${self.form.dppu}`
          })
          .then(response => {
            if (response.error) {
              self.$message.error({
                zIndex: 10000,
                message: response.message
              });
            } else {
              self.options.technician = response.data;
            }
          });
      }
    },
    handleSubmit() {
      const self = this;

      self.$v.form.$touch();
      if (self.$v.form.$pending || self.$v.form.$error) return;

      let _form = {
        dppuId: self.form.dppu,
        category: self.form.category,
        scheduleId: self.form.activity,
        equipmentId: self.form.equipment,
        spareparts: self.form.spareparts.map(x => ({
          sparepartId: x.id,
          quantity: x.quantity
        })),
        startDate: self.form.startDate,
        finishDate: self.form.finishDate,
        remarks: self.form.remarks,
        assignedTo: self.form.assignedTo
      };

      self.$dialog
        .confirm("You are about to submit this report. Are you sure ?", {
          okText: "Yes, Submit",
          cancelText: "Cancel",
          loader: true
        })
        .then(dialog => {
          self.$store
            .dispatch("apis/post", {
              url: "board/preventive-maintenance",
              params: _form
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

                self.$router.push({ name: "workItem" });
              }
            });
        });
    }
  }
};
</script>
