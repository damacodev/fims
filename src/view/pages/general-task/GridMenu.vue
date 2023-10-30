<template>
  <div>
    <b-row>
      <b-col lg="4">
        <router-link
          :to="{
            name: 'laporanKerusakan'
          }"
          class="card card-custom bgi-no-repeat card-stretch gutter-b bg-light-success"
          style="background-position: right top; background-size: 30% auto"
          v-bind:style="
            `background-image: url(${require('@/assets/media/svg/shapes/abstract-1.svg')})`
          "
        >
          <div class="card-body">
            <span
              class="card-title font-weight-bold text-muted text-hover-primary font-size-h5"
            >
              Laporan Kerusakan
            </span>

            <p class="text-dark-75 font-weight-bolder font-size-h5 m-0 mt-9">
              Ada temuan kerusakan ? segera laporkan disini
            </p>
          </div>
        </router-link>
      </b-col>
    </b-row>
    <b-row class="mb-6">
      <b-col lg="12">
        <div
          class="quick-search quick-search-inline"
          id="kt_quick_search_inline"
        >
          <div class="quick-search-form">
            <div class="input-group rounded bg-light">
              <div class="input-group-prepend">
                <span class="input-group-text">
                  <span class="svg-icon svg-icon-lg">
                    <inline-svg
                      :src="
                        require('@/assets//media/svg/icons/General/Search.svg')
                      "
                    />
                  </span>
                </span>
              </div>
              <b-input
                v-model="keyword"
                type="text"
                class="form-control h-70px"
                placeholder="Search standard form..."
                autocomplete="off"
                @input="getStandardForm"
              />
              <div class="input-group-append">
                <span class="input-group-text">
                  <i
                    class="quick-search-close ki ki-close icon-sm text-muted"
                  />
                </span>
              </div>
            </div>
          </div>
        </div>
      </b-col>
    </b-row>
    <b-row v-if="isLoading">
      <b-col lg="12">
        Sedang memuat data...
      </b-col>
    </b-row>
    <b-row v-else>
      <b-col v-if="options.standardForm.length == 0" lg="4">
        Standard form tidak ditemukan
      </b-col>
      <b-col
        lg="4"
        v-for="(item, index) in options.standardForm"
        v-bind:key="index"
      >
        <router-link
          :to="{
            name: item.routeName
          }"
          class="card card-custom bgi-no-repeat card-stretch gutter-b"
          style="background-position: right top; background-size: 30% auto"
          v-bind:style="
            `background-image: url(${require('@/assets/media/svg/shapes/' +
              item.backgroundImage)})`
          "
        >
          <div class="card-body">
            <span
              class="card-title font-weight-bold text-muted text-hover-primary font-size-h1"
            >
              {{ item.title }}
            </span>

            <p class="text-dark-75 font-weight-bolder font-size-h5 m-0 mt-3">
              {{ item.subTitle }}
            </p>
          </div>
        </router-link>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  data: () => ({
    isLoading: false,
    keyword: null,
    options: {
      standardForm: []
    }
  }),
  created() {
    this.getStandardForm();
  },
  methods: {
    getStandardForm() {
      const self = this;
      self.isLoading = true;

      self.$store
        .dispatch("apis/get", {
          url: `/common/standard-form`,
          params: {
            grid: true,
            keyword: self.keyword
          }
        })
        .then(response => {
          if (response.error) {
            self.$message.error({
              zIndex: 10000,
              message: response.message
            });
          } else {
            self.options.standardForm = response.data.data;
          }
        })
        .finally(() => (self.isLoading = false));
    }
  }
};
</script>
