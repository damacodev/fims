<template>
  <div
    class="wizard wizard-3"
    :id="id"
    data-wizard-state="step-first"
    data-wizard-clickable="true"
  >
    <WizardNav :labels="labels" />

    <div class="row justify-content-center py-12 px-8 py-lg-15 px-lg-10">
      <div class="col-xl-12">
        <b-form class="form">
          <slot />

          <WizardAction :submit="submit" :discard="discard">
            <slot name="delete-button" />
          </WizardAction>
        </b-form>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import "@/assets/sass/pages/wizard/wizard-3.scss";
</style>

<script>
import KTUtil from "@/assets/js/components/util";
import KTWizard from "@/assets/js/components/wizard";

export default {
  props: {
    id: String,
    labels: Array,
    submit: Function,
    discard: Object,
    validator: Object
  },
  mounted() {
    const self = this;
    const wizard = new KTWizard(self.id, {
      startStep: 1,
      clickableSteps: true
    });

    wizard.on("change", (wizardObj) => {
      if (wizardObj.newStep > wizardObj.currentStep) {
        const step = self.validator[`step${wizardObj.currentStep}`];

        step.$touch();
        if (step.$pending || step.$error) wizardObj.stop();
      }

      setTimeout(() => {
        KTUtil.scrollTop();
      }, 500);
    });
  }
};
</script>
