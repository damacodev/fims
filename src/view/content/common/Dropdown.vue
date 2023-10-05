<template>
  <form-group
    :validator="v"
    :label="label"
    :description="description"
    :use-label="useLabel"
    :use-horizontal="useHorizontal"
  >
    <b-form-select
      v-model="model"
      :options="options"
      :size="size"
      class="form-control-solid"
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
      default: "lg"
    },
    useLabel: {
      type: Boolean,
      default: true
    },
    useHorizontal: {
      type: Boolean,
      default: true
    },
    placeholder: String,
    v: {
      type: Object,
      default: () => {}
    },
    value: [String, Number],
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
