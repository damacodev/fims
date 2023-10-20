<template>
  <CardForm :title="title" :subTitle="subTitle">
    <template #toolbar>
      <router-link
        v-if="currentStatus.status.label == 'Rejected' && currentStatus.assignedTo.id == user.id"
        :to="{
          name: routeName,
          params: {
            id: requestInfo.request.referenceId
          }
        }"
        class="btn btn-primary"
      >
        Open Form
      </router-link>
    </template>
    <template #form>
      <div class="card-body">
        <CurrentStatus :currentStatus="currentStatus" />
      </div>
    </template>
  </CardForm>
</template>

<script>
import { mapGetters } from "vuex";
import CurrentStatus from "./CurrentStatus";

export default {
  components: {
    CurrentStatus
  },
  props: {
    title: String,
    subTitle: String,
    requestInfo: Object,
    currentStatus: Object
  },
  computed: {
    ...mapGetters("auth", ["user"]),
    routeName() {
      return `sf${this.requestInfo.request.standardForm.id}Update`;
    }
  }
};
</script>
