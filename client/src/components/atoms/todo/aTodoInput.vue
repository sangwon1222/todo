<script setup lang="ts">
import { emit } from "process";
import { reactive } from "vue";
import QuillEditor from "vue3-quill-editor-vite";
import "vue3-quill-editor-vite/dist/style.css";

const props = defineProps({
  todoIdx: {
    default: 0,
    type: Number,
  },
  todo: {
    default: "",
    type: String,
  },
});
const state = reactive({
  editMode: false,
  quillEditor: {
    content: props.todo,
    _content: props.todo,
    option: {
      placeholder: "할일을 입력하세요.",
    },
    theme: "snow",
    disabled: false,
  },
});
const emit = defineEmits(["edit", "update"]);

const onEditorReady = (e) => {
  e.focus();
  e.value = props.todo;
};

const onEditorChange = ({ _quill, html, _text }) => {
  state.quillEditor._content = html;
};

const convertEditMode = () => {
  state.editMode = !state.editMode;
};

const completeEdit = () => {
  const edited = state.quillEditor._content;
  emit("update", { idx: props.todoIdx, todo: edited });
};
</script>

<template>
  <div class="grid-col p-4">
    <div
      v-if="!state.editMode"
      class="p-4 border rounded-xl cursor-pointer"
      v-html="props.todo"
    />

    <quill-editor
      class="bg-white rounded-xl"
      :value="state.quillEditor.content"
      :options="state.quillEditor.option"
      :disable="!state.editMode"
      @ready="onEditorReady($event)"
      @change="onEditorChange($event)"
    />

    <div v-if="state.quillEditor.content !== state.quillEditor._content">
      <div class="py-4">
        <button class="float-right border px-6 mx-6" @click="completeEdit">
          edit Todo
        </button>
        <button class="float-right border px-6 mx-6" @click="convertEditMode">
          close
        </button>
      </div>
    </div>
  </div>
</template>
