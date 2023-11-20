<template>
  <fragment>
    <b-row>
      <b-col lg="12">
        <PlainText
          label="Depot Pengisian Pesawat Udara"
          :value="form.dppu.label"
        />
        <PlainText label="Transaction #" :value="form.transactionId" />
        <PlainText
          label="Transaction Date"
          :value="dateFormat(form.transactionDate)"
        />
      </b-col>
    </b-row>
    <hr class="card-separator-24" />
    <b-row>
      <b-col lg="6">
        <PlainText label="Supply Point" :value="form.supplyPoint" />
        <PlainText label="Nomor Polisi" :value="form.nomorPolisi" />
        <PlainText label="Nama Pengemudi" :value="form.namaPengemudi" />
        <PlainText
          label="Jumlah Kompartemen"
          :value="`${form.jumlahKompartemen} Kompartemen`"
        />
        <PlainText
          label="Masa Berlaku TERA Tangki"
          :value="dateFormat(form.masaBerlakuTeraTangki)"
        />
      </b-col>
      <b-col lg="6">
        <PlainText label="Volume" :value="setVolume(form.volume)" />
        <PlainText
          label="Harga Avtur (Include tax)"
          :value="setRupiah(form.harga, 2)"
        />
        <PlainText
          label="Bottom Loader Cover"
          :value="form.bottomLoaderCover"
        />
        <PlainText
          label="Kondisi Kompartemen"
          :value="form.kondisiKompartemen"
        />
        <PlainText label="Jam Masuk" :value="form.jamMasuk" />
        <PlainText label="Jam Keluar" :value="form.jamKeluar" />
      </b-col>
    </b-row>
    <hr class="card-separator-24" />
    <b-row>
      <b-col lg="12">
        <PlainText label="Status">
          <template #value>
            <b-badge
              :variant="
                currentProgress.status == `Approved` ? `success` : `secondary`
              "
              >{{ currentProgress.status }}</b-badge
            >
          </template>
        </PlainText>
        <PlainText label="Requester" :value="form.updatedBy.label" />
        <PlainText label="Updated At" :value="dateTimeFormat(form.updatedAt)" />
        <PlainText
          v-if="currentProgress.status != `Approved`"
          label="Assigned To"
          :value="currentProgress.nextAction.label"
        />
        <div v-if="currentProgress.status == 'Rejected'" class="mt-4">
          <b-alert show variant="danger">
            <h4 class="alert-heading">Rejected</h4>
            <hr />
            <p class="mb-0">
              {{ currentProgress.remarks }}
            </p>
          </b-alert>
        </div>
      </b-col>
    </b-row>
  </fragment>
</template>

<script>
import { dateFormat, dateTimeFormat, setVolume, setRupiah } from "@/core/utils";

export default {
  props: {
    form: Object,
    currentProgress: Object,
    content: Array
  },
  methods: {
    dateFormat,
    dateTimeFormat,
    setVolume,
    setRupiah
  }
};
</script>
