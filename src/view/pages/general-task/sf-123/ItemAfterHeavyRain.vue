<template>
  <b-tab title="After Heavy Rain">
    <b-row>
      <b-col lg="6">
        <FormCheck
          title="Recovery Tank"
          subTitle="After Heavy Rain"
          :textButton="
            form.afterHeavyRain.recoveryTank.id == null ? `Submit` : `Update`
          "
          :form="form.afterHeavyRain.recoveryTank"
          :options="options"
          :buttonVisibility="!currentProgress.locked"
          group="AFTER_HEAVY_RAIN"
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
