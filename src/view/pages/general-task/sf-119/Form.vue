<template>
  <div class="card card-custom">
    <div class="card-header py-3">
      <div class="card-title align-items-start flex-column">
        <h3 class="card-label font-weight-bolder text-dark">
          <b-button class="btn-icon mr-2" size="xs" @click="$router.go(-1)">
            <i class="flaticon2-back" />
          </b-button>
          {{ title }}
        </h3>
        <span class="text-muted font-weight-bold font-size-sm mt-1 pl-10">
          {{ subTitle }}
        </span>
      </div>
      <div class="card-toolbar">
        <b-button
          v-show="currentProgress.locked"
          variant="outline-primary"
          @click="handleExport"
        >
          Export to Excel
        </b-button>
        <b-button
          v-show="$route.name != route.form && !currentProgress.locked"
          variant="outline-danger"
          size="lg"
          class="mr-2"
          @click="handleDelete"
        >
          Delete
        </b-button>
        <b-button
          v-show="$route.name != route.form && !currentProgress.locked"
          variant="outline-primary"
          size="lg"
          class="mr-2"
          @click="handleSendApproval"
        >
          Save and Send Approval
        </b-button>
        <b-button
          v-show="!currentProgress.locked"
          variant="primary"
          size="lg"
          @click="handleSubmit"
        >
          {{ textButton }}
        </b-button>
      </div>
    </div>
    <b-row class="p-2">
      <div class="card-body pb-0">
        <template v-if="!currentProgress.locked">
          <Select
            v-if="multipleDppu"
            label="Depot Pengisian Pesawat Udara"
            v-model="form.dppuId"
            :v="$v.form.dppuId"
            :options="options.dppu"
            :multiple="false"
            :disabled="$route.name != route.form"
          />
          <InputText
            label="Transaction #"
            type="text"
            v-model="form.transactionId"
            disabled
          />
          <InputText
            label="Date"
            type="date"
            v-model="form.transactionDate"
            :v="$v.form.transactionDate"
            :max="getDate()"
          />
          <Select
            ref="Equipment"
            label="Equipment"
            placeholder="Search equipment..."
            v-model="form.equipmentId"
            :v="$v.form.equipmentId"
            :async="true"
            :multiple="false"
            :loadOptions="getEquipmentByCategory"
          />
          <Select
            label="Shift"
            placeholder="Select shift"
            v-model="form.shiftId"
            :v="$v.form.shiftId"
            :options="options.shift"
            :multiple="false"
          />
          <InputText
            label="Shift Group"
            type="text"
            v-model="form.shiftGroup"
            :v="$v.form.shiftGroup"
          />
        </template>
        <FormHeader
          v-else
          :form="form"
          :currentProgress="currentProgress"
          :showRemarks="true"
        />
      </div>
    </b-row>

    <TableItem
      :form="form"
      :options="options"
      :validations="$v"
      :buttonVisibility="!currentProgress.locked"
    />
  </div>
</template>

<script>
import { ASYNC_SEARCH } from "@riophae/vue-treeselect";
import { mapGetters } from "vuex";
import FormHeader from "./FormHeader.vue";
import TableItem from "./TableItem.vue";
import { required } from "vuelidate/lib/validators";
import {
  getDppu,
  getChecklistResult,
  numberFormat,
  getDate,
  dateFormat
} from "@/core/utils";

export default {
  components: {
    FormHeader,
    TableItem
  },
  data: () => ({
    title: "119 SF - Hydrant Dispenser / Refueller Checklist",
    route: {
      form: "sf119Create",
      table: "sf119"
    },
    form: {
      dppu: {
        id: null,
        label: null
      },
      dppuId: null,
      transactionId: "Auto Generated",
      transactionDate: dateFormat(getDate(), "YYYY-MM-DD"),
      equipmentId: null,
      shiftId: null,
      shiftGroup: null,
      generalCondition: {
        id: null,
        label: null
      },
      cleanliness: {
        result: {
          id: null,
          label: null
        },
        remarks: null
      },
      truckConditions: {
        fuel: {
          result: {
            id: null,
            label: null
          },
          remarks: null
        },
        radiatorCondition: {
          result: {
            id: null,
            label: null
          },
          remarks: null
        },
        lubricant: {
          result: {
            id: null,
            label: null
          },
          remarks: null
        },
        batteryCondition: {
          result: {
            id: null,
            label: null
          },
          remarks: null
        },
        brake: {
          result: {
            id: null,
            label: null
          },
          remarks: null
        },
        generalConditionOfEngine: {
          result: {
            id: null,
            label: null
          },
          remarks: null
        },
        horn: {
          result: {
            id: null,
            label: null
          },
          remarks: null
        },
        wiper: {
          result: {
            id: null,
            label: null
          },
          remarks: null
        },
        headAndTailLampsCondition: {
          result: {
            id: null,
            label: null
          },
          remarks: null
        },
        signLamps: {
          result: {
            id: null,
            label: null
          },
          remarks: null
        },
        beaconLight: {
          result: {
            id: null,
            label: null
          },
          remarks: null
        },
        fuelingLamps: {
          result: {
            id: null,
            label: null
          },
          remarks: null
        },
        ptoOrHydraulicPump: {
          result: {
            id: null,
            label: null
          },
          remarks: null
        },
        compressor: {
          result: {
            id: null,
            label: null
          },
          remarks: null
        },
        mirrors: {
          result: {
            id: null,
            label: null
          },
          remarks: null
        },
        tires: {
          result: {
            id: null,
            label: null
          },
          remarks: null
        },
        generalConditionOfTransmission: {
          result: {
            id: null,
            label: null
          },
          remarks: null
        },
        hydraulicLadderOrPlatform: {
          result: {
            id: null,
            label: null
          },
          remarks: null
        },
        rearwardGearWarning: {
          result: {
            id: null,
            label: null
          },
          remarks: null
        }
      },
      tankCondition: {
        stepCondition: {
          result: {
            id: null,
            label: null
          },
          remarks: null
        },
        jetLevelSensorCondition: {
          result: {
            id: null,
            label: null
          },
          remarks: null
        },
        pressureVacumValveOrFreeVent: {
          result: {
            id: null,
            label: null
          },
          remarks: null
        },
        waterDrainLineTank: {
          result: {
            id: null,
            label: null
          },
          remarks: null
        }
      },
      safetyEquipments: {
        flameTrapCondition: {
          result: {
            id: null,
            label: null
          },
          remarks: null
        },
        groundingAndOrBondingCableCondition: {
          result: {
            id: null,
            label: null
          },
          remarks: null
        },
        interlockSystem: {
          result: {
            id: null,
            label: null
          },
          remarks: null
        },
        sealOverrideInterlockSystem: {
          result: {
            id: null,
            label: null
          },
          remarks: null
        },
        sealOverrideDeadman: {
          result: {
            id: null,
            label: null
          },
          remarks: null
        },
        fireExtinguishers: {
          result: {
            id: null,
            label: null
          },
          seal: null,
          number: null,
          lastChecked: null,
          pressureIndicator: null
        },
        safetySigns: {
          result: {
            id: null,
            label: null
          },
          remarks: null
        },
        safetyCone: {
          result: {
            id: null,
            label: null
          },
          remarks: null
        }
      },
      refuelingEquipments: {
        before: {
          underwingHosesCondition: {
            rear: {
              result: {
                id: null,
                label: null
              },
              remarks: null
            },
            front: {
              result: {
                id: null,
                label: null
              },
              remarks: null
            }
          },
          platformHosesCondition: {
            left: {
              result: {
                id: null,
                label: null
              },
              remarks: null
            },
            right: {
              result: {
                id: null,
                label: null
              },
              remarks: null
            }
          },
          flowMeterCondition: {
            result: {
              id: null,
              label: null
            },
            remarks: null,
            calibrationExpiresDate: null
          },
          deadmanControlCondition: {
            result: {
              id: null,
              label: null
            },
            remarks: null
          },
          inputCouplerCondition: {
            result: {
              id: null,
              label: null
            },
            remarks: null
          },
          lastFilterChange: {
            result: {
              id: null,
              label: null
            },
            date: null
          },
          pcvAndRegulator: {
            result: {
              id: null,
              label: null
            },
            remarks: null
          },
          nitrogenPressureIndicator: {
            result: {
              id: null,
              label: null
            },
            value: null
          }
        },
        during: {
          inletPressureIndicator: {
            result: {
              id: null,
              label: null
            },
            value: null
          },
          pcvMonitorIndicator: {
            result: {
              id: null,
              label: null
            },
            value: null
          },
          pcvAirReferenceIndicator: {
            result: {
              id: null,
              label: null
            },
            value: null
          },
          pdgIndicator: {
            result: {
              id: null,
              label: null
            },
            value: null,
            flowRate: null
          }
        }
      },
      others: {
        operatingHoursRecord: {
          result: {
            id: null,
            label: null
          },
          remarks: null
        },
        rubberBlock: {
          result: {
            id: null,
            label: null
          },
          remarks: null
        },
        oilAbsorbent: {
          result: {
            id: null,
            label: null
          },
          remarks: null
        },
        sightGlass: {
          result: {
            id: null,
            label: null
          },
          remarks: null
        },
        ladderWellness: {
          result: {
            id: null,
            label: null
          },
          remarks: null
        },
        fuelLeaks: {
          result: {
            id: null,
            label: null
          },
          remarks: null
        },
        dustCapInputCoupler: {
          result: {
            id: null,
            label: null
          },
          remarks: null
        },
        bucketWithBondingWire: {
          result: {
            id: null,
            label: null
          },
          remarks: null
        },
        filterSumpsAndTankSumpsDrain: {
          result: {
            id: null,
            label: null
          },
          filterSumps: null,
          tankSumpsDrain: null
        }
      },
      sendApproval: false,
      updatedBy: null,
      updatedAt: null
    },
    /* form: {
      dppu: {
        id: null,
        label: null
      },
      dppuId: null,
      transactionId: "Auto Generated",
      transactionDate: dateFormat(getDate(), "YYYY-MM-DD"),
      equipmentId: null,
      shiftId: null,
      shiftGroup: null,
      cleanliness: {
        result: {
          id: "92953183-CAC1-41EE-83C2-BABDDB966172",
          label: null
        },
        remarks: ""
      },
      truckConditions: {
        fuel: {
          result: {
            id: "92953183-CAC1-41EE-83C2-BABDDB966172",
            label: null
          },
          remarks: ""
        },
        radiatorCondition: {
          result: {
            id: "92953183-CAC1-41EE-83C2-BABDDB966172",
            label: null
          },
          remarks: ""
        },
        lubricant: {
          result: {
            id: "92953183-CAC1-41EE-83C2-BABDDB966172",
            label: null
          },
          remarks: ""
        },
        batteryCondition: {
          result: {
            id: "92953183-CAC1-41EE-83C2-BABDDB966172",
            label: null
          },
          remarks: ""
        },
        brake: {
          result: {
            id: "92953183-CAC1-41EE-83C2-BABDDB966172",
            label: null
          },
          remarks: ""
        },
        generalConditionOfEngine: {
          result: {
            id: "92953183-CAC1-41EE-83C2-BABDDB966172",
            label: null
          },
          remarks: ""
        },
        horn: {
          result: {
            id: "92953183-CAC1-41EE-83C2-BABDDB966172",
            label: null
          },
          remarks: ""
        },
        wiper: {
          result: {
            id: "92953183-CAC1-41EE-83C2-BABDDB966172",
            label: null
          },
          remarks: ""
        },
        headAndTailLampsCondition: {
          result: {
            id: "92953183-CAC1-41EE-83C2-BABDDB966172",
            label: null
          },
          remarks: ""
        },
        signLamps: {
          result: {
            id: "92953183-CAC1-41EE-83C2-BABDDB966172",
            label: null
          },
          remarks: ""
        },
        beaconLight: {
          result: {
            id: "92953183-CAC1-41EE-83C2-BABDDB966172",
            label: null
          },
          remarks: ""
        },
        fuelingLamps: {
          result: {
            id: "92953183-CAC1-41EE-83C2-BABDDB966172",
            label: null
          },
          remarks: ""
        },
        ptoOrHydraulicPump: {
          result: {
            id: "92953183-CAC1-41EE-83C2-BABDDB966172",
            label: null
          },
          remarks: ""
        },
        compressor: {
          result: {
            id: "92953183-CAC1-41EE-83C2-BABDDB966172",
            label: null
          },
          remarks: ""
        },
        mirrors: {
          result: {
            id: "92953183-CAC1-41EE-83C2-BABDDB966172",
            label: null
          },
          remarks: ""
        },
        tires: {
          result: {
            id: "92953183-CAC1-41EE-83C2-BABDDB966172",
            label: null
          },
          remarks: ""
        },
        generalConditionOfTransmission: {
          result: {
            id: "92953183-CAC1-41EE-83C2-BABDDB966172",
            label: null
          },
          remarks: ""
        },
        hydraulicLadderOrPlatform: {
          result: {
            id: "92953183-CAC1-41EE-83C2-BABDDB966172",
            label: null
          },
          remarks: ""
        },
        rearwardGearWarning: {
          result: {
            id: "92953183-CAC1-41EE-83C2-BABDDB966172",
            label: null
          },
          remarks: ""
        }
      },
      tankCondition: {
        stepCondition: {
          result: {
            id: "92953183-CAC1-41EE-83C2-BABDDB966172",
            label: null
          },
          remarks: ""
        },
        jetLevelSensorCondition: {
          result: {
            id: "92953183-CAC1-41EE-83C2-BABDDB966172",
            label: null
          },
          remarks: ""
        },
        pressureVacumValveOrFreeVent: {
          result: {
            id: "92953183-CAC1-41EE-83C2-BABDDB966172",
            label: null
          },
          remarks: ""
        },
        waterDrainLineTank: {
          result: {
            id: "92953183-CAC1-41EE-83C2-BABDDB966172",
            label: null
          },
          remarks: ""
        }
      },
      safetyEquipments: {
        flameTrapCondition: {
          result: {
            id: "92953183-CAC1-41EE-83C2-BABDDB966172",
            label: null
          },
          remarks: ""
        },
        groundingAndOrBondingCableCondition: {
          result: {
            id: "92953183-CAC1-41EE-83C2-BABDDB966172",
            label: null
          },
          remarks: ""
        },
        interlockSystem: {
          result: {
            id: "92953183-CAC1-41EE-83C2-BABDDB966172",
            label: null
          },
          remarks: ""
        },
        sealOverrideInterlockSystem: {
          result: {
            id: "92953183-CAC1-41EE-83C2-BABDDB966172",
            label: null
          },
          remarks: ""
        },
        sealOverrideDeadman: {
          result: {
            id: "92953183-CAC1-41EE-83C2-BABDDB966172",
            label: null
          },
          remarks: ""
        },
        fireExtinguishers: {
          result: {
            id: "92953183-CAC1-41EE-83C2-BABDDB966172",
            label: null
          },
          seal: "1234",
          number: "N123",
          lastChecked: getDate(),
          pressureIndicator: "123"
        },
        safetySigns: {
          result: {
            id: "92953183-CAC1-41EE-83C2-BABDDB966172",
            label: null
          },
          remarks: ""
        },
        safetyCone: {
          result: {
            id: "92953183-CAC1-41EE-83C2-BABDDB966172",
            label: null
          },
          remarks: ""
        }
      },
      refuelingEquipments: {
        before: {
          underwingHosesCondition: {
            rear: {
              result: {
                id: "92953183-CAC1-41EE-83C2-BABDDB966172",
                label: null
              },
              remarks: ""
            },
            front: {
              result: {
                id: "92953183-CAC1-41EE-83C2-BABDDB966172",
                label: null
              },
              remarks: ""
            }
          },
          platformHosesCondition: {
            left: {
              result: {
                id: "92953183-CAC1-41EE-83C2-BABDDB966172",
                label: null
              },
              remarks: ""
            },
            right: {
              result: {
                id: "92953183-CAC1-41EE-83C2-BABDDB966172",
                label: null
              },
              remarks: ""
            }
          },
          flowMeterCondition: {
            result: {
              id: "92953183-CAC1-41EE-83C2-BABDDB966172",
              label: null
            },
            remarks: "",
            calibrationExpiresDate: getDate()
          },
          deadmanControlCondition: {
            result: {
              id: "92953183-CAC1-41EE-83C2-BABDDB966172",
              label: null
            },
            remarks: ""
          },
          inputCouplerCondition: {
            result: {
              id: "92953183-CAC1-41EE-83C2-BABDDB966172",
              label: null
            },
            remarks: ""
          },
          lastFilterChange: {
            result: {
              id: "92953183-CAC1-41EE-83C2-BABDDB966172",
              label: null
            },
            date: getDate()
          },
          pcvAndRegulator: {
            result: {
              id: "92953183-CAC1-41EE-83C2-BABDDB966172",
              label: null
            },
            remarks: ""
          },
          nitrogenPressureIndicator: {
            result: {
              id: "92953183-CAC1-41EE-83C2-BABDDB966172",
              label: null
            },
            value: 123
          }
        },
        during: {
          inletPressureIndicator: {
            result: {
              id: "92953183-CAC1-41EE-83C2-BABDDB966172",
              label: null
            },
            value: 123
          },
          pcvMonitorIndicator: {
            result: {
              id: "92953183-CAC1-41EE-83C2-BABDDB966172",
              label: null
            },
            value: 123
          },
          pcvAirReferenceIndicator: {
            result: {
              id: "92953183-CAC1-41EE-83C2-BABDDB966172",
              label: null
            },
            value: 123
          },
          pdgIndicator: {
            result: {
              id: "92953183-CAC1-41EE-83C2-BABDDB966172",
              label: null
            },
            value: 123,
            flowRate: 2000
          }
        }
      },
      others: {
        operatingHoursRecord: {
          result: {
            id: "92953183-CAC1-41EE-83C2-BABDDB966172",
            label: null
          },
          remarks: ""
        },
        rubberBlock: {
          result: {
            id: "92953183-CAC1-41EE-83C2-BABDDB966172",
            label: null
          },
          remarks: ""
        },
        oilAbsorbent: {
          result: {
            id: "92953183-CAC1-41EE-83C2-BABDDB966172",
            label: null
          },
          remarks: ""
        },
        sightGlass: {
          result: {
            id: "92953183-CAC1-41EE-83C2-BABDDB966172",
            label: null
          },
          remarks: ""
        },
        ladderWellness: {
          result: {
            id: "92953183-CAC1-41EE-83C2-BABDDB966172",
            label: null
          },
          remarks: ""
        },
        fuelLeaks: {
          result: {
            id: "92953183-CAC1-41EE-83C2-BABDDB966172",
            label: null
          },
          remarks: ""
        },
        dustCapInputCoupler: {
          result: {
            id: "92953183-CAC1-41EE-83C2-BABDDB966172",
            label: null
          },
          remarks: ""
        },
        bucketWithBondingWire: {
          result: {
            id: "92953183-CAC1-41EE-83C2-BABDDB966172",
            label: null
          },
          remarks: ""
        },
        filterSumpsAndTankSumpsDrain: {
          result: {
            id: "92953183-CAC1-41EE-83C2-BABDDB966172",
            label: null
          },
          filterSumps: "filter",
          tankSumpsDrain: "tank sumps"
        }
      },
      sendApproval: false,
      updatedBy: null,
      updatedAt: null
    }, */
    currentProgress: {
      locked: null,
      status: null,
      remarks: null,
      nextAction: {
        id: null,
        label: null
      }
    },
    options: {
      dppu: [],
      shift: [],
      checklistResult: []
    }
  }),
  computed: {
    ...mapGetters("personalize", ["multipleDppu", "dppu"]),
    ...mapGetters("auth", ["user"]),
    subTitle() {
      const self = this;
      return self.$route.name != self.route.form
        ? "Update transaction"
        : "Create new transaction";
    },
    textButton() {
      const self = this;
      return self.$route.name != self.route.form ? "Update" : "Save";
    }
  },
  validations: {
    form: {
      dppuId: { required },
      transactionDate: { required },
      equipmentId: { required },
      shiftId: { required },
      shiftGroup: { required },
      cleanliness: {
        result: {
          id: { required }
        }
      },
      truckConditions: {
        fuel: {
          result: {
            id: { required }
          }
        },
        radiatorCondition: {
          result: {
            id: { required }
          }
        },
        lubricant: {
          result: {
            id: { required }
          }
        },
        batteryCondition: {
          result: {
            id: { required }
          }
        },
        brake: {
          result: {
            id: { required }
          }
        },
        generalConditionOfEngine: {
          result: {
            id: { required }
          }
        },
        horn: {
          result: {
            id: { required }
          }
        },
        wiper: {
          result: {
            id: { required }
          }
        },
        headAndTailLampsCondition: {
          result: {
            id: { required }
          }
        },
        signLamps: {
          result: {
            id: { required }
          }
        },
        beaconLight: {
          result: {
            id: { required }
          }
        },
        fuelingLamps: {
          result: {
            id: { required }
          }
        },
        ptoOrHydraulicPump: {
          result: {
            id: { required }
          }
        },
        compressor: {
          result: {
            id: { required }
          }
        },
        mirrors: {
          result: {
            id: { required }
          }
        },
        tires: {
          result: {
            id: { required }
          }
        },
        generalConditionOfTransmission: {
          result: {
            id: { required }
          }
        },
        hydraulicLadderOrPlatform: {
          result: {
            id: { required }
          }
        },
        rearwardGearWarning: {
          result: {
            id: { required }
          }
        }
      },
      tankCondition: {
        stepCondition: {
          result: {
            id: { required }
          }
        },
        jetLevelSensorCondition: {
          result: {
            id: { required }
          }
        },
        pressureVacumValveOrFreeVent: {
          result: {
            id: { required }
          }
        },
        waterDrainLineTank: {
          result: {
            id: { required }
          }
        }
      },
      safetyEquipments: {
        flameTrapCondition: {
          result: {
            id: { required }
          }
        },
        groundingAndOrBondingCableCondition: {
          result: {
            id: { required }
          }
        },
        interlockSystem: {
          result: {
            id: { required }
          }
        },
        sealOverrideInterlockSystem: {
          result: {
            id: { required }
          }
        },
        sealOverrideDeadman: {
          result: {
            id: { required }
          }
        },
        fireExtinguishers: {
          result: {
            id: { required }
          }
        },
        safetySigns: {
          result: {
            id: { required }
          }
        },
        safetyCone: {
          result: {
            id: { required }
          }
        }
      },
      refuelingEquipments: {
        before: {
          underwingHosesCondition: {
            rear: {
              result: {
                id: { required }
              }
            },
            front: {
              result: {
                id: { required }
              }
            }
          },
          platformHosesCondition: {
            left: {
              result: {
                id: { required }
              }
            },
            right: {
              result: {
                id: { required }
              }
            }
          },
          flowMeterCondition: {
            result: {
              id: { required }
            }
          },
          deadmanControlCondition: {
            result: {
              id: { required }
            }
          },
          inputCouplerCondition: {
            result: {
              id: { required }
            }
          },
          lastFilterChange: {
            result: {
              id: { required }
            }
          },
          pcvAndRegulator: {
            result: {
              id: { required }
            }
          },
          nitrogenPressureIndicator: {
            result: {
              id: { required }
            }
          }
        },
        during: {
          inletPressureIndicator: {
            result: {
              id: { required }
            }
          },
          pcvMonitorIndicator: {
            result: {
              id: { required }
            }
          },
          pcvAirReferenceIndicator: {
            result: {
              id: { required }
            }
          },
          pdgIndicator: {
            result: {
              id: { required }
            }
          }
        }
      },
      others: {
        operatingHoursRecord: {
          result: {
            id: { required }
          }
        },
        rubberBlock: {
          result: {
            id: { required }
          }
        },
        oilAbsorbent: {
          result: {
            id: { required }
          }
        },
        sightGlass: {
          result: {
            id: { required }
          }
        },
        ladderWellness: {
          result: {
            id: { required }
          }
        },
        fuelLeaks: {
          result: {
            id: { required }
          }
        },
        dustCapInputCoupler: {
          result: {
            id: { required }
          }
        },
        bucketWithBondingWire: {
          result: {
            id: { required }
          }
        },
        filterSumpsAndTankSumpsDrain: {
          result: {
            id: { required }
          }
        }
      }
    }
  },
  created() {
    const self = this;

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
      self.form.dppuId = self.dppu.id;
      self.changeDppu();
    }

    self.getDefaultEquipment();
    getChecklistResult().then(response => {
      self.options.checklistResult = response;
    });

    if (self.$route.name != self.route.form) {
      self.get();
    }
  },
  methods: {
    dateFormat,
    numberFormat,
    getDate,
    getDefaultEquipment() {
      const self = this;

      self.$store
        .dispatch("apis/get", {
          url: `/equipment`,
          params: {
            dppu: self.form.dppuId,
            pageNumber: 1,
            pageSize: 20,
            category: 6,
            actived: true
          }
        })
        .then(response => {
          if (response.error) {
            self.$message.error({
              zIndex: 10000,
              message: response.message
            });
          } else {
            self.$refs.Equipment.$refs.Equipment.defaultOptions = response.data.data.map(
              x => ({
                id: x.id,
                label: x.code
              })
            );
            self.$refs.Equipment.$refs.Equipment.initialize();
          }
        });
    },
    getEquipmentByCategory({ action, searchQuery, callback }) {
      const self = this;

      if (action === ASYNC_SEARCH) {
        self.$store
          .dispatch("apis/get", {
            url: `/equipment`,
            params: {
              dppu: self.form.dppuId,
              pageNumber: 1,
              pageSize: 20,
              category: 6,
              keyword: searchQuery,
              actived: true
            }
          })
          .then(response => {
            if (response.error) {
              self.$message.error({
                zIndex: 10000,
                message: response.message
              });
            } else {
              callback(
                null,
                response.data.data.map(x => ({
                  id: x.id,
                  label: x.code
                }))
              );
            }
          });
      }
    },
    changeDppu() {
      const self = this;

      self.form.shiftId = null;
      self.options.shift = [];
      if (self.form.dppuId != null) {
        self.$store
          .dispatch("apis/get", {
            url: `/dppu/${self.form.dppuId}`
          })
          .then(response => {
            if (response.error) {
              self.$message.error({
                zIndex: 10000,
                message: response.message
              });
            } else {
              self.options.shift = response.data.shifts.map(x => ({
                id: x.id,
                label: `${x.shiftCallSign} (${x.workingTime.start} - ${x.workingTime.end})`
              }));
            }
          });
      }
    },
    get() {
      const self = this;

      let loader = self.$loading.show();
      self.$store
        .dispatch("apis/get", {
          url: `/board/standard-form/119/${self.$route.params.id}`
        })
        .then(response => {
          if (response.error) {
            self.$message.error({
              zIndex: 10000,
              message: response.message
            });

            self.$router.push({ name: self.route.table });
          } else {
            self.form = {
              dppu: response.data.dppu,
              dppuId: response.data.dppu.id,
              transactionId: response.data.transactionId,
              transactionDate: response.data.transactionDate,
              equipment: response.data.equipment,
              equipmentId: response.data.equipment.id,
              shift: response.data.shift,
              shiftId: response.data.shift.id,
              shiftGroup: response.data.shiftGroup,
              generalCondition: response.data.generalCondition,
              cleanliness: response.data.cleanliness,
              truckConditions: response.data.truckConditions,
              tankCondition: response.data.tankCondition,
              safetyEquipments: response.data.safetyEquipments,
              refuelingEquipments: response.data.refuelingEquipments,
              others: response.data.others,
              updatedBy: response.data.updatedBy,
              updatedAt: response.data.updatedAt
            };
            self.form.transactionDate = self.dateFormat(
              response.data.transactionDate,
              "YYYY-MM-DD"
            );
            self.form.safetyEquipments.fireExtinguishers.lastChecked =
              response.data.safetyEquipments.fireExtinguishers.lastChecked ==
              null
                ? null
                : self.dateFormat(
                    response.data.safetyEquipments.fireExtinguishers
                      .lastChecked,
                    "YYYY-MM-DD"
                  );
            self.form.refuelingEquipments.before.flowMeterCondition.calibrationExpiresDate =
              response.data.refuelingEquipments.before.flowMeterCondition
                .calibrationExpiresDate == null
                ? null
                : self.dateFormat(
                    response.data.refuelingEquipments.before.flowMeterCondition
                      .calibrationExpiresDate,
                    "YYYY-MM-DD"
                  );
            self.form.refuelingEquipments.before.lastFilterChange.date =
              response.data.refuelingEquipments.before.lastFilterChange.date ==
              null
                ? null
                : self.dateFormat(
                    response.data.refuelingEquipments.before.lastFilterChange
                      .date,
                    "YYYY-MM-DD"
                  );

            self.currentProgress = {
              locked: response.data.currentProgress.locked,
              status: response.data.currentProgress.status,
              remarks: response.data.currentProgress.remarks,
              nextAction: {
                id: response.data.currentProgress.nextAction?.id,
                label: response.data.currentProgress.nextAction?.label
              }
            };
          }
        })
        .finally(() => loader.hide());
    },
    handleSubmit() {
      const self = this;

      self.$v.form.$touch();
      if (self.$v.form.$pending || self.$v.form.$error) return;

      let _confirmText = "",
        _okText = "",
        _action = "",
        _url = "";

      if (self.$route.name == self.route.form) {
        _confirmText = "You are about to save this transaction. Are you sure ?";
        _okText = "Yes, Save";
        _action = "apis/post";
        _url = "/board/standard-form/119";
      } else {
        _confirmText =
          "You are about to update this transaction. Are you sure ?";
        _okText = "Yes, Update";
        _action = "apis/put";
        _url = `/board/standard-form/119/${self.$route.params.id}`;
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
              params: self.form
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

                self.$router.go(-1);
              }
            })
            .finally(() => dialog.close());
        });
    },
    handleDelete() {
      const self = this;

      self.$dialog
        .confirm("You are about to delete this transaction. Are you sure ?", {
          okText: "Yes, Delete",
          cancelText: "Cancel",
          loader: true
        })
        .then(dialog => {
          self.$store
            .dispatch("apis/remove", {
              url: `/board/standard-form/119/${self.$route.params.id}`
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

                self.$router.go(-1);
              }
            })
            .finally(() => dialog.close());
        });
    },
    handleSendApproval() {
      const self = this;

      self.$v.form.$touch();
      if (self.$v.form.$pending || self.$v.form.$error) return;

      self.$dialog
        .confirm(
          "You are about to save & send approval this transaction. Are you sure ?",
          {
            okText: "Yes, Send",
            cancelText: "Cancel",
            loader: true
          }
        )
        .then(dialog => {
          self.form.sendApproval = true;

          self.$store
            .dispatch("apis/put", {
              url: `/board/standard-form/119/${self.$route.params.id}`,
              params: self.form
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

                self.$router.go(-1);
              }
            })
            .finally(() => dialog.close());
        });
    },
    handleExport() {
      const self = this;

      self.$dialog
        .confirm("You are about to export this transaction. Are you sure ?", {
          okText: "Yes, Export",
          cancelText: "Cancel",
          loader: true
        })
        .then(dialog => {
          self.$store
            .dispatch("apis/download", {
              url: `/board/export/standard-form/119/${self.$route.params.id}`
            })
            .then(response => {
              if (response.error) {
                self.$message.error({
                  zIndex: 10000,
                  message: response.message
                });
              } else {
                let fileURL = window.URL.createObjectURL(new Blob([response])),
                  fileLink = document.createElement("a");

                fileLink.href = fileURL;
                fileLink.setAttribute("download", "119.xlsx");
                document.body.appendChild(fileLink);

                fileLink.click();
              }
            })
            .finally(() => dialog.close());
        });
    }
  }
};
</script>
