<script setup lang="ts">
import { ref } from "vue";
import { useAuth } from "@/composables/useAuth";
import { useCalendar } from "@/composables/useCalendar";

const { user, fetchAccounts } = useAuth();

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
  selectedDate.value = date.toISOString().split("T")[0]; // Формат YYYY-MM-DD
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
  {{ user }}
  <button @click="fetchAccounts">get</button>
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
            :events="getEventsForDate(day.date.toISOString().split('T')[0])"
            @day-click="openEventModal(day.date)"
          />
        </div>
      </div>
    </div>
    <base-modal :visible="isEventModalOpen" headline="Добавить событие" @save="saveEvent" @close="isEventModalOpen = false">
      <input v-model="newEventTitle" placeholder="Название события" />
    </base-modal>
  </div>
  <!-- <base-button @click="logout">
    Выйти
  </base-button> -->
</template>

<style scoped></style>
