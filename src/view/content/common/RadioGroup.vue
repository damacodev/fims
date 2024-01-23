<template>
  <form-group
    :validator="v"
    :label="label"
    :description="description"
    :use-label="useLabel"
    :use-horizontal="useHorizontal"
    :class="formClass"
    :label-align="labelAlign"
    :label-cols="labelCols"
    :content-cols="contentCols"
    :label-cols-xl="labelColsXl"
    :content-cols-xl="contentColsXl"
    :css-class="cssClass"
  >
    <b-form-radio-group
      v-if="!stacked"
      button-variant="outline-success"
      buttons
      v-model="model"
      :checked="value"
      :options="options"
      :size="size"
      :textField="textField"
      :valueField="valueField"
      style="z-index: 0"
      @input="handleInput"
    />
    <b-button
      v-else
      v-for="(option, index) in options"
      v-bind:key="index"
      class="mr-2 mb-2"
      :variant="model == option.value ? `success` : `outline-success`"
      @click="handleChange(option.value)"
    >
      {{ option.text }}
    </b-button>
  </form-group>
</template>

<script>
export default {
  props: {
    label: String,
    description: String,
    size: {
      type: String,
      default: "md"
    },
    useLabel: {
      type: Boolean,
      default: true
    },
    useHorizontal: {
      type: Boolean,
      default: true
    },
    stacked: {
      type: Boolean,
      default: false
    },
    v: Object,
    value: [String, Boolean, Number],
    options: Array,
    formClass: String,
    labelAlign: String,
    labelCols: String,
    contentCols: String,
    labelColsXl: String,
    contentColsXl: String,
    cssClass: {
      type: String,
      default: "text-left"
    },
    textField: {
      type: String,
      default: "text"
    },
    valueField: {
      type: String,
      default: "value"
    }
  },
  computed: {
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
    handleInput() {
      this.$emit("onInput");
    },
    handleChange(selected) {
      this.model = selected;
    }
  }
};
</script>
