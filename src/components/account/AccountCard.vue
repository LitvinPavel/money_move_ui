<script setup lang="ts">
import { onMounted, computed } from "vue";
import type { IAccount } from "@/models/account";
import { useTransaction } from "@/composables/useTransaction";
import { usePeriodStore } from "@/stores/period";
import { useSalarySummaryStore } from "@/stores/salary-summary";

export interface Props {
  account: IAccount;
}

const props = defineProps<Props>();
const periodStore = usePeriodStore();
const { balanceSummary, getBalanceSummary } = useTransaction();
const salaryStore = useSalarySummaryStore();

const planSum = computed<number>(() => {
  return salaryStore.salarySummary?.total ? (salaryStore.salarySummary?.total?.overall / 100 * (props.account?.plan ?? 0)) : 0
})
onMounted(async () => {
  await getBalanceSummary({
    accountId: props.account.id,
    startDate: periodStore.startDate,
    endDate: periodStore.endDate,
  });
});
</script>
<template>
  <div class="flex flex-col w-full p-5 rounded-lg bg-white dark:bg-gray-800">
    <div class="flex justify-between items-start space-x-2">
      <div
        class="flex flex-wrap items-center text-gray-400 dark:text-gray-500 text-xs lg:text-sm space-x-1"
      >
        <h5>{{ account.bank_name }}</h5>
        <span>/</span>
        <h4 class="text-gray-500 dark:text-gray-400">
          {{ account.account_name }}
        </h4>
      </div>
      <div
        v-if="account.interest_rate"
        class="px-2 h-5 rounded-full bg-blue-600 flex justify-center items-center"
      >
        <span class="text-gray-200 text-xs">{{ account.interest_rate }}%</span>
      </div>
    </div>
    <span class="text-2xl font-medium text-gray-900 dark:text-gray-300"
      >{{ balanceSummary?.totalBalance }}<RubleIcon class="inline-flex w-3 h-3 ml-0.5 -mt-0.5" />
      </span>
    <div v-if="balanceSummary?.totalDebt" class="flex justify-end mb-2">
      <span class="text-red-500 text-xs font-medium"
        >Долг: {{ balanceSummary.totalDebt }}<RubleIcon class="inline-flex w-2 h-2 ml-0.5 -mt-0.5" /></span
      >
    </div>
    <div v-if="account.plan" class="mt-auto">
      <div class="flex justify-end mb-1 font-normal text-xs text-gray-900 dark:text-gray-300">
        <!-- <span>
          <span>{{ planSum.toFixed(2) }}</span>
          <RubleIcon class="inline-flex w-2 h-2 ml-0.5" />
        </span>
        <span>/</span> -->
        <span :class="{ 'text-red-300': planSum < (balanceSummary?.totalBalance || 0) }">
          <span class="mr-1">{{ planSum < (balanceSummary?.totalBalance || 0) ? 'Превысило': 'Осталось' }}</span>
          <span class="font-bold">{{ Math.abs(planSum - (balanceSummary?.totalBalance || 0)).toFixed(2) }}</span>
          <RubleIcon class="inline-flex w-2 h-2 ml-0.5 -mt-0.5" />
        </span>
      </div>
      <div class="w-full relative h-2 rounded bg-gray-700 overflow-hidden">
        <div
          :style="`width: ${balanceSummary?.totalBalance ? (balanceSummary?.totalBalance) / planSum * 100 : 0}%`"
          class="h-full absolute left-0 top-0 rounded bg-blue-600"
        ></div>
      </div>
    </div>
  </div>
</template>
<style></style>
