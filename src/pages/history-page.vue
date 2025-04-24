<script setup lang="ts">
import { onMounted } from "vue";
import { useTransaction } from "@/composables/useTransaction";

const {
  loading,
  transactions,
  getTransactions,
  groupTransactionsByDay,
  deleteTransaction,
} = useTransaction();

onMounted(() => {
  getTransactions();
});
</script>

<template>
  <BaseLoader v-if="loading" />
  <div v-else-if="!transactions.length" class="p-4">
    <base-card-wrapper headline="Создайте транзакцию">
      <router-link to="create/transaction">
        <CreateCard />
      </router-link>
    </base-card-wrapper>
  </div>
  <base-wrapper v-else headline="История транзакций">
    <div
      v-for="(values, key) in groupTransactionsByDay(transactions)"
      :key="key"
      class="p-5 mb-4 border border-gray-100 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
    >
      <time class="text-lg font-semibold text-gray-900 dark:text-gray-100">{{
        new Date(key).toLocaleString("ru-RU", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      }}</time>
      <ol class="divide-y divide-gray-200 dark:divide-gray-700 space-y-1">
        <transaction-list-item
          v-for="transaction in values"
          :key="transaction.id"
          :transaction="transaction"
        >
          <template #action>
            <button
              @click="deleteTransaction(transaction.id)"
              class="text-red-600 -m-4 p-4"
            >
              <TrashIcon class="w-5 h-5" />
            </button>
          </template>
        </transaction-list-item>
      </ol>
    </div>
  </base-wrapper>
</template>
<style></style>
