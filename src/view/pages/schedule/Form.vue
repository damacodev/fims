<template>
  <CardForm :title="title" :subTitle="subTitle">
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
      <b-button variant="primary" size="lg" class="mr-2" @click="handleSubmit">
        {{ textButton }}
      </b-button>
      <b-button variant="secondary" size="lg" @click="$router.go(-1)">
        Back
      </b-button>
    </template>
    <template slot="form">
      <b-form @submit.stop.prevent="handleSubmit">
        <div class="card-body">
          <Select
            v-if="multipleDppu"
            label="Depot Pengisian Pesawat Udara"
            placeholder="Choose DPPU"
            v-model="form.dppu"
            :v="$v.form.dppu"
            :options="options.dppu"
            :multiple="false"
            @input="changeDppu"
          />
          <Select
            ref="Activity"
            label="Activity"
            placeholder="Search activity"
            v-model="form.activity"
            :v="$v.form.activity"
            :multiple="false"
            :async="true"
            :loadOptions="getActivity"
            @input="getActivityById"
          />
          <InputText
            label="Standard Form"
            v-model="form.standardForm.label"
            :disabled="true"
          />
          <TextArea
            label="Description"
            v-model="form.description"
            :disabled="true"
          />
          <InputText
            label="Period"
            v-model="form.period.label"
            :disabled="true"
          />
          <RadioGroup
            label="Shift Level Generation"
            v-model="form.shiftLevelGeneration"
            :options="options.yesNo"
            :disabled="!options.dppuWithShift"
            :description="
              form.dppu != null && !options.dppuWithShift
                ? `Shift hours at this DPPU have not been setup. You can't set this activity to the shift level. If needed, please setup shift hours on the DPPU page.`
                : null
            "
          />
          <Select
            label="Default Role Assignment"
            placeholder="Choose Default Role Assignment"
            v-model="form.defaultRoleAssignment"
            :v="$v.form.defaultRoleAssignment"
            :options="options.role"
            :multiple="false"
          />
          <Select
            :disabled="form.category == null"
            label="Equipment"
            placeholder="Search Equipment"
            v-model="form.equipments"
            :v="$v.form.equipments"
            :options="options.equipment"
            :description="
              form.activity != null && form.category == null
                ? `This activity is not mapped to equipment. If needed, please set category field on the activity page.`
                : null
            "
          />
          <RadioGroup
            :disabled="form.category == null"
            label="Equipment in Single Form"
            v-model="form.equipmentInSingleForm"
            :options="options.yesNo"
            :description="
              form.activity != null && form.category == null
                ? `This activity is not mapped to equipment. If needed, please set category field on the activity page.`
                : null
            "
          />
          <InputText
            label="Start Date"
            type="date"
            v-model="form.startDate"
            :v="$v.form.startDate"
          />
          <InputText
            label="Notification"
            description="Days before schedule/start date, leave it '0' if not required"
            type="number"
            v-model="form.notification"
            :v="$v.form.notification"
            :min="0"
          />
          <InputText
            label="Task Auto Closed"
            description="Days after schedule/start date, leave it '0' if not required"
            type="number"
            v-model="form.taskAutoClosed"
            :v="$v.form.taskAutoClosed"
            :min="0"
          />
          <RadioGroup
            v-if="$route.name != route.form"
            label="Status"
            v-model="form.actived"
            :options="options.status"
          />
          <template
            v-if="
              form.mediaTataKerjaIndividu.length > 0 ||
                form.mediaStandardForm.length > 0
            "
          >
            <hr />
            <b-row>
              <b-col lg="8" xl="5" offset="4">
                <h5 class="font-weight-bold mb-6">Work References</h5>
              </b-col>
            </b-row>
            <b-row v-if="form.mediaTataKerjaIndividu.length > 0">
              <b-col lg="4" class="text-right">Tata Kerja Individu</b-col>
              <b-col lg="8">
                <a
                  v-for="item in form.mediaTataKerjaIndividu"
                  v-bind:key="item.id"
                  :href="`${baseUrl}${item.url}`"
                  class="text-white"
                  target="_blank"
                >
                  <b-badge variant="success">
                    {{ item.originalFileName }}
                  </b-badge>
                </a>
              </b-col>
            </b-row>
            <b-row v-if="form.mediaStandardForm.length > 0">
              <b-col lg="4" class="text-right">Standard Form</b-col>
              <b-col lg="8">
                <a
                  v-for="item in form.mediaStandardForm"
                  v-bind:key="item.id"
                  :href="`${baseUrl}${item.url}`"
                  class="text-white"
                  target="_blank"
                >
                  <b-badge variant="success">
                    {{ item.originalFileName }}
                  </b-badge>
                </a>
              </b-col>
            </b-row>
          </template>
        </div>
      </b-form>
    </template>
  </CardForm>
</template>

<script>
import { ASYNC_SEARCH } from "@riophae/vue-treeselect";
import { mapGetters } from "vuex";
import { apiUrl } from "@/core/services/api.url";
import { required } from "vuelidate/lib/validators";
import { category, period, status, yesNo } from "@/core/datasource/options";
import { dateFormat, getDppu, getRole } from "@/core/utils";

export default {
  data: () => ({
    title: "Preventive Maintenance Schedule",
    route: {
      form: "scheduleCreate",
      table: "schedule"
    },
    baseUrl: process.env.NODE_ENV === "production" ? apiUrl.prod : apiUrl.dev,
    form: {
      dppu: null,
      category: null,
      equipments: [],
      equipmentInSingleForm: false,
      activity: null,
      standardForm: {
        id: null,
        label: null
      },
      description: null,
      period: {
        id: null,
        label: null
      },
      shiftLevelGeneration: false,
      defaultRoleAssignment: null,
      mediaTataKerjaIndividu: [],
      mediaStandardForm: [],
      startDate: null,
      notification: 0,
      taskAutoClosed: 0,
      actived: true
    },
    normalizer(node) {
      return {
        id: node.value,
        label: node.text
      };
    },
    options: {
      dppuWithShift: false,
      dppu: [],
      equipment: [],
      role: [],
      activity: [],
      category,
      period,
      status,
      yesNo
    }
  }),
  computed: {
    ...mapGetters("personalize", ["multipleDppu", "dppu"]),
    subTitle() {
      const self = this;
      return self.$route.name != self.route.form
        ? "Update schedule"
        : "Create new schedule";
    },
    textButton() {
      const self = this;
      return self.$route.name != self.route.form ? "Save Changes" : "Submit";
    }
  },
  validations: {
    form: {
      dppu: { required },
      activity: { required },
      defaultRoleAssignment: { required },
      startDate: { required },
      notification: { required },
      taskAutoClosed: { required }
    }
  },
  created() {
    const self = this;

    getRole().then(response => {
      self.options.role = response.data;
    });

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
      self.changeDppu();
    }

    if (self.$route.name != self.route.form) {
      self.get();
    }
  },
  methods: {
    getRole,
    changeDppu() {
      const self = this;

      self.options.dppuWithShift = false;
      self.form.equipment = [];
      self.options.equipment = [];
      if (self.form.dppu != null) {
        let loader = self.$loading.show();
        self.$store
          .dispatch("apis/get", {
            url: `/dppu/${self.form.dppu}`
          })
          .then(response => {
            if (response.error) {
              self.$message.error({
                zIndex: 10000,
                message: response.message
              });
            } else {
              self.options.dppuWithShift = response.data.shifts.length > 0;
            }
          })
          .finally(() => {
            loader.hide();
            self.getEquipmentByCategory();
          });
      }
    },
    getActivity({ action, searchQuery, callback }) {
      const self = this;
      if (action === ASYNC_SEARCH) {
        self.$store
          .dispatch("apis/get", {
            url: `/preventivemaintenance/activity`,
            params: {
              keyword: searchQuery,
              actived: true
            }
          })
          .then(response => {
            if (response.error) {
              self.$message.error({
                zIndex: 10000,
                message: response.message
              });
            } else {
              callback(
                null,
                response.data.data.map(x => ({
                  id: x.id,
                  label: x.title
                }))
              );
            }
          });
      }
    },
    getActivityById(id) {
      const self = this;

      self.form.category = null;
      self.form.standardForm = {
        id: null,
        label: null
      };
      self.form.description = null;
      self.form.period = {
        id: null,
        label: null
      };
      // self.form.equipments = [];
      self.form.mediaTataKerjaIndividu = [];
      self.form.mediaStandardForm = [];
      self.options.equipment = [];

      if (id != null) {
        let loader = self.$loading.show();
        self.$store
          .dispatch("apis/get", {
            url: `/preventivemaintenance/activity/${id}`
          })
          .then(response => {
            if (response.error) {
              self.$message.error({
                zIndex: 10000,
                message: response.message
              });
            } else {
              self.form.category = response.data.category?.id;
              if (response.data.standardForm != null) {
                self.form.standardForm = {
                  id: response.data.standardForm.id,
                  label: response.data.standardForm.label
                };
              }
              self.form.description = response.data.description;
              self.form.period = response.data.period;
              self.form.mediaTataKerjaIndividu =
                response.data.mediaTataKerjaIndividu;
              self.form.mediaStandardForm = response.data.mediaStandardForm;

              if (response.data.category != null) self.getEquipmentByCategory();
            }
          })
          .finally(() => loader.hide());
      }
    },
    getEquipmentByCategory() {
      const self = this;

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
    },
    changeShiftLevelGeneration(params) {
      const self = this;
      if (params) {
        if (!self.options.dppuWithShift) {
          self.$message.warning({
            zIndex: 10000,
            message:
              "Sorry, shift hours at this DPPU have not been setup. You can't set this activity to the shift level. If needed, please setup shift hours on the DPPU page."
          });
        }
      }

      self.form.shiftLevelGeneration = false;
    },
    get() {
      const self = this;

      let loader = self.$loading.show();
      self.$store
        .dispatch("apis/get", {
          url: `/preventivemaintenance/schedule/${self.$route.params.id}`
        })
        .then(response => {
          if (response.error) {
            self.$message.error({
              zIndex: 10000,
              message: response.message
            });

            self.$router.push({ name: self.route.table });
          } else {
            self.$refs.Activity.$refs.Activity.defaultOptions = [
              {
                id: response.data.activity?.id,
                label: response.data.activity?.title
              }
            ];
            self.$refs.Activity.$refs.Activity.initialize();

            self.form.dppu = response.data.dppu?.id;
            self.form.category = response.data.activity?.category?.id;
            self.form.activity = response.data.activity?.id;
            self.form.standardForm = {
              id: response.data.activity?.standardForm?.id,
              label: response.data.activity?.standardForm?.label
            };
            self.form.description = response.data.activity?.description;
            self.form.period = response.data.activity?.period;
            self.form.shiftLevelGeneration = response.data.shiftLevelGeneration;
            self.form.defaultRoleAssignment =
              response.data.defaultRoleAssignment?.id;
            self.form.equipments = response.data.equipments.map(x => x.id);
            self.form.equipmentInSingleForm =
              response.data.equipmentInSingleForm;
            self.form.startDate = dateFormat(
              response.data.startDate,
              "YYYY-MM-DD"
            );
            self.form.notification = response.data.notification;
            self.form.taskAutoClosed = response.data.taskAutoClosed;
            self.form.actived = response.data.actived;
          }
        })
        .finally(() => {
          loader.hide();
          self.getEquipmentByCategory();
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
        _confirmText = "You are about to submit this schedule. Are you sure ?";
        _okText = "Yes, Submit";
        _action = "apis/post";
        _url = "/preventivemaintenance/schedule";
      } else {
        _confirmText = "You are about to update this schedule. Are you sure ?";
        _okText = "Yes, Update";
        _action = "apis/put";
        _url = `/preventivemaintenance/schedule/${self.$route.params.id}`;
      }

      let _form = {
        dppuId: self.form.dppu,
        activityId: self.form.activity,
        shiftLevelGeneration: self.options.dppuWithShift
          ? self.form.shiftLevelGeneration
          : false,
        defaultRoleAssignment: self.form.defaultRoleAssignment,
        equipments: self.form.category != null ? self.form.equipments : [],
        equipmentInSingleForm:
          self.form.category != null ? self.form.equipmentInSingleForm : false,
        startDate: self.form.startDate,
        notification: self.form.notification,
        taskAutoClosed: self.form.taskAutoClosed,
        actived: self.form.actived
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
        .confirm("You are about to delete this schedule. Are you sure ?", {
          okText: "Yes, Delete",
          cancelText: "Cancel",
          loader: true
        })
        .then(dialog => {
          self.$store
            .dispatch("apis/remove", {
              url: `/preventivemaintenance/schedule/${self.$route.params.id}`
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
