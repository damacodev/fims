<template>
  <CardForm :title="title" :subTitle="subTitle">
    <template #toolbar>
      <b-button
        v-show="$route.name != route.form"
        class="mr-10"
        variant="outline-danger"
        size="lg"
        @click="handleDelete"
      >
        Delete
      </b-button>
      <b-button variant="primary" size="lg" class="mr-2" @click="handleSubmit">
        {{ textButton }}
      </b-button>
      <b-button variant="secondary" size="lg" @click="$router.go(-1)">
        Back
      </b-button>
    </template>
    <template #form>
      <b-form @submit.stop.prevent="handleSubmit">
        <div class="card-body">
          <InputText
            label="Province"
            v-model="form.province"
            :v="$v.form.province"
          />
          <InputText
            label="Index"
            v-model="form.index"
            :v="$v.form.index"
            type="number"
          />
          <RadioGroup
            v-if="$route.name != route.form"
            v-model="form.actived"
            label="Status"
            :options="options.status"
          />
        </div>
      </b-form>
    </template>
  </CardForm>
</template>

<script>
import { status } from "@/core/datasource/options";
import { required } from "vuelidate/lib/validators";

export default {
  data: () => ({
    title: "Location Index",
    route: {
      form: "locationIndexCreate",
      table: "locationIndex"
    },
    form: {
      province: "",
      index: "",
      actived: true
    },
    options: {
      status
    }
  }),
  validations: {
    form: {
      province: { required },
      index: { required }
    }
  },
  computed: {
    subTitle() {
      const self = this;
      return self.$route.name != self.route.form
        ? "Update location index information"
        : "Create new location index";
    },
    textButton() {
      const self = this;
      return self.$route.name != self.route.form ? "Save Changes" : "Submit";
    }
  },
  created() {
    const self = this;
    if (self.$route.name != self.route.form) {
      self.heading = "Update Location Index";
      self.get();
    }
  },
  methods: {
    get() {
      const self = this;

      let loader = self.$loading.show();
      self.$store
        .dispatch("apis/get", {
          url: `/locationindex/${self.$route.params.id}`
        })
        .then(response => {
          if (response.error) {
            self.$message.error({
              zIndex: 10000,
              message: response.message
            });

            self.$router.push({ name: self.route.table });
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

      if (self.$route.name == self.route.form) {
        _confirmText =
          "You are about to submit this location index. Are you sure ?";
        _okText = "Yes, Submit";
        _action = "apis/post";
        _url = "/locationindex";
      } else {
        _confirmText =
          "You are about to update this location index. Are you sure ?";
        _okText = "Yes, Update";
        _action = "apis/put";
        _url = `/locationindex/${self.$route.params.id}`;
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
          "You are about to delete this location index. Are you sure ?",
          {
            okText: "Yes, Delete",
            cancelText: "Cancel",
            loader: true
          }
        )
        .then(dialog => {
          self.$store
            .dispatch("apis/remove", {
              url: `/locationindex/${self.$route.params.id}`
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
