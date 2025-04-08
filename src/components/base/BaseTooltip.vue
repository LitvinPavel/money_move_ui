<script setup lang="ts">
import { type VNode } from "vue";

export interface Props {
  direction: "right" | "bottom";
  showMobile?: boolean;
}

defineSlots<{
  default: () => VNode[];
}>();

defineProps<Props>();
</script>

<template>
  <div
    :class="{
      'right-full mr-2': direction === 'right',
      'bottom-full mb-2': direction === 'bottom',
      'hidden md:block': !showMobile
    }"
    class="absolute z-20 inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-xs dark:bg-gray-700 opacity-0 group-hover:opacity-100"
    role="tooltip"
  >
    <slot />
    <div
      :class="{
        'clip-right': direction === 'right',
        'clip-bottom': direction === 'bottom',
      }"
      class="clip"
    ></div>
  </div>
</template>

<style scoped lang="scss">
.clip {
  @apply absolute h-2 w-4 bg-gray-900 dark:bg-gray-700;
  clip-path: polygon(50% 0, 100% 100%, 0 100%);

  &-bottom {
    @apply top-full left-1/2 -translate-x-1/2 rotate-180;
  }

  &-right {
    @apply top-1/2 right-0 -translate-y-1/2 -mr-3 rotate-90;
  }
}
</style>
