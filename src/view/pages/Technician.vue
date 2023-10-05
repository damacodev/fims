<template>
  <CardTable
    :title="title"
    :subTitle="subTitle"
    :searchText="searchText"
    :columns="table.columns"
    :rows="table.rows"
    :isLoading="table.isLoading"
    :pageSize="serverParams.pageSize"
    :pageNumber="serverParams.pageNumber"
    :totalPage="table.totalPage"
    :totalRecords="table.totalRecords"
    :selectable="false"
    @onPerPageChange="onPerPageChange"
    @onPageChange="onPageChange"
    @onSearch="onSearch"
  >
    <template #filter>
      <b-row class="p-3">
        <b-col xl="3">
          <treeselect
            class="mb-2"
            placeholder="Select plant"
            v-model="serverParams.dppu"
            :options="options.dppu"
            @input="onFilter"
          />
        </b-col>
        <b-col xl="3">
          <b-form-input
            class="mb-2"
            placeholder="Email"
            type="email"
            v-model="serverParams.email"
            @change="onFilter"
          />
        </b-col>
        <b-col xl="3">
          <b-form-input
            class="mb-2"
            placeholder="Phone number"
            type="tel"
            v-model="serverParams.phone"
            @change="onFilter"
          />
        </b-col>
        <b-col xl="3">
          <treeselect
            class="mb-2"
            placeholder="Select status"
            v-model="serverParams.available"
            :options="options.available"
            :normalizer="normalizer"
            @input="onFilter"
          ></treeselect>
        </b-col>
      </b-row>
    </template>
    <template #empty>
      <EmptyTable
        title="Technician will be displayed here"
        description="All technicians will be displayed on this page"
      />
    </template>
    <template #cell(plant)="data">
      {{ data.item.dppu.map(x => x.label).join(", ") }}
    </template>
    <template #cell(status)="data">
      <span v-show="data.item.available" class="text-success">Available</span>
      <span v-show="!data.item.available" class="text-danger">Unavailable</span>
    </template>
  </CardTable>
</template>

<script>
import { mapGetters } from "vuex";
import { technician as columns } from "@/core/datasource/columns";
import { available } from "@/core/datasource/options";
import { getDppu } from "@/core/utils";

export default {
  data: () => ({
    title: "Technician",
    subTitle: "Display all technician",
    searchText: "Search technician by full name",
    serverParams: {
      pageNumber: 1,
      pageSize: 20,
      keyword: null,
      fullName: null,
      email: null,
      phone: null,
      dppu: null,
      available: null
    },
    table: {
      isLoading: false,
      columns,
      rows: [],
      totalPage: 0,
      totalRecords: 0
    },
    options: {
      available,
      dppu: []
    },
    normalizer(node) {
      return {
        id: node.value,
        label: node.text
      };
    }
  }),
  computed: {
    ...mapGetters("personalize", ["multipleDppu", "dppu"])
  },
  created() {
    const self = this;
    if (self.multipleDppu) {
      getDppu().then(response => {
        self.options.dppu = response.data.map(x => ({
          id: x.id,
          label: x.name
        }));
      });
    } else {
      self.options.dppu = [self.dppu];
    }
    if (self.dppu) {
      self.serverParams.dppu = self.dppu.id;
    }
    self.getAll();
  },
  methods: {
    updateParams(newProps) {
      this.serverParams = Object.assign({}, this.serverParams, newProps);
    },
    onPageChange(params) {
      this.updateParams({ pageNumber: params });
      this.getAll();
    },
    onPerPageChange(params) {
      this.updateParams({ pageSize: params });
      this.getAll();
    },
    onSearch(params) {
      const self = this;
      self.updateParams({
        keyword: params
      });
      self.getAll();
    },
    onFilter() {
      const self = this;
      self.getAll();
    },
    getAll() {
      const self = this;

      self.table.isLoading = true;
      self.$store
        .dispatch("apis/get", {
          url: "/account/technician",
          params: self.serverParams
        })
        .then(response => {
          if (response.error) {
            self.$message.error({
              zIndex: 10000,
              message: response.message
            });
          } else {
            self.table.rows = response.data.data;
            self.table.totalPage = response.data.totalPage;
            self.table.totalRecords = response.data.totalData;
          }
          self.table.isLoading = false;
        });
    }
  }
};
</script>
