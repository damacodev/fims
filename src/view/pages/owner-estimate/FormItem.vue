<template>
  <div
    id="kt_quick_item_oe"
    ref="kt_quick_item_oe"
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
        @click="closeForm"
      >
        <i class="ki ki-close icon-xs text-muted"></i>
      </a>
    </div>

    <perfect-scrollbar
      class="offcanvas-content pr-5 mb-5 mr-n5 scroll"
      style="max-height: 90vh; position: relative"
    >
      <b-form>
        <InputSuggest
          label="Title"
          v-model="form.title"
          :value="form.title"
          :use-horizontal="false"
          :suggestion-list="suggestionList"
          :v="$v.form.title"
        />
        <form-group
          label="Job Descriptions"
          :useHorizontal="false"
          :validator="$v.form.jobDescriptions"
        >
          <b-input-group class="mb-4">
            <b-input
              v-model="inputText"
              class="form-control-solid"
              autocomplete="off"
              v-on:keyup.enter="addToJobDescriptions"
            />
            <b-input-group-append>
              <b-button @click="addToJobDescriptions">Add</b-button>
            </b-input-group-append>
          </b-input-group>

          <draggable
            v-model="form.jobDescriptions"
            @start="drag = true"
            @end="drag = false"
          >
            <b-alert
              v-for="(item, index) in form.jobDescriptions"
              v-bind:key="item"
              variant="light"
              style="cursor: move"
              show
            >
              {{ item }}
              <b-btn-close
                class="ml-3"
                @click="removeFromJobDescriptions(index)"
              />
            </b-alert>
          </draggable>
        </form-group>
        <InputText
          label="Volume"
          v-model="form.volume"
          type="number"
          :use-horizontal="false"
          :v="$v.form.volume"
        />
        <InputText
          label="Unit of Measure (UoM)"
          v-model="form.uom"
          :use-horizontal="false"
          :v="$v.form.uom"
        />
        <InputText
          label="Location Index (Inkindo)"
          v-model="form.locationIndex"
          type="number"
          :use-horizontal="false"
          :v="$v.form.locationIndex"
        />
        <InputMoney
          label="Material Price"
          v-model="form.materialPrice"
          :value="form.materialPrice"
          :use-horizontal="false"
          :v="$v.form.materialPrice"
        />
        <InputMoney
          label="Service Fee"
          v-model="form.serviceFee"
          :value="form.serviceFee"
          :use-horizontal="false"
          :v="$v.form.serviceFee"
        />
        <div class="separator separator-dashed mt-8 mb-5"></div>
        <b-button @click="handleSubmit" variant="primary">
          {{ buttonLabel }}
        </b-button>
        <b-button
          v-if="deletable"
          @click="handleDelete"
          class="ml-2"
          variant="outline-danger"
        >
          Delete
        </b-button>
      </b-form>
    </perfect-scrollbar>
  </div>
</template>

<style lang="scss" scoped>
#kt_quick_item_oe {
  overflow: hidden;
}
</style>

<script>
import KTLayoutQuickItemOe from "@/assets/js/layout/extended/quick-item-oe.js";
import KTOffcanvas from "@/assets/js/components/offcanvas.js";
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
    deletable: {
      type: Boolean,
      default: false
    },
    suggestionList: {
      type: Array,
      default: () => []
    },
    form: Object,
    itemIndex: Number,
    items: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    inputText: null
  }),
  validations: {
    form: {
      title: { required },
      jobDescriptions: { required },
      volume: { required },
      uom: { required },
      locationIndex: { required },
      materialPrice: { numeric },
      serviceFee: { numeric }
    }
  },
  mounted() {
    KTLayoutQuickItemOe.init(this.$refs["kt_quick_item_oe"]);
  },
  methods: {
    addToJobDescriptions() {
      const self = this;
      self.form.jobDescriptions.push(self.inputText);
      self.inputText = null;
    },
    removeFromJobDescriptions(index) {
      const self = this;
      self.form.jobDescriptions.splice(index, 1);
    },
    closeForm() {
      this.$v.form.$reset();
      new KTOffcanvas(KTLayoutQuickItemOe.getElement()).hide();
    },
    showForm() {
      this.$v.form.$reset();
      new KTOffcanvas(KTLayoutQuickItemOe.getElement()).show();
    },
    handleSubmit() {
      const self = this;

      self.$v.form.$touch();
      if (self.$v.form.$pending || self.$v.form.$error) return;

      self.closeForm();
      if (self.itemIndex == null) {
        let find = self.items.map(x => x.title).lastIndexOf(self.form.title);
        if (find >= 0) self.items.splice(find + 1, 0, self.form);
        else self.items.push(self.form);
      } else {
        self.items[self.itemIndex] = self.form;
      }
    },
    handleDelete() {
      const self = this;
      self.closeForm();
      self.items.splice(self.itemIndex, 1);
    }
  }
};
</script>
