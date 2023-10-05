<template>
  <div>
    <b-row>
      <b-col lg="12">
        <Form
          :route="route"
          :title="title"
          :subTitle="subTitle"
          :form="form"
          :options="options"
          :transactionItems="transactionItems"
          @onSearchSpareparts="getSpareparts"
          @onDelete="handleDelete"
        />
      </b-col>
    </b-row>
    <b-row class="mt-5">
      <b-col lg="8">
        <SparepartCatalog
          :disabled="form.dppuId == null"
          :form="form"
          :rows="table.rows"
          :isLoading="table.isLoading"
          :pageSize="serverParams.pageSize"
          :pageNumber="serverParams.pageNumber"
          :totalPage="table.totalPage"
          :totalRecords="table.totalRecords"
          @onPerPageChange="onPerPageChange"
          @onPageChange="onPageChange"
          @onSearch="onSearch"
          @onSelected="handleOpenModal"
        />
      </b-col>
      <b-col lg="4">
        <TransactionItem
          :route="route"
          :items="transactionItems"
          @onSelected="handleOpenModal"
          @onSubmit="handleSubmit"
        />
      </b-col>
    </b-row>

    <div
      id="kt_quick_dailystock"
      ref="kt_quick_dailystock"
      class="offcanvas offcanvas-right p-10"
    >
      <ModalSparepart
        ref="modalSparepart"
        :mode="modalSparepart.mode"
        :title="modalSparepart.title"
        :buttonLabel="modalSparepart.buttonLabel"
        :form="modalSparepart.form"
        @onClose="handleCloseModal"
        @onSubmit="handleSubmitModal"
        @onDelete="handleDeleteModal"
      />
    </div>
  </div>
</template>

<script>
import KTLayoutQuickDailystock from "@/assets/js/layout/extended/quick-dailystock.js";
import KTOffcanvas from "@/assets/js/components/offcanvas.js";

import { mapGetters } from "vuex";
import { required } from "vuelidate/lib/validators";
import { getDppu, getDate, dateTimeFormat, dateFormat } from "@/core/utils";
import { inOut } from "@/core/datasource/options";
import Form from "./Form.vue";
import SparepartCatalog from "./SparepartCatalog.vue";
import TransactionItem from "./TransactionItem.vue";
import ModalSparepart from "./ModalSparepart.vue";

export default {
  components: {
    Form,
    SparepartCatalog,
    TransactionItem,
    ModalSparepart
  },
  data: () => ({
    title: "Daily Stock",
    route: {
      form: "dailyStockCreate",
      table: "dailyStock"
    },
    form: {
      dppuId: null,
      transactionId: "Auto Generated",
      stockType: 1,
      date: getDate(),
      remarks: null
    },
    normalizer(node) {
      return {
        id: node.value,
        label: node.text
      };
    },
    options: {
      dppu: [],
      inOut
    },
    serverParams: {
      pageNumber: 1,
      pageSize: 9,
      dppu: null,
      keyword: null
    },
    table: {
      rows: [],
      totalPage: 0,
      totalRecords: 0
    },
    modalSparepart: {
      mode: "add",
      title: "Add Sparepart",
      buttonLabel: "Add New",
      form: {
        sparepart: null,
        quantity: null
      }
    },
    transactionItems: []
  }),
  computed: {
    ...mapGetters("personalize", ["multipleDppu", "dppu"]),
    subTitle() {
      const self = this;
      return self.$route.name != self.route.form
        ? "Update transaction"
        : "Create new transaction";
    },
    textButton() {
      const self = this;
      return self.$route.name != self.route.form ? "Save Changes" : "Submit";
    }
  },
  validations: {
    form: {
      dppuId: { required },
      stockType: { required },
      date: { required }
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
    }
  },
  mounted() {
    KTLayoutQuickDailystock.init(this.$refs["kt_quick_dailystock"]);
  },
  methods: {
    dateTimeFormat,
    updateParams(newProps) {
      this.serverParams = Object.assign({}, this.serverParams, newProps);
    },
    onRowSelected(items) {
      const self = this;
      self.$router.push({
        name: "sparepartUpdate",
        params: {
          id: items[0].id
        }
      });
    },
    onPageChange(params) {
      this.updateParams({ pageNumber: params });
      this.getSpareparts();
    },
    onPerPageChange(params) {
      this.updateParams({ pageSize: params });
      this.getSpareparts();
    },
    onSearch(params) {
      const self = this;
      self.updateParams({
        keyword: params,
        pageNumber: 1,
        pageSize: 9
      });
      self.getSpareparts();
    },
    getSpareparts() {
      const self = this;

      self.serverParams.dppu = self.form.dppuId;
      self.table.rows = [];

      if (self.serverParams.dppu != null) {
        let loader = self.$loading.show();
        self.$store
          .dispatch("apis/get", {
            url: `/sparepart`,
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
            loader.hide();
          });
      }
    },
    get() {
      const self = this;

      let loader = self.$loading.show();
      self.$store
        .dispatch("apis/get", {
          url: `/sparepart/dailystock/${self.$route.params.id}`
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
              dppuId: response.data.dppu.id,
              transactionId: response.data.transactionId,
              stockType: response.data.stockType.id,
              date: dateFormat(response.data.date, "YYYY-MM-DD"),
              remarks: response.data.remarks
            };
            self.transactionItems = response.data.items;
          }
          loader.hide();
        });
    },
    handleSubmit() {
      const self = this;

      self.$v.form.$touch();
      if (self.$v.form.$pending || self.$v.form.$error) return;

      let _confirmText = "",
        _okText = "",
        _action = "",
        _url = "";

      if (self.$route.name == self.route.form) {
        _confirmText =
          "You are about to submit this transaction. Are you sure ?";
        _okText = "Yes, Submit";
        _action = "apis/post";
        _url = "/sparepart/dailystock";
      } else {
        _confirmText =
          "You are about to update this transaction. Are you sure ?";
        _okText = "Yes, Update";
        _action = "apis/put";
        _url = `/sparepart/dailystock/${self.$route.params.id}`;
      }

      let _form = {
        dppuId: self.form.dppuId,
        stockType: self.form.stockType,
        date: self.form.date,
        remarks: self.form.remarks,
        items: self.transactionItems.map(x => ({
          sparepartId: x.sparepart.id,
          quantity: x.quantity
        }))
      };

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
        .confirm("You are about to delete this transaction. Are you sure ?", {
          okText: "Yes, Delete",
          cancelText: "Cancel",
          loader: true
        })
        .then(dialog => {
          self.$store
            .dispatch("apis/remove", {
              url: `/sparepart/dailystock/${self.$route.params.id}`
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
    handleOpenModal(params) {
      const self = this;

      let findIndex = self.transactionItems.findIndex(
        x => x.sparepart.id == params.id
      );

      self.modalSparepart = {
        mode: findIndex < 0 ? "add" : "edit",
        title: findIndex < 0 ? "Add Transaction" : "Edit Transaction",
        buttonLabel:
          findIndex >= 0
            ? "Update"
            : self.form.stockType == 1
            ? "Order"
            : "Add",
        form: {
          sparepart: params,
          quantity:
            findIndex < 0 ? null : self.transactionItems[findIndex].quantity
        }
      };
      new KTOffcanvas(KTLayoutQuickDailystock.getElement()).show();
      self.$refs.modalSparepart.handleResetForm();
    },
    handleCloseModal() {
      new KTOffcanvas(KTLayoutQuickDailystock.getElement()).hide();
    },
    handleSubmitModal(form) {
      const self = this;

      let findIndex = self.transactionItems.findIndex(
        x => x.sparepart.id == form.sparepart.id
      );

      if (findIndex < 0) self.transactionItems.push(form);
      else self.transactionItems[findIndex].quantity = form.quantity;

      self.handleCloseModal();
    },
    handleDeleteModal(form) {
      const self = this;

      let findIndex = self.transactionItems.findIndex(
        x => x.sparepart.id == form.sparepart.id
      );

      if (findIndex >= 0) self.transactionItems.splice(findIndex, 1);

      self.handleCloseModal();
    }
  }
};
</script>
