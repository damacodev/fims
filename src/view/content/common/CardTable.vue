<template>
  <div class="card card-custom">
    <div class="card-header py-3">
      <div class="card-title align-items-start flex-column">
        <h3 class="card-label font-weight-bolder text-dark">
          <b-button
            v-if="backButton"
            class="btn-icon mr-2"
            size="xs"
            @click="$router.go(-1)"
          >
            <i class="flaticon2-back" />
          </b-button>
          {{ title }}
        </h3>
        <span
          class="text-muted font-weight-bold font-size-sm mt-1"
          v-bind:class="backButton ? `pl-10` : ``"
        >
          {{ subTitle }}
        </span>
      </div>
      <div class="card-toolbar">
        <slot name="toolbar" />
      </div>
    </div>
    <div class="min-card-h">
      <b-row class="pt-2">
        <b-col xl="8">
          <slot name="info" />
          <b-form-checkbox
            v-if="hasFilter"
            v-model="addFilter"
            button
            button-variant="outline-secondary"
            class="ml-2 mb-2"
          >
            <i class="fas fa-filter"></i> Add Filter
          </b-form-checkbox>
        </b-col>
        <b-col xl="4">
          <b-form
            v-if="!hasSearch && searchText"
            @submit.stop.prevent="onSearch"
            class="ml-2 mr-2 mb-2"
          >
            <b-input-group>
              <b-form-input
                v-model="keyword"
                :placeholder="searchText"
                autocomplete="off"
              ></b-form-input>
              <b-input-group-append>
                <b-input-group-text>
                  <i class="flaticon2-search-1" />
                </b-input-group-text>
              </b-input-group-append>
            </b-input-group>
          </b-form>
          <slot name="search" />
        </b-col>
      </b-row>
      <div v-if="hasFilter" v-show="addFilter">
        <hr class="m-0" />
        <slot name="filter" />
      </div>
      <b-table
        :hover="selectable"
        :selectable="selectable"
        responsive
        :striped="selectable"
        select-mode="single"
        head-variant="light"
        :busy="isLoading"
        :fields="columns"
        :items="rows"
        @row-selected="onRowSelected"
      >
        <template #table-busy>
          <div class="text-center empty">
            <b-button variant="primary" disabled>
              <b-spinner small type="grow"></b-spinner>
              Loading...
            </b-button>
          </div>
        </template>
        <template
          v-for="(_, slotName) of $scopedSlots"
          v-slot:[slotName]="scope"
        >
          <slot :name="slotName" v-bind="scope" />
        </template>
      </b-table>
      <slot v-if="rows.length == 0 && !isLoading" name="empty" />
    </div>
    <div class="pagination-wrapper" v-if="!hideFooter">
      <hr class="m-0" />
      <b-row
        class="px-4 py-3 my-auto m-0 d-flex justify-content-center justify-content-md-between"
      >
        <span class="text-results my-auto">
          Showing {{ showing }} of {{ totalRecords }} results
        </span>
        <div
          class="d-block d-md-flex justify-content-center justify-content-md-between page-item-wrapper"
        >
          <div
            class="d-none text-small-gray-13 d-md-flex align-items-center mr-3 justify-content-center"
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
export default {
  props: {
    title: String,
    subTitle: String,
    searchText: String,
    columns: Array,
    rows: Array,
    pageNumber: [Number, String],
    pageSize: [Number, String],
    totalPage: {
      type: Number,
      default: 0
    },
    totalRecords: {
      type: Number,
      default: 0
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    value: Number,
    hideFooter: {
      type: Boolean,
      default: false
    },
    selectable: {
      type: Boolean,
      default: true
    },
    backButton: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    keyword: null,
    addFilter: true,
    pages: [20, 50, 100]
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
    }
  }
};
</script>
