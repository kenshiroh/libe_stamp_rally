<template>
  <transition name="fade">
    <div class="modal-overlay" @click.self="closeModal" v-if="showModal">
      <div class="prize-exchange-modal">
        <h2>景品交換</h2>
        <p>グループ: {{ group?.name }}</p>
        <p>景品は1グループにつき1個まで交換可能です</p>
        <p>
          ブースで景品を交換する際にこのボタンをブースの運営者に押してもらって下さい
        </p>
        <button @click="exchangePrize">景品を交換した</button>
        <button @click="closeModal">キャンセル</button>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Group } from "~/types";
import { useGroupStore } from "~/pinia";

const showModal = ref(false);
const groupStore = useGroupStore();
const group = ref<Group | null>(null);

const openModal = (groupToExchange: Group) => {
  group.value = groupToExchange;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

const exchangePrize = () => {
  if (group.value) {
    groupStore.setPrizeCollected(group.value.id);
    closeModal();
  }
};

defineExpose({
  openModal,
  closeModal,
});
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  text-align: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.prize-exchange-modal {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  max-width: 70%;
  flex-direction: column;
  gap: 10px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
