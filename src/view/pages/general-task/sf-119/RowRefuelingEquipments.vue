<template>
  <fragment>
    <RowHeader
      :head="true"
      no="V"
      label="Refueling Equipments"
      @onShowHide="show = !show"
    />
    <fragment v-if="show">
      <RowBeforeRefueling
        :form="form"
        :options="options"
        :validations="validations.before"
        :buttonVisibility="buttonVisibility"
      />
      <RowDuringRefueling
        :form="form"
        :options="options"
        :validations="validations.during"
        :buttonVisibility="buttonVisibility"
      />
    </fragment>
  </fragment>
</template>

<script>
import RowHeader from "./RowHeader.vue";
import RowBeforeRefueling from "./RowBeforeRefueling.vue";
import RowDuringRefueling from "./RowDuringRefueling.vue";

export default {
  components: {
    RowHeader,
    RowBeforeRefueling,
    RowDuringRefueling
  },
  props: {
    form: Object,
    options: Object,
    validations: Object,
    show: {
      type: Boolean,
      default: true
    },
    buttonVisibility: Boolean
  }
};
</script>
