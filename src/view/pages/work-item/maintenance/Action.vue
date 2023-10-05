<template>
  <CardForm :title="title" :subTitle="subTitle">
    <template #toolbar>
      <b-button
        v-if="!requestInfo.locked"
        variant="primary"
        @click="handleSubmit"
      >
        Submit
      </b-button>
    </template>
    <template #form>
      <b-form v-if="!requestInfo.locked" @submit.stop.prevent="handleSubmit">
        <div class="card-body">
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
            :options="technician"
            :useHorizontal="false"
          />
        </div>
      </b-form>
      <b-form v-else-if="requestInfo.locked && requestInfo.workOrder == null">
        <Empty />
      </b-form>
      <b-form v-else-if="requestInfo.locked && requestInfo.workOrder != null">
        <Info
          :workOrder="requestInfo.workOrder"
          :spareparts="form.spareparts"
        />
      </b-form>
    </template>
  </CardForm>
</template>

<script>
import Empty from "./Empty.vue";
import Info from "./Info.vue";
import TableSparepart from "../common/TableSparepart.vue";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";

import { required } from "vuelidate/lib/validators";

export default {
  components: {
    Empty,
    Info,
    TableSparepart,
    DatePicker
  },
  props: {
    title: String,
    subTitle: String,
    requestInfo: Object,
    form: Object,
    technician: Array
  },
  validations: {
    form: {
      workItemId: { required },
      startDate: { required },
      finishDate: { required },
      assignedTo: { required }
    }
  },
  methods: {
    handleSubmit() {
      const self = this;

      self.$v.form.$touch();
      if (self.$v.form.$pending || self.$v.form.$error) return;

      let _form = {
        startDate: self.form.startDate,
        finishDate: self.form.finishDate,
        remarks: self.form.remarks,
        assignedTo: self.form.assignedTo,
        referenceId: self.form.workItemId,
        spareparts: self.form.spareparts.map(x => ({
          sparepartId: x.id,
          quantity: x.quantity
        }))
      };

      self.$dialog
        .confirm("You are about to submit this work order. Are you sure ?", {
          okText: "Yes, Submit",
          cancelText: "Cancel",
          loader: true
        })
        .then(dialog => {
          self.$store
            .dispatch("apis/post", {
              url: "board/workorder",
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

                self.$router.go(-1);
              }
            });
        });
    }
  }
};
</script>
