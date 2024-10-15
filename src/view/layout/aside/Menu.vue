<template>
  <div>
    <ul class="menu-nav">
      <li class="menu-section">
        <h4 class="menu-text">Dashboard</h4>
        <i class="menu-icon flaticon-more-v2"></i>
      </li>
      <li-menu
        to="/dashboard/general"
        text="General"
        icon="flaticon2-architecture-and-city"
      />
      <li-menu
        to="/dashboard/preventive-maintenance"
        text="Preventive Maintenance"
        icon="flaticon2-list-3"
      />
      <li-menu
        to="/dashboard/breakdown-maintenance"
        text="Breakdown Maintenance"
        icon="flaticon2-medical-records"
      />
      <li-menu
        to="/dashboard/pending-task"
        text="Pending Task"
        icon="flaticon2-sheet"
      />

      <li class="menu-section">
        <h4 class="menu-text">Boards</h4>
        <i class="menu-icon flaticon-more-v2"></i>
      </li>
      <li-menu
        :to="{ name: 'generalTask' }"
        text="General Task"
        icon="flaticon-edit-1"
      />
      <li-menu
        :to="{ name: 'workItem' }"
        text="Work Items"
        icon="flaticon-list"
      />
      <li-menu
        :to="{ name: 'ownerEstimateGenerator' }"
        text="OE Generator"
        icon="flaticon-interface-9"
      />
      <!-- <li-menu
        :to="{ name: 'checklist' }"
        text="Checklist"
        icon="flaticon-interface-5"
      /> -->

      <li class="menu-section">
        <h4 class="menu-text">Preventive Maintenance</h4>
        <i class="menu-icon flaticon-more-v2"></i>
      </li>
      <li-menu
        :to="{ name: 'activity' }"
        text="Activity"
        icon="flaticon2-notepad"
      />
      <li-menu
        :to="{ name: 'schedule' }"
        text="Schedule"
        icon="flaticon2-notepad"
      />
      <li-menu
        :to="{ name: 'calendar' }"
        text="Calendar"
        icon="flaticon2-calendar-9"
      />

      <li class="menu-section">
        <h4 class="menu-text">Warehouse</h4>
        <i class="menu-icon flaticon-more-v2"></i>
      </li>
      <li-menu
        :to="{ name: 'sparepart' }"
        text="Sparepart"
        icon="flaticon-cogwheel-1"
      />
      <li-menu
        :to="{ name: 'dailyStock' }"
        text="Daily Stock"
        icon="flaticon-cogwheel-1"
      />

      <li class="menu-section">
        <h4 class="menu-text">Management</h4>
        <i class="menu-icon flaticon-more-v2"></i>
      </li>
      <li-menu
        :to="{ name: 'approver' }"
        text="Approver"
        icon="flaticon-users"
      />
      <li-menu
        :to="{ name: 'documentNumber' }"
        text="Document Number"
        icon="flaticon-exclamation-2"
      />
      <li-menu
        :to="{ name: 'technician' }"
        text="Technician"
        icon="flaticon-user"
      />
      <li-menu
        :to="{ name: 'documents' }"
        text="Documents"
        icon="flaticon-folder"
      />

      <li class="menu-section">
        <h4 class="menu-text">Master Data</h4>
        <i class="menu-icon flaticon-more-v2"></i>
      </li>
      <li-menu
        :to="{ name: 'region' }"
        text="Region"
        icon="flaticon-map-location"
      />
      <li-menu :to="{ name: 'dppu' }" text="DPPU" icon="flaticon2-shelter" />
      <li-menu
        :to="{ name: 'cro' }"
        text="CRO"
        icon="flaticon2-user-outline-symbol"
      />
      <li
        aria-haspopup="true"
        data-menu-toggle="hover"
        class="menu-item menu-item-submenu"
        v-bind:class="{ 'menu-item-open': hasActiveChildren('/equipment') }"
      >
        <a href="#" class="menu-link menu-toggle">
          <i class="menu-icon flaticon2-drop"></i>
          <span class="menu-text">Equipment</span>
          <i class="menu-arrow"></i>
        </a>
        <div class="menu-submenu">
          <span class="menu-arrow"></span>
          <ul class="menu-subnav">
            <li aria-haspopup="true" class="menu-item menu-item-parent">
              <span class="menu-link">
                <span class="menu-text">Equipment</span>
              </span>
            </li>

            <router-link
              v-for="item in category"
              v-bind:key="item.value"
              :to="{
                name: 'equipment',
                params: {
                  category: item.value
                }
              }"
              v-slot="{ href, navigate, isActive, isExactActive }"
            >
              <li
                aria-haspopup="true"
                data-menu-toggle="hover"
                class="menu-item"
                :class="[
                  isActive && 'menu-item-active',
                  isExactActive && 'menu-item-active'
                ]"
              >
                <a :href="href" class="menu-link" @click="navigate">
                  <i class="menu-bullet menu-bullet-dot">
                    <span></span>
                  </i>
                  <span class="menu-text">{{ item.text }}</span>
                </a>
              </li>
            </router-link>
          </ul>
        </div>
      </li>
      <li-menu
        :to="{ name: 'ownerEstimate' }"
        text="OE (Pricelist) Sourcing"
        icon="flaticon2-tag"
      />
      <li-menu
        :to="{ name: 'locationIndex' }"
        text="Location Index"
        icon="flaticon-statistics"
      />

      <li class="menu-section">
        <h4 class="menu-text">Application Settings</h4>
        <i class="menu-icon flaticon-more-v2"></i>
      </li>
      <li-menu
        :to="{ name: 'userManagement' }"
        text="User Management"
        icon="flaticon-avatar"
      />
      <li-menu
        :to="{ name: 'configuration' }"
        text="Configuration"
        icon="flaticon2-gear"
      />

      <!-- <li class="menu-section">
        <h4 class="menu-text">Report</h4>
        <i class="menu-icon flaticon-more-v2"></i>
      </li> -->

      <div class="separator separator-dashed my-7"></div>

      <li-menu
        to="/downloads/MTC.apk"
        text="Download Android Apps"
        icon="flaticon2-download-1"
      />
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import LiMenu from "@/component/LiMenu.vue";
import { category } from "@/core/datasource/options";
export default {
  name: "KTMenu",
  components: {
    LiMenu
  },
  data: () => ({
    category
  }),
  computed: {
    ...mapGetters("auth", ["user"])
  },
  methods: {
    hasActiveChildren(match) {
      return this.$route["path"].indexOf(match) !== -1;
    }
  }
};
</script>
