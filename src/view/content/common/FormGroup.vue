<template>
  <b-form-group
    v-if="useHorizontal"
    :label-cols-lg="labelCols"
    :label-cols-xl="labelColsXl"
    :content-cols-lg="contentCols"
    :content-cols-xl="contentColsXl"
    :label="useLabel ? label : ''"
    :description="description"
    :invalid-feedback="firstErrorMessage"
    :state="isValid"
    :label-align="labelAlign"
    :label-class="labelClass"
    :class="cssClass"
  >
    <slot
      :attrs="{ state: isValid }"
      :listeners="{ input: () => preferredValidator.$touch() }"
    />
  </b-form-group>
  <b-form-group
    v-else
    :label="useLabel ? label : ''"
    :description="description"
    :invalid-feedback="firstErrorMessage"
    :state="isValid"
    :label-class="labelClass"
    :class="cssClass"
  >
    <slot
      :attrs="{ state: isValid }"
      :listeners="{ input: () => preferredValidator.$touch() }"
    />
  </b-form-group>
</template>
<script>
import { singleErrorExtractorMixin } from "vuelidate-error-extractor";

export default {
  name: "FormElement",
  extends: singleErrorExtractorMixin,
  props: {
    useLabel: {
      type: Boolean,
      default: true
    },
    useHorizontal: {
      type: Boolean,
      default: true
    },
    labelAlign: {
      type: String,
      default: "right"
    },
    labelClass: {
      type: String,
      default: "pr-5"
    },
    labelCols: {
      type: String,
      default: "4"
    },
    contentCols: {
      type: String,
      default: "8"
    },
    labelColsXl: {
      type: String,
      default: "4"
    },
    contentColsXl: {
      type: String,
      default: "5"
    },
    description: String,
    cssClass: String
  }
};
</script>
