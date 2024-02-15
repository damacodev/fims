<template>
  <fragment>
    <b-table-simple responsive="" bordered hover class="text-nowrap">
      <b-thead head-variant="light">
        <b-tr>
          <b-th class="text-center align-middle" rowspan="2">
            Equipment Code
          </b-th>
          <b-th class="text-center align-middle" rowspan="2">Capacity</b-th>
          <b-th class="text-center align-middle" rowspan="2">Location</b-th>
          <b-th class="text-center align-middle" rowspan="2">
            Vessel Condition
          </b-th>
          <b-th class="text-center align-middle" colspan="5">Conditions</b-th>
          <b-th class="text-center align-middle" rowspan="2">Remarks</b-th>
        </b-tr>
        <b-tr>
          <b-th class="text-center align-middle">Powder</b-th>
          <b-th class="text-center align-middle">Co2</b-th>
          <b-th class="text-center align-middle">Hose & Nozzle</b-th>
          <b-th class="text-center align-middle">Valve</b-th>
          <b-th class="text-center align-middle">Seal</b-th>
        </b-tr>
      </b-thead>
      <b-tbody>
        <template v-for="(row, index) in details">
          <b-tr v-bind:key="index" @click="onRowSelected(row)">
            <td class="text-center">{{ row.equipment.code }}</td>
            <td>{{ row.equipment.detail.capacity }}</td>
            <td>{{ row.equipment.detail.location }}</td>
            <td
              v-for="(item, indexItem) in [
                row.vesselCondition,
                row.powder,
                row.co2,
                row.hoseAndNozzle,
                row.valve,
                row.seal
              ]"
              v-bind:key="indexItem"
              class="text-center"
            >
              <span v-if="item != null" v-html="setOption(item)" />
              <span v-else>-</span>
            </td>
            <td>{{ row.remarks || "-" }}</td>
          </b-tr>
        </template>
      </b-tbody>
    </b-table-simple>
    <EmptyTable
      v-if="details.length == 0"
      title="Fire Hose Box Check List will be displayed here"
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
            label="Equipment Code / Number"
            v-model="modal.form.equipment.code"
            :useHorizontal="false"
          />
        </b-col>
        <b-col lg="4">
          <InputPlainText
            label="Capacity"
            v-model="modal.form.equipment.detail.capacity"
            :useHorizontal="false"
          />
        </b-col>
        <b-col lg="4">
          <InputPlainText
            label="Location"
            v-model="modal.form.equipment.detail.location"
            :useHorizontal="false"
          />
        </b-col>
      </b-row>
      <b-row>
        <b-col lg="4">
          <Select
            label="Vessel Condition"
            placeholder="Select Result"
            v-model="modal.form.vesselConditionId"
            :useHorizontal="false"
            :options="options.fireHose"
            :multiple="false"
          />
        </b-col>
        <b-col lg="4">
          <Select
            label="Powder"
            placeholder="Select Result"
            v-model="modal.form.powderId"
            :useHorizontal="false"
            :options="options.fireHose"
            :multiple="false"
          />
        </b-col>
        <b-col lg="4">
          <Select
            label="Co2"
            placeholder="Select Result"
            v-model="modal.form.co2Id"
            :useHorizontal="false"
            :options="options.fireHose"
            :multiple="false"
          />
        </b-col>
        <b-col lg="4">
          <Select
            label="Hose & Nozzle"
            placeholder="Select Result"
            v-model="modal.form.hoseAndNozzleId"
            :useHorizontal="false"
            :options="options.fireHose"
            :multiple="false"
          />
        </b-col>
        <b-col lg="4">
          <Select
            label="Valve"
            placeholder="Select Result"
            v-model="modal.form.valveId"
            :useHorizontal="false"
            :options="options.fireHose"
            :multiple="false"
          />
        </b-col>
        <b-col lg="4">
          <Select
            label="Seal"
            placeholder="Select Result"
            v-model="modal.form.sealId"
            :useHorizontal="false"
            :options="options.fireHose"
            :multiple="false"
          />
        </b-col>
      </b-row>
      <b-row>
        <b-col lg="12">
          <TextArea
            label="Remarks"
            v-model="modal.form.remarks"
            :useHorizontal="false"
          />
        </b-col>
      </b-row>
    </b-modal>
  </fragment>
</template>

<script>
import { getFireHose, setOption } from "@/core/utils";

export default {
  props: {
    currentProgress: Object,
    details: Array
  },
  data: () => ({
    options: {
      fireHose: []
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
        vesselConditionId: null,
        vesselCondition: null,
        powderId: null,
        powder: null,
        co2Id: null,
        co2: null,
        hoseAndNozzleId: null,
        hoseAndNozzle: null,
        valveId: null,
        valve: null,
        sealId: null,
        seal: null,
        remarks: null
      }
    }
  }),
  created() {
    const self = this;

    getFireHose().then(response => {
      self.options.fireHose = response;
    });
  },
  methods: {
    setOption,
    onRowSelected(item) {
      const self = this;

      if (!self.currentProgress.locked) {
        self.modal.show = true;
        self.modal.okTitle = "Update";
        self.modal.form.id = item.id;
        self.modal.form.equipment = item.equipment;

        self.modal.form.vesselCondition = item.vesselCondition;
        self.modal.form.vesselConditionId = item.vesselCondition?.id;
        self.modal.form.powder = item.powder;
        self.modal.form.powderId = item.powder?.id;
        self.modal.form.co2 = item.co2;
        self.modal.form.co2Id = item.co2?.id;
        self.modal.form.hoseAndNozzle = item.hoseAndNozzle;
        self.modal.form.hoseAndNozzleId = item.hoseAndNozzle?.id;
        self.modal.form.valve = item.valve;
        self.modal.form.valveId = item.valve?.id;
        self.modal.form.seal = item.seal;
        self.modal.form.sealId = item.seal?.id;

        self.modal.form.remarks = item.remarks;
      }
    },
    handleSubmit(event) {
      event.preventDefault();

      const self = this;

      self.$dialog
        .confirm("You are about to update this record. Are you sure ?", {
          okText: "Yes, Update",
          cancelText: "Cancel",
          loader: true
        })
        .then(dialog => {
          let payload = {
            standardForm215Id: self.$route.params.id,
            vesselConditionId: self.modal.form.vesselConditionId,
            powderId: self.modal.form.powderId,
            co2Id: self.modal.form.co2Id,
            hoseAndNozzleId: self.modal.form.hoseAndNozzleId,
            valveId: self.modal.form.valveId,
            sealId: self.modal.form.sealId,
            remarks: self.modal.form.remarks
          };

          self.$store
            .dispatch("apis/put", {
              url: `/board/standard-form/215/record/${self.modal.form.id}`,
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
    }
  }
};
</script>
