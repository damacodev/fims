<template>
  <b-tr>
    <b-td
      class="align-middle text-center"
      v-bind:class="head ? `font-weight-bolder` : ``"
    >
      {{ no }}
    </b-td>
    <b-td class="align-middle" v-bind:class="head ? `font-weight-bolder` : ``">
      {{ label }}
    </b-td>
    <b-td v-bind:class="!buttonVisibility ? `align-middle` : ``" width="300">
      <form-group
        v-if="buttonVisibility"
        label="Result"
        class="mb-0"
        :useLabel="false"
        :useHorizontal="false"
        :validator="validations.result.id"
      >
        <treeselect
          placeholder="Select checklist result"
          v-model="form.result.id"
          :options="options"
          :appendToBody="true"
          v-b-tooltip.html.left
          title="<strong>Checklist Result</strong>"
        />
      </form-group>
      <template v-else>
        <span v-if="form.result.label.length == 0">-</span>
        <span v-else>{{ form.result.label }}</span>
      </template>
    </b-td>
    <b-td v-bind:class="!buttonVisibility ? `align-middle` : ``">
      <fragment v-if="!hasValue">
        <form-group
          v-if="buttonVisibility"
          label="Remarks"
          class="mb-0"
          :useLabel="false"
          :useHorizontal="false"
          :validator="validations.remarks"
        >
          <b-input
            v-model="form.remarks"
            type="text"
            placeholder="Remarks"
            v-b-tooltip.html.left
            title="<strong>Remarks</strong>"
          />
        </form-group>
        <template v-else>
          <span v-if="form.remarks.length == 0">-</span>
          <span v-else>{{ form.remarks }}</span>
        </template>
      </fragment>
      <slot v-else name="value" />
    </b-td>
  </b-tr>
</template>

<script>
export default {
  props: {
    head: {
      type: Boolean,
      default: false
    },
    no: String,
    label: String,
    form: Object,
    options: Array,
    validations: Object,
    buttonVisibility: Boolean
  },
  computed: {
    hasValue() {
      return !!this.$slots["value"];
    }
  }
};
</script>
