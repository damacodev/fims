<template>
  <div
    class="card card-custom bg-radial-gradient-primary gutter-b card-stretch"
  >
    <div class="card-header border-0 py-5">
      <h3 class="card-title font-weight-bolder text-white">Task Progress</h3>
      <div class="card-toolbar">
        <b-button
          :to="{ name: 'workItem' }"
          class="btn-icon btn-light"
          size="sm"
        >
          <span class="svg-icon svg-icon-md">
            <inline-svg
              :src="
                require('@/assets/media/svg/icons/Navigation/Angle-right.svg')
              "
            ></inline-svg>
          </span>
        </b-button>
      </div>
    </div>
    <div class="card-body d-flex flex-column p-0">
      <div class="card-spacer bg-white card-rounded flex-grow-1">
        <div class="row m-0">
          <div class="col py-4">
            <div class="font-size-sm text-muted font-weight-bold">
              Preventive Maintenance
            </div>
            <div class="font-size-h1 font-weight-bolder">
              {{ data.preventiveMaintenance }}
            </div>
          </div>
          <div class="col py-4">
            <div class="font-size-sm text-muted font-weight-bold">
              Breakdown Maintenance
            </div>
            <div class="font-size-h1 font-weight-bolder">
              {{ data.breakdownMaintenance }}
            </div>
          </div>
          <div class="col py-4">
            <div class="font-size-sm text-muted font-weight-bold">
              Pending Task
            </div>
            <div class="font-size-h1 font-weight-bolder">
              {{ data.pendingTask }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: Object
  }
};
</script>
