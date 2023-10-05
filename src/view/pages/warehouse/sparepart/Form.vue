<template>
  <div>
    <b-row>
      <b-col lg="12">
        <CardForm :title="title" :subTitle="subTitle">
          <template slot="toolbar">
            <b-button
              v-show="$route.name != route.form"
              variant="outline-danger"
              size="lg"
              class="mr-10"
              @click="handleDelete"
            >
              Delete
            </b-button>
            <b-button
              variant="primary"
              size="lg"
              class="mr-2"
              @click="handleSubmit"
            >
              {{ textButton }}
            </b-button>
            <b-button variant="secondary" size="lg" @click="$router.go(-1)">
              Back
            </b-button>
          </template>
          <template slot="form">
            <b-form @submit.stop.prevent="handleSubmit">
              <div class="card-body">
                <b-form-group
                  v-if="$route.name != route.form"
                  label-cols-lg="4"
                  label-cols-xl="4"
                  content-cols-lg="8"
                  content-cols-xl="5"
                >
                  <vue-qr
                    :text="$route.params.id"
                    :size="72"
                    :margin="0"
                  ></vue-qr>
                </b-form-group>
                <Select
                  v-if="multipleDppu"
                  label="Depot Pengisian Pesawat Udara"
                  v-model="form.dppu"
                  :v="$v.form.dppu"
                  :options="options.dppu"
                  :multiple="false"
                />
                <Select
                  label="Category"
                  v-model="form.category"
                  :v="$v.form.category"
                  :options="options.category"
                  :normalizer="normalizer"
                  :multiple="false"
                />
                <InputText label="Code" v-model="form.code" :v="$v.form.code" />
                <InputText
                  label="Label"
                  v-model="form.label"
                  :v="$v.form.label"
                />
                <InputText
                  label="Minimum Stock"
                  type="number"
                  v-model="form.minimumStock"
                  :v="$v.form.minimumStock"
                />
                <RadioGroup
                  v-if="$route.name != route.form"
                  label="Status"
                  v-model="form.actived"
                  :options="options.status"
                />
                <File
                  label="Images"
                  accept=".png, .jpg, .jpeg"
                  v-model="form.images"
                  :multiple="true"
                  @onChange="handleUpload"
                />
                <b-row v-if="media.length > 0">
                  <b-col lg="8" xl="5" offset="4">
                    <b-alert
                      v-for="item in media"
                      v-bind:key="item.id"
                      variant="success"
                      show
                    >
                      <a
                        :href="`${baseUrl}${item.url}`"
                        class="text-white"
                        target="_blank"
                      >
                        {{ item.originalFileName }}
                      </a>
                      <b-btn-close
                        class="ml-3"
                        @click="handleRemove(`${item.id}`)"
                      />
                    </b-alert>
                  </b-col>
                </b-row>
              </div>
            </b-form>
          </template>
        </CardForm>
      </b-col>
    </b-row>
    <b-row v-if="$route.name != route.form" class="mt-5">
      <b-col lg="12">
        <CardTable
          title="Stock Details"
          subTitle="Display stock transaction history"
          :searchText="searchText"
          :columns="table.columns"
          :rows="table.rows"
          :isLoading="table.isLoading"
          :pageSize="serverParams.pageSize"
          :pageNumber="serverParams.pageNumber"
          :totalPage="table.totalPage"
          :totalRecords="table.totalRecords"
          @onPerPageChange="onPerPageChange"
          @onPageChange="onPageChange"
          @onSearch="onSearch"
        >
          <template #info>
            <div class="ml-2">
              <div class="text-muted">Current Stock</div>
              <div class="font-weight-bold">{{ form.currentStock }} pcs</div>
            </div>
          </template>
          <!-- <template #toolbar>
            <b-button variant="primary" @click="handleOpenForm">
              Add New Stock
            </b-button>
          </template> -->
          <template #empty>
            <EmptyTable
              title="Sparepart Stocks are managed from here"
              description="All sparepart stocks will be displayed on this page"
            />
          </template>
          <template #cell(stockType)="data">
            <b-badge v-if="data.value.id == 0" variant="success">{{
              data.value.label
            }}</b-badge>
            <b-badge v-else variant="danger">{{ data.value.label }}</b-badge>
          </template>
          <template #cell(date)="data">
            {{ dateFormat(data.value) }}
          </template>
          <template #cell(createdAt)="data">
            {{ dateTimeFormat(data.value) }}
          </template>
        </CardTable>

        <FormStock
          ref="formStock"
          :title="formStock.title"
          :buttonLabel="formStock.buttonLabel"
          :form="formStock.form"
          @handleFormSubmit="handleFormSubmit"
        />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import VueQr from "vue-qr";
import { mapGetters } from "vuex";
import FormStock from "./FormStock.vue";
import { apiUrl } from "@/core/services/api.url";
import { required } from "vuelidate/lib/validators";
import { sparepartStock as columns } from "@/core/datasource/columns";
import { category, status } from "@/core/datasource/options";
import { getDppu, dateFormat, dateTimeFormat, getDate } from "@/core/utils";

export default {
  components: {
    FormStock,
    VueQr
  },
  data: () => ({
    title: "Sparepart",
    route: {
      form: "sparepartCreate",
      table: "sparepart"
    },
    baseUrl: process.env.NODE_ENV === "production" ? apiUrl.prod : apiUrl.dev,
    form: {
      dppu: null,
      code: null,
      label: null,
      minimumStock: null,
      actived: true,
      currentStock: null
    },
    media: [],
    normalizer(node) {
      return {
        id: node.value,
        label: node.text
      };
    },
    options: {
      dppu: [],
      category,
      status
    },
    searchText: "Search by remarks",
    serverParams: {
      pageNumber: 1,
      pageSize: 20,
      sparepartId: null,
      keyword: null
    },
    table: {
      isLoading: false,
      columns,
      rows: [],
      totalPage: 0,
      totalRecords: 0
    },
    formStock: {
      title: "New Stock",
      buttonLabel: "Add New",
      form: {
        date: getDate(),
        quantity: null,
        remarks: null
      }
    }
  }),
  computed: {
    ...mapGetters("personalize", ["multipleDppu", "dppu"]),
    subTitle() {
      const self = this;
      return self.$route.name != self.route.form
        ? "Update sparepart"
        : "Create new sparepart";
    },
    textButton() {
      const self = this;
      return self.$route.name != self.route.form ? "Save Changes" : "Submit";
    }
  },
  validations: {
    form: {
      dppu: { required },
      code: { required },
      label: { required },
      minimumStock: { required }
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
      self.form.dppu = self.dppu.id;
    }

    if (self.$route.name != self.route.form) {
      self.get();
      self.getStock();
    }
  },
  methods: {
    dateFormat,
    dateTimeFormat,
    updateParams(newProps) {
      this.serverParams = Object.assign({}, this.serverParams, newProps);
    },
    onRowSelected(/* items */) {
      // const self = this;
      // self.$router.push({
      //   name: "sparepartUpdate",
      //   params: {
      //     id: items[0].id
      //   }
      // });
    },
    onPageChange(params) {
      this.updateParams({ pageNumber: params });
      this.getStock();
    },
    onPerPageChange(params) {
      this.updateParams({ pageSize: params });
      this.getStock();
    },
    onSearch(params) {
      const self = this;
      self.updateParams({
        keyword: params
      });
      self.getStock();
    },
    get() {
      const self = this;

      let loader = self.$loading.show();
      self.$store
        .dispatch("apis/get", {
          url: `/sparepart/${self.$route.params.id}`
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
              dppu: response.data.dppu.id,
              category: response.data.category.id,
              code: response.data.code,
              label: response.data.label,
              minimumStock: response.data.minimumStock,
              actived: response.data.actived,
              currentStock: response.data.currentStock
            };
            self.media = response.data.images;
          }
          loader.hide();
        });
    },
    getStock() {
      const self = this;

      self.table.isLoading = true;
      self.serverParams.sparepartId = self.$route.params.id;
      self.$store
        .dispatch("apis/get", {
          url: "/sparepart/stock",
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
          self.table.isLoading = false;
        });
    },
    handleOpenForm() {
      const self = this;

      self.formStock = {
        title: "New Stock",
        buttonLabel: "Add New",
        form: {
          date: getDate(),
          quantity: null,
          remarks: null
        }
      };
      self.$refs.formStock.showForm();
    },
    handleSubmit() {
      const self = this;

      self.$v.form.$touch();
      if (self.$v.form.$pending || self.$v.form.$error) return;

      let _confirmText = "",
        _okText = "",
        _action = "",
        _url = "",
        _form = {};

      _form = {
        dppuId: self.form.dppu,
        category: self.form.category,
        code: self.form.code,
        label: self.form.label,
        minimumStock: self.form.minimumStock,
        actived: self.form.actived,
        images: self.media.map(x => x.id)
      };

      if (self.$route.name == self.route.form) {
        _confirmText = "You are about to submit this sparepart. Are you sure ?";
        _okText = "Yes, Submit";
        _action = "apis/post";
        _url = "/sparepart";
      } else {
        _confirmText = "You are about to update this sparepart. Are you sure ?";
        _okText = "Yes, Update";
        _action = "apis/put";
        _url = `/sparepart/${self.$route.params.id}`;
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

                self.$router.go(-1);
              }
            });
        });
    },
    handleDelete() {
      const self = this;

      self.$dialog
        .confirm("You are about to delete this sparepart. Are you sure ?", {
          okText: "Yes, Delete",
          cancelText: "Cancel",
          loader: true
        })
        .then(dialog => {
          self.$store
            .dispatch("apis/remove", {
              url: `/sparepart/${self.$route.params.id}`
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

                self.$router.go(-1);
              }
            });
        });
    },
    handleUpload(event) {
      if (event.target.files.length > 0) {
        const self = this;
        let payload = new FormData();

        event.target.files.forEach(item => {
          payload.append("file", item);
        });
        payload.append("group", 3);

        let _url =
          self.$route.name == self.route.form
            ? "media"
            : `media/${self.$route.params.id}`;

        self.$store
          .dispatch("apis/upload", {
            url: _url,
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
              }
            });
        });
    },
    handleFormSubmit(form) {
      const self = this;

      self.$dialog
        .confirm("You are about to submit this stock. Are you sure ?", {
          okText: "Yes, Submit",
          cancelText: "Cancel",
          loader: true
        })
        .then(dialog => {
          self.$store
            .dispatch("apis/post", {
              url: `/sparepart/stock`,
              params: {
                dppuId: self.form.dppu,
                sparepartId: self.$route.params.id,
                date: form.date,
                quantity: form.quantity,
                remarks: form.remarks
              }
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

                self.get();
                self.getStock();
                self.$refs.formStock.closeForm();
              }
            });
        });
    }
  }
};
</script>
