<template>
  <b-table-simple responsive="" bordered hover class="text-nowrap">
    <b-thead head-variant="light">
      <b-tr>
        <b-th colspan="4">
          <b-button
            variant="outline-success"
            size="sm"
            class="mr-2"
            @click="handleExpandCollapse"
          >
            {{ textButton }}
          </b-button>
        </b-th>
      </b-tr>
      <b-tr>
        <b-th class="text-center align-middle" width="50">No</b-th>
        <b-th class="text-center align-middle">Checks</b-th>
        <b-th class="text-center align-middle">S/C</b-th>
        <b-th class="text-center align-middle">Remarks</b-th>
      </b-tr>
    </b-thead>
    <b-tbody>
      <RowCommon
        :head="true"
        no="I"
        label="Cleanliness"
        :form="form.cleanliness"
        :options="options.checklistResult"
        :validations="validations.form.cleanliness"
        :buttonVisibility="buttonVisibility"
      />
      <RowTruckConditions
        :form="form"
        :options="options"
        :validations="validations.form.truckConditions"
        :show="show.truckConditions"
        :buttonVisibility="buttonVisibility"
      />
      <RowTankCondition
        :form="form"
        :options="options"
        :validations="validations.form.tankCondition"
        :show="show.tankCondition"
        :buttonVisibility="buttonVisibility"
      />
      <RowSafetyEquipments
        :form="form"
        :options="options"
        :validations="validations.form.safetyEquipments"
        :show="show.safetyEquipments"
        :buttonVisibility="buttonVisibility"
      />
      <RowRefuelingEquipments
        :form="form"
        :options="options"
        :validations="validations.form.refuelingEquipments"
        :show="show.refuelingEquipments"
        :buttonVisibility="buttonVisibility"
      />
      <RowOthers
        :form="form"
        :options="options"
        :validations="validations.form.others"
        :show="show.others"
        :buttonVisibility="buttonVisibility"
      />
    </b-tbody>
  </b-table-simple>
</template>

<script>
import RowCommon from "./RowCommon.vue";
import RowTruckConditions from "./RowTruckConditions.vue";
import RowTankCondition from "./RowTankCondition.vue";
import RowSafetyEquipments from "./RowSafetyEquipments.vue";
import RowRefuelingEquipments from "./RowRefuelingEquipments.vue";
import RowOthers from "./RowOthers.vue";

export default {
  components: {
    RowCommon,
    RowTruckConditions,
    RowTankCondition,
    RowSafetyEquipments,
    RowRefuelingEquipments,
    RowOthers
  },
  props: {
    form: Object,
    options: Object,
    validations: Object,
    buttonVisibility: Boolean
  },
  data: () => ({
    textButton: "Collapse All",
    show: {
      truckConditions: true,
      tankCondition: true,
      safetyEquipments: true,
      refuelingEquipments: true,
      others: true
    }
  }),
  methods: {
    handleExpandCollapse() {
      const self = this;

      if (self.textButton == "Collapse All") {
        self.textButton = "Expand All";
        self.show = {
          truckConditions: false,
          tankCondition: false,
          safetyEquipments: false,
          refuelingEquipments: false,
          others: false
        };
      } else {
        self.textButton = "Collapse All";
        self.show = {
          truckConditions: true,
          tankCondition: true,
          safetyEquipments: true,
          refuelingEquipments: true,
          others: true
        };
      }
    }
  }
};
</script>
