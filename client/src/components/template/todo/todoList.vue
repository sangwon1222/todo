<script setup lang="ts">
import aStatusButton from "@atoms/aStatusButton.vue";
import aTodoButton from "@atoms/aTodoButton.vue";
import aTodoInput from "@atoms/todo/aTodoInput.vue";
import { TodoType, todoApi } from "@store/todo";
import { reactive, onMounted, ref } from "vue";
import StatusColor from "@store/statusColor";
import aLabel from "@atoms/aLabel.vue";
import { login } from "@store/login";

const props = defineProps({
  title: {
    default: "user",
    type: String,
  },
});

interface TodoDataType {
  todoList: TodoType[];
  teamModeParms: number;
}

const state: TodoDataType = reactive({
  todoList: [] as TodoType[],
  teamModeParms:
    props.title.toLowerCase() === "user" ? null : +login.user.team.id,
});

interface UpdateTodoType {
  idx: number;
  todo?: string;
  status?: number;
}

const refWrap = ref(null);
onMounted(async () => await updateTodoList());

/**@description TODO 추가
 * @param todo todo 내용
 */
const addTodo = async ({ todo }: { todo: string }) => {
  const teamId = state.teamModeParms;
  const { ok, error } = await todoApi.addTodo({ todo, teamId });
  if (ok) {
    await updateTodoList();
  } else {
    console.log(error);
  }
};

/**@description TODO 수정.
 * @param idx: todo항목의 index
 * @param todo: todo 내용
 * @param status: todo의 상태값 1)진행중,2)완료..
 */
const updateTodo = async ({ idx, todo, status }: UpdateTodoType) => {
  const teamId = state.teamModeParms;
  if (!idx) {
    addTodo({ todo });
    return;
  }
  const { ok, error } = await todoApi.updateTodo({ idx, todo, status, teamId });
  if (ok) {
    await updateTodoList();
  } else {
    console.log(error);
  }
};

/**@description TODO 항목삭제.
 */
const deleteTodo = async ({ idx }: { idx: number }) => {
  const isDelete = confirm("삭제 하시겠습니까?");
  if (!isDelete) return;
  const teamId = state.teamModeParms;
  const { ok, error } = await todoApi.deleteTodo({ idx, teamId });
  if (ok) await updateTodoList();
  else console.log(error);
};

/**@description TODO 항목들을 최신화.
 */
const updateTodoList = async () => {
  state.todoList = [];
  const teamId = state.teamModeParms;
  const { result } = await todoApi.getTodo({ teamId });
  state.todoList = result;
};

/**@description TODO 입력창 하나 추가
 */
const addTodoWrap = () => {
  state.todoList.push({
    contents: "",
    createDate: null,
    creatorId: login.user.id,
    creatorName: login.user.name,
    creatorTeamId: login.user.team.id,
    idx: null,
    status: 0,
    tag: null,
    updateDate: null,
    updaterId: null,
    updaterName: null,
    updaterTeamId: null,
  });
  // state.todoList = result;
  console.log(state.todoList);
};
</script>

<template>
  <div class="overflow-hidden duration-300 transition-all" ref="refWrap">
    <div
      v-for="(todo, index) of state.todoList"
      :key="todo.idx"
      class="todo-card-wrap"
      :class="(StatusColor as any)[todo.status]['css']?? ''"
    >
      <div class="grid-col font-bold">
        <a-label
          label="created"
          :date="todo.createDate"
          :name="todo.creatorName"
          :id="todo.creatorId"
          textClass="text-slate-950 "
        />
        <a-label
          label="updated"
          :date="todo.updateDate"
          :name="todo.updaterName"
          :id="todo.updaterId"
          :right-label="todo.updaterId"
          textClass="text-slate-950 font-bold"
        />
      </div>

      <a-status-button
        :idx="todo.idx"
        @delete="deleteTodo"
        @update="updateTodo"
      />

      <a-todo-input
        :todoIdx="todo.idx"
        :todo="todo.contents"
        @update="updateTodo"
      />
    </div>

    <a-todo-button
      btnLabel="add"
      @add-todo="addTodo"
      @add-todo-wrap="addTodoWrap"
    />
  </div>
</template>

<style lang="scss" scoped>
.todo-card-wrap {
  @apply flex flex-col text-xs mb-4 rounded-xl;
  transition: all 0.5s;
}
</style>
