<template>
  <CardForm :title="title" :subTitle="subTitle">
    <template #toolbar>
      <b-button variant="primary" @click="handleSubmit"> Approve </b-button>
    </template>
    <template #form>
      <div class="card-body">
        <CurrentStatus :currentStatus="currentStatus" />
      </div>
    </template>
  </CardForm>
</template>

<script>
import CurrentStatus from "./CurrentStatus";

export default {
  components: {
    CurrentStatus
  },
  props: {
    title: String,
    subTitle: String,
    requestInfo: Object,
    currentStatus: Object,
    form: Object
  },
  methods: {
    handleSubmit() {
      const self = this;

      self.$dialog
        .confirm("You are about to approve this transaction. Are you sure ?", {
          okText: "Yes, Approve",
          cancelText: "Cancel",
          loader: true
        })
        .then(dialog => {
          self.$store
            .dispatch("apis/post", {
              url: `board/evaluate/standard-form/${self.form.workItemId}`
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
