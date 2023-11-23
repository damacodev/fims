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
            label="Nomor Polisi"
            type="text"
            v-model="form.code"
            :v="$v.form.code"
            :maxlength="9"
          />
          <RadioGroup
            label="Jumlah Kompartemen"
            v-model="form.detail.jumlahKompartemen"
            :v="$v.form.detail.jumlahKompartemen"
            :options="options.kompartemen"
          />
          <InputMoney
            label="Volume"
            v-model="form.detail.volume"
            :v="$v.form.detail.volume"
            :usePrefix="false"
            append="Liter"
          />
          <InputText
            label="Masa Berlaku Tera Tangki"
            type="date"
            v-model="form.detail.masaBerlakuTeraTangki"
            :v="$v.form.detail.masaBerlakuTeraTangki"
          />
          <fragment
            v-for="(detail, index) in form.detail.jumlahKompartemen"
            v-bind:key="index"
          >
            <form-group :label="`Kompartemen ${index + 1}`">
              <b-row>
                <b-col cols="6">
                  <InputMoney
                    label="Ullage"
                    description="Ullage"
                    :use-horizontal="false"
                    :use-label="false"
                    :usePrefix="false"
                    append="mm"
                    v-model="form.detail.kompartemen[index].ullage"
                  />
                </b-col>
                <b-col cols="6">
                  <InputMoney
                    label="Temperature"
                    description="Temperature"
                    :use-horizontal="false"
                    :use-label="false"
                    :usePrefix="false"
                    append="°C"
                    v-model="form.detail.kompartemen[index].temperature"
                  />
                </b-col>
              </b-row>
            </form-group>
          </fragment>
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
import { required, maxLength } from "vuelidate/lib/validators";
import { category, kompartemen, status } from "@/core/datasource/options";
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
      dppuId: null,
      category: 8,
      code: null,
      detail: {
        jumlahKompartemen: 1,
        volume: 0,
        masaBerlakuTeraTangki: null,
        kompartemen: [
          {
            ullage: 0,
            temperature: 0
          },
          {
            ullage: 0,
            temperature: 0
          },
          {
            ullage: 0,
            temperature: 0
          },
          {
            ullage: 0,
            temperature: 0
          }
        ]
      },
      actived: true
    },
    options: {
      dppu: [],
      category,
      kompartemen,
      status
    }
  }),
  validations: {
    form: {
      dppuId: { required },
      category: { required },
      code: { required, maxlength: maxLength(9) },
      detail: {
        jumlahKompartemen: { required },
        volume: { required },
        masaBerlakuTeraTangki: { required }
      }
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
            response.data.detail.kompartemen.forEach((item, index) => {
              self.form.detail.kompartemen[index].ullage = item.ullage;
              self.form.detail.kompartemen[index].temperature =
                item.temperature;
            });

            self.form.dppu = response.data.dppu;
            self.form.dppuId = response.data.dppu.id;
            self.form.category = response.data.category.id;
            self.form.code = response.data.code;
            self.form.detail.jumlahKompartemen =
              response.data.detail.jumlahKompartemen;
            self.form.detail.volume = response.data.detail.volume;
            self.form.detail.masaBerlakuTeraTangki =
              response.data.detail.masaBerlakuTeraTangki;
            self.form.actived = response.data.actived;
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

      let _details = [];
      for (let index = 0; index < self.form.detail.jumlahKompartemen; index++) {
        let detail = self.form.detail.kompartemen[index];

        _details.push({
          ullage: detail.ullage,
          temperature: detail.temperature
        });
      }

      let _form = {
        dppuId: self.form.dppuId,
        category: 8,
        code: self.form.code,
        detail: {
          jumlahKompartemen: self.form.detail.jumlahKompartemen,
          volume: self.form.detail.volume,
          masaBerlakuTeraTangki: self.form.detail.masaBerlakuTeraTangki,
          kompartemen: _details
        },
        actived: true
      };

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
