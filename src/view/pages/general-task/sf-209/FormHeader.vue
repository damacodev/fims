<template>
  <b-row>
    <b-col lg="12">
      <PlainText
        label="Depot Pengisian Pesawat Udara"
        :value="form.dppu.label"
      />
      <PlainText label="Transaction #" :value="form.transactionId" />
      <PlainText label="Date" :value="dateFormat(form.transactionDate)" />
      <PlainText label="Status">
        <template #value>
          <b-badge
            :variant="
              currentProgress.status == `Approved` ? `success` : `secondary`
            "
            >{{ currentProgress.status }}</b-badge
          >
        </template>
      </PlainText>
      <PlainText
        label="Loading/Discharge/Vehicle No."
        :value="form.equipment.label"
      />
      <PlainText label="Element Type" :value="form.elementType" />
      <PlainText label="Vessel Capacity" :value="setLpm(form.vesselCapacity)" />

      <h5 class="font-weight-bold mt-6 mb-2">Condition Filter Before</h5>
      <PlainText
        label="Operational Flowrate"
        :value="setLpm(form.conditionFilterBefore.operationalFlowrate.lpm)"
      />
      <PlainText
        label="Observed P.D.G"
        :value="setPsi(form.conditionFilterBefore.operationalFlowrate.pdg, 2)"
      />
      <PlainText
        label="Maximum Achievable Flowrate"
        :value="
          setLpm(form.conditionFilterBefore.maximumAchievableFlowrate.lpm)
        "
      />
      <PlainText
        label="Corrected P.D.G"
        :value="
          setPsi(form.conditionFilterBefore.maximumAchievableFlowrate.pdg, 2)
        "
      />
      <PlainText
        label="Date Element Filter Last Changed"
        :value="
          dateFormat(form.conditionFilterBefore.dateElementFilterLastChanged)
        "
      />
      <PlainText
        label="Throughput Since Element Last Change"
        :value="
          setLitres(form.conditionFilterBefore.throughputSinceElementLastChange)
        "
      />
      <PlainText
        label="Reason Filter Changed"
        :value="form.conditionFilterBefore.reasonFilterChanged"
      />

      <h5 class="font-weight-bold mt-6 mb-2">
        Filter Vessel Condition Checked
      </h5>
      <PlainText
        label="Elements Condition"
        :value="form.filterVesselConditionChecked.elementsCondition"
      />
      <PlainText
        label="Vessel Condition"
        :value="form.filterVesselConditionChecked.vesselCondition"
      />

      <h5 class="font-weight-bold mt-6 mb-2">Parts Element Changed</h5>
      <PlainText
        label="Micro"
        :value="setPcs(form.partsElementChanged.micro)"
      />
      <PlainText
        label="Coalescer"
        :value="setPcs(form.partsElementChanged.coalescer)"
      />
      <PlainText
        label="Separator"
        :value="setPcs(form.partsElementChanged.separator)"
      />
      <PlainText
        label="Monitor"
        :value="setPcs(form.partsElementChanged.monitor)"
      />
      <PlainText label="WBF" :value="setPcs(form.partsElementChanged.wbf)" />

      <span class="font-weight-bold mt-6 mb-2"
        >Spare Parts Element Filter Available</span
      >
      <PlainText
        label="Micro"
        :value="
          setPcs(
            form.partsElementChanged.sparepartsElementFilterAvailable.micro
          )
        "
      />
      <PlainText
        label="Coalescer"
        :value="
          setPcs(
            form.partsElementChanged.sparepartsElementFilterAvailable.coalescer
          )
        "
      />
      <PlainText
        label="Separator"
        :value="
          setPcs(
            form.partsElementChanged.sparepartsElementFilterAvailable.separator
          )
        "
      />
      <PlainText
        label="Monitor"
        :value="
          setPcs(
            form.partsElementChanged.sparepartsElementFilterAvailable.monitor
          )
        "
      />
      <PlainText
        label="WBF"
        :value="
          setPcs(form.partsElementChanged.sparepartsElementFilterAvailable.wbf)
        "
      />

      <h5 class="font-weight-bold mt-6 mb-2">
        Filter Condition After Installation
      </h5>
      <PlainText
        label="Operational Flowrate"
        :value="
          setLpm(form.filterConditionAfterInstallation.operationalFlowrate.lpm)
        "
      />
      <PlainText
        label="Observed P.D.G"
        :value="
          setPsi(
            form.filterConditionAfterInstallation.operationalFlowrate.pdg,
            2
          )
        "
      />
      <PlainText
        label="Maximum Achievable Flowrate"
        :value="
          setLpm(
            form.filterConditionAfterInstallation.maximumAchievableFlowrate.lpm
          )
        "
      />
      <PlainText
        label="Corrected P.D.G"
        :value="
          setPsi(
            form.filterConditionAfterInstallation.maximumAchievableFlowrate.pdg,
            2
          )
        "
      />
      <PlainText
        label="Product Circulation"
        :value="
          setLitres(form.filterConditionAfterInstallation.productCirculation)
        "
      />
      <PlainText
        label="Meter Totalisator"
        :value="form.filterConditionAfterInstallation.meterTotalisator"
      />
      <PlainText
        label="Millipore Colorimetric Test (Wet)"
        :value="
          form.filterConditionAfterInstallation.milliporeColorimetricTest.wet
        "
      />
      <PlainText
        label="Millipore Colorimetric Test (Dry)"
        :value="
          form.filterConditionAfterInstallation.milliporeColorimetricTest.dry
        "
      />
      <PlainText
        label="Hose End Strainer Inspection & Cleaning"
        :value="
          form.filterConditionAfterInstallation
            .hoseEndStrainerInspectionAndCleaning
        "
      />

      <PlainText label="Remarks" :value="form.remarks" />
      <PlainText label="Requester" :value="form.updatedBy.label" />
      <PlainText label="Updated At" :value="dateTimeFormat(form.updatedAt)" />
      <PlainText
        v-if="currentProgress.status != `Approved`"
        label="Assigned To"
        :value="currentProgress.nextAction.label"
      />
      <div
        v-if="currentProgress.status == 'Rejected' && showRemarks"
        class="mt-4"
      >
        <b-alert show variant="danger">
          <h4 class="alert-heading">Rejected</h4>
          <hr />
          <p class="mb-0">
            {{ currentProgress.remarks }}
          </p>
        </b-alert>
      </div>
    </b-col>
  </b-row>
</template>

<script>
import {
  dateFormat,
  dateTimeFormat,
  setLpm,
  setLitres,
  setPcs,
  setPsi
} from "@/core/utils";

export default {
  props: {
    form: Object,
    currentProgress: Object,
    showRemarks: Boolean
  },
  methods: {
    dateFormat,
    dateTimeFormat,
    setLpm,
    setLitres,
    setPcs,
    setPsi
  }
};
</script>
