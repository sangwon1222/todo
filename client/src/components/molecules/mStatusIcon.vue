<script setup lang="ts" scoped>
import aIcon from "@atoms/aIcon.vue";
const props = defineProps({
  iconClass: { type: String, default: "" },
  label: { type: String, default: "" },
  labelClass: { type: String, default: "" },
  flexCol: { type: Boolean, default: false },
});
</script>

<!-- 
  // todo status code =>
  // 0 => 미확인
  // 1 => 진행중
  // 2 => 완료
  // 3 => 대기
  // 4 => 삭제 
-->

<template>
  <div class="flex gap-2" :class="props.flexCol ? 'flex-col' : 'items-center'">
    <a-icon :class-name="props.iconClass" />
    <p v-if="props.label" :class="props.labelClass">
      {{ props.label }}
    </p>
  </div>
</template>
