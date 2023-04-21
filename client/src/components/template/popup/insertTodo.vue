<script setup lang="ts">
import { onMounted } from 'vue'

const emit = defineEmits(['addTodo', 'close'])

onMounted(() => {
  const input = document.getElementById('insertInput') as HTMLInputElement
  input.focus()
})
const addTodo = () => {
  const input = document.getElementById('insertInput') as HTMLInputElement
  if (!input.value) return
  emit('addTodo', input.value)
  input.value = ''
  input.focus()
}
</script>

<template>
  <div class="absolute flex flex-col flex-wrap bottom-0 bg-white rounded w-full px-2">
    <input id="insertInput" class="w-full p-2" type="text" @keyup.enter="addTodo" />
    <div class="flex gap-4">
      <button @click="addTodo" class="border-2">INSERT</button>
      <button @click="$emit('close')" class="border-2">EXIT</button>
    </div>
  </div>
</template>
