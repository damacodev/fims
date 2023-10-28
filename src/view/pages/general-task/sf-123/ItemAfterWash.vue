<template>
  <b-tab title="After Wash">
    <b-row>
      <b-col lg="6">
        <FormCheck
          title="Recovery Tank"
          subTitle="After Wash"
          :textButton="
            form.afterWash.recoveryTank.id == null ? `Submit` : `Update`
          "
          :form="form.afterWash.recoveryTank"
          :options="options"
          :buttonVisibility="!currentProgress.locked"
          group="AFTER_WASH"
          check="RECOVERY_TANK"
        />
      </b-col>
    </b-row>
  </b-tab>
</template>

<script>
import FormCheck from "./FormCheck.vue";

export default {
  components: {
    FormCheck
  },
  props: {
    form: Object,
    options: Object,
    currentProgress: Object
  }
};
</script>
