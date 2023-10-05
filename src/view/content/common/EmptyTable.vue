<template>
  <div :class="cssClass">
    <span class="message">
      <img
        :src="require('@/assets/media/svg/illustrations/empty.svg')"
        height="200vh"
        class="mb-10"
      />
      <p class="font-weight-bolder">
        {{ title }}<br />
        <small>{{ description }}</small>
      </p>
      <b-button v-if="buttonLabel" variant="primary" :to="href">
        {{ buttonLabel }}
      </b-button>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    description: String,
    href: Object,
    buttonLabel: String,
    cssClass: {
      type: String,
      default: "text-center empty"
    }
  }
};
</script>
