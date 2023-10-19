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
      <Detail cssClass="mt-8" :requestInfo="requestInfo" />
    </b-col>
    <b-col lg="6" class="mb-4">
      <Action
        :title="form.title"
        :subTitle="subTitle"
        :requestInfo="requestInfo"
        :form="form"
        :technician="options.technician"
      />
      <!-- <Action
        v-if="!requestInfo.locked"
        :submitLabel="form.status == 5 ? 'Request to Closed' : 'Submit'"
        title="Follow-Up"
        :subTitle="subTitle"
        :requestInfo="requestInfo"
        :requestStatus="currentStatus"
        :form="form"
        :followUp="followUp"
      />
      <CurrentProgress
        :cssClass="!requestInfo.locked ? 'mt-8' : ''"
        title="Current Progress"
        subTitle="Last activity updates"
        :requestInfo="requestInfo"
        :followUp="followUp"
      /> -->
    </b-col>
  </b-row>
</template>

<script>
import { mapGetters } from "vuex";
import TaskInfo from "../common/TaskInfo.vue";
import Detail from "./Detail.vue";
import Action from "./Action.vue";
// import CurrentProgress from "./CurrentProgress.vue";

// import { dateTimeFormat } from "@/core/utils";
// import { requestStatus } from "@/core/datasource/options";

export default {
  components: {
    TaskInfo,
    Detail,
    Action
    // CurrentProgress,
  },
  data: () => ({
    title: "Task ID #",
    subTitle: "Standard Form",
    route: {
      form: "workItemFormStandardForm",
      table: "workItem"
    },
    requestInfo: {
      id: null,
      taskId: null,
      type: {
        label: null
      },
      title: null,
      request: {},
      status: [],
      statuses: [],
      createdBy: {
        label: null
      },
      createdAt: null,
      locked: true
    },
    currentStatus: {},
    form: {
      title: "Assignment",
      workItemId: null,
      currentStatus: null,
      status: null,
      remarks: null,
      assignedTo: null
    },
    histories: [],
    options: {
      technician: []
    }
  }),
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

            self.form.remarks = self.requestInfo.currentStatus.remarks;
            if (self.requestInfo.currentStatus.assignedTo != null) {
              self.form.assignedTo =
                self.requestInfo.currentStatus.assignedTo.id;
            }

            self.histories = self.requestInfo.statuses;

            if (!self.requestInfo.locked) {
              self.getTechnician();
            }
          }
        })
        .finally(() => loader.hide());
    },
    getTechnician() {
      const self = this;

      self.$store
        .dispatch("apis/get", {
          url: `/common/technician/${self.requestInfo.dppu.id}/${self.requestInfo.currentStatus.assignedToRole.id}`
        })
        .then(response => {
          if (response.error) {
            self.$message.error({
              zIndex: 10000,
              message: response.message
            });
          } else {
            self.options.technician = response.data;
          }
        });
    }
  }
};
</script>
