<template>
  <div class="d-flex flex-column flex-root">
    <div
      class="
        login login-1
        d-flex
        flex-column flex-lg-row flex-column-fluid
        bg-white
      "
      :class="{
        'login-signin-on': this.state == 'signin',
        'login-forgot-on': this.state == 'forgot'
      }"
      id="kt_login"
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
            Maintenance 4.0<br />PT Pertamina (Persero)
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
          <!--begin::Signin-->
          <div class="login-form login-signin">
            <b-form
              id="kt_login_signin_form"
              @submit.stop.prevent="handleSignin"
              class="form"
            >
              <div class="pb-13 pt-lg-0 pt-5">
                <h3
                  class="
                    font-weight-bolder
                    text-dark
                    font-size-h4 font-size-h1-lg
                  "
                >
                  Welcome back
                </h3>
                <span class="text-muted font-weight-bold font-size-h5">
                  Please sign in to your account below
                </span>
              </div>
              <InputText
                label="Email"
                placeholder="Enter your email..."
                type="email"
                label-class="font-size-h6 font-weight-bolder text-dark"
                content-class="form-control-solid h-auto py-7 px-6 rounded-lg"
                :use-horizontal="false"
                v-model="form.signin.email"
                :v="$v.form.signin.email"
              />
              <InputText
                label="Password"
                placeholder="Enter your password..."
                type="password"
                label-class="font-size-h6 font-weight-bolder text-dark"
                content-class="form-control-solid h-auto py-7 px-6 rounded-lg"
                :use-horizontal="false"
                v-model="form.signin.password"
                :v="$v.form.signin.password"
              />
              <div class="pb-lg-0 pb-5">
                <b-button
                  type="submit"
                  variant="primary"
                  class="font-weight-bolder font-size-h6 px-15 py-4 my-3 mr-3"
                >
                  Sign In
                </b-button>
                <b-button
                  variant="light-primary"
                  class="font-weight-bolder font-size-h6 px-8 py-4 my-3"
                  @click="showForm('forgot')"
                >
                  Forgot Password ?
                </b-button>
              </div>
            </b-form>
          </div>
          <!--end::Signin-->
          <!--begin::Forgot-->
          <div class="login-form login-forgot">
            <!--begin::Form-->
            <b-form
              id="kt_login_forgot_form"
              @submit.stop.prevent="handleForgotPassword"
              class="form"
            >
              <div class="pb-13 pt-lg-0 pt-5">
                <h3
                  class="
                    font-weight-bolder
                    text-dark
                    font-size-h4 font-size-h1-lg
                  "
                >
                  Forgotten Password ?
                </h3>
                <p class="text-muted font-weight-bold font-size-h4">
                  Enter your email to reset your password
                </p>
              </div>
              <div class="form-group">
                <InputText
                  label="Email"
                  placeholder="Enter your email..."
                  type="email"
                  label-class="font-size-h6 font-weight-bolder text-dark"
                  content-class="form-control-solid h-auto py-7 px-6 rounded-lg"
                  :use-label="false"
                  :use-horizontal="false"
                  v-model="form.forgotPassword.email"
                  :v="$v.form.forgotPassword.email"
                />
              </div>
              <div class="form-group d-flex flex-wrap pb-lg-0">
                <b-button
                  type="submit"
                  variant="primary"
                  class="font-weight-bolder font-size-h6 px-8 py-4 my-3 mr-4"
                >
                  Submit
                </b-button>
                <b-button
                  type="button"
                  variant="light-primary"
                  class="font-weight-bolder font-size-h6 px-8 py-4 my-3"
                  @click="showForm('signin')"
                >
                  Cancel
                </b-button>
              </div>
            </b-form>
          </div>
          <!--end::Forgot-->
        </div>
        <!--begin::Content footer-->
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
            >Build with &hearts; by Damaco.Dev</a
          >
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
import KTUtil from "@/assets/js/components/util";
import { required, email } from "vuelidate/lib/validators";

export default {
  name: "signin",
  data: () => ({
    state: "signin",
    form: {
      signin: {
        email: null,
        password: null
      },
      forgotPassword: {
        email: null
      }
    }
  }),
  validations: {
    form: {
      signin: {
        email: { required, email },
        password: { required }
      },
      forgotPassword: {
        email: { required, email }
      }
    }
  },
  methods: {
    showForm(form) {
      this.$v.$reset();
      this.state = form;
      var form_name = "kt_login_" + form + "_form";
      KTUtil.animateClass(
        KTUtil.getById(form_name),
        "animate__animated animate__backInUp"
      );
    },
    handleSignin() {
      const self = this;

      self.$v.form.signin.$touch();
      if (self.$v.form.signin.$pending || self.$v.form.signin.$error) return;

      let loader = self.$loading.show();
      self.$store.dispatch("auth/signin", self.form.signin).then(response => {
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

          if (response.data.me.dppu.length == 1) {
            self.$store.dispatch(
              "personalize/updateDppu",
              response.data.me.dppu[0]
            );
            self.$store.dispatch("personalize/updateMultipleDppu", false);
          } else {
            self.$store.dispatch("personalize/updateMultipleDppu", true);
          }

          self.$router.push({ name: "dashboardGeneral" });
        }
        loader.hide();
      });
    },
    handleForgotPassword() {
      const self = this;

      self.$v.form.forgotPassword.$touch();
      if (
        self.$v.form.forgotPassword.$pending ||
        self.$v.form.forgotPassword.$error
      )
        return;

      let loader = self.$loading.show();
      self.$store
        .dispatch("auth/forgotPassword", self.form.forgotPassword)
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

            self.showForm("signin");
          }
          loader.hide();
        });
    }
  }
};
</script>
