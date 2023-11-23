<template>
  <fragment>
    <b-row>
      <b-col lg="12">
        <PlainText
          label="Depot Pengisian Pesawat Udara"
          :value="form.dppu.label"
        />
        <PlainText label="Transaction #" :value="form.transactionId" />
        <PlainText
          label="Transaction Date"
          :value="dateFormat(form.transactionDate)"
        />
        <PlainText label="Status">
          <template #value>
            <b-badge
              :variant="
                currentProgress.status == `Approved` ? `success` : `secondary`
              "
              >{{ currentProgress.status }}</b-badge
            >
          </template>
        </PlainText>
        <PlainText label="Requester" :value="form.updatedBy.label" />
        <PlainText label="Updated At" :value="dateTimeFormat(form.updatedAt)" />
        <PlainText
          v-if="currentProgress.status != `Approved`"
          label="Assigned To"
          :value="currentProgress.nextAction.label"
        />
        <div v-if="currentProgress.status == 'Rejected'" class="mt-4">
          <b-alert show variant="danger">
            <h4 class="alert-heading">Rejected</h4>
            <hr />
            <p class="mb-0">
              {{ currentProgress.remarks }}
            </p>
          </b-alert>
        </div>
        <hr class="card-separator-24" />
        <vue-document-editor :content.sync="content" :editable="false" />
      </b-col>
    </b-row>
  </fragment>
</template>

<script>
import VueDocumentEditor from "vue-document-editor";
import {
  dateFormat,
  dateTimeFormat,
  setVolume,
  setKompartemen,
  setMm,
  setTemperature
} from "@/core/utils";

export default {
  components: { VueDocumentEditor },
  props: {
    form: Object,
    currentProgress: Object,
    content: Array
  },
  methods: {
    dateFormat,
    dateTimeFormat,
    setVolume,
    setKompartemen,
    setMm,
    setTemperature
  }
};
</script>
