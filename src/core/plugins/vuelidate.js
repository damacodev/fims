import Vue from "vue";
import Vuelidate from "vuelidate";
import VuelidateErrorExtractor from "vuelidate-error-extractor";
import customFormGroup from "@/view/content/common/FormGroup.vue";

Vue.use(Vuelidate);
Vue.use(VuelidateErrorExtractor, {
  i18n: false,
  template: customFormGroup,
  messages: {
    required: "{attribute} must not be empty",
    numeric: "{attribute} is not a valid format",
    integer: "{attribute} is not a valid data type",
    decimal: "{attribute} is not a valid data type",
    url: "{attribute} is not a valid URL format",
    email: "{attribute} is not a valid Email address",
    minLength: "{attribute} must have at least {min} letters",
    maxLength: "{attribute} must have at most {max} letters",
    minValue: "Minimum value for {attribute} is {min}",
    maxValue: "Maximum value for {attribute} is {max}",
    isEmailAvailable:
      "{attribute} is not available. Must be at least 10 characters long.",
    sameAsNewPassword: "{attribute} doesn't match with new password",
    notSame: "New {attribute} can't be the same as the old one"
  }
});
