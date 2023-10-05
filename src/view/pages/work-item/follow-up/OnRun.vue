<template>
  <div>
    <div v-if="watermark" class="watermark">
      <p class="dark text-center">On Run</p>
    </div>
    <h5 class="font-weight-bolder text-dark">Activity</h5>
    <span v-html="followUp.remarks"></span>
    <div class="separator separator-dashed mt-8 mb-5"></div>
    <PlainText label="Start Date" :value="dateTimeFormat(followUp.startDate)" />
    <PlainText
      label="Finish Date"
      :value="dateTimeFormat(followUp.finishDate)"
    />
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
