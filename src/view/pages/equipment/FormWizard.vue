<template>
  <CardForm :title="title" :subTitle="subTitle">
    <template #form>
      <WizardForm
        id="equipment_wizard"
        :labels="['General Information', 'Details', 'Additional Information']"
        :submit="handleSubmit"
        :discard="{ name: 'equipment' }"
        :validator="$v"
      >
        <WizardStep :isCurrent="true">
          <Select
            v-if="multipleDppu"
            label="Depot Pengisian Pesawat Udara"
            v-model="step1.dppu"
            :v="$v.step1.dppu"
            :options="options.dppu"
            :multiple="false"
          />
          <Select
            label="Category"
            v-model="step1.category"
            :v="$v.step1.category"
            :options="category"
            :normalizer="normalizer"
            :multiple="false"
            :disabled="true"
            :readonly="true"
          />
          <InputText
            v-if="$route.params.category != 4"
            label="Equipment Code"
            v-model="step1.code"
            :v="$v.step1.code"
          />
          <InputText
            v-if="$route.params.category != 3 && $route.params.category != 4"
            label="Equipment Modul PM"
            v-model="step1.modulPm"
          />
        </WizardStep>

        <Category1
          v-if="$route.params.category == 1"
          :step2="step2"
          :step3="step3"
          :route="route"
          :validator="$v"
        />
        <Category3
          v-else-if="$route.params.category == 3"
          :step2="step2"
          :step3="step3"
          :route="route"
          :validator="$v"
        />
        <Category4
          v-else-if="$route.params.category == 4"
          :step2="step2"
          :step3="step3"
          :route="route"
          :validator="$v"
        />
        <Category5
          v-else-if="$route.params.category == 5"
          :step2="step2"
          :step3="step3"
          :route="route"
          :validator="$v"
        />
        <Category6
          v-else-if="$route.params.category == 6"
          :step2="step2"
          :step3="step3"
          :route="route"
          :validator="$v"
        />
        <Category7
          v-else-if="$route.params.category == 7"
          :step2="step2"
          :step3="step3"
          :route="route"
          :validator="$v"
        />

        <template #delete-button>
          <b-button
            v-show="$route.name != route.form"
            variant="outline-danger"
            class="font-weight-bold text-uppercase px-9 py-4 ml-2"
            @click="handleDelete"
          >
            Delete
          </b-button>
        </template>
      </WizardForm>
    </template>
  </CardForm>
</template>

<script>
import { mapGetters } from "vuex";
import Category1 from "./Category1";
import Category3 from "./Category3";
import Category4 from "./Category4";
import Category5 from "./Category5";
import Category6 from "./Category6";
import Category7 from "./Category7";
import { getDppu } from "@/core/utils";
import {
  category,
  yesNo,
  available,
  years,
  status,
  breatherValve,
  movAtg
} from "@/core/datasource/options";
import { normalizer } from "@/core/utils";
import { required } from "vuelidate/lib/validators";

export default {
  components: {
    Category1,
    Category3,
    Category4,
    Category5,
    Category6,
    Category7
  },
  data: () => ({
    title: "Equipment",
    route: {
      form: "equipmentCreate",
      table: "equipment"
    },
    step1: {
      dppu: null,
      category: null,
      code: null,
      modulPm: null
    },
    step2: {},
    step3: {},
    options: {
      dppu: []
    },
    category,
    yesNo,
    available,
    years,
    status,
    breatherValve,
    movAtg
  }),
  validations() {
    const self = this;
    let step1, step2, step3;
    if (self.$route.params.category == 1) {
      step1 = {
        dppu: { required },
        category: { required },
        code: { required }
      };
      step2 = {
        type: { required }
      };
      step3 = {
        condition: { required }
      };
    } else if (self.$route.params.category == 2) {
      step1 = {
        dppu: { required },
        category: { required },
        code: { required }
      };
      step2 = {
        product: { required }
      };
      step3 = {
        condition: { required }
      };
    } else if (self.$route.params.category == 3) {
      step1 = {
        dppu: { required },
        category: { required },
        code: { required }
      };
      step2 = {
        product: { required }
      };
      step3 = {
        condition: { required }
      };
    } else if (self.$route.params.category == 4) {
      step1 = {
        dppu: { required },
        category: { required }
      };
      step2 = {
        product: { required }
      };
      step3 = {
        condition: { required }
      };
    } else if (self.$route.params.category == 5) {
      step1 = {
        dppu: { required },
        category: { required },
        code: { required }
      };
      step2 = {
        product: { required }
      };
      step3 = {
        condition: { required }
      };
    } else if (self.$route.params.category == 6) {
      step1 = {
        dppu: { required },
        category: { required },
        code: { required }
      };
      step2 = {
        product: { required }
      };
      step3 = {
        condition: { required }
      };
    } else if (self.$route.params.category == 7) {
      step1 = {
        dppu: { required },
        category: { required },
        code: { required }
      };
      step2 = {
        product: { required }
      };
      step3 = {
        condition: { required }
      };
    }

    return {
      step1,
      step2,
      step3
    };
  },
  computed: {
    ...mapGetters("personalize", ["multipleDppu", "dppu"]),
    subTitle() {
      const self = this;
      return self.$route.name != self.route.form
        ? "Update equipment information"
        : "Create new equipment";
    },
    textButton() {
      const self = this;
      return self.$route.name != self.route.form ? "Save Changes" : "Submit";
    }
  },
  created() {
    const self = this;

    // getDppu().then(response => {
    //   self.dppu = response.data.map(x => ({
    //     id: x.id,
    //     label: x.name
    //   }));
    // });
    if (self.multipleDppu) {
      getDppu().then(response => {
        self.options.dppu = response.data.map(x => ({
          id: x.id,
          label: x.name
        }));
      });
    } else {
      self.options.dppu = [self.dppu];
    }
    if (self.dppu) {
      self.step1.dppu = self.dppu.id;
    }

    self.step1.category = self.$route.params.category;
    // self.step1.code = "T-201";
    // self.step1.modulPm = "SOQ-T-201/00";
    // alert(typeof self.step1.category)
    switch (parseInt(self.step1.category)) {
      case 1:
        self.step2 = {
          type: null,
          dimensions: null,
          location: null,
          manufacturer: null,
          typeOfAtg: null,
          serialNumber: null,
          model: null,
          automationIntegrated: null,
          yearOfManufacture: null
        };
        self.step3 = {
          condition: null,
          remarks: null,
          actived: true
        };
        break;
      case 2:
        self.step2 = {
          product: null,
          diameter: null,
          height: null
        };
        self.step3 = {
          condition: null,
          remarks: null,
          actived: true
        };
        break;
      case 3:
        self.step2 = {
          location: null,
          typeOfFilter: null,
          brand: null,
          modelNumber: null,
          serialNumber: null,
          vesselCapacity: null,
          yearOfManufacture: null
        };
        self.step3 = {
          firstStageOriginalElementFilter: null,
          firstStageNumberOfOriginalElementFilter: null,
          secondStageOriginalElementFilter: null,
          secondStageNumberOfOriginalElementFilter: null,
          condition: null,
          remarks: null,
          actived: true
        };

        // self.step2 = {
        //   location: "Receiving",
        //   typeOfFilter: "FWS",
        //   brand: "Velcon",
        //   modelNumber: "VV2328150AX",
        //   serialNumber: "601444-1",
        //   vesselCapacity: 1000,
        //   yearOfManufacture: 2018
        // };
        // self.step3 = {
        //   firstStageOriginalElementFilter: "I-628C5TB",
        //   firstStageNumberOfOriginalElementFilter: 5,
        //   secondStageOriginalElementFilter: "SO-630PV5",
        //   secondStageNumberOfOriginalElementFilter: 2,
        //   condition: null,
        //   remarks: "Belum BASTP - II",
        //   actived: true
        // };
        break;
      case 4:
        self.step2 = {
          pipeline: null,
          hydrantSystem: null,
          pipelinePressureTest: null,
          valveVisualInspection: null,
          pemakaianFlushHydrant: null,
          hydrantPitValveCheck: null,
          surgeAbsorberTest: null,
          cathodicProtectionTest: null,
          hydrantValveChamberCheck: null,
          staticTest: null
        };
        self.step3 = {
          condition: null,
          remarks: null,
          actived: true
        };
        break;
      case 5:
        self.step2 = {
          product: null,
          posLocation: null,
          pumpSerialNumber: null,
          pumpBrand: null,
          pumpType: null,
          pumpCapacity: null,
          pumpTotalHead: null,
          motorType: null,
          motorBrand: null,
          motorSerialNumber: null
        };
        self.step3 = {
          condition: null,
          remarks: null,
          actived: true
        };

        // self.step2 = {
        //   product: "AVTUR",
        //   posLocation: "Receiving",
        //   pumpSerialNumber: "3G1F1803487758",
        //   pumpBrand: "Sulzer",
        //   pumpType: "Centrifugal",
        //   pumpCapacity: 1000,
        //   pumpTotalHead: 40,
        //   motorType: "Electric Motor",
        //   motorBrand: "Sulzer",
        //   motorSerialNumber: "3G1F1803487758"
        // };
        // self.step3 = {
        //   condition: null,
        //   remarks: "Belum BASTP - II",
        //   actived: true
        // };
        break;
      case 6:
        self.step2 = {
          type: null,
          trucktiveBrand: null,
          trucktiveType: null,
          refuellingModulManufacturer: null,
          capacity: null,
          flowrate: null,
          yearOfManufacture: null,
          overfillProtectionAvailable: null,
          platformAvailable: null,
          meterRegister: null,
          filterVesselBrand: null,
          originalElementFilter: null,
          numberOfOriginalElementFilter: null
        };
        self.step3 = {
          certificateOfOperating: null,
          assetNumber: null,
          condition: null,
          remarks: null,
          actived: true
        };

        // self.step2 = {
        //   type: "Refueler",
        //   trucktiveBrand: "Nissan",
        //   trucktiveType: "PK-215",
        //   refuellingModulManufacturer: "Bosserman",
        //   capacity: 12,
        //   flowrate: 1000,
        //   yearOfManufacture: 2007,
        //   overfillProtectionAvailable: false,
        //   platformAvailable: false,
        //   meterRegister: "EMH-550",
        //   filterVesselBrand: "Velcon",
        //   originalElementFilter: "CDF-220 P",
        //   numberOfOriginalElementFilter: 15
        // };
        // self.step3 = {
        //   certificateOfOperating: null,
        //   assetNumber: "700003024",
        //   condition: "Standby",
        //   remarks: null,
        //   actived: true
        // };
        break;
      case 7:
        self.step2 = {
          product: null,
          diameter: null,
          height: null,
          roofConstruction: null,
          typeOfTank: null,
          inlet: null,
          outlet: null,
          breatherValveType: null,
          overfillProtectionAvailable: null,
          yearOfManufacture: null
        };
        self.step3 = {
          maximumCapacity: null,
          safeCapacity: null,
          deadStock: null,
          pumpableStock: null,
          lastEpicoat: null,
          lastCalibration: null,
          lastInspection: null,
          lastCleaning: null,
          waterPipeline: null,
          waterSprinkle: null,
          foamPipeline: null,
          foamTrailerMixer: null,
          condition: null,
          remarks: null,
          actived: true
        };

        // self.step2 = {
        //   product: "AVTUR",
        //   diameter: 9.212,
        //   height: 9,
        //   roofConstruction: "Fix",
        //   typeOfTank: "Vertical",
        //   inlet: 8,
        //   outlet: 8,
        //   breatherValveType: "Free Vent",
        //   overfillProtectionAvailable: true,
        //   yearOfManufacture: 2018
        // };
        // self.step3 = {
        //   maximumCapacity: 541,
        //   safeCapacity: 500,
        //   deadStock: 22,
        //   pumpableStock: 478,
        //   lastEpicoat: null,
        //   lastCalibration: "2019-02-26",
        //   lastInspection: "2019-05-04",
        //   lastCleaning: "2019-04-30",
        //   waterPipeline: true,
        //   waterSprinkle: true,
        //   foamPipeline: true,
        //   foamTrailerMixer: true,
        //   condition: "Operasional",
        //   remarks: "Belum BASTP - II",
        //   actived: true
        // };
        break;
    }

    if (self.$route.name != self.route.form) {
      self.heading = "Update Equipment";
      self.get();
    }

    // TODO : DUMMY
    // // self.step1.dppu = "fff7a6c0-2af6-4d13-ba19-ccdda483aa17"
    // self.step1.dppu = "cb43b44d-d467-409f-84af-c81a1692a7d8";
    // self.step1.code = "HP-203"
    // self.step1.modulPm = "CGK-P-203/00"

    // // self.step2.type = "ATG"
    // // self.step2.dimensions = "8"
    // // self.step2.location = "Inlet Tangki T-203"
    // // self.step2.manufacturer = "Rotork"
    // // self.step2.typeOfAtg = "RADAR"
    // // self.step2.serialNumber = "SG99680101"
    // // self.step2.model = "IQ3"
    // // self.step2.automationIntegrated = true
    // // self.step2.yearOfManufacture = "2019"

    // self.step3.condition = "-";
    // // self.step3.remarks = "Belum BASTP - II"

    // self.step2 = {
    //   product: "AVTUR",
    //   posLocation: "Delivery",
    //   pumpSerialNumber: "3G1F1803487758",
    //   pumpBrand: "Sulzer",
    //   pumpType: "Centrifugal",
    //   pumpCapacity: 1000,
    //   pumpTotalHead: 40,
    //   motorType: "Electric Motor",
    //   motorBrand: "Sulzer",
    //   motorSerialNumber: "3G1F1803487758",
    // };
    // self.step3 = {
    //   condition: null,
    //   remarks: "Operasional",
    //   actived: true,
    // };

    // self.step1.code = "SKH-27SKH-31";
    // self.step1.modulPm = "CGK-HYD-31/00";
    // self.step2 = {
    //   type: "Hydrant Dispenser",
    //   trucktiveBrand: "Hino",
    //   trucktiveType: "130MD",
    //   refuellingModulManufacturer: "Liquip",
    //   capacity: 0,
    //   flowrate: 4500,
    //   yearOfManufacture: 2010,
    //   overfillProtectionAvailable: false,
    //   platformAvailable: true,
    //   meterRegister: "EMH-500",
    //   filterVesselBrand: "Velcon",
    //   originalElementFilter: "CDF-230 P",
    //   numberOfOriginalElementFilter: 40,
    // };
    // self.step3 = {
    //   certificateOfOperating: "DBU-GSE/CGK/0077/IV/2014",
    //   assetNumber: "700048652",
    //   condition: "Operasional",
    //   remarks: "Operasional",
    //   actived: true,
    // };
  },
  methods: {
    normalizer,
    get() {
      const self = this;

      let loader = self.$loading.show();
      self.$store
        .dispatch("apis/get", {
          url: `/equipment/${self.$route.params.id}`
        })
        .then(response => {
          if (response.error) {
            self.$message.error({
              zIndex: 10000,
              message: response.message
            });

            self.$router.push({ name: self.route.table });
          } else {
            self.step1 = {
              dppu: response.data.dppu.id,
              category: response.data.category.id,
              code: response.data.code,
              modulPm: response.data.detail.modulPm
            };

            switch (response.data.category.id) {
              case 1:
                self.step2 = {
                  type: response.data.detail.type,
                  dimensions: response.data.detail.dimensions,
                  location: response.data.detail.location,
                  manufacturer: response.data.detail.manufacturer,
                  typeOfAtg: response.data.detail.typeOfAtg,
                  serialNumber: response.data.detail.serialNumber,
                  model: response.data.detail.model,
                  automationIntegrated:
                    response.data.detail.automationIntegrated,
                  yearOfManufacture: response.data.detail.yearOfManufacture
                };
                self.step3 = {
                  condition: response.data.detail.condition,
                  remarks: response.data.detail.remarks,
                  actived: response.data.actived
                };
                break;
              case 3:
                self.step2 = {
                  location: response.data.detail.location,
                  typeOfFilter: response.data.detail.typeOfFilter,
                  brand: response.data.detail.brand,
                  modelNumber: response.data.detail.modelNumber,
                  serialNumber: response.data.detail.serialNumber,
                  vesselCapacity: response.data.detail.vesselCapacity,
                  yearOfManufacture: response.data.detail.yearOfManufacture
                };
                self.step3 = {
                  firstStageOriginalElementFilter:
                    response.data.detail.firstStageOriginalElementFilter,
                  firstStageNumberOfOriginalElementFilter:
                    response.data.detail
                      .firstStageNumberOfOriginalElementFilter,
                  secondStageOriginalElementFilter:
                    response.data.detail.secondStageOriginalElementFilter,
                  secondStageNumberOfOriginalElementFilter:
                    response.data.detail
                      .secondStageNumberOfOriginalElementFilter,
                  condition: response.data.detail.condition,
                  remarks: response.data.detail.remarks,
                  actived: response.data.actived
                };
                break;
              case 4:
                self.step2 = {
                  pipeline: response.data.detail.pipeline,
                  hydrantSystem: response.data.detail.hydrantSystem,
                  pipelinePressureTest:
                    response.data.detail.pipelinePressureTest,
                  valveVisualInspection:
                    response.data.detail.valveVisualInspection,
                  pemakaianFlushHydrant:
                    response.data.detail.pemakaianFlushHydrant,
                  hydrantPitValveCheck:
                    response.data.detail.hydrantPitValveCheck,
                  surgeAbsorberTest: response.data.detail.surgeAbsorberTest,
                  cathodicProtectionTest:
                    response.data.detail.cathodicProtectionTest,
                  hydrantValveChamberCheck:
                    response.data.detail.hydrantValveChamberCheck,
                  staticTest: response.data.detail.staticTest
                };
                self.step3 = {
                  condition: response.data.detail.condition,
                  remarks: response.data.detail.remarks,
                  actived: response.data.actived
                };
                break;
              case 5:
                self.step2 = {
                  product: response.data.detail.product,
                  posLocation: response.data.detail.posLocation,
                  pumpSerialNumber: response.data.detail.pumpSerialNumber,
                  pumpBrand: response.data.detail.pumpBrand,
                  pumpType: response.data.detail.pumpType,
                  pumpCapacity: response.data.detail.pumpCapacity,
                  pumpTotalHead: response.data.detail.pumpTotalHead,
                  motorType: response.data.detail.motorType,
                  motorBrand: response.data.detail.motorBrand,
                  motorSerialNumber: response.data.detail.motorSerialNumber
                };
                self.step3 = {
                  condition: response.data.detail.condition,
                  remarks: response.data.detail.remarks,
                  actived: response.data.actived
                };
                break;
              case 6:
                self.step2 = {
                  type: response.data.detail.type,
                  trucktiveBrand: response.data.detail.trucktiveBrand,
                  trucktiveType: response.data.detail.trucktiveType,
                  refuellingModulManufacturer:
                    response.data.detail.refuellingModulManufacturer,
                  capacity: response.data.detail.capacity,
                  flowrate: response.data.detail.flowrate,
                  yearOfManufacture: response.data.detail.yearOfManufacture,
                  overfillProtectionAvailable:
                    response.data.detail.overfillProtectionAvailable,
                  platformAvailable: response.data.detail.platformAvailable,
                  meterRegister: response.data.detail.meterRegister,
                  filterVesselBrand: response.data.detail.filterVesselBrand,
                  originalElementFilter:
                    response.data.detail.originalElementFilter,
                  numberOfOriginalElementFilter:
                    response.data.detail.numberOfOriginalElementFilter
                };
                self.step3 = {
                  certificateOfOperating:
                    response.data.detail.certificateOfOperating,
                  assetNumber: response.data.detail.assetNumber,
                  condition: response.data.detail.condition,
                  remarks: response.data.detail.remarks,
                  actived: response.data.actived
                };
                break;
              case 7:
                self.step2 = {
                  product: response.data.detail.product,
                  diameter: response.data.detail.diameter,
                  height: response.data.detail.height,
                  roofConstruction: response.data.detail.roofConstruction,
                  typeOfTank: response.data.detail.typeOfTank,
                  inlet: response.data.detail.inlet,
                  outlet: response.data.detail.outlet,
                  breatherValveType: response.data.detail.breatherValveType,
                  overfillProtectionAvailable:
                    response.data.detail.overfillProtectionAvailable,
                  yearOfManufacture: response.data.detail.yearOfManufacture
                };
                self.step3 = {
                  maximumCapacity: response.data.detail.maximumCapacity,
                  safeCapacity: response.data.detail.safeCapacity,
                  deadStock: response.data.detail.deadStock,
                  pumpableStock: response.data.detail.pumpableStock,
                  lastEpicoat: response.data.detail.lastEpicoat,
                  lastCalibration: response.data.detail.lastCalibration,
                  lastInspection: response.data.detail.lastInspection,
                  lastCleaning: response.data.detail.lastCleaning,
                  waterPipeline: response.data.detail.waterPipeline,
                  waterSprinkle: response.data.detail.waterSprinkle,
                  foamPipeline: response.data.detail.foamPipeline,
                  foamTrailerMixer: response.data.detail.foamTrailerMixer,
                  condition: response.data.detail.condition,
                  remarks: response.data.detail.remarks,
                  actived: response.data.actived
                };
                break;
            }
          }
          loader.hide();
        });
    },
    handleSubmit() {
      const self = this;
      // self.$v.step1.$touch();
      // if (self.$v.step1.$pending || self.$v.step1.$error) return;
      // self.$v.step2.$touch();
      // if (self.$v.step2.$pending || self.$v.step2.$error) return;
      // self.$v.step3.$touch();
      // if (self.$v.step3.$pending || self.$v.step3.$error) return;

      let _confirmText = "",
        _okText = "",
        _action = "",
        _url = "",
        _form = {},
        _type = self.$route.name != self.route.form ? 1 : 0;

      switch (parseInt(self.step1.category)) {
        case 1:
          _form = {
            type: _type,
            dppuId: self.step1.dppu,
            category: self.step1.category,
            code: self.step1.code,
            detail: {
              modulPm: self.step1.modulPm,
              type: self.step2.type,
              dimensions: self.step2.dimensions,
              location: self.step2.location,
              manufacturer: self.step2.manufacturer,
              typeOfAtg: self.step2.typeOfAtg,
              serialNumber: self.step2.serialNumber,
              model: self.step2.model,
              automationIntegrated: self.step2.automationIntegrated,
              yearOfManufacture: self.step2.yearOfManufacture,
              condition: self.step3.condition,
              remarks: self.step3.remarks
            },
            actived: self.step3.actived
          };
          break;
        case 3:
          _form = {
            type: _type,
            dppuId: self.step1.dppu,
            category: self.step1.category,
            code: self.step1.code,
            detail: {
              modulPm: self.step1.modulPm,
              location: self.step2.location,
              typeOfFilter: self.step2.typeOfFilter,
              brand: self.step2.brand,
              modelNumber: self.step2.modelNumber,
              serialNumber: self.step2.serialNumber,
              vesselCapacity: self.step2.vesselCapacity,
              yearOfManufacture: self.step2.yearOfManufacture,
              firstStageOriginalElementFilter:
                self.step3.firstStageOriginalElementFilter,
              firstStageNumberOfOriginalElementFilter:
                self.step3.firstStageNumberOfOriginalElementFilter,
              secondStageOriginalElementFilter:
                self.step3.secondStageOriginalElementFilter,
              secondStageNumberOfOriginalElementFilter:
                self.step3.secondStageNumberOfOriginalElementFilter,
              condition: self.step3.condition,
              remarks: self.step3.remarks
            },
            actived: self.step3.actived
          };
          break;
        case 4:
          _form = {
            type: _type,
            dppuId: self.step1.dppu,
            category: self.step1.category,
            code: "-",
            detail: {
              pipeline: self.step2.pipeline,
              hydrantSystem: self.step2.hydrantSystem,
              pipelinePressureTest: self.step2.pipelinePressureTest,
              valveVisualInspection: self.step2.valveVisualInspection,
              pemakaianFlushHydrant: self.step2.pemakaianFlushHydrant,
              hydrantPitValveCheck: self.step2.hydrantPitValveCheck,
              surgeAbsorberTest: self.step2.surgeAbsorberTest,
              cathodicProtectionTest: self.step2.cathodicProtectionTest,
              hydrantValveChamberCheck: self.step2.hydrantValveChamberCheck,
              staticTest: self.step2.staticTest,
              condition: self.step3.condition,
              remarks: self.step3.remarks
            },
            actived: self.step3.actived
          };
          break;
        case 5:
          _form = {
            type: _type,
            dppuId: self.step1.dppu,
            category: self.step1.category,
            code: self.step1.code,
            detail: {
              modulPm: self.step1.modulPm,
              product: self.step2.product,
              posLocation: self.step2.posLocation,
              pumpSerialNumber: self.step2.pumpSerialNumber,
              pumpBrand: self.step2.pumpBrand,
              pumpType: self.step2.pumpType,
              pumpCapacity: self.step2.pumpCapacity,
              pumpTotalHead: self.step2.pumpTotalHead,
              motorType: self.step2.motorType,
              motorBrand: self.step2.motorBrand,
              motorSerialNumber: self.step2.motorSerialNumber,
              condition: self.step3.condition,
              remarks: self.step3.remarks
            },
            actived: self.step3.actived
          };
          break;
        case 6:
          _form = {
            type: _type,
            dppuId: self.step1.dppu,
            category: self.step1.category,
            code: self.step1.code,
            detail: {
              modulPm: self.step1.modulPm,
              type: self.step2.type,
              trucktiveBrand: self.step2.trucktiveBrand,
              trucktiveType: self.step2.trucktiveType,
              refuellingModulManufacturer:
                self.step2.refuellingModulManufacturer,
              capacity: self.step2.capacity,
              flowrate: self.step2.flowrate,
              yearOfManufacture: self.step2.yearOfManufacture,
              overfillProtectionAvailable:
                self.step2.overfillProtectionAvailable,
              platformAvailable: self.step2.platformAvailable,
              meterRegister: self.step2.meterRegister,
              filterVesselBrand: self.step2.filterVesselBrand,
              originalElementFilter: self.step2.originalElementFilter,
              numberOfOriginalElementFilter:
                self.step2.numberOfOriginalElementFilter,
              certificateOfOperating: self.step3.certificateOfOperating,
              assetNumber: self.step3.assetNumber,
              condition: self.step3.condition,
              remarks: self.step3.remarks
            },
            actived: self.step3.actived
          };
          break;
        case 7:
          _form = {
            type: _type,
            dppuId: self.step1.dppu,
            category: self.step1.category,
            code: self.step1.code,
            detail: {
              modulPm: self.step1.modulPm,
              product: self.step2.product,
              diameter: self.step2.diameter,
              height: self.step2.height,
              roofConstruction: self.step2.roofConstruction,
              typeOfTank: self.step2.typeOfTank,
              inlet: self.step2.inlet,
              outlet: self.step2.outlet,
              breatherValveType: self.step2.breatherValveType,
              overfillProtectionAvailable:
                self.step2.overfillProtectionAvailable,
              yearOfManufacture: self.step2.yearOfManufacture,
              maximumCapacity: self.step3.maximumCapacity,
              safeCapacity: self.step3.safeCapacity,
              deadStock: self.step3.deadStock,
              pumpableStock: self.step3.pumpableStock,
              lastEpicoat: self.step3.lastEpicoat,
              lastCalibration: self.step3.lastCalibration,
              lastInspection: self.step3.lastInspection,
              lastCleaning: self.step3.lastCleaning,
              waterPipeline: self.step3.waterPipeline,
              waterSprinkle: self.step3.waterSprinkle,
              foamPipeline: self.step3.foamPipeline,
              foamTrailerMixer: self.step3.foamTrailerMixer,
              condition: self.step3.condition,
              remarks: self.step3.remarks
            },
            actived: self.step3.actived
          };
          break;
      }

      if (self.$route.name == self.route.form) {
        _confirmText = "You are about to submit this equipment. Are you sure ?";
        _okText = "Yes, Submit";
        _action = "apis/post";
        _url = "/equipment";
      } else {
        _confirmText = "You are about to update this equipment. Are you sure ?";
        _okText = "Yes, Update";
        _action = "apis/put";
        _url = `/equipment/${self.$route.params.id}`;
      }

      self.$dialog
        .confirm(_confirmText, {
          okText: _okText,
          cancelText: "Cancel",
          loader: true
        })
        .then(dialog => {
          self.$store
            .dispatch(_action, {
              url: _url,
              params: _form
            })
            .then(response => {
              dialog.close();
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

                self.$router.push({
                  name: "workItem"
                });
              }
            });
        });
    },
    handleDelete() {
      const self = this;

      self.$dialog
        .confirm("You are about to delete this equipment. Are you sure ?", {
          okText: "Yes, Delete",
          cancelText: "Cancel",
          loader: true
        })
        .then(dialog => {
          self.$store
            .dispatch("apis/remove", {
              url: `/equipment/${self.$route.params.id}`
            })
            .then(response => {
              dialog.close();
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

                self.$router.push({
                  name: "workItem"
                });
              }
            });
        });
    }
  }
};
</script>
