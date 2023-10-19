<template>
  <div>
    <CardForm :title="title" :subTitle="subTitle" :class="cssClass">
      <template #toolbar>
        <b-button
          v-if="!requestInfo.locked"
          variant="primary"
          @click="handleSubmit"
        >
          {{ submitLabel }}
        </b-button>
      </template>
      <template #form>
        <b-form @submit.stop.prevent="handleSubmit">
          <div class="card-body">
            <!-- {{ requestInfo.currentStatus.status.id }}
            {{ form.status }} -->

            <Dropdown
              v-if="![1, 4].includes(requestInfo.currentStatus.status.id)"
              label="Status"
              v-model="form.status"
              :options="requestStatus"
              :useHorizontal="false"
              :v="$v.form.status"
              @input="changeStatus"
            />
            <template v-if="requestInfo.currentStatus.status.id == 0">
              <div v-if="form.status == 1">
                <b-row>
                  <b-col lg="6">
                    <form-group
                      label="Start Date"
                      :useHorizontal="false"
                      :validator="$v.form.onRun.startDate"
                    >
                      <DatePicker
                        v-model="form.onRun.startDate"
                        :v="$v.form.onRun.startDate"
                        type="datetime"
                        input-class="form-control form-control-solid"
                        :show-second="false"
                        value-type="format"
                        format="YYYY-MM-DD HH:mm"
                      />
                    </form-group>
                  </b-col>
                  <b-col lg="6">
                    <form-group
                      label="Finish Date"
                      :useHorizontal="false"
                      :validator="$v.form.onRun.finishDate"
                    >
                      <DatePicker
                        v-model="form.onRun.finishDate"
                        :v="$v.form.onRun.finishDate"
                        type="datetime"
                        input-class="form-control form-control-solid"
                        :show-second="false"
                        value-type="format"
                        format="YYYY-MM-DD HH:mm"
                      />
                    </form-group>
                  </b-col>
                </b-row>
                <TextEditor
                  label="Activity"
                  v-model="form.onRun.remarks"
                  :useHorizontal="false"
                  :v="$v.form.onRun.remarks"
                />
              </div>
              <div v-else-if="form.status == 2">
                <RadioGroup
                  label="Pending Reason"
                  v-model="form.pending.pendingReason"
                  :options="options.pendingReason"
                  :useHorizontal="false"
                  :v="$v.form.pending.pendingReason"
                />
                <TextArea
                  label="Remarks"
                  v-model="form.pending.remarks"
                  :useHorizontal="false"
                  :v="$v.form.pending.remarks"
                />
              </div>
            </template>
            <template
              v-else-if="[1, 4].includes(requestInfo.currentStatus.status.id)"
            >
              <div v-if="form.status == 5">
                <TableSparepart
                  label="Spareparts Needed (Realization)"
                  :rows="form.closed.spareparts"
                  :editable="true"
                />
                <b-row>
                  <b-col lg="6">
                    <form-group
                      label="Start Date"
                      :useHorizontal="false"
                      :validator="$v.form.closed.startDate"
                    >
                      <DatePicker
                        v-model="form.closed.startDate"
                        :v="$v.form.closed.startDate"
                        type="datetime"
                        input-class="form-control form-control-solid"
                        :show-second="false"
                        value-type="format"
                        format="YYYY-MM-DD HH:mm"
                      />
                    </form-group>
                  </b-col>
                  <b-col lg="6">
                    <form-group
                      label="Finish Date"
                      :useHorizontal="false"
                      :validator="$v.form.closed.finishDate"
                    >
                      <DatePicker
                        v-model="form.closed.finishDate"
                        :v="$v.form.closed.finishDate"
                        type="datetime"
                        input-class="form-control form-control-solid"
                        :show-second="false"
                        value-type="format"
                        format="YYYY-MM-DD HH:mm"
                      />
                    </form-group>
                  </b-col>
                </b-row>
                <TextEditor
                  label="Activity"
                  v-model="form.closed.remarks"
                  :useHorizontal="false"
                  :v="$v.form.closed.remarks"
                />
                <Evidence
                  v-model="form.closed.evidences"
                  :value="form.closed.medias"
                  :v="$v.form.closed.evidences"
                />
              </div>
            </template>
            <template v-else-if="requestInfo.currentStatus.status.id == 2">
              <div v-if="form.status == 6">
                <TableSparepart
                  :rows="form.reAssign.spareparts"
                  :editable="true"
                />
                <b-row>
                  <b-col lg="6">
                    <form-group
                      label="Start Date"
                      :useHorizontal="false"
                      :validator="$v.form.reAssign.startDate"
                    >
                      <DatePicker
                        v-model="form.reAssign.startDate"
                        :v="$v.form.reAssign.startDate"
                        type="datetime"
                        input-class="form-control form-control-solid"
                        :show-second="false"
                        value-type="format"
                        format="YYYY-MM-DD HH:mm"
                      />
                    </form-group>
                  </b-col>
                  <b-col lg="6">
                    <form-group
                      label="Finish Date"
                      :useHorizontal="false"
                      :validator="$v.form.reAssign.finishDate"
                    >
                      <DatePicker
                        v-model="form.reAssign.finishDate"
                        :v="$v.form.reAssign.finishDate"
                        type="datetime"
                        input-class="form-control form-control-solid"
                        :show-second="false"
                        value-type="format"
                        format="YYYY-MM-DD HH:mm"
                      />
                    </form-group>
                  </b-col>
                </b-row>
                <TextArea
                  label="Notes"
                  v-model="form.reAssign.remarks"
                  :useHorizontal="false"
                  :v="$v.form.remarks"
                />
                <Select
                  label="Assigned To"
                  v-model="form.reAssign.assignedTo"
                  :v="$v.form.reAssign.assignedTo"
                  :options="options.technician"
                  :useHorizontal="false"
                />
              </div>
            </template>
            <template v-else-if="requestInfo.currentStatus.status.id == 5">
              <div v-if="form.status == 4">
                <TextArea
                  label="Reason"
                  v-model="form.rejected.remarks"
                  :useHorizontal="false"
                  :v="$v.form.rejected.remarks"
                />
              </div>
            </template>
          </div>
        </b-form>
      </template>
    </CardForm>
  </div>
</template>

<script>
import TableSparepart from "../common/TableSparepart.vue";
import Evidence from "./Evidence.vue";

import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";

import { apiUrl } from "@/core/services/api.url";
import { dateTimeFormat } from "@/core/utils";
import { pendingReason } from "@/core/datasource/options";
import { helpers, required } from "vuelidate/lib/validators";
const notSame = param => value => !helpers.req(value) || param != value;

export default {
  components: {
    TableSparepart,
    Evidence,
    DatePicker
  },
  props: {
    cssClass: String,
    title: String,
    submitLabel: {
      type: String,
      default: "Submit"
    },
    subTitle: String,
    requestInfo: Object,
    requestStatus: [Array, Object],
    form: Object,
    followUp: Object
  },
  data: () => ({
    baseUrl: process.env.NODE_ENV === "production" ? apiUrl.prod : apiUrl.dev,
    options: {
      pendingReason,
      technician: []
    },
    media: []
  }),
  validations() {
    const self = this;
    let status = self.requestInfo.currentStatus.status.id;
    if (self.form.status == 1) {
      return {
        form: {
          status: { notSame: notSame(status) },
          onRun: {
            startDate: { required },
            finishDate: { required }
          }
        }
      };
    } else if (self.form.status == 2) {
      return {
        form: {
          status: { notSame: notSame(status) },
          pending: {
            pendingReason: { required },
            remarks: { required }
          }
        }
      };
    } else if (self.form.status == 4) {
      return {
        form: {
          status: { notSame: notSame(status) },
          rejected: {
            remarks: { required }
          }
        }
      };
    } else if (self.form.status == 5) {
      return {
        form: {
          status: { notSame: notSame(status) },
          closed: {
            startDate: { required },
            finishDate: { required },
            remarks: { required },
            evidences: { required }
          }
        }
      };
    } else if (self.form.status == 6) {
      return {
        form: {
          status: { notSame: notSame(status) },
          reAssign: {
            startDate: { required },
            finishDate: { required },
            assignedTo: { required }
          }
        }
      };
    }

    return {
      form: {
        status: { notSame: notSame(status) }
      }
    };
  },
  methods: {
    dateTimeFormat,
    changeStatus() {
      const self = this;
      if (self.form.status == 6) {
        self.getTechnician();

        self.form.reAssign.assignedTo = self.requestInfo.request.workOrder.assignedTo.map(
          x => x.id
        );
      }
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
    },
    handleSubmit() {
      const self = this;

      self.$v.form.$touch();
      if (self.$v.form.$pending || self.$v.form.$error) return;

      let _form;
      switch (self.form.status) {
        case 1:
          _form = {
            workItemId: self.$route.params.id,
            status: self.form.status,
            remarks: self.form.onRun.remarks,
            startDate: self.form.onRun.startDate,
            finishDate: self.form.onRun.finishDate
          };
          break;
        case 2:
          _form = {
            workItemId: self.$route.params.id,
            status: self.form.status,
            remarks: self.form.pending.remarks,
            pendingReason: self.form.pending.pendingReason
          };
          break;
        case 3:
          _form = {
            workItemId: self.$route.params.id,
            status: self.form.status
          };
          break;
        case 4:
          _form = {
            workItemId: self.$route.params.id,
            status: self.form.status,
            remarks: self.form.rejected.remarks
          };
          break;
        case 5:
          _form = {
            workItemId: self.$route.params.id,
            status: self.form.status,
            startDate: self.form.closed.startDate,
            finishDate: self.form.closed.finishDate,
            remarks: self.form.closed.remarks,
            spareparts: self.form.closed.spareparts.map(x => ({
              sparepartId: x.id,
              quantity: x.quantity
            })),
            evidences: self.form.closed.evidences.map(x => x.id)
          };
          break;
        case 6:
          _form = {
            workItemId: self.$route.params.id,
            status: 0,
            spareparts: self.form.reAssign.spareparts.map(x => ({
              sparepartId: x.id,
              quantity: x.quantity
            })),
            startDate: self.form.reAssign.startDate,
            finishDate: self.form.reAssign.finishDate,
            remarks: self.form.reAssign.remarks,
            assignedTo: self.form.reAssign.assignedTo
          };
          break;
      }

      self.$dialog
        .confirm("You are about to submit this follow-up. Are you sure ?", {
          okText: "Yes, Submit",
          cancelText: "Cancel",
          loader: true
        })
        .then(dialog => {
          self.$store
            .dispatch("apis/post", {
              url: "board/followup",
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
    showEvidences(evidences) {
      const self = this;
      self.$viewerApi({
        images: evidences.map(x => `${self.baseUrl}${x.url}`)
      });
    }
  }
};
</script>
