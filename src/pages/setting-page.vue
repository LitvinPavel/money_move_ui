<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import { usePeriodStore } from "@/stores/period";
import { useAuth } from "@/composables/useAuth";

const { user, loading, userProfile, logout } = useAuth();

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
    <base-wrapper headline="Личные данные" tag="h2">
      <div class="relative flex items-center gap-4">
        <ProfileIcon
          class="w-10 h-10 text-gray-200 dark:text-gray-700 flex-shrink-0"
        />
        <div class="font-medium dark:text-white">
          <div>{{ user?.name }}</div>
          <div class="text-sm text-gray-500 dark:text-gray-400">
            {{ user?.email }}
          </div>
        </div>
        <button
          type="button"
          class="w-6 h-6 absolute right-0 text-gray-500 dark:text-gray-400"
          @click="logout"
        >
          <LogoutIcon />
        </button>
      </div>
    </base-wrapper>
    <base-wrapper headline="Отчетный период" tag="h2">
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
    </base-wrapper>
  </div>
</template>
<style></style>
