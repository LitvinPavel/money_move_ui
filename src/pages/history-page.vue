<script setup lang="ts">
</script>

<template>
  <div class="relative p-4 m-4 max-w-3xl md:mx-auto border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
    <h3 class="absolute top-0 -mt-3 -ml-1 bg-[#fafafa] dark:bg-gray-900 px-2 z-10 text-gray-500 dark:text-gray-400 text-sm">История транзакций</h3>
    <div class="pb-4">
      <DropdownMenu />
    </div>
    <div
      class="p-5 mb-4 border border-gray-100 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
    >
      <time class="text-lg font-semibold text-gray-900 dark:text-gray-100"
        >January 13th, 2022</time
      >
      <ol class="divide-y divide-gray-200 dark:divide-gray-700 space-y-1">
        <li v-for="item in 4" :key="item" class="pt-3 flex items-center justify-between gap-2">
          <div>
            <div class="flex items-center gap-6">
            <div
              class="inline-flex gap-2 justify-center items-center px-3 h-6 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300"
            >
              <span>T-Bank</span>
              <SortHorisontIcon class="w-4 h-4" />
              <span>T-Bank</span>
            </div>
            <span
              class="mb-1 font-medium text-2xl text-gray-900 dark:text-gray-100"
            >
              20,000<i class="ml-0.5">₽</i>
            </span>
          </div>
          <p class="text-gray-600 dark:text-gray-400">Описание</p>
          <span class="inline-flex items-center text-xs text-red-300">
            <BookmarkIcon class="w-2.5 h-2.5 me-1" />
            Долг
          </span>
          </div>
          <button class="text-red-600 -m-4 p-4">
            <TrashIcon class="w-5 h-5" />
          </button>
        </li>
      </ol>
    </div>
  </div>
</template>
<style></style>
