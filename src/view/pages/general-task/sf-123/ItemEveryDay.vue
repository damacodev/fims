<template>
  <b-tab title="Every Day" active>
    <b-row>
      <b-col lg="6">
        <FormCheck
          title="Recover Tank"
          subTitle="Every Day"
          :textButton="
            form.everyDay.recoveryTank.id == null ? `Submit` : `Update`
          "
          :form="form.everyDay.recoveryTank"
          :options="options"
          :buttonVisibility="!currentProgress.locked"
          group="EVERY_DAY"
          check="RECOVERY_TANK"
          class="mb-7"
        />
      </b-col>
      <b-col lg="6">
        <FormCheck
          title="Pipe System"
          subTitle="Every Day"
          :textButton="
            form.everyDay.pipeSystem.id == null ? `Submit` : `Update`
          "
          :form="form.everyDay.pipeSystem"
          :options="options"
          :buttonVisibility="!currentProgress.locked"
          group="EVERY_DAY"
          check="PIPE_SYSTEM"
        />
      </b-col>
      <b-col lg="6">
        <FormCheck
          title="Before Filter"
          subTitle="Every Day"
          :textButton="
            form.everyDay.beforeFilter.id == null ? `Submit` : `Update`
          "
          :form="form.everyDay.beforeFilter"
          :options="options"
          :buttonVisibility="!currentProgress.locked"
          group="EVERY_DAY"
          check="BEFORE_FILTER"
          class="mb-7"
        />
      </b-col>
      <b-col lg="6">
        <FormCheck
          title="After Filter"
          subTitle="Every Day"
          :textButton="
            form.everyDay.afterFilter.id == null ? `Submit` : `Update`
          "
          :form="form.everyDay.afterFilter"
          :options="options"
          :buttonVisibility="!currentProgress.locked"
          group="EVERY_DAY"
          check="AFTER_FILTER"
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
