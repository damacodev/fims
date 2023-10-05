<template>
  <div>
    <WizardStep>
      <InputText
        label="Plant"
        v-model="step2.plant"
        :maxlength="4"
        :v="validator.step2.plant"
      />
      <InputText
        label="IATA"
        v-model="step2.iata"
        :maxlength="3"
        :v="validator.step2.iata"
      />
      <InputText
        label="ICAO"
        v-model="step2.icao"
        :maxlength="4"
        :v="validator.step2.icao"
      />
      <Select
        label="Main DPPU"
        v-model="step2.mainDppuId"
        :options="options.dppu"
        :multiple="false"
      />
      <b-row>
        <b-col lg="8" xl="5" offset-xl="4">
          <h5 class="font-weight-bold mb-6">Supply Point</h5>
        </b-col>
      </b-row>
      <InputText
        label="Type of Supply"
        v-model="step2.supplyType"
        :v="validator.step2.supplyType"
      />
      <InputText
        label="Name"
        v-model="step2.supplyPoint"
        :v="validator.step2.supplyPoint"
      />
      <InputText
        label="Distance"
        description="in kilometer (km) units"
        type="number"
        v-model="step2.supplyPointDistance"
        :v="validator.step2.supplyPointDistance"
      />
    </WizardStep>

    <WizardStep>
      <TextArea
        :use-horizontal="false"
        label="Address"
        v-model="step3.address"
        :v="validator.step3.address"
      />
      <b-row>
        <b-col cols="4">
          <InputText
            :use-horizontal="false"
            label="City"
            v-model="step3.city"
            :v="validator.step3.city"
          />
        </b-col>
        <b-col cols="4">
          <InputText
            :use-horizontal="false"
            label="Land Area"
            description="in m² units"
            type="number"
            v-model="step3.landArea"
            :v="validator.step3.landArea"
          />
        </b-col>
        <b-col cols="4">
          <InputText
            :use-horizontal="false"
            label="Land Status"
            v-model="step3.landStatus"
            :v="validator.step3.landStatus"
          />
        </b-col>
      </b-row>
      <GmapMap
        ref="gmaps"
        :center="center"
        :zoom="zoom"
        :options="{
          zoomControl: true,
          mapTypeControl: true,
          scaleControl: false,
          streetViewControl: false,
          rotateControl: false,
          fullscreenControl: true,
          disableDefaultUi: false
        }"
        style="min-height: 500px"
      >
      </GmapMap>
    </WizardStep>
  </div>
</template>

<script>
import { getDppu } from "@/core/utils";

export default {
  props: {
    step2: Object,
    step3: Object,
    validator: Object
  },
  data: () => ({
    options: {
      dppu: []
    },
    zoom: 5,
    center: {
      lat: -0.789275,
      lng: 113.921327
    }
  }),
  created() {
    const self = this;
    getDppu().then(response => {
      self.options.dppu = response.data.map(x => ({
        id: x.id,
        label: x.name
      }));
    });
  }
};
</script>
