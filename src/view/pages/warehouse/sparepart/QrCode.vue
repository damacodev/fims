<template>
  <div class="card card-custom">
    <div class="card-header py-3">
      <div class="card-title align-items-start flex-column">
        <h3 class="card-label font-weight-bolder text-dark">
          <b-button class="btn-icon mr-2" size="xs" @click="$router.go(-1)">
            <i class="flaticon2-back" />
          </b-button>
          Sparepart QR Code
        </h3>
      </div>
      <div class="card-toolbar">
        <b-button variant="primary" size="lg" @click="handlePrint">
          Print
        </b-button>
      </div>
    </div>
    <div class="card-body">
      <b-row class="p-3">
        <b-col xl="3">
          <treeselect
            class="mb-2"
            placeholder="Select DPPU"
            v-model="serverParams.dppu"
            :options="options.dppu"
            @input="onFilter"
          ></treeselect>
        </b-col>
        <b-col xl="3">
          <treeselect
            class="mb-2"
            placeholder="Select Category"
            v-model="serverParams.category"
            :options="options.category"
            :normalizer="normalizer"
            @input="onFilter"
          ></treeselect>
        </b-col>
        <b-col xl="3">
          <b-form-input
            v-model="serverParams.label"
            placeholder="Search label"
            autocomplete="off"
            @input="onFilter"
          ></b-form-input>
        </b-col>
        <b-col xl="3">
          <treeselect
            class="mb-2"
            placeholder="Select status"
            v-model="serverParams.actived"
            :options="options.status"
            :normalizer="normalizer"
            @input="onFilter"
          ></treeselect>
        </b-col>
      </b-row>
      <b-row v-if="table.rows.length == 0">
        <b-col lg="12">
          <EmptyTable
            title="There is no spareparts to displayed here"
            description="Please select DPPU first"
          />
        </b-col>
      </b-row>
      <b-row v-else id="printQrCode">
        <b-col lg="12">
          <b-card-group columns class="mt-5">
            <div
              class="card card-custom"
              v-for="row in table.rows"
              v-bind:key="row.id"
            >
              <div class="card-header py-3">
                <div class="card-title align-items-start flex-column">
                  <h4 class="card-label font-weight-bolder text-dark">
                    {{ `${row.code}, ${row.label}` }}
                  </h4>
                  <span class="text-muted font-weight-bold font-size-sm mt-1">
                    {{ row.category.label }}
                  </span>
                </div>
              </div>
              <div class="card-body text-center">
                <vue-qr :text="row.id" :size="200" :margin="0"></vue-qr>
              </div>
            </div>
          </b-card-group>
        </b-col>
      </b-row>
    </div>
    <div class="card-footer">
      <b-row class="d-flex justify-content-center justify-content-md-between">
        <span class="text-results my-auto">
          Showing {{ showing }} of {{ table.totalRecords }} results
        </span>
        <div
          class="
            d-block d-md-flex
            justify-content-center justify-content-md-between
            page-item-wrapper
          "
        >
          <div
            class="
              d-none
              text-small-gray-13
              d-md-flex
              align-items-center
              mr-3
              justify-content-center
            "
          >
            <span>Per page:</span>
            <span
              v-for="page in pages"
              v-bind:key="page"
              :class="`ml-2 ${page != serverParams.pageSize ? 'is-link' : ''}`"
              @click="onPerPageChange(page)"
            >
              {{ page }}
            </span>
          </div>
          <b-pagination
            v-model="serverParams.pageNumber"
            @change="onPageChange"
            :total-rows="table.totalRecords"
            :per-page="serverParams.pageSize"
            first-number
            prev-text="Prev"
            next-text="Next"
            last-number
            size="md"
            class="mb-0"
          >
          </b-pagination>
        </div>
      </b-row>
    </div>
  </div>
  <!-- <CardForm :title="title" :subTitle="subTitle">
    <template slot="toolbar">
      <b-button variant="primary" size="lg" class="mr-2"> Print </b-button>
      <b-button variant="secondary" size="lg" @click="$router.go(-1)">
        Back
      </b-button>
    </template>
    <template slot="form">
      <b-row class="p-3">
        <b-col xl="3">
          <b-form-input
            v-model="serverParams.label"
            placeholder="Search label"
            autocomplete="off"
            @input="onFilter"
          ></b-form-input>
        </b-col>
        <b-col xl="3">
          <treeselect
            class="mb-2"
            placeholder="Select DPPU"
            v-model="serverParams.dppu"
            :options="options.dppu"
            @input="onFilter"
          ></treeselect>
        </b-col>
        <b-col xl="3">
          <treeselect
            class="mb-2"
            placeholder="Select status"
            v-model="serverParams.actived"
            :options="options.status"
            :normalizer="normalizer"
            @input="onFilter"
          ></treeselect>
        </b-col>
        <b-col xl="3">
          <treeselect
            class="mb-2"
            placeholder="Warning"
            v-model="serverParams.warning"
            :options="options.warning"
            :normalizer="normalizer"
            @input="onFilter"
          ></treeselect>
        </b-col>
      </b-row>
      <b-row>
        <b-col lg="12">
          <b-card-group columns class="mt-5">
            <div
              class="card card-custom"
              v-for="row in table.rows"
              v-bind:key="row.id"
            >
              <qr-code :text="row.id" :size="100"></qr-code>
              <div class="card-header py-3">
                <div class="card-title align-items-start flex-column">
                  <h4 class="card-label font-weight-bolder text-dark">
                    {{ `${row.code}, ${row.label}` }}
                  </h4>
                  <span class="text-muted font-weight-bold font-size-sm mt-1">
                    {{ row.category.label }}
                  </span>
                </div>
              </div>
            </div>
          </b-card-group>
        </b-col>
      </b-row>
    </template>
  </CardForm> -->
</template>

<script>
import VueQr from "vue-qr";
import { mapGetters } from "vuex";
import { category, status } from "@/core/datasource/options";
import { getDppu } from "@/core/utils";

export default {
  components: {
    VueQr
  },
  data: () => ({
    title: "QR Code",
    subTitle: "Display all spareparts qr code",
    serverParams: {
      pageNumber: 1,
      pageSize: 9,
      dppu: null,
      category: null,
      label: null,
      status: null
    },
    pages: [9, 45, 90, "All"],
    table: {
      rows: [],
      totalPage: 0,
      totalRecords: 0
    },
    options: {
      dppu: [],
      category,
      status
    },
    normalizer(node) {
      return {
        id: node.value,
        label: node.text
      };
    }
  }),
  computed: {
    ...mapGetters("personalize", ["multipleDppu", "dppu"]),
    showing() {
      const self = this;
      let page = self.serverParams.pageNumber - 1;
      return self.serverParams.pageSize * page + self.table.rows.length;
    }
  },
  created() {
    const self = this;
    if (self.multipleDppu) {
      getDppu().then(response => {
        self.options.dppu = response.data.map(x => ({
          id: x.id,
          label: x.name
        }));
      });
    } else {
      self.options.dppu = [self.dppu];
    }
    if (self.dppu) {
      self.serverParams.dppu = self.dppu.id;
    }
    self.getAll();
  },
  methods: {
    updateParams(newProps) {
      this.serverParams = Object.assign({}, this.serverParams, newProps);
    },
    onPageChange(params) {
      this.updateParams({ pageNumber: params });
      this.getAll();
    },
    onPerPageChange(params) {
      this.updateParams({ pageSize: params == "All" ? null : params });
      this.getAll();
    },
    onSearch(params) {
      const self = this;
      self.updateParams({
        label: params
      });
      self.getAll();
    },
    onFilter() {
      const self = this;
      self.getAll();
    },
    getAll() {
      const self = this;

      self.$store
        .dispatch("apis/get", {
          url: "/sparepart",
          params: self.serverParams
        })
        .then(response => {
          if (response.error) {
            self.$message.error({
              zIndex: 10000,
              message: response.message
            });
          } else {
            self.table.rows = response.data.data;
            self.table.totalPage = response.data.totalPage;
            self.table.totalRecords = response.data.totalData;
          }
        });
    },
    async handlePrint() {
      await this.$htmlToPaper("printQrCode");
    }
  }
};
</script>
