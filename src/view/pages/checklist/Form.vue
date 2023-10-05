<template>
  <div class="card card-custom">
    <div class="card-header py-3">
      <div class="card-title align-items-start flex-column">
        <h3 class="card-label font-weight-bolder text-dark">{{ title }}</h3>
        <span class="text-muted font-weight-bold font-size-sm mt-1">
          {{ subTitle }}
        </span>
      </div>
      <div class="card-toolbar">
        <b-button
          variant="outline-primary"
          size="lg"
          class="mr-2"
          @click="handleExport"
        >
          Export
        </b-button>
        <b-button variant="secondary" size="lg" @click="$router.go(-1)">
          Back
        </b-button>
      </div>
    </div>
    <div class="min-card-h">
      <b-row class="p-2">
        <div class="card-body pb-0">
          <b-row>
            <b-col lg="4">
              <InputText
                label="DPPU"
                v-model="form.dppu.label"
                size="md"
                :use-horizontal="false"
                disabled
              />
            </b-col>
            <b-col lg="4">
              <InputText
                label="Category"
                v-model="form.category.label"
                size="md"
                :use-horizontal="false"
                disabled
              />
            </b-col>
            <b-col lg="4">
              <InputText
                label="Equipment"
                v-model="form.equipment.code"
                size="md"
                :use-horizontal="false"
                disabled
              />
            </b-col>
            <b-col lg="4">
              <InputText
                label="Date"
                v-model="form.date"
                size="md"
                type="date"
                :use-horizontal="false"
                disabled
              />
            </b-col>
            <b-col lg="4">
              <InputText
                label="General Condition"
                v-model="form.generalCondition"
                size="md"
                :use-horizontal="false"
                disabled
              />
            </b-col>
          </b-row>
        </div>
      </b-row>
      <div class="min-card-h">
        <TableItem :rows="table.rows" />
        <EmptyTable
          v-if="table.rows.length == 0"
          title="Checklist activity details are displayed here"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { apiUrl } from "@/core/services/api.url";
import { dateFormat } from "@/core/utils";
import TableItem from "./TableItem.vue";

export default {
  components: {
    TableItem
  },
  data: () => ({
    title: "Checklist Activity",
    route: {
      form: "checklistDetail",
      table: "checklist"
    },
    baseUrl: process.env.NODE_ENV === "production" ? apiUrl.prod : apiUrl.dev,
    form: {
      dppu: {
        label: null
      },
      date: null,
      category: {
        label: null
      },
      equipment: {
        code: null
      },
      generalCondition: null,
      details: null
    },
    table: {
      rows: []
    }
  }),
  computed: {
    subTitle() {
      return "Checklist activity detail";
    }
  },
  created() {
    const self = this;
    self.get();
  },
  methods: {
    get() {
      const self = this;

      let loader = self.$loading.show();
      self.$store
        .dispatch("apis/get", {
          url: `/board/checklist/${self.$route.params.id}`
        })
        .then(response => {
          if (response.error) {
            self.$message.error({
              zIndex: 10000,
              message: response.message
            });

            self.$router.push({ name: self.route.table });
          } else {
            self.form = {
              dppu: response.data.dppu,
              date: dateFormat(response.data.date, "YYYY-MM-DD"),
              category: response.data.category,
              equipment: response.data.equipment,
              generalCondition: response.data.generalCondition,
              details: response.data.details
            };
            self.table.rows = response.data.details;
          }
          loader.hide();
        });
    },
    handleExport() {
      const self = this;

      self.$store
        .dispatch("apis/download", {
          url: `/board/checklist/export/${self.$route.params.id}`
        })
        .then(response => {
          if (response.error) {
            self.$message.error({
              zIndex: 10000,
              message: response.message
            });
          } else {
            let fileURL = window.URL.createObjectURL(new Blob([response])),
              fileLink = document.createElement("a");

            fileLink.href = fileURL;
            fileLink.setAttribute("download", "Checklist.xlsx");
            document.body.appendChild(fileLink);

            fileLink.click();
          }
        });
    }
  }
};
</script>
