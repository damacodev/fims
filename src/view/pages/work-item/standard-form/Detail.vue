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
        <PlainText label="Description" :value="requestInfo.description" />
        <PlainText
          v-if="
            requestInfo.request != null && requestInfo.request.equipment != null
          "
          label="Equipment"
          :value="requestInfo.request.equipment.label"
        />
        <PlainText label="Transaction">
          <template #value>
            <router-link
              :to="{
                name: routeName,
                params: {
                  id: requestInfo.request.referenceId
                }
              }"
              class="btn btn-outline-primary btn-sm"
            >
              View Transaction
            </router-link>
          </template>
        </PlainText>
      </div>
    </template>
  </CardForm>
</template>

<script>
import { dateFormat } from "@/core/utils";

export default {
  props: {
    cssClass: String,
    requestInfo: Object
  },
  computed: {
    routeName() {
      return `sf${this.requestInfo.request.standardForm.id}Update`;
    }
  },
  methods: {
    dateFormat
  }
};
</script>
