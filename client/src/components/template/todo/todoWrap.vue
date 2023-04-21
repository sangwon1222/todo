<script setup lang="ts">
import todoList from "@template/todo/todoList.vue";
import TodoHeader from "@template/todo/todoHeader.vue";
import { ref } from "vue";

const props = defineProps({
  title: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <div>
    <TodoHeader :title="props.title" />
    <todo-list :title="props.title" />
  </div>
</template>
