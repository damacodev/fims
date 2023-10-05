<template>
  <CardTable
    :title="title"
    :subTitle="subTitle"
    :searchText="searchText"
    :columns="columns"
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
      <b-button-group v-if="user.email == 'habeb@damaco.dev'">
        <b-button variant="outline-primary" :to="{ name: 'equipmentImport' }">
          Import Excel File
        </b-button>
        <b-button variant="primary" :to="{ name: 'equipmentCreate' }">
          Create New Equipment
        </b-button>
      </b-button-group>
      <b-button v-else variant="primary" :to="{ name: 'equipmentCreate' }">
        Create New Equipment
      </b-button>
    </template>
    <template #filter>
      <b-row class="p-3">
        <b-col xl="6">
          <treeselect
            class="mb-2"
            placeholder="Select DPPU"
            v-model="serverParams.dppu"
            :options="options.dppu"
            @input="onFilter"
          ></treeselect>
        </b-col>
        <b-col xl="6">
          <treeselect
            class="mb-2"
            placeholder="Select status"
            v-model="serverParams.actived"
            :options="options.status"
            :normalizer="normalizer"
            @input="onFilter"
          ></treeselect>
        </b-col>
      </b-row>
    </template>
    <template #empty>
      <EmptyTable
        :title="title"
        description="You can add or make changes the equipments and let Admin to verify it"
        button-label="Create New Equipment"
        :href="{ name: 'equipmentCreate' }"
      />
    </template>
    <template #cell(pipeline)="data">
      <span v-show="data.item.detail.pipeline">Yes</span>
      <span v-show="!data.item.detail.pipeline">No</span>
    </template>
    <template #cell(hydrantSystem)="data">
      <span v-show="data.item.detail.hydrantSystem">Yes</span>
      <span v-show="!data.item.detail.hydrantSystem">No</span>
    </template>
    <template #cell(pipelinePressureTest)="data">
      <span v-show="data.item.detail.pipelinePressureTest">Yes</span>
      <span v-show="!data.item.detail.pipelinePressureTest">No</span>
    </template>
    <template #cell(valveVisualInspection)="data">
      <span v-show="data.item.detail.valveVisualInspection">Yes</span>
      <span v-show="!data.item.detail.valveVisualInspection">No</span>
    </template>
    <template #cell(actived)="data">
      <span v-show="data.item.actived" class="text-success">Active</span>
      <span v-show="!data.item.actived" class="text-danger">Inactive</span>
    </template>
  </CardTable>
</template>

<script>
import { mapGetters } from "vuex";
import { category, status } from "@/core/datasource/options";
import { equipment as columns } from "@/core/datasource/columns";
import { getDppu } from "@/core/utils";

export default {
  data: () => ({
    subTitle: "Display all equipments",
    searchText: "Search equipments",
    serverParams: {
      pageNumber: 1,
      pageSize: 20,
      dppu: null,
      category: null,
      keyword: null,
      actived: null
    },
    table: {
      isLoading: false,
      rows: [],
      totalPage: 0,
      totalRecords: 0
    },
    options: {
      dppu: [],
      status
    },
    normalizer(node) {
      return {
        id: node.value,
        label: node.text
      };
    }
  }),
  computed: {
    ...mapGetters("auth", ["user"]),
    ...mapGetters("personalize", ["multipleDppu", "dppu"]),
    title() {
      const self = this;
      return category.find(x => x.value == self.$route.params.category).text;
    },
    columns() {
      const self = this;
      return columns[self.$route.params.category - 1];
    }
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
  watch: {
    $route: "getAll"
  },
  methods: {
    updateParams(newProps) {
      this.serverParams = Object.assign({}, this.serverParams, newProps);
    },
    onRowSelected(items) {
      const self = this;
      self.$router.push({
        name: "equipmentUpdate",
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
      self.serverParams.category = self.$route.params.category;
      self.$store
        .dispatch("apis/get", {
          url: `/equipment`,
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
