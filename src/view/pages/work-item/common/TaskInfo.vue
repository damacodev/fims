<template>
  <div>
    <CardForm :title="cardTitle" :subTitle="cardSubTitle">
      <template #toolbar>
        <b-button
          variant="outline-primary"
          class="mr-2"
          @click="handleOpenLogs"
        >
          View Logs
        </b-button>
        <b-button variant="secondary" @click="$router.go(-1)"> Back </b-button>
      </template>
      <template #form>
        <div class="card-body">
          <PlainText label="Type" :value="taskType" />
          <PlainText label="Title" :value="taskTitle" />
          <PlainText label="Created By" :value="createdBy" />
          <PlainText label="Created At" :value="dateTimeFormat(createdAt)" />
        </div>
      </template>
    </CardForm>
    <Timeline ref="timeline" :histories="histories" />
  </div>
</template>

<script>
import Timeline from "./Timeline.vue";
import { dateTimeFormat } from "@/core/utils";

export default {
  components: {
    Timeline
  },
  props: {
    cardTitle: String,
    cardSubTitle: String,
    taskType: String,
    taskTitle: String,
    createdBy: String,
    createdAt: String,
    histories: Array
  },
  methods: {
    dateTimeFormat,
    handleOpenLogs() {
      const self = this;
      self.$refs.timeline.showForm();
    }
  }
};
</script>
