<template>
  <CardForm :title="title" :subTitle="subTitle" :backButton="true">
    <template slot="toolbar">
      <b-button variant="primary" size="lg" @click="handleSubmit">
        {{ textButton }}
      </b-button>
    </template>
    <template slot="form">
      <b-form @submit.stop.prevent="handleSubmit">
        <div class="card-body">
          <InputText
            label="Key"
            v-model="form.id"
            :v="$v.form.id"
            :disabled="true"
          />
          <InputText label="Value" v-model="form.value" :v="$v.form.value" />
        </div>
      </b-form>
    </template>
  </CardForm>
</template>

<script>
import { required } from "vuelidate/lib/validators";

export default {
  data: () => ({
    title: "Configuration",
    route: {
      form: "configurationCreate",
      table: "configuration"
    },
    form: {
      id: "",
      value: ""
    }
  }),
  validations: {
    form: {
      id: { required },
      value: { required }
    }
  },
  computed: {
    subTitle() {
      const self = this;
      return self.$route.name != self.route.form
        ? "Update configuration"
        : "Create new configuration";
    },
    textButton() {
      const self = this;
      return self.$route.name != self.route.form ? "Save Changes" : "Submit";
    }
  },
  created() {
    const self = this;
    if (self.$route.name != self.route.form) {
      self.heading = "Update Configuration";
      self.get();
    }
    // self.form = {
    //   fullName: "Habibullah",
    //   email: "habeb@basyenk.info",
    //   phone: "085267625030",
    //   position: "Programmer",
    //   gender: 0,
    //   role: 2,
    //   actived: true,
    //   dppu: [],
    // };
  },
  methods: {
    get() {
      const self = this;

      let loader = self.$loading.show();
      self.$store
        .dispatch("apis/get", {
          url: `/common/configuration/${self.$route.params.id}`
        })
        .then(response => {
          if (response.error) {
            // if (response.statusCode == "404") {
            //   self.$router.push({ name: "404" });
            // } else {
            self.$message.error({
              zIndex: 10000,
              message: response.message
            });
            // }
          } else {
            self.form = response.data;
          }
          loader.hide();
        });
    },
    handleSubmit() {
      const self = this;

      self.$v.form.$touch();
      if (self.$v.form.$pending || self.$v.form.$error) return;

      let _confirmText = "",
        _okText = "",
        _action = "",
        _url = "";

      _confirmText =
        "You are about to update this configuration. Are you sure ?";
      _okText = "Yes, Update";
      _action = "apis/put";
      _url = `/common/configuration/${self.$route.params.id}`;

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
    }
  }
};
</script>
