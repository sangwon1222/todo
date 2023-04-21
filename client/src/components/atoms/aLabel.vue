<script setup lang="ts">
import aColorLabel from "@atoms/aColorLabel.vue";

const props = defineProps({
  label: {
    default: "",
    type: String,
  },
  date: {
    default: "",
    type: String,
  },
  name: {
    default: "",
    type: String,
  },
  id: {
    default: "",
    type: String,
  },
  textClass: {
    default: "",
    type: String,
  },
});

/**
 * @description 날짜가 오늘이면 시간, 아니면 날짜 반환
 */
const getTime = () => {
  if (!props.date) return "";
  const fullDate = new Date();
  const m = fullDate.getMonth() + 1;
  const d = fullDate.getDate();

  const year = fullDate.getFullYear();
  const month = `${m}`.length === 1 ? `0${m}` : m;
  const date = `${d}`.length === 1 ? `0${d}` : d;

  const todayDate = `${year}-${month}-${date}`;
  const result =
    props.date.substring(0, 10) === todayDate
      ? `today ${props.date.substring(11)}`
      : props.date.substring(0, 10);

  return result;
};
</script>

<template>
  <div
    class="flex px-4 justify-between text-gray-400 text-xs"
    v-if="props.date && props.name && props.id"
  >
    <div class="flex gap-2">
      <a-color-label :style-class="props.textClass" :label="props.label" />
      <p>{{ getTime() }}</p>
      <a-color-label :style-class="props.textClass" label="by" />
      <p>{{ props.name }}</p>
    </div>

    <div class="flex gap-2 px-4" :class="props.textClass">
      <p>{{ props.id }}</p>
    </div>
  </div>
</template>
<style lang="scss" scoped></style>
