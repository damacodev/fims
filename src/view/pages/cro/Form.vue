<template>
  <CardForm :title="title" :subTitle="subTitle" :backButton="true">
    <template #toolbar>
      <b-button
        v-show="$route.name != route.form"
        class="mr-2"
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
          <InputText label="Kode" v-model="form.code" :v="$v.form.code" />
          <InputText
            label="Nama Lengkap"
            v-model="form.fullName"
            :v="$v.form.fullName"
          />
          <InputText label="Fungsi" v-model="form.fungsi" :v="$v.form.fungsi" />
          <RadioGroup
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
import { mapGetters } from "vuex";
import { required } from "vuelidate/lib/validators";
import { status } from "@/core/datasource/options";
import { getDppu, normalizer } from "@/core/utils";

export default {
  data: () => ({
    title: "Certified Refueler Operator",
    route: {
      form: "croCreate",
      table: "cro"
    },
    form: {
      dppu: null,
      dppuId: null,
      code: "",
      fullName: "",
      fungsi: "",
      actived: true
    },
    options: {
      dppu: [],
      status
    }
  }),
  validations: {
    form: {
      dppuId: { required },
      code: { required },
      fullName: { required },
      fungsi: { required }
    }
  },
  computed: {
    ...mapGetters("personalize", ["multipleDppu", "dppu"]),
    subTitle() {
      const self = this;
      return self.$route.name != self.route.form
        ? "Update CRO information"
        : "Create New CRO";
    },
    textButton() {
      const self = this;
      return self.$route.name != self.route.form ? "Save Changes" : "Submit";
    }
  },
  created() {
    const self = this;

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
      self.heading = "Update CRO";
      self.get();
    }
  },
  methods: {
    normalizer,
    get() {
      const self = this;

      let loader = self.$loading.show();
      self.$store
        .dispatch("apis/get", {
          url: `/common/cro/${self.$route.params.id}`
        })
        .then(response => {
          if (response.error) {
            self.$message.error({
              zIndex: 10000,
              message: response.message
            });

            self.$router.push({ name: self.route.table });
          } else {
            self.form.dppu = response.data.dppu;
            self.form.dppuId = response.data.dppu.id;
            self.form.code = response.data.code;
            self.form.fullName = response.data.fullName;
            self.form.fungsi = response.data.fungsi;
            self.form.actived = response.data.actived;
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
        _confirmText = "You are about to submit this CRO. Are you sure ?";
        _okText = "Yes, Submit";
        _action = "apis/post";
        _url = "/common/cro";
      } else {
        _confirmText = "You are about to update this CRO. Are you sure ?";
        _okText = "Yes, Update";
        _action = "apis/put";
        _url = `/common/cro/${self.$route.params.id}`;
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
        .confirm("You are about to delete this CRO. Are you sure ?", {
          okText: "Yes, Delete",
          cancelText: "Cancel",
          loader: true
        })
        .then(dialog => {
          self.$store
            .dispatch("apis/remove", {
              url: `/common/cro/${self.$route.params.id}`
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
