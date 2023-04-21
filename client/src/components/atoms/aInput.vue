<script setup lang="ts" scoped>
import { reactive, ref } from "vue";

const props = defineProps({
  label: {
    type: String,
    default: "",
  },
  inputType: {
    type: String,
    default: "text",
  },
  required: {
    type: Boolean,
    default: false,
  },
  value: {
    type: String,
    default: "",
  },
  readOnly: {
    type: Boolean,
    default: false,
  },
  placeholder: {
    type: String,
    default: "할일을 입력해주세요.",
  },
});

const state = reactive({
  isReadOnly: false,
  value: props.value,
});
const emit = defineEmits(["edit"]);
const refInput = ref(null);

const edit = (e) => {
  if (props.readOnly) return;
  state.value = e.target.value;
  emit("edit", e.target.value);
};
const blur = (e) => {
  if (!e.target.value) {
    e.target.value = props.value;
    emit("edit", props.value);
  }
};
</script>
<template>
  <div class="todo-content-input">
    <p v-if="props.label">{{ props.label }}</p>
    <input
      ref="refInput"
      :type="props.inputType"
      :value="state.value"
      :required="props.required"
      :readOnly="props.readOnly"
      :placeholder="props.placeholder"
      class="w-full h-full py-2 cursor-pointer"
      @input="edit"
      @blur="blur"
    />
  </div>
</template>

<style lang="scss" scoped>
.todo-content-input {
  @apply overflow-hidden p-4 w-full bg-transparent text-base text-black text-ellipsis whitespace-nowrap cursor-pointer;
}
</style>
