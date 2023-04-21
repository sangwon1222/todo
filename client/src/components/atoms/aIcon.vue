<script setup lang="ts" scoped>
const props = defineProps({
  className: { type: String, default: '' },
  customClass: { type: String, default: '' },
})
</script>

<template>
  <div class="w-4 h-4 border rounded-xl" :class="props.className + ' ' + props.customClass" />
</template>
