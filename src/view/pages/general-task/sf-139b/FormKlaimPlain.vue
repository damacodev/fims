<template>
  <div class="card card-custom bg-light-info">
    <div class="card-header py-3">
      <div class="card-title align-items-start flex-column">
        <h3 class="card-label font-weight-bolder text-dark">
          Perhitungan Klaim
        </h3>
      </div>
    </div>
    <div class="card-body">
      <b-row>
        <b-col lg="12">
          <PlainText label="Persentase Losses Sesuai Kontrak">
            <template #value>
              <h6 class="font-weight-bolder">
                {{ setPersentase(form.persentaseLosses) }}
              </h6>
            </template>
          </PlainText>
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
import { setPersentase, setRupiah, setLiter } from "@/core/utils";
export default {
  props: {
    form: Object
  },
  methods: {
    setPersentase,
    setRupiah,
    setLiter
  }
};
</script>
