<template>
  <CardForm :title="title" :subTitle="subTitle" :backButton="true">
    <template #toolbar>
      <b-button-group
        class="mr-10"
        v-show="$route.name != route.form && user.email != form.email"
      >
        <b-button
          variant="outline-danger"
          size="lg"
          @click="handleResetPassword"
        >
          Reset Password
        </b-button>
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
          <InputText
            label="Full Name"
            v-model="form.fullName"
            :v="$v.form.fullName"
          />
          <InputText
            label="Email Address"
            v-model="form.email"
            type="email"
            :v="$v.form.email"
            :disabled="$route.name != route.form"
          />
          <Phone
            label="Phone Number"
            v-model="form.phone"
            :default-country-code="phone.countryCode"
            size="lg"
            :update="update"
          />
          <Select
            label="Role"
            v-model="form.role"
            :v="$v.form.role"
            :options="role"
            :multiple="false"
          />
          <RadioGroup
            v-if="$route.name != route.form"
            v-model="form.actived"
            label="Status"
            :options="status"
          />
          <Select
            v-if="form.role != 0"
            label="Plant"
            v-model="form.plant"
            :options="plant"
          />
        </div>
      </b-form>
    </template>
  </CardForm>
</template>

<script>
import { mapGetters } from "vuex";
import { required, email } from "vuelidate/lib/validators";
import { status } from "@/core/datasource/options";
import { getDppu, getRole } from "@/core/utils";

export default {
  data: () => ({
    title: "User Management",
    route: {
      form: "userManagementCreate",
      table: "userManagement"
    },
    form: {
      fullName: "",
      email: "",
      phone: "",
      role: null,
      actived: true,
      plant: []
    },
    normalizer(node) {
      return {
        id: node.value,
        label: node.text
      };
    },

    phone: {
      countryCallingCode: "62",
      countryCode: "ID",
      formattedNumber: null
    },
    status,
    role: [],
    plant: []
  }),
  validations: {
    form: {
      fullName: { required },
      email: { required, email },
      role: { required }
    }
  },
  computed: {
    ...mapGetters("auth", ["user"]),
    subTitle() {
      const self = this;
      return self.$route.name != self.route.form
        ? "Update account information"
        : "Create new account";
    },
    textButton() {
      const self = this;
      return self.$route.name != self.route.form ? "Save Changes" : "Submit";
    }
  },
  created() {
    const self = this;

    getRole().then(response => {
      self.role = response.data;
    });

    getDppu().then(response => {
      self.plant = response.data.map(x => ({
        id: x.id,
        label: x.name
      }));
    });
    if (self.$route.name != self.route.form) {
      self.heading = "Update Account";
      self.get();
    }
    // self.form = {
    //   fullName: "Query Abdul Qidam",
    //   email: "qidam@damaco.dev",
    //   phone: "085267625030",
    //   role: 2,
    //   actived: true,
    //   plant: [],
    // };
  },
  methods: {
    getRole,
    update(params) {
      if (params != null) this.phone = params;
    },
    get() {
      const self = this;

      let loader = self.$loading.show();
      self.$store
        .dispatch("apis/get", {
          url: `/account/${self.$route.params.id}`
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
              fullName: response.data.fullName,
              email: response.data.email,
              phone: response.data.phone,
              role: response.data.role.id,
              actived: response.data.actived,
              plant: response.data.dppu.map(x => x.id)
            };

            if (self.form.phone != null) {
              self.phone = self.form.phone;
              self.form.phone = self.form.phone.formattedNumber;
            }
          }
          loader.hide();
        });
    },
    handleSubmit() {
      const self = this;

      self.$v.form.$touch();
      if (self.$v.form.$pending || self.$v.form.$error) return;

      let _form = {
        fullName: self.form.fullName,
        email: self.form.email,
        phone:
          self.phone != null
            ? {
                countryCode: self.phone.countryCode,
                formattedNumber: self.phone.formattedNumber
              }
            : "",
        role: self.form.role,
        actived: self.form.actived,
        dppu: self.form.role != 0 ? self.form.plant : []
      };

      let _confirmText = "",
        _okText = "",
        _action = "",
        _url = "";

      if (self.$route.name == self.route.form) {
        _confirmText = "You are about to submit this account. Are you sure ?";
        _okText = "Yes, Submit";
        _action = "apis/post";
        _url = "/account";
      } else {
        _confirmText = "You are about to update this account. Are you sure ?";
        _okText = "Yes, Update";
        _action = "apis/put";
        _url = `/account/${self.$route.params.id}`;
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

                if (
                  self.user.id == self.$route.params.id &&
                  self.user.email == _form.email
                ) {
                  self.user.fullName = _form.fullName;
                  self.user.phone = _form.phone;
                  self.user.role = {
                    id: _form.role,
                    name: self.role.find(x => x.value == _form.role).text
                  };
                  self.user.actived = _form.actived;
                  self.$store.dispatch("auth/updateUser", self.user);
                }

                self.$router.go(-1);
              }
            });
        });
    },
    handleDelete() {
      const self = this;

      self.$dialog
        .confirm("You are about to delete this account. Are you sure ?", {
          okText: "Yes, Delete",
          cancelText: "Cancel",
          loader: true
        })
        .then(dialog => {
          self.$store
            .dispatch("apis/remove", {
              url: `/account/${self.$route.params.id}`
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
    handleResetPassword() {
      const self = this;

      self.$dialog
        .confirm(
          "You are about to reset password for this account. Are you sure ?",
          {
            okText: "Yes, Reset Password",
            cancelText: "Cancel",
            loader: true
          }
        )
        .then(dialog => {
          self.$store
            .dispatch("apis/post", {
              url: `/account/reset-password`,
              params: {
                email: self.form.email
              }
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
