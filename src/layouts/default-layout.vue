<script setup lang="ts">
import { ref, provide } from "vue";
import { useBalanceSummaryStore } from "@/stores/balance-summary";

const balanceStore = useBalanceSummaryStore();
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
      class="flex items-center px-3 font-medium text-gray-900 dark:text-gray-300 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700"
      :class="{ 'animate-pulse': balanceStore.loading }"
    >
      <span>{{
        balanceStore.loading ? "0" : balanceStore.balanceSummary?.totalBalance
      }}</span
      ><i class="ml-0.5">₽</i>
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
