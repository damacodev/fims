<template>
  <b-card>
    <b-row>
      <b-col lg="6">
        <b-row class="mb-2">
          <b-col sm="6" class="text-sm-right"><b>Location:</b></b-col>
          <b-col>{{ detail.location }}</b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col sm="6" class="text-sm-right"><b>Type of Filter:</b></b-col>
          <b-col>{{ detail.typeOfFilter }}</b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col sm="6" class="text-sm-right"><b>Brand:</b></b-col>
          <b-col>{{ detail.brand }}</b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col sm="6" class="text-sm-right"><b>Model Number:</b></b-col>
          <b-col>{{ detail.modelNumber }}</b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col sm="6" class="text-sm-right"><b>Serial Number:</b></b-col>
          <b-col>{{ detail.serialNumber }}</b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col sm="6" class="text-sm-right"><b>Vessel Capacity:</b></b-col>
          <b-col>{{ detail.vesselCapacity }}</b-col>
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
          <b-col sm="6" class="text-sm-right"><h6>1st Stage</h6></b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col sm="6" class="text-sm-right"
            ><b>Original Element Filter:</b></b-col
          >
          <b-col>{{ detail.firstStageOriginalElementFilter }}</b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col sm="6" class="text-sm-right"
            ><b>Number of Element Filter:</b></b-col
          >
          <b-col>{{ detail.firstStageNumberOfOriginalElementFilter }}</b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col sm="6" class="text-sm-right"><h6>2nd Stage</h6></b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col sm="6" class="text-sm-right"
            ><b>Original Element Filter:</b></b-col
          >
          <b-col>{{ detail.secondStageOriginalElementFilter }}</b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col sm="6" class="text-sm-right"
            ><b>Number of Element Filter:</b></b-col
          >
          <b-col>{{ detail.secondStageNumberOfOriginalElementFilter }}</b-col>
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
