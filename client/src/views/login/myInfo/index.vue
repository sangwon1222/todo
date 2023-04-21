<script setup lang="ts">
import { login } from "@store/login";
</script>

<template>
  <div class="relative flex flex-col gap-0 p-4">
    {{ login.user.name }}
    {{ login.user.id }}
    {{ login.user.team.id }}
  </div>
</template>
