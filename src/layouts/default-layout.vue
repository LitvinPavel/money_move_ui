<script setup lang="ts">
import { useBalanceSummaryStore } from "@/stores/balance-summary";
import { useSalarySummaryStore } from "@/stores/salary-summary";

const balanceStore = useBalanceSummaryStore();
const salaryStore = useSalarySummaryStore();
</script>

<template>
  <div
    class="fixed top-0 start-0 z-20 flex justify-between w-full py-3 px-4 bg-gray-100 dark:bg-gray-900"
  >
    <div
      class="relative min-w-28 flex items-baseline px-3 py-0.5 font-medium text-gray-900 dark:text-gray-300 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700"
      :class="{ 'animate-pulse': balanceStore.loading }"
    >
      <span
        class="absolute flex gap-1 top-0 -mt-2.5 -ml-1 px-1 z-10 text-gray-500 dark:text-gray-400 text-sm bg-gray-100 dark:bg-gray-900 leading-none"
      >
        <span>Факт</span>/<span>План</span>
      </span>
      <span>{{
        balanceStore.loading ? "0" : balanceStore.balanceSummary?.totalBalance
      }}</span
      ><RubleIcon class="inline-flex w-2 h-2 ml-0.5" />
      <template v-if="salaryStore.salarySummary?.total?.overall">
        <span class="mx-1">/</span>
        <span>{{ salaryStore.salarySummary?.total?.overall.toFixed(2) }}</span
        ><RubleIcon class="inline-flex w-2 h-2 ml-0.5" />
      </template>
    </div>
    <ThemeToggle />
  </div>
  <div class="h-14" />
  <router-view />
  <div class="h-20" />
  <Navigation />
</template>

<style scoped></style>
