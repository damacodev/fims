<template>
  <div
    id="kt_quick_timeline"
    ref="kt_quick_timeline"
    class="offcanvas offcanvas-right p-10"
  >
    <div
      class="
        offcanvas-header
        d-flex
        align-items-center
        justify-content-between
        pb-5
      "
    >
      <h3 class="font-weight-bold m-0">Histories</h3>
      <a
        href="#"
        class="btn btn-xs btn-icon btn-light btn-hover-primary"
        id="kt_quick_timeline_close"
      >
        <i class="ki ki-close icon-xs text-muted"></i>
      </a>
    </div>

    <perfect-scrollbar
      class="offcanvas-content pr-5 mb-5 mr-n5 scroll"
      style="max-height: 90vh; position: relative"
    >
      <template v-for="item in histories">
        <div
          v-bind:key="item.id"
          class="timeline-item animated fadeIn"
          :class="
            [0, 3].includes(item.status.id)
              ? 'green'
              : item.status.id == 1
              ? 'dark'
              : [2, 4].includes(item.status.id)
              ? 'danger'
              : 'blue'
          "
        >
          <span class="date">
            {{ dateTimeFormat(item.createdAt) }}
            <small class="text-mute">
              ({{ moment(item.createdAt).fromNow() }})
            </small>
          </span>
          <h5>{{ item.status.label }}</h5>
          <span> By {{ item.role.label }} </span>
          <div class="msg">
            <blockquote>
              <span v-html="item.remarks"></span>
              <cite>{{ item.createdBy.label }}</cite>
            </blockquote>
          </div>
        </div>
      </template>
    </perfect-scrollbar>
  </div>
</template>

<style lang="scss" scoped>
#kt_quick_timeline {
  overflow: hidden;
}
</style>

<script>
import KTLayoutQuickRight from "@/assets/js/layout/extended/quick-right.js";
import KTOffcanvas from "@/assets/js/components/offcanvas.js";
import { dateTimeFormat } from "@/core/utils";
import moment from "moment";

export default {
  props: {
    histories: [Object, Array]
  },
  mounted() {
    const self = this;
    KTLayoutQuickRight.init(
      self.$refs["kt_quick_timeline"],
      "kt_quick_timeline_close",
      "kt_quick_timeline_toggle"
    );
  },
  methods: {
    dateTimeFormat,
    moment,
    closeForm() {
      new KTOffcanvas(KTLayoutQuickRight.getElement()).hide();
    },
    showForm() {
      new KTOffcanvas(KTLayoutQuickRight.getElement()).show();
    }
  }
};
</script>
