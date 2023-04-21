<script setup lang="ts">
import { reactive } from "vue";
import QuillEditor from "vue3-quill-editor-vite";
import "vue3-quill-editor-vite/dist/style.css";

const props = defineProps({
  contents: {
    default: "",
    type: String,
  },
  idx: {
    default: 0,
    type: Number,
  },
});

const state = reactive({
  quillEditor: {
    content: props.contents,
    _content: props.contents,

    option: {
      placeholder: "할일을 입력하세요.",
      modules: {
        toolbar: true,
      },
    },
    theme: "snow",
    disabled: false,
  },
  editMode: false,
});

const onEditorBlur = (e) => {
  console.log(e, "onEditorBlur");
};
const onEditorFocus = (e) => {
  console.log(e, "onEditorFocus");
};
const onEditorReady = (e) => {
  console.log(e, "onEditorReady");
};
const onEditorChange = ({ quill, html, text }) => {
  console.log("editor change!", quill, html, text);
  state.quillEditor._content = text;
};
</script>

<template>
  <quill-editor
    :options="state.quillEditor.option"
    :disable="!state.editMode"
    @blur="onEditorBlur($event)"
    @focus="onEditorFocus($event)"
    @ready="onEditorReady($event)"
    @change="onEditorChange($event)"
  />
</template>
