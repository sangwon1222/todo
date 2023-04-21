<script setup lang="ts">
import {
  ComponentInternalInstance,
  getCurrentInstance,
  onMounted,
  provide,
} from "vue";
import { router } from "@router/index";
import layout from "@template/layout.vue";
import { Manager } from "socket.io-client";

const app = (getCurrentInstance() as ComponentInternalInstance).appContext
  .config.globalProperties;
provide("router", app.$router);

const mode = import.meta.env.MODE;
const isProdiction = mode === "production";
if (isProdiction) {
  console.log(
    `%c                     `,
    "padding: 4px 100px;  background-color: #71717A;"
  );
  console.log(
    `%c wellcome weoffice.. `,
    "padding: 40px 100px;  background-color: #2f3241; color:#ff; "
  );
}

window.top.document.title = isProdiction ? "weoffice" : "개발서버";
const baseURL = isProdiction
  ? "http://weoffice.sonidlab.co.kr/api/"
  : `http://localhost:1222/api/`;
const manager = new Manager(baseURL, {
  autoConnect: true,
  path: "/socket",
});

const socket = manager.socket("/");

// socket.emit('ping', 100)
manager.on("open", async () => {
  (window as { [key: string]: any })["io"] = socket;

  socket.onAny((evt: string, data: any) => {
    console.log("->", evt, data);
  });
});

manager.open((err: any) => {
  console.log("eror", err);
});

onMounted(() => router.push({ path: "/sign-in" }));
</script>

<template>
  <router-view v-slot="{ Component }">
    <layout>
      <component :is="Component" :key="$route.fullPath" />
    </layout>
  </router-view>
</template>
