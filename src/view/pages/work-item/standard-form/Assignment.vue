<template>
  <CardForm :title="title" :subTitle="subTitle">
    <template #toolbar>
      <b-button variant="primary" @click="handleSubmit">Submit</b-button>
    </template>
    <template #form>
      <b-form @submit.stop.prevent="handleSubmit">
        <div class="card-body">
          <Select
            label="Assigned To"
            v-model="form.assignedTo"
            :v="$v.form.assignedTo"
            :options="options.technician"
            :useHorizontal="false"
            :multiple="false"
          />
        </div>
      </b-form>
    </template>
  </CardForm>
</template>

<script>
import { mapGetters } from "vuex";
import { required } from "vuelidate/lib/validators";

export default {
  props: {
    title: String,
    subTitle: String,
    requestInfo: Object,
    currentStatus: Object,
    form: Object
  },
  data: () => ({
    options: {
      technician: []
    }
  }),
  computed: {
    ...mapGetters("auth", ["user"])
  },
  validations: {
    form: {
      workItemId: { required },
      assignedTo: { required }
    }
  },
  mounted() {
    this.getTechnician();
  },
  methods: {
    getTechnician() {
      const self = this;

      self.$store
        .dispatch("apis/get", {
          url: `/common/technician/${self.requestInfo.dppu.id}/${self.user.role.id}`
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
    },
    handleSubmit() {
      const self = this;

      self.$v.form.$touch();
      if (self.$v.form.$pending || self.$v.form.$error) return;

      let _form = {
        workItemId: self.form.workItemId,
        remarks: self.form.remarks,
        assignedTo: self.form.assignedTo
      };

      self.$dialog
        .confirm("You are about to submit this assignment. Are you sure ?", {
          okText: "Yes, Submit",
          cancelText: "Cancel",
          loader: true
        })
        .then(dialog => {
          self.$store
            .dispatch("apis/post", {
              url: "board/assignment",
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
