<template>
  <b-row>
    <b-col lg="6" class="mb-4">
      <TaskInfo
        :cardTitle="title"
        :cardSubTitle="subTitle"
        :taskType="requestInfo.type.label"
        :taskTitle="requestInfo.title"
        :taskPeriod="requestInfo.request.schedule || ''"
        :createdBy="requestInfo.createdBy.label"
        :createdAt="requestInfo.createdAt"
        :histories="histories"
      />
      <Detail cssClass="mt-8" :requestInfo="requestInfo" />
    </b-col>
    <b-col lg="6" class="mb-4">
      <Assignment
        v-if="!requestInfo.locked && requestInfo.action == 'assignment'"
        title="Assignment"
        :subTitle="subTitle"
        :requestInfo="requestInfo"
        :currentStatus="currentStatus"
        :form="form"
      />
      <Approval
        v-else-if="!requestInfo.locked && requestInfo.action == 'approval'"
        title="Approval"
        :subTitle="subTitle"
        :requestInfo="requestInfo"
        :currentStatus="currentStatus"
        :form="form"
      />
      <FollowUp
        v-else-if="!requestInfo.locked && requestInfo.action == 'followup'"
        title="Follow-Up"
        :subTitle="subTitle"
        :requestInfo="requestInfo"
        :currentStatus="currentStatus"
        :form="form"
      />
      <Evaluate
        v-else
        title="Evaluate"
        :subTitle="subTitle"
        :requestInfo="requestInfo"
        :currentStatus="currentStatus"
      />
    </b-col>
    <!-- 
    <b-col lg="6">
      <pre>{{ requestInfo }}</pre>
    </b-col>
    <b-col lg="6">
      <pre>{{ currentStatus }}</pre>
    </b-col>
 -->
  </b-row>
</template>

<script>
import { mapGetters } from "vuex";
import TaskInfo from "../common/TaskInfo.vue";
import Approval from "./Approval.vue";
import Assignment from "./Assignment.vue";
import Detail from "./Detail.vue";
import Evaluate from "./Evaluate.vue";
import FollowUp from "./FollowUp.vue";

export default {
  components: {
    TaskInfo,
    Approval,
    Assignment,
    Detail,
    Evaluate,
    FollowUp
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
      locked: true,
      action: null
    },
    currentStatus: {},
    form: {
      title: "Evaluate",
      workItemId: null,
      currentStatus: null,
      status: null,
      remarks: null,
      assignedTo: null
    },
    histories: []
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
            self.currentStatus = self.requestInfo.statuses.find(x => x.actived);

            self.title = `Task ID #${self.requestInfo.taskId}`;
            self.subTitle = self.requestInfo.type.label;
            self.form.workItemId = self.requestInfo.id;

            self.form.remarks = self.currentStatus.remarks;
            if (self.currentStatus.assignedTo != null) {
              self.form.assignedTo = self.currentStatus.assignedTo.id;
            }

            self.histories = self.requestInfo.statuses;

            if (!self.requestInfo.locked) {
              self.getTechnician();
            }
          }
        })
        .finally(() => loader.hide());
    },
    handleSubmit() {
      const self = this;

      self.$dialog
        .confirm("You are about to approve this transaction. Are you sure ?", {
          okText: "Yes, Approve",
          cancelText: "Cancel",
          loader: true
        })
        .then(dialog => {
          self.$store
            .dispatch("apis/post", {
              url: `board/evaluate/standard-form/${self.form.workItemId}`
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

                self.$router.go(-1);
              }
            })
            .finally(() => dialog.close());
        });
    }
  }
};
</script>
