<template>
  <div>
    <button @click="onResetAllStampClick">スタンプ全リセット</button>
  </div>
  <!-- 全てのstampの取得有無とトグルをリストする -->
  <div v-for="stamp in stamps" :key="stamp.id">
    <span>{{ stamp.name }}</span>
    <span v-if="stamp.collectedTime"> : {{ stamp.collectedTime }}</span>
    <Toggle
      :isActive="stamp.collectedTime"
      @update:isActive="store.toggleStampCollected(stamp.id)"
    />
  </div>
  <hr />
  <div>
    <button @click="onResetAllPrizeClick">景品全リセット</button>
  </div>
  <!-- 全てのグループ景品の取得有無とトグルをリストする -->
  <div v-for="group in store.groups" :key="group.id">
    <span>{{ group.name }}</span>
    <Toggle
      :isActive="group.collectedTime"
      @update:isActive="store.togglePrizeCollected(group.id)"
    />
  </div>
</template>

<script lang="ts" setup>
import { useGroupStore } from "~/pinia";
import { Group, Stamp } from "~/types";
const store = useGroupStore();

const stamps = computed<Stamp[]>(() => store.getStamps);

const onResetAllStampClick = () => {
  if (window.confirm("全てのスタンプの取得状況をリセットしますか？")) {
    store.resetAllStamps();
  }
};
const onResetAllPrizeClick = () => {
  if (window.confirm("全ての景品の取得状況をリセットしますか？")) {
    store.resetAllPrizes();
  }
};
</script>
