<template>
  <div class="topbar-item mr-4">
    <div
      class="btn btn-sm btn-clean btn-light btn-text-dark-75"
      id="kt_quick_user_toggle"
    >
      <span class="svg-icon svg-icon-lg">
        <inline-svg
          :src="require('@/assets/media/svg/icons/General/User.svg')"
        />
      </span>
      {{ user.fullName }}
    </div>

    <div
      id="kt_quick_user"
      ref="kt_quick_user"
      class="offcanvas offcanvas-right p-10"
    >
      <!--begin::Header-->
      <div
        class="
          offcanvas-header
          d-flex
          align-items-center
          justify-content-between
          pb-5
        "
      >
        <h3 class="font-weight-bold m-0">
          User Profile
          <small class="text-muted font-size-sm ml-2">
            Logged in as {{ user.role.label }}
          </small>
        </h3>
        <a
          href="#"
          class="btn btn-xs btn-icon btn-light btn-hover-primary"
          id="kt_quick_user_close"
        >
          <i class="ki ki-close icon-xs text-muted"></i>
        </a>
      </div>
      <!--end::Header-->

      <!--begin::Content-->
      <perfect-scrollbar
        class="offcanvas-content pr-5 mr-n5 scroll"
        style="max-height: 90vh; position: relative"
      >
        <!--begin::Header-->
        <div class="d-flex align-items-center mt-5">
          <div class="symbol symbol-100 mr-5">
            <img
              class="symbol-label"
              :src="require('@/assets/media/users/default.jpg')"
              alt=""
            />
            <i class="symbol-badge bg-success"></i>
          </div>
          <div class="d-flex flex-column">
            <a
              href="#"
              class="
                font-weight-bold font-size-h5
                text-dark-75 text-hover-primary
              "
            >
              {{ user.fullName }}
            </a>
            <div class="text-muted mt-1">{{ user.position }}</div>
            <div class="navi mt-2">
              <a href="#" class="navi-item">
                <span class="navi-link p-0 pb-2">
                  <span class="navi-icon mr-1">
                    <span class="svg-icon svg-icon-lg svg-icon-primary">
                      <!--begin::Svg Icon-->
                      <inline-svg
                        :src="
                          require('@/assets/media/svg/icons/Communication/Mail-notification.svg')
                        "
                      />
                      <!--end::Svg Icon-->
                    </span>
                  </span>
                  <span class="navi-text text-muted text-hover-primary">
                    {{ user.email }}
                  </span>
                </span>
              </a>
            </div>
            <button
              class="btn btn-light-primary btn-bold"
              @click="handleLogout"
            >
              Sign out
            </button>
          </div>
        </div>
        <!--end::Header-->
        <!-- <div class="separator separator-dashed mt-8 mb-5"></div>
        <div class="navi navi-spacer-x-0 p-0">
          <router-link
            to="/builder"
            @click.native="closeOffcanvas"
            href="#"
            class="navi-item"
          >
            <div class="navi-link">
              <div class="symbol symbol-40 bg-light mr-3">
                <div class="symbol-label">
                  <span class="svg-icon svg-icon-md svg-icon-success">
                    <inline-svg
                      :src="
                        require('@/assets/media/svg/icons/General/Notification2.svg')
                      "
                    />
                  </span>
                </div>
              </div>
              <div class="navi-text">
                <div class="font-weight-bold">My Profile</div>
                <div class="text-muted">
                  Account settings and more
                  <span
                    class="
                      label label-light-danger label-inline
                      font-weight-bold
                    "
                  >
                    update
                  </span>
                </div>
              </div>
            </div>
          </router-link>
          <router-link
            to="/builder"
            @click.native="closeOffcanvas"
            href="#"
            class="navi-item"
          >
            <div class="navi-link">
              <div class="symbol symbol-40 bg-light mr-3">
                <div class="symbol-label">
                  <span class="svg-icon svg-icon-md svg-icon-warning">
                    <inline-svg
                      :src="
                        require('@/assets/media/svg/icons/Shopping/Chart-bar1.svg')
                      "
                    />
                  </span>
                </div>
              </div>
              <div class="navi-text">
                <div class="font-weight-bold">My Messages</div>
                <div class="text-muted">Inbox and tasks</div>
              </div>
            </div>
          </router-link>
          <router-link
            to="/builder"
            @click.native="closeOffcanvas"
            href="#"
            class="navi-item"
          >
            <div class="navi-link">
              <div class="symbol symbol-40 bg-light mr-3">
                <div class="symbol-label">
                  <span class="svg-icon svg-icon-md svg-icon-danger">
                    <inline-svg
                      :src="
                        require('@/assets/media/svg/icons/Files/Selected-file.svg')
                      "
                    />
                  </span>
                </div>
              </div>
              <div class="navi-text">
                <div class="font-weight-bold">My Activities</div>
                <div class="text-muted">Logs and notifications</div>
              </div>
            </div>
          </router-link>
          <router-link
            to="/builder"
            @click.native="closeOffcanvas"
            href="#"
            class="navi-item"
          >
            <div class="navi-link">
              <div class="symbol symbol-40 bg-light mr-3">
                <div class="symbol-label">
                  <span class="svg-icon svg-icon-md svg-icon-primary">
                    <inline-svg
                      :src="
                        require('@/assets/media/svg/icons/Communication/Mail-opened.svg')
                      "
                    />
                  </span>
                </div>
              </div>
              <div class="navi-text">
                <div class="font-weight-bold">My Tasks</div>
                <div class="text-muted">latest tasks and projects</div>
              </div>
            </div>
          </router-link>
        </div>
        <div class="separator separator-dashed my-7"></div>
        <div>
          <h5 class="mb-5">Recent Notifications</h5>
          <template v-for="(item, i) in list">
            <div
              class="d-flex align-items-center rounded p-5 gutter-b"
              v-bind:class="`bg-light-${item.type}`"
              v-bind:key="i"
            >
              <span
                class="svg-icon mr-5"
                v-bind:class="`svg-icon-${item.type}`"
              >
                <span class="svg-icon svg-icon-lg">
                  <inline-svg :src="item.svg" />
                </span>
              </span>
              <div class="d-flex flex-column flex-grow-1 mr-2">
                <a
                  href="#"
                  class="
                    font-weight-normal
                    text-dark-75 text-hover-primary
                    font-size-lg
                    mb-1
                  "
                >
                  {{ item.title }}
                </a>
                <span class="text-muted font-size-sm">
                  {{ item.desc }}
                </span>
              </div>
              <span
                class="font-weight-bolder py-1 font-size-lg"
                v-bind:class="`text-${item.type}`"
              >
                {{ item.alt }}
              </span>
            </div>
          </template>
        </div> -->
      </perfect-scrollbar>
      <!--end::Content-->
    </div>
  </div>
</template>

<style lang="scss" scoped>
#kt_quick_user {
  overflow: hidden;
}
</style>

<script>
import { mapGetters } from "vuex";
import KTLayoutQuickUser from "@/assets/js/layout/extended/quick-user.js";
import KTOffcanvas from "@/assets/js/components/offcanvas.js";

export default {
  name: "KTQuickUser",
  data: () => ({
    list: [
      {
        title: "Another purpose persuade",
        desc: "Due in 2 Days",
        alt: "+28%",
        svg: "/media/svg/icons/Home/Library.svg",
        type: "warning"
      },
      {
        title: "Would be to people",
        desc: "Due in 2 Days",
        alt: "+50%",
        svg: "/media/svg/icons/Communication/Write.svg",
        type: "success"
      },
      {
        title: "Purpose would be to persuade",
        desc: "Due in 2 Days",
        alt: "-27%",
        svg: "/media/svg/icons/Communication/Group-chat.svg",
        type: "danger"
      },
      {
        title: "The best product",
        desc: "Due in 2 Days",
        alt: "+8%",
        svg: "/media/svg/icons/General/Attachment2.svg",
        type: "info"
      }
    ]
  }),
  computed: {
    ...mapGetters("auth", ["user", "token"]),
    picture() {
      return process.env.BASE_URL + "media/users/default.jpg";
    }
  },
  mounted() {
    KTLayoutQuickUser.init(this.$refs["kt_quick_user"]);
  },
  methods: {
    closeOffcanvas() {
      new KTOffcanvas(KTLayoutQuickUser.getElement()).hide();
    },
    handleLogout() {
      const self = this;

      self.$store
        .dispatch("apis/get", {
          url: "auth/logout",
          params: {
            refreshToken: self.token.refreshToken
          }
        })
        .then(response => {
          localStorage.removeItem("vuex");

          if (response.error) {
            self.$message.error({
              zIndex: 10000,
              message: response.message
            });
          } else {
            self.$message.success({
              zIndex: 10000,
              message: response.message
            });
          }
          window.location.reload();
        });
    }
  }
};
</script>
