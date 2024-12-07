<template>
  <div class="d-flex flex-column flex-root">
    <div
      class="
        login login-1
        d-flex
        flex-column flex-lg-row flex-column-fluid
        bg-white
      "
    >
      <!--begin::Aside-->
      <div
        class="login-aside d-flex flex-column flex-row-auto"
        style="background-color: #036ab7"
      >
        <div class="d-flex flex-column-auto flex-column pt-lg-40 pt-15">
          <a href="#" class="text-center mb-10">
            <img
              :src="require('@/assets/media/logos/logo-mini-white.png')"
              class="max-h-70px"
            />
          </a>
          <h3
            class="
              font-weight-bolder
              text-center
              font-size-h4 font-size-h1-lg
              text-white
            "
            style="color: #986923"
          >
            Facility Integrity<br />Management System<br />PT Pertamina
            (Persero)
          </h3>
        </div>
        <div
          class="
            aside-img
            d-flex
            flex-row-fluid
            bgi-no-repeat bgi-position-y-bottom bgi-position-x-center
          "
          :style="{
            backgroundImage: `url(${require('@/assets/media/svg/illustrations/refinery.svg')})`
          }"
        ></div>
      </div>
      <!--begin::Aside-->
      <!--begin::Content-->
      <div
        class="
          login-content
          flex-row-fluid
          d-flex
          flex-column
          justify-content-center
          position-relative
          overflow-hidden
          p-7
          mx-auto
        "
      >
        <div class="d-flex flex-column-fluid flex-center">
          <div class="login-form">
            <b-form @submit.stop.prevent="handleSubmit" class="form">
              <div class="pb-13 pt-lg-0 pt-5">
                <h3
                  class="
                    font-weight-bolder
                    text-dark
                    font-size-h4 font-size-h1-lg
                  "
                >
                  Welcome, {{ fullName }}
                </h3>
                <span class="text-muted font-weight-bold font-size-h5">
                  Please setup your credentials to use FIMS Application
                </span>
              </div>
              <InputText
                label="New Password"
                placeholder="Enter your password..."
                type="password"
                label-class="font-size-h6 font-weight-bolder text-dark"
                content-class="form-control-solid h-auto py-7 px-6 rounded-lg"
                :use-horizontal="false"
                v-model="form.newPassword"
                :v="$v.form.newPassword"
              />
              <InputText
                label="Confirm Your New Password"
                placeholder="Enter confirm your password..."
                type="password"
                label-class="font-size-h6 font-weight-bolder text-dark"
                content-class="form-control-solid h-auto py-7 px-6 rounded-lg"
                :use-horizontal="false"
                v-model="form.confirmNewPassword"
                :v="$v.form.confirmNewPassword"
              />
              <div class="pb-lg-0 pb-5">
                <b-button
                  type="submit"
                  variant="primary"
                  class="font-weight-bolder font-size-h6 px-15 py-4 my-3 mr-3"
                >
                  Submit
                </b-button>
              </div>
            </b-form>
          </div>
        </div>
        <div
          class="
            d-flex
            justify-content-lg-start justify-content-center
            align-items-end
            py-7 py-lg-0
          "
        >
          <a
            href="https://damaco.dev"
            target="_blank"
            class="text-primary font-weight-bolder font-size-h5"
          >
            Build with &hearts; by Damaco.Dev
          </a>
        </div>
        <!--end::Content footer-->
      </div>
      <!--end::Content-->
    </div>
  </div>
</template>

<!-- Load login custom page styles -->
<style lang="scss">
@import "@/assets/sass/pages/login/login-1.scss";
</style>

<script>
import { required, sameAs } from "vuelidate/lib/validators";

export default {
  data: () => ({
    fullName: null,
    form: {
      newPassword: null,
      confirmNewPassword: null
    }
  }),
  validations: {
    form: {
      newPassword: { required },
      confirmNewPassword: {
        required,
        sameAsNewPassword: sameAs("newPassword")
      }
    }
  },
  created() {
    this.get();
  },
  methods: {
    get() {
      const self = this;
      self.token = self.$route.query.token;

      if (!self.token) self.$router.push({ name: "signin" });

      let loader = self.$loading.show();
      self.$store
        .dispatch("apis/get", {
          url: `auth/forgot-password/${self.token}`
        })
        .then(response => {
          if (response.error) {
            self.$message.error({
              zIndex: 10000,
              message: response.message
            });
          } else {
            self.fullName = response.data.fullName;
          }

          loader.hide();
        });
    },
    handleSubmit() {
      const self = this;

      self.$v.form.$touch();
      if (self.$v.form.$pending || self.$v.form.$error) return;

      let loader = self.$loading.show();
      self.$store
        .dispatch("apis/put", {
          url: `auth/change-password/${self.token}`,
          params: self.form
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

            self.$router.push({ name: "login" });
          }
          loader.hide();
        });
    }
  }
};
</script>
