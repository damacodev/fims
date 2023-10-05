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
        <hr />
        <h6>Dimensions</h6>
        <PlainText
          label="Diameter"
          :value="`${requestInfo.request.detail.diameter} m`"
          :oldValue="
            $route.params.type == 1
              ? `${requestInfo.request.oldData.detail.diameter} m` || '-'
              : null
          "
        />
        <PlainText
          label="Height"
          :value="`${requestInfo.request.detail.height} m`"
          :oldValue="
            $route.params.type == 1
              ? `${requestInfo.request.oldData.detail.height} m` || '-'
              : null
          "
        />
        <hr />
        <PlainText
          label="Roof Construction"
          :value="requestInfo.request.detail.roofConstruction"
          :oldValue="
            $route.params.type == 1
              ? requestInfo.request.oldData.detail.roofConstruction || '-'
              : null
          "
        />
        <PlainText
          label="Type of Tank"
          :value="requestInfo.request.detail.typeOfTank"
          :oldValue="
            $route.params.type == 1
              ? requestInfo.request.oldData.detail.typeOfTank || '-'
              : null
          "
        />
        <hr />
        <h6>Pipe Diameter</h6>
        <PlainText
          label="Inlet"
          :value="`${requestInfo.request.detail.inlet} inch`"
          :oldValue="
            $route.params.type == 1
              ? `${requestInfo.request.oldData.detail.inlet} inch` || '-'
              : null
          "
        />
        <PlainText
          label="Outlet"
          :value="`${requestInfo.request.detail.outlet} inch`"
          :oldValue="
            $route.params.type == 1
              ? `${requestInfo.request.oldData.detail.outlet} inch` || '-'
              : null
          "
        />
        <hr />
        <PlainText
          label="Breather Valve Type"
          :value="requestInfo.request.detail.breatherValveType"
          :oldValue="
            $route.params.type == 1
              ? requestInfo.request.oldData.detail.breatherValveType || '-'
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
          label="Year of Manufacture"
          :value="requestInfo.request.detail.yearOfManufacture"
          :oldValue="
            $route.params.type == 1
              ? requestInfo.request.oldData.detail.yearOfManufacture || '-'
              : null
          "
        />
        <hr />
        <h6>Capacity</h6>
        <PlainText
          label="Maximum Capacity"
          :value="`${requestInfo.request.detail.maximumCapacity} KL`"
          :oldValue="
            $route.params.type == 1
              ? `${requestInfo.request.oldData.detail.maximumCapacity} KL` ||
                '-'
              : null
          "
        />
        <PlainText
          label="Safe Capacity"
          :value="`${requestInfo.request.detail.safeCapacity} KL`"
          :oldValue="
            $route.params.type == 1
              ? `${requestInfo.request.oldData.detail.safeCapacity} KL` || '-'
              : null
          "
        />
        <PlainText
          label="Dead Stock"
          :value="`${requestInfo.request.detail.deadStock} KL`"
          :oldValue="
            $route.params.type == 1
              ? `${requestInfo.request.oldData.detail.deadStock} KL` || '-'
              : null
          "
        />
        <PlainText
          label="Pumpable Stock"
          :value="`${requestInfo.request.detail.pumpableStock} KL`"
          :oldValue="
            $route.params.type == 1
              ? `${requestInfo.request.oldData.detail.pumpableStock} KL` || '-'
              : null
          "
        />
        <hr />
        <h6>Date Specifications</h6>
        <PlainText
          label="Last Epicoat"
          :value="requestInfo.request.detail.lastEpicoat"
          :oldValue="
            $route.params.type == 1
              ? requestInfo.request.oldData.detail.lastEpicoat || '-'
              : null
          "
        />
        <PlainText
          label="Last Calibration"
          :value="requestInfo.request.detail.lastCalibration"
          :oldValue="
            $route.params.type == 1
              ? requestInfo.request.oldData.detail.lastCalibration || '-'
              : null
          "
        />
        <PlainText
          label="Last Inspection"
          :value="requestInfo.request.detail.lastInspection"
          :oldValue="
            $route.params.type == 1
              ? requestInfo.request.oldData.detail.lastInspection || '-'
              : null
          "
        />
        <PlainText
          label="Last Cleaning"
          :value="requestInfo.request.detail.lastCleaning"
          :oldValue="
            $route.params.type == 1
              ? requestInfo.request.oldData.detail.lastCleaning || '-'
              : null
          "
        />
        <hr />
        <h6>Refuelling System</h6>
        <PlainText
          label="Water Pipeline"
          :value="
            available.find(
              x => x.value == requestInfo.request.detail.waterPipeline
            ).text
          "
          :oldValue="
            $route.params.type == 1
              ? available.find(
                  x =>
                    x.value == requestInfo.request.oldData.detail.waterPipeline
                ).text || '-'
              : null
          "
        />
        <PlainText
          label="Water Sprinkle"
          :value="
            available.find(
              x => x.value == requestInfo.request.detail.waterSprinkle
            ).text
          "
          :oldValue="
            $route.params.type == 1
              ? available.find(
                  x =>
                    x.value == requestInfo.request.oldData.detail.waterSprinkle
                ).text || '-'
              : null
          "
        />
        <PlainText
          label="Foam Pipeline"
          :value="
            available.find(
              x => x.value == requestInfo.request.detail.foamPipeline
            ).text
          "
          :oldValue="
            $route.params.type == 1
              ? available.find(
                  x =>
                    x.value == requestInfo.request.oldData.detail.foamPipeline
                ).text || '-'
              : null
          "
        />
        <PlainText
          label="Foam Trailer / Mixer"
          :value="
            available.find(
              x => x.value == requestInfo.request.detail.foamTrailerMixer
            ).text
          "
          :oldValue="
            $route.params.type == 1
              ? available.find(
                  x =>
                    x.value ==
                    requestInfo.request.oldData.detail.foamTrailerMixer
                ).text || '-'
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
import { yesNo, available, status } from "@/core/datasource/options";
export default {
  props: {
    requestInfo: Object
  },
  data: () => ({
    yesNo,
    available,
    status
  })
};
</script>
