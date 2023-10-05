<template>
  <div
    id="kt_quick_detail_oe"
    ref="kt_quick_detail_oe"
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
      <h3 class="font-weight-bold m-0">Owner Estimate (Pricelist) Sourcing</h3>
      <a
        href="#"
        class="btn btn-xs btn-icon btn-light btn-hover-primary"
        id="kt_quick_detail_oe_close"
      >
        <i class="ki ki-close icon-xs text-muted"></i>
      </a>
    </div>

    <perfect-scrollbar
      class="offcanvas-content pr-5 mb-5 mr-n5 scroll"
      style="max-height: 90vh; position: relative"
    >
      <b-form>
        <InputText
          label="DPPU"
          v-model="sourcing.dppu.label"
          :use-horizontal="false"
          :readonly="true"
          :disabled="true"
        />
        <InputText
          label="Category"
          v-model="sourcing.category.label"
          :use-horizontal="false"
          :readonly="true"
          :disabled="true"
        />
        <InputText
          label="Title"
          v-model="sourcing.title"
          :use-horizontal="false"
          :readonly="true"
          :disabled="true"
        />
        <form-group label="Reference" :useHorizontal="false">
          <b-alert
            v-for="item in sourcing.references"
            v-bind:key="item"
            variant="light"
            show
          >
            {{ item }}
          </b-alert>
        </form-group>
      </b-form>
    </perfect-scrollbar>
  </div>
</template>

<style lang="scss" scoped>
#kt_quick_detail_oe {
  overflow: hidden;
}
</style>

<script>
import KTLayoutQuickDetailOe from "@/assets/js/layout/extended/quick-detail-oe.js";
import KTOffcanvas from "@/assets/js/components/offcanvas.js";

export default {
  data: () => ({
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
    }
  }),
  mounted() {
    const self = this;
    KTLayoutQuickDetailOe.init(self.$refs["kt_quick_detail_oe"]);
  },
  methods: {
    showForm(params) {
      const self = this;
      new KTOffcanvas(KTLayoutQuickDetailOe.getElement()).show();
      self.sourcing = params;
    }
  }
};
</script>
