<template>
  <div class="card card-custom">
    <div class="card-header">
      <div class="card-title align-items-start flex-column">
        <h3 class="card-label font-weight-bolder text-dark">
          <b-button
            v-if="backButton"
            class="btn-icon mr-2"
            size="xs"
            @click="$router.go(-1)"
          >
            <i class="flaticon2-back" />
          </b-button>
          {{ title }}
        </h3>
        <span
          class="text-muted font-weight-bold font-size-sm mt-1"
          v-bind:class="backButton ? `pl-10` : ``"
        >
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
    subTitle: String,
    backButton: {
      type: Boolean,
      default: false
    }
  }
};
</script>
