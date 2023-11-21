<template>
  <form-group
    :validator="v"
    :label="label"
    :description="description"
    :label-class="labelClass"
    :use-label="useLabel"
    :use-horizontal="useHorizontal"
  >
    <b-input-group :append="append">
      <VueNumber
        v-model="model"
        v-bind="money"
        :class="contentClass"
        @blur="handleBlur"
        @input="handleInput"
      />
    </b-input-group>
  </form-group>
</template>

<style lang="sass" scoped>
.input-group-text
  border: unset !important
</style>

<script>
export default {
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
    },
    usePrefix: {
      type: Boolean,
      default: true
    },
    precision: {
      type: Number,
      default: 0
    },
    append: String
  },
  computed: {
    money() {
      const self = this;

      if (self.usePrefix) {
        return {
          decimal: ",",
          separator: ".",
          prefix: "Rp",
          suffix: "",
          precision: self.precision,
          nullValue: "",
          masked: false,
          reverseFill: false
        };
      } else {
        return {
          decimal: ",",
          separator: ".",
          prefix: "",
          suffix: "",
          precision: self.precision,
          nullValue: "",
          masked: false,
          reverseFill: false
        };
      }
    },
    model: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      }
    }
  },
  methods: {
    handleBlur() {
      this.$emit("onBlur");
    },
    handleInput() {
      this.$emit("onInput");
    }
  }
};
</script>
