<template>
  <div class="d-flex justify-content-between" :class="mb ? 'mb-2' : ''">
    <span class="mr-2">{{ label }}</span>
    <span v-if="oldValue != null && value != oldValue" class="text-right">
      <span class="text-decoration-line-through text-muted">{{
        oldValue
      }}</span>
      <br />
      <span class="text-primary">{{ value }}</span>
    </span>
    <span v-else-if="!hasValue" class="text-right" v-html="(value != null ? value : '-')">
    </span>
    <span v-else class="text-right">
      {{ !hasValue ? (value != null ? value : "-") : "" }}
      <slot name="value" />
    </span>
  </div>
</template>

<script>
export default {
  props: {
    label: String,
    oldValue: {
      type: [String, Number],
      default: null
    },
    value: {
      type: [String, Number],
      default: "-"
    },
    mb: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    hasValue() {
      return !!this.$slots["value"];
    }
  }
};
</script>
