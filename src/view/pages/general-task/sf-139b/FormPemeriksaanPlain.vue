<template>
  <div class="card card-custom">
    <div class="card-header py-3">
      <div class="card-title align-items-start flex-column">
        <h3 class="card-label font-weight-bolder text-dark">
          {{ title }}
        </h3>
      </div>
    </div>
    <div class="card-body pb-0">
      <b-row>
        <b-col lg="12">
          <h6 class="font-weight-bolder">Nomor / Kode Segel</h6>
          <PlainText label="Mainhole" :value="form.mainhole" />
          <PlainText
            label="Bottom Loader Valve"
            :value="form.bottomLoaderValve"
          />
        </b-col>
      </b-row>
      <hr class="card-separator" />
      <b-row>
        <b-col lg="12">
          <PlainText
            label="IJK Bout Dokumen Kalibrasi / TERA Metrologi"
            :value="setMm(form.teraMetrologi)"
          />
          <PlainText label="R (mm/l)" :value="`${form.rMmLiter} mm/l`" />
          <PlainText label="Dry Check" :value="form.dryCheck" />
        </b-col>
        <b-col lg="6">
          <h6 class="font-weight-bolder mt-6">At Supply Point</h6>
          <PlainText label="Ullage" :value="setMm(form.atSupplyPoint.ullage)" />
          <PlainText
            label="Density Observed"
            :value="setDensity(form.atSupplyPoint.densityObserved, 'Kg/m³')"
          />
          <PlainText
            label="Temperature"
            :value="setTemperature(form.atSupplyPoint.temperature)"
          />
        </b-col>
        <b-col lg="6">
          <h6 class="font-weight-bolder mt-6">At DPPU</h6>
          <PlainText label="Ullage" :value="setMm(form.atDppu.ullage)" />
          <PlainText
            label="Density Observed"
            :value="setDensity(form.atDppu.densityObserved, 'Kg/m³')"
          />
          <PlainText
            label="Temperature"
            :value="setTemperature(form.atDppu.temperature)"
          />
        </b-col>
      </b-row>
      <hr class="card-separator" />
      <b-row>
        <b-col lg="12">
          <h6 class="font-weight-bolder m-0">Selisih</h6>
          <b-row>
            <b-col lg="6">
              <InputPlainText
                label="MM"
                cssClass="m-0"
                v-model="analisa.mm"
                :useLabel="false"
                :useHorizontal="false"
              />
            </b-col>
            <b-col lg="6">
              <InputPlainText
                label="LTR"
                cssClass="m-0"
                v-model="analisa.liter"
                :useLabel="false"
                :useHorizontal="false"
              />
            </b-col>
          </b-row>
        </b-col>
      </b-row>
      <hr class="card-separator" />
      <b-row>
        <b-col lg="4">
          <InputPlainText
            label="Density 15°C"
            labelClass="p-0"
            v-model="analisa.densityAt15Celcius"
            :useHorizontal="false"
          />
        </b-col>
        <b-col lg="4">
          <InputPlainText
            label="Correction Factor"
            labelClass="p-0"
            v-model="analisa.correctionFactor"
            :useHorizontal="false"
          />
        </b-col>
        <b-col lg="4">
          <InputPlainText
            label="Liter 15°C"
            labelClass="p-0"
            v-model="analisa.literAt15Celcius"
            :useHorizontal="false"
          />
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import {
  setMm,
  setLiter,
  setDensity,
  setTemperature,
  numberFormat
} from "@/core/utils";

export default {
  props: {
    title: String,
    form: Object,
    options: Object
  },
  computed: {
    analisa() {
      const self = this;

      return {
        mm: setMm(self.form.selisih.mm),
        liter: setLiter(self.form.selisih.liter, 2),
        densityAt15Celcius: setDensity(self.form.densityAt15Celcius),
        correctionFactor: numberFormat(self.form.correctionFactor, 6),
        literAt15Celcius: setLiter(self.form.literAt15Celcius, 2)
      };
    }
  },
  methods: {
    setMm,
    setLiter,
    setDensity,
    setTemperature,
    numberFormat
  }
};
</script>
