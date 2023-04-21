<script setup lang="ts">
/**
 * @params styleClass = tailwind style class값을 넣어준다.
 * @params label = p태그에 적힐 내용을 넣어준다.
 */
const props = defineProps({
  styleClass: {
    default: "",
    type: String,
  },
  label: {
    default: "",
    type: String,
  },
});
</script>

<template>
  <p :class="props.styleClass">
    {{ props.label }}
  </p>
</template>
