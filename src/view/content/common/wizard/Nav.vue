<template>
  <div class="wizard-nav border-bottom mb-1 mb-lg-5">
    <div class="wizard-steps px-8 py-8 px-lg-15 py-lg-3">
      <div
        v-for="(label, index) in labels"
        v-bind:key="index"
        class="wizard-step"
        data-wizard-type="step"
        :data-wizard-state="index == 0 ? 'current' : null"
      >
        <div class="wizard-label">
          <h3 class="wizard-title">
            <span>{{ index + 1 }}</span> {{ label }}
          </h3>
          <div class="wizard-bar"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    labels: Array
  }
};
</script>
