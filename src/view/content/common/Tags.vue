<template>
  <form-group
    :validator="v"
    :label="label"
    :description="description"
    :use-label="useLabel"
    :use-horizontal="useHorizontal"
    :messages="messages"
  >
    <b-form-tags
      slot-scope="{ attrs }"
      v-bind="attrs"
      v-model="model"
      :placeholder="placeholder"
      remove-on-delete
      separator=",;"
      tag-variant="success"
      :size="size"
    />
  </form-group>
</template>

<style>
.b-form-tag > button.b-form-tag-remove {
  color: inherit !important;
  font-size: 125% !important;
  line-height: 1 !important;
  float: none !important;
  margin-left: 0.25rem !important;
}
.badge {
  font-weight: normal !important;
  text-transform: unset !important;
  margin-right: 5px;
  margin-bottom: 5px;
}
</style>

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
    v: Object,
    value: Array,
    messages: {
      type: Object,
      default: () => {}
    }
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
