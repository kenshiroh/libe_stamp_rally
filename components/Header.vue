<template>
  <header class="header">
    <nuxt-link to="/">
      <img class="logo" src="/images/logo.png" alt="Logo" />
    </nuxt-link>
    スマホでフェス一周スタンプラリー
    <div class="menu">
      <button @click="toggleMenu" class="menu-button">☰</button>
      <nav class="dropdown-menu" v-show="menuVisible" @click="toggleMenu">
        <ul>
          <li>
            <nuxt-link to="/guide/1"><a href="#">利用方法</a></nuxt-link>
          </li>
          <li>
            <nuxt-link to="/caution"><a href="#">注意事項</a></nuxt-link>
          </li>
          <li>
            <nuxt-link to="/debug"><a href="#">debug</a></nuxt-link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref } from "vue";

const menuVisible = ref(false);

const toggleMenu = () => {
  menuVisible.value = !menuVisible.value;
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  padding: 8px 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 100;
}

.logo {
  height: 40px;
}

.menu {
  position: relative;
}

.menu-button {
  background-color: transparent;
  border: none;
  font-size: 24px;
  cursor: pointer;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 8px 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.dropdown-menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
  width: 200px;
}

.dropdown-menu li {
  padding: 8px 16px;
}

.dropdown-menu a {
  text-decoration: none;
  color: #333;
}

.dropdown-menu a:hover {
  color: #007bff;
}
</style>
