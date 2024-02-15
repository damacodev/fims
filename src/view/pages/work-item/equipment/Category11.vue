<template>
  <CardForm title="Details" subTitle="Equipment Information" class="mt-8">
    <template #form>
      <div class="card-body">
        <PlainText
          label="Region"
          :value="requestInfo.request.region.label"
          :oldValue="
            $route.params.action == 'update'
              ? requestInfo.request.oldData.region.label || '-'
              : null
          "
        />
        <PlainText
          label="DPPU"
          :value="requestInfo.request.dppu.label"
          :oldValue="
            $route.params.action == 'update'
              ? requestInfo.request.oldData.dppu.label || '-'
              : null
          "
        />
        <PlainText
          label="Category"
          :value="requestInfo.request.category.label"
          :oldValue="
            $route.params.action == 'update'
              ? requestInfo.request.oldData.category.label || '-'
              : null
          "
        />
        <PlainText
          label="Equipment Code / Number"
          :value="requestInfo.request.code"
          :oldValue="
            $route.params.action == 'update'
              ? requestInfo.request.oldData.code || '-'
              : null
          "
        />
        <PlainText
          label="Capacity"
          :value="requestInfo.request.detail.capacity"
          :oldValue="
            $route.params.action == 'update'
              ? requestInfo.request.oldData.detail.capacity || '-'
              : null
          "
        />
        <PlainText
          label="Location"
          :value="requestInfo.request.detail.location"
          :oldValue="
            $route.params.action == 'update'
              ? requestInfo.request.oldData.detail.location || '-'
              : null
          "
        />
        <PlainText
          label="Status"
          :value="status.find(x => x.value == requestInfo.request.actived).text"
          :oldValue="
            $route.params.action == 'update'
              ? status.find(x => x.value == requestInfo.request.oldData.actived)
                  .text || '-'
              : null
          "
          :mb="false"
        />
      </div>
    </template>
  </CardForm>
</template>

<script>
import { status } from "@/core/datasource/options";
export default {
  props: {
    requestInfo: Object
  },
  data: () => ({
    status
  })
};
</script>
