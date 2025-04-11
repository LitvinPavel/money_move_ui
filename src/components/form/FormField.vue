<script setup lang="ts">
import type { VNode } from "vue";

export interface Props {
  label?: string;
  id?: string;
  required?: boolean;
}

withDefaults(defineProps<Props>(), {
  id: "form-field",
  label: "",
  required: false,
});
defineSlots<{
  default: () => VNode[];
}>();
</script>

<template>
  <div>
    <label :for="id" :class="label ? 'form-field-label' : 'sr-only'">
      {{ label }}
      <span v-if="required" class="ml-1 text-red-400">*</span>
    </label>
    <slot />
  </div>
</template>

<style lang="scss"></style>
