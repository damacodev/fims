<template>
  <fragment>
    <div class="card card-custom">
      <div class="card-header py-3">
        <div class="card-title align-items-start flex-column">
          <h3 class="card-label font-weight-bolder text-dark">
            <b-button class="btn-icon mr-2" size="xs" @click="$router.go(-1)">
              <i class="flaticon2-back" />
            </b-button>
            {{ title }}
          </h3>
          <span class="text-muted font-weight-bold font-size-sm mt-1 pl-10">
            {{ subTitle }}
          </span>
        </div>
        <div class="card-toolbar">
          <b-button
            v-show="$route.name != route.form"
            variant="secondary"
            size="lg"
            class="mr-2"
            @click="handleOpenFormCopy"
          >
            Copy
          </b-button>
          <b-button
            v-show="$route.name != route.form"
            variant="outline-primary"
            size="lg"
            class="mr-2"
            @click="handleExport"
          >
            Export to Excel
          </b-button>
          <b-button
            v-show="$route.name != route.form && !currentProgress.locked"
            variant="outline-danger"
            size="lg"
            class="mr-2"
            @click="handleDelete"
          >
            Delete
          </b-button>
          <b-button
            v-show="
              $route.name != route.form &&
                !currentProgress.locked &&
                table.rows.length > 0
            "
            variant="outline-primary"
            size="lg"
            class="mr-2"
            @click="handleSendApproval"
          >
            Save and Send Approval
          </b-button>
          <b-button
            v-show="!currentProgress.locked"
            variant="primary"
            size="lg"
            @click="handleSubmit"
          >
            {{ textButton }}
          </b-button>
        </div>
      </div>
      <b-row class="p-2">
        <div class="card-body pb-0">
          <template v-if="!currentProgress.locked">
            <Select
              v-if="multipleDppu"
              label="Depot Pengisian Pesawat Udara"
              v-model="form.dppuId"
              :v="$v.form.dppuId"
              :options="options.dppu"
              :multiple="false"
              :disabled="$route.name != route.form"
              @input="changeDppu"
            />
            <InputText
              label="Transaction #"
              type="text"
              v-model="form.transactionId"
              disabled
            />
            <InputText
              label="Transaction Date"
              type="date"
              v-model="form.transactionDate"
              :v="$v.form.transactionDate"
              :max="getDate()"
            />
            <Select
              label="Shift"
              v-model="form.shiftId"
              :options="options.shift"
              :multiple="false"
            />
            <InputText
              label="Shift Group"
              type="text"
              v-model="form.shiftGroup"
            />
          </template>
          <FormHeader
            v-else
            :form="form"
            :currentProgress="currentProgress"
            :showRemarks="true"
          />
        </div>
      </b-row>
      <div v-show="$route.name != route.form">
        <hr />
        <b-row>
          <b-col lg="6">
            <b-button
              v-show="!currentProgress.locked"
              variant="outline-primary"
              class="ml-2 mb-4"
              @click="handleOpenForm"
            >
              Add New Record
            </b-button>
          </b-col>
          <b-col lg="6" class="text-right">
            <b-button
              :variant="modeView == 'tabular' ? 'success' : 'outline- success'"
              class="mr-2 mb-4"
              @click="modeView = 'tabular'"
            >
              Tabular View
            </b-button>
            <b-button
              :variant="modeView == 'calendar' ? 'success' : 'outline- success'"
              class="mr-2 mb-4"
              @click="modeView = 'calendar'"
            >
              Calendar View
            </b-button>
          </b-col>
        </b-row>
        <div>
          <fragment v-if="modeView == `tabular`">
            <TableItem :rows="table.rows" @onRowSelected="onRowSelected" />
            <EmptyTable
              v-if="table.rows.length == 0"
              title="Bridger Quality Control Before Receipt Records will be displayed here"
              description="Please add an items first"
            />
          </fragment>
          <fragment v-else>
            <VueCal
              :disableViews="['years', 'year', 'month', 'week']"
              :selectedDate="form.transactionDate"
              :timeFrom="calendarTime.start"
              :timeTo="calendarTime.end"
              :timeStep="20"
              :events="calendar.events"
              :maxDate="dateFormat(form.transactionDate, 'YYYY-MM-DD')"
              :split-days="calendar.daySplits"
              sticky-split-labels
              :on-event-click="onEventClick"
            >
              <template #event="{ event }">
                <div class="p-3">
                  <i class="icon material-icons">flight</i>

                  <div class="vuecal__event-title" v-html="event.title" />

                  ETA :
                  <span class="font-weight-bolder">
                    {{ dateTimeFormat(event.eta, "HH:mm") }} </span
                  ><br />
                  ETD :
                  <span class="font-weight-bolder">
                    {{ dateTimeFormat(event.etd, "HH:mm") }} </span
                  ><br />
                  Refueling Time :
                  <span class="font-weight-bolder">
                    {{ dateTimeFormat(event.refuelingTime, "HH:mm") }} </span
                  ><br />
                  CRO :
                  <span class="font-weight-bolder">
                    {{ event.cro == null ? "Unassigned" : event.cro.label }}
                  </span>
                </div>
              </template>
            </VueCal>
          </fragment>
        </div>
      </div>
    </div>
    <b-modal
      v-model="modalForm.dialog"
      :title="
        currentProgress.locked
          ? 'Detail Record'
          : modalForm.id == null
          ? 'Add New Record'
          : 'Update Record'
      "
      size="lg"
      :ok-title="modalForm.id == null ? 'Save' : 'Update'"
      ok-variant="primary"
      :no-close-on-backdrop="true"
      :no-close-on-esc="true"
      @ok="handleSaveRecord"
      @cancel="resetModalForm"
    >
      <FormModal
        :form="modalForm"
        :options="options"
        :currentProgress="currentProgress"
        :validator="$v.modalForm"
      />
      <template #modal-footer>
        <b-button @click="resetModalForm" variant="secondary">
          {{ !currentProgress.locked ? "Cancel" : "Close" }}
        </b-button>
        <b-button
          v-if="modalForm.id != null && !currentProgress.locked"
          @click="handleDeleteRecord"
          variant="outline-danger"
          class="ml-8"
        >
          Delete
        </b-button>
        <b-button
          v-if="!currentProgress.locked"
          @click="handleSaveRecord"
          variant="primary"
        >
          {{ modalForm.id == null ? "Save" : "Update" }}
        </b-button>
      </template>
    </b-modal>
    <b-modal
      v-model="modalCopy.dialog"
      title="Destination to Copy Transaction"
      ok-title="Copy"
      :no-close-on-backdrop="true"
      :no-close-on-esc="true"
      @ok="handleCopy"
    >
      <InputText
        label="Transaction Date"
        type="date"
        v-model="modalCopy.transactionDate"
        :useHorizontal="false"
      />
      <Select
        label="Shift"
        placeholder="Select shift"
        v-model="modalCopy.shiftId"
        :options="options.shift"
        :multiple="false"
        :useHorizontal="false"
      />
    </b-modal>
  </fragment>
</template>

<style lang="sass" scoped>
.input-group-text
  border: unset !important
</style>

<script>
import { mapGetters } from "vuex";
import FormHeader from "./FormHeader.vue";
import FormModal from "./FormModal.vue";
import TableItem from "./TableItem.vue";
import { required, maxLength } from "vuelidate/lib/validators";
import {
  getDppu,
  getRefuelingProgram,
  numberFormat,
  getDate,
  dateFormat,
  dateTimeFormat,
  dateAdd,
  isNullOrEmpty,
  capitalize
} from "@/core/utils";
import { yesNo } from "@/core/datasource/options";

export default {
  components: {
    FormHeader,
    FormModal,
    TableItem
  },
  data: () => ({
    title: "120 SF - Refueling Program",
    route: {
      form: "sf120Create",
      table: "sf120"
    },
    form: {
      dppu: {
        id: null,
        label: null
      },
      dppuId: null,
      dppuIata: null,
      transactionId: "Auto Generated",
      transactionDate: getDate(),
      shift: {
        id: null,
        label: null
      },
      shiftId: null,
      shiftGroup: null,
      sendApproval: false,
      updatedBy: null,
      updatedAt: null
    },
    currentProgress: {
      locked: null,
      status: null,
      remarks: null,
      nextAction: {
        id: null,
        label: null
      }
    },
    table: {
      rows: []
    },
    calendar: {
      daySplits: [],
      events: []
    },
    modeView: "tabular",
    options: {
      dppu: [],
      shift: [],
      flightSchedule: [],
      cro: [],
      refuelingProgram: [],
      yesNo
    },
    modalForm: {
      dialog: false,
      realization: true,
      id: null,
      flightScheduleId: null,
      airlineIata: null,
      flightNumber: null,
      aircraftType: null,
      eta: null,
      etd: null,
      refuelingTime: null,
      croId: null,
      quickHandling: false,
      exron: false,
      remarksId: null
    },
    modalCopy: {
      dialog: false,
      transactionDate: getDate(),
      shiftId: null
    }
  }),
  computed: {
    ...mapGetters("personalize", ["multipleDppu", "dppu"]),
    ...mapGetters("auth", ["user"]),
    subTitle() {
      const self = this;
      return self.$route.name != self.route.form
        ? "Update transaction"
        : "Create new transaction";
    },
    textButton() {
      const self = this;
      return self.$route.name != self.route.form
        ? "Update"
        : "Save and Continue";
    },
    calendarTime() {
      const self = this;
      if (self.form.shiftId == null) {
        return null;
      } else {
        let _find = self.options.shift.find(x => x.id == self.form.shiftId);

        let starts = _find.detail.workingTime.start.split(":");
        let ends = _find.detail.workingTime.end.split(":");

        return {
          start: parseInt(starts[0]) * 60 + parseInt(starts[1]),
          end: parseInt(ends[0]) * 60 + parseInt(ends[1])
        };
      }
    }
  },
  validations: {
    form: {
      dppuId: { required },
      transactionDate: { required }
    },
    modalForm: {
      airlineIata: { required, maxLength: maxLength(3) },
      flightNumber: { required, maxLength: maxLength(4) },
      aircraftType: { required, maxLength: maxLength(100) },
      eta: { required },
      etd: { required }
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
      self.changeDppu();
    }

    getRefuelingProgram().then(response => {
      self.options.refuelingProgram = response;
    });

    if (self.$route.name != self.route.form) {
      self.get();
    }
  },
  methods: {
    dateFormat,
    dateTimeFormat,
    numberFormat,
    getDate,
    isNullOrEmpty,
    changeDppu() {
      const self = this;

      self.form.shiftId = null;
      self.options.shift = [];
      if (self.form.dppuId != null) {
        self.$store
          .dispatch("apis/get", {
            url: `/dppu/${self.form.dppuId}`
          })
          .then(response => {
            if (response.error) {
              self.$message.error({
                zIndex: 10000,
                message: response.message
              });
            } else {
              self.form.dppuIata = response.data.iata;
              self.options.shift = response.data.shifts.map(x => ({
                id: x.id,
                label: `${x.shiftCallSign} (${x.workingTime.start} - ${x.workingTime.end})`,
                detail: x
              }));

              self.getFlightSchedule();
              self.getCro();
            }
          });
      }
    },
    getFlightSchedule() {
      const self = this;

      self.$store
        .dispatch("apis/get", {
          url: `/common/flight-schedule`,
          params: {
            pageNumber: 1,
            departureTime: self.form.transactionDate,
            departureIata: self.form.dppuIata
          }
        })
        .then(response => {
          if (response.error) {
            self.$message.error({
              zIndex: 10000,
              message: response.message
            });
          } else {
            self.options.flightSchedule = response.data.data.map(x => ({
              id: x.id,
              label: `${x.flightIata} (${capitalize(
                x.status
              )}, ETA : ${dateFormat(
                x.arrivalTime,
                "HH:mm"
              )}, ETD : ${dateFormat(x.departureTime, "HH:mm")})`,
              detail: x
            }));
          }
        });
    },
    getCro() {
      const self = this;

      self.$store
        .dispatch("apis/get", {
          url: "/common/cro",
          params: {
            dppu: self.form.dppuId
          }
        })
        .then(response => {
          if (response.error) {
            self.$message.error({
              zIndex: 10000,
              message: response.message
            });
          } else {
            self.options.cro = response.data.data.map(x => ({
              id: x.id,
              label: isNullOrEmpty(x.code)
                ? x.fullName
                : `${x.code} - ${x.fullName}`
            }));
          }
        });
    },
    get() {
      const self = this;

      let loader = self.$loading.show();
      self.$store
        .dispatch("apis/get", {
          url: `/board/standard-form/120/${self.$route.params.id}`
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
              dppu: response.data.dppu,
              dppuId: response.data.dppu?.id,
              dppuIata: self.form.dppuIata,
              transactionId: response.data.transactionId,
              transactionDate: dateFormat(
                response.data.transactionDate,
                "YYYY-MM-DD"
              ),
              shift: {
                id: response.data.shift?.id,
                label: response.data.shift?.label
              },
              shiftId: response.data.shift?.id,
              shiftGroup: response.data.shiftGroup,
              updatedBy: response.data.updatedBy,
              updatedAt: response.data.updatedAt
            };

            self.currentProgress = {
              locked: response.data.currentProgress.locked,
              status: response.data.currentProgress.status,
              remarks: response.data.currentProgress.remarks,
              nextAction: {
                id: response.data.currentProgress.nextAction?.id,
                label: response.data.currentProgress.nextAction?.label
              }
            };

            self.table.rows = response.data.details;

            let croLabel = response.data.details.map(x => ({
              label: x.cro?.label || "Unassigned"
            }));
            self.calendar.daySplits = [
              ...new Set(croLabel.map(x => x.label))
            ].sort();
            self.calendar.daySplits = self.calendar.daySplits.map(x => ({
              label: x
            }));

            self.calendar.events = response.data.details.map(x => ({
              start: dateFormat(
                x.refuelingTime != null ? x.refuelingTime : x.etd,
                "YYYY-MM-DD HH:mm"
              ),
              end: dateFormat(
                dateAdd(
                  x.refuelingTime != null ? x.refuelingTime : x.etd,
                  65,
                  "minutes",
                  false
                ),
                "YYYY-MM-DD HH:mm"
              ),
              title: `<span class="font-size-h5 font-weight-bolder">${x.airlineIata}${x.flightNumber}</span>`,
              cro: x.cro,
              eta: x.eta,
              etd: x.etd,
              refuelingTime: x.refuelingTime,
              class:
                x.refuelingTime != null && x.remarks == null
                  ? "bg-light-success"
                  : x.refuelingTime == null &&
                    x.remarks != null &&
                    x.remarks.value == "D"
                  ? "bg-light-danger"
                  : "bg-light-secondary",
              split:
                self.calendar.daySplits.findIndex(
                  d => d.label == (x.cro == null ? "Unassigned" : x.cro.label)
                ) + 1,
              detail: x
            }));
          }
        })
        .finally(() => loader.hide());
    },
    resetModalForm() {
      const self = this;

      let _find = self.options.flightSchedule.find(x => x.isDisabled);
      if (_find) {
        self.options.flightSchedule.splice(0, 1);
      }

      self.modalForm.dialog = false;
      self.modalForm.id = null;
      self.modalForm.flightScheduleId = null;
      self.modalForm.airlineIata = null;
      self.modalForm.flightNumber = null;
      self.modalForm.aircraftType = null;
      self.modalForm.eta = null;
      self.modalForm.etd = null;
      self.modalForm.refuelingTime = null;
      self.modalForm.croId = null;
      self.modalForm.quickHandling = false;
      self.modalForm.exron = false;
      self.modalForm.remarksId = null;
    },
    handleOpenForm() {
      const self = this;

      self.resetModalForm();
      self.modalForm.dialog = true;
    },
    onRowSelected(item) {
      const self = this;

      if (item.flightSchedule != null) {
        self.options.flightSchedule = [
          {
            id: item.flightSchedule.id,
            label: item.flightSchedule.label,
            isDisabled: true
          },
          ...self.options.flightSchedule
        ];

        self.modalForm.flightScheduleId = item.flightSchedule.id;
      }

      self.modalForm.dialog = true;
      self.modalForm.id = item.id;
      self.modalForm.airlineIata = item.airlineIata;
      self.modalForm.flightNumber = item.flightNumber;
      self.modalForm.aircraftType = item.aircraftType;
      self.modalForm.eta = dateFormat(item.eta, "HH:mm");
      self.modalForm.etd = dateFormat(item.etd, "HH:mm");
      self.modalForm.refuelingTime = dateFormat(item.refuelingTime, "HH:mm");
      self.modalForm.croId = item.cro?.id;
      self.modalForm.quickHandling = item.quickHandling;
      self.modalForm.exron = item.exron;
      self.modalForm.remarksId = item.remarks?.id;
      self.modalForm.realization = item.remarks == null;
    },
    handleSubmit() {
      const self = this;

      self.$v.form.$touch();
      if (self.$v.form.$pending || self.$v.form.$error) return;

      let loader = self.$loading.show();
      let _action = "",
        _url = "";

      if (self.$route.name == self.route.form) {
        _action = "apis/post";
        _url = "/board/standard-form/120";
      } else {
        _action = "apis/put";
        _url = `/board/standard-form/120/${self.$route.params.id}`;
      }

      self.$store
        .dispatch(_action, {
          url: _url,
          params: self.form
        })
        .then(response => {
          if (response.error) {
            self.$message.error({
              zIndex: 10000,
              message: response.message
            });
          } else {
            // self.$message.success({
            //   zIndex: 10000,
            //   message: response.message
            // });

            if (self.$route.name == self.route.form) {
              self.$router.replace({
                name: "sf120Update",
                params: {
                  id: response.data.id
                }
              });

              self.form = {
                dppu: response.data.dppu,
                dppuId: response.data.dppu?.id,
                transactionId: response.data.transactionId,
                transactionDate: dateFormat(
                  response.data.transactionDate,
                  "YYYY-MM-DD"
                ),
                shift: {
                  id: response.data.shift?.id,
                  label: response.data.shift?.label
                },
                shiftId: response.data.shift?.id,
                shiftGroup: response.data.shiftGroup,
                updatedBy: response.data.updatedBy,
                updatedAt: response.data.updatedAt
              };

              self.currentProgress = {
                status: response.data.currentProgress.status,
                remarks: response.data.currentProgress.remarks,
                nextAction: {
                  id: response.data.currentProgress.nextAction?.id,
                  label: response.data.currentProgress.nextAction?.label
                }
              };

              self.table.rows = response.data.details;
            }
          }
        })
        .finally(() => loader.hide());
    },
    handleDelete() {
      const self = this;

      self.$dialog
        .confirm("You are about to delete this transaction. Are you sure ?", {
          okText: "Yes, Delete",
          cancelText: "Cancel",
          loader: true
        })
        .then(dialog => {
          self.$store
            .dispatch("apis/remove", {
              url: `/board/standard-form/120/${self.$route.params.id}`
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
    },
    handleSendApproval() {
      const self = this;

      self.$v.form.$touch();
      if (self.$v.form.$pending || self.$v.form.$error) return;

      self.$dialog
        .confirm(
          "You are about to save & send approval this transaction. Are you sure ?",
          {
            okText: "Yes, Send",
            cancelText: "Cancel",
            loader: true
          }
        )
        .then(dialog => {
          self.form.sendApproval = true;

          self.$store
            .dispatch("apis/put", {
              url: `/board/standard-form/120/${self.$route.params.id}`,
              params: self.form
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
    },
    handleExport() {
      const self = this;

      self.$dialog
        .confirm("You are about to export this transaction. Are you sure ?", {
          okText: "Yes, Export",
          cancelText: "Cancel",
          loader: true
        })
        .then(dialog => {
          self.$store
            .dispatch("apis/download", {
              url: `/board/export/standard-form/120/${self.$route.params.id}`
            })
            .then(response => {
              if (response.error) {
                self.$message.error({
                  zIndex: 10000,
                  message: response.message
                });
              } else {
                let fileURL = window.URL.createObjectURL(new Blob([response])),
                  fileLink = document.createElement("a");

                fileLink.href = fileURL;
                fileLink.setAttribute("download", "120.xlsx");
                document.body.appendChild(fileLink);

                fileLink.click();
              }
            })
            .finally(() => dialog.close());
        });
    },
    handleSaveRecord(event) {
      event.preventDefault();
      const self = this;

      self.$v.modalForm.$touch();
      if (self.$v.modalForm.$pending || self.$v.modalForm.$error) return;

      let loader = self.$loading.show();
      let _action = "",
        _url = "";

      if (self.modalForm.id == null) {
        _action = "apis/post";
        _url = "/board/standard-form/120/record";
      } else {
        _action = "apis/put";
        _url = `/board/standard-form/120/record/${self.modalForm.id}`;
      }

      self.$store
        .dispatch(_action, {
          url: _url,
          params: {
            standardForm120Id: self.$route.params.id,
            eta: dateTimeFormat(
              `${self.form.transactionDate} ${self.modalForm.eta}`,
              "YYYY-MM-DD HH:mm:ss"
            ),
            etd: dateTimeFormat(
              `${self.form.transactionDate} ${self.modalForm.etd}`,
              "YYYY-MM-DD HH:mm:ss"
            ),
            airlineIata: self.modalForm.airlineIata,
            flightNumber: self.modalForm.flightNumber,
            aircraftType: self.modalForm.aircraftType,
            flightScheduleId: self.modalForm.flightScheduleId,
            refuelingTime:
              self.modalForm.refuelingTime == null
                ? null
                : dateTimeFormat(
                    `${self.form.transactionDate} ${self.modalForm.refuelingTime}`,
                    "YYYY-MM-DD HH:mm:ss"
                  ),
            croId: self.modalForm.croId,
            quickHandling: self.modalForm.quickHandling,
            exron: self.modalForm.exron,
            remarksId: self.modalForm.remarksId
          }
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
            self.get();
            self.resetModalForm();
          }
        })
        .finally(() => loader.hide());
    },
    handleDeleteRecord() {
      const self = this;

      self.$dialog
        .confirm("You are about to delete this record. Are you sure ?", {
          okText: "Yes, Delete",
          cancelText: "Cancel",
          loader: true
        })
        .then(dialog => {
          self.$store
            .dispatch("apis/remove", {
              url: `/board/standard-form/120/record/${self.modalForm.id}`
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
                self.get();
                self.resetModalForm();
              }
            })
            .finally(() => dialog.close());
        });
    },
    onEventClick(event, e) {
      const self = this;

      if (event.detail.flightSchedule != null) {
        self.options.flightSchedule = [
          {
            id: event.detail.flightSchedule.id,
            label: event.detail.flightSchedule.label,
            isDisabled: true
          },
          ...self.options.flightSchedule
        ];

        self.modalForm.flightScheduleId = event.detail.flightSchedule.id;
      }

      self.modalForm.dialog = true;
      self.modalForm.id = event.detail.id;
      self.modalForm.airlineIata = event.detail.airlineIata;
      self.modalForm.flightNumber = event.detail.flightNumber;
      self.modalForm.aircraftType = event.detail.aircraftType;
      self.modalForm.eta = dateFormat(event.detail.eta, "HH:mm");
      self.modalForm.etd = dateFormat(event.detail.etd, "HH:mm");
      self.modalForm.refuelingTime = dateFormat(
        event.detail.refuelingTime,
        "HH:mm"
      );
      self.modalForm.croId = event.detail.cro?.id;
      self.modalForm.quickHandling = event.detail.quickHandling;
      self.modalForm.exron = event.detail.exron;
      self.modalForm.remarksId = event.detail.remarks?.id;

      e.stopPropagation();
    },
    handleOpenFormCopy() {
      const self = this;

      self.modalCopy.dialog = true;
      self.modalCopy.transactionDate = getDate();
      self.modalCopy.shiftId = null;
    },
    handleCopy() {
      const self = this;

      self.$dialog
        .confirm("You are about to copy this transaction. Are you sure ?", {
          okText: "Yes, Copy",
          cancelText: "Cancel",
          loader: true
        })
        .then(dialog => {
          self.$store
            .dispatch("apis/post", {
              url: `/board/standard-form/120/copy/${self.$route.params.id}`,
              params: {
                transactionDate: self.modalCopy.transactionDate,
                shiftId: self.modalCopy.shiftId
              }
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

                setTimeout(() => {
                  // self.$router.push({
                  //   name: "sf120Update",
                  //   params: {
                  //     id: response.data.id,
                  //   },
                  // });
                  // self.get();
                  self.$router.push({ name: self.route.table });
                }, 1000);
              }
            })
            .finally(() => dialog.close());
        });
    }
  }
};
</script>
