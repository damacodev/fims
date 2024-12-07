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
          v-show="
            $route.name != route.form &&
              !currentProgress.locked &&
              form.workItemId == null
          "
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
      <div class="card-body">
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
            label="Date of Inspection"
            type="date"
            v-model="form.transactionDate"
            :v="$v.form.transactionDate"
          />
          <Select
            ref="Equipment"
            label="Equipment"
            placeholder="Select Equipment"
            v-model="form.equipmentId"
            :v="$v.form.equipmentId"
            :async="true"
            :multiple="false"
            :loadOptions="getEquipmentByCategory"
            :disabled="form.workItemId != null"
          />
          <b-row>
            <b-col lg="8" xl="5" offset-xl="4">
              <h5 class="font-weight-bold mb-6">Underwing Coupling</h5>
            </b-col>
          </b-row>
          <form-group label="Reel">
            <b-row>
              <b-col cols="6">
                <Select
                  label="Reel Front"
                  placeholder="Front"
                  v-model="form.reel.frontId"
                  class="m-0"
                  :options="options.inspection"
                  :multiple="false"
                  :useLabel="false"
                  :useHorizontal="false"
                />
              </b-col>
              <b-col cols="6">
                <Select
                  label="Reel Rear"
                  placeholder="Rear"
                  v-model="form.reel.rearId"
                  class="m-0"
                  :options="options.inspection"
                  :multiple="false"
                  :useLabel="false"
                  :useHorizontal="false"
                />
              </b-col>
            </b-row>
          </form-group>
          <form-group label="Deck">
            <b-row>
              <b-col cols="6">
                <Select
                  label="Deck Left"
                  placeholder="Left"
                  v-model="form.deck.leftId"
                  class="m-0"
                  :options="options.inspection"
                  :multiple="false"
                  :useLabel="false"
                  :useHorizontal="false"
                />
              </b-col>
              <b-col cols="6">
                <Select
                  label="Deck Right"
                  placeholder="Right"
                  v-model="form.deck.rightId"
                  class="m-0"
                  :options="options.inspection"
                  :multiple="false"
                  :useLabel="false"
                  :useHorizontal="false"
                />
              </b-col>
            </b-row>
          </form-group>
          <Select
            label="Overwing Nozzle"
            placeholder="Select Result"
            v-model="form.overwingNozzleId"
            :options="options.inspection"
            :multiple="false"
          />
          <TextArea
            label="Remarks"
            placeholder="Please write your remarks here..."
            type="text"
            v-model="form.remarks"
            :v="$v.form.remarks"
          />
          <b-row v-if="currentProgress.status == 'Rejected'">
            <b-col lg="8" xl="5" offset="4">
              <b-alert show variant="danger">
                <h4 class="alert-heading">Rejected</h4>
                <hr />
                <p class="mb-0">
                  {{ currentProgress.remarks }}
                </p>
              </b-alert>
            </b-col>
          </b-row>
        </template>
        <FormHeader
          v-else
          :form="form"
          :currentProgress="currentProgress"
          :showRemarks="true"
        />
      </div>
    </b-row>
  </div>
</template>

<script>
import { ASYNC_SEARCH } from "@riophae/vue-treeselect";
import { mapGetters } from "vuex";
import FormHeader from "./FormHeader.vue";
import { required, maxLength } from "vuelidate/lib/validators";
import { getDppu, getDate, dateFormat, getInspection } from "@/core/utils";

export default {
  components: {
    FormHeader
  },
  data: () => ({
    title: "205 SF - Hose-End Strainer Check",
    route: {
      form: "sf205Create",
      table: "sf205"
    },
    form: {
      dppu: {
        id: null,
        label: null
      },
      dppuId: null,
      transactionId: "Auto Generated",
      transactionDate: getDate(),
      equipmentId: null,
      reel: {
        frontId: null,
        rearId: null
      },
      deck: {
        leftId: null,
        rightId: null
      },
      overwingNozzleId: null,
      workItemId: null,
      remarks: null,
      sendApproval: false,
      updatedBy: null,
      updatedAt: null
    },
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
      inspection: []
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
      remarks: { maxLength: maxLength(250) }
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
    }

    self.getDefaultEquipment();
    getInspection().then(response => {
      self.options.inspection = response;
    });

    if (self.$route.name != self.route.form) {
      self.get();
    }
  },
  methods: {
    dateFormat,
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
            self.$refs.Equipment.$refs[
              "Equipment"
            ].defaultOptions = response.data.data.map(x => ({
              id: x.id,
              label: x.code
            }));
            self.$refs.Equipment.$refs["Equipment"].initialize();
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
    get() {
      const self = this;

      let loader = self.$loading.show();
      self.$store
        .dispatch("apis/get", {
          url: `/board/standard-form/205/${self.$route.params.id}`
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
              dppuId: response.data.dppu?.id,
              transactionId: response.data.transactionId,
              transactionDate: dateFormat(
                response.data.transactionDate,
                "YYYY-MM-DD"
              ),
              equipment: response.data.equipment,
              equipmentId: response.data.equipment?.id,
              reel: {
                front: response.data.reel?.front,
                frontId: response.data.reel?.front?.id,
                rear: response.data.reel?.rear,
                rearId: response.data.reel?.rear?.id
              },
              deck: {
                left: response.data.deck?.left,
                leftId: response.data.deck?.left?.id,
                right: response.data.deck?.right,
                rightId: response.data.deck?.right?.id
              },
              overwingNozzle: response.data.overwingNozzle,
              overwingNozzleId: response.data.overwingNozzle?.id,
              workItemId: response.data.workItemId,
              remarks: response.data.remarks,
              updatedBy: response.data.updatedBy,
              updatedAt: response.data.updatedAt
            };

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
        _url = "/board/standard-form/205";
      } else {
        _confirmText =
          "You are about to update this transaction. Are you sure ?";
        _okText = "Yes, Update";
        _action = "apis/put";
        _url = `/board/standard-form/205/${self.$route.params.id}`;
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
              url: `/board/standard-form/205/${self.$route.params.id}`
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
              url: `/board/standard-form/205/${self.$route.params.id}`,
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
    }
  }
};
</script>
