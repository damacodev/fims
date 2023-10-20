<template>
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
</template>

<script>
export default {
  data: () => ({
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

      self.$store
        .dispatch("apis/get", {
          url: `/common/standard-form`,
          params: {
            grid: true
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
        });
    }
  }
};
</script>
