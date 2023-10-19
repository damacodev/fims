<template>
  <div>
    <File
      label="Evidences"
      accept=".png, .jpg, .jpeg"
      v-model="model"
      :useHorizontal="false"
      :multiple="true"
      :v="v"
      @onChange="handleUpload"
    />
    <b-row v-if="media.length > 0">
      <b-col lg="12">
        <b-alert
          v-for="item in media"
          v-bind:key="item.id"
          variant="success"
          show
        >
          <a :href="`${baseUrl}${item.url}`" class="text-white" target="_blank">
            {{ item.originalFileName }}
          </a>
          <b-btn-close class="ml-3" @click="handleRemove(`${item.id}`)" />
        </b-alert>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { apiUrl } from "@/core/services/api.url";

export default {
  props: {
    v: Object,
    value: [Array, String, Number, Boolean]
  },
  data: () => ({
    media: [],
    baseUrl: process.env.NODE_ENV === "production" ? apiUrl.prod : apiUrl.dev
  }),
  computed: {
    model: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      }
    }
  },
  created() {
    this.media = this.model;
  },
  methods: {
    handleUpload(event) {
      if (event.target.files.length > 0) {
        const self = this;
        let payload = new FormData();

        event.target.files.forEach(item => {
          payload.append("file", item);
        });
        payload.append("group", 4);

        self.$store
          .dispatch("apis/upload", {
            url: "/media",
            params: payload
          })
          .then(response => {
            if (response.error) {
              self.$message.error({
                zIndex: 10000,
                message: response.message
              });
            } else {
              response.data.forEach(item => {
                self.media.push(item);
              });
              self.model = self.media;
            }
          });
      }
    },
    handleRemove(id) {
      const self = this;

      self.$dialog
        .confirm("You are about to remove this image. Are you sure ?", {
          okText: "Yes, Remove",
          cancelText: "Cancel",
          loader: true
        })
        .then(dialog => {
          self.$store
            .dispatch("apis/remove", {
              url: `/media/${id}`
            })
            .then(response => {
              dialog.close();
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

                let find = self.media.findIndex(x => x.id == id);
                self.media.splice(find, 1);
                self.model = self.media;
              }
            });
        });
    }
  }
};
</script>
