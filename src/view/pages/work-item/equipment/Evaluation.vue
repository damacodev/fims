<template>
  <div>
    <div
      v-if="[3, 4].includes(requestInfo.currentStatus.status.id)"
      class="watermark"
    >
      <p
        class="text-center"
        :class="requestInfo.currentStatus.status.id == 3 ? 'success' : 'danger'"
      >
        {{ requestInfo.currentStatus.status.label }}
      </p>
    </div>
    <PlainText label="Status" :value="requestInfo.currentStatus.status.label" />
    <PlainText label="Remarks" :value="requestInfo.currentStatus.remarks" />
    <PlainText
      label="Updated By"
      :value="requestInfo.currentStatus.createdBy.label"
    />
    <PlainText
      label="Updated At"
      :value="dateTimeFormat(requestInfo.currentStatus.createdAt)"
    />
  </div>
</template>

<script>
import { dateTimeFormat } from "@/core/utils";

export default {
  props: {
    requestInfo: Object
  },
  methods: {
    dateTimeFormat
  }
};
</script>
