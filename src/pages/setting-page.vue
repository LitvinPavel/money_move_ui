<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import { usePeriodStore } from "@/stores/period";
import { useAuth } from "@/composables/useAuth";

const { user, loading, userProfile } = useAuth();

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

onMounted(() => {
  userProfile();
});
</script>
<template>
  <BaseLoader v-if="loading" />
  <div v-else class="space-y-6">
    <div
      class="relative p-4 m-4 max-w-3xl md:mx-auto border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700"
    >
      <h3
        class="absolute top-0 -mt-3 -ml-1 bg-[#fafafa] dark:bg-gray-900 px-2 z-10 text-gray-500 dark:text-gray-400 text-sm"
      >
        Литчные данные
      </h3>
      <div class="flex items-center gap-4">
        <ProfileIcon
          class="w-10 h-10 text-gray-200 dark:text-gray-700 flex-shrink-0"
        />
        <div class="font-medium dark:text-white">
          <div>{{ user?.name }}</div>
          <div class="text-sm text-gray-500 dark:text-gray-400">
            {{ user?.email }}
          </div>
        </div>
      </div>
    </div>
    <div
      class="relative p-4 m-4 max-w-3xl md:mx-auto border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700"
    >
      <h3
        class="absolute top-0 -mt-3 -ml-1 bg-[#fafafa] dark:bg-gray-900 px-2 z-10 text-gray-500 dark:text-gray-400 text-sm"
      >
        Отчетный период
      </h3>
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
          label="Конечная дата"
        />
        <base-button @click.native="periodStore.resetToDefault"
          >Сбросить до текущего месяца</base-button
        >
      </form>
    </div>
  </div>
</template>
<style></style>
