<template>
  <div
    id="kt_quick_sparepart"
    ref="kt_quick_sparepart"
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
        id="kt_quick_sparepart_close"
      >
        <i class="ki ki-close icon-xs text-muted"></i>
      </a>
    </div>

    <perfect-scrollbar
      class="offcanvas-content pr-5 mb-5 mr-n5 scroll"
      style="max-height: 90vh; position: relative"
    >
      <b-form>
        <Select
          v-if="mode == 'add'"
          label="Sparepart"
          v-model="form.sparepart"
          :v="$v.form.sparepart"
          :use-horizontal="false"
          :multiple="false"
          :async="true"
          :load-options="loadOptions"
        />
        <InputText
          v-else-if="mode == 'edit'"
          label="Sparepart"
          v-model="form.labelSparepart"
          :use-horizontal="false"
          :disabled="true"
        />
        <InputText
          label="Quantity"
          v-model="form.quantity"
          type="number"
          :v="$v.form.quantity"
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
#kt_quick_sparepart {
  overflow: hidden;
}
</style>

<script>
import KTLayoutQuickSparepart from "@/assets/js/layout/extended/quick-sparepart.js";
import KTOffcanvas from "@/assets/js/components/offcanvas.js";
import { required, numeric } from "vuelidate/lib/validators";

import { ASYNC_SEARCH } from "@riophae/vue-treeselect";

export default {
  props: {
    mode: {
      type: String,
      default: "add"
    },
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
      sparepart: []
    }
  }),
  validations: {
    form: {
      sparepart: { required },
      quantity: { required, numeric }
    }
  },
  mounted() {
    const self = this;
    KTLayoutQuickSparepart.init(self.$refs["kt_quick_sparepart"]);
  },
  methods: {
    loadOptions({ action, searchQuery, callback }) {
      const self = this;
      if (action === ASYNC_SEARCH) {
        self.$store
          .dispatch("apis/get", {
            url: `/sparepart/search`,
            params: {
              keyword: searchQuery
            }
          })
          .then(response => {
            if (response.error) {
              self.$message.error({
                zIndex: 10000,
                message: response.message
              });
            } else {
              callback(null, response.data);
            }
          });
      }
    },
    closeForm() {
      this.$v.form.$reset();
      new KTOffcanvas(KTLayoutQuickSparepart.getElement()).hide();
    },
    showForm() {
      this.$v.form.$reset();
      new KTOffcanvas(KTLayoutQuickSparepart.getElement()).show();
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
