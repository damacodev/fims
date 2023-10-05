<template>
  <form-group
    :validator="v"
    :label="label"
    :description="description"
    :label-class="labelClass"
    :use-label="useLabel"
    :use-horizontal="useHorizontal"
  >
    <date-range-picker
      :disabled="disabled"
      v-model="dateRange"
      style="width: 100%; cursor: pointer"
      opens="center"
      :locale-data="{ format: 'dd/mm/yyyy', separator: ' to ' }"
      @input="v.$touch()"
      :control-container-class="
        `form-control ${
          validate() == false
            ? 'is-invalid'
            : validate() == true
            ? 'is-valid'
            : null
        }`
      "
    />
    <template v-if="validate() == false">
      <div class="invalid-feedback" style="display: inline !important">
        {{ label }} must not be empty
      </div>
    </template>
  </form-group>
</template>

<script>
import DateRangePicker from "vue2-daterange-picker";
import "vue2-daterange-picker/dist/vue2-daterange-picker.css";

export default {
  components: {
    DateRangePicker
  },
  props: {
    label: String,
    description: String,
    useLabel: {
      type: Boolean,
      default: true
    },
    useHorizontal: {
      type: Boolean,
      default: true
    },
    labelClass: {
      type: String,
      default: "pr-5"
    },
    value: Object,
    v: Object,
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    dateRange: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      }
    }
  },
  methods: {
    validate() {
      const self = this;
      if (self.v) {
        return self.v.startDate.$dirty ? !self.v.startDate.$error : null;
      }

      return null;
    },
    update(event) {
      this.v.$touch();
      this.$emit("input", event);
    }
  }
};
</script>
