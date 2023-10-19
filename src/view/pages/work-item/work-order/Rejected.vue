<template>
  <div>
    <div v-if="watermark" class="watermark">
      <p class="danger text-center">Rejected</p>
    </div>
    <PlainText label="Reason" :value="currentStatus.remarks" />
    <PlainText label="Submitted By" :value="currentStatus.createdBy.label" />
    <PlainText
      label="Submitted At"
      :value="dateTimeFormat(currentStatus.createdAt)"
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
    currentStatus: Object
  },
  methods: {
    dateTimeFormat
  }
};
</script>
