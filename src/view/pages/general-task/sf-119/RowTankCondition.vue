<template>
  <fragment>
    <RowHeader
      :head="true"
      no="III"
      label="Tank Condition"
      @onShowHide="show = !show"
    />
    <fragment v-if="show">
      <RowCommon
        no="1"
        label="Step Condition"
        :form="form.tankCondition.stepCondition"
        :options="options.checklistResult"
        :validations="validations.stepCondition"
        :buttonVisibility="buttonVisibility"
      />
      <RowCommon
        no="2"
        label="Jet Level Sensor Condition"
        :form="form.tankCondition.jetLevelSensorCondition"
        :options="options.checklistResult"
        :validations="validations.jetLevelSensorCondition"
        :buttonVisibility="buttonVisibility"
      />
      <RowCommon
        no="3"
        label="Pressure Vacum Valve / Free Vent"
        :form="form.tankCondition.pressureVacumValveOrFreeVent"
        :options="options.checklistResult"
        :validations="validations.pressureVacumValveOrFreeVent"
        :buttonVisibility="buttonVisibility"
      />
      <RowCommon
        no="4"
        label="Water Drain Line Tank (roof area water drain)"
        :form="form.tankCondition.waterDrainLineTank"
        :options="options.checklistResult"
        :validations="validations.waterDrainLineTank"
        :buttonVisibility="buttonVisibility"
      />
    </fragment>
  </fragment>
</template>

<script>
import RowCommon from "./RowCommon.vue";
import RowHeader from "./RowHeader.vue";

export default {
  components: {
    RowCommon,
    RowHeader
  },
  props: {
    form: Object,
    options: Object,
    validations: Object,
    show: {
      type: Boolean,
      default: true
    },
    buttonVisibility: Boolean
  }
};
</script>
