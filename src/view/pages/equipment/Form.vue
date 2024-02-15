<template>
  <fragment>
    <FormWizard
      v-if="
        $route.params.category == 1 ||
          $route.params.category == 3 ||
          $route.params.category == 4 ||
          $route.params.category == 5 ||
          $route.params.category == 6 ||
          $route.params.category == 7
      "
    />
    <FormBridger v-else-if="$route.params.category == 8" />
    <FormDeadlegDrain v-else-if="$route.params.category == 9" />
    <FormFireHose v-else-if="$route.params.category == 10" />
    <FormFireExtinguisher v-else-if="$route.params.category == 11" />
  </fragment>
</template>

<script>
import FormWizard from "./FormWizard";
import FormBridger from "./FormBridger";
import FormDeadlegDrain from "./FormDeadlegDrain";
import FormFireHose from "./FormFireHose";
import FormFireExtinguisher from "./FormFireExtinguisher";

export default {
  components: {
    FormWizard,
    FormBridger,
    FormDeadlegDrain,
    FormFireHose,
    FormFireExtinguisher
  }
};
</script>
