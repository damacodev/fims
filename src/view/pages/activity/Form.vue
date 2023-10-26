<template>
  <CardForm :title="title" :subTitle="subTitle" :backButton="true">
    <template slot="toolbar">
      <b-button
        v-show="$route.name != route.form"
        variant="outline-danger"
        size="lg"
        class="mr-10"
        @click="handleDelete"
      >
        Delete
      </b-button>
      <b-button variant="primary" size="lg" @click="handleSubmit">
        {{ textButton }}
      </b-button>
    </template>
    <template slot="form">
      <b-form @submit.stop.prevent="handleSubmit">
        <div class="card-body">
          <Select
            label="Standard Form"
            v-model="form.standardFormId"
            :options="options.standardForm"
            :multiple="false"
            @input="changeStandardForm"
          />
          <InputText
            label="Work Item Type"
            v-model="workItemType"
            :disabled="true"
          />
          <Select
            label="Equipment Category"
            v-model="form.category"
            :options="options.category"
            :multiple="false"
            :normalizer="normalizer"
            @input="getOwnerEstimate"
            description="Leave it blank if this activity doesn't depend on equipment"
          />
          <RadioGroup
            label="Period"
            size="sm"
            v-model="form.period"
            :v="$v.form.period"
            :options="options.period"
          />
          <InputText
            label="Title"
            v-model="form.title"
            :v="$v.form.title"
            :maxlength="50"
          />
          <TextArea
            label="Description"
            v-model="form.description"
            :v="$v.form.description"
            :maxlength="250"
          />
          <RadioGroup
            v-if="$route.name != route.form"
            label="Status"
            v-model="form.actived"
            :options="options.status"
          />
          <b-row>
            <b-col lg="8" xl="5" offset="4">
              <h5 class="font-weight-bold mb-6">Work References</h5>
            </b-col>
          </b-row>
          <File
            label="Tata Kerja Individu"
            accept=".xls, .xlsx, .doc, .docx, .pdf"
            v-model="form.mediaTataKerjaIndividu"
            :multiple="true"
            @onChange="handleTki"
          />
          <b-row v-if="media.tataKerjaIndividu.length > 0">
            <b-col lg="8" xl="5" offset="4">
              <b-alert
                v-for="item in media.tataKerjaIndividu"
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
                <b-btn-close
                  class="ml-3"
                  @click="handleRemove(1, `${item.id}`)"
                />
              </b-alert>
            </b-col>
          </b-row>
          <File
            label="Standard Form"
            accept=".xls, .xlsx, .doc, .docx, .pdf"
            v-model="form.mediaStandardForm"
            :multiple="true"
            @onChange="handleSf"
          />
          <b-row v-if="media.standardForm.length > 0">
            <b-col lg="8" xl="5" offset="4">
              <b-alert
                v-for="item in media.standardForm"
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
                <b-btn-close
                  class="ml-3"
                  @click="handleRemove(0, `${item.id}`)"
                />
              </b-alert>
            </b-col>
          </b-row>
          <Select
            label="Owner Estimate"
            v-model="form.ownerEstimateId"
            :options="options.ownerEstimate"
            :multiple="false"
          />
        </div>
      </b-form>
    </template>
  </CardForm>
</template>

<script>
import { apiUrl } from "@/core/services/api.url";
import { required } from "vuelidate/lib/validators";
import { category, period, status } from "@/core/datasource/options";
import { isNullOrEmpty } from "@/core/utils";

export default {
  data: () => ({
    title: "Preventive Maintenance Activity",
    route: {
      form: "activityCreate",
      table: "activity"
    },
    baseUrl: process.env.NODE_ENV === "production" ? apiUrl.prod : apiUrl.dev,
    form: {
      category: null,
      standardFormId: null,
      period: null,
      title: null,
      description: null,
      actived: true,
      mediaTataKerjaIndividu: [],
      mediaStandardForm: [],
      ownerEstimateId: null
    },
    media: {
      standardForm: [],
      tataKerjaIndividu: []
    },
    normalizer(node) {
      return {
        id: node.value,
        label: node.text
      };
    },
    options: {
      category,
      period,
      status,
      standardForm: [],
      ownerEstimate: []
    }
  }),
  computed: {
    subTitle() {
      const self = this;
      return self.$route.name != self.route.form
        ? "Update activity"
        : "Create new activity";
    },
    textButton() {
      const self = this;
      return self.$route.name != self.route.form ? "Save Changes" : "Submit";
    },
    workItemType() {
      const self = this;
      if (self.form.standardFormId != null) return "Standard Form";
      return "Preventive Maintenace";
    }
  },
  validations: {
    form: {
      period: { required },
      title: { required },
      description: { required }
    }
  },
  created() {
    const self = this;
    self.getStandardForm();
    if (self.$route.name != self.route.form) {
      self.get();
    }
  },
  methods: {
    get() {
      const self = this;

      let loader = self.$loading.show();
      self.$store
        .dispatch("apis/get", {
          url: `/preventivemaintenance/activity/${self.$route.params.id}`
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
              category: response.data.category?.id,
              standardFormId: response.data.standardForm?.id,
              period: response.data.period?.id,
              title: response.data.title,
              description: response.data.description,
              actived: response.data.actived,
              mediaTataKerjaIndividu: [],
              mediaStandardForm: [],
              ownerEstimateId: response.data.ownerEstimateId
            };

            self.media = {
              tataKerjaIndividu: response.data.mediaTataKerjaIndividu,
              standardForm: response.data.mediaStandardForm
            };
          }
          loader.hide();
        });
    },
    getStandardForm() {
      const self = this;

      self.$store
        .dispatch("apis/get", {
          url: `/common/standard-form`,
          params: {
            scheduled: true
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
    getOwnerEstimate() {
      const self = this;

      let loader = self.$loading.show();
      self.$store
        .dispatch("apis/get", {
          url: `/ownerestimate`,
          params: {
            category: [self.form.category]
          }
        })
        .then(response => {
          if (response.error) {
            self.$message.error({
              zIndex: 10000,
              message: response.message
            });

            self.$router.push({ name: self.route.table });
          } else {
            self.options.ownerEstimate = response.data.data.map(x => ({
              id: x.id,
              label: x.title
            }));
          }
          loader.hide();
        });
    },
    changeStandardForm(params) {
      const self = this;

      self.form.title = null;

      let find = self.options.standardForm.find(x => x.id == params);
      if (isNullOrEmpty(self.form.title)) self.form.title = find.label;
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
        _confirmText = "You are about to submit this activity. Are you sure ?";
        _okText = "Yes, Submit";
        _action = "apis/post";
        _url = "/preventivemaintenance/activity";
      } else {
        _confirmText = "You are about to update this activity. Are you sure ?";
        _okText = "Yes, Update";
        _action = "apis/put";
        _url = `/preventivemaintenance/activity/${self.$route.params.id}`;
      }

      let _form = {
        category: self.form.category,
        standardFormId: self.form.standardFormId,
        period: self.form.period,
        title: self.form.title,
        description: self.form.description,
        actived: self.form.actived,
        mediaTataKerjaIndividu: self.media.tataKerjaIndividu.map(x => x.id),
        mediaStandardForm: self.media.standardForm.map(x => x.id),
        ownerEstimateId: self.form.ownerEstimateId
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
                // self.form.period = null;
                // self.form.title = null;
                // self.form.description = null;
                // self.form.actived = true;
                // self.form.mediaTataKerjaIndividu = [];
                // self.form.mediaStandardForm = [];
                // self.form.ownerEstimateId = null;

                // self.media = {
                //   standardForm: [],
                //   tataKerjaIndividu: [],
                // };

                // self.$v.form.$reset();
              }
            });
        });
    },
    handleDelete() {
      const self = this;

      self.$dialog
        .confirm("You are about to delete this activity. Are you sure ?", {
          okText: "Yes, Delete",
          cancelText: "Cancel",
          loader: true
        })
        .then(dialog => {
          self.$store
            .dispatch("apis/remove", {
              url: `/preventivemaintenance/activity/${self.$route.params.id}`
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
    handleTki(event) {
      const self = this;
      self.handleUpload(event, 1);
    },
    handleSf(event) {
      const self = this;
      self.handleUpload(event, 0);
    },
    handleUpload(event, group) {
      if (event.target.files.length > 0) {
        const self = this;
        let payload = new FormData();

        event.target.files.forEach(item => {
          payload.append("file", item);
        });
        payload.append("group", group);

        let _url =
          self.$route.name == self.route.form
            ? "media"
            : `media/${self.$route.params.id}`;

        self.$store
          .dispatch("apis/upload", {
            url: _url,
            params: payload
          })
          .then(response => {
            if (response.error) {
              self.$message.error({
                zIndex: 10000,
                message: response.message
              });
            } else {
              if (group == 0) {
                response.data.forEach(item => {
                  self.media.standardForm.push(item);
                });
              } else if (group == 1) {
                response.data.forEach(item => {
                  self.media.tataKerjaIndividu.push(item);
                });
              }
            }
          });
      }
    },
    handleRemove(group, id) {
      const self = this;

      self.$dialog
        .confirm("You are about to remove this document. Are you sure ?", {
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

                if (group == 0) {
                  let find = self.media.standardForm.findIndex(x => x.id == id);
                  self.media.standardForm.splice(find, 1);
                } else if (group == 1) {
                  let find = self.media.tataKerjaIndividu.findIndex(
                    x => x.id == id
                  );
                  self.media.tataKerjaIndividu.splice(find, 1);
                }
              }
            });
        });
    }
  }
};
</script>
