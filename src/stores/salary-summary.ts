import { ref, watch } from "vue";
import { defineStore } from "pinia";
import { usePeriodStore } from "./period";
import { api } from "@/api";
import catchHandler from "@/utils/catch-handler";
import type { ISalaryPeriodCalculationResult } from "@/models/salary";

export const useSalarySummaryStore = defineStore("salarySummary", () => {
  const periodStore = usePeriodStore();

  // State
  const salarySummary = ref<ISalaryPeriodCalculationResult | null>(null);
  const error = ref<string | null>(null);
  const loading = ref(false);

  // Actions
  const updateSalarySummary = async () => {
    loading.value = true;
    error.value = null;

    try {
      if (
        !periodStore.startDate &&
        !periodStore.endDate
      ) {
        throw new Error("Не выбран период для расчёта");
      }

      const response = await api.get<ISalaryPeriodCalculationResult>(
        `/salary/calculate`,
        { params: { startDate: periodStore.startDate, endDate: periodStore.endDate } }
      );
      if (response.data) salarySummary.value = response.data;

    } catch (err) {
      error.value = catchHandler(err, "Ошибка получения зарплаты за период");
      salarySummary.value = null;
    } finally {
      loading.value = false;
    }
  };

  // Инициализация при создании store
  updateSalarySummary();

  watch(
    () => [periodStore.startDate, periodStore.endDate],
    () => {
      updateSalarySummary();
    }
  );

  return {
    salarySummary,
    loading,
    error,
    updateSalarySummary,
  };
});
