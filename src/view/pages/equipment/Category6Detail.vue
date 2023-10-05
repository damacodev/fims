<template>
  <b-card>
    <b-row>
      <b-col lg="6">
        <b-row class="mb-2">
          <b-col sm="6" class="text-sm-right"><b>Equipment Modul PM:</b></b-col>
          <b-col>{{ detail.modulPm }}</b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col sm="6" class="text-sm-right"><h6>Trucktive</h6></b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col sm="6" class="text-sm-right"><b>Brand:</b></b-col>
          <b-col>{{ detail.trucktiveBrand }}</b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col sm="6" class="text-sm-right"><b>Type:</b></b-col>
          <b-col>{{ detail.trucktiveType }}</b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col sm="6" class="text-sm-right"><h6>Tank Information</h6></b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col sm="6" class="text-sm-right"><b>Manufacturer:</b></b-col>
          <b-col>{{ detail.refuellingModulManufacturer }}</b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col sm="6" class="text-sm-right"><b>Tank Capacity:</b></b-col>
          <b-col>{{ detail.capacity }}</b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col sm="6" class="text-sm-right"><b>Flow Rate:</b></b-col>
          <b-col>{{ detail.flowrate }}</b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col sm="6" class="text-sm-right"
            ><b>Year of Manufacture:</b></b-col
          >
          <b-col>{{ detail.yearOfManufacture }}</b-col>
        </b-row>
      </b-col>
      <b-col lg="6">
        <b-row class="mb-2">
          <b-col sm="6" class="text-sm-right"
            ><b>Overfill Protection Available:</b></b-col
          >
          <b-col>{{ detail.overfillProtectionAvailable ? "Yes" : "No" }}</b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col sm="6" class="text-sm-right"><b>Platform Available:</b></b-col>
          <b-col>{{ detail.platformAvailable ? "Yes" : "No" }}</b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col sm="6" class="text-sm-right"><b>Meter Register:</b></b-col>
          <b-col>{{ detail.meterRegister }}</b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col sm="6" class="text-sm-right"
            ><b>Filter Vessel Brand:</b></b-col
          >
          <b-col>{{ detail.filterVesselBrand }}</b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col sm="6" class="text-sm-right"
            ><b>Original Element Filter:</b></b-col
          >
          <b-col>{{ detail.originalElementFilter }}</b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col sm="6" class="text-sm-right"
            ><b>Number of Original Element Filter:</b></b-col
          >
          <b-col>{{ detail.numberOfOriginalElementFilter }}</b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col sm="6" class="text-sm-right"
            ><b>Certificate of Operating:</b></b-col
          >
          <b-col>{{ detail.certificateOfOperating }}</b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col sm="6" class="text-sm-right"><b>Asset Number:</b></b-col>
          <b-col>{{ detail.assetNumber }}</b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col sm="6" class="text-sm-right"><b>Condition:</b></b-col>
          <b-col>{{ detail.condition }}</b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col sm="6" class="text-sm-right"><b>Remarks:</b></b-col>
          <b-col>{{ detail.remarks }}</b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
export default {
  props: {
    detail: Object
  }
};
</script>
