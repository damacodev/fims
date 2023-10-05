<template>
  <form-group
    :validator="v"
    :label="label"
    :description="description"
    :use-label="useLabel"
    :use-horizontal="useHorizontal"
  >
    <b-form-timepicker
      slot-scope="{ attrs }"
      v-bind="attrs"
      v-model="model"
      :placeholder="placeholder"
      :size="size"
      now-button
      reset-button
      locale="en"
      class="form-control-solid"
    ></b-form-timepicker>
  </form-group>
</template>

<script>
export default {
  props: {
    label: String,
    description: String,
    useLabel: {
      type: Boolean,
      default: true
    },
    useHorizontal: {
      type: Boolean,
      default: true
    },
    placeholder: String,
    size: {
      type: String,
      default: "lg"
    },
    v: Object,
    value: String,
    step: [String, Number]
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
