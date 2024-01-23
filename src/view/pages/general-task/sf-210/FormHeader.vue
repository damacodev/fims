<template>
  <b-row>
    <b-col lg="12">
      <PlainText
        label="Depot Pengisian Pesawat Udara"
        :value="form.dppu.label"
      />
      <PlainText label="Transaction #" :value="form.transactionId" />
      <PlainText label="Date" :value="dateFormat(form.transactionDate)" />
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

      <h5 class="font-weight-bold mt-6 mb-2">Front Bonding Reel</h5>
      <PlainText label="Clip" :value="setOption(form.frontBondingReel.clip)" />
      <PlainText
        label="Wire & Insulation"
        :value="setOption(form.frontBondingReel.wireAndInsulation)"
      />
      <PlainText
        label="Connection & Reel"
        :value="setOption(form.frontBondingReel.connectionAndReel)"
      />
      <PlainText
        label="Resistance"
        :value="setOhm(form.frontBondingReel.resistance)"
      />

      <h5 class="font-weight-bold mt-6 mb-2">Rear Bonding Reel</h5>
      <PlainText label="Clip" :value="setOption(form.rearBondingReel.clip)" />
      <PlainText
        label="Wire & Insulation"
        :value="setOption(form.rearBondingReel.wireAndInsulation)"
      />
      <PlainText
        label="Connection & Reel"
        :value="setOption(form.rearBondingReel.connectionAndReel)"
      />
      <PlainText
        label="Resistance"
        :value="setOhm(form.rearBondingReel.resistance)"
      />

      <h5 class="font-weight-bold mt-6 mb-2">Lanyard</h5>
      <PlainText
        label="Carabiner Hook"
        :value="setOption(form.lanyard.carabinerHook)"
      />
      <PlainText
        label="Wire & Insulation"
        :value="setOption(form.lanyard.wireAndInsulation)"
      />
      <PlainText label="Reel" :value="setOption(form.lanyard.reel)" />
      <PlainText
        label="Electrical Connection"
        :value="form.lanyard.electricalConnection"
      />

      <h5 class="font-weight-bold mt-6 mb-2">Flame Trap</h5>
      <PlainText
        label="Tightness"
        :value="setOption(form.flameTrap.tightness)"
      />
      <PlainText
        label="Cleanliness"
        :value="setOption(form.flameTrap.cleanliness)"
      />

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
import {
  dateFormat,
  dateTimeFormat,
  setOption,
  setOhm,
  setPsi
} from "@/core/utils";

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
    setOhm,
    setPsi
  }
};
</script>
