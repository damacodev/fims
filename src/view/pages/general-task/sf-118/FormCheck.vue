<template>
  <CardForm :title="title" :subTitle="subTitle">
    <template v-if="buttonVisibility" slot="toolbar">
      <b-button
        v-show="deletable"
        variant="outline-danger"
        size="md"
        class="mr-2"
        @click="handleDelete"
      >
        Delete
      </b-button>
      <b-button :variant="buttonVariant" size="md" @click="handleSubmit">
        {{ textButton }}
      </b-button>
    </template>
    <template slot="form">
      <div v-if="buttonVisibility" class="card-body">
        <Select
          label="Colour"
          placeholder="Select colour"
          v-model="form.colourId"
          :v="$v.form.colourId"
          :options="options.colour"
          :multiple="false"
          :useHorizontal="false"
        />
        <Select
          label="Cleanlines"
          placeholder="Select cleanlines"
          v-model="form.cleanlinesId"
          :v="$v.form.cleanlinesId"
          :options="options.cleanlines"
          :multiple="false"
          :useHorizontal="false"
        />
        <Select
          label="Free Water"
          placeholder="Select free water"
          v-model="form.freeWaterId"
          :v="$v.form.freeWaterId"
          :options="options.freeWater"
          :multiple="false"
          :useHorizontal="false"
        />
        <Select
          label="Water Detector"
          placeholder="Select water detector"
          v-model="form.waterDetectorId"
          :v="$v.form.waterDetectorId"
          :options="options.waterDetector"
          :multiple="false"
          :useHorizontal="false"
        />
      </div>
      <div v-else class="card-body">
        <PlainText
          label="Colour"
          :value="form.colour == null ? '-' : form.colour.label"
        />
        <PlainText
          label="Cleanlines"
          :value="form.cleanlines == null ? '-' : form.cleanlines.label"
        />
        <PlainText
          label="Free Water"
          :value="form.freeWater == null ? '-' : form.freeWater.label"
        />
        <PlainText
          label="Water Detector"
          :value="form.waterDetector == null ? '-' : form.waterDetector.label"
        />
      </div>
    </template>
  </CardForm>
</template>

<script>
import { required } from "vuelidate/lib/validators";

export default {
  props: {
    title: String,
    subTitle: String,
    textButton: {
      type: String,
      default: "Submit"
    },
    buttonVariant: {
      type: String,
      default: "outline-primary"
    },
    buttonVisibility: {
      type: Boolean,
      default: true
    },
    form: Object,
    options: Object,
    group: String,
    check: String,
    deletable: {
      type: Boolean,
      default: false
    }
  },
  validations: {
    form: {
      colourId: { required },
      cleanlinesId: { required },
      freeWaterId: { required },
      waterDetectorId: { required }
    }
  },
  methods: {
    handleDelete() {
      this.$emit("onDelete");
    },
    handleSubmit() {
      const self = this;

      self.$v.form.$touch();
      if (self.$v.form.$pending || self.$v.form.$error) return;

      let _confirmText = "",
        _okText = "",
        _action = "",
        _url = "",
        _form = {
          standardForm118Id: self.$route.params.id,
          standardForm118DetailId: self.$route.params.iditem,
          colourId: self.form.colourId,
          cleanlinesId: self.form.cleanlinesId,
          freeWaterId: self.form.freeWaterId,
          waterDetectorId: self.form.waterDetectorId
        };

      if (self.form.id == null && self.group == "AFTER_TOPING_UP") {
        _confirmText = "You are about to submit this record. Are you sure ?";
        _okText = "Yes, Submit";
        _action = "apis/post";
        _url = `/board/standard-form/118/record/${self.group}/${self.check}`;
      } else if (self.form.id != null && self.group == "AFTER_TOPING_UP") {
        _confirmText = "You are about to update this record. Are you sure ?";
        _okText = "Yes, Update";
        _action = "apis/put";
        _url = `/board/standard-form/118/record/${self.form.id}`;
      } else {
        _confirmText = "You are about to update this record. Are you sure ?";
        _okText = "Yes, Update";
        _action = "apis/put";
        _url = `/board/standard-form/118/record/${self.group}/${self.check}`;
      }

      self.$dialog
        .confirm(_confirmText, {
          okText: _okText,
          cancelText: "Cancel",
          loader: true
        })
        .then(dialog => {
          self.$store
            .dispatch(_action, {
              url: _url,
              params: _form
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

                if (response.data) {
                  self.form.id = response.data.id;
                }
              }
            })
            .finally(() => dialog.close());
        });
    }
  }
};
</script>
