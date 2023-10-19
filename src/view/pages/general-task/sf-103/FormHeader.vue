<template>
  <b-row>
    <b-col lg="12">
      <PlainText
        label="Depot Pengisian Pesawat Udara"
        :value="form.dppu.label"
      />
      <PlainText label="Transaction #" :value="form.transactionId" />
      <PlainText label="Transaction Date" :value="form.transactionDate" />
      <PlainText label="Shift" :value="form.shift.label" />
      <PlainText label="Grade" :value="form.grade" />
    </b-col>
  </b-row>
</template>

<script>
export default {
  props: {
    form: Object
  }
};
</script>
