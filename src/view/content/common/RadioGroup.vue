<template>
  <form-group
    :validator="v"
    :label="label"
    :description="description"
    :use-label="useLabel"
    :use-horizontal="useHorizontal"
  >
    <b-form-radio-group
      button-variant="outline-success"
      buttons
      v-model="model"
      :checked="value"
      :options="options"
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
    v: Object,
    value: [String, Boolean, Number],
    options: Array
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
