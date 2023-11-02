<template>
  <fragment>
    <RowHeader
      :head="true"
      no="VI"
      label="Safety Equipments"
      @onShowHide="show = !show"
    />
    <fragment v-if="show">
      <RowCommon
        no="1"
        label="Flame Trap Condition"
        :form="form.safetyEquipments.flameTrapCondition"
        :options="options.checklistResult"
        :validations="validations.flameTrapCondition"
        :buttonVisibility="buttonVisibility"
      />
      <RowCommon
        no="2"
        label="Grounding and/or Bonding Cable Condition"
        :form="form.safetyEquipments.groundingAndOrBondingCableCondition"
        :options="options.checklistResult"
        :validations="validations.groundingAndOrBondingCableCondition"
        :buttonVisibility="buttonVisibility"
      />
      <RowCommon
        no="3"
        label="Interlock System"
        :form="form.safetyEquipments.interlockSystem"
        :options="options.checklistResult"
        :validations="validations.interlockSystem"
        :buttonVisibility="buttonVisibility"
      />
      <RowCommon
        no="4"
        label="Seal Override Interlock System"
        :form="form.safetyEquipments.sealOverrideInterlockSystem"
        :options="options.checklistResult"
        :validations="validations.sealOverrideInterlockSystem"
        :buttonVisibility="buttonVisibility"
      />
      <RowCommon
        no="5"
        label="Seal Override Deadman"
        :form="form.safetyEquipments.sealOverrideDeadman"
        :options="options.checklistResult"
        :validations="validations.sealOverrideDeadman"
        :buttonVisibility="buttonVisibility"
      />
      <RowCommon
        no="6"
        label="Fire Extinguishers"
        :form="form.safetyEquipments.fireExtinguishers"
        :options="options.checklistResult"
        :validations="validations.fireExtinguishers"
        :buttonVisibility="buttonVisibility"
      >
        <template #value>
          <b-row v-if="buttonVisibility">
            <b-col lg="6">
              <form-group
                label="Seal"
                class="mb-0"
                :useLabel="false"
                :useHorizontal="false"
                :validator="validations.fireExtinguishers.seal"
              >
                <b-input
                  v-model="form.safetyEquipments.fireExtinguishers.seal"
                  type="text"
                  class="mb-2"
                  placeholder="Seal"
                  v-b-tooltip.html.left
                  title="<strong>Seal</strong>"
                />
              </form-group>
            </b-col>
            <b-col lg="6">
              <form-group
                label="Number"
                class="mb-0"
                :useLabel="false"
                :useHorizontal="false"
                :validator="validations.fireExtinguishers.number"
              >
                <b-input
                  v-model="form.safetyEquipments.fireExtinguishers.number"
                  type="text"
                  class="mb-2"
                  placeholder="Number"
                  v-b-tooltip.html.left
                  title="<strong>Number</strong>"
                />
              </form-group>
            </b-col>
            <b-col lg="6">
              <form-group
                label="Date of Last Check"
                class="mb-0"
                :useLabel="false"
                :useHorizontal="false"
                :validator="validations.fireExtinguishers.lastChecked"
              >
                <b-input
                  v-model="form.safetyEquipments.fireExtinguishers.lastChecked"
                  type="date"
                  class="mb-2"
                  placeholder="Date of Last Check"
                  v-b-tooltip.html.left
                  title="<strong>Date of Last Check</strong>"
                />
              </form-group>
            </b-col>
            <b-col lg="6">
              <form-group
                label="Pressure Indicator"
                class="mb-0"
                :useLabel="false"
                :useHorizontal="false"
                :validator="validations.fireExtinguishers.pressureIndicator"
              >
                <b-input
                  v-model="
                    form.safetyEquipments.fireExtinguishers.pressureIndicator
                  "
                  type="text"
                  placeholder="Pressure Indicator"
                  v-b-tooltip.html.left
                  title="<strong>Pressure Indicator</strong>"
                />
              </form-group>
            </b-col>
          </b-row>
          <fragment v-else>
            <span v-b-tooltip.html title="<strong>Seal</strong>">{{
              form.safetyEquipments.fireExtinguishers.seal
            }}</span>
            /
            <span v-b-tooltip.html title="<strong>Number</strong>">{{
              form.safetyEquipments.fireExtinguishers.number
            }}</span>
            /
            <span
              v-b-tooltip.html
              title="<strong>Date of Last Check</strong>"
              >{{
                dateFormat(
                  form.safetyEquipments.fireExtinguishers.lastChecked,
                  "DD MMM YYYY"
                )
              }}</span
            ><br />
            <span v-b-tooltip.html title="<strong>Pressure Indicator</strong>"
              >Pressure Indicator :
              {{
                form.safetyEquipments.fireExtinguishers.pressureIndicator
              }}</span
            >
          </fragment>
        </template>
      </RowCommon>
      <RowCommon
        no="7"
        label='"Product"-"No Smoking"-Safety Signs & Decals'
        :form="form.safetyEquipments.safetySigns"
        :options="options.checklistResult"
        :validations="validations.safetySigns"
        :buttonVisibility="buttonVisibility"
      />
      <RowCommon
        no="8"
        label="Safety Cone; 4-Direction Flag; Landyard"
        :form="form.safetyEquipments.safetyCone"
        :options="options.checklistResult"
        :validations="validations.safetyCone"
        :buttonVisibility="buttonVisibility"
      />
    </fragment>
  </fragment>
</template>

<script>
import RowCommon from "./RowCommon.vue";
import RowHeader from "./RowHeader.vue";
import { dateFormat } from "@/core/utils";

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
  },
  methods: {
    dateFormat
  }
};
</script>
