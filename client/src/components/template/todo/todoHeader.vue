<script setup lang="ts">
import StatusColor from "@store/statusColor";
import mStatusIcon from "@mole/mStatusIcon.vue";

const props = defineProps({
  title: {
    type: String,
    default: "",
  },
});
const emits = defineEmits(["foldList"]);
</script>

<template>
  <div class="flex py-6 pr-6 justify-between cursor-pointer">
    <div class="flex">
      <div class="layout-center pr-10">
        <p class="drop-down-btn" />
      </div>
      <p class="layout-center">{{ props.title }} TODO LIST</p>
    </div>

    <ul class="flex gap-2 text-xs font-bold">
      <li
        v-for="(v, i) in Object.values(StatusColor)"
        :key="i"
        class="flex items-center gap-1"
      >
        <m-status-icon :iconClass="`${v.css} w-2 h-2`" :label="v.info" />
      </li>
    </ul>
  </div>
</template>
