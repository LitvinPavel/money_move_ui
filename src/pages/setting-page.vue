<script setup lang="ts">
import { ref, watch, onMounted, computed } from "vue";
import { usePeriodStore } from "@/stores/period";
import { useAuth } from "@/composables/useAuth";
import { useSalary } from "@/composables/useSalary";
import { dateToLocaleWithTime } from "@/utils/format-date";

const { user, loading, userProfile, logout } = useAuth();
const { salaryHistory, formCreateData, setSalary } = useSalary();

const periodStore = usePeriodStore();

const startDate = ref(new Date(periodStore.startDate));
const endDate = ref(new Date(periodStore.endDate));

const handleDateChange = () => {
  if (startDate.value && endDate.value) {
    periodStore.setPeriod(
      startDate.value.toISOString().split("T")[0],
      endDate.value.toISOString().split("T")[0]
    );
  }
};

const validForm = computed(
  () => !!(formCreateData.value.amount && formCreateData.value.effective_from)
);

function onSubmit() {
  if (validForm.value) {
    setSalary();
  }
}

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

    <base-wrapper headline="Изменения в зарплате" tag="h2">
      <form class="space-y-4" @submit.prevent="onSubmit">
        <FormFieldFloatInput
          v-model="formCreateData.amount"
          id="salary"
          label="Оклад"
        />
        <FormFieldDate
          v-model="formCreateData.effective_from"
          :max-date="new Date()"
          label="Дата изменения"
        />
        <base-button type="submit" :disabled="!validForm" :loading="loading">
          Добавить
        </base-button>
      </form>
      <div class="flex flex-wrap gap-2 mt-6">
        <base-badge
          v-for="salary in salaryHistory"
          :key="salary.id"
          hiddenClose
        >
          <span class="mr-1"
            >С {{ dateToLocaleWithTime(salary.effective_from) }}</span
          >
          <span class="font-semibold">{{ salary.base_salary.toFixed(2) }}</span
          ><RubleIcon class="inline-flex w-2 h-2 ml-0.5" />
        </base-badge>
      </div>
    </base-wrapper>
  </div>
</template>
<style></style>
