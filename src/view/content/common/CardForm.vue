<template>
  <div class="card card-custom">
    <div class="card-header py-3">
      <div class="card-title align-items-start flex-column">
        <h3 class="card-label font-weight-bolder text-dark">
          {{ title }}
        </h3>
        <span class="text-muted font-weight-bold font-size-sm mt-1">
          {{ subTitle }}
        </span>
      </div>
      <div class="card-toolbar">
        <slot name="toolbar" />
      </div>
    </div>
    <slot name="form" />
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    subTitle: String
  }
};
</script>
