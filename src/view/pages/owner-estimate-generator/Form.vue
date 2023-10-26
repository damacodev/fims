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
          v-show="$route.name != route.form"
          variant="outline-danger"
          size="lg"
          class="mr-2"
          @click="handleDelete"
        >
          Delete
        </b-button>
        <b-button
          v-show="$route.name != route.form"
          variant="outline-primary"
          size="lg"
          class="mr-2"
          @click="handleExport()"
        >
          Export
        </b-button>
        <b-button variant="primary" size="lg" @click="handleSubmit">
          {{ textButton }}
        </b-button>
      </div>
    </div>
    <div class="min-card-h">
      <b-row class="p-2">
        <div class="card-body pb-0">
          <b-row>
            <b-col lg="4" v-if="multipleDppu">
              <Select
                label="Depot Pengisian Pesawat Udara"
                v-model="form.dppu"
                :v="$v.form.dppu"
                :options="options.dppu"
                :multiple="false"
                :use-horizontal="false"
              />
            </b-col>
            <b-col lg="8">
              <InputText
                label="Title"
                v-model="form.title"
                size="md"
                :v="$v.form.title"
                :use-horizontal="false"
              />
            </b-col>
          </b-row>
          <b-row>
            <b-col lg="4">
              <InputText
                label="Arranged By"
                v-model="form.arrangedBy.name"
                placeholder="Name"
                :v="$v.form.arrangedBy.name"
                :use-horizontal="false"
              />
            </b-col>
            <b-col lg="4">
              <InputText
                label="Checked By"
                v-model="form.checkedBy.name"
                placeholder="Name"
                :v="$v.form.checkedBy.name"
                :use-horizontal="false"
              />
            </b-col>
            <b-col lg="4">
              <InputText
                label="Approved By"
                v-model="form.approvedBy.name"
                placeholder="Name"
                :v="$v.form.approvedBy.name"
                :use-horizontal="false"
              />
            </b-col>
          </b-row>
          <b-row>
            <b-col lg="4">
              <InputText
                label="Arranged By"
                v-model="form.arrangedBy.position"
                placeholder="Position"
                :v="$v.form.arrangedBy.position"
                :use-horizontal="false"
                :use-label="false"
              />
            </b-col>
            <b-col lg="4">
              <InputText
                label="Checked By"
                v-model="form.checkedBy.position"
                placeholder="Position"
                :v="$v.form.checkedBy.position"
                :use-horizontal="false"
                :use-label="false"
              />
            </b-col>
            <b-col lg="4">
              <InputText
                label="Approved By"
                v-model="form.approvedBy.position"
                placeholder="Position"
                :v="$v.form.approvedBy.position"
                :use-horizontal="false"
                :use-label="false"
              />
            </b-col>
          </b-row>
        </div>
      </b-row>
      <hr />
      <b-row>
        <b-col>
          <b-button
            variant="outline-primary"
            class="ml-2 mb-4"
            @click="handleOpenForm"
          >
            Add New Item
          </b-button>
        </b-col>
      </b-row>
      <div class="min-card-h">
        <TableItem
          :rows="table.rows"
          @onViewSource="onViewSource"
          @onRowSelected="onRowSelected"
          @onRowRemove="onRowRemove"
        />
        <EmptyTable
          v-if="table.rows.length == 0"
          title="Owner estimate sourcing items will be displayed here"
          description="Please add an sourcing items first"
        />
      </div>
    </div>

    <FormItem
      ref="formItem"
      :title="formItem.title"
      :buttonLabel="formItem.buttonLabel"
      :deletable="formItem.deletable"
      :suggestionList="Array.from(new Set(table.rows.map(x => x.title)))"
      :form="formItem.form"
      :itemIndex="formItem.itemIndex"
      :items="table.rows"
    />

    <SourceDetail
      ref="sourceDetail"
      title="Owner Estimate (Pricelist) Sourcing"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import TableItem from "./TableItem.vue";
import FormItem from "./FormItem.vue";
import SourceDetail from "./SourceDetail.vue";
import { required } from "vuelidate/lib/validators";
import { getDppu } from "@/core/utils";

export default {
  components: {
    TableItem,
    FormItem,
    SourceDetail
  },
  data: () => ({
    title: "Owner Estimate (Pricelist) Generator",
    route: {
      form: "ownerEstimateGeneratorCreate",
      table: "ownerEstimateGenerator"
    },
    form: {
      dppu: null,
      title: null,
      arrangedBy: {
        type: 0,
        name: null,
        position: null
      },
      checkedBy: {
        type: 1,
        name: null,
        position: null
      },
      approvedBy: {
        type: 2,
        name: null,
        position: null
      },
      item: []
    },
    table: {
      rows: []
    },
    options: {
      dppu: []
    },
    formItem: {
      title: "New Item",
      buttonLabel: "Add New",
      deletable: false,
      form: {
        sourcing: {
          id: null,
          dppu: {
            label: null
          },
          category: {
            label: null
          },
          title: null,
          references: [],
          details: []
        },
        volume: null,
        suggestionIndex: null,
        locationIndex: null
      },
      itemIndex: null
    }
  }),
  computed: {
    ...mapGetters("personalize", ["multipleDppu", "dppu", "signature"]),
    subTitle() {
      const self = this;
      return self.$route.name != self.route.form
        ? "Update owner estimate"
        : "Generate new owner estimate";
    },
    textButton() {
      const self = this;
      return self.$route.name != self.route.form
        ? "Save Changes & Export"
        : "Submit & Export";
    }
  },
  validations: {
    form: {
      dppu: { required },
      title: { required },
      arrangedBy: {
        name: { required },
        position: { required }
      },
      checkedBy: {
        name: { required },
        position: { required }
      },
      approvedBy: {
        name: { required },
        position: { required }
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
      self.form.dppu = self.dppu.id;
    }

    if (self.$route.name != self.route.form) {
      self.get();
    } else {
      if (self.signature) {
        self.form.arrangedBy.name = self.signature.find(x => x.type == 0).name;
        self.form.arrangedBy.position = self.signature.find(
          x => x.type == 0
        ).position;

        self.form.checkedBy.name = self.signature.find(x => x.type == 1).name;
        self.form.checkedBy.position = self.signature.find(
          x => x.type == 1
        ).position;

        self.form.approvedBy.name = self.signature.find(x => x.type == 2).name;
        self.form.approvedBy.position = self.signature.find(
          x => x.type == 2
        ).position;
      }
    }
  },
  methods: {
    get() {
      const self = this;

      let loader = self.$loading.show();
      self.$store
        .dispatch("apis/get", {
          url: `/ownerestimate/generator/${self.$route.params.id}`
        })
        .then(response => {
          if (response.error) {
            self.$message.error({
              zIndex: 10000,
              message: response.message
            });

            self.$router.push({ name: self.route.table });
          } else {
            self.form.dppu = response.data.dppu.id;
            self.form.title = response.data.title;
            self.table.rows = response.data.details;

            if (response.data.signatures.length > 0) {
              self.form.arrangedBy.name = response.data.signatures.find(
                x => x.type.id == 0
              ).name;
              self.form.arrangedBy.position = response.data.signatures.find(
                x => x.type.id == 0
              ).position;

              self.form.checkedBy.name = response.data.signatures.find(
                x => x.type.id == 1
              ).name;
              self.form.checkedBy.position = response.data.signatures.find(
                x => x.type.id == 1
              ).position;

              self.form.approvedBy.name = response.data.signatures.find(
                x => x.type.id == 2
              ).name;
              self.form.approvedBy.position = response.data.signatures.find(
                x => x.type.id == 2
              ).position;
            }
          }
          loader.hide();
        });
    },
    onViewSource(params) {
      const self = this;
      self.$refs.sourceDetail.showForm(params);
    },
    handleOpenForm() {
      const self = this;

      self.formItem = {
        title: "New Item",
        buttonLabel: "Add New",
        deletable: false,
        form: {
          sourcing: {
            id: null,
            dppu: {
              label: null
            },
            category: {
              label: null
            },
            title: null,
            references: [],
            details: []
          },
          volume: null,
          locationIndex: null
        }
      };
      self.formItem.itemIndex = null;
      self.$refs.formItem.showForm();
    },
    onRowSelected(params) {
      const self = this;
      let item = Object.assign({}, params, {});

      self.formItem = {
        title: "Update Item",
        buttonLabel: "Update",
        deletable: true,
        form: item
      };
      let find = self.table.rows.findIndex(
        x => x.sourcing.id == item.sourcing.id
      );
      self.formItem.itemIndex = find;

      self.$refs.formItem.showForm();
    },
    onRowRemove(index) {
      const self = this;

      self.$dialog
        .confirm(
          "You are about to remove this row from current owner estimate. Are you sure ?",
          {
            okText: "Yes, Remove",
            cancelText: "Cancel",
            loader: true
          }
        )
        .then(dialog => {
          self.table.rows.splice(index, 1);
          dialog.close();
        });
    },
    handleSubmit() {
      const self = this;

      self.$v.form.$touch();
      if (self.$v.form.$pending || self.$v.form.$error) return;

      if (self.table.rows.length == 0) {
        self.$message.warning({
          zIndex: 10000,
          message: "Sourcing must not be empty."
        });
        return;
      }

      let _confirmText = "",
        _okText = "",
        _action = "",
        _url = "";

      if (self.$route.name == self.route.form) {
        _confirmText =
          "You are about to submit & export this owner estimate. Are you sure ?";
        _okText = "Yes, Submit";
        _action = "apis/post";
        _url = "/ownerestimate/generator";
      } else {
        _confirmText =
          "You are about to export this owner estimate. Are you sure ?";
        _okText = "Yes, Update";
        _action = "apis/put";
        _url = `/ownerestimate/generator/${self.$route.params.id}`;
      }

      let _form = {
        dppuId: self.form.dppu,
        title: self.form.title,
        arrangedBy: self.form.arrangedBy,
        checkedBy: self.form.checkedBy,
        approvedBy: self.form.approvedBy,
        details: self.table.rows.map(x => ({
          ownerEstimateId: x.sourcing.id,
          volume: x.volume,
          locationIndex: x.locationIndex
        })),
        signatures: [
          self.form.arrangedBy,
          self.form.checkedBy,
          self.form.approvedBy
        ]
      };

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

                self.$store.dispatch("personalize/updateSignature", [
                  self.form.arrangedBy,
                  self.form.checkedBy,
                  self.form.approvedBy
                ]);
                self.handleExport(response.data.id);

                self.$router.go(-1);
              }
            });
        });
    },
    handleDelete() {
      const self = this;

      self.$dialog
        .confirm(
          "You are about to delete this owner estimate. Are you sure ?",
          {
            okText: "Yes, Delete",
            cancelText: "Cancel",
            loader: true
          }
        )
        .then(dialog => {
          self.$store
            .dispatch("apis/remove", {
              url: `/ownerestimate/${self.$route.params.id}`
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
    handleExport(id) {
      const self = this;

      self.$store
        .dispatch("apis/download", {
          url: `/ownerestimate/export/${id ?? self.$route.params.id}`
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
            fileLink.setAttribute("download", "OEGenerator.xlsx");
            document.body.appendChild(fileLink);

            fileLink.click();
          }
        });
    }
  }
};
</script>
