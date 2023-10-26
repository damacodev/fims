<template>
  <b-tab title="After Toping Up @ Product Tank Drain">
    <b-row>
      <b-col lg="12">
        <b-button
          v-if="!currentProgress.locked"
          variant="outline-primary"
          @click="createNewRecord"
        >
          Create New Record
        </b-button>

        <EmptyTable
          v-if="form.afterTopingUp.length == 0"
          title="After toping up @ product tank drain are managed from here"
          description="All After toping up @ product tank drain will be displayed on this page"
        />
      </b-col>
      <b-col
        lg="6"
        v-for="(afterTopingUp, index) in form.afterTopingUp"
        v-bind:key="index"
      >
        <FormCheck
          :title="`Toping Up #${index + 1}`"
          subTitle="After Toping Up @ Product Tank Drain"
          :textButton="afterTopingUp.id == null ? `Submit` : `Update`"
          :buttonVariant="
            afterTopingUp.id == null ? `primary` : `outline-primary`
          "
          :form="afterTopingUp"
          :options="options"
          :buttonVisibility="!currentProgress.locked"
          group="AFTER_TOPING_UP"
          check="PRODUCT_TANK_DRAIN"
          :deletable="true"
          :class="!currentProgress.locked ? `mt-7` : ``"
          @onDelete="handleDelete(afterTopingUp.id, index)"
        />
      </b-col>
    </b-row>
  </b-tab>
</template>

<script>
import FormCheck from "./FormCheck.vue";

export default {
  components: {
    FormCheck
  },
  props: {
    form: Object,
    options: Object,
    currentProgress: Object
  },
  methods: {
    createNewRecord() {
      const self = this;

      self.form.afterTopingUp.push({
        id: null,
        colourIds: null,
        cleanlinesIds: null,
        freeWaterIds: null,
        waterDetectorIds: null
      });
    },
    handleDelete(id, index) {
      const self = this;

      if (id == null) {
        self.form.afterTopingUp.splice(index, 1);
      } else {
        self.$dialog
          .confirm("You are about to delete this record. Are you sure ?", {
            okText: "Yes, Delete",
            cancelText: "Cancel",
            loader: true
          })
          .then(dialog => {
            self.$store
              .dispatch("apis/remove", {
                url: `/board/standard-form/118/record/${id}`
              })
              .then(response => {
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
                  self.form.afterTopingUp.splice(index, 1);
                }
              })
              .finally(() => dialog.close());
          });
      }
    }
  }
};
</script>
