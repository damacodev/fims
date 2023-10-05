<template>
  <div class="card card-custom">
    <div class="card-header py-3">
      <div class="card-title align-items-start flex-column">
        <h3 class="card-label font-weight-bolder text-dark">
          Sparepart Catalog
        </h3>
      </div>
    </div>
    <div class="card-body">
      <b-row>
        <b-col lg="12">
          <b-input-group>
            <b-form-input
              v-model="keyword"
              :disabled="disabled"
              placeholder="Scan or search sparepart"
              autocomplete="off"
              @input="onSearch"
            ></b-form-input>
            <b-input-group-append>
              <b-input-group-text>
                <i class="fas fa-qrcode" />
              </b-input-group-text>
            </b-input-group-append>
          </b-input-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col lg="12" v-if="rows.length == 0">
          <EmptyTable
            title="There is no spareparts to displayed here"
            description="Please select DPPU first"
          />
        </b-col>
        <b-col lg="12" v-else>
          <b-card-group columns class="mt-5">
            <div
              class="card card-custom"
              v-for="row in rows"
              v-bind:key="row.id"
            >
              <a
                v-if="row.images.length > 0"
                href="javascript:;"
                @click="showImages(row.images)"
              >
                <b-img-lazy
                  v-bind="mainProps"
                  :src="baseUrl + row.images[0].url"
                  class="card-img-top"
                ></b-img-lazy>
              </a>
              <div class="card-header py-3">
                <div class="card-title align-items-start flex-column">
                  <h4 class="card-label font-weight-bolder text-dark">
                    {{ `${row.code}, ${row.label}` }}
                  </h4>
                  <span class="text-muted font-weight-bold font-size-sm mt-1">
                    {{ row.category.label }}
                  </span>
                </div>
                <span class="text-muted font-weight-bold font-size-sm mt-4">
                  Current Stock:
                  <b-badge :variant="row._rowVariant">
                    {{ row.currentStock }}
                  </b-badge>
                </span>
              </div>
              <div class="card-footer">
                <b-btn
                  v-if="form.stockType == 1"
                  block
                  :disabled="row.currentStock == 0"
                  :variant="
                    row.currentStock == 0 ? 'secondary' : 'outline-primary'
                  "
                  size="sm"
                  @click="onSelected(row)"
                >
                  {{ row.currentStock == 0 ? "Out of stock" : "Order" }}
                </b-btn>
                <b-btn
                  v-else
                  block
                  variant="outline-primary"
                  size="sm"
                  @click="onSelected(row)"
                >
                  Add
                </b-btn>
              </div>
            </div>
          </b-card-group>
        </b-col>
      </b-row>
    </div>
    <div class="card-footer">
      <b-row class="d-flex justify-content-center justify-content-md-between">
        <span class="text-results my-auto">
          Showing {{ showing }} of {{ totalRecords }} results
        </span>
        <div
          class="
            d-block d-md-flex
            justify-content-center justify-content-md-between
            page-item-wrapper
          "
        >
          <div
            class="
              d-none
              text-small-gray-13
              d-md-flex
              align-items-center
              mr-3
              justify-content-center
            "
          >
            <span>Per page:</span>
            <span
              v-for="page in pages"
              v-bind:key="page"
              :class="`ml-2 ${page != pageSize ? 'is-link' : ''}`"
              @click="onPerPageChange(page)"
            >
              {{ page }}
            </span>
          </div>
          <b-pagination
            v-model="pageNumber"
            @change="onPageChange"
            :total-rows="totalRecords"
            :per-page="pageSize"
            first-number
            prev-text="Prev"
            next-text="Next"
            last-number
            size="md"
            class="mb-0"
          >
          </b-pagination>
        </div>
      </b-row>
    </div>
  </div>
</template>

<script>
import { apiUrl } from "@/core/services/api.url";

export default {
  props: {
    disabled: Boolean,
    form: Object,
    rows: Array,
    pageNumber: Number,
    pageSize: Number,
    totalPage: {
      type: Number,
      default: 0
    },
    totalRecords: {
      type: Number,
      default: 0
    }
  },
  data: () => ({
    // baseUrl: process.env.NODE_ENV === "production" ? apiUrl.prod : apiUrl.dev,
    baseUrl: apiUrl.prod,
    keyword: null,
    mainProps: {
      center: true,
      fluidGrow: true,
      blank: true,
      blankColor: "#bbb",
      width: 600,
      height: 400,
      class: "my-5"
    },
    pages: [9, 45, 90]
  }),
  computed: {
    model: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      }
    },
    hasFilter() {
      return !!this.$slots["filter"];
    },
    hasSearch() {
      return !!this.$slots["search"];
    },
    showing() {
      const self = this;
      let page = self.pageNumber - 1;
      return self.pageSize * page + self.rows.length;
    }
  },
  methods: {
    onRowSelected(params) {
      this.$emit("onRowSelected", params);
    },
    onPerPageChange(params) {
      this.$emit("onPerPageChange", params);
    },
    onPageChange(params) {
      this.$emit("onPageChange", params);
    },
    onSearch() {
      this.$emit("onSearch", this.keyword);
    },
    onSelected(sparepart) {
      this.$emit("onSelected", sparepart);
    },
    showImages(images) {
      const self = this;
      self.$viewerApi({
        images: images.map(x => `${self.baseUrl}${x.url}`)
      });
    }
  }
};
</script>
