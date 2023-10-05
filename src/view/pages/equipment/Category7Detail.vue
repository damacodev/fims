<template>
  <b-card>
    <b-row>
      <b-col lg="6">
        <b-row class="mb-2">
          <b-col sm="6" class="text-sm-right"><b>Equipment Modul PM:</b></b-col>
          <b-col>{{ detail.modulPm }}</b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col sm="6" class="text-sm-right"><b>Product:</b></b-col>
          <b-col>{{ detail.product }}</b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col sm="6" class="text-sm-right"><h6>Dimensions</h6></b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col sm="6" class="text-sm-right"><b>Diameter:</b></b-col>
          <b-col>{{ detail.diameter }}</b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col sm="6" class="text-sm-right"><b>Height:</b></b-col>
          <b-col>{{ detail.height }}</b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col sm="6" class="text-sm-right"><b>Roof Construction:</b></b-col>
          <b-col>{{ detail.roofConstruction }}</b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col sm="6" class="text-sm-right"><b>Type of Tank:</b></b-col>
          <b-col>{{ detail.typeOfTank }}</b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col sm="6" class="text-sm-right"><h6>Pipe Diameter</h6></b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col sm="6" class="text-sm-right"><b>Inlet:</b></b-col>
          <b-col>{{ detail.inlet }}</b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col sm="6" class="text-sm-right"><b>Outlet:</b></b-col>
          <b-col>{{ detail.outlet }}</b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col sm="6" class="text-sm-right"
            ><b>Breather Valve Type:</b></b-col
          >
          <b-col>{{ detail.breatherValveType ? "Yes" : "No" }}</b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col sm="6" class="text-sm-right"
            ><b>Overfill Protection Available:</b></b-col
          >
          <b-col>{{ detail.overfillProtectionAvailable ? "Yes" : "No" }}</b-col>
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
          <b-col sm="6" class="text-sm-right"><h6>Capacity</h6></b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col sm="6" class="text-sm-right"><b>Maximum Capacity:</b></b-col>
          <b-col>{{ detail.maximumCapacity }}</b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col sm="6" class="text-sm-right"><b>Safe Capacity:</b></b-col>
          <b-col>{{ detail.safeCapacity }}</b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col sm="6" class="text-sm-right"><b>Dead Stock:</b></b-col>
          <b-col>{{ detail.deadStock }}</b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col sm="6" class="text-sm-right"><b>Pumpable Stock:</b></b-col>
          <b-col>{{ detail.pumpableStock }}</b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col sm="6" class="text-sm-right"
            ><h6>Date Specifications</h6></b-col
          >
        </b-row>
        <b-row class="mb-2">
          <b-col sm="6" class="text-sm-right"><b>Last Epicoat:</b></b-col>
          <b-col>{{ detail.lastEpicoat }}</b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col sm="6" class="text-sm-right"><b>Last Calibration:</b></b-col>
          <b-col>{{ detail.lastCalibration }}</b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col sm="6" class="text-sm-right"><b>Last Inspection:</b></b-col>
          <b-col>{{ detail.lastInspection }}</b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col sm="6" class="text-sm-right"><b>Last Cleaning:</b></b-col>
          <b-col>{{ detail.lastCleaning }}</b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col sm="6" class="text-sm-right"><h6>Refuelling System</h6></b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col sm="6" class="text-sm-right"><b>Water Pipeline:</b></b-col>
          <b-col>{{
            detail.waterPipeline ? "Available" : "Unavailable"
          }}</b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col sm="6" class="text-sm-right"><b>Water Sprinkle:</b></b-col>
          <b-col>{{
            detail.waterSprinkle ? "Available" : "Unavailable"
          }}</b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col sm="6" class="text-sm-right"><b>Foam Pipeline:</b></b-col>
          <b-col>{{ detail.foamPipeline ? "Available" : "Unavailable" }}</b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col sm="6" class="text-sm-right"
            ><b>Foam Trailer / Mixer:</b></b-col
          >
          <b-col>{{ detail.foamTrailerMixer }}</b-col>
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
