<template>
  <b-card>
    <b-row>
      <b-col lg="6">
        <b-row class="mb-2">
          <b-col sm="6" class="text-sm-right"><b>Equipment Modul PM:</b></b-col>
          <b-col>{{ detail.modulPm }}</b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col sm="6" class="text-sm-right"><b>Type:</b></b-col>
          <b-col>{{ detail.type }}</b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col sm="6" class="text-sm-right"><b>Dimensions:</b></b-col>
          <b-col>{{ detail.dimensions }}</b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col sm="6" class="text-sm-right"><b>Location:</b></b-col>
          <b-col>{{ detail.location }}</b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col sm="6" class="text-sm-right"><b>Manufacturer:</b></b-col>
          <b-col>{{ detail.manufacturer }}</b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col sm="6" class="text-sm-right"><b>Type of ATG:</b></b-col>
          <b-col>{{ detail.typeOfAtg }}</b-col>
        </b-row>
      </b-col>
      <b-col lg="6">
        <b-row class="mb-2">
          <b-col sm="6" class="text-sm-right"><b>Serial Number:</b></b-col>
          <b-col>{{ detail.serialNumber }}</b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col sm="6" class="text-sm-right"><b>Model:</b></b-col>
          <b-col>{{ detail.model }}</b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col sm="6" class="text-sm-right"
            ><b>Automation Integrated:</b></b-col
          >
          <b-col>{{ detail.automationIntegrated ? "Yes" : "No" }}</b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col sm="6" class="text-sm-right"
            ><b>Year of Manufacture:</b></b-col
          >
          <b-col>{{ detail.yearOfManufacture }}</b-col>
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
