<script setup lang="ts">
export interface Props {
  bankName: string;
  accountName: string;
  balance: string;
  currency: string;
  plan: string;
  interestRate?: number | null;
}

defineProps<Props>();
</script>

<template>
  <div class="flex flex-col w-full p-5 rounded-lg bg-white dark:bg-gray-800">
    <div class="flex justify-between items-start space-x-2">
      <div>
        <h4 class="text-gray-500 dark:text-gray-400 text-sm">
          {{ accountName }}
        </h4>
        <h5 class="text-gray-400 dark:text-gray-500 text-xs">
          {{ bankName }}
        </h5>
      </div>
      <div v-if="interestRate" class="flex space-x-1.5 items-center">
        <div
          class="px-2 h-[22px] rounded-full bg-green-400 flex justify-center items-center"
        >
          <span class="text-white text-xs font-medium">{{ interestRate }}%</span>
        </div>
      </div>
    </div>
    <span class="text-2xl font-bold text-gray-900 dark:text-white"
      >{{ balance }} {{ currency }}</span
    >
    <div v-if="false" class="flex justify-end mb-2">
      <div
        class="px-2 h-[22px] rounded-full bg-red-400 flex justify-center items-center"
      >
        <span class="text-white text-xs font-medium">Долг 300.00 {{ currency }}</span>
      </div>
    </div>
    <div class="flex flex-col space-y-8 mt-auto">
      <div class="">
        <div class="flex justify-between mb-2">
          <span class="text-green-600 text-sm font-medium"
            >300.00P</span
          >
          <span class="text-sm text-gray-900 dark:text-white font-medium">500.00P</span>
        </div>
        <div
          class="w-full relative h-[14px] rounded bg-gray-100 overflow-hidden"
        >
          <div
            style="width: 65%"
            class="h-full absolute left-0 top-0 rounded bg-green-300"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
