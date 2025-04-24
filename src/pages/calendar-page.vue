<script setup lang="ts">
import { watch, computed } from "vue";
import { useCalendar } from "@/composables/useCalendar";
import { useTransaction } from "@/composables/useTransaction";
import { useVacation } from "@/composables/useVacation";
import { useSalary } from "@/composables/useSalary";

const {
  selectedDay,
  showDetails,
  currentDate,
  daysInMonth,
  prevMonth,
  nextMonth,
  goToToday,
} = useCalendar();

const { transactions, getTransactions, groupTransactionsByDay } =
  useTransaction();

const { vacations, getVacations } = useVacation();

const { salaryCalculation, calculateSalary } = useSalary();

watch(
  currentDate,
  (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const startDate = new Date(year, month, 1).toLocaleDateString("sv");
    const endDate = new Date(year, month + 1, 0).toLocaleDateString("sv");
    getTransactions({ startDate, endDate });
    getVacations({ startDate, endDate });
    calculateSalary({ startDate, endDate });
  },
  { immediate: true }
);

const groupTransaction = computed(() => {
  return groupTransactionsByDay(transactions.value);
});

function checkIsVacation(date: Date): boolean {
  const currentDate = new Date(date).toLocaleDateString("sv");
  return vacations.value.some((vacation) => {
    const startDate = new Date(vacation.start_date).toLocaleDateString("sv");
    const endDate = new Date(vacation.end_date).toLocaleDateString("sv");
    return currentDate >= startDate && currentDate <= endDate;
  });
}

function checkIsPayDay(date: Date): {
  type: "salary" | "advance" | "vacationPay";
  amount?: number;
} | null {
  const currentDate = new Date(date).toLocaleDateString("sv");
  if (!salaryCalculation.value?.calculations) return null;
  const salary = salaryCalculation.value.calculations[0];
  const advanceDate = new Date(salary.advance.paymentDate).toLocaleDateString(
    "sv"
  );
  const salaryDate = new Date(salary.salary.paymentDate).toLocaleDateString(
    "sv"
  );
  const vacationPayDate = salary.vacationPay?.paymentDate
    ? new Date(salary.vacationPay.paymentDate).toLocaleDateString("sv")
    : null;
  if (advanceDate && currentDate === advanceDate)
    return { type: "advance", ...salary.advance };
  else if (salaryDate && currentDate === salaryDate)
    return { type: "salary", ...salary.salary };
  else if (vacationPayDate && currentDate === vacationPayDate)
    return { type: "vacationPay", ...salary.vacationPay };
  else return null;
}

function showDelailsHandler(date: Date) {
  selectedDay.value = date;
  showDetails.value = true;
}
</script>

<template>
  <base-wrapper headline="Календарь">
    <div class="lg:flex lg:h-full lg:flex-col">
      <CalendarHeader
        :date="currentDate"
        @prev="prevMonth"
        @next="nextMonth"
        @today="goToToday"
      />
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
              :transactions="
                groupTransaction[day.date.toLocaleDateString('sv')]
              "
              :is-vacation="checkIsVacation(day.date)"
              :pay-day-type="checkIsPayDay(day.date)?.type ?? null"
              @day-click="showDelailsHandler(day.date)"
            />
          </div>
        </div>
      </div>
    </div>
    <base-modal v-model:visible="showDetails">
      <time class="text-lg font-semibold text-gray-900 dark:text-gray-100 leading-none">{{
        new Date(selectedDay).toLocaleString("ru-RU", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      }}</time>
      <CalendarDayDetails
        :transactions="groupTransaction[selectedDay.toLocaleDateString('sv')]"
        :is-vacation="checkIsVacation(selectedDay)"
        :pay-day="checkIsPayDay(selectedDay)"
      />
    </base-modal>
  </base-wrapper>
</template>

<style scoped></style>
