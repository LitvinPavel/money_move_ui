<script setup lang="ts">
interface CalendarEvent {
  id: string;
  title: string;
  date: string; // Дата в формате YYYY-MM-DD
}

export interface Props {
  date: Date;
  isOutsideMonth: boolean;
  events?: CalendarEvent[];
}

export type Emits = {
  (e: "day-click"): void;
};

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const handleDayClick = () => {
  if (!props.isOutsideMonth) {
    emit("day-click");
  }
};
</script>

<template>
  <div
    :class="isOutsideMonth ? 'dark:text-gray-400' : 'cursor-pointer'"
    class="relative px-3 py-2 text-gray-900 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 focus:z-10 min-h-24"
    @click="handleDayClick"
  >
    <time :datetime="date.toLocaleDateString('sv')" class="ml-auto">{{
      date.getDate()
    }}</time>

    <template v-if="events && events.length">
      <ol class="hidden lg:block mt-2">
        <li v-for="event in events" :key="event.id">
          <a href="#" class="group flex">
            <p
              class="flex-auto truncate font-medium text-gray-900 group-hover:text-indigo-600"
            >
              {{ event.title }}
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
          v-for="event in events"
          :key="event.id"
          class="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400"
        ></span>
      </span>
    </template>
  </div>
</template>

<style scoped></style>
