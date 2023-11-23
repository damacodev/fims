<template>
  <div class="template">
    <table class="table table-borderless">
      <thead>
        <tr>
          <td colspan="3" class="align-middle text-center">
            <h4 class="font-weight-bolder">
              PENCATATAN HASIL PEMERIKSAAN BRIDGER SEBELUM KELUAR LOKASI
            </h4>
          </td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="text-left p-0" width="230px">Tanggal</td>
          <td class="text-left p-0">:</td>
          <td class="text-left p-0">
            {{ dateFormat(form.transactionDate, "DD MMMM YYYY") }}
          </td>
        </tr>
        <tr>
          <td class="text-left p-0">Nomor Polisi</td>
          <td class="text-left p-0">:</td>
          <td class="text-left p-0">{{ form.nomorPolisi }}</td>
        </tr>
        <tr>
          <td class="text-left p-0">Volume Bridger</td>
          <td class="text-left p-0">:</td>
          <td class="text-left p-0">{{ setVolume(form.volume) }}</td>
        </tr>
        <tr>
          <td class="text-left p-0">Masa Berlaku Tera Tangki Bridger</td>
          <td class="text-left p-0">:</td>
          <td class="text-left p-0">
            {{ dateFormat(form.masaBerlakuTeraTangki, "DD MMMM YYYY") }}
          </td>
        </tr>
      </tbody>
    </table>
    <table class="table table-bordered">
      <thead>
        <tr>
          <td colspan="8" class="align-middle text-center">
            <span class="font-weight-bolder">
              PEMERIKSAAN DAN PENCATATAN MINIMAL 10 MENIT SETELAH SETTLING TIME
            </span>
          </td>
        </tr>
        <tr>
          <td colspan="3" class="text-center align-middle">
            JARAK t1 PADA DOKUMEN KALIBRASI
          </td>
          <td colspan="3" class="text-center align-middle">
            JARAK CAIRAN TERHADAP t1
            <br />(ULLAGE) @ SUPPLY POINT
          </td>
        </tr>
        <tr>
          <td></td>
          <td class="text-center align-middle">Jarak</td>
          <td class="text-center align-middle">Temp</td>
          <td class="text-center align-middle">Jarak</td>
          <td class="text-center align-middle">Density obs<br />(Kg/m³)</td>
          <td class="text-center align-middle">Temp</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="index in 4" v-bind:key="index">
          <td>{{ `Kompartemen ${index}` }}</td>
          <td class="text-right">
            {{
              index > form.jumlahKompartemen
                ? "N/A"
                : setMm(form.details[index - 1].atDokumenKalibrasi.ullage)
            }}
          </td>
          <td class="text-right">
            {{
              index > form.jumlahKompartemen
                ? "N/A"
                : setTemperature(
                    form.details[index - 1].atDokumenKalibrasi.temperature
                  )
            }}
          </td>
          <td class="text-right">
            {{
              index > form.jumlahKompartemen
                ? "N/A"
                : setMm(form.details[index - 1].atSupplyPoint.ullage)
            }}
          </td>
          <td class="text-right">
            {{
              index > form.jumlahKompartemen
                ? "N/A"
                : setMm(form.details[index - 1].atSupplyPoint.densityObserved)
            }}
          </td>
          <td class="text-right">
            {{
              index > form.jumlahKompartemen
                ? "N/A"
                : setTemperature(
                    form.details[index - 1].atSupplyPoint.temperature
                  )
            }}
          </td>
        </tr>
      </tbody>
    </table>
    <table class="table table-bordered">
      <thead>
        <tr>
          <td colspan="4" class="align-middle text-center">
            <span class="font-weight-bolder">
              PEMERIKSAAN OLEH SECURITY SEBELUM KELUAR LOKASI
            </span>
          </td>
        </tr>
        <tr>
          <td class="text-center align-middle" colspan="2">NOMOR/KODE SEGEL</td>
          <td class="text-center align-middle">JAM KELUAR</td>
          <td class="text-center align-middle">DIPERIKSA & DICATAT OLEH</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="index in 4" v-bind:key="index">
          <td>MAIN HOLE {{ index }}</td>
          <td class="text-right">{{ form.details[index - 1].mainhole }}</td>
          <td v-if="index == 1" rowspan="9" class="text-center align-middle">
            {{ form.jamKeluar }}
          </td>
          <td v-if="index == 1" rowspan="9" class="text-center align-middle">
            {{ form.namaSecurity }}
          </td>
        </tr>
        <tr>
          <td>BOTTOM LOADER COVER</td>
          <td class="text-right">{{ form.bottomLoaderCover }}</td>
        </tr>
        <tr v-for="index in 4" v-bind:key="index">
          <td>BOTTOM LOADER VALVE {{ index }}</td>
          <td class="text-right">{{ form.details[index - 1].mainhole }}</td>
        </tr>
      </tbody>
    </table>

    <!-- <p class="mt-10 font-weight-bolder">
      Catatan :
    </p>
    <ul>
      <li>Pemeriksaan ini wajib dilakukan oleh Petugas RSD yang bertugas sebagai fungsi kontrol atas asset milik Negara Republik Indonesia yang diamanahkan kepada PT Pertamina (Persero).</li>
      <li>Bila pada saat bridger masuk terdapat ketidaksesuaian agar dilaporkan kepada Pimpinan Receiving Storage & Distribution</li>
      <li>Bila pada saat pemeriksaan bagian dalam kompartemen masih terdapat produk bahan bakar, ataupun hal yang mencurigakan agar bridger tidak diijinkan keluar terlebih dahulu sebelum isi kompartemen benar-benar kosong.</li>
    </ul> -->
  </div>
</template>

<script>
import {
  numberFormat,
  dateFormat,
  setKompartemen,
  setVolume,
  setMm,
  setTemperature
} from "@/core/utils";

export default {
  props: {
    form: Object
  },
  methods: {
    numberFormat,
    dateFormat,
    setKompartemen,
    setVolume,
    setMm,
    setTemperature
  }
};
</script>
