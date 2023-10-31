<template>
  <div class="template">
    <table class="table table-borderless">
      <thead>
        <tr>
          <td class="align-middle text-center" width="80%">
            <h4 class="font-weight-bolder">
              BERITA ACARA<br />
              PERUBAHAN METER<br />
            </h4>
            <span>N0 : {{ form.transactionId }}</span>
          </td>
          <td class="align-middle">
            <img
              src="https://www.pertamina.com/Media/Image/Pertamina.png"
              height="40px"
            />
          </td>
        </tr>
      </thead>
    </table>
    <p class="mt-10">
      Pada hari ini {{ dateFormat(form.transactionDate, "dddd") }}, Tanggal
      {{ dateFormat(form.transactionDate, "DD MMMM YYYY") }}, Jam
      {{ dateFormat(form.transactionDate, "HH:mm") }} telah dilaksanakan
      pekerjaan,
    </p>
    <ol>
      <li v-for="(activity, index) in form.activities" v-bind:key="index">
        {{ activity }}
      </li>
    </ol>

    <table class="table table-borderless mt-8">
      <tbody>
        <tr>
          <td class="text-left p-0" colspan="3">
            Sehingga terjadi perubahan totalisator meter penyerahan
            {{ form.meterName }}
          </td>
        </tr>
        <tr>
          <td class="text-left m-0 p-0" width="100px">Sebanyak</td>
          <td class="text-center m-0 p-0" width="20px">:</td>
          <td class="text-left m-0 p-0">
            {{ numberFormat(form.differential) }} Liter
          </td>
        </tr>
        <tr>
          <td class="text-left m-0 p-0 pt-5">Meter Akhir</td>
          <td class="text-center m-0 p-0 pt-5">:</td>
          <td class="text-left m-0 p-0 pt-5">
            {{ numberFormat(form.endMeter) }}
          </td>
        </tr>
        <tr>
          <td class="text-left m-0 p-0">Meter Awal</td>
          <td class="text-center m-0 p-0">:</td>
          <td class="text-left m-0 p-0">
            {{ numberFormat(form.startMeter) }}
          </td>
        </tr>
        <tr>
          <td class="text-left m-0 p-0 pt-5">Selisih</td>
          <td class="text-center m-0 p-0 pt-5">:</td>
          <td class="text-left m-0 p-0 pt-5">
            {{ numberFormat(form.differential) }}
          </td>
        </tr>
      </tbody>
    </table>

    <p class="mt-10">
      Demikian Berita Acara ini dibuat untuk dipergunakan seperlunya.
    </p>

    <table class="table table-borderless mt-10">
      <tbody>
        <tr>
          <td class="text-center">Pelaksana II</td>
          <td class="text-center">Pelaksana I</td>
        </tr>
        <tr>
          <td class="text-center" height="80">
            <vue-qr
              :text="approveProgress.pelaksana2"
              :size="80"
              :margin="0"
            ></vue-qr>
          </td>
          <td class="text-center" height="80">
            <vue-qr
              :text="approveProgress.pelaksana1"
              :size="80"
              :margin="0"
            ></vue-qr>
          </td>
        </tr>
        <tr>
          <td class="text-center">
            <p class="font-weight-bolder">
              {{ form.pelaksana2.label }}
            </p>
          </td>
          <td class="text-center">
            <p class="font-weight-bolder">
              {{ form.pelaksana1.label }}
            </p>
          </td>
        </tr>
        <tr>
          <td class="text-center" colspan="2">Mengetahui,<br />Pengawas</td>
        </tr>
        <tr>
          <td class="text-center" colspan="2" height="80">
            <vue-qr :text="approveProgress.pengawas" :size="80" :margin="0" />
          </td>
        </tr>
        <tr>
          <td class="text-center" colspan="2">
            <p class="font-weight-bolder">
              {{ form.pengawas.label }}
            </p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import VueQr from "vue-qr";
import { numberFormat, dateFormat } from "@/core/utils";

export default {
  components: {
    VueQr
  },
  props: {
    form: Object,
    approveProgress: Object
  },
  methods: {
    numberFormat,
    dateFormat
  }
};
</script>
