<script setup lang="ts">
export interface Props {
  accountName: string;
  bankName: string;
  balance: string;
  interestRate?: string | null;
}

defineProps<Props>();
</script>
<template>
  <div class="flex flex-col w-full p-5 rounded-lg bg-white dark:bg-gray-800">
    <div class="flex justify-between items-start space-x-2">
      <div
        class="flex items-center text-gray-400 dark:text-gray-500 text-xs lg:text-sm space-x-1"
      >
        <h5>{{ bankName }}</h5>
        <span>/</span>
        <h4 class="text-gray-500 dark:text-gray-400">{{ accountName }}</h4>
      </div>
      <div
        v-if="interestRate"
        class="px-2 h-5 rounded-full bg-blue-600 flex justify-center items-center"
      >
        <span class="text-gray-200 text-xs">{{ interestRate }}%</span>
      </div>
    </div>
    <span class="text-2xl font-medium text-gray-900 dark:text-gray-300"
      >{{ balance }}<i class="ml-0.5">₽</i></span
    >
    <div v-if="false" class="flex justify-end mb-2">
      <span class="text-red-500 text-xs font-medium">Долг: 300.00 <i class="ml-0.5">₽</i></span>
    </div>
    <div class="mt-2">
      <div class="flex justify-between mb-1">
        <span class="text-blue-600 text-xs font-medium">300.00<i class="ml-0.5">₽</i></span>
        <span class="text-xs font-medium text-gray-900 dark:text-gray-300"
          >500.00<i class="ml-0.5">₽</i></span
        >
      </div>
      <div class="w-full relative h-2 rounded bg-gray-700 overflow-hidden">
        <div
          style="width: 65%"
          class="h-full absolute left-0 top-0 rounded bg-blue-600"
        ></div>
      </div>
    </div>
  </div>
</template>
<style></style>
