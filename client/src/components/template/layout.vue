<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import DefaultLayout from "@template/layout/defaultLayout.vue";
import ClearLayout from "@template/layout/clearLayout.vue";

const route = useRoute();
const layout = computed(() => {
  const layouts = {
    DefaultLayout,
    ClearLayout,
  };
  const layoutName = (route.meta.layout as string) ?? "DefaultLayout";
  return (layouts as any)[layoutName];
});
</script>

<template>
  <component :is="layout">
    <slot />
  </component>
</template>

<style lang="scss"></style>
