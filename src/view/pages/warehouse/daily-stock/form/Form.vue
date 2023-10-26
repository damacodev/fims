<template>
  <CardForm :title="title" :subTitle="subTitle" :backButton="true">
    <template slot="toolbar">
      <b-button
        v-show="$route.name != route.form"
        variant="outline-danger"
        size="lg"
        @click="handleDelete"
      >
        Delete
      </b-button>
    </template>
    <template slot="form">
      <div class="card-body">
        <Select
          v-if="multipleDppu"
          :disabled="transactionItems.length > 0"
          label="Depot Pengisian Pesawat Udara"
          v-model="form.dppuId"
          :v="$v.form.dppuId"
          :options="options.dppu"
          :multiple="false"
          @input="handleSearchSpareparts"
        />
        <InputText
          label="Transaction #"
          type="text"
          v-model="form.transactionId"
          disabled
        />
        <RadioGroup
          label="Transaction Type"
          v-model="form.stockType"
          :options="options.inOut"
          @input="handleSearchSpareparts"
        />
        <InputText
          label="Date"
          type="date"
          v-model="form.date"
          :v="$v.form.date"
        />
        <TextArea label="Remarks" v-model="form.remarks" />
      </div>
    </template>
  </CardForm>
</template>

<script>
import { mapGetters } from "vuex";
import { required } from "vuelidate/lib/validators";

export default {
  props: {
    route: Object,
    title: String,
    subTitle: String,
    form: Object,
    options: Object,
    transactionItems: Array
  },
  computed: {
    ...mapGetters("personalize", ["multipleDppu", "dppu"])
  },
  validations: {
    form: {
      dppuId: { required },
      stockType: { required },
      date: { required }
    }
  },
  methods: {
    handleSearchSpareparts() {
      this.$emit("onSearchSpareparts");
    },
    handleDelete() {
      this.$emit("onDelete");
    }
  }
};
</script>
