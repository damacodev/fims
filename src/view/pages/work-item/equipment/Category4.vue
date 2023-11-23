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
          label="Pipeline"
          :value="
            yesNo.find(x => x.value == requestInfo.request.detail.pipeline).text
          "
          :oldValue="
            $route.params.action == 'update'
              ? yesNo.find(
                  x => x.value == requestInfo.request.oldData.detail.pipeline
                ).text || '-'
              : null
          "
        />
        <PlainText
          label="Hydrant System"
          :value="
            yesNo.find(x => x.value == requestInfo.request.detail.hydrantSystem)
              .text
          "
          :oldValue="
            $route.params.action == 'update'
              ? yesNo.find(
                  x =>
                    x.value == requestInfo.request.oldData.detail.hydrantSystem
                ).text || '-'
              : null
          "
        />
        <PlainText
          label="Pipeline Pressure Test"
          :value="
            yesNo.find(
              x => x.value == requestInfo.request.detail.pipelinePressureTest
            ).text
          "
          :oldValue="
            $route.params.action == 'update'
              ? yesNo.find(
                  x =>
                    x.value ==
                    requestInfo.request.oldData.detail.pipelinePressureTest
                ).text || '-'
              : null
          "
        />
        <PlainText
          label="Valve Visual Inspection"
          :value="
            yesNo.find(
              x => x.value == requestInfo.request.detail.valveVisualInspection
            ).text
          "
          :oldValue="
            $route.params.action == 'update'
              ? yesNo.find(
                  x =>
                    x.value ==
                    requestInfo.request.oldData.detail.valveVisualInspection
                ).text || '-'
              : null
          "
        />
        <PlainText
          label="Hydrant Pit Valve Check"
          :value="
            yesNo.find(
              x => x.value == requestInfo.request.detail.hydrantPitValveCheck
            ).text
          "
          :oldValue="
            $route.params.action == 'update'
              ? yesNo.find(
                  x =>
                    x.value ==
                    requestInfo.request.oldData.detail.hydrantPitValveCheck
                ).text || '-'
              : null
          "
        />
        <PlainText
          label="Surge Absorber Test"
          :value="
            yesNo.find(
              x => x.value == requestInfo.request.detail.surgeAbsorberTest
            ).text
          "
          :oldValue="
            $route.params.action == 'update'
              ? yesNo.find(
                  x =>
                    x.value ==
                    requestInfo.request.oldData.detail.surgeAbsorberTest
                ).text || '-'
              : null
          "
        />
        <PlainText
          label="Cathodic Protection Test"
          :value="
            yesNo.find(
              x => x.value == requestInfo.request.detail.cathodicProtectionTest
            ).text
          "
          :oldValue="
            $route.params.action == 'update'
              ? yesNo.find(
                  x =>
                    x.value ==
                    requestInfo.request.oldData.detail.cathodicProtectionTest
                ).text || '-'
              : null
          "
        />
        <PlainText
          label="Hydrant Valve Chamber Check"
          :value="
            yesNo.find(
              x =>
                x.value == requestInfo.request.detail.hydrantValveChamberCheck
            ).text
          "
          :oldValue="
            $route.params.action == 'update'
              ? yesNo.find(
                  x =>
                    x.value ==
                    requestInfo.request.oldData.detail.hydrantValveChamberCheck
                ).text || '-'
              : null
          "
        />
        <PlainText
          label="Static Test"
          :value="
            yesNo.find(x => x.value == requestInfo.request.detail.staticTest)
              .text
          "
          :oldValue="
            $route.params.action == 'update'
              ? yesNo.find(
                  x => x.value == requestInfo.request.oldData.detail.staticTest
                ).text || '-'
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
