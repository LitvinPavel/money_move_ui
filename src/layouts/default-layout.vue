<script setup lang="ts">
import { onMounted } from 'vue';
import { useAccount } from "@/composables/useAccount";

const { totalBalance, getTotalBalance } = useAccount();

onMounted(() => {
  getTotalBalance();
});
</script>

<template>
  <div
    class="fixed top-0 start-0 z-50 flex justify-between w-full py-2 px-4 bg-[#fafafa] dark:bg-gray-900"
  >
    <span
      class="px-3 font-medium text-gray-900 dark:text-gray-300 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700"
      >{{ totalBalance?.total }}<i class="ml-0.5">₽</i></span
    >
  </div>
  <div class="h-12" />
  <router-view />
  <div class="h-16" />
  <Navigation />
</template>

<style scoped></style>
