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
          class="mr-10"
          @click="handleDelete"
        >
          Delete
        </b-button>
        <b-button variant="primary" size="lg" @click="handleSubmit">
          {{ textButton }}
        </b-button>
      </div>
    </div>
    <div class="min-card-h">
      <b-row class="p-2">
        <div class="card-body pb-0">
          <Select
            v-if="multipleDppu"
            label="Depot Pengisian Pesawat Udara"
            v-model="form.dppu"
            :v="$v.form.dppu"
            :options="options.dppu"
            :multiple="false"
          />
          <Select
            label="Category"
            v-model="form.category"
            :v="$v.form.category"
            :options="options.category"
            :normalizer="normalizer"
            :multiple="false"
          />
          <InputText label="Title" v-model="form.title" :v="$v.form.title" />
          <form-group label="Reference">
            <b-input-group class="mb-4">
              <b-input
                v-model="inputText"
                class="form-control-solid"
                size="lg"
                v-on:keyup.enter="addToReferences"
              />
              <b-input-group-append>
                <b-button @click="addToReferences">Add</b-button>
              </b-input-group-append>
            </b-input-group>

            <draggable
              v-model="form.references"
              @start="drag = true"
              @end="drag = false"
            >
              <b-alert
                v-for="(item, index) in form.references"
                v-bind:key="item"
                variant="light"
                style="cursor: move"
                show
              >
                {{ item }}
                <b-btn-close
                  class="ml-3"
                  @click="removeFromReferences(index)"
                />
              </b-alert>
            </draggable>
          </form-group>
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
          @onRowRemove="onRowRemove"
          @onRowSelected="onRowSelected"
        />
        <EmptyTable
          v-if="table.rows.length == 0"
          title="Owner estimate items will be displayed here"
          description="Please add an items first"
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
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import TableItem from "./TableItem.vue";
import FormItem from "./FormItem.vue";
import { required } from "vuelidate/lib/validators";
import { category, years } from "@/core/datasource/options";
import { getDppu, numberFormat } from "@/core/utils";

export default {
  components: {
    TableItem,
    FormItem
  },
  data: () => ({
    title: "Owner Estimate (Pricelist) Sourcing",
    route: {
      form: "ownerEstimateCreate",
      table: "ownerEstimate"
    },
    form: {
      dppu: null,
      category: null,
      title: null,
      references: [],
      item: []
    },
    table: {
      rows: []
    },
    normalizer(node) {
      return {
        id: node.value,
        label: node.text
      };
    },
    options: {
      dppu: [],
      category,
      years
    },
    inputText: null,
    formItem: {
      title: "New Item",
      buttonLabel: "Add New",
      deletable: false,
      form: {
        title: "",
        jobDescriptions: [],
        volume: null,
        uom: null,
        locationIndex: null,
        materialPrice: 0,
        serviceFee: 0
      },
      itemIndex: null
    }
  }),
  computed: {
    ...mapGetters("personalize", ["multipleDppu", "dppu"]),
    subTitle() {
      const self = this;
      return self.$route.name != self.route.form
        ? "Update owner estimate"
        : "Create new owner estimate";
    },
    textButton() {
      const self = this;
      return self.$route.name != self.route.form ? "Save Changes" : "Submit";
    }
  },
  validations: {
    form: {
      dppu: { required },
      category: { required },
      title: { required }
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
    }
  },
  methods: {
    numberFormat,
    addToReferences() {
      const self = this;
      self.form.references.push(self.inputText);
      self.inputText = null;
    },
    removeFromReferences(index) {
      const self = this;
      self.form.references.splice(index, 1);
    },
    get() {
      const self = this;

      let loader = self.$loading.show();
      self.$store
        .dispatch("apis/get", {
          url: `/ownerestimate/${self.$route.params.id}`
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
            self.form.category = response.data.category.id;
            self.form.title = response.data.title;
            self.form.references = response.data.references;
            self.table.rows = response.data.details;
          }
          loader.hide();
        });
    },
    handleOpenForm() {
      const self = this;

      self.formItem = {
        title: "New Item",
        buttonLabel: "Add New",
        deletable: false,
        form: {
          title: "",
          jobDescriptions: [],
          volume: null,
          uom: null,
          locationIndex: null,
          materialPrice: 0,
          serviceFee: 0
        }
      };
      self.formItem.itemIndex = null;
      self.$refs.formItem.showForm();
    },
    onRowSelected(item) {
      const self = this;

      self.formItem = {
        title: "Update Item",
        buttonLabel: "Update",
        deletable: true,
        form: item
      };
      let find = self.table.rows.findIndex(
        x =>
          x.title == item.title &&
          x.jobDescriptions == item.jobDescriptions &&
          x.volume == item.volume &&
          x.uom == item.uom &&
          x.locationIndex == item.locationIndex &&
          x.materialPrice == item.materialPrice &&
          x.serviceFee == item.serviceFee
      );
      self.formItem.itemIndex = find;

      self.$refs.formItem.showForm();
    },
    handleSubmit() {
      const self = this;

      self.$v.form.$touch();
      if (self.$v.form.$pending || self.$v.form.$error) return;

      if (self.table.rows.length == 0) {
        self.$message.warning({
          zIndex: 10000,
          message: "Job Descriptions must not be empty."
        });
        return;
      }

      let _confirmText = "",
        _okText = "",
        _action = "",
        _url = "";

      if (self.$route.name == self.route.form) {
        _confirmText =
          "You are about to submit this owner estimate. Are you sure ?";
        _okText = "Yes, Submit";
        _action = "apis/post";
        _url = "/ownerestimate";
      } else {
        _confirmText =
          "You are about to update this owner estimate. Are you sure ?";
        _okText = "Yes, Update";
        _action = "apis/put";
        _url = `/ownerestimate/${self.$route.params.id}`;
      }

      let _form = {
        dppuId: self.form.dppu,
        category: self.form.category,
        title: self.form.title,
        references: self.form.references,
        details: self.table.rows
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
    }
  }
};
</script>
