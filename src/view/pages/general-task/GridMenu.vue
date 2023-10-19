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
    <b-col lg="4" v-for="(item, index) in sfGrid" v-bind:key="index">
      <router-link
        :to="{
          name: item.route
        }"
        class="card card-custom bgi-no-repeat card-stretch gutter-b"
        style="background-position: right top; background-size: 30% auto"
        v-bind:style="
          `background-image: url(${require('@/assets/media/svg/shapes/' +
            item.bgImg)})`
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
    sfGrid: [
      {
        route: "sf103",
        title: "103 SF",
        subTitle: "Bridger Quality Control Before Receipt Record",
        bgImg: "abstract-2.svg"
      },
      {
        route: "sf109",
        title: "109 SF",
        subTitle: "Storage Tank Sump Record",
        bgImg: "abstract-3.svg"
      }
    ]
  })
};
</script>
