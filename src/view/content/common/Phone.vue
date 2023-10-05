<template>
  <form-group
    :validator="v"
    :label="label"
    :description="description"
    :label-class="labelClass"
    :use-label="useLabel"
    :use-horizontal="useHorizontal"
  >
    <VuePhoneNumberInput
      slot-scope="{ attrs }"
      v-bind="attrs"
      v-model="model"
      :default-country-code="defaultCountryCode"
      :border-radius="borderRadius"
      valid-color="#1BC5BD"
      error-color="#F64E60"
      :size="size"
      @update="update"
    />
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
    labelClass: {
      type: String,
      default: "pr-5"
    },
    contentClass: {
      type: String,
      default: "form-control-solid"
    },
    defaultCountryCode: {
      type: String,
      default: "ID"
    },
    borderRadius: {
      type: Number,
      default: 10
    },
    v: Object,
    value: String,
    update: Function
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
