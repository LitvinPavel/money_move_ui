<script setup lang="ts">
import { type VNode } from "vue";
export interface Props {
  headline: string;
}

defineProps<Props>();

defineSlots<{
  default: () => VNode[];
}>();
</script>
<template>
  <div
    class="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[24px] p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700"
  >
    <h3
      class="absolute top-0 -mt-3 ml-3 bg-gray-100 dark:bg-gray-900 px-2 z-10 text-gray-500 dark:text-gray-400 text-sm"
    >
      {{ headline }}
    </h3>
    <slot />
  </div>
</template>
<style></style>
