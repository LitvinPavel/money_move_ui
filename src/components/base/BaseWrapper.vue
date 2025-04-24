<script setup lang="ts">
import { type VNode } from "vue";

export interface Props {
  headline: string;
  tag?: keyof HTMLElementTagNameMap | string;
  bg?: string;
}

defineSlots<{
  default: () => VNode[];
}>();

withDefaults(defineProps<Props>(), {
  tag: 'h1',
  bg: 'bg-gray-100 dark:bg-gray-900'
})
</script>

<template>
  <div
    class="relative p-4 m-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 max-w-2xl mx-4 md:mx-auto"
  >
    <component :is="tag"
      class="absolute top-0 -mt-3 -ml-1 px-2 z-10 text-gray-500 dark:text-gray-400 text-sm"
      :class="bg"
    >
      {{ headline }}
    </component>
    <slot />
  </div>
</template>

<style scoped></style>
