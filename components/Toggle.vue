<template>
  <div class="toggle-button" :class="{ active: isActive }" @click="toggle">
    <div class="toggle-button__handle"></div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "ToggleButton",
  props: {
    isActive: {
      type: Boolean,
      required: true,
    },
  },
  setup(props, { emit }) {
    const toggle = () => {
      emit("update:isActive", !props.isActive);
    };

    return {
      toggle,
    };
  },
});
</script>

<style>
.toggle-button {
  position: relative;
  width: 50px;
  height: 25px;
  border-radius: 25px;
  background-color: #ccc;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.toggle-button.active {
  background-color: #4caf50;
}

.toggle-button__handle {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 19px;
  height: 19px;
  border-radius: 50%;
  background-color: #fff;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease;
  transform: translateX(0);
}

.toggle-button.active .toggle-button__handle {
  transform: translateX(26px);
}
</style>
