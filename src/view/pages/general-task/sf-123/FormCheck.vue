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
          v-model="form.colourIds"
          :v="$v.form.colourIds"
          :options="options.colour"
          :multiple="true"
          :useHorizontal="false"
        />
        <Select
          label="Cleanlines"
          placeholder="Select cleanlines"
          v-model="form.cleanlinesIds"
          :v="$v.form.cleanlinesIds"
          :options="options.cleanlines"
          :multiple="true"
          :useHorizontal="false"
        />
        <Select
          label="Free Water"
          placeholder="Select free water"
          v-model="form.freeWaterIds"
          :v="$v.form.freeWaterIds"
          :options="options.freeWater"
          :multiple="true"
          :useHorizontal="false"
        />
        <Select
          label="CWD"
          placeholder="Select CWD"
          v-model="form.waterDetectorIds"
          :v="$v.form.waterDetectorIds"
          :options="options.waterDetector"
          :multiple="true"
          :useHorizontal="false"
        />
      </div>
      <div v-else class="card-body">
        <PlainText label="Colour">
          <template #value>
            <span v-if="form.colour == null || form.colour.length == 0">-</span>
            <template v-else v-for="(row, index) in form.colour">
              <span v-bind:key="index"
                >{{ `${row.value} - ${row.label}` }}<br
              /></span>
            </template>
          </template>
        </PlainText>
        <PlainText label="Cleanlines">
          <template #value>
            <span v-if="form.cleanlines == null || form.cleanlines.length == 0"
              >-</span
            >
            <template v-else v-for="(row, index) in form.cleanlines">
              <span v-bind:key="index"
                >{{ `${row.value} - ${row.label}` }}<br
              /></span>
            </template>
          </template>
        </PlainText>
        <PlainText label="Free Water">
          <template #value>
            <span v-if="form.freeWater == null || form.freeWater.length == 0"
              >-</span
            >
            <template v-else v-for="(row, index) in form.freeWater">
              <span v-bind:key="index"
                >{{ `${row.value} - ${row.label}` }}<br
              /></span>
            </template>
          </template>
        </PlainText>
        <PlainText label="CWD">
          <template #value>
            <span
              v-if="
                form.waterDetector == null || form.waterDetector.length == 0
              "
              >-</span
            >
            <template v-else v-for="(row, index) in form.waterDetector">
              <span v-bind:key="index"
                >{{ `${row.value} - ${row.label}` }}<br
              /></span>
            </template>
          </template>
        </PlainText>
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
      // default: true,
      required: true
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
      colourIds: { required },
      cleanlinesIds: { required },
      freeWaterIds: { required },
      waterDetectorIds: { required }
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
          standardForm123Id: self.$route.params.id,
          standardForm123DetailId: self.$route.params.iditem,
          colourIds: self.form.colourIds,
          cleanlinesIds: self.form.cleanlinesIds,
          freeWaterIds: self.form.freeWaterIds,
          waterDetectorIds: self.form.waterDetectorIds
        };

      if (self.form.id == null && self.group == "AFTER_TOPING_UP") {
        _confirmText = "You are about to submit this record. Are you sure ?";
        _okText = "Yes, Submit";
        _action = "apis/post";
        _url = `/board/standard-form/123/record/${self.group}/${self.check}`;
      } else if (self.form.id != null && self.group == "AFTER_TOPING_UP") {
        _confirmText = "You are about to update this record. Are you sure ?";
        _okText = "Yes, Update";
        _action = "apis/put";
        _url = `/board/standard-form/123/record/${self.form.id}`;
      } else {
        _confirmText = "You are about to update this record. Are you sure ?";
        _okText = "Yes, Update";
        _action = "apis/put";
        _url = `/board/standard-form/123/record/${self.group}/${self.check}`;
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
