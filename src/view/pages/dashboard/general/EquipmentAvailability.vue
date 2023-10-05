<template>
  <div class="card card-custom card-stretch gutter-b bg-light-info">
    <div class="card-header border-0 pt-5">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label font-weight-bolder text-dark">
          Equipments Availability
        </span>
      </h3>
    </div>
    <div class="card-body pt-2 pb-0">
      <div class="table-responsive">
        <table class="table table-borderless table-vertical-center">
          <thead>
            <tr>
              <th class="p-0"></th>
              <th class="p-0"></th>
              <th class="p-0"></th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(item, i) in category">
              <tr v-bind:key="i">
                <td class="pl-0 py-5">
                  <div class="symbol symbol-70 symbol-light mr-2">
                    <span class="symbol-label">
                      <img
                        :src="require(`@/assets/media/icons/${item.icon}`)"
                        class="h-50 align-self-center"
                      />
                    </span>
                  </div>
                </td>
                <td class="pl-0">
                  <a
                    href="#"
                    class="
                      text-dark
                      font-weight-bolder
                      text-hover-primary
                      mb-1
                      font-size-lg
                    "
                  >
                    {{ item.text }}
                  </a>
                </td>
                <td class="text-right">
                  <span
                    class="
                      label label-xl label-light label-inline
                      my-lg-0 my-2
                      text-dark-50
                      font-weight-bolder
                      mr-2
                    "
                  >
                    {{ data.find(x => x.category == item.value).available }}
                    Available
                  </span>
                  <span
                    class="
                      label label-xl label-light label-inline
                      my-lg-0 my-2
                      text-dark-50
                      font-weight-bolder
                    "
                  >
                    {{ data.find(x => x.category == item.value).inService }}
                    In Service
                  </span>
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
import { category } from "@/core/datasource/options";

export default {
  props: {
    data: [Array, Object]
  },
  data: () => ({
    category: category.filter(x => [5, 6, 7].includes(x.value))
  })
};
</script>
