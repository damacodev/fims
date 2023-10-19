<template>
  <b-row>
    <b-col lg="12">
      <PlainText
        label="Depot Pengisian Pesawat Udara"
        :value="form.dppu.label"
      />
      <PlainText label="Transaction #" :value="form.transactionId" />
      <PlainText
        label="Transaction Date"
        :value="dateFormat(form.transactionDate)"
      />
      <PlainText label="Remarks" :value="form.remarks" />
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
      <PlainText label="Requester" :value="form.updatedBy.label" />
      <PlainText label="Updated At" :value="dateTimeFormat(form.updateAt)" />
    </b-col>
  </b-row>
</template>

<script>
import { dateFormat, dateTimeFormat } from "@/core/utils";

export default {
  props: {
    form: Object,
    currentProgress: Object
  },
  methods: {
    dateFormat,
    dateTimeFormat
  }
};
</script>
