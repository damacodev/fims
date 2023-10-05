<template>
  <div class="card card-custom">
    <div class="card-header py-3">
      <div class="card-title align-items-start flex-column">
        <h3 class="card-label font-weight-bolder text-dark">
          Transaction Items
        </h3>
      </div>
    </div>
    <div class="card-body">
      <EmptyTable
        v-if="items.length == 0"
        css-class="text-center"
        title="There is no transaction items to displayed here"
        description="Please add some spareparts first"
      />
      <div
        v-else
        v-for="(item, index) in items"
        class="d-flex flex-wrap align-items-center cursor-pointer"
        v-bind:key="item.sparepart.id"
        v-bind:class="{ 'mb-9': lastElement(index) }"
        @click="handleSelected(item.sparepart)"
      >
        <div class="symbol symbol-60 symbol-2by3 flex-shrink-0 mr-4">
          <div
            class="symbol-label"
            :style="
              `background-image:url(${baseUrl + item.sparepart.images[0].url})`
            "
          ></div>
        </div>
        <div class="d-flex flex-column flex-grow-1 my-lg-0 my-2 pr-3">
          <a
            href="javascript:;"
            class="
              text-dark-75
              font-weight-bolder
              text-hover-primary
              font-size-lg
            "
          >
            {{ item.sparepart.code }}
          </a>
          <span class="text-muted font-weight-bold font-size-sm my-1">
            {{ item.sparepart.label }}
          </span>
          <span class="text-muted font-weight-bold font-size-sm">
            Current Stock:
            <span class="text-primary font-weight-bold">
              {{ item.sparepart.currentStock }}
            </span>
          </span>
        </div>
        <div class="d-flex align-items-center py-lg-0 py-2">
          <div class="d-flex flex-column text-right">
            <span class="text-dark-75 font-weight-bolder font-size-h4">
              {{ item.quantity }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="card-footer">
      <b-button
        :disabled="items.length == 0"
        block
        variant="primary"
        size="lg"
        class="mr-2"
        @click="handleSubmit"
      >
        {{ textButton }}
      </b-button>
      <b-button block variant="secondary" size="lg" @click="$router.go(-1)">
        Back
      </b-button>
    </div>
  </div>
</template>

<script>
import { apiUrl } from "@/core/services/api.url";

export default {
  props: {
    route: Object,
    items: Array
  },
  data: () => ({
    baseUrl: apiUrl.prod
  }),
  computed: {
    textButton() {
      const self = this;
      return self.$route.name != self.route.form ? "Save Changes" : "Submit";
    }
  },
  methods: {
    lastElement(i) {
      if (i === this.items.length - 1) {
        return false;
      } else {
        return true;
      }
    },
    handleSelected(params) {
      this.$emit("onSelected", params);
    },
    handleSubmit() {
      this.$emit("onSubmit");
    }
  }
};
</script>
