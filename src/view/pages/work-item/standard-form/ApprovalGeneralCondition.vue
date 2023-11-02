<template>
  <fragment>
    <Select
      label="General Condition"
      placeholder="Select general condition"
      v-model="form.generalCondition"
      :v="validations.form.generalCondition"
      :options="options.generalCondition"
      :useHorizontal="false"
      :multiple="false"
    />
    <hr />
    <PlainText label="Status" :value="currentStatus.status.label" />
    <PlainText label="Remarks" :value="currentStatus.remarks" />
    <PlainText label="Updated By" :value="currentStatus.createdBy.label" />
    <PlainText
      label="Updated At"
      :value="dateTimeFormat(currentStatus.createdAt)"
    />
  </fragment>
</template>

<script>
import { dateTimeFormat, getGeneralCondition } from "@/core/utils";

export default {
  props: {
    currentStatus: Object,
    validations: Object,
    form: Object
  },
  data: () => ({
    options: {
      generalCondition: []
    }
  }),
  created() {
    getGeneralCondition().then(response => {
      this.options.generalCondition = response;
    });
  },
  methods: {
    dateTimeFormat
  }
};
</script>
