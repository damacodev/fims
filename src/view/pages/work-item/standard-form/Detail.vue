<template>
  <CardForm title="Details" subTitle="Standard Form" :class="cssClass">
    <template #form>
      <div class="card-body">
        <PlainText
          label="Depot Pengisian Pesawat Udara"
          :value="requestInfo.dppu.label"
        />
        <PlainText
          label="Standard Form"
          :value="requestInfo.request.standardForm.label"
        />
        <PlainText label="Activity" :value="requestInfo.title" />
        <PlainText label="Description" :value="requestInfo.description" />
        <PlainText label="Date" :value="dateFormat(requestInfo.createdAt)" />
        <TableEquipment
          label="Equipment"
          :rows="requestInfo.request.equipments"
        />
        <h5 class="font-weight-bolder text-dark">Work References</h5>
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
      </div>
    </template>
  </CardForm>
</template>

<script>
import TableEquipment from "./TableEquipment.vue";
import { dateFormat } from "@/core/utils";

export default {
  components: {
    TableEquipment
  },
  props: {
    cssClass: String,
    requestInfo: Object
  },
  methods: {
    dateFormat
  }
};
</script>
