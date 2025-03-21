<script setup lang="ts">
export interface Props {
  type?: "button" | "submit" | "reset";
}

withDefaults(defineProps<Props>(), {
  type: 'button'
});
</script>

<template>
  <button :type="type" class="base-button">
    <slot />
  </button>
</template>

<style lang="scss">
@use "base-button";
</style>
