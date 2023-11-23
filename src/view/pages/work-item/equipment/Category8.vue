<template>
  <CardForm title="Details" subTitle="Equipment Information" class="mt-8">
    <template #form>
      <div class="card-body">
        <PlainText
          label="Region"
          :value="requestInfo.request.region.label"
          :oldValue="
            $route.params.action == 'update'
              ? requestInfo.request.oldData.region.label || '-'
              : null
          "
        />
        <PlainText
          label="DPPU"
          :value="requestInfo.request.dppu.label"
          :oldValue="
            $route.params.action == 'update'
              ? requestInfo.request.oldData.dppu.label || '-'
              : null
          "
        />
        <PlainText
          label="Category"
          :value="requestInfo.request.category.label"
          :oldValue="
            $route.params.action == 'update'
              ? requestInfo.request.oldData.category.label || '-'
              : null
          "
        />
        <PlainText
          label="Nomor Polisi"
          :value="requestInfo.request.code"
          :oldValue="
            $route.params.action == 'update'
              ? requestInfo.request.oldData.code || '-'
              : null
          "
        />
        <PlainText
          label="Jumlah Kompartemen"
          :value="`${requestInfo.request.detail.jumlahKompartemen} Kompartemen`"
          :oldValue="
            $route.params.action == 'update'
              ? `${requestInfo.request.oldData.detail.jumlahKompartemen} Kompartemen` ||
                '-'
              : null
          "
        />
        <PlainText
          label="Volume"
          :value="setVolume(requestInfo.request.detail.volume)"
          :oldValue="
            $route.params.action == 'update'
              ? requestInfo.request.oldData.detail.volume || '-'
              : null
          "
        />
        <PlainText
          label="Masa Berlaku Tera Tangki"
          :value="dateFormat(requestInfo.request.detail.masaBerlakuTeraTangki)"
          :oldValue="
            $route.params.action == 'update'
              ? dateFormat(
                  requestInfo.request.oldData.detail.masaBerlakuTeraTangki
                ) || '-'
              : null
          "
        />

        <fragment
          v-for="(detail, index) in requestInfo.request.detail
            .jumlahKompartemen"
          v-bind:key="index"
        >
          <hr class="card-separator" />
          <h6 class="font-weight-bolder text-dark">
            Kompartemen {{ index + 1 }}
          </h6>
          <PlainText
            label="Ullage"
            :value="setMm(requestInfo.request.detail.kompartemen[index].ullage)"
            :oldValue="
              $route.params.action == 'update'
                ? setMm(
                    requestInfo.request.oldData.detail.kompartemen[index].ullage
                  ) || '-'
                : null
            "
          />
          <PlainText
            label="Temperature"
            :value="
              setTemperature(
                requestInfo.request.detail.kompartemen[index].temperature
              )
            "
            :oldValue="
              $route.params.action == 'update'
                ? setTemperature(
                    requestInfo.request.oldData.detail.kompartemen[index]
                      .temperature
                  ) || '-'
                : null
            "
          />
        </fragment>

        <hr class="card-separator" />
        <PlainText
          label="Status"
          :value="status.find(x => x.value == requestInfo.request.actived).text"
          :oldValue="
            $route.params.action == 'update'
              ? status.find(x => x.value == requestInfo.request.oldData.actived)
                  .text || '-'
              : null
          "
          :mb="false"
        />
      </div>
    </template>
  </CardForm>
</template>

<script>
import { status } from "@/core/datasource/options";
import { setVolume, setMm, setTemperature, dateFormat } from "@/core/utils";
export default {
  props: {
    requestInfo: Object
  },
  data: () => ({
    status
  }),
  methods: {
    setVolume,
    setMm,
    setTemperature,
    dateFormat
  }
};
</script>
