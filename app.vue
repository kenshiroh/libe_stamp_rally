<template>
  <Header />
  <div class="main">
    <nuxt-page />
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from "./.nuxt/imports";
import { useGroupStore } from "./pinia";
const store = useGroupStore();
onMounted(() => {
  store.loadData();
});
</script>

<style scoped>
.main {
  margin-top: 70px;
}
</style>
