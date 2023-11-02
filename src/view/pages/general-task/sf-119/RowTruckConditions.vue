<template>
  <fragment>
    <RowHeader
      :head="true"
      no="II"
      label="Truck Conditions"
      @onShowHide="show = !show"
    />
    <fragment v-if="show">
      <RowCommon
        no="1"
        label="Fuel"
        :form="form.truckConditions.fuel"
        :options="options.checklistResult"
        :validations="validations.fuel"
        :buttonVisibility="buttonVisibility"
      />
      <RowCommon
        no="2"
        label="Radiator Condition / Water"
        :form="form.truckConditions.radiatorCondition"
        :options="options.checklistResult"
        :validations="validations.radiatorCondition"
        :buttonVisibility="buttonVisibility"
      />
      <RowCommon
        no="3"
        label="Lubricant"
        :form="form.truckConditions.lubricant"
        :options="options.checklistResult"
        :validations="validations.lubricant"
        :buttonVisibility="buttonVisibility"
      />
      <RowCommon
        no="4"
        label="Battery Condition"
        :form="form.truckConditions.batteryCondition"
        :options="options.checklistResult"
        :validations="validations.batteryCondition"
        :buttonVisibility="buttonVisibility"
      />
      <RowCommon
        no="5"
        label="Brake"
        :form="form.truckConditions.brake"
        :options="options.checklistResult"
        :validations="validations.brake"
        :buttonVisibility="buttonVisibility"
      />
      <RowCommon
        no="6"
        label="General Condition of Engine"
        :form="form.truckConditions.generalConditionOfEngine"
        :options="options.checklistResult"
        :validations="validations.generalConditionOfEngine"
        :buttonVisibility="buttonVisibility"
      />
      <RowCommon
        no="7"
        label="Horn"
        :form="form.truckConditions.horn"
        :options="options.checklistResult"
        :validations="validations.horn"
        :buttonVisibility="buttonVisibility"
      />
      <RowCommon
        no="8"
        label="Wiper"
        :form="form.truckConditions.wiper"
        :options="options.checklistResult"
        :validations="validations.wiper"
        :buttonVisibility="buttonVisibility"
      />
      <RowCommon
        no="9"
        label="Head & Tail Lamps Condition"
        :form="form.truckConditions.headAndTailLampsCondition"
        :options="options.checklistResult"
        :validations="validations.headAndTailLampsCondition"
        :buttonVisibility="buttonVisibility"
      />
      <RowCommon
        no="10"
        label="Sign Lamps"
        :form="form.truckConditions.signLamps"
        :options="options.checklistResult"
        :validations="validations.signLamps"
        :buttonVisibility="buttonVisibility"
      />
      <RowCommon
        no="11"
        label="Beacon Light"
        :form="form.truckConditions.beaconLight"
        :options="options.checklistResult"
        :validations="validations.beaconLight"
        :buttonVisibility="buttonVisibility"
      />
      <RowCommon
        no="12"
        label="Fueling Lamps"
        :form="form.truckConditions.fuelingLamps"
        :options="options.checklistResult"
        :validations="validations.fuelingLamps"
        :buttonVisibility="buttonVisibility"
      />
      <RowCommon
        no="13"
        label="PTO / Hydraulic Pump"
        :form="form.truckConditions.ptoOrHydraulicPump"
        :options="options.checklistResult"
        :validations="validations.ptoOrHydraulicPump"
        :buttonVisibility="buttonVisibility"
      />
      <RowCommon
        no="14"
        label="Compressor"
        :form="form.truckConditions.compressor"
        :options="options.checklistResult"
        :validations="validations.compressor"
        :buttonVisibility="buttonVisibility"
      />
      <RowCommon
        no="15"
        label="Mirrors"
        :form="form.truckConditions.mirrors"
        :options="options.checklistResult"
        :validations="validations.mirrors"
        :buttonVisibility="buttonVisibility"
      />
      <RowCommon
        no="16"
        label="Tires"
        :form="form.truckConditions.tires"
        :options="options.checklistResult"
        :validations="validations.tires"
        :buttonVisibility="buttonVisibility"
      />
      <RowCommon
        no="17"
        label="General Condition of Transmission"
        :form="form.truckConditions.generalConditionOfTransmission"
        :options="options.checklistResult"
        :validations="validations.generalConditionOfTransmission"
        :buttonVisibility="buttonVisibility"
      />
      <RowCommon
        no="18"
        label="Hydraulic Ladder / Platform"
        :form="form.truckConditions.hydraulicLadderOrPlatform"
        :options="options.checklistResult"
        :validations="validations.hydraulicLadderOrPlatform"
        :buttonVisibility="buttonVisibility"
      />
      <RowCommon
        no="19"
        label="Rearward Gear Warning"
        :form="form.truckConditions.rearwardGearWarning"
        :options="options.checklistResult"
        :validations="validations.rearwardGearWarning"
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
