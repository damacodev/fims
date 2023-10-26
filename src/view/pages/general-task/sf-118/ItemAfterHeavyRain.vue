<template>
  <b-tab title="After Heavy Rain">
    <b-row>
      <b-col lg="6">
        <FormCheck
          title="Product Tank Drain"
          subTitle="After Heavy Rain"
          :textButton="
            form.afterHeavyRain.productTankDrain.id == null
              ? `Submit`
              : `Update`
          "
          :form="form.afterHeavyRain.productTankDrain"
          :options="options"
          :buttonVisibility="!currentProgress.locked"
          group="AFTER_HEAVY_RAIN"
          check="PRODUCT_TANK_DRAIN"
        />
      </b-col>
      <b-col lg="6">
        <FormCheck
          title="Recovery Tank Drain"
          subTitle="After Heavy Rain"
          :textButton="
            form.afterHeavyRain.recoveryTankDrain.id == null
              ? `Submit`
              : `Update`
          "
          :form="form.afterHeavyRain.recoveryTankDrain"
          :options="options"
          :buttonVisibility="!currentProgress.locked"
          group="AFTER_HEAVY_RAIN"
          check="RECOVERY_TANK_DRAIN"
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
