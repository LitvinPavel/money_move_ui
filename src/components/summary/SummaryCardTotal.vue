<script setup lang="ts">
import { onMounted } from "vue";
import { useAccount } from "@/composables/useAccount";

const {
  totalBalance,
  getTotalBalance,
} = useAccount();

onMounted(() => {
  getTotalBalance();
})
</script>

<template>
  <div
    class="w-full rounded-lg bg-white dark:bg-gray-800 px-[42px] py-5 mb-6"
  >
    <div
      class="border border-bgray-300 dark:border-darkblack-400 rounded-lg p-8 pb-12"
    >
      <h3 class="text-gray-500 dark:text-gray-400">
        Общий баланс
      </h3>
      <h2
        class="text-4xl font-bold font-poppins text-gray-900 dark:text-white mb-2"
      >
        {{ totalBalance?.total.toFixed(2) }}
        <span class="text-base font-medium uppercase ">RUB</span>
      </h2>
      <div v-if="false" class="flex gap-4">
        <span
          class="text-base font-medium text-gray-400 dark:text-gray-500"
          >11 April 2022</span
        >
        <span class="flex"
          ><svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.5 5.83325L10.8333 12.4999L7.5 9.16659L2.5 14.1666M10.8333 5.83325H17.5H10.8333ZM17.5 5.83325V12.4999V5.83325Z"
              stroke="#00C566"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>
          <span class="text-base font-semibold text-green-300"
            >2,05%</span
          ></span
        >
      </div>
    </div>
    <div class="flex justify-center -mt-6">
      <button
        class="py-3 px-6 border bg-white border-bgray-500 rounded-lg text-sm font-medium text-bgray-600 dark:bg-gray-800 dark:text-white"
        @click="getTotalBalance()"
      >
        Обновить
      </button>
    </div>
  </div>
</template>

<style scoped></style>
