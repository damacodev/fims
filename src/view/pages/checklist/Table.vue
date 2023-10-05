<template>
  <CardTable
    :title="title"
    :subTitle="subTitle"
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
        <b-col xl="3">
          <b-input
            class="mb-2"
            type="date"
            v-model="serverParams.date"
            @input="onFilter"
          ></b-input>
        </b-col>
        <b-col xl="3">
          <treeselect
            class="mb-2"
            placeholder="Select category"
            v-model="serverParams.category"
            :options="options.category"
            :normalizer="normalizer"
            :multiple="true"
            @input="onFilter"
          ></treeselect>
        </b-col>
        <b-col xl="3">
          <treeselect
            class="mb-2"
            placeholder="Select equipment"
            v-model="serverParams.equipment"
            :options="options.equipment"
            :normalizer="normalizer"
            :multiple="true"
            @input="onFilter"
          ></treeselect>
        </b-col>
      </b-row>
    </template>
    <template #empty>
      <EmptyTable
        title="Checklist activities are displayed here"
        description="You can manage all checklist activities from technician"
      />
    </template>
    <template #cell(date)="data">
      {{ dateFormat(data.item.date) }}
    </template>
    <template #cell(createdAt)="data">
      {{ dateTimeFormat(data.item.createdAt) }}
    </template>
  </CardTable>
</template>

<script>
import { mapGetters } from "vuex";
import { checklist as columns } from "@/core/datasource/columns";
import { category } from "@/core/datasource/options";
import { getDppu, dateFormat, dateTimeFormat } from "@/core/utils";

export default {
  data: () => ({
    title: "Checklist",
    subTitle: "Display all checklist activities",
    searchText: "Search by title",
    serverParams: {
      pageNumber: 1,
      pageSize: 20,
      dppu: null,
      category: [],
      equipment: [],
      date: null
    },
    table: {
      isLoading: false,
      columns,
      rows: [],
      totalPage: 0,
      totalRecords: 0
    },
    options: {
      category,
      dppu: [],
      equipment: []
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
      self.changeDppu();
    }
    self.getAll();
  },
  methods: {
    dateFormat,
    dateTimeFormat,
    updateParams(newProps) {
      this.serverParams = Object.assign({}, this.serverParams, newProps);
    },
    onRowSelected(items) {
      const self = this;
      self.$router.push({
        name: "checklistDetail",
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
    changeDppu() {
      const self = this;

      if (self.serverParams.dppu != null) {
        /* self.$store
          .dispatch("apis/get", {
            url: "/account",
            params: {
              dppu: self.serverParams.dppu
            }
          })
          .then(response => {
            if (response.error) {
              self.$message.error({
                zIndex: 10000,
                message: response.message
              });
            } else {
              self.options.assignedTo = assignedTo.concat(
                response.data.data.map(x => ({
                  id: x.id,
                  label: x.fullName
                }))
              );
            }
          }); */
      }
    },
    getAll() {
      const self = this;

      self.table.isLoading = true;
      self.$store
        .dispatch("apis/get", {
          url: "/board/checklist",
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
