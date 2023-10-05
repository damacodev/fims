<template>
  <div class="card card-custom card-stretch gutter-b bg-light-success">
    <!--begin::Header-->
    <div class="card-header border-0 pt-5">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label font-weight-bolder text-dark">
          Preventive Maintenance
        </span>
      </h3>
    </div>
    <!--end::Header-->
    <!--begin::Body-->
    <div class="card-body pt-2 pb-0">
      <!--begin::Table-->
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
            <template v-for="(item, i) in workItem">
              <tr v-bind:key="i">
                <td class="pl-0">
                  <span
                    class="
                      text-dark
                      font-weight-bolder
                      text-hover-primary
                      mb-1
                      font-size-lg
                    "
                  >
                    {{ item.title }}
                  </span>
                  <span class="text-muted font-weight-bold d-block">
                    {{ item.type }}
                  </span>
                </td>
                <td class="text-right">
                  <span class="text-muted font-weight-bold">
                    {{ item.status }}
                  </span>
                </td>
                <td class="text-right pr-0">
                  <a href="#" class="btn btn-icon btn-light btn-sm">
                    <span class="svg-icon svg-icon-md svg-icon-primary">
                      <inline-svg
                        :src="
                          require('@/assets/media/svg/icons/Navigation/Angle-right.svg')
                        "
                      ></inline-svg>
                      <!--end::Svg Icon-->
                    </span>
                  </a>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
      <!--end::Table-->
    </div>
    <!--end::Body-->
  </div>
</template>

<script>
export default {
  data: () => ({
    workItem: [
      {
        title: "Work Items 1",
        type: "Preventive Maintenance",
        status: "New"
      }
    ]
  })
};
</script>
