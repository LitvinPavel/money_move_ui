<template>
    <header class="flex items-center justify-between px-6 py-4 lg:flex-none text-gray-900 dark:text-gray-300">
    <h1 class="text-base font-semibold leading-6">
      <time datetime="2022-01">January 2022</time>
    </h1>
    <div class="flex items-center">
      <div class="relative flex items-center rounded-lg bg-white dark:bg-gray-800 md:items-stretch">
        <button type="button" class="flex h-9 w-12 items-center justify-center rounded-l-lg pr-1  md:w-9 md:pr-0">
          <span class="sr-only">Previous month</span>
          <AngleRightIcon class="h-4 w-4 rotate-180" />
        </button>
        <button type="button" class="hidden px-3.5 text-sm font-semibold md:block">Today</button>
        <span class="relative -mx-px h-5 w-px bg-gray-900 dark:bg-gray-300 md:hidden"></span>
        <button type="button" class="flex h-9 w-12 items-center justify-center rounded-r-lg pl-1 md:w-9 md:pl-0">
          <span class="sr-only">Next month</span>
          <AngleRightIcon class="h-4 w-4" />
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>