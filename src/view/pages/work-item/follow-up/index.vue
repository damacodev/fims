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
        v-if="requestInfo.request.preventiveMaintenance != null"
        cssClass="mt-8"
        :requestInfo="requestInfo.request.preventiveMaintenance"
        :workOrder="requestInfo.request.workOrder"
      />
      <BreakdownMaintenance
        v-if="requestInfo.request.breakdownMaintenance != null"
        cssClass="mt-8"
        :requestInfo="requestInfo.request.breakdownMaintenance"
        :workOrder="requestInfo.request.workOrder"
      />
    </b-col>
    <b-col lg="6" class="mb-4">
      <Action
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
      />
    </b-col>
  </b-row>
</template>

<script>
import { mapGetters } from "vuex";
import TaskInfo from "../common/TaskInfo.vue";
import BreakdownMaintenance from "../maintenance/BreakdownMaintenance.vue";
import PreventiveMaintenance from "../maintenance/PreventiveMaintenance.vue";
import Action from "./Action.vue";
import CurrentProgress from "./CurrentProgress.vue";

import { dateTimeFormat } from "@/core/utils";
import { requestStatus } from "@/core/datasource/options";

export default {
  components: {
    TaskInfo,
    BreakdownMaintenance,
    PreventiveMaintenance,
    Action,
    CurrentProgress
  },
  data: () => ({
    title: "Task ID #",
    subTitle: "Work Order",
    route: {
      form: "workItemForm",
      table: "workItem"
    },
    requestInfo: {
      id: null,
      taskId: null,
      type: {
        label: null
      },
      title: null,
      request: {
        breakdownMaintenance: {
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
            evidence: []
          }
        },
        workOrder: {
          spareparts: []
        }
      },
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
      title: "Work Order Follow-Up",
      workItemId: null,
      currentStatus: null,
      status: null,
      pending: {
        pendingReason: null,
        remarks: null
      },
      onRun: {
        startDate: null,
        finishDate: null,
        remarks: null
      },
      accepted: {
        spareparts: [],
        startDate: null,
        finishDate: null,
        remarks: null,
        reason: null,
        evidences: []
      },
      rejected: {
        remarks: null
      },
      closed: {
        spareparts: [],
        startDate: null,
        finishDate: null,
        remarks: null,
        evidences: []
      },
      reAssign: {
        spareparts: [],
        startDate: null,
        finishDate: null,
        remarks: null,
        assignedTo: null
      }
    },
    followUp: {},
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
            self.requestInfo.currentStatus = self.requestInfo.statuses.find(
              x => x.actived
            );

            self.title = `Task ID #${self.requestInfo.taskId}`;
            self.subTitle = self.requestInfo.type.label;
            self.form.workItemId = self.requestInfo.id;

            self.histories = self.requestInfo.statuses;

            let currentStatus = [
              {
                disabled: true,
                value: null,
                text: "Select Status"
              }
            ];
            // New
            if (self.requestInfo.currentStatus.status.id == 0) {
              self.currentStatus = currentStatus.concat(
                requestStatus.filter(x => [1, 2].includes(x.value))
              );
            }
            // On Run
            else if (self.requestInfo.currentStatus.status.id == 1) {
              self.currentStatus = currentStatus.concat(
                requestStatus.filter(x => [5].includes(x.value))
              );
              self.form.status = 5;

              self.requestInfo.request.workOrder.currentFollowUp = self.requestInfo.request.workOrder.followUps.find(
                x => x.actived
              );

              self.followUp =
                self.requestInfo.request.workOrder.currentFollowUp;

              self.form.closed.startDate = dateTimeFormat(
                self.requestInfo.request.workOrder.currentFollowUp.startDate,
                "YYYY-MM-DD HH:mm"
              );
              self.form.closed.finishDate = dateTimeFormat(
                self.requestInfo.request.workOrder.currentFollowUp.finishDate,
                "YYYY-MM-DD HH:mm"
              );
              self.form.closed.remarks = self.requestInfo.currentStatus.remarks;
              self.form.closed.spareparts = self.requestInfo.request.workOrder.spareparts
                .filter(x => x.type.id == 0)
                .map(x => ({
                  id: x.sparepart.id,
                  code: x.sparepart.code,
                  label: x.sparepart.label,
                  quantity: x.quantity
                }));
            }
            // Pending
            else if (self.requestInfo.currentStatus.status.id == 2) {
              self.currentStatus = currentStatus.concat(
                requestStatus.filter(x => [6].includes(x.value))
              );

              self.requestInfo.request.workOrder.currentFollowUp = self.requestInfo.request.workOrder.followUps.find(
                x => x.actived
              );

              self.followUp =
                self.requestInfo.request.workOrder.currentFollowUp;

              self.form.reAssign.spareparts = self.requestInfo.request.workOrder.spareparts
                .filter(x => x.type.id == 0)
                .map(x => ({
                  id: x.sparepart.id,
                  code: x.sparepart.code,
                  label: x.sparepart.label,
                  quantity: x.quantity
                }));
              self.form.reAssign.startDate = dateTimeFormat(
                self.requestInfo.request.workOrder.startDate,
                "YYYY-MM-DD HH:mm"
              );
              self.form.reAssign.finishDate = dateTimeFormat(
                self.requestInfo.request.workOrder.finishDate,
                "YYYY-MM-DD HH:mm"
              );
            }
            // Accepted
            else if (self.requestInfo.currentStatus.status.id == 3) {
              self.currentStatus = currentStatus.concat(
                requestStatus.filter(x => [3].includes(x.value))
              );

              self.requestInfo.request.workOrder.currentFollowUp = self.requestInfo.request.workOrder.followUps.find(
                x => x.actived
              );

              self.followUp =
                self.requestInfo.request.workOrder.currentFollowUp;
            }
            // Rejected
            else if (self.requestInfo.currentStatus.status.id == 4) {
              self.currentStatus = currentStatus.concat(
                requestStatus.filter(x => [5].includes(x.value))
              );
              self.form.status = 5;

              self.requestInfo.request.workOrder.currentFollowUp = self.requestInfo.request.workOrder.followUps.find(
                x => x.actived
              );

              self.followUp =
                self.requestInfo.request.workOrder.currentFollowUp;

              self.form.closed.startDate = dateTimeFormat(
                self.requestInfo.request.workOrder.currentFollowUp.startDate,
                "YYYY-MM-DD HH:mm"
              );
              self.form.closed.finishDate = dateTimeFormat(
                self.requestInfo.request.workOrder.currentFollowUp.finishDate,
                "YYYY-MM-DD HH:mm"
              );
              self.form.closed.remarks =
                self.requestInfo.request.workOrder.currentFollowUp.remarks;
              self.form.closed.spareparts = self.requestInfo.request.workOrder.spareparts
                .filter(x => x.type.id == 0)
                .map(x => ({
                  id: x.sparepart.id,
                  code: x.sparepart.code,
                  label: x.sparepart.label,
                  quantity: x.quantity
                }));
              self.form.closed.evidences =
                self.requestInfo.request.workOrder.currentFollowUp.evidences;
            }
            // Closed
            else if (self.requestInfo.currentStatus.status.id == 5) {
              self.currentStatus = currentStatus.concat(
                requestStatus.filter(x => [3, 4].includes(x.value))
              );
              // self.form.status = 3;

              self.requestInfo.request.workOrder.currentFollowUp = self.requestInfo.request.workOrder.followUps.find(
                x => x.actived
              );

              self.followUp =
                self.requestInfo.request.workOrder.currentFollowUp;

              self.form.accepted.startDate =
                self.requestInfo.request.workOrder.currentFollowUp.startDate;
              self.form.accepted.finishDate =
                self.requestInfo.request.workOrder.currentFollowUp.finishDate;
              self.form.accepted.remarks =
                self.requestInfo.currentStatus.remarks;
              self.form.accepted.spareparts = self.requestInfo.request.workOrder.spareparts
                .filter(x => x.type.id == 1)
                .map(x => ({
                  id: x.sparepart.id,
                  code: x.sparepart.code,
                  label: x.sparepart.label,
                  quantity: x.quantity
                }));
              self.form.accepted.evidences =
                self.requestInfo.request.workOrder.currentFollowUp.evidences;
            }
          }
          loader.hide();
        });
    }
  }
};
</script>
