<script setup lang="ts">
import type { IBank } from "@/models/bank";
const selectBank = ref<IBank | null>(null)
</script>
<template>
  <div class="p-4 max-w-lg mx-auto">
    <SelectBank v-model="selectBank" />
  </div>
</template>
<style></style>
