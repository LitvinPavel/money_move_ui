<script setup lang="ts">
import { defineModel } from "vue";
const visible = defineModel("visible");
</script>

<template>
  <aside
    :class="{ '-translate-x-full': !visible }"
    class="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform bg-white border-r border-gray-200 md:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
  >
    <div class="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
      <SidebarNav />
    </div>
  </aside>
</template>

<style scoped></style>
