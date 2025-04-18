<script setup lang="ts">
import { useDarkMode } from "@/composables/useDarkMode";

const { isDark, toggleTheme } = useDarkMode();
</script>

<template>
  <button
    class="flex items-center w-6 h-6 justify-center text-gray-700 rounded-lg focus:outline-none dark:text-gray-400"
    @click="toggleTheme"
  >
    <SunIcon
      class="transition duration-300"
      :class="
        isDark ? 'opacity-100 scale-100' : 'opacity-0 scale-0 invisible w-0'
      "
    />
    <MoonIcon
      class="transition duration-300"
      :class="
        isDark ? 'opacity-0 scale-0 invisible w-0' : 'opacity-100 scale-100'
      "
    />
  </button>
</template>

<style scoped></style>
