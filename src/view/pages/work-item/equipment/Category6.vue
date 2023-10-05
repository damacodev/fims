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
          label="Type of Equipment"
          :value="requestInfo.request.detail.type"
          :oldValue="
            $route.params.type == 1
              ? requestInfo.request.oldData.detail.type || '-'
              : null
          "
        />
        <hr />
        <h6>Trucktive</h6>
        <PlainText
          label="Brand"
          :value="requestInfo.request.detail.trucktiveBrand"
          :oldValue="
            $route.params.type == 1
              ? requestInfo.request.oldData.detail.trucktiveBrand || '-'
              : null
          "
        />
        <PlainText
          label="Type"
          :value="requestInfo.request.detail.trucktiveType"
          :oldValue="
            $route.params.type == 1
              ? requestInfo.request.oldData.detail.trucktiveType || '-'
              : null
          "
        />
        <hr />
        <h6>Tank Information</h6>
        <PlainText
          label="Manufacturer"
          :value="requestInfo.request.detail.refuellingModulManufacturer"
          :oldValue="
            $route.params.type == 1
              ? requestInfo.request.oldData.detail
                  .refuellingModulManufacturer || '-'
              : null
          "
        />
        <PlainText
          label="Tank Capacity"
          :value="`${requestInfo.request.detail.capacity} KL`"
          :oldValue="
            $route.params.type == 1
              ? `${requestInfo.request.oldData.detail.capacity} KL` || '-'
              : null
          "
        />
        <PlainText
          label="Flowrate"
          :value="`${requestInfo.request.detail.flowrate} LPM`"
          :oldValue="
            $route.params.type == 1
              ? `${requestInfo.request.oldData.detail.flowrate} LPM` || '-'
              : null
          "
        />
        <PlainText
          label="Year of Manufacture"
          :value="requestInfo.request.detail.yearOfManufacture"
          :oldValue="
            $route.params.type == 1
              ? requestInfo.request.oldData.detail.yearOfManufacture || '-'
              : null
          "
        />
        <PlainText
          label="Overfill Protection Available"
          :value="
            yesNo.find(
              x =>
                x.value ==
                requestInfo.request.detail.overfillProtectionAvailable
            ).text
          "
          :oldValue="
            $route.params.type == 1
              ? yesNo.find(
                  x =>
                    x.value ==
                    requestInfo.request.oldData.detail
                      .overfillProtectionAvailable
                ).text || '-'
              : null
          "
        />
        <PlainText
          label="Platform Available"
          :value="
            yesNo.find(
              x => x.value == requestInfo.request.detail.platformAvailable
            ).text
          "
          :oldValue="
            $route.params.type == 1
              ? yesNo.find(
                  x =>
                    x.value ==
                    requestInfo.request.oldData.detail.platformAvailable
                ).text || '-'
              : null
          "
        />
        <PlainText
          label="Meter Register"
          :value="requestInfo.request.detail.meterRegister"
          :oldValue="
            $route.params.type == 1
              ? requestInfo.request.oldData.detail.meterRegister || '-'
              : null
          "
        />
        <PlainText
          label="Filter Vessel Brand"
          :value="requestInfo.request.detail.filterVesselBrand"
          :oldValue="
            $route.params.type == 1
              ? requestInfo.request.oldData.detail.filterVesselBrand || '-'
              : null
          "
        />
        <PlainText
          label="Original Element Filter"
          :value="requestInfo.request.detail.originalElementFilter"
          :oldValue="
            $route.params.type == 1
              ? requestInfo.request.oldData.detail.originalElementFilter || '-'
              : null
          "
        />
        <PlainText
          label="Number of Original Element Filter"
          :value="requestInfo.request.detail.numberOfOriginalElementFilter"
          :oldValue="
            $route.params.type == 1
              ? requestInfo.request.oldData.detail
                  .numberOfOriginalElementFilter || '-'
              : null
          "
        />
        <hr />
        <PlainText
          label="Certificate of Operating"
          :value="requestInfo.request.detail.certificateOfOperating"
          :oldValue="
            $route.params.type == 1
              ? requestInfo.request.oldData.detail.certificateOfOperating || '-'
              : null
          "
        />
        <PlainText
          label="Asset Number"
          :value="requestInfo.request.detail.assetNumber"
          :oldValue="
            $route.params.type == 1
              ? requestInfo.request.oldData.detail.assetNumber || '-'
              : null
          "
        />
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
