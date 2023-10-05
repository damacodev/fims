<template>
  <div
    class="card card-custom bg-radial-gradient-success gutter-b card-stretch"
  >
    <div class="card-header border-0 py-5">
      <h3 class="card-title font-weight-bolder text-white">Man Power</h3>
      <div class="card-toolbar">
        <b-button
          :to="{ name: 'technician' }"
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
          <div class="col py-6">
            <div class="font-size-sm text-muted font-weight-bold">
              Available Technician
            </div>
            <div class="font-size-h1 font-weight-bolder">
              {{ data.available }}
            </div>
          </div>
          <div class="col py-6">
            <div class="font-size-sm text-muted font-weight-bold">
              Unavailable Technician
            </div>
            <div class="font-size-h1 font-weight-bolder">
              {{ data.unavailable }}
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
