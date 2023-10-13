<template>
  <form-group
    :validator="v"
    :label="label"
    :description="description"
    :use-label="useLabel"
    :use-horizontal="useHorizontal"
  >
    <treeselect
      :ref="label"
      slot-scope="{ attrs }"
      v-bind="attrs"
      v-model="model"
      :disable-branch-nodes="disableBranchNodes"
      :options="options"
      :multiple="multiple"
      :disabled="disabled"
      :normalizer="normalizer"
      :async="async"
      :load-options="loadOptions"
      :default-expand-level="1"
      :placeholder="placeholder"
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
    disableBranchNodes: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    placeholder: String,
    v: Object,
    value: [Array, String, Number, Boolean],
    options: Array,
    multiple: {
      type: Boolean,
      default: true
    },
    normalizer: {
      type: Function
    },
    async: {
      type: Boolean,
      default: false
    },
    loadOptions: Function
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
