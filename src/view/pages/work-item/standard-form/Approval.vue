<template>
  <fragment>
    <CardForm :title="title" :subTitle="subTitle">
      <template #toolbar>
        <b-button
          variant="outline-danger"
          class="mr-2"
          @click="openRejectDialog"
        >
          Reject
        </b-button>
        <b-button variant="primary" @click="handleSubmit">Approve</b-button>
      </template>
      <template #form>
        <div class="card-body">
          <ApprovalGeneralCondition
            v-if="requestInfo.request.standardForm.id == '119'"
            :currentStatus="currentStatus"
            :form="form"
            :validations="$v"
          />
          <CurrentStatus v-else :currentStatus="currentStatus" />
        </div>
      </template>
    </CardForm>
    <b-modal
      v-model="modalReject"
      title="Reason for Rejection"
      ok-title="Reject"
      ok-variant="danger"
      :no-close-on-backdrop="true"
      :no-close-on-esc="true"
      @ok="handleReject"
    >
      <TextArea
        label="Reason"
        placeholder="Please write your reason here..."
        v-model="remarks"
        :v="$v.remarks"
        :useHorizontal="false"
        :useLabel="false"
      />
    </b-modal>
  </fragment>
</template>

<script>
import { required, maxLength } from "vuelidate/lib/validators";
import ApprovalGeneralCondition from "./ApprovalGeneralCondition";
import CurrentStatus from "./CurrentStatus";

export default {
  components: {
    ApprovalGeneralCondition,
    CurrentStatus
  },
  props: {
    title: String,
    subTitle: String,
    requestInfo: Object,
    currentStatus: Object,
    form: Object
  },
  data: () => ({
    modalReject: false,
    remarks: null,
    form: {
      generalCondition: null
    }
  }),
  validations: {
    remarks: { required, maxLength: maxLength(250) },
    form: {
      generalCondition: { required }
    }
  },
  methods: {
    openRejectDialog() {
      const self = this;
      self.$v.remarks.$reset();
      self.modalReject = true;
      self.remarks = null;
    },
    handleReject(event) {
      event.preventDefault();
      const self = this;

      self.$v.remarks.$touch();
      if (self.$v.remarks.$pending || self.$v.remarks.$error) return;

      self.$dialog
        .confirm("You are about to reject this transaction. Are you sure ?", {
          okText: "Yes, Reject",
          cancelText: "Cancel",
          loader: true
        })
        .then(dialog => {
          self.$store
            .dispatch("apis/post", {
              url: `board/evaluate/standard-form/${self.form.workItemId}`,
              params: {
                approved: false,
                remarks: self.remarks
              }
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
    handleSubmit() {
      const self = this;

      let _params = {
        approved: true
      };

      if (self.requestInfo.request.standardForm.id == "119") {
        self.$v.form.generalCondition.$touch();
        if (
          self.$v.form.generalCondition.$pending ||
          self.$v.form.generalCondition.$error
        )
          return;

        _params.generalCondition = self.form.generalCondition;
      }

      self.$dialog
        .confirm("You are about to approve this transaction. Are you sure ?", {
          okText: "Yes, Approve",
          cancelText: "Cancel",
          loader: true
        })
        .then(dialog => {
          self.$store
            .dispatch("apis/post", {
              url: `board/evaluate/standard-form/${self.form.workItemId}`,
              params: _params
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
