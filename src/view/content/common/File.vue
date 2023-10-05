<template>
  <form-group
    :validator="v"
    :label="label"
    :description="description"
    :use-label="useLabel"
    :use-horizontal="useHorizontal"
  >
    <b-form-file
      slot-scope="{ attrs }"
      v-bind="attrs"
      v-model="model"
      :accept="accept"
      :size="size"
      :multiple="multiple"
      @change="onChange"
    />
  </form-group>
</template>

<script>
export default {
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
    multiple: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: "lg"
    },
    accept: String,
    v: Object,
    value: [File, Array]
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
    onChange(event) {
      this.$emit("onChange", event);
    }
  }
};
</script>
