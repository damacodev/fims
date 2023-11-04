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
            v-show="currentProgress.locked"
            variant="outline-primary"
            @click="handleDownload"
          >
            Download
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
              :timeFrom="7 * 60"
              :timeTo="13 * 60"
              :timeStep="20"
              :events="calendar.events"
              :maxDate="dateFormat(getDate(), 'YYYY-MM-DD')"
              :split-days="calendar.daySplits"
              sticky-split-labels
              :on-event-click="onEventClick"
            />
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
      <Select
        label="Flight Schedule"
        placeholder="Select flight schedule"
        description="Leave it blank if you need to type manually (Source data from https://airlabs.co)"
        v-model="modalForm.flightScheduleId"
        :options="options.flightSchedule"
        :useHorizontal="false"
        :multiple="false"
        @input="changeFlightSchedule"
        :disabled="currentProgress.locked"
      />
      <b-row>
        <b-col lg="6">
          <InputText
            label="Airline IATA"
            v-model="modalForm.airlineIata"
            :v="$v.modalForm.airlineIata"
            :useHorizontal="false"
            :disabled="
              modalForm.flightScheduleId != null || currentProgress.locked
            "
          >
            <template v-if="!isNullOrEmpty(modalForm.airlineIata)" #prepend>
              <b-input-group-text class="pt-0 pb-0">
                <b-img-lazy
                  :src="
                    `https://airlabs.co/img/airline/m/${modalForm.airlineIata.toUpperCase()}.png`
                  "
                  :alt="modalForm.airlineIata"
                  height="30px"
                ></b-img-lazy>
              </b-input-group-text>
            </template>
          </InputText>
        </b-col>
        <b-col lg="6">
          <InputText
            label="Flight Number"
            v-model="modalForm.flightNumber"
            :v="$v.modalForm.flightNumber"
            :useHorizontal="false"
            :disabled="
              modalForm.flightScheduleId != null || currentProgress.locked
            "
          >
            <template #append>
              <b-button @click="openFlightRadar24" variant="secondary">
                View at flightradar24
              </b-button>
            </template>
          </InputText>
        </b-col>
      </b-row>
      <b-row>
        <b-col lg="6">
          <InputText
            label="Estimate Time of Arrival"
            type="time"
            v-model="modalForm.eta"
            :v="$v.modalForm.eta"
            :useHorizontal="false"
            :disabled="currentProgress.locked"
          />
        </b-col>
        <b-col lg="6">
          <InputText
            label="Estimate Time of Departure"
            type="time"
            v-model="modalForm.etd"
            :v="$v.modalForm.etd"
            :useHorizontal="false"
            :disabled="currentProgress.locked"
          />
        </b-col>
      </b-row>
      <Select
        label="Refueler"
        v-model="modalForm.refuelerId"
        :options="options.refueler"
        :useHorizontal="false"
        :multiple="false"
        :disabled="currentProgress.locked"
      />
      <Select
        label="CRO"
        v-model="modalForm.croId"
        :options="options.cro"
        :useHorizontal="false"
        :multiple="false"
        :disabled="currentProgress.locked"
      />
      <b-row>
        <b-col lg="6">
          <RadioGroup
            v-model="modalForm.quickHandling"
            label="Quick Handling"
            :options="options.yesNo"
            :useHorizontal="false"
            :disabled="currentProgress.locked"
          />
        </b-col>
        <b-col lg="6">
          <RadioGroup
            v-model="modalForm.exron"
            label="Exron"
            :options="options.yesNo"
            :useHorizontal="false"
            :disabled="currentProgress.locked"
          />
        </b-col>
      </b-row>
      <RadioGroup
        v-model="modalForm.remarks"
        label="Remarks"
        :options="options.refuelingProgram"
        :useHorizontal="false"
        :disabled="currentProgress.locked"
      />
      <template #modal-footer>
        <b-button @click="resetModalForm" variant="secondary">{{
          !currentProgress.locked ? "Cancel" : "Close"
        }}</b-button>
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
          >{{ modalForm.id == null ? "Save" : "Update" }}</b-button
        >
      </template>
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
import TableItem from "./TableItem.vue";
import { required, maxLength } from "vuelidate/lib/validators";
import {
  getDppu,
  numberFormat,
  getDate,
  dateFormat,
  dateTimeFormat,
  isNullOrEmpty,
  capitalize
} from "@/core/utils";
import { yesNo, refuelingProgram } from "@/core/datasource/options";

export default {
  components: {
    FormHeader,
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
    modeView: "calendar",
    options: {
      dppu: [],
      shift: [],
      flightSchedule: [],
      refueler: [],
      cro: [],
      yesNo,
      refuelingProgram
    },
    modalForm: {
      dialog: false,
      id: null,
      flightScheduleId: null,
      airlineIata: null,
      flightNumber: null,
      eta: null,
      etd: null,
      refuelerId: null,
      croId: null,
      quickHandling: false,
      exron: false,
      remarks: null
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
      return self.$route.name != self.route.form ? "Update" : "Save";
    }
  },
  validations: {
    form: {
      dppuId: { required },
      transactionDate: { required }
    },
    modalForm: {
      airlineIata: { required, maxLength: maxLength(2) },
      flightNumber: { required, maxLength: maxLength(4) },
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

    if (self.$route.name != self.route.form) {
      self.get();
    }
  },
  methods: {
    dateFormat,
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
                label: `${x.shiftCallSign} (${x.workingTime.start} - ${x.workingTime.end})`
              }));

              self.getFlightSchedule();
              self.getEquipmentByCategory();
              self.getCro();
            }
          });
      }
    },
    changeFlightSchedule() {
      const self = this;

      self.modalForm.airlineIata = null;
      self.modalForm.flightNumber = null;
      self.modalForm.eta = null;

      let _find = self.options.flightSchedule.find(
        x => x.id == self.modalForm.flightScheduleId
      );

      if (_find) {
        self.modalForm.airlineIata = _find.detail.airlineIata;
        self.modalForm.flightNumber = _find.detail.flightNumber;
        self.modalForm.eta = dateFormat(_find.detail.arrivalTime, "HH:mm");
      }
    },
    getFlightSchedule() {
      const self = this;

      self.$store
        .dispatch("apis/get", {
          url: `/common/flight-schedule`,
          params: {
            pageNumber: 1,
            arrivalIata: self.form.dppuIata
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
              )}, ETA : ${dateFormat(x.arrivalTime, "HH:mm")})`,
              detail: x
            }));
          }
        });
    },
    getEquipmentByCategory() {
      const self = this;

      self.$store
        .dispatch("apis/get", {
          url: `/equipment`,
          params: {
            dppu: self.form.dppuId,
            category: 6
          }
        })
        .then(response => {
          if (response.error) {
            self.$message.error({
              zIndex: 10000,
              message: response.message
            });
          } else {
            self.options.refueler = response.data.data.map(x => ({
              id: x.id,
              label: x.code
            }));
          }
        });
    },
    getCro() {
      const self = this;

      self.$store
        .dispatch("apis/get", {
          url: "/account/technician",
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
              label: x.fullName
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

            let refuelerLabel = response.data.details.map(x => ({
              label: x.refueler?.label || "-"
            }));
            self.calendar.daySplits = [
              ...new Set(refuelerLabel.map(x => x.label))
            ].sort();
            self.calendar.daySplits = self.calendar.daySplits.map(x => ({
              label: x
            }));

            self.calendar.events = response.data.details.map(x => ({
              start: dateFormat(x.eta, "YYYY-MM-DD HH:mm"),
              end: dateFormat(x.etd, "YYYY-MM-DD HH:mm"),
              title: `<span class="font-size-h5 font-weight-bolder">${x.airlineIata}${x.flightNumber}</span>`,
              content: `
                Refueler : <span class="font-weight-bolder">${x.refueler
                  ?.label || "-"}</span><br/>
                CRO : <span class="font-weight-bolder">${x.cro?.label ||
                  "-"}</span><br/>
                Quick Handling : <span class="font-weight-bolder">${
                  x.quickHandling ? "Yes" : "No"
                }</span><br/>
                Exron : <span class="font-weight-bolder">${
                  x.exron ? "Yes" : "No"
                }</span><br/>
                Remarks : <span class="font-weight-bolder">${x.remarks ??
                  "-"}</span><br/>
              `,
              class: "bg-light-success",
              split:
                self.calendar.daySplits.findIndex(
                  d => d.label == (x.refueler == null ? "-" : x.refueler.label)
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
      self.modalForm.eta = null;
      self.modalForm.etd = null;
      self.modalForm.refuelerId = null;
      self.modalForm.croId = null;
      self.modalForm.quickHandling = false;
      self.modalForm.exron = false;
      self.modalForm.remarks = null;
    },
    handleOpenForm() {
      const self = this;

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
      self.modalForm.eta = dateFormat(item.eta, "HH:mm");
      self.modalForm.etd = dateFormat(item.etd, "HH:mm");
      self.modalForm.refuelerId = item.refueler?.id;
      self.modalForm.croId = item.cro?.id;
      self.modalForm.quickHandling = item.quickHandling;
      self.modalForm.exron = item.exron;
      self.modalForm.remarks = item.remarks;
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
        _confirmText = "You are about to save this transaction. Are you sure ?";
        _okText = "Yes, Save";
        _action = "apis/post";
        _url = "/board/standard-form/120";
      } else {
        _confirmText =
          "You are about to update this transaction. Are you sure ?";
        _okText = "Yes, Update";
        _action = "apis/put";
        _url = `/board/standard-form/120/${self.$route.params.id}`;
      }

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
            .finally(() => dialog.close());
        });
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
    handleDownload() {
      const self = this;

      self.$store
        .dispatch("apis/download", {
          url: `/board/standard-form/120/export/${self.$route.params.id}`
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
            fileLink.setAttribute("download", "120 SF.xlsx");
            document.body.appendChild(fileLink);

            fileLink.click();
          }
        });
    },
    handleSaveRecord(event) {
      event.preventDefault();
      const self = this;

      self.$v.modalForm.$touch();
      if (self.$v.modalForm.$pending || self.$v.modalForm.$error) return;

      let _confirmText = "",
        _okText = "",
        _action = "",
        _url = "";

      if (self.modalForm.id == null) {
        _confirmText = "You are about to save this record. Are you sure ?";
        _okText = "Yes, Save";
        _action = "apis/post";
        _url = "/board/standard-form/120/record";
      } else {
        _confirmText = "You are about to update this record. Are you sure ?";
        _okText = "Yes, Update";
        _action = "apis/put";
        _url = `/board/standard-form/120/record/${self.modalForm.id}`;
      }

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
                flightScheduleId: self.modalForm.flightScheduleId,
                refuelerId: self.modalForm.refuelerId,
                croId: self.modalForm.croId,
                quickHandling: self.modalForm.quickHandling,
                exron: self.modalForm.exron,
                remarks: self.modalForm.remarks
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
            .finally(() => dialog.close());
        });
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
    openFlightRadar24() {
      const self = this;
      window.open(
        `https://www.flightradar24.com/data/flights/${self.modalForm.airlineIata}${self.modalForm.flightNumber}`
      );
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
      self.modalForm.eta = dateFormat(event.detail.eta, "HH:mm");
      self.modalForm.etd = dateFormat(event.detail.etd, "HH:mm");
      self.modalForm.refuelerId = event.detail.refueler?.id;
      self.modalForm.croId = event.detail.cro?.id;
      self.modalForm.quickHandling = event.detail.quickHandling;
      self.modalForm.exron = event.detail.exron;
      self.modalForm.remarks = event.detail.remarks;

      e.stopPropagation();
    }
  }
};
</script>
