<template>
  <div>
    <div v-if="watermark" class="watermark">
      <p class="dark text-center">Closed</p>
    </div>
    <h5 class="font-weight-bolder text-dark">Activity</h5>
    <span v-html="followUp.remarks"></span>
    <div class="separator separator-dashed mt-8 mb-5"></div>
    <PlainText label="Start Date" :value="dateTimeFormat(followUp.startDate)" />
    <PlainText
      label="Finish Date"
      :value="dateTimeFormat(followUp.finishDate)"
    />
    <PlainText label="Evidences">
      <template #value>
        <b-button
          v-if="followUp.evidences.length > 0"
          @click="showEvidences(followUp.evidences)"
          size="sm"
          variant="outline-primary"
        >
          View Evidence
        </b-button>
        <b-button v-else size="sm" disabled>Not uploaded</b-button>
      </template>
    </PlainText>
    <TableSparepart
      label="Spareparts Needed"
      :rows="spareparts"
      :editable="false"
    />
    <PlainText label="Submitted By" :value="followUp.createdBy.label" />
    <PlainText
      label="Submitted At"
      :value="dateTimeFormat(followUp.createdAt)"
    />
  </div>
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
    watermark: {
      type: Boolean,
      default: true
    },
    followUp: Object,
    spareparts: Array
  },
  data: () => ({
    baseUrl: process.env.NODE_ENV === "production" ? apiUrl.prod : apiUrl.dev
  }),
  methods: {
    dateTimeFormat,
    showEvidences(evidences) {
      const self = this;
      self.$viewerApi({
        images: evidences.map(x => `${self.baseUrl}${x.url}`)
      });
    }
  }
};
</script>
