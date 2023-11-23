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
            label="Category"
            v-model="form.category"
            :v="$v.form.category"
            :options="options.category"
            :normalizer="normalizer"
            :multiple="false"
            :disabled="true"
            :readonly="true"
          />
          <InputText
            label="Deadleg Drain Identity"
            type="text"
            v-model="form.code"
            :v="$v.form.code"
          />
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
import { category, status } from "@/core/datasource/options";
import { getDppu, normalizer } from "@/core/utils";

export default {
  data: () => ({
    title: "Equipment",
    route: {
      form: "equipmentCreate",
      table: "equipment"
    },
    form: {
      dppu: null,
      category: 9,
      code: null,
      actived: true
    },
    options: {
      dppu: [],
      category,
      status
    }
  }),
  validations: {
    form: {
      dppuId: { required },
      category: { required },
      code: { required }
    }
  },
  computed: {
    ...mapGetters("personalize", ["multipleDppu", "dppu"]),
    subTitle() {
      const self = this;
      return self.$route.name != self.route.form
        ? "Update equipment information"
        : "Create new equipment";
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
      self.heading = "Update Equipment";
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
          url: `/equipment/${self.$route.params.id}`
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
              category: response.data.category.id,
              code: response.data.code,
              actived: response.data.actived
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
        _confirmText = "You are about to submit this equipment. Are you sure ?";
        _okText = "Yes, Submit";
        _action = "apis/post";
        _url = "/equipment";
      } else {
        _confirmText = "You are about to update this equipment. Are you sure ?";
        _okText = "Yes, Update";
        _action = "apis/put";
        _url = `/equipment/${self.$route.params.id}`;
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
        .confirm("You are about to delete this equipment. Are you sure ?", {
          okText: "Yes, Delete",
          cancelText: "Cancel",
          loader: true
        })
        .then(dialog => {
          self.$store
            .dispatch("apis/remove", {
              url: `/equipment/${self.$route.params.id}`
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

                self.$router.push({
                  name: "workItem"
                });
              }
            });
        });
    }
  }
};
</script>
