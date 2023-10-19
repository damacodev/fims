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
        <PlainText label="Transaction">
          <template #value>
            <router-link
              :to="{
                name: routeName,
                params: {
                  id: requestInfo.request.referenceId
                },
                query: {
                  from: 'task'
                }
              }"
              class="btn btn-outline-primary btn-sm"
              target="_blank"
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
      const self = this;

      if (self.requestInfo.request.standardForm.id == "103")
        return "sf103Update";
      if (self.requestInfo.request.standardForm.id == "109")
        return "sf109Update";

      return null;
    }
  },
  methods: {
    dateFormat
  }
};
</script>
