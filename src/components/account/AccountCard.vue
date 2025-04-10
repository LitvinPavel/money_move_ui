<script setup lang="ts">
import type { IAccount } from '@/models/account';

export interface Props {
  account: IAccount;
}

defineProps<Props>();
</script>
<template>
  <div class="flex flex-col w-full p-5 rounded-lg bg-white dark:bg-gray-800">
    <div class="flex justify-between items-start space-x-2">
      <div
        class="flex flex-wrap items-center text-gray-400 dark:text-gray-500 text-xs lg:text-sm space-x-1"
      >
        <h5>{{ account.bank_name }}</h5>
        <span>/</span>
        <h4 class="text-gray-500 dark:text-gray-400">{{ account.account_name }}</h4>
        <div v-if="account.is_salary" class="inline-flex relative group">
          <CashIcon class="text-blue-600 w-3 h-3 " />
          <base-tooltip direction="right" :show-mobile="true">
            Зарплатный счет
          </base-tooltip>
        </div>
        
      </div>
      <div
        v-if="account.interest_rate"
        class="px-2 h-5 rounded-full bg-blue-600 flex justify-center items-center"
      >
        <span class="text-gray-200 text-xs">{{ account.interest_rate }}%</span>
      </div>
    </div>
    <span class="text-2xl font-medium text-gray-900 dark:text-gray-300"
      >{{ account.balance }}<i class="ml-0.5">₽</i></span
    >
    <div v-if="account.debt" class="flex justify-end mb-2">
      <span class="text-red-500 text-xs font-medium">Долг: {{ account.debt }} <i class="ml-0.5">₽</i></span>
    </div>
    <div v-if="account.plan" class="mt-auto">
      <div class="flex justify-between mb-1">
        <span class="text-blue-600 text-xs font-medium">300.00<i class="ml-0.5">₽</i></span>
        <span class="text-xs font-medium text-gray-900 dark:text-gray-300"
          >{{ account.plan }}<i class="ml-0.5">₽</i></span
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
