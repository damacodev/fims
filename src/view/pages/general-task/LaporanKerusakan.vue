<template>
  <CardForm :title="title" :subTitle="subTitle">
    <template slot="toolbar">
      <b-button variant="primary" size="lg" class="mr-2" @click="handleSubmit">
        Submit
      </b-button>
      <b-button variant="secondary" size="lg" @click="$router.go(-1)">
        Cancel
      </b-button>
    </template>
    <template slot="form">
      <b-form @submit.stop.prevent="handleSubmit">
        <div class="card-body">
          <Select
            v-if="multipleDppu"
            label="Depot Pengisian Pesawat Udara"
            v-model="form.dppu"
            :v="$v.form.dppu"
            :options="options.dppu"
            :multiple="false"
            @input="getEquipment"
          />
          <Select
            label="Category"
            v-model="form.category"
            :v="$v.form.category"
            :options="options.category"
            :multiple="false"
            :normalizer="normalizer"
            @input="getEquipment"
          />
          <Select
            label="Equipment"
            v-model="form.equipment"
            :v="$v.form.equipment"
            :options="options.equipment"
            :multiple="false"
          />
          <TextArea
            label="Indication"
            v-model="form.indication"
            :v="$v.form.indication"
            :rows="5"
            :maxlength="250"
          />
          <File
            label="Evidences"
            accept=".png, .jpg, .jpeg"
            v-model="form.evidences"
            :multiple="true"
            @onChange="handleUpload"
          />
          <b-row v-if="media.length > 0">
            <b-col lg="8" xl="5" offset="4">
              <b-alert
                v-for="item in media"
                v-bind:key="item.id"
                variant="success"
                show
              >
                <a
                  :href="`${baseUrl}${item.url}`"
                  class="text-white"
                  target="_blank"
                >
                  {{ item.originalFileName }}
                </a>
                <b-btn-close class="ml-3" @click="handleRemove(`${item.id}`)" />
              </b-alert>
            </b-col>
          </b-row>
        </div>
      </b-form>
    </template>
  </CardForm>
</template>

<script>
import { mapGetters } from "vuex";
import { apiUrl } from "@/core/services/api.url";
import { getDppu } from "@/core/utils";
import { category } from "@/core/datasource/options";
import { required } from "vuelidate/lib/validators";

export default {
  data: () => ({
    title: "Buat Laporan Kerusakan",
    subTitle: "You can make a report here",
    baseUrl: process.env.NODE_ENV === "production" ? apiUrl.prod : apiUrl.dev,
    form: {
      dppu: null,
      category: null,
      equipment: null,
      indication: null,
      evidences: []
    },
    media: [],
    options: {
      dppu: [],
      category,
      equipment: []
    },
    normalizer(node) {
      return {
        id: node.value,
        label: node.text
      };
    }
  }),
  computed: {
    ...mapGetters("personalize", ["multipleDppu", "dppu"])
  },
  validations: {
    form: {
      dppu: { required },
      category: { required },
      equipment: { required },
      indication: { required }
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
      self.form.dppu = self.dppu.id;
    }
  },
  methods: {
    getEquipment() {
      const self = this;

      self.options.equipment = [];
      self.form.equipment = null;

      if (self.form.dppu != null && self.form.category != null) {
        let loader = self.$loading.show();

        self.$store
          .dispatch("apis/get", {
            url: `/equipment`,
            params: {
              dppu: self.form.dppu,
              category: self.form.category
            }
          })
          .then(response => {
            if (response.error) {
              self.$message.error({
                zIndex: 10000,
                message: response.message
              });
            } else {
              self.options.equipment = response.data.data.map(x => ({
                id: x.id,
                label: x.code
              }));
            }
          });

        loader.hide();
      }
    },
    handleUpload(event) {
      if (event.target.files.length > 0) {
        const self = this;
        let payload = new FormData();

        event.target.files.forEach(item => {
          payload.append("file", item);
        });
        payload.append("group", 2);

        self.$store
          .dispatch("apis/upload", {
            url: "media",
            params: payload
          })
          .then(response => {
            if (response.error) {
              self.$message.error({
                zIndex: 10000,
                message: response.message
              });
            } else {
              response.data.forEach(item => {
                self.media.push(item);
              });
            }
          });
      }
    },
    handleRemove(id) {
      const self = this;

      self.$dialog
        .confirm("You are about to remove this evident. Are you sure ?", {
          okText: "Yes, Remove",
          cancelText: "Cancel",
          loader: true
        })
        .then(dialog => {
          self.$store
            .dispatch("apis/remove", {
              url: `/media/${id}`
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

                let find = self.media.findIndex(x => x.id == id);
                self.media.splice(find, 1);
              }
            });
        });
    },
    handleSubmit() {
      const self = this;

      self.$v.form.$touch();
      if (self.$v.form.$pending || self.$v.form.$error) return;

      let _form = {
        dppuId: self.form.dppu,
        category: self.form.category,
        equipmentId: self.form.equipment,
        indication: self.form.indication,
        evidences: []
      };

      if (self.media.length > 0) {
        _form.evidences = self.media.map(x => x.id);
      }

      self.$dialog
        .confirm("You are about to submit this report. Are you sure ?", {
          okText: "Yes, Submit",
          cancelText: "Cancel",
          loader: true
        })
        .then(dialog => {
          self.$store
            .dispatch("apis/post", {
              url: "board/breakdown-maintenance",
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

                self.$router.push({ name: "workItem" });
              }
            });
        });
    }
  }
};
</script>
