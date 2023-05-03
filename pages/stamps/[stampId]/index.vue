<template>
  <nuxt-link to="/stamps" class="back-button">
    <button>戻る</button>
  </nuxt-link>
  <div class="stamp-details">
    <h2>{{ stamp?.name }}</h2>
    <p>取得場所:</p>
    <img
      class="location-image"
      :src="locationImage"
      alt="取得場所"
      v-if="locationImage"
    />
    <p>ブースの内容説明: {{ stamp?.description }}</p>
    <p>取得有無: {{ stamp?.isCollected ? "取得済み" : "未取得" }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useGroupStore } from "~/pinia";
import { Group, Stamp } from "~/types";

const route = useRoute();
const router = useRouter();
const groupStore = useGroupStore();

const stampId = ref<number>(parseInt(route.params.stampId as string));

const stamp = computed<Stamp | undefined>(() =>
  groupStore.getStampById(stampId.value)
);
const locationImage = computed<string | null>(() => {
  if (stamp.value?.id) {
    return `/images/locations/${stamp.value.id}.jpg`;
  } else {
    return null;
  }
});
</script>

<style scoped lang="scss">
.stamp-details {
  .location-image {
    width: 200px;
  }
}
</style>
