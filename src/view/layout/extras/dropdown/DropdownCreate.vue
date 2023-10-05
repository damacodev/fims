<template>
  <b-dropdown
    size="sm"
    variant="link"
    toggle-class="topbar-item text-decoration-none"
    no-caret
    right
    no-flip
  >
    <template v-slot:button-content>
      <div
        class="topbar-item mr-4"
        data-toggle="dropdown"
        data-offset="10px,0px"
      >
        <div class="btn font-weight-bolder btn-sm btn-outline-primary px-5">
          Create
        </div>
      </div>
    </template>
    <!--begin::Navigation-->
    <div class="navi navi-hover min-w-md-250px py-5">
      <b-dropdown-text tag="div" class="navi-item">
        <router-link :to="{ name: 'laporanKerusakan' }" class="navi-link">
          <span class="navi-icon">
            <i class="flaticon2-medical-records"></i>
          </span>
          <span class="navi-text">Laporan Kerusakan</span>
        </router-link>
      </b-dropdown-text>
      <b-dropdown-text tag="div" class="navi-item">
        <router-link :to="{ name: 'workOrder' }" class="navi-link">
          <span class="navi-icon">
            <i class="flaticon2-list-3"></i>
          </span>
          <span class="navi-text">Work Order (Adjustments)</span>
        </router-link>
      </b-dropdown-text>
      <b-dropdown-text tag="div" class="navi-item">
        <router-link
          :to="{ name: 'ownerEstimateGeneratorCreate' }"
          class="navi-link"
        >
          <span class="navi-icon">
            <i class="flaticon2-list-3"></i>
          </span>
          <span class="navi-text">Owner Estimate Generator</span>
        </router-link>
      </b-dropdown-text>
    </div>
    <!--end::Navigation-->
  </b-dropdown>
</template>

<style lang="scss">
.dropdown-menu {
  outline: none;
}
</style>

<script>
export default {
  name: "dropdown-1"
};
</script>
