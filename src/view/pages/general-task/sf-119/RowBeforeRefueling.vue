<template>
  <fragment>
    <RowHeader :head="true" label="Before Refueling" />
    <RowHeader no="1" label="Underwing Hoses Condition" />
    <RowCommon
      no=""
      label="Rear	Hose & Reel conditions"
      :form="form.refuelingEquipments.before.underwingHosesCondition.rear"
      :options="options.checklistResult"
      :validations="validations.underwingHosesCondition.rear"
      :buttonVisibility="buttonVisibility"
    />
    <RowCommon
      no=""
      label="Front	Hose & Reel conditions"
      :form="form.refuelingEquipments.before.underwingHosesCondition.front"
      :options="options.checklistResult"
      :validations="validations.underwingHosesCondition.front"
      :buttonVisibility="buttonVisibility"
    />
    <RowHeader no="2" label="Platform Hoses Condition" />
    <RowCommon
      no=""
      label="Left"
      :form="form.refuelingEquipments.before.platformHosesCondition.left"
      :options="options.checklistResult"
      :validations="validations.platformHosesCondition.left"
      :buttonVisibility="buttonVisibility"
    />
    <RowCommon
      no=""
      label="Right"
      :form="form.refuelingEquipments.before.platformHosesCondition.right"
      :options="options.checklistResult"
      :validations="validations.platformHosesCondition.right"
      :buttonVisibility="buttonVisibility"
    />
    <RowCommon
      no="3"
      label="Condition of Flowmeter"
      :form="form.refuelingEquipments.before.flowMeterCondition"
      :options="options.checklistResult"
      :validations="validations.flowMeterCondition"
      :buttonVisibility="buttonVisibility"
    >
      <template #value>
        <b-row v-if="buttonVisibility">
          <b-col lg="6">
            <form-group
              label="Sealing"
              class="mb-0"
              :useLabel="false"
              :useHorizontal="false"
              :validator="validations.flowMeterCondition.remarks"
            >
              <b-input
                v-model="
                  form.refuelingEquipments.before.flowMeterCondition.remarks
                "
                type="text"
                placeholder="Sealing"
                v-b-tooltip.html.left
                title="<strong>Sealing</strong>"
              />
            </form-group>
          </b-col>
          <b-col lg="6">
            <form-group
              label="Calibration Expires Date"
              class="mb-0"
              :useLabel="false"
              :useHorizontal="false"
              :validator="validations.flowMeterCondition.calibrationExpiresDate"
            >
              <b-input
                v-model="
                  form.refuelingEquipments.before.flowMeterCondition
                    .calibrationExpiresDate
                "
                type="date"
                v-b-tooltip.html.left
                title="<strong>Calibration Expires Date</strong>"
              />
            </form-group>
          </b-col>
        </b-row>
        <fragment v-else>
          <span v-b-tooltip.html title="<strong>Sealing</strong>"
            >Sealing :
            {{
              form.refuelingEquipments.before.flowMeterCondition.remarks || "-"
            }}</span
          ><br />
          <span
            v-b-tooltip.html
            title="<strong>Calibration Expires Date</strong>"
            >Calibration Expires Date :
            {{
              dateFormat(
                form.refuelingEquipments.before.flowMeterCondition
                  .calibrationExpiresDate,
                "DD MMM YYYY"
              )
            }}</span
          >
        </fragment>
      </template>
    </RowCommon>
    <RowCommon
      no="4"
      label="Deadman Control Condition"
      :form="form.refuelingEquipments.before.deadmanControlCondition"
      :options="options.checklistResult"
      :validations="validations.deadmanControlCondition"
      :buttonVisibility="buttonVisibility"
    />
    <RowCommon
      no="5"
      label="Input Coupler Condition"
      :form="form.refuelingEquipments.before.inputCouplerCondition"
      :options="options.checklistResult"
      :validations="validations.inputCouplerCondition"
      :buttonVisibility="buttonVisibility"
    />
    <RowCommon
      no="6"
      label="Date of Last Filter Change"
      :form="form.refuelingEquipments.before.lastFilterChange"
      :options="options.checklistResult"
      :validations="validations.lastFilterChange"
      :buttonVisibility="buttonVisibility"
    >
      <template #value>
        <form-group
          v-if="buttonVisibility"
          label="Date of Last Filter Change"
          class="mb-0"
          :useLabel="false"
          :useHorizontal="false"
          :validator="validations.lastFilterChange.date"
        >
          <b-input
            v-model="form.refuelingEquipments.before.lastFilterChange.date"
            type="date"
            v-b-tooltip.html.left
            title="<strong>Date of Last Filter Change</strong>"
          />
        </form-group>
        <span
          v-else
          v-b-tooltip.html
          title="<strong>Date of Last Filter Change</strong>"
          >{{
            dateFormat(validations.lastFilterChange.date, "DD MMM YYYY")
          }}</span
        >
      </template>
    </RowCommon>
    <RowCommon
      no="7"
      label="PCV & Regulator"
      :form="form.refuelingEquipments.before.pcvAndRegulator"
      :options="options.checklistResult"
      :validations="validations.pcvAndRegulator"
      :buttonVisibility="buttonVisibility"
    />
    <RowCommon
      no="8"
      label="Nitrogen Pressure Indicator"
      :form="form.refuelingEquipments.before.nitrogenPressureIndicator"
      :options="options.checklistResult"
      :validations="validations.nitrogenPressureIndicator"
      :buttonVisibility="buttonVisibility"
    >
      <template #value>
        <form-group
          v-if="buttonVisibility"
          label="Nitrogen Pressure Indicator"
          class="mb-0"
          :useLabel="false"
          :useHorizontal="false"
          :validator="validations.nitrogenPressureIndicator.value"
        >
          <b-input-group append="PSI (40-70 PSI)">
            <money
              v-model="
                form.refuelingEquipments.before.nitrogenPressureIndicator.value
              "
              v-bind="money"
              class="form-control"
            />
          </b-input-group>
        </form-group>
        <span v-else
          >{{
            numberFormat(
              form.refuelingEquipments.before.nitrogenPressureIndicator.value
            )
          }}
          PSI (40-70 PSI)</span
        >
      </template>
    </RowCommon>
  </fragment>
</template>

<script>
import { Money } from "v-money";
import RowCommon from "./RowCommon.vue";
import RowHeader from "./RowHeader.vue";
import { dateFormat, numberFormat } from "@/core/utils";

export default {
  components: {
    RowCommon,
    RowHeader,
    Money
  },
  props: {
    form: Object,
    options: Object,
    validations: Object,
    buttonVisibility: Boolean
  },
  data: () => ({
    money: {
      decimal: ",",
      thousands: ".",
      precision: 0,
      masked: false /* doesn't work with directive */
    }
  }),
  methods: {
    dateFormat,
    numberFormat
  }
};
</script>
