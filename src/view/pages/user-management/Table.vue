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
      <b-button variant="primary" :to="{ name: 'userManagementCreate' }">
        Create New Account
      </b-button>
    </template>
    <template #filter>
      <b-row class="p-3">
        <b-col xl="3">
          <b-form-input
            class="mb-2"
            placeholder="Email"
            type="email"
            v-model="serverParams.email"
            @change="onFilter"
          ></b-form-input>
        </b-col>
        <b-col xl="3">
          <b-form-input
            class="mb-2"
            placeholder="Phone number"
            type="tel"
            v-model="serverParams.phone"
            @change="onFilter"
          ></b-form-input>
        </b-col>
        <b-col xl="3">
          <treeselect
            class="mb-2"
            placeholder="Select role"
            v-model="serverParams.role"
            :options="options.role"
            :multiple="true"
            :normalizer="normalizer"
            @input="onFilter"
          ></treeselect>
        </b-col>
        <b-col xl="3">
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
        title="User accounts are managed from here"
        description="You can see about account information or which ones are active/inactive status"
        button-label="Create New Account"
        :href="{ name: 'userManagementCreate' }"
      />
    </template>
    <template #cell(fullName)="data">
      {{ data.item.fullName }}
      <b-badge v-if="data.item.email == user.email" variant="success">
        It's You!
      </b-badge>
    </template>
    <template #cell(plant)="data">
      {{ data.item.dppu.map(x => x.label).join(", ") }}
    </template>
    <template #cell(actived)="data">
      <span v-show="data.item.actived" class="text-success">Active</span>
      <span v-show="!data.item.actived" class="text-danger">Inactive</span>
    </template>
  </CardTable>
</template>

<script>
import { mapGetters } from "vuex";
import { userManagement as columns } from "@/core/datasource/columns";
import { role, status } from "@/core/datasource/options";

export default {
  data: () => ({
    title: "User Management",
    subTitle: "Display all accounts",
    searchText: "Search by full name",
    serverParams: {
      pageNumber: 1,
      pageSize: 20,
      keyword: null,
      fullName: null,
      email: null,
      phone: null,
      role: null,
      actived: null
    },
    table: {
      isLoading: true,
      columns,
      rows: [],
      totalPage: 0,
      totalRecords: 0
    },
    options: { role, status },
    normalizer(node) {
      return {
        id: node.value,
        label: node.text
      };
    }
  }),
  computed: {
    ...mapGetters("auth", ["user"])
  },
  created() {
    const self = this;
    self.getAll();
  },
  methods: {
    updateParams(newProps) {
      this.serverParams = Object.assign({}, this.serverParams, newProps);
    },
    onRowSelected(items) {
      const self = this;
      self.$router.push({
        name: "userManagementUpdate",
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
        fullName: params
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
          url: "/account",
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
