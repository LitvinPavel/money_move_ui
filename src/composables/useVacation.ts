import { ref, onMounted } from "vue";
import { api } from "@/api";
import catchHandler from "@/utils/catch-handler";
import type { IVacation } from "@/models/vacation";

import { useError } from "@/composables/useError";

export function useVacation() {
  const { showError } = useError();
  const error = ref<string | null>(null);
  const loading = ref(false);
  const vacations = ref<IVacation[]>([]);

  onMounted(() => {
    getVacations();
  });

  const getVacations = async (): Promise<void> => {
    loading.value = true;
    error.value = null;

    try {
      const response = await api.get<IVacation[]>("/salary/vacations");
      vacations.value = response.data || [];
    } catch (err) {
      showError(catchHandler(err, "Ошибка получения отпусков"));
    } finally {
      loading.value = false;
    }
  };

  const createVacation = async (
    params: { startDate: Date | string; endDate: Date | string },
    _callback: () => void
  ): Promise<void> => {
    try {
      const response = await api.post<IVacation>("/salary/vacations", params);
      if (response.data) vacations.value.push(response.data);
      _callback();
    } catch (err) {
      showError(catchHandler(err, "Ошибка добавления отпуска"));
    } finally {
      loading.value = false;
    }
  };

  const deleteVacation = async (id: number): Promise<void> => {
    try {
      await api.delete(`/salary/vacations/${id}`);
      doDelete(id);
    } catch (err) {
      showError(catchHandler(err, "Ошибка удаления отпуска"));
    } finally {
      loading.value = false;
    }
  };

  function doDelete(id: number): void {
    const vacationIndex = vacations.value.findIndex((item) => item.id === id);
    if (vacationIndex !== -1) {
      vacations.value.splice(vacationIndex, 1);
    }
  }

  function refresh() {
    getVacations();
  }

  return {
    loading,
    createVacation,
    deleteVacation,
    refresh,
  };
}
