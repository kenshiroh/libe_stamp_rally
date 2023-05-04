<template>
  <StampList :highlight-stamp-id="stampId" />
  <CollectionModal />
</template>

<script lang="ts" setup>
import { useGroupStore } from "~/pinia";
const store = useGroupStore();
const route = useRoute();
const stampId = ref<number>(parseInt(route.params.stampId as string));
onMounted(() => {
  store.setStampCollected(stampId.value);
});
</script>
