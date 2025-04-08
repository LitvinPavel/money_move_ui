<script setup lang="ts">
import { type VNode } from "vue";

export interface Props {
  type?: "button" | "submit";
  disabled?: boolean;
}

defineSlots<{
  default: () => VNode[];
}>();

withDefaults(defineProps<Props>(), {
  type: "button",
  disabled: false,
});
</script>

<template>
  <button
    :type="type"
    :disabled="disabled"
    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
  >
    <slot />
  </button>
</template>

<style scoped></style>
