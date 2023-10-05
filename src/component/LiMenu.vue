<template>
  <router-link :to="to" v-slot="{ href, navigate, isActive, isExactActive }">
    <li
      aria-haspopup="true"
      data-menu-toggle="hover"
      class="menu-item"
      :class="[
        isActive && 'menu-item-active',
        isExactActive && 'menu-item-active'
      ]"
    >
      <a :href="href" class="menu-link" @click="navigate">
        <i :class="`menu-icon ${icon}`"></i>
        <span class="menu-text">{{ text }}</span>
      </a>
    </li>
  </router-link>
</template>

<script>
export default {
  props: ["to", "text", "icon"]
};
</script>
