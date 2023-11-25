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
    <template #filter>
      <b-row class="p-3">
        <b-col xl="3">
          <treeselect
            class="mb-2"
            placeholder="Select DPPU"
            v-model="serverParams.dppu"
            :options="options.dppu"
            @input="changeDppu"
          />
        </b-col>
        <b-col xl="3">
          <treeselect
            class="mb-2"
            placeholder="Assigned to"
            v-model="serverParams.assignedTo"
            :options="options.assignedTo"
            @input="onFilter"
          />
        </b-col>
        <b-col xl="3">
          <treeselect
            class="mb-2"
            placeholder="Select type"
            v-model="serverParams.type"
            :options="options.requestType"
            :normalizer="normalizer"
            :multiple="true"
            @input="onFilter"
          />
        </b-col>
        <b-col xl="3">
          <treeselect
            class="mb-2"
            placeholder="Select request status"
            v-model="serverParams.status"
            :options="options.requestStatus"
            :normalizer="normalizer"
            :multiple="true"
            @input="onFilter"
          />
        </b-col>
      </b-row>
    </template>
    <template #empty>
      <EmptyTable
        title="All Tasks are managed from here"
        description="All tasks will be displayed and processed on this page"
      />
    </template>
    <template #cell(title)="data">
      <span v-b-tooltip.hover :title="data.value">{{ truncate(data.value, 50) }}</span>
      <br /><small class="font-italic">{{ data.item.type.label }}</small>
    </template>
    <template #cell(description)="data">
      <span v-b-tooltip.hover :title="data.value">{{ truncate(data.value, 50) }}</span>
    </template>
    <template #cell(assignedTo)="data">
      {{
        data.item.status.assignedTo == null
          ? `Role ${data.item.status.assignedToRole.label}`
          : data.item.status.assignedTo.label
      }}
      <br /><small class="font-italic">
        {{ dateTimeFormat(data.item.status.createdAt) }}
      </small>
    </template>
    <template #cell(status)="data">
      <b-badge v-if="data.value.status.id == 0" variant="primary">
        {{ data.value.status.label }}
      </b-badge>
      <b-badge v-else-if="data.value.status.id == 2" variant="warning">
        {{ data.value.status.label }}
      </b-badge>
      <b-badge v-else-if="data.value.status.id == 3" variant="success">
        {{ data.value.status.label }}
      </b-badge>
      <b-badge v-else-if="data.value.status.id == 4" variant="danger">
        {{ data.value.status.label }}
      </b-badge>
      <b-badge v-else variant="light">
        {{ data.value.status.label }}
      </b-badge>
    </template>
    <template #cell(createdAt)="data">
      {{ dateTimeFormat(data.item.createdAt) }}
    </template>
  </CardTable>
</template>

<script>
import { mapGetters } from "vuex";
import { workItem as columns } from "@/core/datasource/columns";
import { requestType, requestStatus } from "@/core/datasource/options";
import { getDppu, dateTimeFormat, truncate } from "@/core/utils";

export default {
  data: () => ({
    title: "Work Items",
    subTitle: "Display all work items",
    searchText: "Filter by Task ID or title",
    serverParams: {
      pageNumber: 1,
      pageSize: 20,
      keyword: null,
      assignedTo: null,
      dppu: null,
      type: [],
      status: []
    },
    table: {
      isLoading: false,
      columns,
      rows: [],
      totalPage: 0,
      totalRecords: 0
    },
    options: {
      requestType,
      requestStatus: requestStatus.filter(x => x.value != 6),
      dppu: [],
      assignedTo: []
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
    dateTimeFormat,
    truncate,
    updateParams(newProps) {
      this.serverParams = Object.assign({}, this.serverParams, newProps);
    },
    onRowSelected(items) {
      const self = this;

      switch (items[0].type.id) {
        case 0:
          self.$router.push({
            name: "workItemFormEquipment",
            params: {
              id: items[0].id,
              action: "create"
            }
          });
          break;
        case 1:
          self.$router.push({
            name: "workItemFormEquipment",
            params: {
              id: items[0].id,
              action: "update"
            }
          });
          break;
        case 2:
          self.$router.push({
            name: "workItemFormEquipment",
            params: {
              id: items[0].id,
              action: "delete"
            }
          });
          break;
        case 3:
          self.$router.push({
            name: "workItemFormMaintenance",
            params: {
              id: items[0].id,
              action: "preventive"
            }
          });
          break;
        case 4:
          self.$router.push({
            name: "workItemFormMaintenance",
            params: {
              id: items[0].id,
              action: "breakdown"
            }
          });
          break;
        case 5:
          self.$router.push({
            name: "workItemFormWorkOrder",
            params: {
              id: items[0].id
            }
          });
          break;
        case 6:
          self.$router.push({
            name: "workItemFormStandardForm",
            params: {
              id: items[0].id
            }
          });
          break;
      }
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
        pageNumber: 1,
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
      let assignedTo = [
        {
          id: "me",
          label: "@Me"
        }
      ];

      if (self.serverParams.dppu != null) {
        self.$store
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
          });
      }

      self.getAll();
    },
    getAll() {
      const self = this;

      self.table.isLoading = true;
      self.$store
        .dispatch("apis/get", {
          url: "/board/workitem",
          params: self.serverParams
        })
        .then(response => {
          if (response.error) {
            self.$message.error({
              zIndex: 10000,
              message: response.message
            });
          } else {
            self.table.rows = response.data.data.map(x => ({
              id: x.id,
              taskId: x.taskId,
              dppu: x.dppu,
              type: x.type,
              title: x.title,
              description: x.description,
              status: x.statuses.find(x => x.actived),
              createdBy: x.createdBy,
              createdAt: x.createdAt
            }));
            self.table.totalPage = response.data.totalPage;
            self.table.totalRecords = response.data.totalData;
          }
          self.table.isLoading = false;
        });
    }
  }
};
</script>
