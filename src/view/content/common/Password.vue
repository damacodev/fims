<template>
  <form-group
    :validator="v"
    :label="label"
    :description="description"
    :label-class="labelClass"
    :use-label="useLabel"
    :use-horizontal="useHorizontal"
  >
    <Password
      :placeholder="placeholder"
      :defaultClass="contentClass"
      v-model="model"
      :secureLength="secureLength"
      :toggle="true"
      @feedback="showFeedback"
    />
  </form-group>
</template>

<script>
export default {
  data: () => ({
    suggestions: null
  }),
  props: {
    label: String,
    description: String,
    secureLength: {
      type: Number,
      default: 12
    },
    useLabel: {
      type: Boolean,
      default: true
    },
    useHorizontal: {
      type: Boolean,
      default: true
    },
    placeholder: String,
    size: {
      type: String,
      default: "lg"
    },
    labelClass: {
      type: String,
      default: "pr-5"
    },
    contentClass: {
      type: String,
      default: "form-control form-control-solid form-control-lg"
    },
    v: Object,
    value: String,
    step: [String, Number]
  },
  computed: {
    model: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      }
    }
  },
  methods: {
    showFeedback({ suggestions, warning }) {
      this.$emit("showFeedback", { suggestions, warning });
    }
  }
};
</script>
