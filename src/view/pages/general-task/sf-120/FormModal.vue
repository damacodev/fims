<template>
  <fragment>
    <b-row>
      <b-col lg="12">
        <h5 class="font-weight-bolder mb-6">Program</h5>
      </b-col>
    </b-row>
    <Select
      label="Flight Schedule"
      placeholder="Select flight schedule"
      description="Leave it blank if you need to type manually (Source data from https://airlabs.co)"
      v-model="form.flightScheduleId"
      :options="options.flightSchedule"
      :useHorizontal="false"
      :multiple="false"
      @input="changeFlightSchedule"
      :disabled="currentProgress.locked"
    />
    <b-row>
      <b-col lg="6">
        <InputText
          label="Airline IATA"
          v-model="form.airlineIata"
          :v="validator.airlineIata"
          :useHorizontal="false"
          :disabled="form.flightScheduleId != null || currentProgress.locked"
        >
          <template v-if="!isNullOrEmpty(form.airlineIata)" #prepend>
            <b-input-group-text class="pt-0 pb-0">
              <b-img-lazy
                :src="
                  `https://airlabs.co/img/airline/m/${form.airlineIata.toUpperCase()}.png`
                "
                :alt="form.airlineIata"
                height="30px"
              ></b-img-lazy>
            </b-input-group-text>
          </template>
        </InputText>
      </b-col>
      <b-col lg="6">
        <InputText
          label="Flight Number"
          v-model="form.flightNumber"
          :v="validator.flightNumber"
          :useHorizontal="false"
          :disabled="currentProgress.locked"
        >
          <template #append>
            <b-button @click="openFlightRadar24" variant="secondary">
              View at flightradar24
            </b-button>
          </template>
        </InputText>
      </b-col>
      <b-col lg="12">
        <InputText
          label="Aircraft Type"
          type="text"
          v-model="form.aircraftType"
          :v="validator.aircraftType"
          :useHorizontal="false"
          :disabled="currentProgress.locked"
        />
      </b-col>
      <b-col lg="6">
        <InputText
          label="Estimate Time of Arrival"
          type="time"
          v-model="form.eta"
          :v="validator.eta"
          :useHorizontal="false"
          :disabled="currentProgress.locked"
        />
      </b-col>
      <b-col lg="6">
        <InputText
          label="Estimate Time of Departure"
          type="time"
          v-model="form.etd"
          :v="validator.etd"
          :useHorizontal="false"
          :disabled="currentProgress.locked"
        />
      </b-col>
      <b-col lg="6">
        <Select
          label="Remarks"
          v-model="form.remarksId"
          :options="options.refuelingProgram"
          :useHorizontal="false"
          :multiple="false"
          :disabled="currentProgress.locked"
          @input="changeRemarks"
        />
      </b-col>
    </b-row>
    <fragment v-if="form.realization">
      <b-row>
        <b-col lg="12">
          <h5 class="font-weight-bolder mb-6">Realization</h5>
        </b-col>
      </b-row>
      <b-row>
        <b-col lg="6">
          <InputText
            label="Refueling Time"
            type="time"
            v-model="form.refuelingTime"
            :useHorizontal="false"
            :disabled="currentProgress.locked || form.remarksId != null"
          />
        </b-col>
        <b-col lg="6">
          <Select
            label="CRO"
            v-model="form.croId"
            :options="options.cro"
            :useHorizontal="false"
            :multiple="false"
            :disabled="currentProgress.locked || form.remarksId != null"
          />
        </b-col>
      </b-row>
      <b-row>
        <b-col lg="6">
          <RadioGroup
            v-model="form.quickHandling"
            label="Quick Handling"
            :options="options.yesNo"
            :useHorizontal="false"
            :disabled="currentProgress.locked || form.remarksId != null"
          />
        </b-col>
        <b-col lg="6">
          <RadioGroup
            v-model="form.exron"
            label="Exron"
            :options="options.yesNo"
            :useHorizontal="false"
            :disabled="currentProgress.locked || form.remarksId != null"
          />
        </b-col>
      </b-row>
    </fragment>
  </fragment>
</template>

<script>
import { isNullOrEmpty, dateFormat } from "@/core/utils";

export default {
  props: {
    form: Object,
    options: Object,
    currentProgress: Object,
    validator: Object
  },
  methods: {
    isNullOrEmpty,
    changeRemarks() {
      const self = this;

      if (self.form.remarksId != null) {
        self.form.realization = false;
        self.form.refuelingTime = null;
        self.form.croId = null;
        self.form.quickHandling = false;
        self.form.exron = false;
      } else {
        self.form.realization = true;
      }
    },
    openFlightRadar24() {
      const self = this;
      window.open(
        `https://www.flightradar24.com/data/flights/${self.form.airlineIata}${self.form.flightNumber}`
      );
    },
    changeFlightSchedule() {
      const self = this;

      self.form.airlineIata = null;
      self.form.flightNumber = null;
      self.form.aircraftType = null;
      self.form.eta = null;
      self.form.etd = null;

      let _find = self.options.flightSchedule.find(
        x => x.id == self.form.flightScheduleId
      );

      if (_find) {
        self.form.airlineIata = _find.detail.airlineIata;
        self.form.flightNumber = _find.detail.flightNumber;
        self.form.aircraftType = _find.detail.aircraftType;
        self.form.eta = dateFormat(_find.detail.arrivalTime, "HH:mm");
        self.form.etd = dateFormat(_find.detail.departureTime, "HH:mm");
      }
    }
  }
};
</script>
