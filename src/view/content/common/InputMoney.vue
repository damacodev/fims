<template>
  <form-group
    :validator="v"
    :label="label"
    :description="description"
    :label-class="labelClass"
    :use-label="useLabel"
    :use-horizontal="useHorizontal"
  >
    <money v-model="model" v-bind="money" :class="contentClass"></money>
  </form-group>
</template>

<script>
import { Money } from "v-money";

export default {
  components: {
    Money
  },
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
    contentClass: {
      type: String,
      default: "form-control form-control-lg form-control-solid"
    },
    v: Object,
    value: {
      type: [String, Number],
      required: false
    }
  },
  data: () => ({
    money: {
      decimal: ",",
      thousands: ".",
      prefix: "Rp ",
      precision: 0,
      masked: false /* doesn't work with directive */
    }
  }),
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
