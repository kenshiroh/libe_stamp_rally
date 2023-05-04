<template>
  <div class="group-list">
    <h2>スタンプグループ一覧</h2>
    <div v-for="group in groups" :key="group.id">
      <h3 class="group-header">{{ group.name }}</h3>
      <div class="group-container">
        <div
          :class="{ item: true, highlighted: shouldBeHighlighted(stamp) }"
          v-for="stamp in group.stamps"
          :key="stamp.id"
        >
          <nuxt-link :to="`/stamps/${stamp.id}/`">
            <img
              class="stamp-image"
              :src="stampImageSrc(stamp)"
              alt="取得場所"
            />
            <br />
            <span>{{ stamp.name }}</span>
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import StampId from "~/pages/stamps/[stampId].vue";
import { useGroupStore } from "~/pinia";
import { Group, Stamp } from "~/types";

const store = useGroupStore();
const groups = computed<Group[]>(() => store.groups);
const props = defineProps({
  highlightStampId: {
    type: Number,
    required: false,
  },
});
const shouldBeHighlighted = (stamp: Stamp) => {
  return stamp.id === props.highlightStampId;
};
const stampImageSrc = (stamp: Stamp) => {
  return stamp.isCollected
    ? `/images/stamps/${stamp.id}.jpg`
    : `/images/stamps/empty.png`;
};
</script>

<style scoped lang="scss">
/* Create the glowing animation */
@keyframes glow {
  0% {
    background: rgba(0, 0, 0, 0.4);
  }
  100% {
    background: rgba(255, 255, 255, 0.8);
  }
}
.group-list {
  .group-header {
    text-align: center;
  }
  .group-container {
    margin-bottom: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 0 auto;
    .item {
      text-align: center;
      margin-right: 10px;
      margin-bottom: 20px;
      width: 110px;
      height: 110px;
      padding: 5px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border: 1px solid #ccc;
      border-radius: 10px;
      box-sizing: border-box;
      &.highlighted {
        // background: blue;
        animation: glow 1s infinite;
      }
      img {
        width: 70px;
      }
    }
  }
  .stamp-image {
    width: 80px;
  }
}
</style>
