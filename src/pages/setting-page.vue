<script setup lang="ts">
import { ref, watch } from "vue";
import { usePeriodStore } from "@/stores/period";

const periodStore = usePeriodStore();

// Локальные ref для datepicker
const startDate = ref(new Date(periodStore.startDate));
const endDate = ref(new Date(periodStore.endDate));

// Обработчик изменения дат
const handleDateChange = () => {
  if (startDate.value && endDate.value) {
    periodStore.setPeriod(
      startDate.value.toISOString().split("T")[0],
      endDate.value.toISOString().split("T")[0]
    );
  }
};

// Следим за изменениями в хранилище (на случай сброса или изменения из другого компонента)
watch(
  () => [periodStore.startDate, periodStore.endDate],
  ([newStart, newEnd]) => {
    startDate.value = new Date(newStart);
    endDate.value = new Date(newEnd);
  }
);
</script>
<template>
  <div class="relative p-4 m-4 max-w-3xl md:mx-auto border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
    <h3 class="absolute top-0 -mt-3 -ml-1 bg-[#fafafa] dark:bg-gray-900 px-2 z-10 text-gray-500 dark:text-gray-400 text-sm">Создание аккаунта</h3>
    <form class="space-y-4" @submit.prevent>
      <FormFieldDate
        v-model="startDate"
        @update:model-value="handleDateChange"
        :max-date="endDate"
        label="Начальная дата"
      />

      <FormFieldDate
        v-model="endDate"
        @update:model-value="handleDateChange"
        :max-date="new Date()"
        label="Конечная дата"
      />
      <base-button @click.native="periodStore.resetToDefault"
        >Сбросить до текущего месяца</base-button
      >
    </form>
  </div>
</template>
<style></style>
