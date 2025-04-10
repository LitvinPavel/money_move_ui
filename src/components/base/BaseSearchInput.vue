<script setup lang="ts">
import { ref, useModel, onMounted } from "vue";

export interface Props {
  modelValue: string | number | null | undefined;
  id?: string;
  placeholder?: string;
  isAutoFocus?: boolean;
  label?: string;
}

const props = withDefaults(defineProps<Props>(), {
  id: "search-input",
  placeholder: "Поиск...",
  isAutoFocus: false,
});

const valueModel = useModel(props, "modelValue");
const searchInputRef = ref<HTMLInputElement | null>(null);
onMounted(() => {
  if (props.isAutoFocus && searchInputRef.value) {
    searchInputRef.value.focus();
  }
});
</script>

<template>
  <div>
    <label :for="id" :class="label ? 'form-field-label' : 'sr-only'">{{ label || placeholder }}</label>
    <div class="relative">
      <div
        class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none"
      >
        <SearchIcon class="w-5 h-5 text-gray-500 dark:text-gray-400" />
      </div>
      <input
        ref="searchInputRef"
        v-model="valueModel"
        :placeholder="placeholder"
        type="text"
        class="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  </div>
</template>

<style></style>
