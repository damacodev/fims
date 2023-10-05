<template>
  <div class="navi navi-spacer-x-0 p-0">
    <div class="navi-item">
      <div class="navi-link">
        <div class="symbol symbol-40 bg-light mr-3">
          <div class="symbol-label">
            <span :class="`svg-icon svg-icon-md svg-icon-${type}`">
              <inline-svg :src="require(`@/assets/media/svg/icons/${icon}`)" />
            </span>
          </div>
        </div>
        <div class="navi-text">
          <div class="text-muted">{{ detail.text }}</div>
          <div class="font-weight-bold">{{ detail.value }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    type: String,
    icon: String,
    detail: Object
  }
};
</script>
