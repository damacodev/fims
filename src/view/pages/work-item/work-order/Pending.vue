<template>
  <div>
    <div v-if="watermark" class="watermark">
      <p class="danger text-center">Pending</p>
    </div>
    <PlainText label="Pending Reason" :value="followUp.pendingReason.label" />
    <PlainText label="Remarks" :value="followUp.remarks" />
    <PlainText label="Submitted By" :value="followUp.createdBy.label" />
    <PlainText
      label="Submitted At"
      :value="dateTimeFormat(followUp.createdAt)"
    />
  </div>
</template>

<script>
import { dateTimeFormat } from "@/core/utils";

export default {
  props: {
    watermark: {
      type: Boolean,
      default: true
    },
    followUp: Object
  },
  methods: {
    dateTimeFormat
  }
};
</script>
