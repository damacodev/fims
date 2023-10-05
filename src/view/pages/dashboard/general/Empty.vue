<template>
  <div class="card-body text-center">
    <span class="message">
      <img
        :src="require('@/assets/media/svg/illustrations/empty.svg')"
        height="200vh"
        class="mb-10"
      />
      <p class="font-weight-bolder">
        No work items available
        <br />
        <small>Top 5 work items will be displayed here</small>
      </p>
    </span>
  </div>
</template>
