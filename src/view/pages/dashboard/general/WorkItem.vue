<template>
  <div class="card card-custom card-stretch gutter-b bg-light">
    <div class="card-header border-0 pt-5">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label font-weight-bolder text-dark">
          Work Items
        </span>
        <span class="text-muted mt-3 font-weight-bold font-size-sm">
          Display top 5 work items
        </span>
      </h3>
    </div>
    <div class="card-body pt-2 pb-0">
      <Empty v-if="data.length == 0" />
      <div v-else class="table-responsive">
        <table class="table table-borderless table-vertical-center">
          <thead>
            <tr>
              <th class="p-0"></th>
              <th class="p-0"></th>
              <th class="p-0"></th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(item, i) in data">
              <tr v-bind:key="i">
                <td class="pl-0">
                  <span
                    class="text-dark font-weight-bolder text-hover-primary mb-1 font-size-lg"
                  >
                    {{ `#${item.taskId} ${item.title}` }}
                  </span>
                  <span class="text-muted font-weight-bold d-block">
                    {{ item.description }}
                  </span>
                </td>
                <td class="text-right">
                  <span class="text-muted font-weight-bold">
                    {{ item.status.status.label }}
                  </span>
                </td>
                <td class="text-right pr-0">
                  <router-link
                    :to="routeName(item)"
                    class="btn btn-icon btn-light btn-sm"
                  >
                    <span class="svg-icon svg-icon-md svg-icon-primary">
                      <inline-svg
                        :src="
                          require('@/assets/media/svg/icons/Navigation/Angle-right.svg')
                        "
                      ></inline-svg>
                      <!--end::Svg Icon-->
                    </span>
                  </router-link>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import Empty from "./Empty.vue";

export default {
  components: {
    Empty
  },
  props: {
    data: [Array, Object]
  },
  methods: {
    routeName(item) {
      if (item.type.id == 0)
        return {
          name: "workItemFormEquipment",
          params: {
            action: "create",
            id: item.id
          }
        };
      else if (item.type.id == 1)
        return {
          name: "workItemFormEquipment",
          params: {
            action: "update",
            id: item.id
          }
        };
      else if (item.type.id == 2)
        return {
          name: "workItemFormEquipment",
          params: {
            action: "delete",
            id: item.id
          }
        };
      else if (item.type.id == 3)
        return {
          name: "workItemFormMaintenance",
          params: {
            action: "preventive",
            id: item.id
          }
        };
      else if (item.type.id == 4)
        return {
          name: "workItemFormMaintenance",
          params: {
            action: "breakdown",
            id: item.id
          }
        };
      else if (item.type.id == 5)
        return {
          name: "workItemFormWorkOrder",
          params: {
            id: item.id
          }
        };
      else if (item.type.id == 6)
        return {
          name: "workItemFormStandardForm",
          params: {
            id: item.id
          }
        };
      else
        return {
          name: "workItem",
          params: {
            id: item.id
          }
        };
    }
  }
};
</script>
