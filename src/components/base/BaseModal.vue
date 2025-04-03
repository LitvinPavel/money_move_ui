<script setup lang="ts">
import type { VNode } from "vue";
export interface Props {
  visible: boolean;
  headline: string;
}

export type Emits = {
  (e: "update:visible", value: boolean): void;
  (e: "close"): void;
};

defineSlots<{
  default: () => VNode[];
}>();

defineProps<Props>();
const emit = defineEmits<Emits>();

function onClose() {
  emit("close");
}
</script>

<template>
  <div
    v-if="visible"
    tabindex="-1"
    aria-hidden="true"
    class="overflow-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-gray-900/50 dark:bg-gray-900/80"
  >
    <div class="relative p-4 w-full max-w-md max-h-full">
      <div class="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
        <div
          class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200"
        >
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            {{ headline }}
          </h3>
          <button
            type="button"
            class="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            @click="onClose"
          >
            <CloseIcon class="w-3 h-3" />
            <span class="sr-only">Закрыть</span>
          </button>
        </div>

        <div class="p-4 md:p-5">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@use "base-modal";
</style>
