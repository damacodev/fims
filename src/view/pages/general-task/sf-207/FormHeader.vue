<template>
  <b-row>
    <b-col lg="12">
      <PlainText
        label="Depot Pengisian Pesawat Udara"
        :value="form.dppu.label"
      />
      <PlainText label="Transaction #" :value="form.transactionId" />
      <PlainText label="Test Date" :value="dateFormat(form.transactionDate)" />
      <PlainText label="Status">
        <template #value>
          <b-badge
            :variant="
              currentProgress.status == `Approved` ? `success` : `secondary`
            "
            >{{ currentProgress.status }}</b-badge
          >
        </template>
      </PlainText>
      <PlainText label="Equipment" :value="form.equipment.label" />
      <h5 class="font-weight-bold mt-6 mb-2">PDG Piston Movement</h5>
      <PlainText
        label="Zero Condition (Visually)"
        :value="setOption(form.pdgPistonMovement.zeroCondition)"
      />
      <PlainText
        label="Free Movement of Piston"
        :value="setOption(form.pdgPistonMovement.freeMovementOfPiston)"
      />
      <h5 class="font-weight-bold mt-6 mb-2">dP Switch Activation</h5>
      <PlainText label="Warning" :value="form.dpSwitchActivation.warning" />
      <PlainText
        label="Fuel Stop @ 15 psi"
        :value="setPsi(form.dpSwitchActivation.fuelStop)"
      />
      <h5 class="font-weight-bold mt-6 mb-2">EWS Loop / Function Test</h5>
      <PlainText label="F1" :value="setOption(form.ewsLoop.f1)" />
      <PlainText label="F2" :value="setOption(form.ewsLoop.f2)" />
      <PlainText label="F3" :value="setOption(form.ewsLoop.f3)" />
      <PlainText label="Remarks" :value="form.remarks" />
      <PlainText label="Requester" :value="form.updatedBy.label" />
      <PlainText label="Updated At" :value="dateTimeFormat(form.updatedAt)" />
      <PlainText
        v-if="currentProgress.status != `Approved`"
        label="Assigned To"
        :value="currentProgress.nextAction.label"
      />
      <div
        v-if="currentProgress.status == 'Rejected' && showRemarks"
        class="mt-4"
      >
        <b-alert show variant="danger">
          <h4 class="alert-heading">Rejected</h4>
          <hr />
          <p class="mb-0">
            {{ currentProgress.remarks }}
          </p>
        </b-alert>
      </div>
    </b-col>
  </b-row>
</template>

<script>
import { dateFormat, dateTimeFormat, setOption, setPsi } from "@/core/utils";

export default {
  props: {
    form: Object,
    currentProgress: Object,
    showRemarks: Boolean
  },
  methods: {
    dateFormat,
    dateTimeFormat,
    setOption,
    setPsi
  }
};
</script>
