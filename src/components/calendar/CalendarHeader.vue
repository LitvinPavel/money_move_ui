<script setup lang="ts">
import { computed } from "vue";
export interface Props {
  date: Date;
}

export type Emits = {
  (e: "prev"): void;
  (e: "next"): void;
  (e: "today"): void;
};

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const currentYear = computed<number>(() => props.date.getFullYear());
const currentLongMonth = computed<string>(() =>
  props.date.toLocaleString("default", { month: "long" })
);
const currentMonth = computed<number>(() => props.date.getMonth() + 1);
</script>

<template>
  <header
    class="flex items-center justify-between pb-4 lg:flex-none text-gray-900 dark:text-gray-300"
  >
    <h1 class="text-base font-semibold leading-6">
      <time :datetime="`${currentYear}-${currentMonth}`" class="capitalize"
        >{{ currentLongMonth }} {{ currentYear }}</time
      >
    </h1>
    <div class="flex items-center">
      <div
        class="relative flex items-center rounded-lg bg-white dark:bg-gray-800 md:items-stretch"
      >
        <button
          type="button"
          class="flex h-9 w-9 items-center justify-center rounded-l-lg"
          @click="emit('prev')"
        >
          <span class="sr-only">Педыдущий месяц</span>
          <AngleRightIcon class="h-4 w-4 rotate-180" />
        </button>
        <button
          type="button"
          class="px-3.5 text-sm font-semibold"
          @click="emit('today')"
        >
          Сегодня
        </button>
        <button
          type="button"
          class="flex h-9 w-9 items-center justify-center rounded-r-lg"
          @click="emit('next')"
        >
          <span class="sr-only">Следующий месяц</span>
          <AngleRightIcon class="h-4 w-4" />
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped></style>
