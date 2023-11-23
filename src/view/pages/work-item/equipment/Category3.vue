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
          label="Code"
          :value="requestInfo.request.code"
          :oldValue="
            $route.params.action == 'update'
              ? requestInfo.request.oldData.code || '-'
              : null
          "
        />
        <PlainText
          label="Equipment Modul PM"
          :value="requestInfo.request.detail.modulPm"
          :oldValue="
            $route.params.action == 'update'
              ? requestInfo.request.oldData.detail.modulPm || '-'
              : null
          "
        />
        <hr />
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
          label="Type of Filter"
          :value="requestInfo.request.detail.typeOfFilter"
          :oldValue="
            $route.params.action == 'update'
              ? requestInfo.request.oldData.detail.typeOfFilter || '-'
              : null
          "
        />
        <PlainText
          label="Brand"
          :value="requestInfo.request.detail.brand"
          :oldValue="
            $route.params.action == 'update'
              ? requestInfo.request.oldData.detail.brand || '-'
              : null
          "
        />
        <PlainText
          label="Model Number"
          :value="requestInfo.request.detail.modelNumber"
          :oldValue="
            $route.params.action == 'update'
              ? requestInfo.request.oldData.detail.modelNumber || '-'
              : null
          "
        />
        <PlainText
          label="Serial Number"
          :value="requestInfo.request.detail.serialNumber"
          :oldValue="
            $route.params.action == 'update'
              ? requestInfo.request.oldData.detail.serialNumber || '-'
              : null
          "
        />
        <PlainText
          label="Vessel Capacity (GPM/LPM)"
          :value="requestInfo.request.detail.vesselCapacity"
          :oldValue="
            $route.params.action == 'update'
              ? requestInfo.request.oldData.detail.vesselCapacity || '-'
              : null
          "
        />
        <PlainText
          label="Year of Manufacture"
          :value="requestInfo.request.detail.yearOfManufacture"
          :oldValue="
            $route.params.action == 'update'
              ? requestInfo.request.oldData.detail.yearOfManufacture || '-'
              : null
          "
        />
        <hr />
        <h6>1st Stage</h6>
        <PlainText
          label="Original Element Filter"
          :value="requestInfo.request.detail.firstStageOriginalElementFilter"
          :oldValue="
            $route.params.action == 'update'
              ? requestInfo.request.oldData.detail
                  .firstStageOriginalElementFilter || '-'
              : null
          "
        />
        <PlainText
          label="Number of Element Filter"
          :value="
            requestInfo.request.detail.firstStageNumberOfOriginalElementFilter
          "
          :oldValue="
            $route.params.action == 'update'
              ? requestInfo.request.oldData.detail
                  .firstStageNumberOfOriginalElementFilter || '-'
              : null
          "
        />
        <hr />
        <h6>2nd Stage</h6>
        <PlainText
          label="Original Element Filter"
          :value="requestInfo.request.detail.secondStageOriginalElementFilter"
          :oldValue="
            $route.params.action == 'update'
              ? requestInfo.request.oldData.detail
                  .secondStageOriginalElementFilter || '-'
              : null
          "
        />
        <PlainText
          label="Number of Element Filter"
          :value="
            requestInfo.request.detail.secondStageNumberOfOriginalElementFilter
          "
          :oldValue="
            $route.params.action == 'update'
              ? requestInfo.request.oldData.detail
                  .secondStageNumberOfOriginalElementFilter || '-'
              : null
          "
        />
        <hr />
        <PlainText
          label="Condition"
          :value="requestInfo.request.detail.condition"
          :oldValue="
            $route.params.action == 'update'
              ? requestInfo.request.oldData.detail.condition || '-'
              : null
          "
        />
        <PlainText
          label="Remarks"
          :value="requestInfo.request.detail.remarks"
          :oldValue="
            $route.params.action == 'update'
              ? requestInfo.request.oldData.detail.remarks || '-'
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
