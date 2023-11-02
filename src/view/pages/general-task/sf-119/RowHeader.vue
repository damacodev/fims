<template>
  <b-tr @click="handleClick" class="cursor-pointer">
    <b-td
      class="align-middle text-center"
      v-bind:class="head ? `font-weight-bolder` : ``"
      >{{ no }}</b-td
    >
    <b-td
      class="align-middle"
      v-bind:class="head ? `font-weight-bolder` : ``"
      colspan="3"
    >
      {{ label }}
    </b-td>
  </b-tr>
</template>

<script>
export default {
  props: {
    head: {
      type: Boolean,
      default: false
    },
    no: String,
    label: String
  },
  methods: {
    handleClick() {
      this.$emit("onShowHide");
    }
  }
};
</script>
