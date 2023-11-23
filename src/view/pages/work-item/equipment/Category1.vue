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
          label="Type"
          :value="requestInfo.request.detail.type"
          :oldValue="
            $route.params.action == 'update'
              ? requestInfo.request.oldData.detail.type || '-'
              : null
          "
        />
        <PlainText
          label="Size, Dimensions"
          :value="requestInfo.request.detail.dimensions"
          :oldValue="
            $route.params.action == 'update'
              ? requestInfo.request.oldData.detail.dimensions || '-'
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
          label="Manufacturer"
          :value="requestInfo.request.detail.manufacturer"
          :oldValue="
            $route.params.action == 'update'
              ? requestInfo.request.oldData.detail.manufacturer || '-'
              : null
          "
        />
        <PlainText
          label="Type of ATG"
          :value="requestInfo.request.detail.typeOfAtg"
          :oldValue="
            $route.params.action == 'update'
              ? requestInfo.request.oldData.detail.typeOfAtg || '-'
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
          label="Model"
          :value="requestInfo.request.detail.model"
          :oldValue="
            $route.params.action == 'update'
              ? requestInfo.request.oldData.detail.model || '-'
              : null
          "
        />
        <PlainText
          label="Automation Integrated"
          :value="
            yesNo.find(
              x => x.value == requestInfo.request.detail.automationIntegrated
            ).text
          "
          :oldValue="
            $route.params.action == 'update'
              ? yesNo.find(
                  x =>
                    x.value ==
                    requestInfo.request.oldData.detail.automationIntegrated
                ).text || '-'
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
import { yesNo, status } from "@/core/datasource/options";
export default {
  props: {
    requestInfo: Object
  },
  data: () => ({
    yesNo,
    status
  })
};
</script>
