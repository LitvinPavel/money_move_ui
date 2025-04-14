<script setup lang="ts">
import { ref, provide } from "vue";
import { useBalanceSummaryStore } from "@/stores/balance-summary";
import { useSalarySummaryStore } from "@/stores/salary-summary";

const balanceStore = useBalanceSummaryStore();
const salaryStore = useSalarySummaryStore();
const error = ref<string | null>(null);
const setError = (err: string) => {
  error.value = err;
};
provide("errorHandler", setError);

</script>

<template>
  <div
    class="fixed top-0 start-0 z-20 flex justify-between w-full py-2 px-4 bg-[#fafafa] dark:bg-gray-900"
  >
    <div
      class="flex items-baseline px-3 font-medium text-gray-900 dark:text-gray-300 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700"
      :class="{ 'animate-pulse': balanceStore.loading }"
    >
      <span>{{
        balanceStore.loading ? "0" : balanceStore.balanceSummary?.totalBalance
      }}</span
      ><RubleIcon class="inline-flex w-2 h-2 ml-0.5" />
      <span v-if="salaryStore.salarySummary?.total?.overall" class="mx-1">/</span>
      <span>{{
        salaryStore.salarySummary?.total?.overall.toFixed(2)
      }}</span
      ><RubleIcon class="inline-flex w-2 h-2 ml-0.5" />₽
    </div>
    <ThemeToggle />
  </div>
  <div class="h-12" />
  <router-view />
  <div class="h-16" />
  <Navigation />
  <BaseError v-if="error" v-model:error="error" />
</template>

<style scoped></style>
