<template>
  <div class="group-list">
    <h2>スタンプグループ一覧</h2>
    <div v-for="group in groups" :key="group.id" class="stamp-group">
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
      <!-- 景品取得ボタン -->
      <button
        :class="{
          'get-prize-button': true,
          disabled: !store.isPrizeCollectable(group.id),
        }"
        @click="openPrizeExchangeModal(group)"
      >
        景品を取得する
      </button>
    </div>
    <PrizeExchangeModal ref="prizeExchangeModal" />
  </div>
</template>

<script setup lang="ts">
import { useGroupStore } from "~/pinia";
import { Group, Stamp } from "~/types";
import PrizeExchangeModal from "~/components/PrizeExchangeModal.vue";

const prizeExchangeModal = ref<typeof PrizeExchangeModal>();

const store = useGroupStore();
const groups = computed<Group[]>(
  () => store.getGroupsOrderByStampCollectedTime
);
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
  return stamp.collectedTime
    ? `/images/stamps/${stamp.id}.jpg`
    : `/images/stamps/empty.png`;
};
const openPrizeExchangeModal = (group: Group) => {
  if (store.isPrizeCollectable(group.id)) {
    prizeExchangeModal.value?.openModal(group);
  } else if (!store.isAllStampInGroupCollected(group.id)) {
    alert("グループ内のスタンプを全て集めると景品交換できます");
  } else if (group.collectedTime) {
    alert("景品は既に交換済みです");
  }
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
  .stamp-group {
    text-align: center;
  }
  .get-prize-button {
    &.disabled {
      opacity: 0.4;
    }
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
