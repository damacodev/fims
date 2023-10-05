<template>
  <b-card>
    <b-row>
      <b-col lg="6">
        <b-row class="mb-2">
          <b-col sm="6" class="text-sm-right"><b>Pipeline:</b></b-col>
          <b-col>{{ detail.pipeline }}</b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col sm="6" class="text-sm-right"><b>Hydrant System:</b></b-col>
          <b-col>{{ detail.hydrantSystem }}</b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col sm="6" class="text-sm-right"
            ><b>Pipeline Pressure Test:</b></b-col
          >
          <b-col>{{ detail.pipelinePressureTest }}</b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col sm="6" class="text-sm-right"
            ><b>Valve Visual Inspection:</b></b-col
          >
          <b-col>{{ detail.valveVisualInspection }}</b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col sm="6" class="text-sm-right"
            ><b>Pemakaian dan Flush Hydrant:</b></b-col
          >
          <b-col>{{ detail.pemakaianFlushHydrant }}</b-col>
        </b-row>
      </b-col>
      <b-col lg="6">
        <b-row class="mb-2">
          <b-col sm="6" class="text-sm-right"
            ><b>Hydrant Pit Valve Check:</b></b-col
          >
          <b-col>{{ detail.hydrantPitValveCheck }}</b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col sm="6" class="text-sm-right"
            ><b>Surge Absorver Test:</b></b-col
          >
          <b-col>{{ detail.surgeAbsorberTest }}</b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col sm="6" class="text-sm-right"
            ><b>Cathodic Protection Test:</b></b-col
          >
          <b-col>{{ detail.cathodicProtectionTest }}</b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col sm="6" class="text-sm-right"
            ><b>Hydrant Valve Chamber Check:</b></b-col
          >
          <b-col>{{ detail.hydrantValveChamberCheck }}</b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col sm="6" class="text-sm-right"><b>Static Test:</b></b-col>
          <b-col>{{ detail.staticTest }}</b-col>
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
