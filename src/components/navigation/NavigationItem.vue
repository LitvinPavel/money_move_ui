<script setup lang="ts">
export interface Props {
  isFirst: boolean;
  isLast: boolean;
  title: string;
  link: string;
}

defineProps<Props>();
</script>

<template>
  <router-link
    :to="link"
    class="flex items-center justify-center w-full h-full"
  >
    <button
      class="inline-flex items-center justify-center group h-full w-full flex-col px-5"
      :class="{
        'rounded-e-full': isLast,
        'rounded-s-full': isFirst,
      }"
    >
      <slot name="icon" />
      <span class="sr-only">{{ title }}</span>
      <base-tooltip direction="bottom">
        {{ title }}
      </base-tooltip>
    </button>
  </router-link>
</template>

<style lang="scss">
</style>
