<script setup lang="ts">
import { login } from "@store/login";
import { reactive, ref } from "vue";
const emit = defineEmits(["addTodo", "addTodoWrap"]);
const props = defineProps({
  btnLabel: { type: String, defulat: "" },
});

interface StateType {
  idOpen: boolean;
  todoData: string;
}
const state: StateType = reactive({
  idOpen: true,
  todoData: "",
});
const todoInput = ref<HTMLInputElement | any>(null);

const addTodo = (e) => {
  state.todoData = e.target.innerText;
  if (e.shiftKey) return;
  if (!state.todoData.trim()) return;

  emit("addTodo", { todo: state.todoData });
  state.todoData = "";
  e.target.innerText = "";
};

const addTodoWrap = () => {
  emit("addTodoWrap");
};
const closeInput = () => {
  state.todoData = "";
  state.idOpen = false;
};
</script>

<template>
  <button @click="addTodoWrap" class="border rounded-full w-10 h-10 wrap" />
</template>

<style lang="scss" scoped>
.wrap {
  position: relative;
  &:hover {
    &:before {
      transform: translate(-50%, -50%) rotate(-90deg);
    }
    &:after {
      transform: translate(-50%, -50%) rotate(0);
    }
  }
  &:before,
  &:after {
    @apply bg-yellow-50;
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 2px;
    height: 1rem;
    transition: all 0.5s;
  }
  &:before {
    transform: translate(-50%, -50%);
    :hover {
      transform: translate(-50%, -50%) rotate(-90deg);
    }
  }
  &:after {
    transform: translate(-50%, -50%) rotate(-90deg);
  }
}
</style>
