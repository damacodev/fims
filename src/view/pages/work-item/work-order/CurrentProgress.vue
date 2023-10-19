<template>
  <div>
    <CardForm :title="title" :subTitle="subTitle" :class="cssClass">
      <template #form>
        <div class="card-body">
          <Empty v-if="requestInfo.currentStatus.status.id == 0" />
          <OnRun
            v-else-if="requestInfo.currentStatus.status.id == 1"
            :followUp="followUp"
          />
          <Pending
            v-else-if="requestInfo.currentStatus.status.id == 2"
            :followUp="followUp"
          />
          <Accepted
            v-else-if="requestInfo.currentStatus.status.id == 3"
            :followUp="followUp"
            :spareparts="
              requestInfo.request.workOrder.spareparts
                .filter(x => x.type.id == 1)
                .map(x => ({
                  id: x.sparepart.id,
                  code: x.sparepart.code,
                  label: x.sparepart.label,
                  quantity: x.quantity
                }))
            "
          />
          <Rejected
            v-else-if="requestInfo.currentStatus.status.id == 4"
            :currentStatus="requestInfo.currentStatus"
          />
          <Closed
            v-else-if="requestInfo.currentStatus.status.id == 5"
            :followUp="followUp"
            :spareparts="
              requestInfo.request.workOrder.spareparts
                .filter(x => x.type.id == 1)
                .map(x => ({
                  id: x.sparepart.id,
                  code: x.sparepart.code,
                  label: x.sparepart.label,
                  quantity: x.quantity
                }))
            "
          />
        </div>
      </template>
    </CardForm>
  </div>
</template>

<script>
import Accepted from "./Accepted.vue";
import Closed from "./Closed.vue";
import Empty from "./Empty.vue";
import OnRun from "./OnRun.vue";
import Pending from "./Pending.vue";
import Rejected from "./Rejected.vue";

export default {
  components: {
    Accepted,
    Closed,
    Empty,
    OnRun,
    Pending,
    Rejected
  },
  props: {
    cssClass: String,
    title: String,
    subTitle: String,
    requestInfo: Object,
    followUp: Object
  }
};
</script>
