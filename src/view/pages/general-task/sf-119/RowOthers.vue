<template>
  <fragment>
    <RowHeader :head="true" no="VI" label="Others" @onShowHide="show = !show" />
    <fragment v-if="show">
      <RowCommon
        no="1"
        label="Operating Hours Record"
        :form="form.others.operatingHoursRecord"
        :options="options.checklistResult"
        :validations="validations.operatingHoursRecord"
        :buttonVisibility="buttonVisibility"
      />
      <RowCommon
        no="2"
        label="Rubber Block"
        :form="form.others.rubberBlock"
        :options="options.checklistResult"
        :validations="validations.rubberBlock"
        :buttonVisibility="buttonVisibility"
      />
      <RowCommon
        no="3"
        label="Oil Absorbent / Spill Kit"
        :form="form.others.oilAbsorbent"
        :options="options.checklistResult"
        :validations="validations.oilAbsorbent"
        :buttonVisibility="buttonVisibility"
      />
      <RowCommon
        no="4"
        label="Sight Glass / Visijar Condition"
        :form="form.others.sightGlass"
        :options="options.checklistResult"
        :validations="validations.sightGlass"
        :buttonVisibility="buttonVisibility"
      />
      <RowCommon
        no="5"
        label="Ladder Wellness"
        :form="form.others.ladderWellness"
        :options="options.checklistResult"
        :validations="validations.ladderWellness"
        :buttonVisibility="buttonVisibility"
      />
      <RowCommon
        no="6"
        label="Fuel Leaks"
        :form="form.others.fuelLeaks"
        :options="options.checklistResult"
        :validations="validations.fuelLeaks"
        :buttonVisibility="buttonVisibility"
      />
      <RowCommon
        no="7"
        label="Dust Cap Input Coupler and/or Underwing Coupling"
        :form="form.others.dustCapInputCoupler"
        :options="options.checklistResult"
        :validations="validations.dustCapInputCoupler"
        :buttonVisibility="buttonVisibility"
      />
      <RowCommon
        no="8"
        label="Bucket with Bonding Wire"
        :form="form.others.bucketWithBondingWire"
        :options="options.checklistResult"
        :validations="validations.bucketWithBondingWire"
        :buttonVisibility="buttonVisibility"
      />
      <RowCommon
        no="9"
        label="Filter Sumps and/or Tank Sumps Drain"
        :form="form.others.filterSumpsAndTankSumpsDrain"
        :options="options.checklistResult"
        :validations="validations.filterSumpsAndTankSumpsDrain"
        :buttonVisibility="buttonVisibility"
      >
        <template #value>
          <b-row v-if="buttonVisibility">
            <b-col lg="6">
              <form-group
                label="Filter Sumps"
                class="mb-0"
                :useLabel="false"
                :useHorizontal="false"
                :validator="
                  validations.filterSumpsAndTankSumpsDrain.filterSumps
                "
              >
                <b-input
                  v-model="form.others.filterSumpsAndTankSumpsDrain.filterSumps"
                  type="text"
                  placeholder="Filter Sumps"
                  v-b-tooltip.html.left
                  title="<strong>Filter Sumps</strong>"
                />
              </form-group>
            </b-col>
            <b-col lg="6">
              <form-group
                label="Tank Sumps Drain"
                class="mb-0"
                :useLabel="false"
                :useHorizontal="false"
                :validator="
                  validations.filterSumpsAndTankSumpsDrain.tankSumpsDrain
                "
              >
                <b-input
                  v-model="
                    form.others.filterSumpsAndTankSumpsDrain.tankSumpsDrain
                  "
                  type="text"
                  placeholder="Tank Sumps Drain"
                  v-b-tooltip.html.left
                  title="<strong>Tank Sumps Drain</strong>"
                />
              </form-group>
            </b-col>
          </b-row>
          <span v-else
            >Result :
            {{ form.others.filterSumpsAndTankSumpsDrain.filterSumps }} /
            {{ form.others.filterSumpsAndTankSumpsDrain.tankSumpsDrain }}</span
          >
        </template>
      </RowCommon>
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
