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
      :class="cssClass"
    />
  </form-group>
</template>

<style lang="sass">
.vue-treeselect--open-below .vue-treeselect__menu
  margin-top: -8px !important

.vue-treeselect--open-above .vue-treeselect__menu
  margin-bottom: -8px !important

.vue-treeselect__control
  border-radius: 0.83rem !important
  height: 38.4px !important

.vue-treeselect__large .vue-treeselect__control
  height: 44px !important

.vue-treeselect__large .vue-treeselect__placeholder,
.vue-treeselect__large .vue-treeselect__single-value
  padding-top: 4px !important
</style>

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
    loadOptions: Function,
    cssClass: {
      type: String,
      default: "vue-treeselect__large"
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
