<template>
  <form-group
    :validator="v"
    :label="label"
    :description="description"
    :label-class="labelClass"
    :use-label="useLabel"
    :use-horizontal="useHorizontal"
  >
    <b-input-group :append="append">
      <b-form-input
        slot-scope="{ attrs }"
        v-bind="attrs"
        v-model="model"
        :placeholder="placeholder"
        :type="type"
        :size="size"
        :step="step"
        autocomplete="off"
        :class="contentClass"
        :maxlength="maxlength"
        :min="min"
        :max="max"
      />
    </b-input-group>
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
    type: {
      type: String,
      default: "text"
    },
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
    v: Object,
    value: [String, Number],
    step: [String, Number],
    maxlength: Number,
    min: [Number, Date, String],
    max: [Number, Date, String],
    append: String
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
