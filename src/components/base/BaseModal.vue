<script setup lang="ts">
import { useModel, type VNode } from 'vue';

export interface Props {
  visible: boolean;
}

defineSlots<{
  default: () => VNode[];
}>();

const props = defineProps<Props>();
const visibleModel = useModel(props, 'visible');

function close(): void {
  visibleModel.value = false;
}
</script>

<template>
  <div
    v-if="visibleModel"
    class="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-40 justify-center items-center w-full md:inset-0 h-full max-h-full bg-gray-900/90"
  >
    <div class="relative p-2 w-full max-w-2xl max-h-full m-auto">
      <div class="relative rounded-lg shadow-sm bg-white dark:bg-gray-800">
        <button
          type="button"
          class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
          @click="close"
        >
          <closeIcon class="w-5 h-5" />
          <span class="sr-only">Закрыть</span>
        </button>
        <div class="p-4 md:p-5">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
