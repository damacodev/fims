<template>
  <div class="d-flex justify-content-between border-top pt-10">
    <div class="mr-2">
      <b-button
        variant="light-primary"
        class="font-weight-bold text-uppercase px-9 py-4"
        data-wizard-type="action-prev"
      >
        Previous
      </b-button>
      <slot />
    </div>
    <div>
      <b-button
        variant="primary"
        class="font-weight-bold text-uppercase px-9 py-4 ml-2"
        @click="submit"
        data-wizard-type="action-submit"
      >
        Submit
      </b-button>
      <b-button
        variant="success"
        class="font-weight-bold text-uppercase px-9 py-4"
        data-wizard-type="action-next"
      >
        Next Step
      </b-button>
      <b-button
        variant="secondary"
        class="font-weight-bold text-uppercase px-9 py-4 ml-2"
        :to="discard"
      >
        Cancel
      </b-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    submit: Function,
    discard: Object
  }
};
</script>
