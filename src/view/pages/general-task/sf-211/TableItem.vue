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
                  <b-th class="text-center align-middle">Location</b-th>
                  <b-th class="text-center align-middle">
                    Test Point Number
                  </b-th>
                  <b-th class="text-center align-middle">Resistance (Ohm)</b-th>
                  <b-th class="text-center align-middle">
                    Weather Condition
                  </b-th>
                  <b-th class="text-center align-middle">Eart Condition</b-th>
                  <b-th class="text-center align-middle">Remark</b-th>
                </b-tr>
              </b-thead>
              <b-tbody>
                <template v-for="(row, index) in detail.checks">
                  <b-tr v-bind:key="index" @click="onRowSelected(detail, row)">
                    <td>{{ detail.equipment.label }}</td>
                    <td>{{ row.testPointNumber }}</td>
                    <td>{{ setOhm(row.resistance) }}</td>
                    <td>{{ row.weatherCondition }}</td>
                    <td>{{ row.eartCondition }}</td>
                    <td>{{ row.remark }}</td>
                  </b-tr>
                </template>
              </b-tbody>
            </b-table-simple>
            <EmptyTable
              v-if="detail.checks.length == 0"
              title="Check & Report of Grounding Tests will be displayed here"
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
    >
      <b-row>
        <b-col lg="6">
          <InputText
            label="Test Point Number"
            type="number"
            v-model="modal.form.testPointNumber"
            :v="$v.modal.form.testPointNumber"
            :useHorizontal="false"
          />
        </b-col>
        <b-col lg="6">
          <InputMoney
            label="Resistance"
            v-model="modal.form.resistance"
            :v="$v.modal.form.resistance"
            :useHorizontal="false"
            :usePrefix="false"
            append="OHM"
          />
        </b-col>
      </b-row>
      <InputText
        label="Weather Condition"
        type="text"
        v-model="modal.form.weatherCondition"
        :useHorizontal="false"
      />
      <InputText
        label="Eart Condition"
        type="text"
        v-model="modal.form.eartCondition"
        :useHorizontal="false"
      />
      <TextArea
        label="Remark"
        v-model="modal.form.remark"
        :useHorizontal="false"
      />
    </b-modal>
  </fragment>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import { setOhm } from "@/core/utils";

export default {
  props: {
    currentProgress: Object,
    details: Array,
  },
  data: () => ({
    modal: {
      show: false,
      mode: "add",
      title: "Detail",
      okTitle: "Save",
      form: {
        id: null,
        detailId: null,
        equipmentId: null,
        testPointNumber: null,
        resistance: 0,
        weatherCondition: null,
        eartCondition: null,
        remark: null,
      },
    },
  }),
  validations: {
    modal: {
      form: {
        testPointNumber: { required },
        resistance: { required },
      },
    },
  },
  methods: {
    setOhm,
    handleOpenForm(detail) {
      const self = this;

      if (!self.currentProgress.locked) {
        self.modal.show = true;
        self.modal.mode = "add";
        self.modal.title = `Location ${detail.equipment.label}`;
        self.modal.okTitle = "Save";
        self.modal.form.id = null;
        self.modal.form.detailId = detail.id;
        self.modal.form.equipmentId = detail.equipment.id;
        self.modal.form.testPointNumber = null;
        self.modal.form.resistance = 0;
        self.modal.form.weatherCondition = null;
        self.modal.form.eartCondition = null;
        self.modal.form.remark = null;
      }
    },
    onRowSelected(detail, item) {
      const self = this;

      if (!self.currentProgress.locked) {
        self.modal.show = true;
        self.modal.mode = "edit";
        self.modal.title = `Location ${detail.equipment.label}`;
        self.modal.okTitle = "Update";
        self.modal.form.id = item.id;
        self.modal.form.detailId = detail.id;
        self.modal.form.equipmentId = detail.equipment.id;
        self.modal.form.testPointNumber = item.testPointNumber;
        self.modal.form.resistance = item.resistance;
        self.modal.form.weatherCondition = item.weatherCondition;
        self.modal.form.eartCondition = item.eartCondition;
        self.modal.form.remark = item.remark;
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
        _url = "/board/standard-form/211/record";
      } else {
        _confirmText = "You are about to update this record. Are you sure ?";
        _okText = "Yes, Update";
        _action = "apis/put";
        _url = `/board/standard-form/211/record/${self.modal.form.id}`;
      }

      self.$dialog
        .confirm(_confirmText, {
          okText: _okText,
          cancelText: "Cancel",
          loader: true,
        })
        .then((dialog) => {
          let payload = {
            standardForm211Id: self.$route.params.id,
            standardForm211DetailId: self.modal.form.detailId,
            testPointNumber: self.modal.form.testPointNumber,
            resistance: self.modal.form.resistance,
            weatherCondition: self.modal.form.weatherCondition,
            eartCondition: self.modal.form.eartCondition,
            remark: self.modal.form.remark,
          };

          self.$store
            .dispatch(_action, {
              url: _url,
              params: payload,
            })
            .then((response) => {
              if (response.error) {
                self.$message.error({
                  zIndex: 10000,
                  message: response.message,
                });
              } else {
                self.$message.success({
                  zIndex: 10000,
                  message: response.message,
                });
                self.modal.show = false;

                self.$emit("onUpdate");

                /* if (self.$route.name == self.route.form) {
                  self.$router.replace({
                    name: "sf211Update",
                    params: {
                      id: response.data.id,
                    },
                  });

                  self.form = {
                    dppu: response.data.dppu,
                    dppuId: response.data.dppu?.id,
                    transactionId: response.data.transactionId,
                    transactionDate: dateFormat(
                      response.data.transactionDate,
                      "YYYY-MM-DD"
                    ),
                    period: response.data.period,
                    remarks: response.data.remarks,
                    details: response.data.details,
                    updatedBy: response.data.updatedBy,
                    updatedAt: response.data.updatedAt,
                  };

                  self.currentProgress = {
                    status: response.data.currentProgress.status,
                    remarks: response.data.currentProgress.remarks,
                    nextAction: {
                      id: response.data.currentProgress.nextAction?.id,
                      label: response.data.currentProgress.nextAction?.label,
                    },
                  };

                  self.table.rows = response.data.details;
                } */
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
          loader: true,
        })
        .then((dialog) => {
          self.$store
            .dispatch("apis/remove", {
              url: `/board/standard-form/211/record/${self.modal.form.id}`,
            })
            .then((response) => {
              if (response.error) {
                self.$message.error({
                  zIndex: 10000,
                  message: response.message,
                });
              } else {
                self.$message.success({
                  zIndex: 10000,
                  message: response.message,
                });
                self.modal.show = false;

                self.$emit("onUpdate");
              }
            })
            .finally(() => dialog.close());
        });
    },
  },
};
</script>
