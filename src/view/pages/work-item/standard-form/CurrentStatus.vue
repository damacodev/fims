<template>
  <div>
    <div v-if="[3, 4].includes(currentStatus.status.id)" class="watermark">
      <p
        class="text-center"
        :class="currentStatus.status.id == 3 ? 'success' : 'danger'"
      >
        {{ currentStatus.status.label }}
      </p>
    </div>
    <PlainText label="Status" :value="currentStatus.status.label" />
    <PlainText label="Remarks" :value="currentStatus.remarks" />
    <PlainText label="Updated By" :value="currentStatus.createdBy.label" />
    <PlainText
      label="Updated At"
      :value="dateTimeFormat(currentStatus.createdAt)"
    />
  </div>
</template>

<script>
import { dateTimeFormat } from "@/core/utils";

export default {
  props: {
    currentStatus: Object
  },
  methods: {
    dateTimeFormat
  }
};
</script>
