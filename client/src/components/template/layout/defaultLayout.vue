<script setup lang="ts">
import { router } from "@router/index";
import { login } from "@store/login";

const signOut = async () => {
  login.isNeedLogin = true;
  localStorage.clear();
  router.push({ name: "sign-in" });
};

const clickId = () => {
  console.log("id", login.user.id);
  router.push({ name: "home" });
};

const clickName = () => {
  console.log("name", login.user.name);
  router.push({ name: "home" });
};
const clickTeam = () => {
  console.log("Team", login.user.team.name);
  router.push({ name: "home" });
};

const addTag = () => {
  console.log(addTag);
};
</script>

<template>
  <header class="shadow-md">
    <div class="flex justify-around gap-1 p-2 text-xs">
      <ul class="flex items-center">
        <li>
          <button @click="addTag">카테고리 추가</button>
        </li>
      </ul>
      <ul class="flex gap-2 px-2">
        <li>
          <button @click="clickId">{{ login.user.id }}</button>
        </li>
        <li>
          <button @click="clickName">{{ login.user.name }}</button>
        </li>
        <li>
          <button @click="clickTeam">{{ login.user.team.name }}</button>
        </li>
      </ul>
      <button @click="signOut">로그아웃</button>
    </div>
  </header>
  <slot />
</template>
