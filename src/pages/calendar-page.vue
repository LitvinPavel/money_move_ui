<script setup lang="ts">
import { useCalendar } from "@/composables/useCalendar";

const {
  currentDate,
    daysInMonth,
    prevMonth,
    nextMonth,
    goToToday,
} = useCalendar();

// const isEventModalOpen = ref(false);
// const selectedDate = ref<string | null>(null);
// const newEventTitle = ref("");

// const openEventModal = (date: Date) => {
//   if (!date) return;
//   selectedDate.value = date.toLocaleDateString("sv"); // Формат YYYY-MM-DD
//   isEventModalOpen.value = true;
// };

// const closeEventModal = () => {
//   isEventModalOpen.value = false;
//   selectedDate.value = null;
//   newEventTitle.value = "";
// };

// const saveEvent = () => {
//   if (selectedDate.value && newEventTitle.value.trim()) {
//     addEvent(selectedDate.value, newEventTitle.value.trim());
//     closeEventModal();
//   }
// };
</script>

<template>
  <div
    class="relative p-4 m-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700"
  >
    <h3
      class="absolute top-0 -mt-3 -ml-1 bg-[#fafafa] dark:bg-gray-900 px-2 z-10 text-gray-500 dark:text-gray-400 text-sm"
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
          />
        </div>
      </div>
    </div>
    <!-- <base-modal v-model:visible="isEventModalOpen">
      <form class="space-y-4 mt-8" @submit.prevent="saveEvent">
        <FormFieldInput v-model="newEventTitle" id="eventTitle" label="Название события" required />
        <button
          type="submit"
          class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >Добавить</button>
        </form>
    </base-modal> -->
  </div>
</div>
</template>

<style scoped></style>
