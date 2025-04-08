<script setup lang="ts">
import { useModel } from "vue";

export interface Props {
  modelValue: string | number | boolean | null | undefined;
  label: string;
  id: string;
  required?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  required: false,
});

const valueModel = useModel(props, "modelValue");
</script>

<template>
  <div class="flex items-start">
    <div class="flex items-center h-5">
      <input
        v-model="valueModel"
        :id="id"
        :name="id"
        :required="required"
        type="checkbox"
        class="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
      />
    </div>
    <label
      :for="id"
      class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      >{{ label }}</label
    >
  </div>
</template>

<style lang="scss"></style>
