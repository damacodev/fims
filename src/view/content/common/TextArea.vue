<template>
  <form-group
    :validator="v"
    :label="label"
    :description="description"
    :use-label="useLabel"
    :use-horizontal="useHorizontal"
  >
    <b-form-textarea
      :rows="rows"
      slot-scope="{ attrs }"
      v-bind="attrs"
      v-model="model"
      :placeholder="placeholder"
      :maxlength="maxlength"
      class="form-control-solid"
    />
  </form-group>
</template>

<script>
export default {
  props: {
    label: String,
    description: String,
    rows: {
      type: Number,
      default: 3
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
    v: Object,
    value: String,
    maxlength: Number
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
