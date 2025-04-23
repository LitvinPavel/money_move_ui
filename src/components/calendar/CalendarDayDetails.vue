<script setup lang="ts">
import { type ITransaction } from "@/models/transaction";

export interface Props {
  transactions?: ITransaction[];
  isVacation: boolean;
  payDay: {
    type: "salary" | "advance" | "vacationPay";
    amount?: number;
    hours?: number;
    hourlyRate?: number;
  } | null;
}

const payDayNames = {
  salary: "Зарплата",
  advance: "Аванс",
  vacationPay: "Отпускные",
};

defineProps<Props>();
</script>

<template>
  <div class="space-y-6">
    <h3 v-if="isVacation" class="m-4 flex gap-2 justify-end">
      <SunIcon class="w-5 h-5 text-yellow-400" /><span
        class="text-gray-900 dark:text-gray-100"
        >Отпуск, отдыхай!</span
      >
    </h3>
    <base-wrapper
      v-if="payDay?.type"
      :headline="payDayNames[payDay.type]"
      bg="bg-white dark:bg-gray-800"
    >
      <div class="space-y-3">
        <div v-if="payDay.amount">
          <h4 class="mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Сумма
          </h4>
          <p
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
          >
            {{ payDay.amount.toFixed(2)
            }}<RubleIcon class="inline-flex w-2 h-2 ml-0.5 -mt-0.5" />
          </p>
        </div>
        <div v-if="payDay.hours">
          <h4 class="mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Отработанных часов
          </h4>
          <p
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
          >
            {{ payDay.hours }}
          </p>
        </div>
        <div v-if="payDay.hourlyRate">
          <h4 class="mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Оплата в час
          </h4>
          <p
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
          >
            {{ payDay.hourlyRate.toFixed(2)
            }}<RubleIcon class="inline-flex w-2 h-2 ml-0.5 -mt-0.5" />
          </p>
        </div>
      </div>
    </base-wrapper>
    <base-wrapper v-if="transactions?.length" headline="Транзакции" bg="bg-white dark:bg-gray-800">
      <ol class="divide-y divide-gray-200 dark:divide-gray-700 space-y-1">
        <TransactionListItem
          v-for="transaction in transactions"
          :key="transaction.id"
          :transaction="transaction"
        />
      </ol>
    </base-wrapper>
    <p v-if="!isVacation && !payDay?.type && !transactions?.length" class="my-6 text-center text-gray-900 dark:text-gray-100">В этот день ничего нет.</p>
  </div>
</template>

<style scoped></style>
