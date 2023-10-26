<template>
  <b-tab title="After Wash">
    <b-row>
      <b-col lg="6">
        <FormCheck
          title="Product Tank Drain"
          subTitle="After Wash"
          :textButton="
            form.afterWash.productTankDrain.id == null ? `Submit` : `Update`
          "
          :form="form.afterWash.productTankDrain"
          :options="options"
          :buttonVisibility="!currentProgress.locked"
          group="AFTER_WASH"
          check="PRODUCT_TANK_DRAIN"
        />
      </b-col>
      <b-col lg="6">
        <FormCheck
          title="Recovery Tank Drain"
          subTitle="After Wash"
          :textButton="
            form.afterWash.recoveryTankDrain.id == null ? `Submit` : `Update`
          "
          :form="form.afterWash.recoveryTankDrain"
          :options="options"
          :buttonVisibility="!currentProgress.locked"
          group="AFTER_WASH"
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
