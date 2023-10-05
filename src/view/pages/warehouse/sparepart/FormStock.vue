<template>
  <div
    id="kt_quick_stock"
    ref="kt_quick_stock"
    class="offcanvas offcanvas-right p-10"
  >
    <div
      class="
        offcanvas-header
        d-flex
        align-items-center
        justify-content-between
        pb-5
      "
    >
      <h3 class="font-weight-bold m-0">{{ title }}</h3>
      <a
        href="#"
        class="btn btn-xs btn-icon btn-light btn-hover-primary"
        id="kt_quick_stock_close"
      >
        <i class="ki ki-close icon-xs text-muted"></i>
      </a>
    </div>

    <perfect-scrollbar
      class="offcanvas-content pr-5 mb-5 mr-n5 scroll"
      style="max-height: 90vh; position: relative"
    >
      <b-form>
        <!-- <RadioGroup
          label="Type"
          v-model="form.stockType"
          :v="$v.form.stockType"
          :use-horizontal="false"
          :options="options.inOut"
        /> -->
        <InputText
          label="Date"
          v-model="form.date"
          type="date"
          :v="$v.form.date"
          :use-horizontal="false"
        />
        <InputText
          label="Quantity"
          v-model="form.quantity"
          type="number"
          :v="$v.form.quantity"
          :use-horizontal="false"
        />
        <TextArea
          label="Remarks"
          v-model="form.remarks"
          :use-horizontal="false"
        />
        <div class="separator separator-dashed mt-8 mb-5"></div>
        <b-button @click="handleSubmit" variant="primary">
          {{ buttonLabel }}
        </b-button>
      </b-form>
    </perfect-scrollbar>
  </div>
</template>

<style lang="scss" scoped>
#kt_quick_stock {
  overflow: hidden;
}
</style>

<script>
import KTLayoutQuickStock from "@/assets/js/layout/extended/quick-stock.js";
import KTOffcanvas from "@/assets/js/components/offcanvas.js";
import { inOut } from "@/core/datasource/options";
import { required, numeric } from "vuelidate/lib/validators";

export default {
  props: {
    title: {
      type: String,
      default: "New Item"
    },
    buttonLabel: {
      type: String,
      default: "Add New"
    },
    form: Object
  },
  data: () => ({
    options: {
      inOut
    }
  }),
  validations: {
    form: {
      date: { required },
      quantity: { required, numeric }
    }
  },
  mounted() {
    const self = this;
    KTLayoutQuickStock.init(self.$refs["kt_quick_stock"]);
  },
  methods: {
    closeForm() {
      this.$v.form.$reset();
      new KTOffcanvas(KTLayoutQuickStock.getElement()).hide();
    },
    showForm() {
      this.$v.form.$reset();
      new KTOffcanvas(KTLayoutQuickStock.getElement()).show();
    },
    handleSubmit() {
      const self = this;

      self.$v.form.$touch();
      if (self.$v.form.$pending || self.$v.form.$error) return;

      self.$emit("handleFormSubmit", self.form);
    }
  }
};
</script>
