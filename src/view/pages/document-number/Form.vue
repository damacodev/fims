<template>
  <CardForm :title="title" :subTitle="subTitle" :backButton="true">
    <template #toolbar>
      <b-button-group class="mr-2" v-show="$route.name != route.form">
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
          <InputText
            label="Format"
            type="text"
            v-model="form.format"
            :v="$v.form.format"
          />
        </div>
      </b-form>
    </template>
  </CardForm>
</template>

<script>
import { mapGetters } from "vuex";
import { required, maxLength } from "vuelidate/lib/validators";
import { getDppu, normalizer } from "@/core/utils";

export default {
  data: () => ({
    title: "Document Number",
    route: {
      form: "documentNumberCreate",
      table: "documentNumber"
    },
    form: {
      dppuId: null,
      standardFormId: null,
      format: null
    },
    options: {
      dppu: [],
      standardForm: []
    }
  }),
  validations: {
    form: {
      dppuId: { required },
      standardFormId: { required },
      format: { maxLength: maxLength(100) }
    }
  },
  computed: {
    ...mapGetters("personalize", ["multipleDppu", "dppu"]),
    subTitle() {
      const self = this;
      return self.$route.name != self.route.form
        ? "Update document number"
        : "Create new document number";
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
    }

    if (self.$route.name != self.route.form) {
      self.heading = "Update Document Number";
      self.get();
    }
  },
  methods: {
    normalizer,
    getStandardForm() {
      const self = this;

      self.$store
        .dispatch("apis/get", {
          url: `/common/standard-form`,
          params: {
            numberingDocument: true
          }
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
    get() {
      const self = this;

      let loader = self.$loading.show();
      self.$store
        .dispatch("apis/get", {
          url: `/documentnumber/${self.$route.params.id}`
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
              format: response.data.format
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
        _confirmText =
          "You are about to submit this document number. Are you sure ?";
        _okText = "Yes, Submit";
        _action = "apis/post";
        _url = "/documentnumber";
      } else {
        _confirmText =
          "You are about to update this document number. Are you sure ?";
        _okText = "Yes, Update";
        _action = "apis/put";
        _url = `/documentnumber/${self.$route.params.id}`;
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
        .confirm(
          "You are about to delete this document number. Are you sure ?",
          {
            okText: "Yes, Delete",
            cancelText: "Cancel",
            loader: true
          }
        )
        .then(dialog => {
          self.$store
            .dispatch("apis/remove", {
              url: `/documentnumber/${self.$route.params.id}`
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
