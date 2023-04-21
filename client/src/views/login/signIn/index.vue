<script setup lang="ts">
import { reactive, onMounted } from "vue";
import { router } from "@router/index";
import { login } from "@store/login";

const state = reactive({
  id: "",
  pw: "",
  hasNotAccount: false,
  errorMsg: "",
  inputs: [] as HTMLCollectionOf<HTMLInputElement> | any,
});

const changeId = (e: any) => {
  state.id = e.target.value;
  if (!e.target.value) state.hasNotAccount = false;
};

const changePw = (e: any) => (state.pw = e.target.value);

const signIn = async () => {
  if (!state.id && !state.pw) {
    state.inputs[0]?.focus();
    return;
  }

  const { id, pw } = state;
  const { ok, error } = (await login.signIn({ id, pw })) as {
    ok: boolean;
    error: string;
  };
  state.errorMsg = error;
  state.hasNotAccount = !ok;
  if (ok) {
    router.push({ name: "home" });
  } else {
    state.inputs[0].select();
  }
};

const goSignUp = () => router.push({ name: "sign-up" });

const checkInput = () => {
  let isComplete = true;
  for (const input of state.inputs) {
    if (!input.value) {
      input.focus();
      isComplete = false;
      break;
    }
  }

  if (isComplete) signIn();
};

onMounted(() => {
  state.inputs = document.getElementsByTagName("input");
  state.inputs[0]?.focus();
});
</script>

<template>
  <div class="flex flex-col gap-6 p-10">
    <ul class="flex flex-col gap-6 ml-10">
      <li class="flex">
        <p class="w-20">아이디:</p>
        <input
          class="w-full"
          :value="state.id"
          @input="changeId"
          type="text"
          @keyup.enter="checkInput"
        />
      </li>
      <li class="flex">
        <p class="w-20">비밀번호:</p>
        <input
          class="w-full"
          :value="state.pw"
          @input="changePw"
          type="password"
          @keyup.enter="checkInput"
        />
      </li>
    </ul>
    <div
      class="text-red-600"
      :class="`${state.hasNotAccount ? 'opacity-1' : 'opacity-0'}`"
    >
      <p>{{ state.errorMsg }}</p>
    </div>
    <div class="flex flex-col gap-6 w-full">
      <button @click="checkInput">sign in</button>
      <button
        @click="goSignUp"
        :class="`${
          state.hasNotAccount ? 'bg-sky-400 text-white' : 'text-inherit'
        }`"
      >
        sign up
      </button>
    </div>
  </div>
</template>
