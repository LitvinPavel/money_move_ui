<script setup lang="ts">
import { type VNode } from "vue";

export interface Props {
  hiddenClose?: boolean;
}

export type Emits = {
  (e: "close"): void;
};

const emit = defineEmits<Emits>();
defineProps<Props>();
defineSlots<{
  default: () => VNode[];
}>();
</script>

<template>
  <span
    class="inline-flex items-center px-2 py-1 me-2 text-xs font-medium text-blue-800 bg-blue-100 rounded-lg dark:bg-blue-900 dark:text-blue-300"
  >
    <slot />
    <button
      v-if="!hiddenClose"
      type="button"
      class="inline-flex items-center p-1 ms-2 text-blue-400 bg-transparent rounded-lg hover:bg-blue-200 hover:text-blue-900 dark:hover:bg-blue-800 dark:hover:text-blue-300"
      @click="emit('close')"
    >
      <CloseIcon class="w-3 h-3" />
    </button>
  </span>
</template>

<style scoped></style>
