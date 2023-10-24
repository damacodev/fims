<template>
  <b-form-group
    v-if="useHorizontal"
    label-cols-lg="4"
    label-cols-xl="4"
    content-cols-lg="8"
    content-cols-xl="5"
    :label="useLabel ? label : ''"
    :description="description"
    :invalid-feedback="firstErrorMessage"
    :state="isValid"
    label-align="right"
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
    labelClass: {
      type: String,
      default: "pr-5"
    },
    description: String,
    cssClass: String
  }
};
</script>
