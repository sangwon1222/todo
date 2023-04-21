<script setup lang="ts">
import todoWrap from "@components/template/todo/todoWrap.vue";
import { onMounted, reactive } from "vue";

const state = reactive({
  currentTab: "",
  tabList: ["user", "team"],
});

onMounted(() => {
  state.currentTab = state.tabList[0];
  const tabBtn = Array.from(document.getElementsByClassName("tab-btn"));
  tabBtn[0].classList.add("select");
});

//! 버그!!
const changeTab = (e: PointerEvent | MouseEvent, tabName: string) => {
  state.currentTab = tabName;

  const tabBtnAry = Array.from(document.getElementsByClassName("tab-btn"));
  for (const btn of tabBtnAry) {
    btn.classList.remove("select");
  }

  const tabBtn = e.target as HTMLButtonElement;
  tabBtn.classList.add("select");
};
</script>

<template>
  <div class="w-full max-w-7xl">
    <div class="flex">
      <button
        v-for="(v, i) in state.tabList"
        :key="i"
        class="tab-btn"
        @click.prevent="changeTab($event, v)"
      >
        {{ v }}
      </button>
    </div>

    <div v-for="(v, i) in state.tabList" :key="i" class="wrap">
      <todo-wrap :title="v" v-if="state.currentTab === v" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tab-btn {
  @apply px-4;
}
.select {
  @apply bg-slate-100 text-black;
}
</style>
