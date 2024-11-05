<template>
  <fragment>
    <b-table-simple responsive="" bordered hover class="text-nowrap">
      <b-thead head-variant="light">
        <b-tr>
          <b-th class="text-center align-middle" rowspan="3">
            Equipment Code
          </b-th>
          <b-th class="text-center align-middle" colspan="5"
            >Grid Strainer & Strainer Inspection</b-th
          >
          <b-th class="text-center align-middle" rowspan="3">Date</b-th>
          <b-th class="text-center align-middle" rowspan="3">Note</b-th>
        </b-tr>
        <b-tr>
          <b-th class="text-center align-middle" colspan="2">Inlet</b-th>
          <b-th class="text-center align-middle" colspan="3">Outlet</b-th>
        </b-tr>
        <b-tr>
          <b-th class="text-center align-middle">Strainer Coupler</b-th>
          <b-th class="text-center align-middle">Grid Before Pump</b-th>
          <b-th class="text-center align-middle">Grid Before Pump</b-th>
          <b-th class="text-center align-middle">Grid Air Eliminator</b-th>
          <b-th class="text-center align-middle">Strainer Coupler</b-th>
        </b-tr>
      </b-thead>
      <b-tbody>
        <template v-for="(row, index) in details">
          <b-tr v-bind:key="index" @click="onRowSelected(row)">
            <td>{{ row.equipment.code }}</td>
            <td
              v-for="(item, indexItem) in [
                row.inlet.strainerCoupler,
                row.inlet.gridBeforePump,
                row.outlet.gridBeforePump,
                row.outlet.gridAirEliminator,
                row.outlet.strainerCoupler
              ]"
              v-bind:key="indexItem"
              class="text-center"
            >
              <span v-if="item != null" v-html="setOption(item)" />
              <span v-else>-</span>
            </td>
            <td class="text-center">{{ dateFormat(row.recordDate) || "-" }}</td>
            <td>{{ row.remarks || "-" }}</td>
          </b-tr>
        </template>
      </b-tbody>
    </b-table-simple>
    <EmptyTable
      v-if="details.length == 0"
      title="Grid Strainer & Strainer Check will be displayed here"
      description="Please add an items first"
    />

    <b-modal
      v-model="modal.show"
      :title="modal.title"
      :ok-title="modal.okTitle"
      ok-only
      @ok="handleSubmit"
      size="lg"
    >
      <b-row>
        <b-col lg="4">
          <InputPlainText
            label="Equipment Code"
            v-model="modal.form.equipment.code"
            :useHorizontal="false"
          />
        </b-col>
        <b-col lg="4">
          <InputText
            label="Record Date"
            type="date"
            v-model="modal.form.recordDate"
            :useHorizontal="false"
          />
        </b-col>
      </b-row>
      <b-row>
        <b-col lg="12">
          <h2 class="font-weight-bold mb-6">Inlet</h2>
        </b-col>
      </b-row>
      <b-row>
        <b-col lg="4">
          <Select
            label="Strainer Coupler"
            placeholder="Select Result"
            v-model="modal.form.inlet.strainerCouplerId"
            :useHorizontal="false"
            :options="options.strainerCheck"
            :multiple="false"
          />
        </b-col>
        <b-col lg="4">
          <Select
            label="Grid Before Pump"
            placeholder="Select Result"
            v-model="modal.form.inlet.gridBeforePumpId"
            :useHorizontal="false"
            :options="options.strainerCheck"
            :multiple="false"
          />
        </b-col>
      </b-row>
      <b-row>
        <b-col lg="12">
          <h2 class="font-weight-bold mb-6">Outlet</h2>
        </b-col>
      </b-row>
      <b-row>
        <b-col lg="4">
          <Select
            label="Grid Before Pump"
            placeholder="Select Result"
            v-model="modal.form.outlet.gridBeforePumpId"
            :useHorizontal="false"
            :options="options.strainerCheck"
            :multiple="false"
          />
        </b-col>
        <b-col lg="4">
          <Select
            label="Grid Air Eliminator"
            placeholder="Select Result"
            v-model="modal.form.outlet.gridAirEliminatorId"
            :useHorizontal="false"
            :options="options.strainerCheck"
            :multiple="false"
          />
        </b-col>
        <b-col lg="4">
          <Select
            label="Strainer Coupler"
            placeholder="Select Result"
            v-model="modal.form.outlet.strainerCouplerId"
            :useHorizontal="false"
            :options="options.strainerCheck"
            :multiple="false"
          />
        </b-col>
      </b-row>
      <b-row>
        <b-col lg="12">
          <TextArea
            label="Note"
            v-model="modal.form.remarks"
            :useHorizontal="false"
          />
        </b-col>
      </b-row>
    </b-modal>
  </fragment>
</template>

<script>
import { getStrainerCheck, setOption, dateFormat } from "@/core/utils";

export default {
  props: {
    currentProgress: Object,
    details: Array
  },
  data: () => ({
    options: {
      strainerCheck: []
    },
    modal: {
      show: false,
      title: "Detail",
      okTitle: "Save",
      form: {
        id: null,
        equipmentId: null,
        equipment: {
          id: null,
          code: null,
          detail: []
        },
        recordDate: null,
        inlet: {
          strainerCouplerId: null,
          strainerCoupler: null,
          gridBeforePumpId: null,
          gridBeforePump: null
        },
        outlet: {
          gridBeforePumpId: null,
          gridBeforePump: null,
          gridAirEliminatorId: null,
          gridAirEliminator: null,
          strainerCouplerId: null,
          strainerCoupler: null
        },
        remarks: null
      }
    }
  }),
  created() {
    const self = this;

    getStrainerCheck().then(response => {
      self.options.strainerCheck = response;
    });
  },
  methods: {
    dateFormat,
    setOption,
    onRowSelected(item) {
      const self = this;

      if (!self.currentProgress.locked) {
        self.modal.show = true;
        self.modal.okTitle = "Update";
        self.modal.form.id = item.id;
        self.modal.form.equipment = item.equipment;
        self.modal.form.recordDate = dateFormat(item.recordDate, "YYYY-MM-DD");

        self.modal.form.inlet.strainerCoupler = item.inlet.strainerCoupler;
        self.modal.form.inlet.strainerCouplerId =
          item.inlet.strainerCoupler?.id;
        self.modal.form.inlet.gridBeforePump = item.inlet.gridBeforePump;
        self.modal.form.inlet.gridBeforePumpId = item.inlet.gridBeforePump?.id;
        self.modal.form.outlet.gridBeforePump = item.outlet.gridBeforePump;
        self.modal.form.outlet.gridBeforePumpId =
          item.outlet.gridBeforePump?.id;
        self.modal.form.outlet.gridAirEliminator =
          item.outlet.gridAirEliminator;
        self.modal.form.outlet.gridAirEliminatorId =
          item.outlet.gridAirEliminator?.id;
        self.modal.form.outlet.strainerCoupler = item.outlet.strainerCoupler;
        self.modal.form.outlet.strainerCouplerId =
          item.outlet.strainerCoupler?.id;

        self.modal.form.remarks = item.remarks;
      }
    },
    handleSubmit(event) {
      event.preventDefault();

      const self = this;

      let loader = self.$loading.show();
      let payload = {
        standardForm218Id: self.$route.params.id,
        recordDate: self.modal.form.recordDate,
        inlet: self.modal.form.inlet,
        outlet: self.modal.form.outlet,
        remarks: self.modal.form.remarks
      };

      self.$store
        .dispatch("apis/put", {
          url: `/board/standard-form/218/record/${self.modal.form.id}`,
          params: payload
        })
        .then(response => {
          if (response.error) {
            self.$message.error({
              zIndex: 10000,
              message: response.message
            });
          } else {
            self.modal.show = false;
            self.$emit("onUpdate");
          }
        })
        .finally(() => loader.hide());
    }
  }
};
</script>
