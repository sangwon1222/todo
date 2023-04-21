<script setup lang="ts">
import aIcon from "@atoms/aIcon.vue";
import StatusColor from "@store/statusColor";

const emit = defineEmits(["delete", "update"]);
const props = defineProps({
  idx: {
    type: Number,
    default: 0,
  },
});

const changeStatus = (statusInfo: {
  css: string;
  info: string;
  status: number;
}) => {
  const { idx } = props;
  const { status, info } = statusInfo;
  if (info === "삭제") {
    emit("delete", { idx });
  } else {
    emit("update", { idx, status });
  }
};

const statusList = Object.values(StatusColor);
</script>

<template>
  <div class="flex justify-end w-full mx-2 pr-10 text-xs">
    <div
      v-for="(v, i) in statusList"
      :key="i"
      @click="changeStatus(v)"
      class="button-wrap"
    >
      <a-icon :className="(StatusColor as any)[i]['css']" />
      <p class="label">
        {{ (StatusColor as any)[i]["info"] }}
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.button-wrap {
  @apply flex flex-col relative items-center gap-1 cursor-pointer w-10;
  &:hover {
    .label {
      opacity: 100%;
    }
  }
  .label {
    @apply flex justify-center w-full opacity-0 hover:opacity-100 transition-all duration-200;
  }
}
</style>
