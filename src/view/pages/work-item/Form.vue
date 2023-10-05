<template>
  <div>
    <Equipment v-if="$route.params.type == 0" />
    <Equipment v-if="$route.params.type == 1" />
    <Equipment v-if="$route.params.type == 2" />
    <Maintenance v-else-if="$route.params.type == 3" />
    <Maintenance v-else-if="$route.params.type == 4" />
    <FollowUp v-else-if="$route.params.type == 5" />
  </div>
</template>

<script>
import Equipment from "./equipment";
import Maintenance from "./maintenance";
import FollowUp from "./follow-up";

export default {
  components: {
    Equipment,
    Maintenance,
    FollowUp
  }
};
</script>
