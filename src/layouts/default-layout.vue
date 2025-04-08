<script setup lang="ts">
import { onMounted } from 'vue';
import { useBalance } from "@/composables/useBalance";

const { totalBalance, getTotalBalance } = useBalance();
const error = ref<string | null>(null);
const setError = (err: string) => {
  error.value = err;
};
provide("errorHandler", setError);

onMounted(() => {
  getTotalBalance();
});
</script>

<template>
  <div
    class="fixed top-0 start-0 z-20 flex justify-between w-full py-2 px-4 bg-[#fafafa] dark:bg-gray-900"
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
  <BaseError v-if="error" v-model:error="error" />
</template>

<style scoped></style>
