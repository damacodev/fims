<template>
  <div class="card card-custom">
    <div class="card-header py-3">
      <div class="card-title align-items-start flex-column">
        <h3 class="card-label font-weight-bolder text-dark">
          Perhitungan Klaim
        </h3>
      </div>
    </div>
    <div class="card-body">
      <b-row>
        <b-col lg="3">
          <InputMoney
            label="Persentase Losses Sesuai Kontrak"
            v-model="form.persentaseLosses"
            :useHorizontal="false"
            :usePrefix="false"
            :precision="2"
            append="%"
            @onBlur="handleUpdateCache"
          />
        </b-col>
        <b-col lg="4" offset-lg="5">
          <PlainText label="Total Selisih Liter">
            <template #value>
              <h6 class="font-weight-bolder">
                {{ setLiter(form.klaim.totalSelisih, 2) }}
              </h6>
            </template>
          </PlainText>
          <PlainText label="Toleransi Losses Sesuai Kontrak">
            <template #value>
              <h6 class="font-weight-bolder">
                {{ setLiter(form.klaim.toleransiLosses, 2) }}
              </h6>
            </template>
          </PlainText>
          <PlainText label="Volume Klaim Losses">
            <template #value>
              <h6 class="font-weight-bolder">
                {{ setLiter(form.klaim.volume) }}
              </h6>
            </template>
          </PlainText>
          <PlainText label="Harga Avtur (Include tax)">
            <template #value>
              <h6 class="font-weight-bolder">{{ setRupiah(form.harga) }}</h6>
            </template>
          </PlainText>
          <PlainText label="Nilai Klaim Losses">
            <template #value>
              <h6 class="font-weight-bolder">
                {{ setRupiah(form.klaim.nilai) }}
              </h6>
            </template>
          </PlainText>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import { setRupiah, setLiter } from "@/core/utils";
export default {
  props: {
    form: Object
  },
  methods: {
    setRupiah,
    setLiter,
    handleUpdateCache() {
      this.$emit("onUpdateCache");
    }
  }
};
</script>
