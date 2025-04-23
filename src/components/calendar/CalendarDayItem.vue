<script setup lang="ts">
import { computed } from "vue";
import {
  TransactionTypeInputEnum,
  type ITransaction,
} from "@/models/transaction";
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
  payDayType: "salary" | "advance" | "vacationPay" | null;
}

export type Emits = {
  (e: "day-click"): void;
};

const payDayTypes = {
  salary: "bg-green-800",
  advance: "bg-yellow-800",
  vacationPay: "bg-indigo-800",
};

const transactionTypes: { [key: string]: string } = {
  [TransactionTypeInputEnum.deposit as string]: "bg-green-900",
  [TransactionTypeInputEnum.withdrawal as string]: "bg-red-900",
  [TransactionTypeInputEnum.transfer_out as string]: "bg-blue-900",
};

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const payDayClasses = computed(() => {
  return props.payDayType && props.payDayType in payDayTypes
    ? payDayTypes[props.payDayType]
    : props.date.toLocaleDateString('sv') === new Date().toLocaleDateString('sv')
    ?  'bg-gray-600' : '';
});

const handleDayClick = () => {
  emit("day-click");
};
</script>

<template>
  <div
    :class="[
      isOutsideMonth
        ? 'text-gray-400 dark:text-gray-400'
        : 'text-gray-900 dark:text-gray-300',
      isVacation
        ? 'bg-blue-800 lg:hover:bg-blue-900'
        : 'bg-white dark:bg-gray-800 lg:hover:bg-gray-100 lg:dark:hover:bg-gray-700'
    ]"
    class="relative px-3 py-2 cursor-pointer focus:z-10 min-h-12 sm:min-h-24"
    @click="handleDayClick"
  >
    <time
      :datetime="date.toLocaleDateString('sv')"
      class="ml-auto w-5 h-5 flex items-center justify-center rounded-full"
      :class="payDayClasses"
      >{{ date.getDate() }}</time
    >
    <template v-if="transactions && transactions.length">
      <span class="-mx-0.5 mt-auto flex flex-wrap-reverse">
        <span
          v-for="event in transactions"
          :key="event.id"
          class="mx-[1px] mb-0.5 h-1.5 w-1.5 rounded-full"
          :class="transactionTypes[event.type]"
        ></span>
      </span>
    </template>
  </div>
</template>

<style scoped></style>
