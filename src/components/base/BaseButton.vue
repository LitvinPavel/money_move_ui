<script setup lang="ts">
export interface Props {
  type?: "button" | "submit" | "reset";
  classes?: string;
}

withDefaults(defineProps<Props>(), {
  type: 'button'
});
</script>

<template>
  <button :type="type" :class="classes" class="base-button">
    <slot />
  </button>
</template>

<style lang="scss">
@use "base-button";
</style>
