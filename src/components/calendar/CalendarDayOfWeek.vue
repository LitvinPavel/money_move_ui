<script setup lang="ts">
  const weekDays: string[] = [ "Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс" ];
</script>

<template>
    <div class="grid grid-cols-7 gap-px border-b border-gray-900 text-center text-xs font-semibold leading-6 lg:flex-none rounded-t-lg overflow-hidden">
      <div v-for="day in weekDays" :key="day" class="flex justify-center text-gray-900 dark:text-gray-300 bg-white dark:bg-gray-800 py-2">
        {{ day }}
      </div>
    </div>
</template>

<style scoped>

</style>