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
      <PreventiveMaintenance
        v-if="requestInfo.type.id == 3"
        cssClass="mt-8"
        :requestInfo="requestInfo"
      />
      <BreakdownMaintenance
        v-else-if="requestInfo.type.id == 4"
        cssClass="mt-8"
        :requestInfo="requestInfo"
      />
    </b-col>
    <b-col lg="6">
      <Action
        :title="form.title"
        :subTitle="subTitle"
        :requestInfo="requestInfo"
        :form="form"
        :technician="options.technician"
      />
    </b-col>
  </b-row>
</template>

<script>
import TaskInfo from "../common/TaskInfo.vue";
import Action from "./Action.vue";
import BreakdownMaintenance from "./BreakdownMaintenance.vue";
import PreventiveMaintenance from "./PreventiveMaintenance.vue";

export default {
  components: {
    TaskInfo,
    Action,
    BreakdownMaintenance,
    PreventiveMaintenance
  },
  data: () => ({
    title: null,
    subTitle: null,
    route: {
      form: "workItemForm",
      table: "workItem"
    },
    requestInfo: {
      id: "",
      taskId: "",
      dppu: {
        label: null
      },
      request: {
        category: {
          label: null
        },
        equipment: {
          label: null
        },
        evidences: []
      },
      workOrder: {
        startDate: null,
        finishDate: null,
        assignedTo: []
      },
      type: {
        label: null
      },
      createdBy: {
        label: null
      },
      locked: true
    },
    form: {
      title: "Create Work Order",
      workItemId: null,
      spareparts: [],
      startDate: null,
      finishDate: null,
      remarks: null,
      assignedTo: []
    },
    histories: [],
    options: {
      technician: []
    }
  }),
  created() {
    const self = this;
    self.get();
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

            if (self.requestInfo.locked) {
              if (self.requestInfo.workOrder == null) {
                self.form.title = "Evaluate";
              }
              if (self.requestInfo.workOrder != null) {
                self.form.title = "Work Order";
                self.form.spareparts = self.requestInfo.workOrder.spareparts
                  .filter(x => x.type.id == 0)
                  .map(x => ({
                    id: x.sparepart.id,
                    code: x.sparepart.code,
                    label: x.sparepart.label,
                    quantity: x.quantity
                  }));
              }
            } else {
              self.getTechnician();
            }
          }
          loader.hide();
        });
    },
    getTechnician() {
      const self = this;

      self.$store
        .dispatch("apis/get", {
          url: `/common/technician/${self.requestInfo.dppu.id}`
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
