<script setup lang="ts">
import { useModel } from "vue";

export interface Props {
  error: string | null;
}

const props = defineProps<Props>();
const errorModel = useModel(props, "error");
</script>

<template>
  <div
    class="fixed z-50 right-5 bottom-5 flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow-sm dark:text-gray-400 dark:bg-gray-800"
    role="alert"
  >
    <div
      class="inline-flex items-center justify-center shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200"
    >
      <CloseCircleIcon class="w-5 h-5" />
      <span class="sr-only">Error icon</span>
    </div>
    <div class="ms-3 text-sm font-normal">{{ errorModel }}</div>
    <button
      type="button"
      class="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
      @click="errorModel = null"
    >
      <span class="sr-only">Закрыть</span>
      <CloseIcon class="w-4 h-4" />
    </button>
  </div>
</template>

<style></style>
