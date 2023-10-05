<template>
  <CardForm
    title="Details"
    subTitle="Breakdown Maintenance Information"
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
          :value="requestInfo.request.category.label"
        />
        <PlainText
          label="Equipment"
          :value="requestInfo.request.equipment.label"
        />
        <PlainText label="Indication" :value="requestInfo.description" />
        <PlainText label="Evidences">
          <template #value>
            <b-button
              v-if="requestInfo.request.evidences.length > 0"
              @click="showEvidences"
              size="sm"
              variant="outline-primary"
            >
              View Evidence
            </b-button>
            <b-button v-else size="sm" disabled>Not uploaded</b-button>
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
    dateTimeFormat,
    showEvidences() {
      const self = this;
      self.$viewerApi({
        images: self.requestInfo.request.evidences.map(
          x => `${self.baseUrl}${x.url}`
        )
      });
    }
  }
};
</script>
