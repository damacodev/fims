<template>
  <div class="topbar-item">
    <div id="kt_quick_notifications_toggle">
      <div class="btn btn-icon btn-sm btn-primary font-weight-bolder p-0">
        {{ notification.length }}
      </div>
    </div>

    <!-- begin::Notifications Panel-->
    <div
      id="kt_quick_notifications"
      ref="kt_quick_notifications"
      class="offcanvas offcanvas-right p-10"
    >
      <div
        class="
          offcanvas-header
          d-flex
          align-items-center
          justify-content-between
          mb-10
        "
      >
        <h3 class="font-weight-bold m-0">
          Notifications
          <small class="text-muted font-size-sm ml-2">
            {{ notification.length }} New
          </small>
        </h3>
        <a
          href="#"
          class="btn btn-xs btn-icon btn-light btn-hover-primary"
          id="kt_quick_notifications_close"
        >
          <i class="ki ki-close icon-xs text-muted"></i>
        </a>
      </div>
      <div class="offcanvas-content pr-5 mr-n5">
        <div
          v-if="notification.length > 0"
          class="navi navi-icon-circle navi-spacer-x-0"
        >
          <template v-for="(item, i) in notification">
            <a
              href="javascript:;"
              @click="redirect(item)"
              class="navi-item"
              v-bind:key="i"
            >
              <div class="navi-link rounded">
                <div class="symbol symbol-50 mr-3">
                  <div class="symbol-label">
                    <i
                      v-if="item.workItem.type.id == 0"
                      class="icon-lg"
                      v-bind:class="`flaticon2-drop text-info`"
                    />
                    <i
                      v-else-if="item.workItem.type.id == 1"
                      class="icon-lg"
                      v-bind:class="`flaticon2-drop text-warning`"
                    />
                    <i
                      v-else-if="item.workItem.type.id == 2"
                      class="icon-lg"
                      v-bind:class="`flaticon2-drop text-danger`"
                    />
                    <i
                      v-else-if="item.workItem.type.id == 3"
                      class="icon-lg"
                      v-bind:class="`flaticon2-list-3 text-success`"
                    />
                    <i
                      v-else-if="item.workItem.type.id == 4"
                      class="icon-lg"
                      v-bind:class="`flaticon2-medical-records text-warning`"
                    />
                    <i
                      v-else-if="item.workItem.type.id == 5"
                      class="icon-lg"
                      v-bind:class="`flaticon2-list-3 text-info`"
                    />
                    <i
                      v-else-if="item.workItem.type.id == 6"
                      class="icon-lg"
                      v-bind:class="`flaticon2-document text-success`"
                    />
                  </div>
                </div>
                <div class="navi-text">
                  <div class="font-weight-bold font-size-lg">
                    {{ item.remarks }}
                  </div>
                  <div class="text-muted">
                    <small>
                      {{ item.workItem.type.label }}, by
                      {{ item.createdBy ? item.createdBy.label : "-" }} ({{
                        moment(item.createdAt).fromNow()
                      }})
                    </small>
                  </div>
                </div>
              </div>
            </a>
          </template>
        </div>
        <span v-else>There are no notifications to display</span>
      </div>
    </div>
  </div>
</template>

<script>
import Pusher from "pusher-js";
import KTLayoutQuickNotifications from "@/assets/js/layout/extended/quick-notifications.js";
import KTOffcanvas from "@/assets/js/components/offcanvas.js";

import { mapGetters } from "vuex";
import { apiUrl } from "@/core/services/api.url";
import { camelizeKeys } from "@/core/utils";
import sound from "@/assets/media/audio/toast_sound.mp3";
import moment from "moment";

export default {
  name: "KTQuickPanel",
  data: () => ({
    baseUrl: process.env.NODE_ENV === "production" ? apiUrl.prod : apiUrl.dev,
    notification: []
  }),
  computed: {
    ...mapGetters("auth", ["user"])
  },
  created() {
    this.getNotification();
    this.subscribe();
  },
  mounted() {
    // Init Quick Offcanvas Panel
    KTLayoutQuickNotifications.init(this.$refs["kt_quick_notifications"]);
  },
  methods: {
    moment,
    subscribe() {
      const self = this;
      const pusher = new Pusher("7fcfe6712eb3ef996108", {
        cluster: "ap1",
        authEndpoint: `${self.baseUrl}/auth/pusher`
      });
      pusher.subscribe("private-mtc-notification");

      pusher.bind("notification", data => {
        data = camelizeKeys(data);

        if (data.to.includes(self.user.id)) {
          if (data.ring) {
            let audio = new Audio(sound);
            audio.play();

            self.$message.info({
              zIndex: 10000,
              message: "New notifications receipt",
              position: "top-right"
            });
          }

          self.getNotification();
        }
      });
    },
    getNotification() {
      const self = this;

      self.$store
        .dispatch("apis/get", {
          url: "/common/notification"
        })
        .then(response => {
          if (response.error) {
            self.$message.error({
              zIndex: 10000,
              message: response.message
            });
          } else {
            self.notification = response.data;
          }
        });
    },
    redirect(item) {
      const self = this;
      self.$router.push(self.routeName(item.workItem));
      new KTOffcanvas(KTLayoutQuickNotifications.getElement()).hide();
    },
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
