<template>
  <b-row>
    <b-col lg="6" class="mb-4">
      <TaskInfo
        :cardTitle="title"
        :cardSubTitle="subTitle"
        :taskType="requestInfo.type.label"
        :taskTitle="requestInfo.title"
        :createdBy="requestInfo.createdBy.label"
        :createdAt="requestInfo.createdAt"
        :histories="histories"
      />
      <Category1
        v-if="requestInfo.request.category.id == 1"
        :requestInfo="requestInfo"
      />
      <Category3
        v-else-if="requestInfo.request.category.id == 3"
        :requestInfo="requestInfo"
      />
      <Category4
        v-else-if="requestInfo.request.category.id == 4"
        :requestInfo="requestInfo"
      />
      <Category5
        v-else-if="requestInfo.request.category.id == 5"
        :requestInfo="requestInfo"
      />
      <Category6
        v-else-if="requestInfo.request.category.id == 6"
        :requestInfo="requestInfo"
      />
      <Category7
        v-else-if="requestInfo.request.category.id == 7"
        :requestInfo="requestInfo"
      />
    </b-col>
    <b-col lg="6">
      <CardForm title="Evaluate" :subTitle="subTitle">
        <template #toolbar>
          <b-button
            v-if="user.role.id == 0 && !requestInfo.locked"
            variant="primary"
            @click="handleSubmit"
          >
            Submit
          </b-button>
        </template>
        <template #form>
          <b-form @submit.stop.prevent="handleSubmit">
            <div class="card-body">
              <div v-if="user.role.id == 0 && !requestInfo.locked">
                <b-form @submit.stop.prevent="handleSubmit">
                  <Dropdown
                    label="Status"
                    v-model="form.status"
                    :options="options.requestStatus"
                    :useHorizontal="false"
                    :v="$v.form.status"
                  />
                  <TextArea
                    label="Remarks"
                    v-model="form.remarks"
                    :useHorizontal="false"
                    :v="$v.form.remarks"
                  />
                </b-form>
              </div>
              <template v-else>
                <Empty v-if="form.status == 0" />
                <Evaluation v-else :requestInfo="requestInfo" />
              </template>
            </div>
          </b-form>
        </template>
      </CardForm>
    </b-col>
  </b-row>
</template>

<script>
import TaskInfo from "../common/TaskInfo.vue";
import Category1 from "./Category1";
import Category3 from "./Category3";
import Category4 from "./Category4";
import Category5 from "./Category5";
import Category6 from "./Category6";
import Category7 from "./Category7";
import Empty from "../common/Empty";
import Evaluation from "./Evaluation";
import { mapGetters } from "vuex";

import { requestStatus } from "@/core/datasource/options";
import { helpers, required } from "vuelidate/lib/validators";
const notSame = param => value => !helpers.req(value) || param != value;

export default {
  components: {
    TaskInfo,
    Category1,
    Category3,
    Category4,
    Category5,
    Category6,
    Category7,
    Empty,
    Evaluation
  },
  data: () => ({
    title: null,
    subTitle: null,
    route: {
      form: "workItemFormEquipment",
      table: "workItem"
    },
    requestInfo: {
      request: {
        region: {
          id: null,
          label: null
        },
        dppu: {
          id: null,
          label: null
        },
        category: {
          id: null,
          label: null
        },
        code: null,
        detail: {
          modulPm: null,
          type: null,
          dimensions: null,
          location: null,
          manufacturer: null,
          typeOfAtg: null,
          serialNumber: null,
          model: null,
          automationIntegrated: null,
          yearOfManufacture: null
        },
        actived: null
      },
      taskId: null,
      type: {
        id: null,
        label: null
      },
      title: null,
      description: null,
      statuses: {
        id: null,
        status: {
          id: null,
          label: null
        },
        assignedToRole: {
          id: null,
          label: null
        },
        assignedTo: {
          id: null,
          label: null
        },
        remarks: null,
        createdBy: {
          id: null,
          label: null
        },
        createdAt: null
      },
      createdBy: {
        id: null,
        label: null
      },
      locked: true
    },
    form: {
      workItemId: null,
      status: null,
      remarks: null
    },
    histories: [],
    options: {
      requestStatus: requestStatus.filter(x => [0, 3, 4].includes(x.value))
    }
  }),
  validations() {
    const self = this;
    let status = self.requestInfo.currentStatus.status.id;
    if (self.form.status == 4) {
      return {
        form: {
          status: { notSame: notSame(status) },
          remarks: { required }
        }
      };
    }
    return {
      form: {
        status: { notSame: notSame(status) }
      }
    };
  },
  computed: {
    ...mapGetters("auth", ["user"])
  },
  created() {
    this.get();
  },
  methods: {
    get() {
      const self = this;

      let loader = self.$loading.show();
      self.$store
        .dispatch("apis/get", {
          url: `/board/workitem/${self.$route.params.id}`
        })
        .then(response => {
          if (response.error) {
            self.$message.error({
              zIndex: 10000,
              message: response.message
            });

            self.$router.push({ name: self.route.table });
          } else {
            self.requestInfo = response.data;
            self.requestInfo.currentStatus = self.requestInfo.statuses.find(
              x => x.actived
            );

            self.title = `Task ID #${self.requestInfo.taskId}`;
            self.subTitle = self.requestInfo.type.label;
            self.form.workItemId = self.requestInfo.id;

            self.histories = self.requestInfo.statuses;

            self.form.status = self.requestInfo.currentStatus.status.id;
          }
          loader.hide();
        });
    },
    handleSubmit() {
      const self = this;

      self.$v.form.$touch();
      if (self.$v.form.$pending || self.$v.form.$error) return;

      self.$dialog
        .confirm("You are about to submit this evaluate. Are you sure ?", {
          okText: "Yes, Submit",
          cancelText: "Cancel",
          loader: true
        })
        .then(dialog => {
          self.$store
            .dispatch("apis/post", {
              url: "board/evaluate/equipment",
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
    }
  }
};
</script>
