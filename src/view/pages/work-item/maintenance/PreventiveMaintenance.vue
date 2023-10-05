<template>
  <CardForm
    title="Details"
    subTitle="Preventive Maintenance Schedule"
    :class="cssClass"
  >
    <template #form>
      <div class="card-body">
        <PlainText
          label="Depot Pengisian Pesawat Udara"
          :value="requestInfo.dppu.label"
        />
        <PlainText
          label="Category"
          :value="requestInfo.request.equipment.category.label"
        />
        <PlainText
          label="Equipment"
          :value="requestInfo.request.equipment.code"
        />
        <PlainText
          label="Activity"
          :value="requestInfo.request.schedule.activity.title"
        />
        <PlainText
          label="Description"
          :value="requestInfo.request.schedule.activity.description"
        />
        <PlainText label="Tata Kerja Individu">
          <template #value>
            <a
              v-for="doc in requestInfo.request.schedule.activity
                .tataKerjaIndividu"
              v-bind:key="doc.id"
              :href="`${baseUrl}${doc.url}`"
              target="_blank"
            >
              {{ doc.originalFileName }}
            </a>
          </template>
        </PlainText>
        <PlainText label="Standard Form">
          <template #value>
            <span
              v-for="doc in requestInfo.request.schedule.activity.standardForm"
              v-bind:key="doc.id"
            >
              <a :href="`${baseUrl}${doc.url}`" target="_blank">
                {{ doc.originalFileName }}
              </a>
              <br />
            </span>
          </template>
        </PlainText>

        <template v-if="workOrder">
          <div class="separator separator-dashed mt-8 mb-5"></div>
          <h5 class="font-weight-bolder text-dark">Work Order Information</h5>
          <h6 class="font-weight-bolder text-dark">Planning</h6>
          <PlainText
            label="Start Date"
            :value="dateTimeFormat(workOrder.startDate)"
          />
          <PlainText
            label="Finish Date"
            :value="dateTimeFormat(workOrder.finishDate)"
          />
          <PlainText label="Notes" :value="workOrder.remarks" />
          <TableSparepart
            label="Spareparts Needed"
            :rows="
              workOrder.spareparts
                .filter(x => x.type.id == 0)
                .map(x => ({
                  id: x.sparepart.id,
                  code: x.sparepart.code,
                  label: x.sparepart.label,
                  quantity: x.quantity
                }))
            "
            :editable="false"
          />
          <PlainText label="Supervisor" :value="workOrder.createdBy.label" />
          <PlainText
            label="Technicians"
            :value="workOrder.assignedTo.map(x => x.label).join(', ')"
          />
          <PlainText
            label="Assigned At"
            :value="dateTimeFormat(workOrder.createdAt)"
          />
        </template>
      </div>
    </template>
  </CardForm>
</template>

<script>
import TableSparepart from "../common/TableSparepart.vue";
import { apiUrl } from "@/core/services/api.url";
import { dateTimeFormat } from "@/core/utils";

export default {
  components: {
    TableSparepart
  },
  props: {
    cssClass: String,
    requestInfo: Object,
    workOrder: Object
  },
  data: () => ({
    baseUrl: process.env.NODE_ENV === "production" ? apiUrl.prod : apiUrl.dev
  }),
  methods: {
    dateTimeFormat
  }
};
</script>
