<template>
  <transition name="fade">
    <div class="modal-overlay" @click="closeModal" v-if="showModal">
      <img src="/images/collected.gif" alt="Collected" class="collected-gif" />
    </div>
  </transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const showModal = ref(true);

const closeModal = () => {
  showModal.value = false;
};

const timeoutId = ref(0);

onMounted(() => {
  timeoutId.value = setTimeout(closeModal, 3000);
});

onUnmounted(() => {
  clearTimeout(timeoutId.value);
});
</script>

<style scoped>
.modal-overlay {
  position: fixed;
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

.collected-gif {
  width: 300px;
  height: auto;
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
