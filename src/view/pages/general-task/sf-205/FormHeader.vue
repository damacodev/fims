<template>
  <b-row>
    <b-col lg="12">
      <PlainText
        label="Depot Pengisian Pesawat Udara"
        :value="form.dppu.label"
      />
      <PlainText label="Transaction #" :value="form.transactionId" />
      <PlainText
        label="Date of Inspection"
        :value="dateFormat(form.transactionDate)"
      />
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
      <h5 class="font-weight-bold mt-6 mb-2">Underwing Coupling</h5>
      <PlainText label="Reel Front" :value="setOption(form.reel.front)" />
      <PlainText label="Reel Rear" :value="setOption(form.reel.rear)" />
      <PlainText label="Deck Left" :value="setOption(form.deck.left)" />
      <PlainText label="Deck Right" :value="setOption(form.deck.right)" />
      <PlainText
        label="Overwing Nozzle"
        :value="setOption(form.overwingNozzle)"
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
import { dateFormat, dateTimeFormat, setOption } from "@/core/utils";

export default {
  props: {
    form: Object,
    currentProgress: Object,
    showRemarks: Boolean
  },
  methods: {
    dateFormat,
    dateTimeFormat,
    setOption
  }
};
</script>
