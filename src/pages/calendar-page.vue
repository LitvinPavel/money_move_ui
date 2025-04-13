<script setup lang="ts">
import { ref } from "vue";
import { useCalendar } from "@/composables/useCalendar";

const {
  daysInMonth,
  getEventsForDate,
  addEvent,
} = useCalendar();

const isEventModalOpen = ref(false);
const selectedDate = ref<string | null>(null);
const newEventTitle = ref("");

const openEventModal = (date: Date) => {
  if (!date) return;
  selectedDate.value = date.toLocaleDateString("sv"); // Формат YYYY-MM-DD
  isEventModalOpen.value = true;
};

const closeEventModal = () => {
  isEventModalOpen.value = false;
  selectedDate.value = null;
  newEventTitle.value = "";
};

const saveEvent = () => {
  if (selectedDate.value && newEventTitle.value.trim()) {
    addEvent(selectedDate.value, newEventTitle.value.trim());
    closeEventModal();
  }
};
</script>

<template>
  <div class="lg:flex lg:h-full lg:flex-col">
    <CalendarHeader />
    <div
      class="shadow ring-1 ring-black ring-opacity-5 lg:flex lg:flex-auto lg:flex-col"
    >
      <CalendarDayOfWeek />
      <div
        class="flex bg-gray-200 text-xs leading-6 text-gray-700 lg:flex-auto"
      >
        <div class="isolate grid w-full grid-cols-7 grid-rows-6 gap-px">
          <CalendarDayItem
            v-for="(day, index) in daysInMonth"
            :key="index"
            :date="day.date"
            :is-outside-month="day.isOutsideMonth"
            :events="getEventsForDate(day.date.toLocaleDateString('sv'))"
            @day-click="openEventModal(day.date)"
          />
        </div>
      </div>
    </div>
    <base-modal v-model:visible="isEventModalOpen">
      <form class="space-y-4 mt-8" @submit.prevent="saveEvent">
        <FormFieldInput v-model="newEventTitle" id="eventTitle" label="Название события" required />
        <button
          type="submit"
          class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >Добавить</button>
        </form>
    </base-modal>
  </div>
</template>

<style scoped></style>
