<template>
  <CardForm :title="title" :subTitle="subTitle" :backButton="true">
    <template #toolbar>
      <b-button-group class="mr-10" v-show="$route.name != route.form">
        <b-button variant="outline-danger" size="lg" @click="handleDelete">
          Delete
        </b-button>
      </b-button-group>
      <b-button variant="primary" size="lg" @click="handleSubmit">
        {{ textButton }}
      </b-button>
    </template>
    <template #form>
      <b-form @submit.stop.prevent="handleSubmit">
        <div class="card-body">
          <Select
            v-if="multipleDppu"
            label="Depot Pengisian Pesawat Udara"
            placeholder="Choose DPPU"
            v-model="form.dppuId"
            :v="$v.form.dppuId"
            :options="options.dppu"
            :multiple="false"
            @input="changeDppu"
            :disabled="$route.name != route.form"
          />
          <Select
            label="Standard Form"
            v-model="form.standardFormId"
            :v="$v.form.standardFormId"
            :options="options.standardForm"
            :multiple="false"
            :disabled="$route.name != route.form"
          />
          <Select
            label="Approver"
            v-model="form.approver"
            :v="$v.form.approver"
            :options="options.approver"
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
import { getDppu, normalizer } from "@/core/utils";

export default {
  data: () => ({
    title: "Approver",
    route: {
      form: "approverCreate",
      table: "approver"
    },
    form: {
      dppuId: null,
      standardFormId: null,
      approver: null
    },
    options: {
      dppu: [],
      standardForm: [],
      approver: []
    }
  }),
  validations: {
    form: {
      dppuId: { required },
      standardFormId: { required },
      approver: { required }
    }
  },
  computed: {
    ...mapGetters("personalize", ["multipleDppu", "dppu"]),
    subTitle() {
      const self = this;
      return self.$route.name != self.route.form
        ? "Update approver"
        : "Create new approver";
    },
    textButton() {
      const self = this;
      return self.$route.name != self.route.form ? "Save Changes" : "Submit";
    }
  },
  created() {
    const self = this;

    self.getStandardForm();

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
      self.changeDppu();
    }

    if (self.$route.name != self.route.form) {
      self.heading = "Update Approver";
      self.get();
    }
  },
  methods: {
    normalizer,
    getStandardForm() {
      const self = this;

      self.$store
        .dispatch("apis/get", {
          url: `/common/standard-form`
        })
        .then(response => {
          if (response.error) {
            self.$message.error({
              zIndex: 10000,
              message: response.message
            });
          } else {
            self.options.standardForm = response.data.data;
          }
        });
    },
    changeDppu() {
      const self = this;

      self.options.approver = [];
      if (self.form.dppuId != null) {
        self.$store
          .dispatch("apis/get", {
            url: "/account",
            params: {
              dppu: self.form.dppuId,
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
              self.options.approver = response.data.data.map(x => ({
                id: x.id,
                label: x.fullName
              }));
            }
          });
      }
    },
    get() {
      const self = this;

      let loader = self.$loading.show();
      self.$store
        .dispatch("apis/get", {
          url: `/approver/${self.$route.params.id}`
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
              dppuId: response.data.dppu.id,
              standardFormId: response.data.standardForm.id,
              approver: response.data.approver.id
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
        _confirmText = "You are about to submit this approver. Are you sure ?";
        _okText = "Yes, Submit";
        _action = "apis/post";
        _url = "/approver";
      } else {
        _confirmText = "You are about to update this approver. Are you sure ?";
        _okText = "Yes, Update";
        _action = "apis/put";
        _url = `/approver/${self.$route.params.id}`;
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
        .confirm("You are about to delete this approver. Are you sure ?", {
          okText: "Yes, Delete",
          cancelText: "Cancel",
          loader: true
        })
        .then(dialog => {
          self.$store
            .dispatch("apis/remove", {
              url: `/approver/${self.$route.params.id}`
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
