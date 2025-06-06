import { ref, onMounted } from "vue";
import { api } from "@/api";
import catchHandler from "@/utils/catch-handler";
import type { ISalaryPeriodCalculationResult, ISalary, ISalaryQueryParams } from "@/models/salary";

import { useError } from "@/composables/useError";

export function useSalary() {
  const { showError } = useError();
  const error = ref<string | null>(null);
  const loading = ref(false);
  const salaryHistory = ref<ISalary[]>([]);
  const salaryCalculation = ref<ISalaryPeriodCalculationResult | null>(null);
  const formCreateData = ref<ISalaryQueryParams>({
    amount: undefined,
    effective_from: undefined
  })

  onMounted(() => {
    getSalaryHistory();
  });

  const getSalaryHistory = async (): Promise<void> => {
    loading.value = true;
    error.value = null;

    try {
      const response = await api.get<ISalary[]>("/salary/history");
      salaryHistory.value = response.data || [];
    } catch (err) {
      console.log(catchHandler(err, "Ошибка получения истории изменения зарплаты"))
    } finally {
      loading.value = false;
    }
  };

  const setSalary = async (_callback?: () => void): Promise<void> => {
    try {
      const response = await api.post<ISalary>("/salary", formCreateData.value);
      if (response.data) salaryHistory.value.push(response.data);
      if (_callback) _callback(); 
    } catch (err) {
      showError(catchHandler(err, "Ошибка добавления зарплаты"));
    } finally {
      loading.value = false;
    }
  };

  const calculateSalary = async (
    params: { startDate: Date | string; endDate: Date | string }
  ): Promise<void> => {
    try {
      const response = await api.get<ISalaryPeriodCalculationResult>(
        `/salary/calculate`,
        { params }
      );
      if (response.data) salaryCalculation.value = response.data;
    } catch (err) {
      console.log(catchHandler(err, "Ошибка получения рассчета зарплаты"));
    } finally {
      loading.value = false;
    }
  };

  function refresh() {
    getSalaryHistory();
  }

  return {
    loading,
    salaryHistory,
    salaryCalculation,
    formCreateData,
    setSalary,
    calculateSalary,
    refresh,
  };
}
