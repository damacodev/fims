<template>
  <b-row>
    <b-col lg="12">
      <PlainText
        label="Depot Pengisian Pesawat Udara"
        :value="form.dppu.label"
      />
      <PlainText label="Transaction #" :value="form.transactionId" />
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
      <PlainText label="Deadleg Drain Identity" :value="form.deadlegDrain.label" />
      <PlainText label="Colour" :value="setOption(form.colour)" />
      <PlainText label="Cleanlines" :value="setOption(form.cleanlines)" />
      <PlainText label="Free Water" :value="setOption(form.freeWater)" />
      <PlainText label="Water Detector" :value="setOption(form.waterDetector)" />
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
    dateFormat, dateTimeFormat, setOption
  }
};
</script>
