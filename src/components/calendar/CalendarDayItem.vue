<script setup lang="ts">
import type { ITransaction } from "@/models/transaction";
interface CalendarEvent {
  id: string;
  title: string;
  date: string; // Дата в формате YYYY-MM-DD
}

export interface Props {
  date: Date;
  isOutsideMonth: boolean;
  events?: CalendarEvent[];
  transactions?: ITransaction[];
  isVacation: boolean;
  payDay: {
    type: "salary" | "advance" | "vacationPay";
    amount?: number;
  } | null;
}

export type Emits = {
  (e: "day-click"): void;
};

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const payDayClasses = computed(() => {
  if (props.payDay?.type === "salary") return "bg-green-800 hover:bg-green-900";
  if (props.payDay?.type === "advance")
    return "bg-yellow-800 hover:bg-yellow-900";
  if (props.payDay?.type === "vacationPay")
    return "bg-indigo-800 hover:bg-indigo-900";
  return "bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700";
});

const handleDayClick = () => {
  if (!props.isOutsideMonth) {
    emit("day-click");
  }
};
</script>

<template>
  <div
    :class="[
      isOutsideMonth
        ? 'text-gray-400 dark:text-gray-400'
        : 'text-gray-900 dark:text-gray-300',
      { 'bg-blue-800 hover:bg-blue-900': isVacation },
      payDayClasses,
    ]"
    class="relative px-3 py-2 cursor-pointer focus:z-10 min-h-12 sm:min-h-24"
    @click="handleDayClick"
  >
    <time :datetime="date.toLocaleDateString('sv')" class="ml-auto">{{
      date.getDate()
    }}</time>
    <div v-if="payDay?.amount">
      {{ payDay.amount.toFixed(2)
      }}<RubleIcon class="inline-flex w-2 h-2 ml-0.5" />
    </div>
    <template v-if="transactions && transactions.length">
      <ol class="hidden lg:block mt-2">
        <li v-for="event in transactions" :key="event.id">
          <a href="#" class="group flex">
            <p
              class="flex-auto truncate font-medium text-gray-900 group-hover:text-indigo-600"
            >
              {{ event.type }}
            </p>
            <time
              datetime="2022-01-22T15:00"
              class="ml-3 hidden flex-none text-gray-500 group-hover:text-indigo-600 xl:block"
              >3PM</time
            >
          </a>
        </li>
      </ol>
      <span class="lg:hidden sr-only">0 событий</span>
      <span class="lg:hidden -mx-0.5 mt-auto flex flex-wrap-reverse">
        <span
          v-for="event in transactions"
          :key="event.id"
          class="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400"
        ></span>
      </span>
    </template>
  </div>
</template>

<style scoped></style>
