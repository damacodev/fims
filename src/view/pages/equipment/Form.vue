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
    <FormBridger v-if="$route.params.category == 8" />
    <FormDeadlegDrain v-if="$route.params.category == 9" />
  </fragment>
</template>

<script>
import FormWizard from "./FormWizard";
import FormBridger from "./FormBridger";
import FormDeadlegDrain from "./FormDeadlegDrain";

export default {
  components: {
    FormWizard,
    FormBridger,
    FormDeadlegDrain
  }
};
</script>
