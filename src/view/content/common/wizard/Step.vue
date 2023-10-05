<template>
  <div
    class="pb-5"
    data-wizard-type="step-content"
    :data-wizard-state="isCurrent ? 'current' : ''"
  >
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    isCurrent: {
      type: Boolean,
      default: false
    }
  }
};
</script>
