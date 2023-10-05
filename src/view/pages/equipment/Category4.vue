<template>
  <div>
    <WizardStep>
      <Select
        label="Pipeline"
        v-model="step2.pipeline"
        :options="yesNo"
        :multiple="false"
        :normalizer="normalizer"
      />
      <Select
        label="Hydrant System"
        v-model="step2.hydrantSystem"
        :options="yesNo"
        :multiple="false"
        :normalizer="normalizer"
      />
      <Select
        label="Pipeline Pressure Test"
        v-model="step2.pipelinePressureTest"
        :options="yesNo"
        :multiple="false"
        :normalizer="normalizer"
      />
      <Select
        label="Valve Visual Inspection"
        v-model="step2.valveVisualInspection"
        :options="yesNo"
        :multiple="false"
        :normalizer="normalizer"
      />
      <Select
        label="Pemakaian dan Flush Hydrant"
        v-model="step2.pemakaianFlushHydrant"
        :options="yesNo"
        :multiple="false"
        :normalizer="normalizer"
      />
      <Select
        label="Hydrant Pit Valve Check"
        v-model="step2.hydrantPitValveCheck"
        :options="yesNo"
        :multiple="false"
        :normalizer="normalizer"
      />
      <Select
        label="Surge Absorber Test"
        v-model="step2.surgeAbsorberTest"
        :options="yesNo"
        :multiple="false"
        :normalizer="normalizer"
      />
      <Select
        label="Cathodic Protection Test"
        v-model="step2.cathodicProtectionTest"
        :options="yesNo"
        :multiple="false"
        :normalizer="normalizer"
      />
      <Select
        label="Hydrant Valve Chamber Check"
        v-model="step2.hydrantValveChamberCheck"
        :options="yesNo"
        :multiple="false"
        :normalizer="normalizer"
      />
      <Select
        label="Static Test"
        v-model="step2.staticTest"
        :options="yesNo"
        :multiple="false"
        :normalizer="normalizer"
      />
    </WizardStep>

    <WizardStep>
      <InputText
        label="Condition"
        v-model="step3.condition"
        :v="validator.step3.condition"
      />
      <InputText label="Remarks" v-model="step3.remarks" />
      <RadioGroup
        v-if="$route.name != route.form"
        v-model="step3.actived"
        label="Status"
        :options="status"
      />
    </WizardStep>
  </div>
</template>

<script>
import { yesNo, status } from "@/core/datasource/options";

export default {
  props: {
    step2: Object,
    step3: Object,
    route: Object,
    validator: Object
  },
  data: () => ({
    yesNo,
    status,
    normalizer(node) {
      return {
        id: node.value,
        label: node.text
      };
    }
  })
};
</script>
