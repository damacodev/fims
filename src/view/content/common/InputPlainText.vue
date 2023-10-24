<template>
  <form-group
    :label="label"
    :description="description"
    :label-class="labelClass"
    :use-label="useLabel"
    :use-horizontal="useHorizontal"
    :css-class="cssClass"
  >
    <div class="mt-2">
      <span class="font-size-h4 font-weight-bolder text-dark">
        {{ model }}
      </span>
    </div>
  </form-group>
</template>

<style lang="sass" scoped>
.input-group-text
  border: unset !important
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
    labelClass: {
      type: String,
      default: "pr-5"
    },
    value: [String, Number],
    cssClass: String
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
