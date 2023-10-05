<template>
  <CardForm title="Details" subTitle="Equipment Information" class="mt-8">
    <template #form>
      <div class="card-body">
        <PlainText
          label="Region"
          :value="requestInfo.request.region.label"
          :oldValue="
            $route.params.type == 1
              ? requestInfo.request.oldData.region.label || '-'
              : null
          "
        />
        <PlainText
          label="DPPU"
          :value="requestInfo.request.dppu.label"
          :oldValue="
            $route.params.type == 1
              ? requestInfo.request.oldData.dppu.label || '-'
              : null
          "
        />
        <PlainText
          label="Category"
          :value="requestInfo.request.category.label"
          :oldValue="
            $route.params.type == 1
              ? requestInfo.request.oldData.category.label || '-'
              : null
          "
        />
        <PlainText
          label="Code"
          :value="requestInfo.request.code"
          :oldValue="
            $route.params.type == 1
              ? requestInfo.request.oldData.code || '-'
              : null
          "
        />
        <PlainText
          label="Equipment Modul PM"
          :value="requestInfo.request.detail.modulPm"
          :oldValue="
            $route.params.type == 1
              ? requestInfo.request.oldData.detail.modulPm || '-'
              : null
          "
        />
        <hr />
        <PlainText
          label="Product"
          :value="requestInfo.request.detail.product"
          :oldValue="
            $route.params.type == 1
              ? requestInfo.request.oldData.detail.product || '-'
              : null
          "
        />
        <PlainText
          label="Pos Location"
          :value="requestInfo.request.detail.posLocation"
          :oldValue="
            $route.params.type == 1
              ? requestInfo.request.oldData.detail.posLocation || '-'
              : null
          "
        />
        <hr />
        <h6>Pump</h6>
        <PlainText
          label="Serial Number"
          :value="requestInfo.request.detail.pumpSerialNumber"
          :oldValue="
            $route.params.type == 1
              ? requestInfo.request.oldData.detail.pumpSerialNumber || '-'
              : null
          "
        />
        <PlainText
          label="Brand"
          :value="requestInfo.request.detail.pumpBrand"
          :oldValue="
            $route.params.type == 1
              ? requestInfo.request.oldData.detail.pumpBrand || '-'
              : null
          "
        />
        <PlainText
          label="Type"
          :value="requestInfo.request.detail.pumpType"
          :oldValue="
            $route.params.type == 1
              ? requestInfo.request.oldData.detail.pumpType || '-'
              : null
          "
        />
        <PlainText
          label="Capacity"
          :value="requestInfo.request.detail.pumpCapacity"
          :oldValue="
            $route.params.type == 1
              ? requestInfo.request.oldData.detail.pumpCapacity || '-'
              : null
          "
        />
        <PlainText
          label="Total Head"
          :value="requestInfo.request.detail.pumpTotalHead"
          :oldValue="
            $route.params.type == 1
              ? requestInfo.request.oldData.detail.pumpTotalHead || '-'
              : null
          "
        />
        <hr />
        <h6>Motor</h6>
        <PlainText
          label="Type"
          :value="requestInfo.request.detail.motorType"
          :oldValue="
            $route.params.type == 1
              ? requestInfo.request.oldData.detail.motorType || '-'
              : null
          "
        />
        <PlainText
          label="Brand"
          :value="requestInfo.request.detail.motorBrand"
          :oldValue="
            $route.params.type == 1
              ? requestInfo.request.oldData.detail.motorBrand || '-'
              : null
          "
        />
        <PlainText
          label="Serial Number"
          :value="requestInfo.request.detail.motorSerialNumber"
          :oldValue="
            $route.params.type == 1
              ? requestInfo.request.oldData.detail.motorSerialNumber || '-'
              : null
          "
        />
        <hr />
        <PlainText
          label="Condition"
          :value="requestInfo.request.detail.condition"
          :oldValue="
            $route.params.type == 1
              ? requestInfo.request.oldData.detail.condition || '-'
              : null
          "
        />
        <PlainText
          label="Remarks"
          :value="requestInfo.request.detail.remarks"
          :oldValue="
            $route.params.type == 1
              ? requestInfo.request.oldData.detail.remarks || '-'
              : null
          "
        />
        <PlainText
          label="Status"
          :value="status.find(x => x.value == requestInfo.request.actived).text"
          :oldValue="
            $route.params.type == 1
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
