<template>
  <StampList :highlight-stamp-id="stampId" />
  <CollectionModal />
</template>

<script lang="ts" setup>
const route = useRoute();
const stampId = ref<number>(parseInt(route.params.stampId as string));
</script>
