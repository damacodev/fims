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
          <b-col sm="6" class="text-sm-right"><b>Pos Location:</b></b-col>
          <b-col>{{ detail.posLocation }}</b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col sm="6" class="text-sm-right"><h6>Pump</h6></b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col sm="6" class="text-sm-right"><b>Serial Number:</b></b-col>
          <b-col>{{ detail.pumpSerialNumber }}</b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col sm="6" class="text-sm-right"><b>Brand:</b></b-col>
          <b-col>{{ detail.pumpBrand }}</b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col sm="6" class="text-sm-right"><b>Type:</b></b-col>
          <b-col>{{ detail.pumpType }}</b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col sm="6" class="text-sm-right"><b>Capacity:</b></b-col>
          <b-col>{{ detail.pumpCapacity }}</b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col sm="6" class="text-sm-right"><b>Total Head:</b></b-col>
          <b-col>{{ detail.pumpTotalHead }}</b-col>
        </b-row>
      </b-col>
      <b-col lg="6">
        <b-row class="mb-2">
          <b-col sm="6" class="text-sm-right"><h6>Motor</h6></b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col sm="6" class="text-sm-right"><b>Type:</b></b-col>
          <b-col>{{ detail.motorType }}</b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col sm="6" class="text-sm-right"><b>Brand:</b></b-col>
          <b-col>{{ detail.motorBrand }}</b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col sm="6" class="text-sm-right"><b>Serial Number:</b></b-col>
          <b-col>{{ detail.motorSerialNumber }}</b-col>
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
