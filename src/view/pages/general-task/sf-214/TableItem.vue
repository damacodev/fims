<template>
  <fragment>
    <b-table-simple responsive="" bordered hover class="text-nowrap">
      <b-thead head-variant="light">
        <b-tr>
          <b-th class="text-center align-middle" rowspan="2">
            Equipment Code
          </b-th>
          <b-th class="text-center align-middle" rowspan="2">Location</b-th>
          <b-th class="text-center align-middle" rowspan="2">Type</b-th>
          <b-th class="text-center align-middle" rowspan="2">
            Body Conditions
          </b-th>
          <b-th class="text-center align-middle" rowspan="2">Paint</b-th>
          <b-th class="text-center align-middle" rowspan="2">Handle</b-th>
          <b-th class="text-center align-middle" rowspan="2">AFFF</b-th>
          <b-th class="text-center align-middle" colspan="2">Nozzles</b-th>
          <b-th class="text-center align-middle" colspan="4">Hoses</b-th>
          <b-th class="text-center align-middle" rowspan="2">Axe</b-th>
          <b-th class="text-center align-middle" rowspan="2">
            Line Proportioner
          </b-th>
          <b-th class="text-center align-middle" rowspan="2">
            Three Way Valve
          </b-th>
          <b-th class="text-center align-middle" rowspan="2">
            Combination Connecting
          </b-th>
          <b-th class="text-center align-middle" rowspan="2">Y Peace</b-th>
          <b-th class="text-center align-middle" rowspan="2">Remarks</b-th>
        </b-tr>
        <b-tr>
          <b-th class="text-center align-middle">Mystery Fog</b-th>
          <b-th class="text-center align-middle">Water Jet / Sprayer</b-th>
          <b-th class="text-center align-middle">1.5"</b-th>
          <b-th class="text-center align-middle">2"</b-th>
          <b-th class="text-center align-middle">2.5"</b-th>
          <b-th class="text-center align-middle">Spiral</b-th>
        </b-tr>
      </b-thead>
      <b-tbody>
        <template v-for="(row, index) in details">
          <b-tr v-bind:key="index" @click="onRowSelected(row)">
            <td class="text-center">{{ row.equipment.code }}</td>
            <td>{{ row.equipment.detail.location }}</td>
            <td>{{ row.equipment.detail.type }}</td>
            <td
              v-for="(item, indexItem) in [
                row.bodyConditions,
                row.paint,
                row.handle,
                row.afff,
                row.mysteryFog,
                row.waterJet,
                row.hoses15,
                row.hoses2,
                row.hoses25,
                row.spiral,
                row.axe,
                row.lineProportioner,
                row.threeWayValve,
                row.combinationConnecting,
                row.yPeace
              ]"
              v-bind:key="indexItem"
              class="text-center"
            >
              <span v-if="item != null" v-html="setOption(item)" />
              <span v-else>-</span>
            </td>
            <td>{{ row.remarks || "-" }}</td>
          </b-tr>
        </template>
      </b-tbody>
    </b-table-simple>
    <EmptyTable
      v-if="details.length == 0"
      title="Fire Hose Box Check List will be displayed here"
      description="Please add an items first"
    />

    <b-modal
      v-model="modal.show"
      :title="modal.title"
      :ok-title="modal.okTitle"
      ok-only
      @ok="handleSubmit"
      size="lg"
    >
      <b-row>
        <b-col lg="4">
          <InputPlainText
            label="Equipment Code / Number"
            v-model="modal.form.equipment.code"
            :useHorizontal="false"
          />
        </b-col>
        <b-col lg="4">
          <InputPlainText
            label="Location"
            v-model="modal.form.equipment.detail.location"
            :useHorizontal="false"
          />
        </b-col>
        <b-col lg="4">
          <InputPlainText
            label="Type"
            v-model="modal.form.equipment.detail.type"
            :useHorizontal="false"
          />
        </b-col>
      </b-row>
      <b-row>
        <b-col lg="4">
          <Select
            label="Body Conditions"
            placeholder="Select Result"
            v-model="modal.form.bodyConditionsId"
            :useHorizontal="false"
            :options="options.fireHose"
            :multiple="false"
          />
        </b-col>
        <b-col lg="4">
          <Select
            label="Paint"
            placeholder="Select Result"
            v-model="modal.form.paintId"
            :useHorizontal="false"
            :options="options.fireHose"
            :multiple="false"
          />
        </b-col>
        <b-col lg="4">
          <Select
            label="Handle"
            placeholder="Select Result"
            v-model="modal.form.handleId"
            :useHorizontal="false"
            :options="options.fireHose"
            :multiple="false"
          />
        </b-col>
        <b-col lg="4">
          <Select
            label="AFFF"
            placeholder="Select Result"
            v-model="modal.form.afffId"
            :useHorizontal="false"
            :options="options.fireHose"
            :multiple="false"
          />
        </b-col>
        <b-col lg="4">
          <Select
            label="Mystery Fog"
            placeholder="Select Result"
            v-model="modal.form.mysteryFogId"
            :useHorizontal="false"
            :options="options.fireHose"
            :multiple="false"
          />
        </b-col>
        <b-col lg="4">
          <Select
            label="Water Jet/Sprayer"
            placeholder="Select Result"
            v-model="modal.form.waterJetId"
            :useHorizontal="false"
            :options="options.fireHose"
            :multiple="false"
          />
        </b-col>
        <b-col lg="4">
          <Select
            label='Hoses 1.5"'
            placeholder="Select Result"
            v-model="modal.form.hoses15Id"
            :useHorizontal="false"
            :options="options.fireHose"
            :multiple="false"
          />
        </b-col>
        <b-col lg="4">
          <Select
            label='Hoses 2"'
            placeholder="Select Result"
            v-model="modal.form.hoses2Id"
            :useHorizontal="false"
            :options="options.fireHose"
            :multiple="false"
          />
        </b-col>
        <b-col lg="4">
          <Select
            label='Hoses 2.5"'
            placeholder="Select Result"
            v-model="modal.form.hoses25Id"
            :useHorizontal="false"
            :options="options.fireHose"
            :multiple="false"
          />
        </b-col>
        <b-col lg="4">
          <Select
            label="Spiral"
            placeholder="Select Result"
            v-model="modal.form.spiralId"
            :useHorizontal="false"
            :options="options.fireHose"
            :multiple="false"
          />
        </b-col>
        <b-col lg="4">
          <Select
            label="Axe"
            placeholder="Select Result"
            v-model="modal.form.axeId"
            :useHorizontal="false"
            :options="options.fireHose"
            :multiple="false"
          />
        </b-col>
        <b-col lg="4">
          <Select
            label="Line Proportioner"
            placeholder="Select Result"
            v-model="modal.form.lineProportionerId"
            :useHorizontal="false"
            :options="options.fireHose"
            :multiple="false"
          />
        </b-col>
        <b-col lg="4">
          <Select
            label="Three Way Valve"
            placeholder="Select Result"
            v-model="modal.form.threeWayValveId"
            :useHorizontal="false"
            :options="options.fireHose"
            :multiple="false"
          />
        </b-col>
        <b-col lg="4">
          <Select
            label="Combination Connecting"
            placeholder="Select Result"
            v-model="modal.form.combinationConnectingId"
            :useHorizontal="false"
            :options="options.fireHose"
            :multiple="false"
          />
        </b-col>
        <b-col lg="4">
          <Select
            label="Y Peace"
            placeholder="Select Result"
            v-model="modal.form.yPeaceId"
            :useHorizontal="false"
            :options="options.fireHose"
            :multiple="false"
          />
        </b-col>
      </b-row>
      <b-row>
        <b-col lg="12">
          <TextArea
            label="Remarks"
            v-model="modal.form.remarks"
            :useHorizontal="false"
          />
        </b-col>
      </b-row>
    </b-modal>
  </fragment>
</template>

<script>
import { getFireHose, setOption } from "@/core/utils";

export default {
  props: {
    currentProgress: Object,
    details: Array
  },
  data: () => ({
    options: {
      fireHose: []
    },
    modal: {
      show: false,
      title: "Detail",
      okTitle: "Save",
      form: {
        id: null,
        equipmentId: null,
        equipment: {
          id: null,
          code: null,
          detail: []
        },
        bodyConditionsId: null,
        bodyConditions: null,
        paintId: null,
        paint: null,
        handleId: null,
        handle: null,
        afffId: null,
        afff: null,
        mysteryFogId: null,
        mysteryFog: null,
        waterJetId: null,
        waterJet: null,
        hoses15Id: null,
        hoses15: null,
        hoses2Id: null,
        hoses2: null,
        hoses25Id: null,
        hoses25: null,
        spiralId: null,
        spiral: null,
        axeId: null,
        axe: null,
        lineProportionerId: null,
        lineProportioner: null,
        threeWayValveId: null,
        threeWayValve: null,
        combinationConnectingId: null,
        combinationConnecting: null,
        yPeaceId: null,
        yPeace: null,
        remarks: null
      }
    }
  }),
  created() {
    const self = this;

    getFireHose().then(response => {
      self.options.fireHose = response;
    });
  },
  methods: {
    setOption,
    onRowSelected(item) {
      const self = this;

      if (!self.currentProgress.locked) {
        self.modal.show = true;
        self.modal.okTitle = "Update";
        self.modal.form.id = item.id;
        self.modal.form.equipment = item.equipment;

        self.modal.form.bodyConditions = item.bodyConditions;
        self.modal.form.bodyConditionsId = item.bodyConditions?.id;
        self.modal.form.paint = item.paint;
        self.modal.form.paintId = item.paint?.id;
        self.modal.form.handle = item.handle;
        self.modal.form.handleId = item.handle?.id;
        self.modal.form.afff = item.afff;
        self.modal.form.afffId = item.afff?.id;
        self.modal.form.mysteryFog = item.mysteryFog;
        self.modal.form.mysteryFogId = item.mysteryFog?.id;
        self.modal.form.waterJet = item.waterJet;
        self.modal.form.waterJetId = item.waterJet?.id;
        self.modal.form.hoses15 = item.hoses15;
        self.modal.form.hoses15Id = item.hoses15?.id;
        self.modal.form.hoses2 = item.hoses2;
        self.modal.form.hoses2Id = item.hoses2?.id;
        self.modal.form.hoses25 = item.hoses25;
        self.modal.form.hoses25Id = item.hoses25?.id;
        self.modal.form.spiral = item.spiral;
        self.modal.form.spiralId = item.spiral?.id;
        self.modal.form.axe = item.axe;
        self.modal.form.axeId = item.axe?.id;
        self.modal.form.lineProportioner = item.lineProportioner;
        self.modal.form.lineProportionerId = item.lineProportioner?.id;
        self.modal.form.threeWayValve = item.threeWayValve;
        self.modal.form.threeWayValveId = item.threeWayValve?.id;
        self.modal.form.combinationConnecting = item.combinationConnecting;
        self.modal.form.combinationConnectingId =
          item.combinationConnecting?.id;
        self.modal.form.yPeace = item.yPeace;
        self.modal.form.yPeaceId = item.yPeace?.id;

        self.modal.form.remarks = item.remarks;
      }
    },
    handleSubmit(event) {
      event.preventDefault();

      const self = this;

      self.$dialog
        .confirm("You are about to update this record. Are you sure ?", {
          okText: "Yes, Update",
          cancelText: "Cancel",
          loader: true
        })
        .then(dialog => {
          let payload = {
            standardForm214Id: self.$route.params.id,
            bodyConditionsId: self.modal.form.bodyConditionsId,
            paintId: self.modal.form.paintId,
            handleId: self.modal.form.handleId,
            afffId: self.modal.form.afffId,
            mysteryFogId: self.modal.form.mysteryFogId,
            waterJetId: self.modal.form.waterJetId,
            hoses15Id: self.modal.form.hoses15Id,
            hoses2Id: self.modal.form.hoses2Id,
            hoses25Id: self.modal.form.hoses25Id,
            spiralId: self.modal.form.spiralId,
            axeId: self.modal.form.axeId,
            lineProportionerId: self.modal.form.lineProportionerId,
            threeWayValveId: self.modal.form.threeWayValveId,
            combinationConnectingId: self.modal.form.combinationConnectingId,
            yPeaceId: self.modal.form.yPeaceId,
            remarks: self.modal.form.remarks
          };

          self.$store
            .dispatch("apis/put", {
              url: `/board/standard-form/214/record/${self.modal.form.id}`,
              params: payload
            })
            .then(response => {
              if (response.error) {
                self.$message.error({
                  zIndex: 10000,
                  message: response.message
                });
              } else {
                self.$message.success({
                  zIndex: 10000,
                  message: response.message
                });
                self.modal.show = false;

                self.$emit("onUpdate");
              }
            })
            .finally(() => dialog.close());
        });
    }
  }
};
</script>
