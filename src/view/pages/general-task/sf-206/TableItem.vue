<template>
  <fragment>
    <b-col lg="12">
      <b-card no-body class="mt-6">
        <b-tabs pills card>
          <b-tab
            v-for="(detail, indexDetail) in details"
            v-bind:key="indexDetail"
            :title="detail.equipment.label"
            class="p-0"
          >
            <b-button
              v-show="!currentProgress.locked"
              variant="outline-primary"
              class="ml-2 mt-4 mb-4"
              @click="handleOpenForm(detail)"
            >
              Add New Record
            </b-button>
            <b-table-simple responsive="" bordered hover class="text-nowrap">
              <b-thead head-variant="light">
                <b-tr>
                  <b-th class="text-center align-middle" rowspan="3">
                    Equipment
                  </b-th>
                  <b-th class="text-center align-middle" colspan="18">
                    Pressure Gauge Function
                  </b-th>
                </b-tr>
                <b-tr>
                  <b-th class="text-center align-middle" rowspan="2">
                    Nomor Uji
                  </b-th>
                  <b-th class="text-center align-middle" colspan="4">
                    Pump Pressure
                  </b-th>
                  <b-th class="text-center align-middle" colspan="4">
                    Air Reference
                  </b-th>
                  <b-th class="text-center align-middle" colspan="4">
                    Venturi
                  </b-th>
                  <b-th class="text-center align-middle" colspan="4">
                    Inlet Loading
                  </b-th>
                  <b-th class="text-center align-middle" rowspan="2">Note</b-th>
                </b-tr>

                <b-tr>
                  <b-th class="text-center align-middle">Master</b-th>
                  <b-th class="text-center align-middle">Eqpt</b-th>
                  <b-th class="text-center align-middle">Diff (max 2 psi)</b-th>
                  <b-th class="text-center align-middle">Remark</b-th>

                  <b-th class="text-center align-middle">Master</b-th>
                  <b-th class="text-center align-middle">Eqpt</b-th>
                  <b-th class="text-center align-middle">Diff (max 2 psi)</b-th>
                  <b-th class="text-center align-middle">Remark</b-th>

                  <b-th class="text-center align-middle">Master</b-th>
                  <b-th class="text-center align-middle">Eqpt</b-th>
                  <b-th class="text-center align-middle">Diff (max 2 psi)</b-th>
                  <b-th class="text-center align-middle">Remark</b-th>

                  <b-th class="text-center align-middle">Master</b-th>
                  <b-th class="text-center align-middle">Eqpt</b-th>
                  <b-th class="text-center align-middle">Diff (max 2 psi)</b-th>
                  <b-th class="text-center align-middle">Remark</b-th>
                </b-tr>
              </b-thead>
              <b-tbody>
                <template v-for="(row, index) in detail.records">
                  <b-tr v-bind:key="index" @click="onRowSelected(detail, row)">
                    <td>{{ detail.equipment.label }}</td>
                    <td class="text-center">{{ row.nomorUji }}</td>

                    <td class="text-center">
                      {{ setMaster(row.pumpPressure) }}
                    </td>
                    <td class="text-center">{{ setEqpt(row.pumpPressure) }}</td>
                    <td class="text-center">
                      {{ setDifferent(row.pumpPressure) }}
                    </td>
                    <td class="text-center">
                      <span
                        v-if="row.pumpPressure != null"
                        v-html="setOption(row.pumpPressure.remark)"
                      />
                      <span v-else>-</span>
                    </td>

                    <td class="text-center">
                      {{ setMaster(row.airReference) }}
                    </td>
                    <td class="text-center">{{ setEqpt(row.airReference) }}</td>
                    <td class="text-center">
                      {{ setDifferent(row.airReference) }}
                    </td>
                    <td class="text-center">
                      <span
                        v-if="row.airReference != null"
                        v-html="setOption(row.airReference.remark)"
                      />
                      <span v-else>-</span>
                    </td>

                    <td class="text-center">{{ setMaster(row.venturi) }}</td>
                    <td class="text-center">{{ setEqpt(row.venturi) }}</td>
                    <td class="text-center">{{ setDifferent(row.venturi) }}</td>
                    <td class="text-center">
                      <span
                        v-if="row.venturi != null"
                        v-html="setOption(row.venturi.remark)"
                      />
                      <span v-else>-</span>
                    </td>

                    <td class="text-center">
                      {{ setMaster(row.inletLoading) }}
                    </td>
                    <td class="text-center">{{ setEqpt(row.inletLoading) }}</td>
                    <td class="text-center">
                      {{ setDifferent(row.inletLoading) }}
                    </td>
                    <td class="text-center">
                      <span
                        v-if="row.inletLoading != null"
                        v-html="setOption(row.inletLoading.remark)"
                      />
                      <span v-else>-</span>
                    </td>

                    <td>{{ row.notes }}</td>
                  </b-tr>
                </template>
              </b-tbody>
            </b-table-simple>
            <EmptyTable
              v-if="detail.records.length == 0"
              title="Pressure Gauge Acuracy Test Record will be displayed here"
              description="Please add an items first"
            />
          </b-tab>
        </b-tabs>
      </b-card>
    </b-col>

    <b-modal
      v-model="modal.show"
      :title="modal.title"
      :ok-title="modal.okTitle"
      :ok-only="modal.mode == `add`"
      @ok="handleSubmit"
      cancel-title="Remove"
      cancel-variant="outline-danger"
      @cancel="handleRemove"
      size="lg"
    >
      <InputText
        label="Nomor Uji"
        type="number"
        :min="1"
        :max="3"
        v-model="modal.form.nomorUji"
        :v="$v.modal.form.nomorUji"
        :useHorizontal="false"
      />
      <TextArea
        label="Note"
        v-model="modal.form.notes"
        :useHorizontal="false"
      />

      <b-card no-body class="mt-6">
        <b-tabs pills card>
          <b-tab title="Pump Pressure" class="p-8">
            <b-row>
              <b-col lg="6">
                <InputText
                  label="Master"
                  type="number"
                  v-model="modal.form.pumpPressure.master"
                  :useHorizontal="false"
                />
              </b-col>
              <b-col lg="6">
                <InputText
                  label="Eqpt"
                  type="number"
                  v-model="modal.form.pumpPressure.eqpt"
                  :useHorizontal="false"
                />
              </b-col>
              <b-col lg="6">
                <InputPlainText
                  label="Different (max 2 psi)"
                  type="number"
                  v-model="pumpPressureDifferent"
                  :useHorizontal="false"
                  disabled
                />
              </b-col>
              <b-col lg="6">
                <Select
                  label="Remark"
                  placeholder="Select Remark"
                  v-model="modal.form.pumpPressure.remarkId"
                  :useHorizontal="false"
                  :options="options.pressureGaugeFunction"
                  :multiple="false"
                />
              </b-col>
            </b-row>
          </b-tab>
          <b-tab title="Air Reference" class="p-8">
            <b-row>
              <b-col lg="6">
                <InputText
                  label="Master"
                  type="number"
                  v-model="modal.form.airReference.master"
                  :useHorizontal="false"
                />
              </b-col>
              <b-col lg="6">
                <InputText
                  label="Eqpt"
                  type="number"
                  v-model="modal.form.airReference.eqpt"
                  :useHorizontal="false"
                />
              </b-col>
              <b-col lg="6">
                <InputPlainText
                  label="Different (max 2 psi)"
                  type="number"
                  v-model="airReferenceDifferent"
                  :useHorizontal="false"
                  disabled
                />
              </b-col>
              <b-col lg="6">
                <Select
                  label="Remark"
                  placeholder="Select Remark"
                  v-model="modal.form.airReference.remarkId"
                  :useHorizontal="false"
                  :options="options.pressureGaugeFunction"
                  :multiple="false"
                />
              </b-col>
            </b-row>
          </b-tab>
          <b-tab title="Venturi" class="p-8">
            <b-row>
              <b-col lg="6">
                <InputText
                  label="Master"
                  type="number"
                  v-model="modal.form.venturi.master"
                  :useHorizontal="false"
                />
              </b-col>
              <b-col lg="6">
                <InputText
                  label="Eqpt"
                  type="number"
                  v-model="modal.form.venturi.eqpt"
                  :useHorizontal="false"
                />
              </b-col>
              <b-col lg="6">
                <InputPlainText
                  label="Different (max 2 psi)"
                  type="number"
                  v-model="venturiDifferent"
                  :useHorizontal="false"
                  disabled
                />
              </b-col>
              <b-col lg="6">
                <Select
                  label="Remark"
                  placeholder="Select Remark"
                  v-model="modal.form.venturi.remarkId"
                  :useHorizontal="false"
                  :options="options.pressureGaugeFunction"
                  :multiple="false"
                />
              </b-col>
            </b-row>
          </b-tab>
          <b-tab title="Inlet Loading" class="p-8">
            <b-row>
              <b-col lg="6">
                <InputText
                  label="Master"
                  type="number"
                  v-model="modal.form.inletLoading.master"
                  :useHorizontal="false"
                />
              </b-col>
              <b-col lg="6">
                <InputText
                  label="Eqpt"
                  type="number"
                  v-model="modal.form.inletLoading.eqpt"
                  :useHorizontal="false"
                />
              </b-col>
              <b-col lg="6">
                <InputPlainText
                  label="Different (max 2 psi)"
                  type="number"
                  v-model="inletLoadingDifferent"
                  :useHorizontal="false"
                  disabled
                />
              </b-col>
              <b-col lg="6">
                <Select
                  label="Remark"
                  placeholder="Select Remark"
                  v-model="modal.form.inletLoading.remarkId"
                  :useHorizontal="false"
                  :options="options.pressureGaugeFunction"
                  :multiple="false"
                />
              </b-col>
            </b-row>
          </b-tab>
        </b-tabs>
      </b-card>
    </b-modal>
  </fragment>
</template>

<script>
import { required, minValue, maxValue } from "vuelidate/lib/validators";
import { getPressureGaugeFunction, setOption } from "@/core/utils";

export default {
  props: {
    currentProgress: Object,
    details: Array
  },
  data: () => ({
    options: {
      pressureGaugeFunction: []
    },
    modal: {
      show: false,
      mode: "add",
      title: "Detail",
      okTitle: "Save",
      form: {
        id: null,
        detailId: null,
        equipmentId: null,
        nomorUji: null,
        pumpPressure: {
          master: null,
          eqpt: null,
          remark: null,
          remarkId: null
        },
        airReference: {
          master: null,
          eqpt: null,
          remark: null,
          remarkId: null
        },
        venturi: {
          master: null,
          eqpt: null,
          remark: null,
          remarkId: null
        },
        inletLoading: {
          master: null,
          eqpt: null,
          remark: null,
          remarkId: null
        },
        notes: null
      }
    }
  }),
  validations: {
    modal: {
      form: {
        nomorUji: { required, minValue: minValue(1), maxValue: maxValue(3) }
      }
    }
  },
  computed: {
    pumpPressureDifferent() {
      const self = this;
      return (
        self.modal.form.pumpPressure.eqpt - self.modal.form.pumpPressure.master
      );
    },
    airReferenceDifferent() {
      const self = this;
      return (
        self.modal.form.airReference.eqpt - self.modal.form.airReference.master
      );
    },
    venturiDifferent() {
      const self = this;
      return self.modal.form.venturi.eqpt - self.modal.form.venturi.master;
    },
    inletLoadingDifferent() {
      const self = this;
      return (
        self.modal.form.inletLoading.eqpt - self.modal.form.inletLoading.master
      );
    }
  },
  created() {
    const self = this;

    getPressureGaugeFunction().then(response => {
      self.options.pressureGaugeFunction = response;
    });
  },
  methods: {
    setOption,
    setMaster(params) {
      if (params == null || params.master == null) return "-";
      return params.master;
    },
    setEqpt(params) {
      if (params == null || params.eqpt == null) return "-";
      return params.eqpt;
    },
    setDifferent(params) {
      if (params == null || params.different == null) return "-";
      return params.different;
    },
    handleOpenForm(detail) {
      const self = this;

      if (!self.currentProgress.locked) {
        self.$v.modal.form.$reset();
        self.modal.show = true;
        self.modal.mode = "add";
        self.modal.title = `Equipment ${detail.equipment.label}`;
        self.modal.okTitle = "Save";
        self.modal.form.id = null;
        self.modal.form.detailId = detail.id;
        self.modal.form.equipmentId = detail.equipment.id;
        self.modal.form.nomorUji = null;
        self.modal.form.pumpPressure = {
          master: null,
          eqpt: null,
          remark: null,
          remarkId: null
        };
        self.modal.form.airReference = {
          master: null,
          eqpt: null,
          remark: null,
          remarkId: null
        };
        self.modal.form.venturi = {
          master: null,
          eqpt: null,
          remark: null,
          remarkId: null
        };
        self.modal.form.inletLoading = {
          master: null,
          eqpt: null,
          remark: null,
          remarkId: null
        };
        self.modal.form.notes = null;
      }
    },
    onRowSelected(detail, item) {
      const self = this;

      if (!self.currentProgress.locked) {
        self.$v.modal.form.$reset();
        self.modal.show = true;
        self.modal.mode = "edit";
        self.modal.title = `Equipment ${detail.equipment.label}`;
        self.modal.okTitle = "Update";
        self.modal.form.id = item.id;
        self.modal.form.detailId = detail.id;
        self.modal.form.equipmentId = detail.equipment.id;
        self.modal.form.nomorUji = item.nomorUji;

        self.modal.form.pumpPressure = {
          master: item.pumpPressure?.master,
          eqpt: item.pumpPressure?.eqpt,
          remark: item.pumpPressure?.remark,
          remarkId: item.pumpPressure?.remark?.id
        };
        self.modal.form.airReference = {
          master: item.airReference?.master,
          eqpt: item.airReference?.eqpt,
          remark: item.airReference?.remark,
          remarkId: item.airReference?.remark?.id
        };
        (self.modal.form.venturi = {
          master: item.venturi?.master,
          eqpt: item.airReference?.eqpt,
          remark: item.airReference?.remark,
          remarkId: item.airReference?.remark?.id
        }),
          (self.modal.form.inletLoading = {
            master: item.airReference?.master,
            eqpt: item.airReference?.eqpt,
            remark: item.airReference?.remark,
            remarkId: item.airReference?.remark?.id
          }),
          (self.modal.form.notes = item.notes);
      }
    },
    handleSubmit(event) {
      event.preventDefault();

      const self = this;

      self.$v.modal.form.$touch();
      if (self.$v.modal.form.$pending || self.$v.modal.form.$error) return;

      let _confirmText = "",
        _okText = "",
        _action = "",
        _url = "";

      if (self.modal.mode == "add") {
        _confirmText = "You are about to save this record. Are you sure ?";
        _okText = "Yes, Save";
        _action = "apis/post";
        _url = "/board/standard-form/206/record";
      } else {
        _confirmText = "You are about to update this record. Are you sure ?";
        _okText = "Yes, Update";
        _action = "apis/put";
        _url = `/board/standard-form/206/record/${self.modal.form.id}`;
      }

      self.$dialog
        .confirm(_confirmText, {
          okText: _okText,
          cancelText: "Cancel",
          loader: true
        })
        .then(dialog => {
          let payload = {
            standardForm206Id: self.$route.params.id,
            standardForm206DetailId: self.modal.form.detailId,
            nomorUji: self.modal.form.nomorUji,
            pumpPressure: self.modal.form.pumpPressure,
            airReference: self.modal.form.airReference,
            venturi: self.modal.form.venturi,
            inletLoading: self.modal.form.inletLoading,
            notes: self.modal.form.notes
          };

          self.$store
            .dispatch(_action, {
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
                self.$message.success({
                  zIndex: 10000,
                  message: response.message
                });
                self.modal.show = false;

                self.$emit("onUpdate");
              }
            })
            .finally(() => dialog.close());
        });
    },
    handleRemove(event) {
      event.preventDefault();

      const self = this;

      self.$dialog
        .confirm("You are about to remove this record. Are you sure ?", {
          okText: "Yes, Remove",
          cancelText: "Cancel",
          loader: true
        })
        .then(dialog => {
          self.$store
            .dispatch("apis/remove", {
              url: `/board/standard-form/206/record/${self.modal.form.id}`
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
                self.modal.show = false;

                self.$emit("onUpdate");
              }
            })
            .finally(() => dialog.close());
        });
    }
  }
};
</script>
