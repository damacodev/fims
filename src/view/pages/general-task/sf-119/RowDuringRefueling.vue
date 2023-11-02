<template>
  <fragment>
    <RowHeader :head="true" label="During Refueling" />
    <RowCommon
      no="1"
      label="Inlet Pessure Indicator"
      :form="form.refuelingEquipments.during.inletPressureIndicator"
      :options="options.checklistResult"
      :validations="validations.inletPressureIndicator"
      :buttonVisibility="buttonVisibility"
    >
      <template #value>
        <form-group
          v-if="buttonVisibility"
          label="Inlet Pressure Indicator"
          class="mb-0"
          :useLabel="false"
          :useHorizontal="false"
          :validator="validations.inletPressureIndicator.value"
        >
          <b-input-group append="Kg/Cm2 or PSI">
            <money
              v-model="
                form.refuelingEquipments.during.inletPressureIndicator.value
              "
              v-bind="money"
              class="form-control"
            />
          </b-input-group>
        </form-group>
        <span v-else class="p-2"
          >{{
            numberFormat(
              form.refuelingEquipments.during.inletPressureIndicator.value
            )
          }}
          Kg/Cm2 or PSI</span
        >
      </template>
    </RowCommon>
    <RowCommon
      no="2"
      label="PCV Monitor Indicator"
      :form="form.refuelingEquipments.during.pcvMonitorIndicator"
      :options="options.checklistResult"
      :validations="validations.pcvMonitorIndicator"
      :buttonVisibility="buttonVisibility"
    >
      <template #value>
        <form-group
          v-if="buttonVisibility"
          label="PCV Monitor Indicator"
          class="mb-0"
          :useLabel="false"
          :useHorizontal="false"
          :validator="validations.pcvMonitorIndicator.value"
        >
          <b-input-group append="Kg/Cm2 or PSI">
            <money
              v-model="
                form.refuelingEquipments.during.pcvMonitorIndicator.value
              "
              v-bind="money"
              class="form-control"
            />
          </b-input-group>
        </form-group>
        <span v-else class="p-2"
          >{{
            numberFormat(
              form.refuelingEquipments.during.pcvMonitorIndicator.value
            )
          }}
          Kg/Cm2 or PSI</span
        >
      </template>
    </RowCommon>
    <RowCommon
      no="3"
      label="PCV Air Reference Indicator"
      :form="form.refuelingEquipments.during.pcvAirReferenceIndicator"
      :options="options.checklistResult"
      :validations="validations.pcvAirReferenceIndicator"
      :buttonVisibility="buttonVisibility"
    >
      <template #value>
        <form-group
          v-if="buttonVisibility"
          label="PCV Air Reference Indicator"
          class="mb-0"
          :useLabel="false"
          :useHorizontal="false"
          :validator="validations.pcvAirReferenceIndicator.value"
        >
          <b-input-group append="Kg/Cm2 or PSI">
            <money
              v-model="
                form.refuelingEquipments.during.pcvAirReferenceIndicator.value
              "
              v-bind="money"
              class="form-control"
            />
          </b-input-group>
        </form-group>
        <span v-else class="p-2"
          >{{
            numberFormat(
              form.refuelingEquipments.during.pcvAirReferenceIndicator.value
            )
          }}
          Kg/Cm2 or PSI</span
        >
      </template>
    </RowCommon>
    <RowCommon
      no="4"
      label="PDG Indicator"
      :form="form.refuelingEquipments.during.pdgIndicator"
      :options="options.checklistResult"
      :validations="validations.pdgIndicator"
      :buttonVisibility="buttonVisibility"
    >
      <template #value>
        <b-row v-if="buttonVisibility">
          <b-col lg="6">
            <form-group
              label="PDG Indicator"
              class="mb-0"
              :useLabel="false"
              :useHorizontal="false"
              :validator="validations.pdgIndicator.value"
            >
              <b-input-group append="PSI">
                <money
                  v-model="form.refuelingEquipments.during.pdgIndicator.value"
                  v-bind="money"
                  class="form-control"
                />
              </b-input-group>
            </form-group>
          </b-col>
          <b-col lg="6">
            <form-group
              label="Flow Rate"
              class="mb-0"
              :useLabel="false"
              :useHorizontal="false"
              :validator="validations.pdgIndicator.flowRate"
            >
              <b-input-group append="LPM">
                <money
                  v-model="
                    form.refuelingEquipments.during.pdgIndicator.flowRate
                  "
                  v-bind="money"
                  class="form-control"
                  v-b-tooltip.html.left
                  title="<strong>Flow Rate</strong>"
                />
              </b-input-group>
            </form-group>
          </b-col>
        </b-row>
        <span v-else class="p-2"
          >{{
            numberFormat(form.refuelingEquipments.during.pdgIndicator.value)
          }}
          PSI, Flow Rate
          {{
            numberFormat(form.refuelingEquipments.during.pdgIndicator.flowRate)
          }}
          LPM</span
        >
      </template>
    </RowCommon>
  </fragment>
</template>

<script>
import { Money } from "v-money";
import RowCommon from "./RowCommon.vue";
import RowHeader from "./RowHeader.vue";
import { numberFormat } from "@/core/utils";

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
    numberFormat
  }
};
</script>
