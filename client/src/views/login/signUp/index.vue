<script setup lang="ts">
import { onMounted, reactive } from "vue";
import { useRouter } from "vue-router";
import { common } from "@store/common";
import aInput from "@atoms/aInput.vue";
import { login } from "@store/login";
import { debounce } from "lodash";

const router = useRouter();
const state = reactive({
  form: {
    id: "",
    pw: "",
    repw: "",
    teamId: "",
    name: "",
  },
  isCheckedId: false,
  isDuplicateId: false,
  inputs: [] as HTMLCollectionOf<HTMLInputElement> | any,
  teamList: [] as any,
});

onMounted(async () => {
  state.teamList = await common.getTeamList();
  state.inputs = document.getElementsByTagName("input");
  state.inputs[0]?.focus();
});

const changeId = (e: any) => {
  state.isCheckedId = false;
  state.form.id = e.target.value;
};
const changePw = (e: any) => (state.form.pw = e.target.value);
const changeRePw = (e: any) => (state.form.repw = e.target.value);
const changeName = (e: any) => (state.form.name = e.target.value);

/**
 * @returns ok ID가 중복되면? false, 아니면 true
 * @description state.isDuplicateId 중복되면 true, 안되면 false
 */
const checkDuplicateId = debounce(async () => {
  state.isCheckedId = true;
  const { ok } = await login.checkId({ id: state.form.id });
  state.isDuplicateId = !ok;
}, 100);

const signUp = debounce(async () => {
  const { id, pw, name, repw, teamId } = state.form;
  if (!(id && pw && name && repw && teamId)) return;
  if (state.isDuplicateId) {
    state.inputs[0].select();
    return;
  }
  const isSignUp = confirm(`${id}로 회원가입 하시겠습니까?`);
  if (!isSignUp) return;
  const data = await login.signUp({ id, pw, name, teamId });
  state.form = { id: "", pw: "", name: "", repw: "", teamId: "" };
  if (data.ok) {
    router.push({ name: "sign-in" });
  } else {
    state.inputs[0]?.select();
  }
}, 200);
</script>

<template>
  <form @submit.prevent="signUp">
    <ul class="flex flex-col items-center py-10">
      <li>
        <a-input
          label="아이디"
          :value="state.form.id"
          @input="changeId"
          @keydown.enter="checkDuplicateId"
          required
        />
        <ol
          class="text-xs py-1"
          :class="`${state.isCheckedId ? 'opacity-1' : 'opacity-0'}`"
        >
          <li v-if="!state.isDuplicateId" class="text-white">
            중복되지 않는 ID입니다
          </li>
          <li v-if="state.isDuplicateId" class="text-red-600">
            중복되는 ID입니다
          </li>
        </ol>
      </li>
      <div
        class="my-1 p-2 rounded-xl border-2 text-xs pointer-cursor"
        @click="checkDuplicateId"
      >
        중복확인
      </div>
      <li>
        <a-input
          label="비밀번호"
          :value="state.form.pw"
          @input="changePw"
          inputType="password"
          required
        />
      </li>
      <li>
        <a-input
          label="비밀번호 확인:"
          :value="state.form.repw"
          @input="changeRePw"
          inputType="password"
          required
        />
      </li>
      <li
        v-if="
          state.form.pw &&
          state.form.repw &&
          `${state.form.pw}` !== `${state.form.repw}`
        "
        class="text-red-600 text-xs py-2"
      >
        비밀번호가 일치하지 않습니다.
      </li>
      <li>
        <a-input
          label="이름:"
          :value="state.form.name"
          @input="changeName"
          required
        />
      </li>

      <li>
        <label for="roles">소속:</label>
        <select
          id="roles"
          name="roles"
          class="w-full"
          v-model="state.form.teamId"
          required
        >
          <option value="" disabled selected>소속을 선택해주세요.</option>
          <option v-for="(v, i) in state.teamList" :key="i" :value="v.idx">
            {{ v.nameKor }}
          </option>
        </select>
      </li>
    </ul>
    <input value="Sign Up" type="submit" @click="signUp" />
    <button @click="() => router.push({ name: 'sign-in' })">Sign In</button>
  </form>
</template>
