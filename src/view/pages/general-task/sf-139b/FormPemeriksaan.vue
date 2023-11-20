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
        <b-col lg="6">
          <b-row>
            <b-col lg="12">
              <h5 class="font-weight-bolder mb-6">Nomor / Kode Segel</h5>
            </b-col>
            <b-col lg="6">
              <InputText
                label="Mainhole"
                type="text"
                v-model="form.mainhole"
                :useHorizontal="false"
              />
            </b-col>
            <b-col lg="6">
              <InputText
                label="Bottom Loader Valve"
                type="text"
                v-model="form.bottomLoaderValve"
                :useHorizontal="false"
              />
            </b-col>
          </b-row>
          <b-row>
            <b-col lg="6">
              <InputMoney
                label="IJK Bout Dokumen Kalibrasi"
                v-model="form.teraMetrologi"
                :useHorizontal="false"
                :usePrefix="false"
                append="mm"
              />
            </b-col>
            <b-col lg="6">
              <InputMoney
                label="R (mm/l)"
                v-model="form.rMmLiter"
                :useHorizontal="false"
                :usePrefix="false"
                :precision="2"
                append="mm/l"
              />
            </b-col>
          </b-row>
          <RadioGroup
            label="Dry Check"
            v-model="form.dryCheck"
            :options="options.dryCheck"
            :useHorizontal="false"
          />
        </b-col>
        <b-col lg="3">
          <h5 class="font-weight-bolder mb-6">@Supply Point</h5>
          <InputMoney
            label="Ullage"
            v-model="form.atSupplyPoint.ullage"
            :useHorizontal="false"
            :usePrefix="false"
            append="mm"
            @onInput="calculate"
          />
          <InputMoney
            label="Density Observed"
            v-model="form.atSupplyPoint.densityObserved"
            :useHorizontal="false"
            :usePrefix="false"
            :precision="4"
            append="Kg/m3"
          />
          <InputMoney
            label="Temperature"
            type="text"
            v-model="form.atSupplyPoint.temperature"
            :useHorizontal="false"
            :usePrefix="false"
            append="°C"
          />
        </b-col>
        <b-col lg="3">
          <h5 class="font-weight-bolder mb-6">@DPPU</h5>
          <InputMoney
            label="Ullage"
            v-model="form.atDppu.ullage"
            :useHorizontal="false"
            :usePrefix="false"
            append="mm"
            @onInput="calculate"
          />
          <InputMoney
            label="Density Observed"
            type="text"
            v-model="form.atDppu.densityObserved"
            :useHorizontal="false"
            :usePrefix="false"
            :precision="4"
            append="Kg/m3"
            @onInput="calculateCorrectionFactor"
          />
          <InputMoney
            label="Temperature"
            type="text"
            v-model="form.atDppu.temperature"
            :useHorizontal="false"
            :usePrefix="false"
            append="°C"
            @onInput="calculateCorrectionFactor"
          />
        </b-col>
      </b-row>
      <hr class="card-separator" />
      <b-row>
        <b-col lg="6">
          <b-row>
            <b-col lg="12">
              <h5 class="font-weight-bolder">Selisih</h5>
            </b-col>
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
        <b-col lg="6">
          <b-row style="padding-top: 6px">
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
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import { setMm, setLiter, setDensity, numberFormat } from "@/core/utils";

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
    calculate() {
      const self = this;

      if (self.form.atDppu.ullage > 0 && self.form.atSupplyPoint.ullage > 0)
        self.form.selisih.mm =
          self.form.atDppu.ullage - self.form.atSupplyPoint.ullage;

      if (self.form.selisih.mm > 0 && self.form.rMmLiter > 0)
        self.form.selisih.liter = self.form.selisih.mm / self.form.rMmLiter;

      if (self.form.selisih.liter > 0 && self.form.correctionFactor > 0)
        self.form.literAt15Celcius =
          self.form.selisih.liter * self.form.correctionFactor;

      self.$emit("onCalculateKlaim");
    },
    calculateCorrectionFactor() {
      const self = this;

      if (
        self.form.atDppu.densityObserved > 0 &&
        self.form.atDppu.temperature > 0
      ) {
        self.$store
          .dispatch("apis/post", {
            url: "common/correction-factor",
            params: {
              density: self.form.atDppu.densityObserved,
              temperature: self.form.atDppu.temperature
            }
          })
          .then(response => {
            if (!response.error) {
              self.form.densityAt15Celcius = response.data.densityAt15Celcius;
              self.form.correctionFactor = response.data.correctionFactor;
              self.calculate();
            }
          });
      }
    }
  }
};
</script>
