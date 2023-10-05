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
        id="kt_quick_item_oe_close"
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
          label="OE Sourcing"
          v-model="form.sourcing.id"
          :v="$v.form.sourcing"
          :use-horizontal="false"
          :options="options.sourcing"
          :multiple="false"
          @input="getOwnerEstimateById"
        />
        <InputText
          label="DPPU"
          v-model="form.sourcing.dppu.label"
          :use-horizontal="false"
          :readonly="true"
          :disabled="true"
        />
        <InputText
          label="Category"
          v-model="form.sourcing.category.label"
          :use-horizontal="false"
          :readonly="true"
          :disabled="true"
        />
        <form-group label="Reference" :useHorizontal="false">
          <b-alert
            v-for="item in form.sourcing.references"
            v-bind:key="item"
            variant="light"
            show
          >
            {{ item }}
          </b-alert>
        </form-group>
        <InputText
          label="Volume"
          v-model="form.volume"
          type="number"
          :use-horizontal="false"
          :v="$v.form.volume"
        />
        <!-- <InputText
          label="Location Index (Inkindo)"
          v-model="form.locationIndex"
          type="number"
          :use-horizontal="false"
          :v="$v.form.locationIndex"
        /> -->
        <InputSuggest
          label="Location Index (Inkindo)"
          description="Type province or suggest your custom index value"
          v-model="form.locationIndex"
          :use-horizontal="false"
          :v="$v.form.locationIndex"
          :suggestionList="options.locationIndex"
          displayAttribute="text"
          @onSuggestSelect="onSuggestSelect"
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
import { required } from "vuelidate/lib/validators";

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
    form: Object,
    itemIndex: Number,
    items: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    options: {
      sourcing: [],
      locationIndex: []
    }
  }),
  validations: {
    form: {
      sourcing: { required },
      volume: { required },
      locationIndex: { required }
    }
  },
  mounted() {
    const self = this;
    KTLayoutQuickItemOe.init(self.$refs["kt_quick_item_oe"]);
    self.getSourcing();
    self.getLocationIndex();
  },
  methods: {
    getSourcing() {
      const self = this;

      self.$store
        .dispatch("apis/get", {
          url: `/ownerestimate/sourcing`
        })
        .then(response => {
          if (response.error) {
            self.$message.error({
              zIndex: 10000,
              message: response.message
            });
          } else {
            self.options.sourcing = response.data;
          }
        });
    },
    getOwnerEstimateById() {
      const self = this;

      if (self.form.sourcing.id != null) {
        let loader = self.$loading.show();
        self.$store
          .dispatch("apis/get", {
            url: `/ownerestimate/${self.form.sourcing.id}`
          })
          .then(response => {
            if (response.error) {
              self.$message.error({
                zIndex: 10000,
                message: response.message
              });
            } else {
              self.form.sourcing = response.data;
            }
            loader.hide();
          });
      }
    },
    getLocationIndex() {
      const self = this;

      self.$store
        .dispatch("apis/get", {
          url: "/locationindex",
          params: {
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
            self.options.locationIndex = response.data.data.map(x => ({
              id: x.id,
              value: x.index,
              text: `${x.province} (${x.index})`
            }));
          }
        });
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

      let _form = self.form;
      if (isNaN(_form.locationIndex)) {
        _form.locationIndex = _form.suggestionIndex;
      }
      delete _form.suggestionIndex;

      if (self.itemIndex == null) {
        let find = self.items.findIndex(
          x => x.sourcing.id == _form.sourcing.id
        );
        if (find >= 0) {
          self.$message.error({
            zIndex: 10000,
            message: "Duplicate entry"
          });
        } else {
          self.items.push(_form);
        }
      } else {
        self.items[self.itemIndex] = _form;
      }
      self.closeForm();
    },
    handleDelete() {
      const self = this;
      self.closeForm();
      self.items.splice(self.itemIndex, 1);
    },
    onSuggestSelect(suggest) {
      this.form.suggestionIndex = suggest.value;
    }
  }
};
</script>
