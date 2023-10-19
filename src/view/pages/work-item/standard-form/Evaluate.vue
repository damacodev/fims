<template>
  <CardForm :title="title" :subTitle="subTitle">
    <template #form>
      <div class="card-body">
        <CurrentStatus :currentStatus="currentStatus" />
      </div>
    </template>
  </CardForm>
</template>

<script>
import CurrentStatus from "./CurrentStatus";

export default {
  components: {
    CurrentStatus
  },
  props: {
    title: String,
    subTitle: String,
    currentStatus: Object
  }
};
</script>
