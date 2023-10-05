<template>
  <form-group
    :validator="v"
    :label="label"
    :description="description"
    :label-class="labelClass"
    :use-label="useLabel"
    :use-horizontal="useHorizontal"
  >
    <vue-simple-suggest
      v-model="model"
      :list="suggestionList"
      :filter-by-query="true"
      :display-attribute="displayAttribute"
      type="search"
      @select="onSuggestSelect"
    >
      <template v-for="(_, slotName) of $scopedSlots" v-slot:[slotName]="scope">
        <slot :name="slotName" v-bind="scope" />
      </template>
      <!-- <slot name="toolbar" /> -->
    </vue-simple-suggest>
  </form-group>
</template>

<script>
import VueSimpleSuggest from "vue-simple-suggest";
import "vue-simple-suggest/dist/styles.css";

export default {
  components: {
    VueSimpleSuggest
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
    v: Object,
    value: [String, Number],
    suggestionList: Array,
    displayAttribute: String
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
    onSuggestSelect(suggest) {
      this.$emit("onSuggestSelect", suggest);
    }
  }
};
</script>
