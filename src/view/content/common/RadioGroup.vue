<template>
  <form-group
    :validator="v"
    :label="label"
    :description="description"
    :use-label="useLabel"
    :use-horizontal="useHorizontal"
    :class="formClass"
    :label-align="labelAlign"
    :label-cols="labelCols"
    :content-cols="contentCols"
    css-class="text-right"
  >
    <b-form-radio-group
      button-variant="outline-success"
      buttons
      v-model="model"
      :checked="value"
      :options="options"
      :stacked="stacked"
      :size="size"
      style="z-index: 0;"
    />
  </form-group>
</template>

<script>
export default {
  props: {
    label: String,
    description: String,
    size: {
      type: String,
      default: "md"
    },
    useLabel: {
      type: Boolean,
      default: true
    },
    useHorizontal: {
      type: Boolean,
      default: true
    },
    stacked: {
      type: Boolean,
      default: false
    },
    v: Object,
    value: [String, Boolean, Number],
    options: Array,
    formClass: String,
    labelAlign: String,
    labelCols: String,
    contentCols: String
  },
  computed: {
    model: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      }
    }
  }
};
</script>
