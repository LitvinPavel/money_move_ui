<script setup lang="ts">
import { onMounted, computed } from "vue";
import { useVacation } from "@/composables/useVacation";
import getDatesInRange from "@/utils/dates-in-range";
import { dateToLocaleWithTime } from "@/utils/format-date";

const {
  loading,
  vacations,
  formCreateData,
  getVacations,
  createVacation,
  deleteVacation,
} = useVacation();

const disabledDates = computed(() => {
  if (!vacations.value.length) return [];
  const dates = vacations.value.map(({ start_date, end_date }) => {
    return getDatesInRange(start_date, end_date);
  });
  return dates.flat();
});

const validForm = computed(
  () => !!(formCreateData.value.startDate && formCreateData.value.endDate)
);

function onSubmit() {
  if (validForm.value) {
    createVacation();
  }
}

onMounted(() => {
  getVacations();
});
</script>
<template>
  <base-wrapper headline="Отпуск">
    <form class="space-y-4" @submit.prevent="onSubmit">
      <FormFieldDate
        v-model="formCreateData.startDate"
        :disabled-dates="disabledDates"
        label="Дата начала"
      />
      <FormFieldDate
        v-model="formCreateData.endDate"
        :disabled-dates="disabledDates"
        label="Дата конца"
      />
      <base-button type="submit" :disabled="!validForm" :loading="loading">
        Отправить
      </base-button>
    </form>
    <div class="flex flex-wrap gap-2 mt-6">
      <base-badge
        v-for="vacation in vacations"
        :key="vacation.id"
        @close="deleteVacation(vacation.id)"
      >
        {{ dateToLocaleWithTime(vacation.start_date) }} -
        {{ dateToLocaleWithTime(vacation.end_date) }}
      </base-badge>
    </div>
  </base-wrapper>
</template>
<style></style>
