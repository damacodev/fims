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
    @onRowSelected="onRowSelected"
    @onPerPageChange="onPerPageChange"
    @onPageChange="onPageChange"
    @onSearch="onSearch"
  >
    <template #toolbar>
      <b-button
        variant="primary"
        :to="{ name: 'ownerEstimateGeneratorCreate' }"
      >
        Generate New Owner Estimate
      </b-button>
    </template>
    <template #filter>
      <b-row class="p-3">
        <b-col xl="3">
          <treeselect
            class="mb-2"
            placeholder="Select DPPU"
            v-model="serverParams.dppu"
            :options="options.dppu"
            @input="onFilter"
          />
        </b-col>
      </b-row>
    </template>
    <template #empty>
      <EmptyTable
        :title="title"
        description="You can generate owner estimate here"
        button-label="Generate New Owner Estimate"
        :href="{ name: 'ownerEstimateGeneratorCreate' }"
      />
    </template>
    <template #cell(equipments)="data">
      {{ data.item.equipments.map(x => x.label).join(", ") }}
    </template>
    <template #cell(startDate)="data">
      {{ dateFormat(data.item.startDate) }}
    </template>
  </CardTable>
</template>

<script>
import { mapGetters } from "vuex";
import { ownerEstimateGenerator as columns } from "@/core/datasource/columns";
import { getDppu, dateFormat } from "@/core/utils";

export default {
  data: () => ({
    title: "Owner Estimate (Pricelist) Generator",
    subTitle: "Display all owner estimate",
    searchText: "Search by title",
    serverParams: {
      pageNumber: 1,
      pageSize: 20,
      keyword: null,
      dppu: null,
      actived: null
    },
    table: {
      isLoading: false,
      columns,
      rows: [],
      totalPage: 0,
      totalRecords: 0
    },
    options: {
      dppu: []
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
    dateFormat,
    updateParams(newProps) {
      this.serverParams = Object.assign({}, this.serverParams, newProps);
    },
    onRowSelected(items) {
      const self = this;
      self.$router.push({
        name: "ownerEstimateGeneratorUpdate",
        params: {
          id: items[0].id
        }
      });
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
          url: `/ownerestimate/generator`,
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
