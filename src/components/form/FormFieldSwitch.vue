<script setup lang="ts">
import { useModel } from "vue";

export interface Props {
  modelValue: string | number | boolean | null | undefined;
  label?: string;
  id?: string;
  required?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  required: false,
});

const valueModel = useModel(props, "modelValue");
</script>

<template>
  <label :for="id" class="inline-flex items-center mb-5 cursor-pointer">
    <input
      v-model="valueModel"
      :id="id"
      :name="id"
      :required="required"
      type="checkbox"
      class="sr-only peer"
    />
    <div
      class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"
    >
    <slot name="icon" />
  </div>
    
    <span v-if="label" class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300"
      >{{ label }}<span v-if="required" class="ml-1 text-red-400">*</span></span
    >
  </label>
</template>

<style lang="scss"></style>
