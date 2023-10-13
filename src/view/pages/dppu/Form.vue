<template>
  <div>
    <CardForm :title="title" :subTitle="subTitle">
      <template #form>
        <WizardForm
          id="dppu_wizard"
          :labels="['General Information', 'Details', 'Setup Location']"
          :submit="handleSubmit"
          :discard="{ name: 'dppu' }"
          :validator="$v"
        >
          <WizardStep :isCurrent="true">
            <b-row>
              <b-col lg="8" xl="5" offset-xl="4">
                <h5 class="font-weight-bold mb-6">Identity</h5>
              </b-col>
            </b-row>
            <Select
              label="Region"
              v-model="step1.region"
              :v="$v.step1.region"
              :options="options.region"
              :multiple="false"
              @input="chooseRegion"
            />
            <InputText label="Area" v-model="step1.area" :disabled="true" />
            <InputText
              label="Name of DPPU"
              v-model="step1.name"
              :v="$v.step1.name"
            />
            <InputText
              label="Type of DPPU"
              v-model="step1.type"
              :v="$v.step1.type"
            />
            <b-row>
              <b-col lg="8" xl="5" offset-xl="4">
                <h5 class="font-weight-bold mb-6">Contact</h5>
              </b-col>
            </b-row>
            <Phone
              label="Phone Number"
              v-model="step1.phone"
              :default-country-code="defaultCountryCode.phone"
              :update="updatePhone"
            />
            <Phone
              label="Fax"
              v-model="step1.fax"
              :default-country-code="defaultCountryCode.fax"
              :update="updateFax"
            />
            <InputText label="Email" type="email" v-model="step1.email" />
            <b-row>
              <b-col lg="8" xl="5" offset-xl="4">
                <h5 class="font-weight-bold mb-6">Operation</h5>
              </b-col>
            </b-row>
            <form-group
              label="Operating Hours"
              :validator="$v.step1.operatingHours.start"
            >
              <b-row>
                <b-col cols="6">
                  <b-form-timepicker
                    size="lg"
                    class="form-control-solid"
                    now-button
                    reset-button
                    locale="id"
                    placeholder="Start"
                    v-model="step1.operatingHours.start"
                  />
                </b-col>
                <b-col cols="6">
                  <b-form-timepicker
                    size="lg"
                    class="form-control-solid"
                    now-button
                    reset-button
                    locale="id"
                    placeholder="End"
                    v-model="step1.operatingHours.end"
                  />
                </b-col>
              </b-row>
            </form-group>
            <b-row>
              <b-col lg="6" xl="5" offset-xl="4">
                <b-button
                  size="sm"
                  variant="outline-primary"
                  class="mb-2"
                  @click="handleAddShift"
                >
                  Add Shift
                </b-button>
              </b-col>
            </b-row>

            <b-row class="mb-4">
              <b-col lg="6" xl="5" offset-xl="4">
                <b-list-group>
                  <b-list-group-item v-if="step1.shifts.length == 0">
                    No shifts
                  </b-list-group-item>
                  <template v-else>
                    <b-list-group-item
                      v-for="(shift, index) in step1.shifts"
                      v-bind:key="index"
                    >
                      <b-row>
                        <b-col>
                          <InputText
                            label="Shift Call Sign"
                            type="text"
                            v-model="shift.shiftCallSign"
                            :useHorizontal="false"
                          />
                          <form-group
                            label="Working Time"
                            :useHorizontal="false"
                          >
                            <b-row>
                              <b-col cols="6">
                                <b-form-timepicker
                                  size="lg"
                                  class="form-control-solid"
                                  now-button
                                  reset-button
                                  locale="id"
                                  placeholder="Start"
                                  v-model="shift.workingTime.start"
                                />
                              </b-col>
                              <b-col cols="6">
                                <b-form-timepicker
                                  size="lg"
                                  class="form-control-solid"
                                  now-button
                                  reset-button
                                  locale="id"
                                  placeholder="End"
                                  v-model="shift.workingTime.end"
                                />
                              </b-col>
                            </b-row>
                          </form-group>
                          <b-button
                            size="sm"
                            variant="outline-danger"
                            @click="handleRemoveShift(index)"
                          >
                            Remove
                          </b-button>
                        </b-col>
                      </b-row>
                    </b-list-group-item>
                  </template>
                </b-list-group>
              </b-col>
            </b-row>
            <RadioGroup
              v-if="$route.name != route.form"
              v-model="step1.actived"
              label="Status"
              :options="options.status"
            />
          </WizardStep>

          <NextStep :step2="step2" :step3="step3" :validator="$v" />

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
  </div>
</template>

<script>
import NextStep from "./NextStep";
import { required, maxLength } from "vuelidate/lib/validators";
import { status } from "@/core/datasource/options";
import { getRegion, isNullOrEmpty } from "@/core/utils";

export default {
  components: {
    NextStep
  },
  data: () => ({
    title: "Depot Pengisian Pesawat Udara (DPPU)",
    route: {
      form: "dppuCreate",
      table: "dppu"
    },
    step1: {
      region: null,
      area: null,
      name: null,
      type: null,
      phone: null,
      fax: null,
      email: null,
      operatingHours: {
        start: null,
        end: null
      },
      shifts: [],
      actived: true
    },
    step2: {
      plant: null,
      iata: null,
      icao: null,
      mainDppuId: null,
      supplyType: null,
      supplyPoint: null,
      supplyPointDistance: null
    },
    step3: {
      address: null,
      city: null,
      landArea: null,
      landStatus: null
    },
    options: {
      region: [],
      // dppu: [],
      status
    },

    defaultCountryCode: {
      phone: "ID",
      fax: "ID"
    },
    phone: null,
    fax: null
  }),
  validations: {
    step1: {
      region: { required },
      area: { required },
      name: { required },
      type: { required },
      operatingHours: {
        start: { required },
        end: { required }
      }
    },
    step2: {
      plant: { required, maxLength: maxLength(4) },
      supplyType: { required },
      supplyPoint: { required },
      supplyPointDistance: { required }
    },
    step3: {
      address: { required },
      city: { required },
      landArea: { required },
      landStatus: { required }
    }
  },
  computed: {
    subTitle() {
      const self = this;
      return self.$route.name != self.route.form
        ? "Update DPPU information"
        : "Create new DPPU";
    }
  },
  created() {
    const self = this;
    getRegion().then(response => {
      self.options.region = response.data.map(x => ({
        id: x.id,
        label: x.name,
        area: x.area
      }));
    });
    // getDppu().then(response => {
    //   self.options.dppu = response.data.map(x => ({
    //     id: x.id,
    //     label: x.name
    //   }));
    // });

    if (self.$route.name != self.route.form) {
      self.get();
    }
    // self.step1 = {
    //   region: 2,
    //   name: "SMB II",
    //   area: "Sumbagsel",
    //   type: "DPPU Pertamina",
    //   // phone: "+62711385074",
    //   // fax: "+62711385030",
    //   email: "heru.supriyadi@pertamina.com",
    //   operatingHours: {
    //     start: "05:00",
    //     end: "21:00",
    //   },
    // };
    // self.step2 = {
    //   plant: "A103",
    //   iata: "PLM",
    //   icao: "WIPP",
    //   parentId: null,
    //   supplyType: "Bridger",
    //   supplyPoint: "RU III - Plaju",
    //   supplyPointDistance: 40,
    // };
    // self.step3 = {
    //   address: "Jln. Tanjung Api-Api Bandara Internasional SMB II Palembang",
    //   city: "Palembang",
    //   landArea: 17500,
    //   landStatus: "Sewa TNI AU",
    // };
  },
  methods: {
    updatePhone(params) {
      if (params != null) this.phone = params;
    },
    updateFax(params) {
      if (params != null) this.fax = params;
    },
    chooseRegion(params) {
      const self = this;
      self.step1.area = self.options.region.find(x => x.id == params).area;
    },
    get() {
      const self = this;

      let loader = self.$loading.show();
      self.$store
        .dispatch("apis/get", {
          url: `/dppu/${self.$route.params.id}`
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
              region: response.data.region.id,
              area: response.data.region.area,
              name: response.data.name,
              type: response.data.type,
              phone: response.data.phone,
              fax: response.data.fax,
              email: response.data.email,
              operatingHours: response.data.operatingHours,
              shifts: response.data.shifts,
              actived: response.data.actived
            };
            self.step2 = {
              plant: response.data.plant,
              iata: response.data.iata,
              icao: response.data.icao,
              mainDppuId:
                response.data.mainDppu != null
                  ? response.data.mainDppu.id
                  : null,
              supplyType: response.data.supplyType,
              supplyPoint: response.data.supplyPoint,
              supplyPointDistance: response.data.supplyPointDistance
            };
            self.step3 = {
              address: response.data.address,
              city: response.data.city,
              landArea: response.data.landArea,
              landStatus: response.data.landStatus
            };

            if (self.step1.phone != null) {
              self.defaultCountryCode.phone = self.step1.phone.countryCode;
              self.step1.phone = self.step1.phone.formattedNumber;
            }
            if (self.step1.fax != null) {
              self.defaultCountryCode.fax = response.data.fax.countryCode;
              self.step1.fax = self.step1.fax.formattedNumber;
            }
          }
          loader.hide();
        });
    },
    handleSubmit() {
      const self = this;

      self.$v.step1.$touch();
      if (self.$v.step1.$pending || self.$v.step1.$error) return;
      self.$v.step2.$touch();
      if (self.$v.step2.$pending || self.$v.step2.$error) return;
      self.$v.step3.$touch();
      if (self.$v.step3.$pending || self.$v.step3.$error) return;

      let _form = {
        regionId: self.step1.region,
        name: self.step1.name,
        type: self.step1.type,
        phone:
          self.phone != null
            ? {
                countryCode: self.phone.countryCode,
                formattedNumber: self.phone.formattedNumber
              }
            : "",
        fax:
          self.fax != null
            ? {
                countryCode: self.fax.countryCode,
                formattedNumber: self.fax.formattedNumber
              }
            : "",
        email: self.step1.email,
        operatingHours: {
          start: self.step1.operatingHours.start,
          end: self.step1.operatingHours.end
        },
        shifts: self.step1.shifts,
        actived: self.step1.actived,
        plant: self.step2.plant,
        iata: self.step2.iata,
        icao: self.step2.icao,
        mainDppuId: self.step2.mainDppuId,
        supplyType: self.step2.supplyType,
        supplyPoint: self.step2.supplyPoint,
        supplyPointDistance: self.step2.supplyPointDistance,
        address: self.step3.address,
        city: self.step3.city,
        landArea: self.step3.landArea,
        landStatus: self.step3.landStatus
      };

      let _confirmText = "",
        _okText = "",
        _action = "",
        _url = "";

      if (self.$route.name == self.route.form) {
        _confirmText = "You are about to submit this DPPU. Are you sure ?";
        _okText = "Yes, Submit";
        _action = "apis/post";
        _url = "/dppu";
      } else {
        _confirmText = "You are about to update this DPPU. Are you sure ?";
        _okText = "Yes, Update";
        _action = "apis/put";
        _url = `/dppu/${self.$route.params.id}`;
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

                self.$router.go(-1);
              }
            });
        });
    },
    handleDelete() {
      const self = this;

      self.$dialog
        .confirm("You are about to delete this DPPU. Are you sure ?", {
          okText: "Yes, Delete",
          cancelText: "Cancel",
          loader: true
        })
        .then(dialog => {
          self.$store
            .dispatch("apis/remove", {
              url: `/dppu/${self.$route.params.id}`
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

                self.$router.go(-1);
              }
            });
        });
    },
    handleAddShift() {
      const self = this;
      let _next = true;

      if (self.step1.shifts.length > 0) {
        self.step1.shifts.forEach(item => {
          if (
            isNullOrEmpty(item.shiftCallSign) ||
            isNullOrEmpty(item.workingTime.start) ||
            isNullOrEmpty(item.workingTime.end)
          ) {
            _next = false;
          }
        });
      }

      if (!_next) {
        self.$message.warning({
          zIndex: 10000,
          message: "Please complete the shift data first"
        });
      } else {
        self.step1.shifts.push({
          shiftCallSign: "",
          workingTime: {
            start: null,
            end: null
          }
        });
      }
    },
    handleRemoveShift(indexShift) {
      const self = this;

      self.$dialog
        .confirm("You are about to remove this shift. Are you sure ?", {
          okText: "Yes, Remove",
          cancelText: "Cancel",
          loader: true
        })
        .then(dialog => {
          self.step1.shifts.splice(indexShift, 1);
          dialog.close();
        });
    }
  }
};
</script>
