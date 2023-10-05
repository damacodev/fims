<template>
  <div>
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
        href="javascript:;"
        class="btn btn-xs btn-icon btn-light btn-hover-primary"
        id="kt_quick_dailystock_close"
        @click="handleCloseModal"
      >
        <i class="ki ki-close icon-xs text-muted"></i>
      </a>
    </div>

    <perfect-scrollbar
      class="offcanvas-content pr-5 mb-5 mr-n5 scroll"
      style="max-height: 90vh; position: relative"
    >
      <b-form>
        <a
          v-if="form.sparepart.images.length > 0"
          href="javascript:;"
          @click="showImages(form.sparepart.images)"
        >
          <b-img-lazy
            v-bind="mainProps"
            :src="baseUrl + form.sparepart.images[0].url"
          ></b-img-lazy>
        </a>
        <InputText
          label="Sparepart Code"
          v-model="form.sparepart.code"
          type="text"
          disabled
          :use-horizontal="false"
        />
        <InputText
          label="Sparepart Label"
          v-model="form.sparepart.label"
          type="text"
          disabled
          :use-horizontal="false"
        />
        <InputText
          label="Current Stock"
          v-model="form.sparepart.currentStock"
          type="number"
          disabled
          :use-horizontal="false"
        />
        <InputText
          label="Quantity"
          v-model="form.quantity"
          type="number"
          :v="$v.form.quantity"
          :use-horizontal="false"
          :min="0"
          :max="form.sparepart.currentStock"
        />
        <div class="separator separator-dashed mt-8 mb-5"></div>
        <b-row>
          <b-col
            lg="12"
            class="d-flex justify-content-center justify-content-md-between"
          >
            <b-button @click="handleSubmit" variant="primary">
              {{ buttonLabel }}
            </b-button>
            <b-button
              v-if="mode == 'edit'"
              @click="handleDelete"
              class="justify-content-center"
              variant="outline-danger"
            >
              Delete
            </b-button>
          </b-col>
        </b-row>
      </b-form>
    </perfect-scrollbar>
  </div>
</template>

<style lang="scss" scoped>
#kt_quick_dailystock {
  overflow: hidden;
}
</style>

<script>
import {
  required,
  numeric,
  minValue,
  maxValue
} from "vuelidate/lib/validators";
import { apiUrl } from "@/core/services/api.url";

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
    baseUrl: apiUrl.prod,
    options: {
      sparepart: []
    },
    mainProps: {
      center: true,
      blank: true,
      blankColor: "#bbb",
      height: 150,
      class: "my-5"
    }
  }),
  validations() {
    const self = this;

    if (self.form.stockType == 1) {
      return {
        form: {
          quantity: {
            required,
            numeric,
            minValue: minValue(0),
            maxValue: maxValue(self.form.sparepart.currentStock)
          }
        }
      };
    } else {
      return {
        form: {
          quantity: {
            required,
            numeric,
            minValue: minValue(0)
          }
        }
      };
    }
  },
  methods: {
    handleResetForm() {
      this.$v.form.$reset();
    },
    handleCloseModal() {
      this.handleResetForm();
      this.$emit("onClose");
    },
    showImages(images) {
      const self = this;
      self.$viewerApi({
        images: images.map(x => `${self.baseUrl}${x.url}`)
      });
    },
    handleSubmit() {
      const self = this;

      self.$v.form.$touch();
      if (self.$v.form.$pending || self.$v.form.$error) return;

      self.$emit("onSubmit", self.form);
    },
    handleDelete() {
      const self = this;
      self.$emit("onDelete", self.form);
    }
  }
};
</script>
