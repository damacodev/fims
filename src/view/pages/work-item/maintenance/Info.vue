<template>
  <div class="card-body">
    <PlainText label="Work Order No/Task ID">
      <template #value>
        <router-link
          :to="{
            name: 'workItemForm',
            params: {
              type: 5,
              id: workOrder.workItemId
            }
          }"
        >
          {{ `#${workOrder.taskId}` }}
        </router-link>
      </template>
    </PlainText>
    <TableSparepart
      label="Spareparts Needed (Planning)"
      :rows="spareparts"
      :editable="false"
    />
    <PlainText
      label="Start Date"
      :value="dateTimeFormat(workOrder.startDate)"
    />
    <PlainText
      label="Finish Date"
      :value="dateTimeFormat(workOrder.finishDate)"
    />
    <PlainText label="Notes" :value="workOrder.remarks" />
    <PlainText
      label="Assigned To"
      :value="workOrder.assignedTo.map(x => x.label).join(', ')"
    />
  </div>
</template>

<script>
import TableSparepart from "../common/TableSparepart.vue";
import { dateTimeFormat } from "@/core/utils";

export default {
  components: {
    TableSparepart
  },
  props: {
    workOrder: Object,
    spareparts: Array
  },
  methods: {
    dateTimeFormat
  }
};
</script>
