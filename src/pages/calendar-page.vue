<script setup lang="ts">
import { useCalendar } from "@/composables/useCalendar";
import { useTransaction } from "@/composables/useTransaction";

const {
  currentDate,
    daysInMonth,
    prevMonth,
    nextMonth,
    goToToday,
} = useCalendar();

const { transactions, getTransactions, groupTransactionsByDay, deleteTransaction } =
  useTransaction();

watch(currentDate, (date: Date) => {
  const year = date.getFullYear();
    const month = date.getMonth();
    const startDate = new Date(year, month, 1).toLocaleDateString("sv");
    const endDate = new Date(year, month + 1, 0).toLocaleDateString("sv");
    getTransactions({ startDate, endDate })
}, { immediate: true });

const groupTransaction = computed(() => {
  return groupTransactionsByDay(transactions.value);
})
</script>

<template>
  <div
    class="relative p-4 m-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700"
  >
    <h3
      class="absolute top-0 -mt-3 -ml-1 bg-gray-100 dark:bg-gray-900 px-2 z-10 text-gray-500 dark:text-gray-400 text-sm"
    >
      Календарь
    </h3>
  <div class="lg:flex lg:h-full lg:flex-col">
    <CalendarHeader :date="currentDate" @prev="prevMonth" @next="nextMonth" @today="goToToday" />
    <div
      class="shadow ring-1 ring-black ring-opacity-5 lg:flex lg:flex-auto lg:flex-col"
    >
      <CalendarDayOfWeek />
      <div
        class="flex text-xs leading-6 lg:flex-auto rounded-b-lg overflow-hidden"
      >
        <div class="isolate grid w-full grid-cols-7 grid-rows-6 gap-px">
          <CalendarDayItem
            v-for="(day, index) in daysInMonth"
            :key="index"
            :date="day.date"
            :is-outside-month="day.isOutsideMonth"
            :transactions="groupTransaction[day.date.toLocaleDateString('sv')]"
          />
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped></style>
