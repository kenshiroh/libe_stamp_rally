<template>
  <h1>ガイド</h1>
  <p>ガイドページです</p>
  <p>進捗は {{ $route.params.progress }} です</p>
  <p>画像1枚もので説明。</p>
  <p>3枚くらい？</p>
  <nuxt-link :to="nextUrl()">次へ</nuxt-link>
</template>

<script lang="ts" setup>
// progressは3まで。その後はトップページへ
const route = useRoute();
const nextUrl = () => {
  const progress = parseInt(route.params.progress as string);
  if (progress < 3) {
    return `/guide/${progress + 1}`;
  } else {
    return "/";
  }
};
</script>
