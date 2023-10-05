<template>
  <div>
    <div
      v-if="rows.length == 0 && editable"
      class="d-flex align-items-center justify-content-between mb-2"
    >
      <span class="mr-2">{{ label }}</span>
      <span class="text-right">
        <b-button @click="handleOpenForm" size="sm" variant="outline-primary">
          Add Sparepart
        </b-button>
      </span>
    </div>
    <form-group
      v-else
      :label="label"
      :useHorizontal="false"
      style="margin-bottom: unset !important;"
    >
      <b-table
        ref="tableSparepart"
        :selectable="editable"
        responsive
        bordered
        show-empty
        select-mode="single"
        head-variant="light"
        :fields="columns"
        :items="rows"
        @row-selected="onRowSelected"
      >
        <template #empty>
          <div class="text-center">No spareparts needed</div>
        </template>
        <template #head(action)>
          <b-button @click="handleOpenForm" size="sm" variant="outline-primary">
            Add
          </b-button>
        </template>
        <template #cell(quantity)="data"> {{ data.value }} pcs </template>
        <template #cell(action)="data">
          <b-button
            class="btn-icon btn-light btn-hover-danger"
            size="sm"
            @click="handleRemoveSparepart(data.item.id)"
          >
            <span class="svg-icon svg-icon-md svg-icon-danger">
              <inline-svg
                :src="require('@/assets/media/svg/icons/General/Trash.svg')"
              />
            </span>
          </b-button>
        </template>
      </b-table>
    </form-group>

    <FormSparepart
      v-if="editable"
      ref="formSparepart"
      :mode="formSparepart.mode"
      :title="formSparepart.title"
      :buttonLabel="formSparepart.buttonLabel"
      :form="formSparepart.form"
      @handleFormSubmit="handleFormSubmit"
    />
  </div>
</template>

<script>
import FormSparepart from "./FormSparepart.vue";
import {
  sparepartOnWorkOrder,
  sparepartOnWorkOrderEditable
} from "@/core/datasource/columns";

export default {
  components: {
    FormSparepart
  },
  props: {
    label: {
      type: String,
      default: "Spareparts Needed"
    },
    rows: Array,
    editable: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({
    formSparepart: {
      mode: "add",
      title: "Add Sparepart",
      buttonLabel: "Add New",
      form: {
        sparepart: null,
        quantity: null
      }
    }
  }),
  computed: {
    columns() {
      const self = this;
      return self.editable
        ? sparepartOnWorkOrderEditable
        : sparepartOnWorkOrder;
    }
  },
  methods: {
    handleOpenForm() {
      const self = this;

      if (self.editable) {
        self.formSparepart = {
          mode: "add",
          title: "Add Sparepart",
          buttonLabel: "Add New",
          form: {
            sparepart: null,
            quantity: null
          }
        };
        self.$refs.formSparepart.showForm();
      }
    },
    onRowSelected(params) {
      const self = this;
      if (self.editable) {
        let item = params[0];

        self.formSparepart = {
          mode: "edit",
          title: "Edit Sparepart",
          buttonLabel: "Change",
          form: {
            sparepart: item.id,
            labelSparepart: item.label,
            quantity: item.quantity
          }
        };
        self.$refs.formSparepart.showForm();
        self.$refs.tableSparepart.clearSelected();
      }
    },
    handleFormSubmit(form) {
      const self = this;
      if (self.editable) {
        let _confirmText = "",
          _okText = "";

        if (self.formSparepart.mode == "add") {
          _confirmText = "You are about to add this sparepart. Are you sure ?";
          _okText = "Yes, Add";
        } else if (self.formSparepart.mode == "edit") {
          _confirmText =
            "You are about to change this sparepart. Are you sure ?";
          _okText = "Yes, Change";
        }

        self.$dialog
          .confirm(_confirmText, {
            okText: _okText,
            cancelText: "Cancel",
            loader: true
          })
          .then(dialog => {
            let find = self.rows.findIndex(x => x.id == form.sparepart);

            if (find >= 0) {
              if (self.formSparepart.mode == "add") {
                self.rows[find].quantity =
                  parseInt(form.quantity) + parseInt(self.rows[find].quantity);
              } else if (self.formSparepart.mode == "edit") {
                self.rows[find].quantity = form.quantity;
              }
            } else {
              self.$store
                .dispatch("apis/get", {
                  url: `/sparepart/${form.sparepart}`
                })
                .then(response => {
                  self.rows.push({
                    id: response.data.id,
                    code: response.data.code,
                    label: response.data.label,
                    quantity: form.quantity
                  });
                });
            }

            dialog.close();
            self.$refs.formSparepart.closeForm();
          });
      }
    },
    handleRemoveSparepart(id) {
      const self = this;
      if (self.editable) {
        self.$dialog
          .confirm("You are about to remove this sparepart. Are you sure ?", {
            okText: "Yes, Remove",
            cancelText: "Cancel",
            loader: true
          })
          .then(dialog => {
            let find = self.rows.findIndex(x => x.id == id);
            self.rows.splice(find, 1);
            dialog.close();
          });
      }
    }
  }
};
</script>
